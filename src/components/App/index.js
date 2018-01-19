import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';
import Modal from 'components/Modal';
import Engine from 'Engine';
import Controls from 'Controls';

class App extends Component {
  constructor() {
    super();
    this.state = {},
    this.engine = new Engine(this);
    this.controller = new Controls(this.engine);
  }

  componentWillMount() {
    this.engine.init();
  }

  componentDidMount() {
    //mouse
    const domRect = this.fieldDomElement.getBoundingClientRect();
    this.x = domRect.left + domRect.width / 2;
    this.y = domRect.top + domRect.height / 2;
    this.ACCURATE_INTENTION = domRect.width / 4;
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

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

    this.engine.action(now, direction);
  }

  render() {
    const { field, mouseActive, progress, best, score } = this.state;

    return (
      <Fragment>
        <header className="header">
          <div className="content">
            <h1 className="title">2048</h1>
            <span className="score-wrapper">
              <Score caption="score" value={score} />
              <Score caption="best" value={best} />
              <span className="reset">
                <a
                  href=""
                  onClick={this.controller.reset}
                >
                  &#10226;
                </a>
              </span>
            </span>
          </div>
        </header>
        <main>
          <Field
            cb={this.controller.mouse}
            className={classnames('Field', { inGame: mouseActive })}
            field={field}
            fieldRef={(el) => { this.fieldDomElement = el; }}
            mouseMove={this.controller.mouseMove}
          />
        </main>
        <Modal
          className={classnames('Modal', progress.status)}
          text={progress.text}
          cb={this.controller.closeModal}
        />
      </Fragment>
    );
  }
}

export default App;
