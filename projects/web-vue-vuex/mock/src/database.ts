import {CurUser} from '@/modules/stage/entity';
import {ListItem as PhotoListItem} from '@/modules/photo/entity';
import {ListItem as CommentListItem} from '@/modules/comment/entity';
import mockjs from 'mockjs';

const guest: CurUser = {
  id: '0',
  username: 'guest',
  hasLogin: false,
  avatar: 'imgs/guest.png',
  mobile: '',
};
const adminUser: CurUser = {
  id: '1',
  username: 'admin',
  hasLogin: true,
  avatar: 'imgs/admin.jpg',
  mobile: '18498982234',
};
function createPhotoList() {
  const listData = {};
  mockjs
    .mock({
      'list|100': [
        {
          'id|+1': 1,
          title: '@ctitle(10, 20)',
          departure: '@city',
          type: '@cword(2,5)',
          price: '@natural(1000,2000)',
          hot: '@natural(100,999)',
          comments: '@natural(100,999)',
          coverUrl: '',
        },
      ],
    })
    .list.forEach((item) => {
      item.id = `${item.id}`;
      item.coverUrl = `imgs/${item.id % 17}.jpg`;
      listData[item.id] = item;
    });
  return listData;
}
function createCommentList() {
  const listData = {};
  mockjs
    .mock({
      'list|50': [
        {
          'id|+1': 1,
          userId: '@natural(1,10)',
          username: '@cname',
          avatarUrl: 'imgs/admin.jpg',
          content: '@cparagraph(3, 6)',
          replies: '@natural(0,10)',
          createdTime: '@date()',
        },
      ],
    })
    .list.forEach((item) => {
      item.id = `${item.id}`;
      listData[item.id] = item;
    });
  return listData;
}

export const database: {
  curUser: CurUser;
  guest: CurUser;
  adminUser: CurUser;
  photos: {[id: string]: PhotoListItem};
  comments: {[id: string]: CommentListItem};
} = {
  curUser: guest,
  guest,
  adminUser,
  photos: createPhotoList(),
  comments: createCommentList(),
};
