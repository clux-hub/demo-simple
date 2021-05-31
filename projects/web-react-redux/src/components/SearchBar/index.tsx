/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState} from 'react';
import styles from './index.module.less';

interface Props {
  keyword: string;
  onSubmit: (keyword: string) => void;
}

const Component: React.FC<Props> = ({keyword, onSubmit}) => {
  const [_keyword, _setKeyword] = useState(keyword);
  const [value, setValue] = useState(keyword);
  if (keyword !== _keyword) {
    _setKeyword(keyword);
    setValue(keyword);
  }
  return (
    <form
      className={styles.root}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <input
        name="keyword"
        className="keyword"
        type="text"
        placeholder="请输入搜索关键字..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="submit iconfont icon-search" />
    </form>
  );
};

export default React.memo(Component);
