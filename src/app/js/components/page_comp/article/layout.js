import React from 'react';

import './layout.scss';

export const Layout = (props) => {
  return (
    <div className="article-layout">
      <div className="left">{props.left}</div>
      <div className="right">
        <div className="right-top">
          {props.rightTop}
        </div>
        <div className="right-bottom">
          {props.rightBottom}
        </div>
      </div>
    </div>
  )
}