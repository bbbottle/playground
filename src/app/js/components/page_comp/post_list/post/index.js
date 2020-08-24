import React from 'react';

import { HTML } from "../../../util_comp/";
import './style.scss';

export default (props) => {
  const {
    post, className
  } = props;

  return (
    <div className={`post ${className}`}>
      <div className="post-title">{post.title}</div>
      <HTML md={post.content} className="post-content" />
      <div className="post-date">{post.date}</div>
    </div>
  )
}
