import { describe, expect, it } from 'vitest';

import { ContributionGraphParseError } from '../src/errors';
import { parseContributionCount, parseContributionGraph } from '../src/parser';
import { readFixture, renderGraph } from './helpers';

describe('parseContributionCount', () => {
  it.each([
    ['No contributions on February 25th.', 0],
    ['1 contribution on February 26th.', 1],
    ['17 contributions on February 27th.', 17],
    ['1,234 contributions on March 1st.', 1234],
    ['  3 contributions on March 2nd.  ', 3],
  ])('should parse "%s" as %i', (label, expected) => {
    expect(parseContributionCount(label)).toBe(expected);
  });

  it.each([
    '',
    'contributions on March 1st.',
    'Some contributions on March 1st.',
    '5 commits on March 1st.',
  ])('should reject unrecognised label "%s"', (label) => {
    expect(() => parseContributionCount(label)).toThrow(
      ContributionGraphParseError,
    );
  });
});

describe('parseContributionGraph', () => {
  it('should parse the GitHub contribution graph fixture', () => {
    const html = readFixture('github-contributions.html');
    const expected = JSON.parse(
      readFixture('github-contributions.expected.json'),
    );

    const days = parseContributionGraph(html);

    expect(days).toEqual(expected);
    expect(days).toHaveLength(367);
  });

  it('should ignore legend squares that share the day class', () => {
    const html = `
      <div class="ContributionCalendar-day" data-level="4" id="legend-4"></div>
      ${renderGraph([{ date: '2024-01-01', level: '1', id: 'd0', label: '2 contributions on January 1st.' }])}
    `;

    expect(parseContributionGraph(html)).toEqual([
      { date: '2024-01-01', count: 2, level: 1 },
    ]);
  });

  it('should sort contributions chronologically', () => {
    const html = renderGraph([
      {
        date: '2024-01-08',
        level: '0',
        id: 'd2',
        label: 'No contributions on January 8th.',
      },
      {
        date: '2023-12-31',
        level: '2',
        id: 'd0',
        label: '4 contributions on December 31st.',
      },
      {
        date: '2024-01-01',
        level: '1',
        id: 'd1',
        label: '1 contribution on January 1st.',
      },
    ]);

    expect(parseContributionGraph(html)).toEqual([
      { date: '2023-12-31', count: 4, level: 2 },
      { date: '2024-01-01', count: 1, level: 1 },
      { date: '2024-01-08', count: 0, level: 0 },
    ]);
  });

  it('should match tooltips to days by id regardless of position', () => {
    const html = `
      <tool-tip for="d1">7 contributions on January 2nd.</tool-tip>
      <tool-tip for="d0">No contributions on January 1st.</tool-tip>
      ${renderGraph([
        { date: '2024-01-01', level: '0', id: 'd0' },
        { date: '2024-01-02', level: '3', id: 'd1' },
      ])}
    `;

    expect(parseContributionGraph(html)).toEqual([
      { date: '2024-01-01', count: 0, level: 0 },
      { date: '2024-01-02', count: 7, level: 3 },
    ]);
  });

  describe('errors', () => {
    const valid = {
      date: '2024-01-01',
      level: '0',
      id: 'd0',
      label: 'No contributions on January 1st.',
    };

    it.each([
      ['an empty document', ''],
      [
        'a document without a contribution graph',
        '<html><body><h1>Not Found</h1></body></html>',
      ],
    ])('should throw for %s', (_, html) => {
      expect(() => parseContributionGraph(html)).toThrow(
        new ContributionGraphParseError(
          'No contribution days found in contribution graph',
        ),
      );
    });

    it.each([
      ['data-date', { ...valid, date: undefined }],
      ['data-level', { ...valid, level: undefined }],
      ['id', { ...valid, id: undefined }],
    ])('should throw when a day is missing the %s attribute', (name, cell) => {
      expect(() => parseContributionGraph(renderGraph([cell]))).toThrow(
        new ContributionGraphParseError(
          `Contribution day is missing the "${name}" attribute`,
        ),
      );
    });

    it('should throw for an invalid date', () => {
      expect(() =>
        parseContributionGraph(renderGraph([{ ...valid, date: '01/01/2024' }])),
      ).toThrow(
        new ContributionGraphParseError(
          'Invalid contribution date "01/01/2024"',
        ),
      );
    });

    it.each(['high', '5', '-1', '10'])(
      'should throw for the invalid level "%s"',
      (level) => {
        expect(() =>
          parseContributionGraph(renderGraph([{ ...valid, level }])),
        ).toThrow(
          new ContributionGraphParseError(
            `Invalid contribution level "${level}" on 2024-01-01, expected 0-4`,
          ),
        );
      },
    );

    it('should throw when a day has no tooltip', () => {
      expect(() =>
        parseContributionGraph(renderGraph([{ ...valid, label: undefined }])),
      ).toThrow(
        new ContributionGraphParseError(
          'Missing contribution tooltip for 2024-01-01',
        ),
      );
    });

    it('should throw for an unrecognised tooltip label', () => {
      expect(() =>
        parseContributionGraph(renderGraph([{ ...valid, label: 'Loading…' }])),
      ).toThrow(
        new ContributionGraphParseError(
          'Unrecognised contribution label "Loading…"',
        ),
      );
    });
  });
});
