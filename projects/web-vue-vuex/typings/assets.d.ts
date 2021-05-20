declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';
declare module '*.md';
declare module '*.vue' {
  import {Component} from 'vue';

  const component: Component;
  export default component;
}
