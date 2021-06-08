import request, {APIRequest} from '@stage/utils/request';

export interface ListItem {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdTime: string;
  replies: number;
}
export interface ListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface ListSearch {
  pageCurrent: number;
  articleId: string;
}

export type ListView = 'list' | '';

export type GetList = APIRequest<ListSearch, {list: ListItem[]; listSummary: ListSummary}>;

class API {
  public getList(params: GetList['Request']): Promise<GetList['Response']> {
    return request
      .get<GetList['Response']>('/api/comment', {params})
      .then((res) => {
        return res.data;
      });
  }
}

export const api = new API();
