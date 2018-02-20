import PageObject from 'utils/PageObject';
import Cell from 'components/Cell';


/*
 * (Concrete component's page-object class)
 * @export
 * @class CellPO
 */
class CellPO extends PageObject {
  /*
   * Concrete getters
   */
  getClassName = () => this.getShallowRendered().prop('className');
  getCellValue = () => this.getShallowRendered().text();
}

const page = (new CellPO({
  className: 'Cell',
  value: 2048,
})).setComponent(Cell);

describe('<Cell />', () => {
  it('should render Cell component', () => {
    expect(
      page.getShallowRendered({}).containsMatchingElement(Cell)
    ).toEqual(true);
  });

  it(`should render Cell component with className "${page.props.className}"`, () => {
    expect(
      page.getClassName()
    ).toBe('Cell');
  });

  it(`should render Cell component with text "${page.props.value}"`, () => {
    expect(
      page.getCellValue()
    ).toBe("2048");
  });
});