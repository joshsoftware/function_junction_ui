import React, { Component } from 'react';

export default function asyncComponent (componentToImport, componentName) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component : null
            }
        }

        async componentDidMount () {
            const component = await componentToImport();
            this.setState({
                component: component[componentName]
            });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props}/> : 'Loading...';
        }
    }
     
    return AsyncComponent;
}