import {getApp, Facade, GetAPP} from '@clux/react-web';
import type {ModuleGetter} from './Project';

declare const ENV: {StaticPrefix: string; ApiPrefix: string};

type APP = GetAPP<Facade<ModuleGetter>>;

export type RouteParams = APP['RouteParams'];
export type APPState = APP['State'];
export type RouteState = APP['State']['route'];

export const {Modules, Pagenames, LoadView, GetActions, GetRouter} = getApp<APP>();

export const {StaticPrefix, ApiPrefix} = ENV;
