import { LogEntry } from './logParser';

interface LogInformation {
  softwareVersion: string;
  hardwareVersion: string;
  somSerialNumber: string;
}

function getLogInformation(logObject: LogEntry[]): LogInformation {
  let softwareVersion = '-';
  let hardwareVersion = '-';
  let somSerialNumber = '-';

  logObject.forEach((value: LogEntry) => {
    if (value.message.startsWith('Software version:')) {
      softwareVersion = value.message.split(':')?.pop() || '-';
    }
    if (value.message.startsWith('Hardware version:')) {
      hardwareVersion = value.message.split(':')?.pop() || '-';
    }
    if (value.message.startsWith('SoM Serial number:')) {
      somSerialNumber = value.message.split(':')?.pop() || '-';
    }
  });

  return {
    softwareVersion: softwareVersion,
    hardwareVersion: hardwareVersion,
    somSerialNumber: somSerialNumber,
  };
}

export { getLogInformation };
export type { LogInformation };
