import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


HighScore.propTypes = {
  HighScore: PropTypes.number,
  className: PropTypes.string,
};

HighScore.defaultProps = {
  className: 'HighScore',
};

export default function HighScore({ className }) {

  return (
    <span className={className}>
      best
      <span className="value">{0}</span>
    </span>
  );
}