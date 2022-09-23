import { LogLevel } from 'src/utils/logParser';

export default {
  data: function () {
    return {
      get logLevelColors() {
        return (level: LogLevel) => {
          switch (level) {
            case LogLevel.SYSTEM:
              return '#66CCFF';
            case LogLevel.TRACE:
              return '#DCDCDC';
            case LogLevel.DEBUG:
              return '#A9A9A9';
            case LogLevel.INFO:
              return '#9be651';
            case LogLevel.WARNING:
              return '#FFCC00';
            case LogLevel.ERROR:
              return '#ff4d4d';
          }
        };
      },
    };
  },
};
