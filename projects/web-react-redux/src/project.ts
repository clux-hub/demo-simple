import {createRouteModule, DeepPartial} from '@clux/react-web';
import * as StageModule from './modules/stage';
import photoDefaultRouteParams from './modules/photo/meta';

const defaultRouteParams = {
  route: {},
  stage: {},
  mainLayout: {},
  comment: {},
  photo: photoDefaultRouteParams,
};

type RouteParams = typeof defaultRouteParams;
type PartialRouteParams = DeepPartial<RouteParams>;

const pagenameMap = {
  '/': {
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
  route: () => createRouteModule(defaultRouteParams, pagenameMap),
  stage: () => {
    return StageModule;
  },
  mainLayout: () => {
    return import('./modules/mainLayout');
  },
  photo: () => {
    return import('./modules/photo');
  },
  comment: () => {
    return import('./modules/comment');
  },
};

export type ModuleGetter = typeof moduleGetter;
