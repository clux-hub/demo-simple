import {exportModule} from '@clux/react-web';
import {ModuleHandlers} from './model';
import Main from './views/Main';

export default exportModule('comment', ModuleHandlers, {}, {main: () => Main});
