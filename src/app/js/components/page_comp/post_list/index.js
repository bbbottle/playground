import React from 'react';

import {
  TickLoader as Spinner,
  ErrorIcon,
  IconText,
  COLORS
} from '@zhoujiahao/bblego'
import { PostsProvider } from '../../data-provider';
import { MountOnScrollToBottom } from '../../util_comp/';
import Post from './post';

class PostList extends React.PureComponent {
  renderErrorView = (error) => {
    return (
      <IconText
        color={COLORS.$red3}
        icon={<ErrorIcon/>}
      >
        {error.message || 'ERROR'}
      </IconText>
    )
  };

  renderList = () => {
    return (
      <PostsProvider
        errorView={this.renderErrorView}
        spinner={<Spinner absCenter />}
      >
        {({ posts }) => {
          return (
            <MountOnScrollToBottom
              mountSize={5}
              bufferDistance={100}
              wrapperSelector=".posts-wrapper"
            >
              {posts && posts.slice().reverse().map(p => <Post post={p}/>)}
            </MountOnScrollToBottom>
          )
        }}
      </PostsProvider>
    )
  };

  render() {
    return (
      this.renderList()
    );
  }
}

export const Posts = (props) => (
  <div
    className="posts-wrapper"
    style={{
      overflow: 'auto',
      height: '100%'
    }}
  >
    <PostList />
  </div>
);

