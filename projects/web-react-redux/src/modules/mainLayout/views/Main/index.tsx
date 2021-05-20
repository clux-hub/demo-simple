import React from 'react';
import {RouteState, APPState, LoadView} from '@/APP';
import {connectRedux} from '@clux/react-web';
import Navigation from '../Navigation';
import TabBar from '../TabBar';
import styles from './index.module.less';

const Photo = LoadView('photo', 'main');

export interface StoreProps {
  subView: RouteState['params'];
}
export interface OwnerProps {}
export interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({subView}) => {
  return (
    <>
      <Navigation />
      <div className={styles.root}>{subView.photo && <Photo />}</div>
      <TabBar />
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {subView: appState.route.params};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
