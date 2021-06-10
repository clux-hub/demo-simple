import {createApp, createRedux} from '@clux/react-web';
import {moduleGetter} from './Project';
import '@stage/assets/css/iconfont.css';
import '@stage/assets/css/global.module.less';

export default function server(request: any, response: any) {
  return createApp(moduleGetter).useStore(createRedux({})).ssr({url: request.url});
}
