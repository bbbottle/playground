import React from 'react';
import hash from 'object-hash';

import {
  TickLoader,
  IconText,
  COLORS,
  ErrorIcon,
  YuQueIcon
} from '@zhoujiahao/bblego';
import './index.scss';
import {
  YuQueAuth,
  genYuQueCommands
} from './yuque/';

const authResultKey = 'auth-result';
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

  componentDidMount() {
    const authResult = this.loadAuthResult();
    if (authResult) {
      this.install(authResult);
    }
  }

  genTmpId = (title) => {
    return hash(title).slice(16);
  }

  clearAuthResult = () => {
    localStorage.removeItem(authResultKey);
  };

  saveAuthResult = (authResult) => {
    localStorage.setItem(authResultKey, JSON.stringify(authResult));
  };

  loadAuthResult = () => {
    const result = localStorage.getItem(authResultKey)
    if (result) {
      return JSON.parse(result);
    }
  }

  install = (authResult) => {
    this.saveAuthResult(authResult);
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
            ...genYuQueCommands(authResult.token)
          ]
        });
      })
      .finally(() => {
        this.clearAuthResult();
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
