import React, { useState, useEffect } from 'react';

import { $ } from '@zhoujiahao/utils';
import useScrollStatus from "../use_scroll_status";

const MountOnScrollToBottom = (props) => {
  const {
    wrapperSelector,
    children,
    mountSize,
    bufferDistance,
  } = props;

  if (children.length <= 1 || !mountSize) {
    return children;
  }

  const mountSizeAtOneTime = mountSize > 0 ? mountSize : 1;
  const [hitBottomCount, setCount] = useState(1);
  const [isHitBottom] = useScrollStatus($(wrapperSelector), bufferDistance);

  useEffect(() => {
    if (isHitBottom) {
      setCount(hitBottomCount + 1);
    }
  }, [isHitBottom]);

  return children.slice(0, hitBottomCount * mountSizeAtOneTime);
};

export {
  MountOnScrollToBottom
};
