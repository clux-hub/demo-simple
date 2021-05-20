import {exportModule} from '@clux/vue-web';
import main from './views/Main.vue';
import {ModuleHandlers} from './model';

function ccc(a: number) {
  return a;
}
ccc(1);

export default exportModule('mainLayout', ModuleHandlers, {main});
