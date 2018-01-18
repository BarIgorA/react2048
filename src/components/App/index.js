import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';
import Modal from 'components/Modal';
import Engine from 'Engine';
import gameStatus from './statuses';


class App extends Component {
  constructor() {
    super();
    this.state = {
      mouseActive: false,
      is2048: false,
      progress: gameStatus.fun,
      field: Array(16).fill(0),
      lastMoveEvent: {
        occurredAt: Date.now(),
        direction: null,
      },
    },
    this.engine = new Engine();
  }

  componentDidMount() {
    //mouse
    const domRect = this.fieldDomElement.getBoundingClientRect();
    this.x = domRect.left + domRect.width / 2;
    this.y = domRect.top + domRect.height / 2;
    this.ACCURATE_INTENTION = domRect.width / 4;
    this.init();
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  init = () => {
    this.engine.score = 0;
    this.fillRandomEmptyArrayElement();
    this.fillRandomEmptyArrayElement();
  };

  stopAndGo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { mouseActive } = this.state;
    this.setState({ mouseActive: !mouseActive });
  };

  action = (time, direction) => {
    this.setState(
      (prevState) => {
        const { field, progress, is2048 } = prevState;
        const newField = this.engine.next(field, direction);

        if (field.toString() === newField.toString() && !this.engine.hasEmpty(newField)) return { progress: gameStatus.loss };

        return {
          lastMoveEvent: {
            occurredAt: time,
            direction,
          },
          field: newField,
          ...(newField.filter((item) => item === 2048).length && !is2048) ? { is2048: true, progress: gameStatus.win } : progress,
        };
      }
    );

    this.fillRandomEmptyArrayElement();
  }

  mouseMove = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const now = Date.now();
    const { mouseActive } =this.state;

    if (!(mouseActive && this.mouseMoveReleased(now) && this.accurateIntention(e))) return;

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

  fillRandomEmptyArrayElement = () => this.setState(
    ({ field }) => ({ field: this.engine.fillRandomCell(field) })
  );

  reset = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    this.setState(
      {
        mouseActive: false,
        is2048: false,
        progress: gameStatus.fun,
        field: Array(16).fill(0),
        lastMoveEvent: {
          occurredAt: Date.now(),
          direction: null,
        },
      }
    );
    this.init();
  }

  closeModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    this.setState(
      { progress: gameStatus.fun }
    );
  };

  render() {
    const { field, mouseActive, progress } = this.state;

    return (
      <Fragment>
        <header className="header">
          <div className="content">
            <h1 className="title">2048</h1>
            <span className="score-wrapper">
              <Score caption="score" value={this.engine.score} />
              <Score caption="best" value={this.engine.best} />
              <span className="reset">
                <a
                  href=""
                  onClick={this.reset}
                >
                  &#10226;
                </a>
              </span>
            </span>
          </div>
        </header>
        <main>
          <Field
            cb={this.stopAndGo}
            className={classnames('Field', { inGame: mouseActive })}
            field={field}
            fieldRef={(el) => { this.fieldDomElement = el; }}
            mouseMove={this.mouseMove}
          />
        </main>
        <Modal
          className={classnames('Modal', progress.status)}
          text={progress.text}
          cb={this.closeModal}
        />
      </Fragment>
    );
  }
}

export default App;
