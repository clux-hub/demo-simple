import React from 'react';
import {connectRedux, Provider} from '@clux/react-web/lib/with-redux';
import {LoadView, RouteState, APPState} from '@/APP';
import {CurUser} from '../entity';

const MainLayout = LoadView('mainLayout', 'main');

interface StoreProps {
  curUser: CurUser;
  subView: RouteState['params'];
}
interface OwnerProps {}
interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({subView}) => {
  return <>{subView.mainLayout && <MainLayout />}</>;
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
