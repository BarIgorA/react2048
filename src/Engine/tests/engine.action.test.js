import {
  arrowPressed,
  closeModal,
  initEngine,
  mouseMove,
  onOffMouse,
  swipe,
} from '../actions';
import {
  CLOSE_MODAL_WINDOW,
  INIT_ENGINE,
  ON_OFF_MOUSE,
  MOUSE_MOVE,
  ARROW_PRESSED,
  SWIPE,
} from '../constants';


describe('Engine actions', () => {
  const payload = 'payload';

  it(`closeModal action should return object with type: CLOSE_MODAL_WINDOW`, () => {
    expect(
      closeModal()
    ).toEqual(
      {
        type: CLOSE_MODAL_WINDOW,
      }
    );
  });

  it(`arrowPressed action should return object with type: ARROW_PRESSED and direction: ${payload}`, () => {
    expect(
      arrowPressed(payload)
    ).toEqual(
      {
        type: ARROW_PRESSED,
        direction: 'payload',
      }
    );
  });

  it(`initEngine action should return object with type: INIT_ENGINE`, () => {
    expect(
      initEngine()
    ).toEqual(
      {
        type: INIT_ENGINE,
      }
    );
  });

  it(`mouseMove action should return object with type: MOUSE_MOVE and direction: ${payload}`, () => {
    expect(
      mouseMove(payload)
    ).toEqual(
      {
        type: MOUSE_MOVE,
        direction: 'payload',
      }
    );
  });

  it(`swipe action should return object with type: SWIPE and direction: ${payload}`, () => {
    expect(
      swipe(payload)
    ).toEqual(
      {
        type: SWIPE,
        direction: 'payload',
      }
    );
  });

  it(`onOffMouse action should return object with type: ON_OFF_MOUSE`, () => {
    expect(
      onOffMouse()
    ).toEqual(
      {
        type: ON_OFF_MOUSE,
      }
    );
  });
});
