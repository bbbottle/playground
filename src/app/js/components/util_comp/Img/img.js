import React from "react";
import PropTypes from 'prop-types';
import { store } from "@zhoujiahao/utils";
import { TickLoader as Spinner } from '@zhoujiahao/bblego'

import './style.scss';

class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  static propTypes = {
    setCursorText: PropTypes.func,
  };

  static defaultProps = {
    setCursorText: () => null,
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.src !== this.props.src && !store.get(nextProps.src)) {
      this.setState({
        loading: true
      })
    }

    if (nextProps.tooltip !== this.props.tooltip) {
      this.props.setCursorText(nextProps.tooltip);
    }
  }

  handleMouseEnter = () => {
    if (!this.props.tooltip || !this.props.setCursorText) {
      return;
    }

    this.props.setCursorText(this.props.tooltip);
  }

  handleMouseLeave = () => {
    if (!this.props.tooltip || !this.props.setCursorText) {
      return;
    }
    this.props.setCursorText(null);
  }

  renderImg = () => {
    const {
      src,
      onClick,
      onLoad = () => {},
    } = this.props;

    const { loading } = this.state;

    const retImg = (
      <img
        className="custom-img-tag"
        src={src}
        key={src}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseEnter}
        onLoad={() => {
          this.setState({
            loading: false
          }, onLoad);
        }}
        style={{ display: loading ? 'none' : 'unset' }}
      />
    )
    return (
      <>
        {loading && (this.renderLoadingView())}
        {retImg}
      </>
    )
  };

  renderLoadingView = () => {
    const {
      src,
      loadingViewRenderer,
    } = this.props;
    if (!loadingViewRenderer) {
      return <Spinner absCenter />
    }
    return [<Spinner absCenter />, loadingViewRenderer(src)];
  }

  render() {
    if (this.state.error) {
      return ':('
    }

    return this.renderImg();
  }
}

export default Img;
