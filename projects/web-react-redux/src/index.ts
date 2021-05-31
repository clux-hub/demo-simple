import {createApp, createRedux} from '@clux/react-web';
import {moduleGetter} from './project';
import '@/assets/css/iconfont.css';
import '@/assets/css/global.module.less';

createApp(moduleGetter)
  .useStore(createRedux({}))
  .render()
  .run()
  .then(() => {
    const initLoading = document.getElementById('g-init-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
