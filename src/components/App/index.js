import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';
import Transpose from 'transpose';


class App extends Component {
  state = {
    inGame: false,
    score: 0,
    field: Array(16).fill(0),
    lastMoveEvent: {
      occurredAt: Date.now(),
      direction: null,
    },
  }

  componentDidMount() {
    const domRect = this.fieldDomElement.getBoundingClientRect();
    this.x = domRect.left + domRect.width / 2;
    this.y = domRect.top + domRect.height / 2;
    this.ACCURATE_INTENTION = domRect.width / 4;
    this.fillRandomEmptyArrayElement();
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  stopAndGo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { inGame } = this.state;
    this.setState({ inGame: !inGame });
  };

  action = (time, direction) => {
    this.setState(
      (prevState) => (
        {
          lastMoveEvent: {
            occurredAt: time,
            direction,
          },
          field: Transpose.normalize(
            Transpose.merge(
              Transpose.toLeft(prevState.field, direction)
            ),
            direction
          ),
        }
      )
    );

    this.fillRandomEmptyArrayElement();
  }

  mouseMove = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const now = Date.now();

    if (!(this.state.inGame && this.mouseMoveReleased(now) && this.accurateIntention(e))) return;

    const direction = this.lastMoveDirection(e.clientX, e.clientY);

    if (direction === this.state.lastMoveEvent.direction) return;

    this.action(now, direction);
  };

  keyDown = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const now = Date.now();
    let direction = null;

    switch(e.keyCode) {
      case 38:
        direction = 'up'; break;
      case 40:
        direction = 'down'; break;
      case 37:
        direction = 'left'; break;
      case 39:
        direction = 'right'; break;
      default:
        direction = null;
    }

    if (!direction) return;

    this.action(now, direction);
  }

  mouseMoveReleased = (now) => {
    const MOUSE_MOVE_THROTTLING = 135;
    return now - this.state.lastMoveEvent.occurredAt > MOUSE_MOVE_THROTTLING
  };

  accurateIntention = (e) => (
    Math.abs(e.clientX - this.x) > this.ACCURATE_INTENTION || Math.abs(e.clientY - this.y) > this.ACCURATE_INTENTION
  );

  lastMoveDirection = (_x, _y) => {
    const dx = _x - this.x;
    const dy = _y - this.y;

    switch(true) {
      case dx === 0 && dy > 0: return 'down';
      case dx === 0 && dy < 0: return 'up';
      case dy / dx >= 1 && dx > 0: return 'down';
      case dy / dx >= 1 && dx < 0: return 'up';
      case dy / dx <= -1 && dx < 0: return 'down';
      case dy / dx <= -1 && dx > 0: return 'up';
      case dx > 0: return 'right';
      case dx < 0: return 'left';
    }
  };

  twoOrFour = () => (new Date()).getTime() % 10 === 4 ? 4 : 2;

  fillRandomEmptyArrayElement = () => this.setState(
    (prevState) => {
      const { field } = prevState;

      if (!field.filter((el) => el === 0).length) return field;

      while (true) { // eslint-disable-line
        let choosedIndex = Math.floor(Math.random() * field.length);
        if (field[choosedIndex] === 0) {
          field[choosedIndex] = this.twoOrFour();
          break;
        }
      }

      return field;
    }
  );

  render() {
    const { score, field, inGame } = this.state;

    return (
      <Fragment>
        <header className="header">
          <div className="content">
            <h1 className="title">2048</h1>
            <span className="score-wrapper">
              <Score caption="score" value={Transpose.score} />
              <Score caption="best" value={score} />
            </span>
          </div>
        </header>
        <main>
          <Field
            cb={this.stopAndGo}
            className={classnames('Field', { inGame: inGame })}
            field={field}
            fieldRef={(el) => { this.fieldDomElement = el; }}
            mouseMove={this.mouseMove}
          />
        </main>
      </Fragment>
    );
  }
}

export default App;
