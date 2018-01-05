import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


Score.propTypes = {
  score: PropTypes.number,
  className: PropTypes.string,
};

Score.defaultProps = {
  className: 'Score',
};

export default function Score({ score, className }) {

  return (
    <span className={className}>
      score
      <span className="value">{score}</span>
    </span>
  );
}
