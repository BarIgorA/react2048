import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


/**
 * (
 * Modeling web-page as object which separates data and test logic
 * Extend this class in your tests to add concrete test specific getters
 * )
 * @export
 * @class PageObject
 */
export default class PageObject {

  constructor(props, state = {}) {
    this.props = props;
    this.wrapper = null;
    this.shallowRendered = null;
    this.state = state;
    Enzyme.configure({ adapter: new Adapter() });
  }

  setComponent = (Component) => {
    if (this.wrapper) return this;
    this.wrapper = () => mount(<Component {...this.props} />);
    this.shallowRenderer = (options) => shallow(<Component {...this.props} />, options);
    return this;
  }

  getWrapper = () => this.wrapper();

  getShallowRendered = (options) => (this.shallowRenderer && this.shallowRenderer(options)) || null;
}
