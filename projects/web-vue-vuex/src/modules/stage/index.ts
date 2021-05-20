import {exportModule} from '@clux/vue-web';
import main from './views/Main.vue';
import {ModuleHandlers} from './model';

export default exportModule('stage', ModuleHandlers, {
  main,
});
