import { LogLevel } from 'src/utils/logParser';

export default {
  data: function () {
    return {
      get logLevelColors() {
        return (level: LogLevel) => {
          switch (level) {
            case LogLevel.UNDEFINED:
              return '#a0c4ff';
            case LogLevel.TRACE:
              return '#9bf6ff';
            case LogLevel.DEBUG:
              return '#caffbf';
            case LogLevel.INFO:
              return '#fdffb6';
            case LogLevel.WARNING:
              return '#ffd6a5';
            case LogLevel.ERROR:
              return '#ffadad';
          }
        };
      },
    };
  },
};
