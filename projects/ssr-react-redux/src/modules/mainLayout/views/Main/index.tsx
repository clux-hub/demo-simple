import React from 'react';
import {RouteParams, APPState, LoadView} from '@/Global';
import {connectRedux} from '@clux/react-web';
import NavBar from '@stage/components/NavBar';
import TabBar from '../TabBar';
import styles from './index.module.less';

const Photo = LoadView('photo', 'main');

export interface StoreProps {
  subView: RouteParams;
}
export interface OwnerProps {}
export interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({subView}) => {
  return (
    <>
      <NavBar title="相册" />
      <div className={styles.root}>{subView.photo && <Photo />}</div>
      <TabBar />
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {subView: appState.route.params};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
