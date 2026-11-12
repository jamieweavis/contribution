import fs from 'node:fs';
import { expect } from 'vitest';

import type { ContributionDay } from '../src/types';

export const readFixture = (name: string): string =>
  fs.readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

export const gitHubStatsShape = {
  streak: {
    current: expect.any(Number),
    best: expect.any(Number),
    previous: expect.any(Number),
    isAtRisk: expect.any(Boolean),
    startDate: expect.toBeOneOf([expect.any(String), null]),
  },
  contributions: {
    today: expect.any(Number),
    total: expect.any(Number),
    most: expect.any(Number),
    lastContributionDate: expect.toBeOneOf([expect.any(String), null]),
  },
  days: expect.any(Array),
};

/** Builds consecutive contribution days starting at 2020-01-01 */
export const buildDays = (counts: number[]): ContributionDay[] =>
  counts.map((count, index) => ({
    date: new Date(Date.UTC(2020, 0, index + 1)).toISOString().slice(0, 10),
    count,
    level: 0,
  }));

export interface DayCell {
  date?: string;
  level?: string;
  id?: string;
  label?: string;
}

const attribute = (name: string, value?: string): string =>
  value === undefined ? '' : ` ${name}="${value}"`;

/** Renders minimal contribution graph markup mirroring GitHub's structure */
export const renderGraph = (cells: DayCell[]): string => {
  const rows = cells
    .map(
      ({ date, level, id, label }) =>
        `<td class="ContributionCalendar-day"${attribute('data-date', date)}${attribute('data-level', level)}${attribute('id', id)}></td>` +
        (label === undefined || id === undefined
          ? ''
          : `<tool-tip for="${id}" class="sr-only">${label}</tool-tip>`),
    )
    .join('\n');
  return `<table><tbody><tr>${rows}</tr></tbody></table>`;
};
