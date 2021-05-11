import React from 'react';
import styles from './index.module.less';

const Component: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className="loadingIcon at-icon at-icon-loading" />
    </div>
  );
};

export default React.memo(Component);
