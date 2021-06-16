import React from 'react';
import {Provider} from 'react-redux';
import {connectRedux, LoadingState} from '@clux/react-web';
import {LoadView, RouteParams, APPState} from '@/Global';
import LoadingPanel from '../components/LoadingPanel';
import {CurUser} from '../entity';
import '../assets/css/iconfont.css';
import '../assets/css/global.module.less';

const MainLayout = LoadView('mainLayout', 'main');

interface StoreProps {
  globalLoading?: LoadingState;
  curUser: CurUser;
  subView: RouteParams;
}
interface OwnerProps {}
interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({globalLoading, subView}) => {
  return (
    <>
      {subView.mainLayout && <MainLayout />}
      <LoadingPanel loadingState={globalLoading} />
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {subView: appState.route.params, curUser: appState.stage.curUser, globalLoading: appState.stage.loading?.global};
}

const APP = connectRedux(mapStateToProps)(React.memo(Component));

export default function Root({store}) {
  return (
    <Provider store={store}>
      <APP />
    </Provider>
  );
}
