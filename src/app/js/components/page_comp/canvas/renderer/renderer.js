import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { TickLoader } from '@zhoujiahao/bblego';

import {Photos} from '../../photos';
import {CursorContext} from '../../../util_comp/cursor';
import {FigmaLiveAddr} from '../../../../config';

export const WhiteBoard = (props) => {
  const style = {
    background: 'white',
    width: '100%',
    height: '100%',
    padding: props.padding || 0,
    border: 'solid 1px #ddd'
  }
  return (
    <div style={style}>{props.children}</div>
  )
}

export const DelBtn = (props) => {
  return (
    <button
      style={props.style || {}}
      className={cn("delete", props.className)}
      onClick={props.onClick}
    >
      ✕
    </button>
  )
};

export const ToolBar = (props) => {
  return (
    <div className="toolbar">
      <DelBtn onClick={props.remove} />
    </div>
  )
};

ToolBar.propTypes = {
  remove: PropTypes.func.isRequired,
}

export const PhotoBox = (props) => {
  return (
    <WhiteBoard padding={10}>
      <Photos context={{ CursorContext }} />
      <ToolBar {...props} />
    </WhiteBoard>
  );
}

export const emptyRender = () => null;
export const DesignFrame = (props) => {
  const {
    width, height
  } = props;

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  }

  return (
    <WhiteBoard>
      <iframe
        onLoad={handleLoad}
        width={width}
        frameBorder='none'
        height={height}
        style={{position: 'absolute'}}
        src={FigmaLiveAddr}
      />
      { loading && <TickLoader absCenter /> }
      <ToolBar {...props} />
    </WhiteBoard>
  )
}
