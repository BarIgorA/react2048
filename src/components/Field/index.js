import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';
import Cell from 'components/Cell';
import { subscribe } from 'components/ContextProvider';


Field.propTypes = {
  cb: PropTypes.func,
  className: PropTypes.string,
  field: PropTypes.array.isRequired,
  fieldRef: PropTypes.func,
  locale: PropTypes.string,
  mouseMove: PropTypes.func,
};

Field.defaultProps = {
  className: 'Field',
};

function Field({ cb, className, field, fieldRef, mouseMove, locale }) {

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
              className={classnames('Cell', { [`num-${value}`]: value }, locale)}
              key={index}
              value={value}
            />
          )
        )
      }
    </a>
  );
}

export default subscribe('locale')(Field);
