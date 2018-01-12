import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';


class App extends Component {
  state = {
    inGame: false,
    score: 13011974,
    fieldSize: 4,
    field: Array(16).fill(0),
    lastMoveEvent: {
      occurredAt: 0,
      x: 0,
      y: 0,
    },
  }

  stopAndGo = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({ inGame: !this.state.inGame });
  };

  mouseMove = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (
      !(
        this.state.inGame && this.mouseMoveReleased(e)
      )
    ) return;
    const { lastMoveEvent } = this.state;
    lastMoveEvent.occurredAt = e.timeStamp;
    this.setState({ lastMoveEvent });
  };

  mouseMoveReleased = (e) => {
    const MOUSE_MOVE_THROTTLING = 135;
    const { lastMoveEvent } = this.state;
    return e.timeStamp - lastMoveEvent.occurredAt > MOUSE_MOVE_THROTTLING;
  };

  render() {
    const { score, fieldSize, field, inGame } = this.state; 

    return (
      <Fragment>
        <header className="header">
          <div className="content">
            <h1 className="title">2048</h1>
            <span className="score-wrapper">
              <Score caption="score" value={score} />
              <Score caption="best" value={score} />
            </span>
          </div>
        </header>
        <main>
          <Field
            cb={this.stopAndGo}
            className={classnames('Field', { inGame: inGame })}
            field={field}
            mouseMove={this.mouseMove}
            size={fieldSize}
          />
        </main>
      </Fragment>
    );
  }
}

export default App;
