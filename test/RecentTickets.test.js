import RecentTickets from '../src/components/RecentTickets';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const testObj = {
  ID: 146,
  CreatedAt: '2020-04-26T12:55:30.439365-05:00',
  UpdatedAt: '2020-04-26T12:55:30.439365-05:00',
  DeletedAt: null,
  name: '',
  url: 'http://google.com',
  processed: false,
  screenshots: null,
  malwareMatches: '',
};

it('should render error message of failure to load tickets', () => {
  const wrapper = shallow(<RecentTickets />);
  //no current state so error message: Failed to load recent tickets
  expect(wrapper.children('div')).toHaveLength(1);
});

it('should render table header', () => {
  const wrapper = shallow(<RecentTickets />);
  // add one obj to table
  wrapper.setState({ lastResponse: [testObj] });
  // there is one table header with recent tickets text
  expect(wrapper.find('h3').length).toBe(1);
  expect(wrapper.find('h3').text()).toBe('Recent Tickets:');
});

it('should render correct table layout', () => {
  const wrapper = shallow(<RecentTickets />);
  // add one obj to table
  wrapper.setState({ lastResponse: [testObj] });
  // there is one table header with recent tickets text
  expect(wrapper.find('table').length).toBe(1);
  expect(wrapper.find('th').length).toBe(5);
  expect(wrapper.find('tr').length).toBe(3);
});

it('should render correct data in table for one ticket', () => {
  const wrapper = shallow(<RecentTickets />);
  // add one obj to table
  wrapper.setState({ lastResponse: [testObj] });
  // there is one table header with recent tickets text
  expect(wrapper.find('td').length).toBe(4);
  expect(wrapper.find(Moment).length).toBe(1);
  expect(wrapper.find(Link).length).toBe(1);
});
