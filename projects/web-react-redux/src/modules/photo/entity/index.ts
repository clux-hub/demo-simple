import mockjs from 'mockjs';
import {delayPromise} from '@clux/react-web';

export interface ListItem {
  id: string;
  title: string;
  departure: string;
  type: string;
  hot: number;
  price: number;
  coverUrl: string;
  comments: number;
}
export interface ListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface ListSearch {
  pageCurrent: number;
}

export type ListView = 'list' | '';
export type ItemView = 'detail' | '';

export interface ItemDetail extends ListItem {
  remark: string;
  picList: string[];
}
export interface RouteParams {
  listView: ListView;
  listSearch$: ListSearch;
  itemView: ItemView;
  itemId$: string;
}

function createPhotoList(): {[id: string]: ListItem} {
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

const mockPhotoMap = createPhotoList();
const mockPhotoList = Object.keys(mockPhotoMap).map((id) => {
  return mockPhotoMap[id];
});

class API {
  @delayPromise(1)
  public getList(params: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const {pageCurrent = 1} = params;
    const pageSize = 10;
    const start = (pageCurrent - 1) * pageSize;
    const end = start + pageSize;
    return Promise.resolve({
      listSummary: {
        pageCurrent,
        pageSize,
        totalItems: mockPhotoList.length,
        totalPages: Math.ceil(mockPhotoList.length / pageSize),
      },
      list: mockPhotoList.slice(start, end),
    });
  }

  @delayPromise(1)
  public getItem(id: string): Promise<ItemDetail> {
    if (!id) {
      return Promise.resolve({} as any);
    }
    return Promise.resolve({
      ...mockPhotoMap[id],
      remark:
        '就前几天去的，爸妈没去过泰国，所以依然陪他们走完了行程。这次完得很顺心，这次是吸取教训，好几天前就找了闺蜜推荐了泰国的旅游私人定制师阿诺做了行程规划，酒店、景点门票、交通、导游包括保险这些都在很早前阿诺就已经帮我们安排好了，另外还有吃的东西好多也是阿诺给我们推荐的，这几天吃到的东西都很棒。一路上住的地方也都很安静也很舒适。导游讲解可专业也可细心了，玩下来感觉特别好，玩的景点也多，都是必去的。一路下来曼谷、大皇宫、玉佛寺、大城王朝遗址、四方水上市场、人妖表演、从林骑大象、乐趣马车、水果园、格兰岛、首富大庄园、游轮公主号、暹罗风情园、四面佛、KINGPOWER免税店 真正精华的景点阿诺都给我们安排到了。',
      picList: ['/client/imgs/1.jpg', '/client/imgs/2.jpg', '/client/imgs/3.jpg'],
    });
  }
}

export const api = new API();
