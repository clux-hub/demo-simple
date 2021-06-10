import {exportModule} from '@clux/react-web';
import {ModuleHandlers, defaultRouteParams} from './model';
import Main from './views/Main';

export default exportModule('photo', ModuleHandlers, defaultRouteParams, {main: () => Main});
