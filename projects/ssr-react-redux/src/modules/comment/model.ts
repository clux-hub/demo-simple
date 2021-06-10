import {BaseModuleHandlers, BaseModuleState, effect, reducer} from '@clux/react-web';
import {ListItem, ListSearch, ListSummary, ListView, api} from './entity';

export interface ModuleState extends BaseModuleState {
  listView?: ListView;
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, {}> {
  constructor(moduleName: string) {
    super(moduleName, {});
  }

  @reducer
  public putList(listSearch?: ListSearch, list?: ListItem[], listSummary?: ListSummary, listView: ListView = ''): ModuleState {
    return {...this.state, listSearch, list, listSummary, listView};
  }

  @effect()
  public async fetchList(args: Partial<ListSearch>, listView: ListView = 'list') {
    const listSearch$ = {...this.state.listSearch!, ...args};
    const {list, listSummary} = await api.getList(listSearch$);
    this.dispatch(this.actions.putList(listSearch$, list, listSummary, listView));
  }
}
