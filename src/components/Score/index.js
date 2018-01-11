import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


Score.propTypes = {
  caption: PropTypes.string,
  value: PropTypes.number,
  className: PropTypes.string,
};

Score.defaultProps = {
  className: 'Score',
};

export default function Score({ caption, value, className }) {

  return (
    <span className={className}>
      { caption }
      <span className="value">{value}</span>
    </span>
  );
}
