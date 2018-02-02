import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default function subscribe(channel) {
  return (WrappedComponent) => class extends Component {

    static contextTypes = {
      broadcasts: PropTypes.object
    };

    static displayName = `${channel}Subscribed${WrappedComponent.displayName || WrappedComponent.name}`;

    state = {
      [channel]: null,
    };

    getBroadcast() {
      const broadcasts = this.context.broadcasts || {};
      const broadcast = broadcasts[channel];

      return broadcast;
    }

    componentWillMount() {
      const broadcast = this.getBroadcast();

      if (broadcast) {
        this.setState({
          [channel]: broadcast.getValue()
        });
      }
    }

    componentDidMount() {
      const broadcast = this.getBroadcast();

      if (broadcast) {
        this.unsubscribe = broadcast.subscribe(value => {
          this.setState({ [channel]: value });
        });
      }
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe();
    }

    render() {
      return <WrappedComponent { ...this.props } { ...{[ channel ]: this.state[channel]} }/>;
    }
  }
}
