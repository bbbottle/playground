import React from 'react';
import cn from 'classnames';


import './base-link.scss'

const BaseLink = (props) => {
  const { href, text, type, command, className, ...rest } = props;

  return (
    <a
      className={cn("base-link", className)}
      href={href}
      tabIndex={-1}
      target="_blank"
      {...rest}
    >{text || rest.children }</a>
  );
};

export { BaseLink }
