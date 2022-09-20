import { LogEntry } from './logParser';

interface LogInformation {
  softwareVersion: string;
  hardwareVersion: string;
  somSerialNumber: string;
  firstDate: Date | null;
  lastDate: Date | null;
}

function getLogInformation(logObject: LogEntry[]): LogInformation {
  let softwareVersion = '-';
  let hardwareVersion = '-';
  let somSerialNumber = '-';
  let firstDate: Date | null = null;
  let lastDate: Date | null = null;

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
  });

  return {
    softwareVersion: softwareVersion,
    hardwareVersion: hardwareVersion,
    somSerialNumber: somSerialNumber,
    firstDate: firstDate,
    lastDate: lastDate,
  };
}

export { getLogInformation };
export type { LogInformation };
