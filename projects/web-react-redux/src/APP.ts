import {getApp, Facade, GetAPP} from '@clux/react-web';
import type {ModuleGetter} from './project';

declare const ENV: {staticPrefix: string; apiPrefix: string};

type APP = GetAPP<Facade<ModuleGetter>>;

export type APPState = APP['State'];
export type RouteState = APP['State']['route'];

export const {Modules, Pagenames, LoadView, GetActions, GetRouter} = getApp<APP>();

export const {staticPrefix, apiPrefix} = ENV;
