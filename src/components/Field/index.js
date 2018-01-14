import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';
import Cell from 'components/Cell';


Field.propTypes = {
  cb: PropTypes.func,
  className: PropTypes.string,
  field: PropTypes.array.isRequired,
  fieldRef: PropTypes.func,
  mouseMove: PropTypes.func,
  size: PropTypes.number.isRequired,
};

Field.defaultProps = {
  className: 'Field',
};

export default function Field({ cb, className, field, fieldRef, mouseMove, size }) {

  return (
    <a
      href=""
      className={className}
      onClick={cb}
      onMouseMove={mouseMove}
      ref={fieldRef}
    >
      {
        field.map(
          (value, index) => (
            <Cell
              className={classnames(`Cell-${size}`, { [`num-${value}`]: value })}
              key={index}
              value={value}
            />
          )
        )
      }
    </a>
  );
}
