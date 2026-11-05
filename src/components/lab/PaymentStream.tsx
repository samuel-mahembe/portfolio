import { useEffect, useRef, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import { createTransaction, type Transaction } from './simulator';

const VISIBLE_ROWS = 8;
const BASE_INTERVAL_MS = 900;
const SPEEDS = [0.5, 1, 2, 4];

const formatAmount = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function Row({ tx }: { tx: Transaction }) {
  return (
    <m.li
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={`border-line grid h-16 grid-cols-[1fr_auto] content-center gap-x-4 border-b border-l-2 px-3 lg:h-11 lg:grid-cols-[1fr_5rem_3rem_19rem] lg:items-center xl:grid-cols-[6.5rem_1fr_5rem_3rem_19rem] ${
        tx.flagged ? 'border-l-accent bg-accent/10' : 'border-l-transparent'
      }`}
    >
      <span className="type-label hidden xl:block">{tx.id}</span>
      <span className="text-ink truncate text-[0.9375rem]">{tx.merchant}</span>
      <span className="type-label text-ink! text-right">{formatAmount(tx.amount)}</span>
      <span className={`type-label order-1 truncate lg:order-none lg:col-start-4 lg:row-start-1 xl:col-start-5 ${tx.flagged ? 'text-accent!' : ''}`}>
        {tx.flagged ? (
          <>
            <span className="hidden lg:inline">Flagged: </span>
            {tx.reasons.join(', ')}
          </>
        ) : (
          'Approved'
        )}
      </span>
      <span className="type-label order-2 text-right lg:order-none lg:col-start-3 lg:row-start-1 xl:col-start-4">{tx.score.toFixed(2)}</span>
    </m.li>
  );
}

export default function PaymentStream({ caseStudyHref }: { caseStudyHref: string }) {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [fraudPercent, setFraudPercent] = useState(8);
  const [totals, setTotals] = useState({ processed: 0, flagged: 0 });

  const fraudRate = useRef(fraudPercent / 100);
  fraudRate.current = fraudPercent / 100;
  const inView = useRef(true);
  const root = useRef<HTMLDivElement>(null);

  // Show a full feed at once. Visitors who prefer reduced motion start paused.
  useEffect(() => {
    const seed = Array.from({ length: VISIBLE_ROWS }, () => createTransaction(fraudRate.current));
    setRows(seed);
    setTotals({ processed: seed.length, flagged: seed.filter((tx) => tx.flagged).length });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  // Do no work while the demo is off screen.
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry?.isIntersecting ?? true;
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (!inView.current || document.hidden) return;
      const tx = createTransaction(fraudRate.current);
      setRows((current) => [tx, ...current].slice(0, VISIBLE_ROWS));
      setTotals((current) => ({
        processed: current.processed + 1,
        flagged: current.flagged + (tx.flagged ? 1 : 0),
      }));
    }, BASE_INTERVAL_MS / speed);
    return () => clearInterval(timer);
  }, [paused, speed]);

  return (
    <div ref={root}>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
        <button type="button" className="btn btn-secondary w-24" onClick={() => setPaused((value) => !value)}>
          {paused ? 'Resume' : 'Pause'}
        </button>

        <fieldset>
          <legend className="type-label mb-2">Speed</legend>
          <div className="flex gap-1">
            {SPEEDS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={speed === value}
                onClick={() => setSpeed(value)}
                className={`type-label h-11 w-12 cursor-pointer rounded-sm border transition-colors duration-150 ${
                  speed === value ? 'border-accent text-ink!' : 'border-line-strong'
                }`}
              >
                {value}x
              </button>
            ))}
          </div>
        </fieldset>

        <div className="w-full max-w-sm min-w-48 flex-1">
          <label htmlFor="fraud-rate" className="type-label flex justify-between">
            <span>Fraud rate</span>
            <output htmlFor="fraud-rate" className="text-ink">{fraudPercent}%</output>
          </label>
          <input
            id="fraud-rate"
            type="range"
            min={0}
            max={30}
            value={fraudPercent}
            onChange={(event) => setFraudPercent(Number(event.target.value))}
            className="accent-accent mt-1 h-11 w-full cursor-pointer"
          />
        </div>
      </div>

      <div className="border-line bg-surface mt-6 overflow-hidden rounded-md border">
        <div className="type-label border-line hidden grid-cols-[1fr_5rem_3rem_19rem] gap-x-4 border-b px-3 py-2 lg:grid xl:grid-cols-[6.5rem_1fr_5rem_3rem_19rem]" aria-hidden="true">
          <span className="hidden xl:block">Transaction</span>
          <span>Merchant</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Score</span>
          <span>Decision</span>
        </div>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            <ol
              aria-label="Simulated transactions"
              className="h-128 overflow-hidden lg:h-88"
            >
              {rows.map((tx) => (
                <Row key={tx.id} tx={tx} />
              ))}
            </ol>
          </MotionConfig>
        </LazyMotion>
      </div>

      <p className="type-label mt-3">
        {totals.processed} simulated, {totals.flagged} flagged
      </p>

      <div className="mt-8">
        <h3 className="type-h3">How it works</h3>
        <p className="type-body mt-2">
          This demo scores transactions in your browser and is not a production model. For how I approach real payment
          systems, see the{' '}
          <a className="link" href={caseStudyHref}>
            PayFlow case study
          </a>
          .
        </p>
      </div>
    </div>
  );
}
