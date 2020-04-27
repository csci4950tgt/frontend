import { render, unmountComponentAtNode } from 'react-dom';
import UserInput, {
  onFormSubmit,
  CustomScreenshotInput,
} from '../src/views/home/UserInput';
import Home from '../src/views/home/Home';
import { Form, Input, Grid, Header, Icon } from 'semantic-ui-react';

describe('<UserInput /> rendering', () => {
  it('should render one <UserInput>', () => {
    const wrapper = shallow(<UserInput />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render options header', () => {
    const wrapper = shallow(<UserInput />);
    // there is always one header on this page
    expect(wrapper.find(Header).length).toBe(1);
    expect(
      wrapper
        .find(Header)
        .render()
        .text()
    ).toBe(' Enter Parameters:');
  });

  it('should open options menu', () => {
    const wrapper = shallow(<UserInput />);
    wrapper.setState({ showOptions: true });
    // basic structure of options menu:
    expect(wrapper.find(Grid).length).toBe(1);
    expect(wrapper.find('CustomScreenshotInput').length).toBe(1);
    expect(wrapper.find(Icon).length).toBe(2);
  });

  test('user search is echoed', () => {
    const wrapper = shallow(<UserInput performSerach={() => {}} />);
    wrapper.find(Form.Input).simulate('change', {
      target: { value: 'https://google.com' },
    });

    expect(wrapper.find(Form.Input).props().value).toEqual(
      'https://google.com'
    );
  });

  test('when form is submitted the event is canceled', async () => {
    const wrapper = shallow(<UserInput />);
    let prevented = false;
    wrapper.find(Form).simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented).toBe(true);
  });
});
