import { describe, expect, it } from '@jest/globals';
import { getDateRange, LogDateRange } from 'src/utils/logExtractor';
import { LogLevel, LogEntry } from 'src/utils/logParser';

function dummyLogEntry(date: Date): LogEntry {
  return {
    id: 0,
    timestamp: date,
    level: LogLevel.INFO,
    service: 'test',
    logger: 'test',
    message: 'test',
  };
}

describe('logExtractor', () => {
  it('date range (empty array)', () => {
    const logEntries: LogEntry[] = [];

    const range: LogDateRange = getDateRange(logEntries);

    expect(range.first).toEqual(range.last);
    expect(range.first).toEqual(new Date(0));
  });

  it('date range (one entry)', () => {
    const logEntries: LogEntry[] = [dummyLogEntry(new Date(42))];

    const range: LogDateRange = getDateRange(logEntries);

    expect(range.first).toEqual(range.last);
    expect(range.first).toEqual(new Date(42));
  });

  it('date range (multiple entries, not sorted)', () => {
    const logEntries: LogEntry[] = [
      dummyLogEntry(new Date(42)),
      dummyLogEntry(new Date(1024)),
      dummyLogEntry(new Date(666)),
    ];

    const range: LogDateRange = getDateRange(logEntries);

    expect(range.first).toEqual(new Date(42));
    expect(range.last).toEqual(new Date(1024));
  });
});
