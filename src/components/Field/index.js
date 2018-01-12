import React from 'react';
import PropTypes from 'prop-types';

import Cell from 'components/Cell';
import './styles.scss';


Field.propTypes = {
  cb: PropTypes.func,
  className: PropTypes.string,
  field: PropTypes.array.isRequired,
  mouseMove: PropTypes.func,
  size: PropTypes.number.isRequired,
};

Field.defaultProps = {
  className: 'Field',
};

export default function Field({ className, field, size, cb, mouseMove }) {

  return (
    <a
      href=""
      className={className}
      onClick={cb}
      onMouseMove={mouseMove}
    >
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
    </a>
  );
}
