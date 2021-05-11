import {APPState} from '@/APP';
import {BaseModuleHandlers, BaseModuleState, effect, reducer} from '@clux/react-web';
import fastEqual from 'fast-deep-equal';
import {ItemDetail, ListItem, ListSearch, ListSummary, RouteParams, api} from './entity';

import defaultRouteParams from './meta';

export interface ModuleState extends BaseModuleState, RouteParams {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  itemId?: string;
  itemDetail?: ItemDetail;
}

export class ModuleHandlers extends BaseModuleHandlers<ModuleState, APPState> {
  constructor() {
    super({
      ...defaultRouteParams,
    });
  }

  @reducer
  public putList(listSearch?: ListSearch, list?: ListItem[], listSummary?: ListSummary): ModuleState {
    return {...this.state, listSearch, list, listSummary};
  }

  @effect('fetchList')
  public async fetchList(listSearch$: ListSearch) {
    const {list, listSummary} = await api.getList(listSearch$);
    this.dispatch(this.actions.putList(listSearch$, list, listSummary));
  }

  @reducer
  public putCurrentItem(itemId: string = '', itemDetail?: ItemDetail): ModuleState {
    return {...this.state, itemId, itemDetail};
  }

  @effect()
  public async fetchItem(itemId$: string) {
    const item = await api.getItem(itemId$);
    this.dispatch(this.actions.putCurrentItem(itemId$, item));
  }

  @effect(null)
  protected async ['this.Init, this.RouteParams']() {
    const {listView, listSearch$, listSearch, itemView, itemId$, itemId} = this.state;
    if (listView) {
      if (!fastEqual(listSearch$, listSearch)) {
        await this.dispatch(this.actions.fetchList(listSearch$));
      }
    }
    if (itemView) {
      if (itemId$ !== itemId) {
        await this.dispatch(this.actions.fetchItem(itemId$));
      }
    }
  }
}
