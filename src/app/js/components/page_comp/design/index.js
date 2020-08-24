import React from 'react';

import { TickLoader } from '@zhoujiahao/bblego';
import { FigmaLiveAddr } from '../../../config';
import { WithGuideLine } from '../../util_comp/';

import './index.scss';

const Frame = (props) => <iframe {...props} />;
const DesignFrame = WithGuideLine(Frame);

export class Design extends React.PureComponent {
  state = {
    loading: true,
  };

  handleLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="figma-live">
        <DesignFrame
          onLoad={this.handleLoaded}
          width="800" height="450"
          src={FigmaLiveAddr}
          delay={700}
          color={'#ff8888'}
          top
          left
          right
          bottom
        />
        {this.state.loading ? <TickLoader absCenter /> : null}
      </div>
    )
  }
}

