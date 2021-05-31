import React, {useCallback} from 'react';
import {connectRedux, Dispatch} from '@clux/react-web';
import {APPState, staticPrefix, GetRouter} from '@/APP';
import SimplePagination from '@/components/SimplePagination';
import SearchBar from '@/components/SearchBar';
import {ListItem, ListSearch, ListSummary} from '../../entity';
import styles from './index.module.less';

interface StoreProps {
  listVer?: number;
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps> = ({listSearch, list, listSummary, dispatch}) => {
  const onPageChange = useCallback((pageCurrent: number) => {
    // 通过非路由的方式： dispatch(Modules.photo.actions.fetchList({pageCurrent}));
    GetRouter().push({extendParams: 'current', params: {photo: {listSearch$: {pageCurrent}}}});
  }, []);
  const onSearch = useCallback((keyword: string) => {
    // 通过非路由的方式： dispatch(Modules.photo.actions.fetchList({pageCurrent:1,keyword}));
    GetRouter().push({extendParams: 'current', params: {photo: {listSearch$: {pageCurrent: 1, keyword}}}});
  }, []);
  const onShowDetail = useCallback((id: string) => {
    // 通过非路由的方式： dispatch(Modules.photo.actions.fetchItem(id));
    GetRouter().push({extendParams: 'current', params: {photo: {itemView: 'detail', itemId$: id}}});
  }, []);
  if (!listSearch || !list || !listSummary) {
    return null;
  }
  const {totalPages, pageCurrent} = listSummary;
  return (
    <div className={`${styles.root} g-pic-list`}>
      <SearchBar keyword={listSearch.keyword || ''} onSubmit={onSearch} />
      <div>
        {list.map((item) => (
          <div key={item.id} className="list-item" onClick={() => onShowDetail(item.id)}>
            <div className="list-pic" style={{backgroundImage: `url(${staticPrefix + item.coverUrl})`}}>
              <div className="list-title">{item.title}</div>
              <div className="props">
                <span className="iconfont icon-location" /> {item.departure}
                <span className="iconfont icon-tag" style={{marginLeft: '5px'}} /> {item.type}
              </div>
              <div className="desc">
                <div className="price">
                  <span className="unit">￥</span>
                  <span className="num">{item.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SimplePagination totalPages={totalPages} pageCurrent={pageCurrent} onChange={onPageChange} />
    </div>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  const {listSearch, list, listSummary} = appState.photo;
  return {listSearch, list, listSummary};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
