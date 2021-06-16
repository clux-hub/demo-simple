import React from 'react';
import {connectRedux} from '@clux/react-web';
import {RouteParams, APPState} from '@/Global';
import styles from './index.module.less';

interface StoreProps {
  subView: RouteParams;
}
interface OwnerProps {}
interface DispatchProps {}

const Component: React.FC<StoreProps & DispatchProps & OwnerProps> = ({subView}) => {
  return (
    <div className={`${styles.root}`}>
      <div>
        <span className="icon iconfont icon-camera" />
        <div className="title">相册</div>
      </div>
      <div>
        <span className="icon iconfont icon-video" />
        <div className="title">视频</div>
      </div>
      <div>
        <span className="icon iconfont icon-user" />
        <div className="title">我的</div>
      </div>
    </div>
  );
};

function mapStateToProps(appState: APPState): StoreProps {
  return {subView: appState.route.params};
}

export default connectRedux(mapStateToProps)(React.memo(Component));
