import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import './styles.scss';
import IronCurtain from 'components/IronCurtain';
import Score from 'components/Score';
import Field from 'components/Field';
import Modal from 'components/Modal';
import Engine from 'Engine';
import Mouse from 'Control/Mouse';
import Keyboard from 'Control/Keyboard';
import Swipe from 'Control/Swipe';
import { Broadcast } from 'components/ContextProvider';

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

    this.intervalID = setInterval(
      () => this.setState(
        ({ locale }) => ({ locale: locale === 'en' ? 'ru' : 'en'})
      )
      , 2000
    );
  }

  componentWillUnmount() {
    this.keyboard.stopAll();
    this.swipe.stop();

    clearInterval(this.intervalID);
  }

  render() {
    const { field, mouseActive, progress, best, score } = this.state;
    const config = { domain: '777score.com', locales: ['en', 'ru'] };

    return (
      <Fragment>
        <Broadcast channel="config" value={config} compareValues={() => true}>
          <Broadcast channel="locale" value={this.state.locale}>
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
            <IronCurtain>
              <Field
                cb={this.mouse.onOff}
                className={classnames('Field', { inGame: mouseActive })}
                field={field}
                fieldRef={(el) => { this.fieldDomElement = el; }}
                mouseMove={mouseActive ? this.mouse.move : null}
              />
            </IronCurtain>
          </Broadcast>
            <Modal
              className={classnames('Modal', progress.status)}
              text={progress.text}
              cb={this.mouse.closeModal}
            />
        </Broadcast>
      </Fragment>
    );
  }
}

export default App;
