import {exportModule} from '@clux/vue-web';
import {ModuleHandlers, defaultRouteParams} from './model';
import Main from './views/Main.vue';

export default exportModule('photo', ModuleHandlers, defaultRouteParams, {main: () => Main});
