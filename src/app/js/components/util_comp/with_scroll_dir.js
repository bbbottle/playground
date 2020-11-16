import React from 'react';
import { useScrollDirection } from './common_hooks';

export const WithScrollDir = (props) => {
  const [dir] = useScrollDirection();
  return props.children(dir)
};
