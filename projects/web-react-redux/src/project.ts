import {createRouteModule, DeepPartial} from '@clux/react-web';
import * as StageModule from './modules/stage';
import photoDefaultRouteParams from './modules/photo/meta';

const defaultRouteParams = {
  route: {},
  stage: {},
  mainLayout: {},
  photo: photoDefaultRouteParams,
};

type RouteParams = typeof defaultRouteParams;
type PartialRouteParams = DeepPartial<RouteParams>;

const pagenameMap = {
  '/photo/list': {
    argsToParams() {
      const pathParams: PartialRouteParams = {stage: {}, mainLayout: {}, photo: {listView: 'list'}};
      return pathParams;
    },
    paramsToArgs() {
      return [];
    },
  },
};

// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
  route: () =>
    createRouteModule(defaultRouteParams, pagenameMap, {
      in(nativeLocation) {
        let pathname = nativeLocation.pathname;
        if (pathname === '/') {
          pathname = '/photo/list';
        }
        return {...nativeLocation, pathname};
      },
      out(nativeLocation) {
        return nativeLocation;
      },
    }),
  stage: () => {
    return StageModule;
  },
  mainLayout: () => {
    return import('./modules/mainLayout');
  },
  photo: () => {
    return import('./modules/photo');
  },
};

export type ModuleGetter = typeof moduleGetter;
