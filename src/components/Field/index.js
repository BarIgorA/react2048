import React from 'react';
import PropTypes from 'prop-types';

import Cell from 'components/Cell';
import './styles.scss';


Field.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
  size: PropTypes.number.isRequired,
};

Field.defaultProps = {
  className: 'Field',
};

export default function Field({ className, field, size }) {

  return (
    <div className={className}>
      {
        field.map(
          (value, index) => (
            <Cell
              className={`Cell-${size}`}
              key={index}
              value={value}
            />
          )
        )
      }
    </div>
  );
}
