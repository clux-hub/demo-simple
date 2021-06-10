import React from 'react';
import styles from './index.module.less';

interface Props {
  totalPages: number;
  pageCurrent: number;
  onChange: (page: number) => void;
}

const Component: React.FC<Props> = ({totalPages, pageCurrent, onChange}) => {
  return (
    <div className={styles.root}>
      {pageCurrent > 1 && (
        <a className="item" onClick={() => onChange(pageCurrent - 1)}>
          <span className="iconfont icon-left" />
          上一页
        </a>
      )}
      {pageCurrent < totalPages && (
        <a className="item" onClick={() => onChange(pageCurrent + 1)}>
          下一页
          <span className="iconfont icon-right" />
        </a>
      )}
      <div className="info">
        - 第 {pageCurrent} 页 / 共 {totalPages} 页 -
      </div>
    </div>
  );
};

export default React.memo(Component);
