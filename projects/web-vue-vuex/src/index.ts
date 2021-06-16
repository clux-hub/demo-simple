import {createApp, createVuex} from '@clux/vue-web';
import {moduleGetter} from './Project';

createApp(moduleGetter)
  .useStore(createVuex())
  .render()
  .then(() => {
    const initLoading = document.getElementById('g-init-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
