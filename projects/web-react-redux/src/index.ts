import {createApp, createRedux} from '@clux/react-web';
import {moduleGetter} from './Project';
import '@stage/assets/css/iconfont.css';
import '@stage/assets/css/global.module.less';

createApp(moduleGetter)
  .useStore(createRedux({}))
  .render()
  .then(() => {
    const initLoading = document.getElementById('g-init-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
