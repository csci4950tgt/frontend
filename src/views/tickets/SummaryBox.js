import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SafeBrowsing from './SafeBrowsing';
import Yara from './Yara';

const SummaryBox = ({ malwareMatches, ticketID }) => (
  <Segment>
    <SafeBrowsing matches={malwareMatches} />
    <Yara ticketID={ticketID} />
  </Segment>
);

SummaryBox.propTypes = {
  malwareMatches: PropTypes.array,
  ticketID: PropTypes.number,
};

export default SummaryBox;
