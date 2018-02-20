import PageObject from 'utils/PageObject';
import Modal from 'components/Modal';


/*
 * (Concrete component's page-object class)
 * @export
 * @class ModalPO
 */
class ModalPO extends PageObject {
  /*
   * Concrete getters
   */
  getClassName = () => this.getShallowRendered().prop('className');
  getText = () => this.getShallowRendered().text();
}

const page = (new ModalPO({
  text: 'You win!',
  className: 'Modal fun',
  cb: jest.fn(() => console.log('clicked')),
})).setComponent(Modal);

describe('<Modal />', () => {
  it('should render Modal component', () => {
    expect(
      page.getShallowRendered({}).containsMatchingElement(Modal)
    ).toEqual(true);
  });

  it(`should render Modal component with className "${page.props.className}"`, () => {
    expect(
      page.getClassName()
    ).toBe('Modal fun');
  });

  it(`should render Modal component with text "${page.props.text}"`, () => {
    expect(
      page.getText()
    ).toBe("You win!");
  });

  it('should react on click', () => {
    page.getShallowRendered().simulate('click');
    expect(
      page.props.cb.mock.calls.length
    ).toEqual(1);
  });
});