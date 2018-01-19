import {
  closeModal,
  initEngine,
  onOffMouse,
  mouseMove,
} from 'Engine/actions';

export default class Controls {
  constructor(service) {
    this.service = service;
  }

  closeModal = (e) => this._controlAction(e, closeModal);

  reset = (e) => this._controlAction(e, initEngine);

  mouse = (e) => this._controlAction(e, onOffMouse);

  mouseMove = (e) => this._controlAction(e, mouseMove, Date.now(), e.clientX, e.clientY);

  _controlAction = (event, serviceAction, ...rest) => {
    if (event && event.preventDefault) event.preventDefault();
    if (typeof serviceAction !== 'function') throw new Error(`Need function but got ${typeof serviceAction}.`);

    this.service.dispatch(serviceAction(...rest));
  }
}
