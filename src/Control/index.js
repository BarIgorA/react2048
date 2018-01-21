export default class Controls {
  constructor(service) {
    this.service = service;
  }

  controlAction = (event, serviceAction, ...rest) => {
    if (event && event.preventDefault) event.preventDefault();
    if (typeof serviceAction !== 'function') throw new Error(`Need function but got ${typeof serviceAction}.`);

    if (
      !(typeof this.service === 'object' &&
      this.service.dispatch &&
      typeof this.service.dispatch === 'function')
    ) throw new Error('Can not dispatch service action due to improper initialization of Control class');

    this.service.dispatch(serviceAction(...rest));
  }
}
