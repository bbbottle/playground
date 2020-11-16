import React from 'react';
import ReactDOM from 'react-dom';
import classname from 'classnames';
import { $, isMobile } from '@zhoujiahao/utils';
import 'style/index.scss';
import 'style/markdown.scss';
import { Pages } from "../components/";
import { CursorContext, CursorLayer} from '../components/util_comp';

const IS_MOBILE = isMobile();
class Playground extends  React.PureComponent {
  state = {
    cursorText: '',
    isCursorVisible: true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isCursorVisible !== this.state.isCursorVisible
      && this.state.isCursorVisible
    ) {
      this.setCursorText('');
    }
  }

  setCursorText = (cursorText) => {
    this.setState({ cursorText });
  }

  handleCursorVisibility = (isCursorVisible) => {
    this.setState({ isCursorVisible });
  }

  render() {
    return (
      <div className={classname('App', {mobile: IS_MOBILE})}>
        <CursorContext.Provider value={{ setCursorText: this.setCursorText }}>
          <Pages />
        </CursorContext.Provider>
        <CursorLayer
          onCursorVisibilityChange={this.handleCursorVisibility}
          cursorText={this.state.cursorText}
        />
      </div>
    );
  }
}

const init = async () => {
  const mountDom = $('#gui');
  return ReactDOM.render(
    <Playground />,
    mountDom
  )
};

init().then(() => {
  console.log('loaded');
});
