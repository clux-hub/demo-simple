import {Router} from 'express';
import {GetList} from '@/modules/comment/entity';
import {extractQuery} from '../utils';
import {database} from '../database';

const router = Router();

router.get('/', function (req, res, next) {
  const args = extractQuery({pageCurrent: '', articleId: ''}, req.query);
  const query: GetList['Request'] = {
    pageCurrent: parseInt(args.pageCurrent, 10) || 1,
    articleId: args.articleId,
  };
  const {pageCurrent} = query;

  const pageSize = 10;
  const start = (pageCurrent - 1) * pageSize;
  const end = start + pageSize;

  const datasource = database.comments;
  const listData = Object.keys(datasource).map((id) => {
    return datasource[id];
  });

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

export default router;
