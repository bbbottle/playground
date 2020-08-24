import React from 'react';

export const waitForDynamicImportedComponent = (importPromise, loader = null) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importPromise()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props}/> : loader;
    }
  }
};

