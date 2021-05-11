import {exportModule} from '@clux/react-web';
import {ModuleHandlers} from './model';
import main from './views/Main';

export default exportModule('photo', ModuleHandlers, {main});
