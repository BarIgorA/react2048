import { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import createBroadcast from './createBroadcast';


export default class Broadcast extends Component {
  static propTypes = {
    channel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    compareValues: PropTypes.func,
    value: PropTypes.any
  };

  static defaultProps = {
    compareValues: (prevValue, nextValue) => prevValue === nextValue
  };

  static contextTypes = {
    broadcasts: PropTypes.object
  };

  static childContextTypes = {
    broadcasts: PropTypes.object.isRequired
  };

  broadcast = createBroadcast(this.props.value);

  getChildContext() {
    return {
      broadcasts: {
        ...this.context.broadcasts,
        [this.props.channel]: this.broadcast
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    invariant(
      this.props.channel === nextProps.channel,
      'Do not change channel in <Broadcast />'
    );

    if (!this.props.compareValues(this.props.value, nextProps.value)) {
      this.broadcast.publish(nextProps.value);
    }
  }

  render() {
    return this.props.children;
  }
}
