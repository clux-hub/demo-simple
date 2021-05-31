import {RouteParams} from './entity';

const defaultRouteParams: RouteParams = {
  listSearch$: {
    pageCurrent: 1,
    keyword: null,
  },
  listView: '',
  itemId$: '',
  itemView: '',
};

export default defaultRouteParams;
