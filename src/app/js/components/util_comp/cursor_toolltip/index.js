import React from 'react';

import './style.scss';

class CursorTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      show: true
    }
  }

  componentDidMount() {
    const {bottom, left} = this.self.getBoundingClientRect();
    this.setState({
      x: left,
      y: bottom
    });
  }

  handleMouseMove = ({clientX, clientY}) => {
    const {top, left} = this.self.getBoundingClientRect();
    this.setState({
      x: clientX - left,
      y: clientY - top
    })
  };

  setTooltipState = (show) => {
    this.setState({ show });
  };

  render() {
    let transformVal = `translate3d(${this.state.x + 20}px, ${this.state.y + 20}px, 0)`;
    return (
      <div
        onMouseMove={this.handleMouseMove}
        ref={(ref) => this.self = ref}
        className="tooltip-wrapper"
      >
        {this.props.children({
          showTooltip: () => { this.setTooltipState(true) },
          hideTooltip: () => { this.setTooltipState(false) },
        })}
        <div
          key={2}
          className="tooltip"
          style={{
            transform: transformVal
          }}
        >
          {this.state.show ? this.props.tooltip : null }
        </div>
      </div>
    )
  }
};

export default CursorTooltip;
