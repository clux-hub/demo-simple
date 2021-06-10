import {createRouteModule, DeepPartial} from '@clux/react-web';
import {RouteParams} from '@/Global';
import * as StageModule from './modules/stage';

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
  route: () => createRouteModule(pagenameMap),
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
