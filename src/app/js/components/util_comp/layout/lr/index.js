import React from 'react';
import { GOLDEN_RATIO } from '../const'

const computeContainerStyle = () => {
  const basePadding = 50;
  const wh = window.innerHeight;
  const ww = window.innerWidth;
  const containerContentHt = wh - 2 * basePadding;
  const containerContentWd = containerContentHt * (1 + GOLDEN_RATIO);
  const lrPadding = (ww - containerContentWd) / 2;

  return {
    display: 'flex',
    width: `calc(100% - ${2 * lrPadding}px)`,
    height: `calc(100% - ${2 * basePadding}px)`,
    margin: `${basePadding}px ${lrPadding}px`
  };
};

export default class PcLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style: computeContainerStyle(),
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateStyle)
  }

  updateStyle = () => {
    this.setState({
      style: computeContainerStyle(),
    })
  };

  render() {
    const {left, right} = this.props;
    return (
      <div className="container lr" style={this.state.style}>
        <div className="left" style={{flex: (GOLDEN_RATIO + 1)}}>{left}</div>
        <div className="right" style={{
          flex: 1,
          overflow: 'auto',
        }}>{right}</div>
      </div>
    );
  }
}
