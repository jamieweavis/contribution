import { type HTMLElement, parse } from 'node-html-parser';

import { ContributionGraphParseError } from './errors.js';
import type { ContributionDay, ContributionLevel } from './types.js';

// Legend squares share the `ContributionCalendar-day` class but are <div>s
const DAY_SELECTOR = 'td.ContributionCalendar-day';
const TOOLTIP_SELECTOR = 'tool-tip[for]';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LEVEL_PATTERN = /^[0-4]$/;
const COUNT_PATTERN = /^(No|[\d,]+) contributions?\b/;

const requireAttribute = (element: HTMLElement, name: string): string => {
  const value = element.getAttribute(name);
  if (value === undefined) {
    throw new ContributionGraphParseError(
      `Contribution day is missing the "${name}" attribute`,
    );
  }
  return value;
};

/** Parses tooltip text such as "No contributions on…" or "1,234 contributions on…" */
export const parseContributionCount = (label: string): number => {
  const match = COUNT_PATTERN.exec(label.trim());
  if (!match) {
    throw new ContributionGraphParseError(
      `Unrecognised contribution label "${label}"`,
    );
  }
  const [, count] = match;
  return count === 'No' ? 0 : Number.parseInt(count.replaceAll(',', ''), 10);
};

const parseDay = (
  cell: HTMLElement,
  labels: ReadonlyMap<string, string>,
): ContributionDay => {
  const date = requireAttribute(cell, 'data-date');
  const level = requireAttribute(cell, 'data-level');
  const id = requireAttribute(cell, 'id');

  if (!DATE_PATTERN.test(date)) {
    throw new ContributionGraphParseError(
      `Invalid contribution date "${date}"`,
    );
  }
  if (!LEVEL_PATTERN.test(level)) {
    throw new ContributionGraphParseError(
      `Invalid contribution level "${level}" on ${date}, expected 0-4`,
    );
  }

  const label = labels.get(id);
  if (label === undefined) {
    throw new ContributionGraphParseError(
      `Missing contribution tooltip for ${date}`,
    );
  }

  return {
    date,
    count: parseContributionCount(label),
    level: Number.parseInt(level, 10) as ContributionLevel,
  };
};

/** Parses GitHub contribution graph HTML into contribution days, sorted chronologically */
export const parseContributionGraph = (html: string): ContributionDay[] => {
  const root = parse(html);

  const cells = root.querySelectorAll(DAY_SELECTOR);
  if (cells.length === 0) {
    throw new ContributionGraphParseError(
      'No contribution days found in contribution graph',
    );
  }

  const labels = new Map(
    root
      .querySelectorAll(TOOLTIP_SELECTOR)
      .map((tooltip) => [requireAttribute(tooltip, 'for'), tooltip.text]),
  );

  const days = cells.map((cell) => parseDay(cell, labels));
  // ISO 8601 dates sort chronologically as strings
  return days.sort((a, b) => a.date.localeCompare(b.date));
};
