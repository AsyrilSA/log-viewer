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
              return '#A9A9A9';
            case LogLevel.DEBUG:
              return '#DCDCDC';
            case LogLevel.INFO:
              return '#66CC00';
            case LogLevel.WARNING:
              return '#FFCC00';
            case LogLevel.ERROR:
              return '#FF7575';
          }
        };
      },
    };
  },
};
