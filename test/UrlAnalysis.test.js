import SummaryBox from '../src/views/tickets/SummaryBox';
import SafeBrowsing from '../src/views/tickets/SafeBrowsing';
import JSViewer from '../src/views/tickets/JSViewer';

import { Icon, Segment, List, Label } from 'semantic-ui-react';
//summary box
describe('<UrlAnalysis /> rendering', () => {
  it('should render one <SummaryBox>', () => {
    const wrapper = shallow(<SummaryBox />);
    expect(wrapper.exists()).toBe(true);
  });

  it('SafeBrowsing', () => {
    let wrapper = shallow(<SafeBrowsing matches={'{}'} />);
    expect(wrapper.children(Segment)).toHaveLength(2);
  });
});
