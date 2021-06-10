import {BaseModuleHandlers, BaseModuleState, effect, reducer} from '@clux/react-web';
import fastEqual from 'fast-deep-equal';
import {ItemDetail, ListItem, ListSearch, ListSummary, RouteParams, ListView, ItemView, api} from './entity';

export const defaultRouteParams: RouteParams = {
  listSearch$: {
    pageCurrent: 1,
    keyword: null,
  },
  listView: '',
  itemId$: '',
  itemView: '',
};

export interface ModuleState extends BaseModuleState, RouteParams {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  itemId?: string;
  itemDetail?: ItemDetail;
}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, {}> {
  constructor(moduleName: string) {
    super(moduleName, {
      ...defaultRouteParams,
    });
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

  @reducer
  public putCurrentItem(itemId: string = '', itemDetail?: ItemDetail, itemView: ItemView = ''): ModuleState {
    return {...this.state, itemId, itemDetail, itemView};
  }

  @effect()
  public async fetchItem(itemId$: string, itemView: ItemView = 'detail') {
    const item = await api.getItem({id: itemId$});
    this.dispatch(this.actions.putCurrentItem(itemId$, item, itemView));
  }

  @effect(null)
  protected async ['this.Init, this.RouteParams']() {
    const {listView, listSearch$, listSearch, itemView, itemId$, itemId} = this.state;
    if (listView) {
      if (!fastEqual(listSearch$, listSearch)) {
        await this.dispatch(this.actions.fetchList(listSearch$, listView));
      }
    }
    if (itemView) {
      if (itemId$ !== itemId) {
        await this.dispatch(this.actions.fetchItem(itemId$, itemView));
      }
    }
  }
}
