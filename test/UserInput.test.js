import UserInput from '../src/views/home/UserInput';
import Home from '../src/views/home/Home';
import { Form, Input } from 'semantic-ui-react';

import fetch from 'isomorphic-fetch';
import FetchMock from 'fetch-mock';
let fetchMock = (fetch: FetchMock);

describe('<UserInput /> rendering', () => {
  it('should render one <UserInput>', () => {
    const wrapper = shallow(<UserInput />);

    expect(wrapper.exists()).toBe(true);
  });

  // test("user search is echoed", () => {
  //   const wrapper = shallow(<UserInput performSerach={() => {}}/>);
  //   wrapper.find(Form.Input).simulate("change", {
  //     target: {value: "https://google.com"}
  //   });
  //
  //   expect(wrapper.find(Form.Input).props().value).toEqual("https://google.com");
  // });

  test('when form is submitted the event is canceled', () => {
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
