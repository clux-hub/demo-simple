import React from 'react';
import {Dispatch} from '@clux/react-web';
import {connectRedux} from '@clux/react-web/lib/with-redux';
import {APPState} from '@/APP';
import List from './List';
import {ListView} from '../entity';

export interface StoreProps {
  listView: ListView;
}
export interface OwnerProps {}
export interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({listView}) => {
  return <>{listView === 'list' && <List />}</>;
};

function mapStateToProps(appState: APPState): StoreProps {
  return {listView: appState.photo.listView};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
