import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { withBase } from './paths';

const RESUME_FILE = 'Samuel-Mahembe-Resume.pdf';

/**
 * The public URL of the resume, or null until the file is in public/.
 * Resume links only render when this has a value, so a broken link can never ship.
 */
export function getResumeHref(): string | null {
  return existsSync(join(process.cwd(), 'public', RESUME_FILE)) ? withBase(RESUME_FILE) : null;
}
