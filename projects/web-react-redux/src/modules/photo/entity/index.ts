import request, {APIRequest} from '@stage/utils/request';

export interface ListItem {
  id: string;
  title: string;
  departure: string;
  type: string;
  hot: number;
  price: number;
  coverUrl: string;
  comments: number;
}
export interface ListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface ListSearch {
  pageCurrent: number;
  keyword: string | null;
}

export type ListView = 'list' | '';
export type ItemView = 'detail' | '';

export interface ItemDetail extends ListItem {
  remark: string;
}
export interface RouteParams {
  listView: ListView;
  listSearch$: ListSearch;
  itemView: ItemView;
  itemId$: string;
}

export type GetList = APIRequest<ListSearch, {list: ListItem[]; listSummary: ListSummary}>;
export type GetItem = APIRequest<{id: string}, ItemDetail>;

class API {
  public getList(params: GetList['Request']): Promise<GetList['Response']> {
    return request
      .get<GetList['Response']>('/api/photo', {params})
      .then((res) => {
        return res.data;
      });
  }

  public getItem(params: GetItem['Request']): Promise<GetItem['Response']> {
    return request.get<GetItem['Response']>(`/api/photo/${params.id}`).then((res) => {
      return res.data;
    });
  }
}

export const api = new API();
