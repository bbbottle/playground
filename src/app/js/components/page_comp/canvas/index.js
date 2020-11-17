import React from 'react';
import { BoxCanvas } from '@bbbottle/box-canvas'
import { boxRenderer } from './renderer/';
import './index.scss';

export const CanvasPage = () => {
  return (
    <div className="canvas-page">
      <BoxCanvas
        attachLineGutter={4}
        staticBoxRenderer={boxRenderer}
      />
    </div>
  )
}