import {BaseModuleState, BaseModuleHandlers} from '@clux/vue-web';

export interface ModuleState extends BaseModuleState {}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, {}> {
  constructor(moduleName: string) {
    super(moduleName, {});
  }
}
