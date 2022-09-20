import { boot } from 'quasar/wrappers';
import colorsMixin from 'src/mixins/colorsMixin';

export default boot(({ app }) => {
  app.mixin(colorsMixin);
});
