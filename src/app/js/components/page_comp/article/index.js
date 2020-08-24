import React from 'react';

import { LogoIcon } from '@zhoujiahao/bblego';
import { Layout } from "./layout";
import {
  HTML,
  PagingManager
} from "../../util_comp";
import { PostsProvider } from "../../data-provider";

import './index.scss'

const wrapTitle = (title = '') => {
  const cleanTitle = title
    .replace('《', '')
    .replace('》', '');

  return `《${cleanTitle}》`;
}

const Actions = ({
  next,
  prev,
  totalPages,
  onLogoClick,
  currentPageIndex,
}) => {
  return (
    <span className="actions">
      <span className="clickable" onClick={prev}>上一篇</span>
      <span className="clickable" onClick={next}>下一篇</span>
      <span className="counter">{`${currentPageIndex} / ${totalPages}`}</span>
      <span className="clickable" onClick={onLogoClick}><LogoIcon /></span>
    </span>
  );
}

const Article = ({ title, content, actions }) => {
  return (
    <Layout
      left={wrapTitle(title)}
      rightTop={<HTML md={content} />}
      rightBottom={actions}
    />
  )
};

export const Articles = ({ context }) => {
  const { openMenu } = React.useContext(context.BlogContext);
  return (
    <PostsProvider>
      {({ posts }) => {
        return (
          <PagingManager
            data={posts}
            pageSize={1}
            infiniteLoopMode
          >
            {({
                currentPageData,
                ...rest
              }) => {
                const post = currentPageData[0];
                return (
                  <Article
                    actions={<Actions onLogoClick={openMenu} {...rest} />}
                    {...post}
                  />
                )
            }}
          </PagingManager>
        )
      }}
    </PostsProvider>
  )
}
