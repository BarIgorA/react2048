import React from 'react';
import PropTypes from 'prop-types';


Grid.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

Grid.defaultProps = {
  className: 'Grid',
};

export default function Grid({ className, size }) {

  return (
    <div className={className}>
      grid
    </div>
  );
}
