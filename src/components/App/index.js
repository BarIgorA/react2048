import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import Score from 'components/Score';
import Field from 'components/Field';
import Modal from 'components/Modal';
import Engine from 'Engine';
import Mouse from 'Control/Mouse';
import Keyboard from 'Control/Keyboard';
import Swipe from 'Control/Swipe';

class App extends Component {
  constructor() {
    super();
    this.state = {},
    this.engine = new Engine(this);
    this.mouse = new Mouse(this.engine);
    this.keyboard = new Keyboard(this.engine);
    this.swipe = new Swipe(this.engine);
  }

  componentWillMount() {
    this.engine.init();
  }

  componentDidMount() {
    this.mouse.init(this.fieldDomElement);
    this.keyboard.init(document, 'keydown', 'arrows');
    this.swipe.init();
  }

  componentWillUnmount() {
    this.keyboard.stopAll();
    this.swipe.stop();
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
                  onClick={this.mouse.reset}
                >
                  &#10226;
                </a>
              </span>
            </span>
          </div>
        </header>
        <main>
          <Field
            cb={this.mouse.onOff}
            className={classnames('Field', { inGame: mouseActive })}
            field={field}
            fieldRef={(el) => { this.fieldDomElement = el; }}
            mouseMove={mouseActive ? this.mouse.move : null}
          />
        </main>
        <Modal
          className={classnames('Modal', progress.status)}
          text={progress.text}
          cb={this.mouse.closeModal}
        />
      </Fragment>
    );
  }
}

export default App;
