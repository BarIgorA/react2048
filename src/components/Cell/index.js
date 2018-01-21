import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


Cell.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string.isRequired,
};

export default function Cell({ value, className }) {

  return (
    <div className={className}>
      {value || null}
    </div>
  );
}
