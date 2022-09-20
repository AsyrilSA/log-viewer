import { LogEntry, LogLevel } from './logParser';

interface LogInformation {
  softwareVersion: string;
  hardwareVersion: string;
  somSerialNumber: string;
  firstDate: Date | null;
  lastDate: Date | null;
  logStatistics: Map<string, Map<LogLevel, number>>;
}

function getLogInformation(logObject: LogEntry[]): LogInformation {
  let softwareVersion = '-';
  let hardwareVersion = '-';
  let somSerialNumber = '-';
  let firstDate: Date | null = null;
  let lastDate: Date | null = null;
  const logStatistics: Map<string, Map<LogLevel, number>> = new Map();

  logObject.forEach((value: LogEntry) => {
    if (value.message.startsWith('Software version:')) {
      softwareVersion = value.message.split(':')?.pop() || '-';
    } else if (value.message.startsWith('Hardware version:')) {
      hardwareVersion = value.message.split(':')?.pop() || '-';
    } else if (value.message.startsWith('SoM Serial number:')) {
      somSerialNumber = value.message.split(':')?.pop() || '-';
    }

    // Log timestamp
    if (value.timestamp && value.timestamp < (firstDate || new Date())) {
      firstDate = value.timestamp;
    }
    if (value.timestamp && value.timestamp > (lastDate || new Date(0))) {
      lastDate = value.timestamp;
    }

    // Statistics
    if (!logStatistics.has(value.service)) {
      logStatistics.set(value.service, new Map());
    }

    const m = logStatistics.get(value.service);
    if (m !== undefined) {
      if (m.has(value.level)) {
        m.set(value.level, (m.get(value.level) || 0) + 1);
      } else {
        m.set(value.level, 1);
      }
    }
  });

  return {
    softwareVersion: softwareVersion,
    hardwareVersion: hardwareVersion,
    somSerialNumber: somSerialNumber,
    firstDate: firstDate,
    lastDate: lastDate,
    logStatistics: logStatistics,
  };
}

export { getLogInformation };
export type { LogInformation };
