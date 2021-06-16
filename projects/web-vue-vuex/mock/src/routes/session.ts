import {Router} from 'express';
import {GetCurUser, Login, Logout} from '@/modules/stage/entity';
import {database} from '../database';

const router = Router();

router.get('/', function (req, res, next) {
  const result: GetCurUser['Response'] = database.curUser;
  res.json(result);
});

router.put('/', function (req, res, next) {
  let {username = '', password = ''}: Login['Request'] = req.body;
  username = username.toString();
  password = password.toString();
  if (username === 'admin' && password === '123456') {
    database.curUser = database.adminUser;
    res.json(database.curUser);
  } else {
    res.status(422).json({
      message: '用户名或密码错误！',
    });
  }
});

router.delete('/', function (req, res, next) {
  database.curUser = database.guest;
  const result: Logout['Response'] = database.curUser;
  res.json(result);
});
export default router;
