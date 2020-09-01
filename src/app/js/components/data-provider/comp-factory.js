import React from 'react'
import {
  TickLoader as Spinner,
  ErrorIcon,
  IconText,
  COLORS
} from '@zhoujiahao/bblego'

const buildDataProvider = (
  queryFn = () => Promise.resolve(),
  payloadKey = 'payload',
  formatter = n => n
) => {
  class RetComp extends React.PureComponent {
    state = {
      loading: true,
      [payloadKey]: null,
      error: null,
    };

    componentDidMount() {
      queryFn()
        .then((payload) => {
          this.setState({
            [payloadKey]: formatter(payload),
            loading: false
          })
        })
        .catch((error) => {
          this.setState({
            error,
            loading: false
          })
        })
    }

    ErrorRenderer = (error) => {
      return (
        <IconText
          color={COLORS.$red3}
          icon={<ErrorIcon/>}
        >
          {error.message || 'ERROR'}
        </IconText>
      )
    }

    render() {
      const {
        spinner = (<Spinner absCenter/>),
        errorView = this.ErrorRenderer
      } = this.props;

      if (spinner && this.state.loading) {
        return spinner;
      }

      if (errorView && this.state.error) {
        return typeof errorView === 'function'
          ? errorView(this.state.error)
          : errorView;
      }

      return this.props.children(this.state);
    }
  }

  return RetComp;
}

export {
  buildDataProvider,
}
