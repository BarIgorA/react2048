import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import { subscribe } from 'components/ContextProvider';


Modal.propTypes = {
  cb: PropTypes.func,
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  config: PropTypes.object,
};

Modal.defaultProps = {
  className: 'Modal',
};

function Modal({ text, className, cb, config }) {
  return (
    <a
      className={className}
      onClick={cb}
    >
      <span>{text}{config.domain}</span>
    </a>
  );
}

export default subscribe('config')(Modal);
