export default {
  data: function () {
    return {
      get logLevelColors() {
        return {
          error: '#ffadad',
          warning: '#ffd6a5',
          info: '#fdffb6',
          debug: '#caffbf',
          trace: '#9bf6ff',
          undefined: '#a0c4ff',
        };
      },
    };
  },
};
