import React, {useCallback} from 'react';
import {connectRedux, Dispatch} from '@clux/react-web';
import {APPState, StaticPrefix, Modules} from '@/Global';
import SimplePagination from '@stage/components/SimplePagination';
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
  const onPageChange = useCallback(
    (pageCurrent: number) => {
      dispatch(Modules.comment.actions.fetchList({pageCurrent}));
    },
    [dispatch]
  );
  if (!listSearch || !list || !listSummary) {
    return null;
  }
  const {totalPages, pageCurrent} = listSummary;
  return (
    <div className={`${styles.root}`}>
      <div>
        {list.map((item) => (
          <div key={item.id} className="list-item">
            <div className="avatar" style={{backgroundImage: `url(${StaticPrefix + item.avatarUrl})`}} />
            <div className="user">
              {item.username}
              <span className="date">{item.createdTime}</span>
            </div>
            <div className="content">{item.content}</div>
          </div>
        ))}
      </div>
      <SimplePagination totalPages={totalPages} pageCurrent={pageCurrent} onChange={onPageChange} />
    </div>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  const {listSearch, list, listSummary} = appState.comment;
  return {listSearch, list, listSummary};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
