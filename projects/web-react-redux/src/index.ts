import {createApp, createRedux} from '@clux/react-web';
import {moduleGetter} from './Project';

createApp(moduleGetter)
  .useStore(createRedux({}))
  .render()
  .then(() => {
    const initLoading = document.getElementById('g-init-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
