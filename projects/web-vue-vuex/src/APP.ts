import {getApp, Facade, GetAPP, VuexStore} from '@clux/vue-web';

import type {ModuleGetter} from './project';

declare const ENV: any;

type APP = GetAPP<Facade<ModuleGetter>>;

export type APPState = APP['State'];
export type RouteState = APP['State']['route'];

export const {Modules, Pagenames, LoadView, GetActions, GetRouter} = getApp<APP>();

export const staticServer: string = ENV.staticServer || '/client/';
export const apiMaps: {[key: string]: string} = ENV.apiMaps || {};

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: VuexStore<APPState>;
  }
}
