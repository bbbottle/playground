import React from 'react';
import cn from 'classnames';

import {
  showDesignBox,
  showPhotoBox,
  falsyMatcher,
} from './matcher';

import {
  emptyRender,
  DesignFrame,
  PhotoBox,
  DelBtn
} from './renderer';

const rendererMatcherMatrix = [
  [DesignFrame, showDesignBox],
  [PhotoBox, showPhotoBox]
];

const getBoxRenderer = (matrix, props) => {
  const defaultRendererMatcherPair = [emptyRender, falsyMatcher];
  const [ renderer ] = matrix.find(([r,m]) => m(props))
  || defaultRendererMatcherPair;

  return renderer;
}

export const staticBoxRenderer = (props) => {
  const Renderer = getBoxRenderer(rendererMatcherMatrix, props)
  return <Renderer {...props} />
};

export const previewBoxRenderer = (style) => {
  const active = showDesignBox(style)
    || showPhotoBox(style);

  const sizeStr = `${style.width}px ${style.height}px`;
  return (
    <div
      style={style}
      className={cn('preview-box',{ active })}
      data-size={sizeStr}
    />
  );
};

export const clearButtonRenderer = (props) => {
  return (
    <DelBtn
      onClick={props.clear}
      className="big black"
      style={{
        position: "absolute",
        right: '50%',
        bottom: 50
      }}
    />
  )
}
