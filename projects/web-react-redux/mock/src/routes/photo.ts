import {Router} from 'express';
import {GetList, GetItem} from '@/modules/photo/entity';
import mockjs from 'mockjs';
import {extractQuery} from '../utils';
import {database} from '../database';

const router = Router();

router.get('/', function (req, res, next) {
  const args = extractQuery({pageCurrent: '', keyword: ''}, req.query);
  const query: GetList['Request'] = {
    pageCurrent: parseInt(args.pageCurrent, 10) || 1,
    keyword: args.keyword,
  };
  const {pageCurrent, keyword} = query;

  const pageSize = 10;
  const start = (pageCurrent - 1) * pageSize;
  const end = start + pageSize;

  const datasource = database.photos;
  let listData = Object.keys(datasource).map((id) => {
    return datasource[id];
  });

  if (keyword) {
    listData = listData.filter((item) => item.title.includes(keyword));
  }

  const result: GetList['Response'] = {
    listSummary: {
      pageCurrent,
      pageSize,
      totalItems: listData.length,
      totalPages: Math.ceil(listData.length / pageSize),
    },
    list: listData.slice(start, end),
  };

  res.json(result);
});

router.get('/:id', function (req, res, next) {
  const args = extractQuery({id: ''}, req.params);
  const query: GetItem['Request'] = {
    id: args.id,
  };
  const {id} = query;

  const item = database.photos[id];
  if (!item) {
    res.status(404).end();
  } else {
    const result: GetItem['Response'] = {...item, remark: mockjs.Random.cparagraph(10, 20)};
    res.json(result);
  }
});
export default router;
