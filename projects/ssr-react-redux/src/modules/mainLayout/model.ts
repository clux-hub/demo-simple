import {BaseModuleState, BaseModuleHandlers} from '@clux/react-web';

export interface ModuleState extends BaseModuleState {}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, {}> {
  constructor(moduleName: string) {
    super(moduleName, {});
  }
}
