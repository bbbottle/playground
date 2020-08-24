import React from 'react';
import ReactDom from 'react-dom';

const DEFAULT_GUIDELINE_COLOR = 'cyan';

export const WithGuideLine = (Component) => {
  return class WithGuideLineBase extends React.PureComponent {
    componentDidMount() {
      this.$rootDom = ReactDom.findDOMNode(this);
      this.$container = document.createElement('div');
      document.body.appendChild(this.$container);

      setTimeout(this.handleResize, this.props.delay || 0);
      // this.handleResize();
      window.addEventListener('resize', () => {
        this.handleResize();
      });
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      ReactDom.unmountComponentAtNode(this.$container);
      this.$container.remove();
    }

    handleResize = (show) => {
      ReactDom.render(
        this.renderGuideLines(this.$rootDom.getBoundingClientRect()),
        this.$container
      );
    };

    renderGuideLines = (rectObj) => {
      const {
        top: showTopLine,
        bottom: showBotLine,
        left: showLeftLine,
        right: showRightLine,
        color = DEFAULT_GUIDELINE_COLOR,
      } = this.props;

      const commonGuideLineStyle = {
        position: 'fixed',
        background: color,
        zIndex: 100,
      };

      const horizGuideLineStyle = {
        ...commonGuideLineStyle,
        width: '100%',
        height: 1,
        left: 0,
      };

      const vertiGuideLineStyle = {
        ...commonGuideLineStyle,
        height: '100%',
        width: 1,
        top: 0,
      };

      const { top, bottom, left, right } = rectObj;

      return [
        showTopLine && <div style={{...horizGuideLineStyle, top}}/>,
        showBotLine && <div style={{...horizGuideLineStyle, top: bottom}}/>,
        showLeftLine && <div style={{...vertiGuideLineStyle, left}}/>,
        showRightLine && <div style={{...vertiGuideLineStyle, left: right}}/>,
      ];
    };

    render() {
      return <Component {...this.props} />
    }
  }
};

