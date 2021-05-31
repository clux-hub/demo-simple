import React from 'react';
import {Dispatch, connectRedux} from '@clux/react-web';
import {APPState} from '@/APP';
import List from './List';
import Detail from './Detail';
import {ListView, ItemView, ItemDetail} from '../entity';

// const Test: React.FC<{msg: string}> = ({msg}) => {
//   return <div>test{msg}</div>;
// };

// function loadView() {
//   return (props: {msg: string}) => {
//     return (
//       <Suspense fallback="null">
//         <Test {...props} />
//       </Suspense>
//     );
//   };
// }

// const LoadTest = loadView();

export interface StoreProps {
  listView: ListView;
  itemView: ItemView;
  itemDetail?: ItemDetail;
}
export interface OwnerProps {}
export interface DispatchProps {
  dispatch: Dispatch;
}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({listView, itemView, itemDetail, dispatch}) => {
  return (
    <>
      {listView === 'list' && <List />}
      {itemView === 'detail' && itemDetail && <Detail dispatch={dispatch} itemDetail={itemDetail} />}
    </>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  const {listView, itemView, itemDetail} = appState.photo;
  return {listView, itemView, itemDetail};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
