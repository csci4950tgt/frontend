import React from 'react';
import { Segment } from 'semantic-ui-react';

import SafeBrowsing from './SafeBrowsing';

const SummaryBox = ({ malwareMatches }) => (
  <Segment>
    <SafeBrowsing matches={malwareMatches} />
  </Segment>
);

export default SummaryBox;
