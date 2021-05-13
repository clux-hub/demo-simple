import React from 'react';
import {Dispatch} from '@clux/react-web';
import {connectRedux} from '@clux/react-web/lib/with-redux';
import {APPState, staticServer} from '@/APP';
import {ListItem, ListSearch, ListSummary} from '../../entity';
import styles from './index.m.less';

interface StoreProps {
  listVer?: number;
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  routeKey: string;
  routeAction: string;
}

interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps> = ({listSearch, list, listSummary, listVer = 0, routeKey, routeAction, dispatch}) => {
  if (!listSearch || !list || !listSummary) {
    return null;
  }
  return (
    <div className={`g-pic-list ${styles.root}`}>
      {list.map((item) => (
        <div key={item.id} className="list-item">
          <div className="list-pic" style={{backgroundImage: `url(${staticServer + item.coverUrl})`}}>
            <div className="list-title">
              {item.id}
              {item.title}
            </div>
            <div className="props">
              <div className="at-icon at-icon-map-pin" /> {item.departure}
              <div className="at-icon at-icon-star" style={{marginLeft: '5px'}} /> {item.type}
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
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  const thisModule = appState.photo!;
  const {listSearch, list, listSummary} = thisModule;
  return {listSearch, list, listSummary, routeKey: appState.route.key, routeAction: appState.route.action};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
