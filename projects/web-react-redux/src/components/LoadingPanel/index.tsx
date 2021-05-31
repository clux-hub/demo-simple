import {LoadingState} from '@clux/react-web';
import React from 'react';
import styles from './index.module.less';

interface Props {
  loadingState?: LoadingState;
}

const Component: React.FC<Props> = ({loadingState}) => {
  return loadingState === LoadingState.Start || loadingState === LoadingState.Depth ? (
    <div className={`${styles.root} ${loadingState}`}>
      <span className="loading-icon iconfont icon-hourglass" />
    </div>
  ) : null;
};

export default React.memo(Component);
