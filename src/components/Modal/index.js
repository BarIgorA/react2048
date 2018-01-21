import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


Modal.propTypes = {
  cb: PropTypes.func,
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Modal.defaultProps = {
  className: 'Modal',
};

export default function Modal({ text, className, cb }) {

  return (
    <a
      className={className}
      onClick={cb}
    >
      <span>{text}</span>
    </a>
  );
}
