import React from 'react';
import { packageInfo } from '../../../config';

export const Version = () => {
  return (
    <span>
      {'v' + packageInfo.version}
    </span>
  )
};
