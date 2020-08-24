import React from 'react';
import cn from 'classnames';

import './style.scss';

import { completionWith } from '@zhoujiahao/utils';

export default (props) => {
  const { current, total } = props;
  return (
    <div className="progress-number">
      <span className="current">{completionWith('0')(current, total)}</span>
      <span className="total">{props.total}</span>
    </div>
  )
}

const range = num => [...Array(num).keys()];

export const TickIndicator = (props) => {
  const {
    current,
    total,
    vertical,
    onClick = () => {},
    absRight,
    fixedTop,
  } = props;
  if (total < 2) {
    return null;
  }

  const progress = (current) => `${completionWith('0')(current, total)} / ${total}`;

  return (
    <div
      className={cn('tick-indicator', {
        'absolute-right': absRight,
        'fixed-top': fixedTop,
        vertical
      })}
      onClick={() => { onClick(current) }}
    >
      {
        range(total).map(i => {
          const isActive = i === current - 1;
          return (
            <div
              data-title={progress(i + 1)}
              className={cn('tick', {
                active: isActive,
              })}
            />
          )
        })
      }
    </div>
  )
};

export { default as DragTickIndicator } from './drag_tick_indicator';
