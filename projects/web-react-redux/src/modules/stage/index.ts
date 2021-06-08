import {exportModule} from '@clux/react-web';
import Main from './views/Main';
import {ModuleHandlers} from './model';

export default exportModule('stage', ModuleHandlers, {}, {main: () => Main});
