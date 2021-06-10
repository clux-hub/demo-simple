import React from 'react';
import {Dispatch, connectRedux} from '@clux/react-web';
import {APPState} from '@/Global';
import List from './List';
import {ListView} from '../entity';

export interface StoreProps {
  listView?: ListView;
}
export interface OwnerProps {}
export interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({listView}) => {
  return <>{listView === 'list' && <List />}</>;
};

function mapStateToProps(appState: APPState): StoreProps {
  const {listView} = appState.comment;
  return {listView};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
