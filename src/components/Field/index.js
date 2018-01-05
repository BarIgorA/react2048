import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'components/Grid';

Field.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

Field.defaultProps = {
  className: 'Field',
  size: 5,
};

export default function Field({ className, size }) {

  return (
    <div className={className}>
      <Grid size={size}/>
    </div>
  );
}
