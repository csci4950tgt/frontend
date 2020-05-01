import Header from '../src/components/Header';
describe('<Header /> rendering', () => {
  it('should render one <SemanticHeader>', () => {
    let wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
