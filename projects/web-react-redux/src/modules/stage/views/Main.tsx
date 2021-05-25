import React from 'react';
import {Provider} from 'react-redux';
import {connectRedux} from '@clux/react-web';
import {LoadView, RouteState, APPState} from '@/APP';
import Img1 from '@/assets/imgs/loading48x48.gif';
import {CurUser} from '../entity';

const MainLayout = LoadView('mainLayout', 'main');

interface StoreProps {
  curUser: CurUser;
  subView: RouteState['params'];
}
interface OwnerProps {}
interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({subView}) => {
  return (
    <>
      {subView.mainLayout && <MainLayout />}
      <img src={Img1} alt="" />
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {subView: appState.route.params, curUser: appState.stage.curUser};
}

const APP = connectRedux(mapStateToProps)(React.memo(Component));

export default function Root({store}) {
  return (
    <Provider store={store}>
      <APP />
    </Provider>
  );
}
