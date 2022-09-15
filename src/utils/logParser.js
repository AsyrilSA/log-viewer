const RE_PYTHON = new RegExp(
  /^(?<date>\S+) (?<time>\S+) (?<service>\S+) \[(?<level>\w+\s*)\] (?<message>.*)/
);

function parseLine(index, line) {
  const match = line.match(RE_PYTHON);
  if (match) {
    const { date, time, service, level, message } = match.groups;
    return {
      id: index,
      type: level,
      timestamp: date + " " + time,
      service: service,
      message: message,
    };
  } else {
    console.log("Match failed for: " + line);
  }
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
  // Parse you log file here in order to have an array with the followign elements
  debugger;
  return logObject;
}

export { parseLogFile, getCommunicationLog };
