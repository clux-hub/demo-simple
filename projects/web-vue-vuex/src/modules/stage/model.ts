import {ActionTypes, BaseModuleHandlers, BaseModuleState, effect, reducer, errorAction} from '@clux/vue-web';
import {CurUser, guest, api} from './entity';

export interface ModuleState extends BaseModuleState {
  curUser: CurUser;
}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, {}> {
  private privateActions = this.getPrivateActions({putCurUser: this.putCurUser});

  constructor(moduleName: string) {
    super(moduleName, {curUser: guest});
  }

  @reducer
  protected putCurUser(curUser: CurUser): ModuleState {
    return {...this.state, curUser};
  }

  @effect(null)
  protected async [ActionTypes.Error](error: {message: string}) {
    throw error;
  }

  @effect(null)
  protected async ['this.Init']() {
    window.addEventListener('unhandledrejection', (error) => {
      this.dispatch(errorAction(error.reason));
    });
    window.addEventListener('error', (error) => {
      this.dispatch(errorAction(error));
    });
    const curUser = await api.getCurUser();
    this.dispatch(this.privateActions.putCurUser(curUser));
  }
}
