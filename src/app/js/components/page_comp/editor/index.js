import React from 'react';

import { TickLoader, Input } from '@zhoujiahao/bblego';
import './index.scss';

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
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

  install = () => {
    this.setState({
      loading: true,
    });

    return import('@zhoujiahao/pm')
      .then(({ default: editorMod }) => {
        return editorMod.handler({
          user: 'z@zjh.im',
          password: this.state.password,
          dom: this.editorWrapper,
          commands: this.commands
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      })
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  renderForm = () => {
    return (
      <div className="keys">
        <Input
          type="password"
          placeholder="钥匙"
          onChange={this.handlePasswordChange}
          onBlur={this.install}
          autoComplete={false}
          autoFocus={false}
          autoSave={false}
        />
      </div>
    )
  };

  render() {
    return (
      <div
        className="posts-editor"
        ref={r => (this.editorWrapper = r)}
      >
        {this.state.loading ? <TickLoader /> : this.renderForm()}
      </div>
    )
  }
}

export {
  Editor
}
