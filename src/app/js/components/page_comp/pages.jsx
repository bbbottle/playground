import React from 'react';

import {
  RulerIcon,
  EditIcon,
  PostIcon,
  AboutIcon,
  PhotoIcon,
  QuestionIcon
} from '@zhoujiahao/bblego';
import { isMobile, pick } from "@zhoujiahao/utils";

import { Columns } from '../util_comp/layout';
import { Design } from './design';
import { Editor } from './editor';
import { CanvasPage } from './canvas';
import { Posts } from './post_list'
import { About } from './about';
import { Photos } from "./photos";
import { CursorContext } from '../util_comp/cursor';
// import { Unknown } from "./unknown";

const IS_MOBILE = isMobile();

export const pagesBuilder = (tools) => {
  const WrappedEditor = () => {
    const openMenu = () => {};
    const gotoPage = () => {};
    return (
      <Editor openMenu={openMenu} gotoPage={gotoPage} />
    )
  };

  const pages = {
    design: {
      title: '美术部',
      icon: <RulerIcon />,
      component: <Design />,
    },
    editor: {
      title: '编辑部',
      icon: <EditIcon />,
      fullScreen: true,
      component: <WrappedEditor />,
    },
    posts: {
      title: '杂记',
      icon: <PostIcon />,
      component: <Posts />,
    },
    articles: {
      title: '杂记',
      icon: <PostIcon />,
      fullScreen: true,
      component: (
        <Columns
          cols={[null, <Posts />, null]}
        />
      )
    },
    photos: {
      title: '照片',
      icon: <PhotoIcon />,
      component: <Photos context={{ CursorContext }} />,
    },
    about: {
      title: '关于',
      icon: <AboutIcon />,
      component: <About context={{ CursorContext }} />
    },
    canvas: {
      title: '画板',
      icon: <RulerIcon />,
      component: <CanvasPage />
    },
    // unknown: {
    //   title: '未知',
    //   icon: <QuestionIcon />,
    //   component: <Unknown />
    // }
  };

  const PcPages = pick(pages, [
    // 'design',
    // 'editor',
    'articles',
    'about',
    'canvas',
  ]);

  const MobilePages = pick(pages, [
    'posts',
    'about'
  ]);

  return IS_MOBILE ? MobilePages : PcPages;
}



