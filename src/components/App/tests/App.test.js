import PageObject from 'utils/PageObject';
import App from 'components/App';


/*
 * (Concrete component's page-object class)
 * @export
 * @class AppPO
 */
class AppPO extends PageObject {
  /*
   * Concrete getters
   */
}

const page = (new AppPO()).setComponent(App);

describe('<App />', () => {
  it('should render App component', () => {
    expect(
      page.getShallowRendered(
        { disableLifecycleMethods: true }
      ).containsMatchingElement(App)
    ).toEqual(true);
  });
});
