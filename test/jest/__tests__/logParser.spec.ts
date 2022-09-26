import { describe, expect, it } from '@jest/globals';
import { LogLevel, parseLogFile } from 'src/utils/logParser';

describe('logParser', () => {
  it('parse empty log', () => {
    const logEntries = parseLogFile('');
    expect(logEntries.length).toEqual(0);
  });

  it('parse one line (system)', () => {
    const logEntries = parseLogFile('abcd');
    expect(logEntries.length).toEqual(1);
    const logEntry = logEntries[0];
    expect(logEntry.id).toEqual(0);
    expect(logEntry.level).toEqual(LogLevel.SYSTEM);
    expect(logEntry.service).toEqual('system');
    expect(logEntry.logger).toEqual('system');
    expect(logEntry.message).toEqual('abcd');
  });

  it('parse multiple lines (system)', () => {
    const lines = ['abcd', 'efjh', 'ijkl'];
    const logEntries = parseLogFile(lines.join('\n'));
    expect(logEntries.length).toEqual(3);
    for (const [i, logEntry] of logEntries.entries()) {
      expect(logEntry.id).toEqual(i);
      expect(logEntry.level).toEqual(LogLevel.SYSTEM);
      expect(logEntry.service).toEqual('system');
      expect(logEntry.logger).toEqual('system');
      expect(logEntry.message).toEqual(lines[i]);
    }
  });

  it('parse one line (Python)', () => {
    const logEntries = parseLogFile(
      '2022-06-10 12:08:51,311 backend.asycube.service.service [DEBUG ] SetVibration returned: <none>'
    );
    expect(logEntries.length).toEqual(1);
    const logEntry = logEntries[0];
    expect(logEntry.id).toEqual(0);
    expect(logEntry.timestamp).toEqual(
      new Date(Date.parse('2022-06-10 12:08:51.311'))
    );
    expect(logEntry.level).toEqual(LogLevel.DEBUG);
    expect(logEntry.service).toEqual('asycube');
    expect(logEntry.logger).toEqual('backend.asycube.service.service');
    expect(logEntry.message).toEqual('SetVibration returned: <none>');
  });

  it('parse one line (C++, vision)', () => {
    const logEntries = parseLogFile(
      '[2022-06-10 14:08:54.488] [vision.timer] [debug] model::invoke 113 ms'
    );
    expect(logEntries.length).toEqual(1);
    const logEntry = logEntries[0];
    expect(logEntry.id).toEqual(0);
    expect(logEntry.timestamp).toEqual(
      new Date(Date.parse('2022-06-10 12:08:54.488')) // hack with the timezone
    );
    expect(logEntry.level).toEqual(LogLevel.DEBUG);
    expect(logEntry.service).toEqual('vision');
    expect(logEntry.logger).toEqual('vision.timer');
    expect(logEntry.message).toEqual('model::invoke 113 ms');
  });

  it.each([
    '[2022-06-10 14:06:44.361] [production] [debug] Processing indication (index: 3)',
    '[2022-06-10 14:03:32.720] [object_dictionary] [debug] Successfully created object entry at 0x1008',
    '[2022-06-10 14:03:32.666] [fieldbus.factory] [debug] Building an EtherCATApplication',
  ])('parse one line (C++, fieldbus, debug)', (line: string) => {
    const logEntries = parseLogFile(line);
    expect(logEntries.length).toEqual(1);
    const logEntry = logEntries[0];
    expect(logEntry.id).toEqual(0);
    expect(logEntry.level).toEqual(LogLevel.DEBUG);
    expect(logEntry.service).toEqual('fieldbus');
    expect(line.endsWith(logEntry.message)).toBeTruthy();
  });

  it('parse one line (envoy)', () => {
    const logEntries = parseLogFile(
      '[2022-06-10 12:03:14.339][12][info][main] [source/server/server.cc:299]   envoy.resolvers: envoy.ip'
    );
    expect(logEntries.length).toEqual(1);
    const logEntry = logEntries[0];
    expect(logEntry.id).toEqual(0);
    expect(logEntry.timestamp).toEqual(
      new Date(Date.parse('2022-06-10 12:03:14.339'))
    );
    expect(logEntry.level).toEqual(LogLevel.INFO);
    expect(logEntry.service).toEqual('envoy');
    expect(logEntry.logger).toEqual('main');
    expect(logEntry.message).toEqual('  envoy.resolvers: envoy.ip');
  });
});
