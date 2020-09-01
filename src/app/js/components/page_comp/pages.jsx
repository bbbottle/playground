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

import { Design } from './design';
import { Editor } from './editor';
import { Posts } from './post_list'
import { About } from './about';
import { Photos } from "./photos";
import { Articles } from "./article";
import { Unknown } from "./unknown";

const IS_MOBILE = isMobile();

export const pagesBuilder = (tools) => {
  const {
    Context,
  } = tools;

  const {
    CursorContext,
    BlogContext,
  } = Context;

  const WrappedEditor = () => {
    const {
      openMenu,
      gotoPage
    } = React.useContext(BlogContext);
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
      component: <Articles context={{ BlogContext, CursorContext }} />,
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
    unknown: {
      title: '未知',
      icon: <QuestionIcon />,
      component: <Unknown />
    }
  };

  const PcPages = pick(pages, [
    'design',
    'editor',
    'articles',
    'photos',
    'about',
    'unknown'
  ]);

  const MobilePages = pick(pages, [
    'posts',
    'about'
  ]);

  return IS_MOBILE ? MobilePages : PcPages;
}



