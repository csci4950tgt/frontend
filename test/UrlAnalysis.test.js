import SummaryBox from '../src/views/tickets/SummaryBox';
import SafeBrowsing from '../src/views/tickets/SafeBrowsing';
import Yara from '../src/views/tickets/Yara';

import { Icon, Segment, List, Label } from 'semantic-ui-react';
//summary box
describe('<UrlAnalysis /> rendering', () => {
  it('should render one <SummaryBox>', () => {
    const wrapper = shallow(<SummaryBox />);
    expect(wrapper.exists()).toBe(true);
  });

  it('SafeBrowsing: header renders', () => {
    let wrapper = shallow(<SafeBrowsing matches={'{}'} />);
    expect(wrapper.children(Segment)).toHaveLength(2);
  });

  it('SafeBrowsing:  renders No threats Detected', () => {
    let wrapper = shallow(<SafeBrowsing matches={'{}'} />);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('h3').text()).toBe('No threats Detected');
  });
});
