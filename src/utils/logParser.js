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

function getCommunicationLog(logObject) {
  if (logObject) {
    // TODO: filter
    return logObject;
  }
  return [];
}

function getApplicationLog(logObject) {
  // Parse you log file here in order to have an array with the followign elements
  debugger;
  return logObject;
}

export { parseLogFile, getCommunicationLog, getApplicationLog };
