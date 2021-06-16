import {exportModule} from '@clux/vue-web';
import Main from './views/Main.vue';
import {ModuleHandlers} from './model';

export default exportModule('stage', ModuleHandlers, {}, {main: () => Main});
