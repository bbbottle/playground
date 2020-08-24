import React from 'react';

import { isMobile } from "@zhoujiahao/utils";
import BlogTopDown from './blog_top_down';

const CompOffset = (Comp, ratio) => (props) => {
  const retComp = <Comp {...props}/>;
  return isMobile()
    ? retComp
    : <BlogTopDown top={null} down={retComp} ratio={ratio} />
};

export {default as GoldenTopDown} from './golden_ratio_top_down';
export {default as BlogTopDown} from './blog_top_down';
export {default as Columns} from './columns';
export { CompOffset }

