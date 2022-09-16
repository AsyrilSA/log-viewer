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
  UNDEFINED = "UNDEFINED",
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

interface LogEntry {
  id: number;
  level: LogLevel;
  timestamp: Date | null;
  service: string;
  message: string;
}

interface FilterCallable {
  (callable: LogEntry): boolean;
}

function parseLine(index: number, line: string): LogEntry {
  // Try to parse the line as coming from a Python service
  var match = line.match(RE_PYTHON);
  if (match != null) {
    const { date, time, service, level, message } = match.groups;
    return {
      id: index,
      level: LogLevel[level.toUpperCase()],
      timestamp: new Date(Date.parse(date + " " + time.replace(",", "."))), // Python use ',' to separate milliseconds
      service: service,
      message: message,
    };
  }

  // Try to parse the line as coming from a C++ service
  match = line.match(RE_CPP);
  if (match != null) {
    const { date, time, service, level, message } = match.groups;
    var fixedDate = new Date(Date.parse(date + " " + time));
    // Time from the C++ service is not in the same timezone as the Python service. We do a fixed -2 hours
    // here for now but this is not 100% correct (e.g. in winter).
    // TODO: find a way to correct the time properly
    fixedDate.setHours(fixedDate.getHours() - 2);
    return {
      id: index,
      level: LogLevel[level.toUpperCase()],
      timestamp: fixedDate,
      service: service,
      message: message,
    };
  }

  // Try to parse the line as coming from an Envoy service
  match = line.match(RE_ENVOY);
  if (match != null) {
    const { date, time, level, message } = match.groups;
    return {
      id: index,
      level: LogLevel[level.toUpperCase()],
      timestamp: new Date(Date.parse(date + " " + time)),
      service: "envoy",
      message: message,
    };
  }

  // The line probably belongs to the system. Use a special service to identify this
  return {
    id: index,
    level: LogLevel.UNDEFINED,
    timestamp: null,
    service: "system",
    message: line,
  };
}

function parseLogFile(logLines: string): LogEntry[] {
  var entries: LogEntry[] = [];

  // By lines
  const lines = logLines.split("\n");
  for (var line = 0; line < lines.length; line++) {
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

function getCommunicationLog(logObject: LogEntry[]): LogEntry[] {
  // Only consider log entries from the robot service
  return filterLogs(logObject, [(x) => x.service.startsWith("backend.robot")]);
}

function getApplicationLog(logObject: LogEntry[]): LogEntry[] {
  // Consider all log entries except the system ones
  return filterLogs(logObject, [(x) => true], [(x) => x.service === "system"]);
}

export { parseLogFile, getCommunicationLog, getApplicationLog, LogLevel };
