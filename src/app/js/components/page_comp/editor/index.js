import React from 'react';

import {
  getYuQueDocs
} from '../../data-provider';

import {
  TickLoader,
  IconText,
  COLORS,
  ErrorIcon,
  YuQueIcon
} from '@zhoujiahao/bblego';
import './index.scss';
import {YuQueAuth} from "./auth";

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false
    };
    this.commands = [{
      name: 'q',
      fn: props.openMenu,
    }, {
      name: 'vol', // view online
      fn: () => {
        props.gotoPage(2);
      }
    }];
  }

  genYuQueCommands = (token) => ([{
    name: 'yq',
    fn: (toast, cm, cmd, postManager) => {
      const {
        postListUpdater,
        loading,
        active
      } = postManager;
      loading(true);
      getYuQueDocs(token)
        .then((posts) => {
          postListUpdater((oldPosts) => {
            return [
              ...posts.map(p => ({ ...p, postType: 'draft'})),
              ...oldPosts
            ];
          })
          toast.success('语雀文档加载完毕')
        })
        .catch(() => {
          toast.error('语雀文档加载出错')
        })
        .finally(() => {
          loading(false);
        })
    }
  }])

  install = (authResult) => {
    this.setState({
      loading: true,
    });

    return import('@zhoujiahao/pm')
      .then(({ default: editorMod }) => {
        return editorMod.handler({
          user: 'z@zjh.im',
          password: authResult.secret,
          token: authResult.token,
          dom: this.editorWrapper,
          commands: [
            ...this.commands,
            ...this.genYuQueCommands(authResult.token)
          ]
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      })
  }


  handleAuthBtnClick = () => {
    YuQueAuth()
      .then(this.install)
      .catch(() => {
        this.setState({
          error: '非编辑部成员'
        })
      })
    return null;
  }

  renderAuthButton = () => {
    if (this.state.error) {
      return (
        <IconText
          color={COLORS.$red3}
          icon={<ErrorIcon/>}
          text={this.state.error}
        />
      )
    }

    if (this.state.loading) {
      return (
        <TickLoader absCenter />
      )
    }

    return (
      <IconText
        className="yuque-auth-btn clickable"
        onClick={this.handleAuthBtnClick}
        icon={<YuQueIcon />}
        text="语雀登录"
      />
    )
  };

  render() {
    return (
      <div
        className="posts-editor"
        ref={r => (this.editorWrapper = r)}
      >
        {this.renderAuthButton()}
      </div>
    )
  }
}

export {
  Editor
}
