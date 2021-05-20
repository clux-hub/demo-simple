import React, {Suspense} from 'react';
import {Dispatch, connectRedux} from '@clux/react-web';
import {APPState} from '@/APP';
import List from './List';
import {ListView} from '../entity';

const Test: React.FC<{msg: string}> = ({msg}) => {
  return <div>test{msg}</div>;
};

function loadView() {
  return (props: {msg: string}) => {
    return (
      <Suspense fallback="null">
        <Test {...props} />
      </Suspense>
    );
  };
}

const LoadTest = loadView();

export interface StoreProps {
  listView: ListView;
}
export interface OwnerProps {}
export interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({listView}) => {
  return (
    <>
      <LoadTest msg="hello" />
      {listView === 'list' && <List />}
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {listView: appState.photo.listView};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
