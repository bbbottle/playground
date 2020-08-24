import React from 'react';
import PropTypes from 'prop-types';

export default class PagingStateManager extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!this.isValidProps(props)) {
      return;
    }

    this.state = this.getStateByPropsAndCurrentPageIndex();
  }

  getStateByPropsAndCurrentPageIndex = (props = this.props, currentPageIndex = props.currentPageIndex) => {
    const { pageSize, data, infiniteLoopMode } = props;
    const totalPages = Math.ceil(data.length / pageSize);
    const start = (currentPageIndex - 1) * pageSize;
    const end = currentPageIndex * pageSize;
    const currentPageData = data.slice(start,  end) || [];

    const hasNextPage = currentPageIndex < totalPages;
    let nextPageData = [];
    if (hasNextPage) {
      const nextPageStart = currentPageIndex * pageSize;
      const nextPageEnd = (currentPageIndex + 1) * pageSize;
      nextPageData = data.slice(
        nextPageStart,
        nextPageEnd
      ) || [];
    } else if (infiniteLoopMode) {
      nextPageData = data.slice(
        0,
        pageSize,
      )
    }
    return {
      hasNextPage,
      hasPrevPage: currentPageIndex > 1,
      currentPageIndex,
      currentPageData,
      nextPageData,
      totalPages,
    }
  };

  next = () => {
    if (!this.state.hasNextPage && !this.props.infiniteLoopMode) {
      return;
    }

    this.setState(prevState =>
      this.getStateByPropsAndCurrentPageIndex(
        this.props,
        prevState.hasNextPage
          ? prevState.currentPageIndex + 1
          : 1
      )
    );
  };

  prev = () => {
    if (!this.state.hasPrevPage && !this.props.infiniteLoopMode) {
      return;
    }
    this.setState(prevState =>
      this.getStateByPropsAndCurrentPageIndex(
        this.props,
        prevState.hasPrevPage
          ? prevState.currentPageIndex - 1
          : prevState.totalPages
      )
    );
  };

  isValidProps = (props = this.props) => {
    const {data, pageSize, currentPageIndex = 1} = props;
    const totalPages = Math.ceil(data.length / pageSize);
    return data.length
      && pageSize > 0
      && currentPageIndex >= 1
      && currentPageIndex <= totalPages;
  };

  render() {
    return this.isValidProps(this.props) && this.props.children({
      ...this.state,
      next: this.next,
      prev: this.prev,
    })
  }
}

PagingStateManager.defaultProps = {
  currentPageIndex: 1,
};

PagingStateManager.propTypes = {
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPageIndex: PropTypes.number,
  children: PropTypes.func.isRequired,
};