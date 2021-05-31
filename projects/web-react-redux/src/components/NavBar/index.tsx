import React from 'react';
import styles from './index.module.less';

interface Props {
  title: string;
  className?: string;
  theme?: 'dark' | 'light';
  onBack?: () => void;
}

const Component: React.FC<Props> = ({title, className = '', theme = 'dark', onBack}) => {
  return (
    <div className={`${styles.root} ${theme} ${className}`}>
      {onBack && <div className="btn-back iconfont icon-left" onClick={onBack} />}
      <div className="title">{title}</div>
    </div>
  );
};

export default React.memo(Component);
