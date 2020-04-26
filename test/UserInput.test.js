import UserInput from '../src/views/home/UserInput';
import Home from '../src/views/home/Home';
import { Form, Input } from 'semantic-ui-react';
import { createTicket } from '../src/utils/api';

// import fetch from 'isomorphic-fetch';
// import FetchMock from 'fetch-mock';
// let fetchMock = (fetch: FetchMock);

// import axios from 'axios';
//
// jest.mock('axios');

// describe("createTicket", () => {
//   // afterEach(() => {
//   //   fetchMock.restore();
//   //   fetchMock.reset();
//   // });
//   it("success", async() => {
//     fetchMock.mock("http://localhost:8080/api/tickets", {
//       stats:200,
//       body: {success:true}
//     });
//     expect(await UserInput.createTicket()).toBe(true);
//   })
// })

// jest.mock('../src/utils/api/createTicket', () => {
//     const res = {
//         success: true,
//         message: "Successfully created ticket.",
//         ticket: {
//           ID: 146,
//           CreatedAt: "2020-04-26T12:55:30.439364588-05:00",
//           UpdatedAt: "2020-04-26T12:55:30.439364588-05:00",
//           DeletedAt: null,
//           name: "",
//           url: "http://google.com",
//           processed: false,
//           screenshots: [],
//           malwareMatches: ""
//         }
//       }
//       return {res };
//     });

// it('calls google and returns data to me', () => {
//   fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }))
//
//   //assert on the response
//   createTicket('{"url":"http://google.com","screenshots":[]}').then(res => {
//     expect(res.success).toEqual(true)
//   })

//assert on the times called and arguments given to fetch
// expect(fetchMock.mock.calls.length).toEqual(1)
// expect(fetchMock.mock.calls[0][0]).toEqual('https://google.com')
//   })
// })

// it('returns the title of the first album', async () => {
//   axios.get.mockResolvedValue({
//     res: {
//       success: true,
//       message: "Successfully created ticket.",
//       ticket: {
//         ID: 146,
//         CreatedAt: "2020-04-26T12:55:30.439364588-05:00",
//         UpdatedAt: "2020-04-26T12:55:30.439364588-05:00",
//         DeletedAt: null,
//         name: "",
//         url: "http://google.com",
//         processed: false,
//         screenshots: [],
//         malwareMatches: ""
//       }
//     }
//
//   });
//   const body = '{"url":"http://google.com","screenshots":[]}';
//   const res = await createTicket(body);
//   expect(res.success).toEqual(true);
// });

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

  test('when form is submitted the event is canceled', async () => {
    const wrapper = shallow(<UserInput />);
    let prevented = false;
    wrapper.find(Form).simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });
    // const body = '{"url":"http://google.com","screenshots":[]}'
    // const res = await createTicket(body);
    // expect(res.success).toEqual(true);

    expect(prevented).toBe(true);
  });
});
