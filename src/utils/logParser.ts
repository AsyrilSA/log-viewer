const RE_PYTHON = new RegExp(
  /^(?<date>\d+-\d+-\d+) (?<time>\S+) (?<service>\S+)\s+\[(?<level>\w+)\s*\] (?<message>.*)/
);

const RE_CPP = new RegExp(
  /^\[(?<date>\d+-\d+-\d+) (?<time>\S+)\] \[(?<service>\S+)\] \[(?<level>\w+)\] (?<message>.*)/
);

const RE_ENVOY = new RegExp(
  /^(?<date>\d+\/\d+\/\d+) (?<time>\S+) \[(?<level>\S+)\] (?<message>.*)/
);

enum LogLevel {
  SYSTEM = 'SYSTEM',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

interface LogEntry {
  id: number;
  level: LogLevel;
  timestamp: Date | null;
  service: string;
  logger: string;
  message: string;
}

interface FilterCallable {
  (callable: LogEntry): boolean;
}

function parseLine(index: number, line: string): LogEntry {
  // Try to parse the line as coming from a Python service
  let match = line.match(RE_PYTHON);
  if (match != null) {
    const g = match.groups;

    let service = undefined;

    // We need some special handling for some of the log entries that do not start with "backend."
    if (g?.service.startsWith('backend.')) {
      service = g?.service.split('.')[1];
    } else if (g?.service.startsWith('host_service.')) {
      service = 'host_service';
    }

    if (service === undefined) {
      service = 'system';
    }

    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: new Date(
        Date.parse(g?.date + ' ' + g?.time.replace(',', '.'))
      ), // Python use ',' to separate milliseconds
      service: service,
      logger: g?.service || '',
      message: g?.message || '',
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
    return {
      id: index,
      level: LogLevel[g?.level.toUpperCase() as keyof typeof LogLevel],
      timestamp: fixedDate,
      service: 'vision',
      logger: g?.service || '',
      message: g?.message || '',
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
  };
}

function parseLogFile(logLines: string): LogEntry[] {
  const entries: LogEntry[] = [];

  // By lines
  const lines = logLines.split('\n');
  for (let line = 0; line < lines.length; line++) {
    entries.push(parseLine(line, lines[line]));
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

export { parseLogFile, filterLogs, LogLevel };
export type { LogEntry };
