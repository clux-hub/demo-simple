import {BaseModuleState, BaseModuleHandlers} from '@clux/vue-web';
import {APPState} from '@/APP';

export interface ModuleState extends BaseModuleState {}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, APPState> {
  constructor() {
    super({});
  }
}
