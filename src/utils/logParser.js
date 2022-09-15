const RE_PYTHON = new RegExp(
  /^(?<date>\d+-\d+-\d+) (?<time>\S+) (?<service>\S+) \[(?<level>\w+\s*)\] (?<message>.*)/
);

const RE_CPP = new RegExp(
  /^\[(?<date>\d+-\d+-\d+) (?<time>\S+)\] \[(?<service>\S+)\] \[(?<level>\w+)\] (?<message>.*)/
);

function parseLine(index, line) {
  var match = line.match(RE_PYTHON);
  if (match) {
    const { date, time, service, level, message } = match.groups;
    return {
      id: index,
      type: level,
      timestamp: new Date(Date.parse(date + " " + time.replace(",", "."))), // Python use ',' to separate milliseconds
      service: service,
      message: message,
    };
  }

  match = line.match(RE_CPP);
  if (match) {
    const { date, time, service, level, message } = match.groups;
    var fixedDate = new Date(Date.parse(date + " " + time));
    // Time from the C++ service is not in the same timezone as the Python service. We do a fixed -2 hours
    // here for now but this is not 100% correct (e.g. in winter).
    // TODO: find a way to correct the time properly
    fixedDate.setHours(fixedDate.getHours() - 2);
    return {
      id: index,
      type: level.toUpperCase(),
      timestamp: fixedDate,
      service: service,
      message: message,
    };
  }

  // TODO: what do we do with the "other" log lines? Do we drop them or keep them in a special "category"?
  console.log("Match failed for: " + line);

  return null;
}

function parseLogFile(logLines) {
  var entries = [];

  // By lines
  const lines = logLines.split("\n");
  for (var line = 0; line < lines.length; line++) {
    const item = parseLine(line, lines[line]);
    if (item) {
      entries.push(item);
    }
  }

  return entries;
}

/**
 * Filter log entries.
 *
 * include and exclude can be used to filter out log entries. A log entry will be included/excluded if it matches one
 * (or several) test.
 *
 * @param {Array} logObject an array of log entries
 * @param {Array} include an array of functions with a log entry as single parameter.
 * @param {Array} exclude an array of functions with a log entry as single parameter.
 * @returns a filtered array of log entries
 */
function filterLogs(logObject, include, exclude = []) {
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

function getCommunicationLog(logObject) {
  // Only consider log entries from the robot service
  return filterLogs(logObject, [(x) => x.service.startsWith("backend.robot")]);
}

function getApplicationLog(logObject) {
  // Consider all current log entries (the parser removes entries that do not belong to the application)
  return logObject;
}

export { parseLogFile, getCommunicationLog, getApplicationLog };
