import React from 'react';
import showdown from 'showdown';
export * from './progress_indicator';
export * from './attach_guide_line';
export * from './progress_indicator';
export { default as CursorTooltip } from './cursor_toolltip';
export * from './custom_link/base_link';
export * from './layout';
export { default as Img } from './Img/img';
export { default as PagingManager } from './paging_state_manager';
export * from './mount_on_scroll_to_bottom'

export const EmptyDiv = () => {
  return <div style={{display: 'flex', height: '100%'}} />
};

export const EmptyPlaceHolder = () => {
  return (
    <span style={{color: '#ccc'}}>无</span>
  )
};

const converter = new showdown.Converter({
  openLinksInNewWindow: true,
  simpleLineBreaks: true
});

converter.setFlavor('github');

const md2htm = md => converter && md
  ? converter.makeHtml(md)
  : md;

export const HTML = ({ md, className }) => {
  return (
    <div
      dangerouslySetInnerHTML={{__html: md2htm(md)}}
      className={`${className} markdown-body`}
    />
  );
}

export {
  CursorLayer,
  CursorContext
} from './cursor';

export * from './common_hooks'
export { default as useScrollStatus } from './use_scroll_status';
export { TVNoiseLayer } from './tv_noise_layer';