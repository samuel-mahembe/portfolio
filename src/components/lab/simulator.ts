/**
 * Client-side payment stream simulator. All data is fake and generated in the browser.
 * The score reads only the transaction's features, never whether it was generated as fraud,
 * so it can miss fraud and flag legitimate payments, as a real scorer can.
 */

export type Reason = 'velocity spike' | 'unusual amount' | 'new device';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  /** Payments on this account in the last minute. */
  velocity: number;
  /** This amount divided by the account's typical amount. */
  amountRatio: number;
  newDevice: boolean;
  /** Risk from 0 to 1. */
  score: number;
  flagged: boolean;
  /** At most two, strongest first. Empty unless flagged. */
  reasons: Reason[];
}

const MERCHANTS = ['Grocery', 'Fuel', 'Airtime', 'Transfer', 'Online retail', 'Utilities', 'Travel', 'Restaurant'];

const WEIGHTS = { intercept: -4.2, velocity: 0.55, amountRatio: 2.6, newDevice: 1.9 };
const FLAG_THRESHOLD = 0.5;
const VELOCITY_SPIKE = 5;
const UNUSUAL_RATIO = 4;

export function scoreFeatures(velocity: number, amountRatio: number, newDevice: boolean) {
  const contributions = {
    velocity: WEIGHTS.velocity * velocity,
    amount: WEIGHTS.amountRatio * Math.log(Math.max(amountRatio, 1)),
    device: newDevice ? WEIGHTS.newDevice : 0,
  };
  const logit = WEIGHTS.intercept + contributions.velocity + contributions.amount + contributions.device;
  const score = 1 / (1 + Math.exp(-logit));
  const flagged = score >= FLAG_THRESHOLD;

  const candidates: { reason: Reason; weight: number; applies: boolean }[] = [
    { reason: 'velocity spike', weight: contributions.velocity, applies: velocity >= VELOCITY_SPIKE },
    { reason: 'unusual amount', weight: contributions.amount, applies: amountRatio >= UNUSUAL_RATIO },
    { reason: 'new device', weight: contributions.device, applies: newDevice },
  ];
  const applicable = candidates.filter((c) => c.applies);
  // A flag can come from several moderate signals, so fall back to the strongest one.
  const pool = applicable.length > 0 ? applicable : candidates;
  const reasons = flagged
    ? pool
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2)
        .map((c) => c.reason)
    : [];

  return { score, flagged, reasons };
}

const between = (random: () => number, min: number, max: number) => min + random() * (max - min);
const whole = (random: () => number, min: number, max: number) => Math.floor(between(random, min, max + 1));

function features(random: () => number, isFraud: boolean) {
  if (!isFraud) {
    return {
      velocity: whole(random, 0, 2),
      amountRatio: between(random, 0.4, 2.4),
      newDevice: random() < 0.03,
    };
  }
  const pattern = random();
  if (pattern < 0.34) {
    return { velocity: whole(random, 6, 12), amountRatio: between(random, 0.5, 1.5), newDevice: random() < 0.3 };
  }
  if (pattern < 0.67) {
    return { velocity: whole(random, 0, 2), amountRatio: between(random, 5, 20), newDevice: random() < 0.3 };
  }
  return { velocity: whole(random, 2, 4), amountRatio: between(random, 2, 4), newDevice: true };
}

let sequence = 0;

export function createTransaction(fraudRate: number, random: () => number = Math.random): Transaction {
  const { velocity, amountRatio, newDevice } = features(random, random() < fraudRate);
  const typicalAmount = Math.exp(between(random, Math.log(6), Math.log(140)));
  sequence += 1;
  return {
    id: `txn_${(sequence * 2654435761 % 0xffffff).toString(16).padStart(6, '0')}`,
    merchant: MERCHANTS[whole(random, 0, MERCHANTS.length - 1)]!,
    amount: typicalAmount * amountRatio,
    velocity,
    amountRatio,
    newDevice,
    ...scoreFeatures(velocity, amountRatio, newDevice),
  };
}
