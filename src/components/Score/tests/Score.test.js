import PageObject from 'utils/PageObject';
import Score from 'components/Score';


/*
 * (Concrete component's page-object class)
 * @export
 * @class ScorePO
 */
class ScorePO extends PageObject {
  /*
   * Concrete getters
   */
  getClassName = () => this.getShallowRendered().prop('className');
  getText = () => this.getShallowRendered().text();
  getSpannedValue = () => this.getShallowRendered().find('span[className="value"]').text();
}

const page = (new ScorePO({
  caption: 'caption',
  value: 2048,
})).setComponent(Score);

describe('<Score />', () => {
  it('should render Score component', () => {
    expect(
      page.getShallowRendered({}).containsMatchingElement(Score)
    ).toEqual(true);
  });

  it(`should render Score component with className "Score"`, () => {
    expect(
      page.getClassName()
    ).toBe('Score');
  });

  it(`should render Score component with text "${page.props.caption}${page.props.value}"`, () => {
    expect(
      page.getText()
    ).toBe("caption2048");
  });

  it(`should render Score component with spanned value "${page.props.value}"`, () => {
    expect(
      page.getSpannedValue()
    ).toBe("2048");
  });
});