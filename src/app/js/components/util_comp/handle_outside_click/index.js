import {$} from '@zhoujiahao/utils';
import React, { Component } from 'react';

export default class HandleOutSideClick extends Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    const outSideAreaElement = $(this.props.outSideAreaElementSelector);
    (outSideAreaElement || document).addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    const outSideAreaElement = $(this.props.outSideAreaElementSelector);
    (outSideAreaElement || document).removeEventListener('touchstart', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  ignoredOutSideElementsName = {
    'A': true,
    'IMG': true,
    'svg': true,
    'rect': true,
  };

  handleClickOutside(event) {
    const selfNode = this.wrapperRef;
    if (!selfNode || this.ignoredOutSideElementsName[event.target.tagName]) {
      return;
    }

    const isOutSide = this.props.isOutSide
      ? this.props.isOutSide(event)
      : selfNode !== event.target && !selfNode.contains(event.target);

    if (isOutSide && typeof this.props.onOutSideClick === 'function') {
      this.props.onOutSideClick(event);
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
}

