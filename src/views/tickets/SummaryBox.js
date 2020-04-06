import React from 'react';
import { Segment } from 'semantic-ui-react';

import SafeBrowsing from './SafeBrowsing';
import Yara from './Yara';

const SummaryBox = ({ malwareMatches, ticketID }) => (
  <Segment>
    <SafeBrowsing matches={malwareMatches} />
    <Yara ticketID={ticketID} />
  </Segment>
);

export default SummaryBox;
