import React, {useCallback, useState, useEffect} from 'react';
import {Dispatch} from '@clux/react-web';
import {staticPrefix, GetRouter, LoadView, Modules} from '@/APP';
import NavBar from '@/components/NavBar';
import {ItemDetail} from '../../entity';
import styles from './index.module.less';

const Comment = LoadView('comment', 'main');

interface OwnerProps {
  itemDetail: ItemDetail;
  dispatch: Dispatch;
}

const Component: React.FC<OwnerProps> = ({itemDetail, dispatch}) => {
  const [moreDetail, setMoreDetail] = useState(false);
  const toggleDetail = useCallback(() => {
    setMoreDetail(!moreDetail);
  }, [moreDetail]);

  const [showComment, setShowComment] = useState(false);
  const toggleComment = useCallback(() => {
    setShowComment(!showComment);
  }, [showComment]);

  const onClose = useCallback(() => GetRouter().push({extendParams: 'current', params: {photo: {itemId$: '', itemView: ''}}}), []);

  useEffect(() => {
    dispatch(Modules.comment.actions.fetchList({pageCurrent: 1, articleId: itemDetail.id}));
  }, [dispatch, itemDetail.id]);

  return (
    <div className={`${styles.root} g-doc-width`}>
      <div className="close iconfont icon-close-circle" onClick={onClose} />
      <div className="article">
        <div className="subject">{itemDetail.title}</div>
        <div className={`remark${moreDetail ? ' on' : ''}`} onClick={toggleDetail}>
          {itemDetail.remark}
        </div>
      </div>
      <div className="commentBar" onClick={toggleComment}>
        <div className="iconfont icon-star" />
        <div>{itemDetail.hot}</div>
        <div className="split" />
        <div className="iconfont icon-message" />
        <div>{itemDetail.comments}</div>
      </div>
      <div className="content" style={{backgroundImage: `url(${staticPrefix + itemDetail.coverUrl})`}} />
      {showComment && (
        <div className="comment">
          <NavBar title="评论" theme="light" onBack={toggleComment} />
          <Comment />
        </div>
      )}
    </div>
  );
};

export default React.memo(Component);
