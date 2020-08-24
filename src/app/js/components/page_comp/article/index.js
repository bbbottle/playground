import React from 'react';

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

const Article = ({
  title, content, actions, progress, ...rest
}) => {
  return (
    <Layout
      progress={progress}
      left={wrapTitle(title)}
      rightTop={<HTML md={content} />}
      rightBottom={actions}
      {...rest}
    />
  )
};

export const Articles = ({ context }) => {
  const { setCursorText } = React.useContext(context.CursorContext);

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
                const progress = `${rest.currentPageIndex} / ${rest.totalPages}`;
                const post = currentPageData[0];
                return (
                  <Article
                    onLeftClick={rest.prev}
                    onRightClick={rest.next}
                    progress={progress}
                    setCursorText={setCursorText}
                    {...rest}
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
