import React, { Component } from 'react';

import Score from 'components/Score';
import HighScore from 'components/HighScore';
import Field from 'components/Field';
import './styles.scss';

class App extends Component {
  state = {
    score: 13011974,
  }

  render() {
    const { score } = this.state;
    const fieldSize = 5;
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">2048</h1>
          <span className="score-wrapper">
            <Score score={score} />
            <HighScore />
          </span>
        </header>
        <Field size={fieldSize}/>
      </div>
    );
  }
}

export default App;
