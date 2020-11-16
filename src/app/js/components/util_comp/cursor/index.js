import React from 'react';
import cn from 'classnames';
import {
  useCursorPos, useElementClickable
} from "../common_hooks";

import './index.scss';

import {isMobile} from "@zhoujiahao/utils";

export const CursorLayer = (props) => {
  if (isMobile()) {
    return null;
  }

  const pos = useCursorPos();

  const [visible, setVisible] = React.useState(true);

  const { onCursorVisibilityChange = () => {} } = props;
  const elementUnderCursorClickable = useElementClickable();
  React.useEffect(() => {
    setVisible(!elementUnderCursorClickable);
    onCursorVisibilityChange(!elementUnderCursorClickable);
  }, [elementUnderCursorClickable])

  React.useEffect(() => {
    setVisible(!props.cursorText);
  }, [props.cursorText])

  const posStyle = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

  return (
    <div
      className="cursor-layer"
    >
      <div
        className={cn('custom-cursor', {
          hidden: !visible,
        })}
        style={{
          transform: posStyle,
        }}
      />
      {
        <div
          style={{ transform: posStyle }}
          className={cn('cursor-text', {
            hidden: !props.cursorText,
          })}
        >
          {props.cursorText}
        </div>
      }
    </div>
  )
}

export {
  CursorContext
} from './cursor_context';