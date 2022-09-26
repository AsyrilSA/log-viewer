const RE_GENERIC = new RegExp(
  /^(?<date>\d+-\d+-\d+) (?<time>\S+) (?<logger>\S+)\s+\[(?<level>\w+)\s*\] (?<message>.*)/
);

const RE_CPP = new RegExp(
  /^\[(?<date>\d+-\d+-\d+) (?<time>\S+)\] \[(?<logger>\S+)\] \[(?<level>\w+)\] (?<message>.*)/
);

const RE_ENVOY = new RegExp(
  /^(?<date>\d+\/\d+\/\d+) (?<time>\S+) \[(?<level>\S+)\] (?<message>.*)/
);

const RE_ENVOY_NEW = new RegExp(
  /^\[(?<date>\d+\-\d+\-\d+) (?<time>\S+)\]\[\d+\]\[(?<level>\S+)\]\[(?<logger>\S+)\] \[\S+\] (?<message>.*)/
);

enum LogLevel {
  SYSTEM = 'SYSTEM',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

enum Direction {
  UNKNOWN = 'UNKNOWN',
  COMPUTER_TO_EYEPLUS = 'Received',
  EYEPLUS_TO_COMPUTER = 'Returned',
  CONNECTION_CLOSED = 'Connection closed',
  NEW_CONNECTION = 'Serving client',
}

interface LogEntry {
  id: number;
  level: LogLevel;
  timestamp: Date | null;
  service: string;
  logger: string;
  message: string;
  direction: Direction;
}

interface FilterCallable {
  (callable: LogEntry): boolean;
}

function parseLine(index: number, line: string): LogEntry {
  // TODO: refactor this as it is getting a bit too large

  // Try to parse the line as coming from generic service
  let match = line.match(RE_GENERIC);
  if (match != null) {
    const g = match.groups;

    let service = undefined;

    const serviceMap = new Map([
      [
        'backend',
        (entries: string[]) => {
          return entries[1];
        },
      ],
      [
        'host_service',
        (entries: string[]) => {
          return entries[0];
        },
      ],
      [
        'vision',
        (entries: string[]) => {
          return entries[0];
        },
      ],
      [
        'fieldbus',
        (entries: string[]) => {
          return entries[0];
        },
      ],
    ]);

    const entries = g?.logger.split('.');
    service = serviceMap.get(entries[0])?.(entries) || 'system';

    const direction = Object.values(Direction).find((key) =>
      g?.message.startsWith(key)
    ) as Direction | Direction.UNKNOWN;

    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: new Date(
        Date.parse(g?.date + ' ' + g?.time.replace(',', '.'))
      ), // Python use ',' to separate milliseconds
      service: service,
      logger: g?.logger || '',
      message: g?.message || '',
      direction: direction as Direction,
    };
  }

  // Try to parse the line as coming from a C++ service
  match = line.match(RE_CPP);
  if (match != null) {
    const g = match.groups;

    const fixedDate = new Date(Date.parse(g?.date + ' ' + g?.time));
    // Time from the C++ service is not in the same timezone as the Python service. We do a fixed -2 hours
    // here for now but this is not 100% correct (e.g. in winter).
    // TODO: find a way to correct the time properly
    fixedDate.setHours(fixedDate.getHours() - 2);

    let service = undefined;

    // We need some special handling to differentiate vision from fieldbus logs
    const fieldbusLogger = new Set([
      'application',
      'application.ecs',
      'object_dictionary',
      'production',
    ]);

    if (g?.logger) {
      if (g.logger.startsWith('fieldbus.') || fieldbusLogger.has(g.logger)) {
        service = 'fieldbus';
      }
    }

    // Anything C++ not fieldbus is considered to be from vision
    if (service === undefined) {
      service = 'vision';
    }

    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: fixedDate,
      service: service,
      logger: g?.logger || '',
      message: g?.message || '',
      direction: Direction.UNKNOWN,
    };
  }

  // Try to parse the line as coming from an Envoy service
  match = line.match(RE_ENVOY);
  if (match != null) {
    const g = match.groups;
    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: new Date(Date.parse(g?.date + ' ' + g?.time)),
      service: 'envoy',
      logger: 'envoy',
      message: g?.message || '',
      direction: Direction.UNKNOWN,
    };
  }

  // Try to parse the line as coming from a different Envoy log format
  match = line.match(RE_ENVOY_NEW);
  if (match != null) {
    const g = match.groups;
    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: new Date(Date.parse(g?.date + ' ' + g?.time)),
      service: 'envoy',
      logger: g?.logger || 'envoy',
      message: g?.message || '',
    };
  }

  // The line probably belongs to the system. Use a special service to identify this
  return {
    id: index,
    level: LogLevel.SYSTEM,
    timestamp: null,
    service: 'system',
    logger: 'system',
    message: line,
    direction: Direction.UNKNOWN,
  };
}

function parseLogFile(logLines: string): LogEntry[] {
  const entries: LogEntry[] = [];

  // By lines
  const lines = logLines.split('\n');
  for (let line = 0; line < lines.length; line++) {
    const message = lines[line].trim();
    if (message) {
      entries.push(parseLine(line, message));
    }
  }

  return entries;
}

/**
 * Filter log entries.
 *
 * include and exclude can be used to filter out log entries. A log entry will be included/excluded if it matches one
 * (or several) test. The entries are first checked against the include filter and then against the exclude filter.
 *
 * @param {LogEntry[]} logObject an array of log entries
 * @param {FilterCallable[]} include an array of functions with a log entry as single parameter.
 * @param {FilterCallable[]} exclude an array of functions with a log entry as single parameter.
 * @returns a filtered array of log entries
 */
function filterLogs(
  logObject: LogEntry[],
  include: FilterCallable[],
  exclude: FilterCallable[] = []
) {
  return logObject
    .filter((logLine) =>
      include.reduce((previous, current) => previous || current(logLine), false)
    )
    .filter(
      (logLine) =>
        !exclude.reduce(
          (previous, current) => previous || current(logLine),
          false
        )
    );
}

export { parseLogFile, filterLogs, LogLevel, Direction };
export type { LogEntry };
