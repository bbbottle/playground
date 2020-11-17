import React from 'react';
import {Photos} from '../../photos';
import {CursorContext} from '../../../util_comp/cursor';

export const WhiteBoard = (props) => {
  const style = {
    background: 'white',
    width: '100%',
    height: '100%',
    padding: 10,
    border: 'solid 1px #ddd'
  }
  return (
    <div style={style}>{props.children}</div>
  )
}

export const PhotoBox = () => {
  return (
    <WhiteBoard>
      <Photos context={{ CursorContext }} />
    </WhiteBoard>
  );
}
