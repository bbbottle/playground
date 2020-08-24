import React from 'react';

import GoldenTopDown from './golden_ratio_top_down'
import {WithGuideLine} from '../attach_guide_line';
import {EmptyDiv} from '../index';

const EmptyDivWithGuideLine = WithGuideLine(EmptyDiv);

export default (props) => {
  const {top, down, alignTopItems, ratio, padding, fullHeight, withGuideLine, style} = props;

  return (
    <GoldenTopDown
      ratio={ratio}
      top={(
        <GoldenTopDown
          down={(
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding,
                alignItems: alignTopItems || 'unset'
              }}
            >
              {top}
            </div>
          )}
          top={withGuideLine ? <EmptyDivWithGuideLine top bottom/> : null}
          reverse
        />
      )}
      down={(
        <div style={{padding, height: fullHeight ? '100%' : 'auto', ...style}}>
          {down}
        </div>
      )}
    />
  )
}