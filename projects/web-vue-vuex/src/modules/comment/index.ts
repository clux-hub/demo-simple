import {exportModule} from '@clux/vue-web';
import {ModuleHandlers} from './model';
import Main from './views/Main.vue';

export default exportModule('comment', ModuleHandlers, {}, {main: () => Main});
