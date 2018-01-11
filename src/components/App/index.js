import React, { Component, Fragment } from 'react';
import { Map, List } from 'immutable';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';


class App extends Component {
  state = Map({
    score: 13011974,
    fieldSize: 4,
    field: List(Array(16).fill(0)),
  })

  render() {
    const score = this.state.get('score'); 
    const fieldSize = this.state.get('fieldSize');
    const field = this.state.get('field');
    return (
      <Fragment>
        <header className="header">
          <h1 className="title">2048</h1>
          <span className="score-wrapper">
            <Score caption="score" value={score} />
            <Score caption="best" value={score} />
          </span>
        </header>
        <Field size={fieldSize} field={field} />
      </Fragment>
    );
  }
}

export default App;
