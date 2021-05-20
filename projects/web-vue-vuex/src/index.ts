import {createApp, createVuex} from '@clux/vue-web';
import './APP';
import {moduleGetter} from './project';
import '@/assets/css/global.module.less';

createApp(moduleGetter)
  .useStore(createVuex({}))
  .render({id: 'root'})
  .run()
  .then(() => {
    const initLoading = document.getElementById('g-init-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
