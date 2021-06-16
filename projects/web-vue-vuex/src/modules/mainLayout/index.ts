import {exportModule} from '@clux/vue-web';
import Main from './views/Main.vue';
import {ModuleHandlers} from './model';

export default exportModule('mainLayout', ModuleHandlers, {}, {main: () => Main});
