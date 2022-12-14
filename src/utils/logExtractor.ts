import { date } from 'quasar';
import { LogEntry, LogLevel } from './logParser';

interface LogInformation {
  softwareVersion: string;
  hardwareVersion: string;
  somSerialNumber: string;
  dateRange: LogDateRange;
  statistics: Map<string, Map<LogLevel, number>>;
}

interface LogDateRange {
  first: Date;
  last: Date;
}

interface Recipe {
  name: string;
  creationDate: Date;
  dualFeeding: boolean;
}

interface RecipeInformation {
  recipes: Map<number, Recipe>;
}

function getDateRange(logObject: LogEntry[]): LogDateRange {
  let firstDate: Date = date.buildDate({ year: 2042 });
  let lastDate: Date = new Date(0);

  if (logObject.length > 0) {
    logObject.forEach((value: LogEntry) => {
      // Log timestamp
      if (value.timestamp) {
        if (value.timestamp < firstDate) {
          firstDate = value.timestamp;
        }
        if (value.timestamp > lastDate) {
          lastDate = value.timestamp;
        }
      }
    });
  } else {
    // Empty list, we use the same date for first and last
    firstDate = lastDate;
  }

  return {
    first: firstDate,
    last: lastDate,
  };
}

function getLogInformation(logObject: LogEntry[]): LogInformation {
  let softwareVersion = '-';
  let hardwareVersion = '-';
  let somSerialNumber = '-';
  const logStatistics: Map<string, Map<LogLevel, number>> = new Map();

  logObject.forEach((value: LogEntry) => {
    if (value.message.startsWith('Software version:')) {
      softwareVersion = value.message.split(':')?.pop() || '-';
    } else if (value.message.startsWith('Hardware version:')) {
      hardwareVersion = value.message.split(':')?.pop() || '-';
    } else if (value.message.startsWith('SoM Serial number:')) {
      somSerialNumber = value.message.split(':')?.pop() || '-';
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
    dateRange: getDateRange(logObject),
    statistics: logStatistics,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRecipeInformation(metadata: any): RecipeInformation {
  const recipes: Map<number, Recipe> = new Map();

  const metadataRecipes = metadata.recipes;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadataRecipes.forEach((value: any) => {
    const info = value.info;
    const date = new Date(Date.parse(info.savedDate));
    const id = info.identifier.id.value;
    const name = info.identifier.name;
    const partRecipes = value.partRecipes;
    const dualFeeding = partRecipes.length > 1 ? true : false;
    recipes.set(id, {
      name: name,
      creationDate: date,
      dualFeeding: dualFeeding,
    });
  });

  return {
    recipes: recipes,
  };
}

export { getLogInformation, getDateRange, getRecipeInformation };
export type { LogInformation, LogDateRange, RecipeInformation };
