import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class IronCurtain extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
