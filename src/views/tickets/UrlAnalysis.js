import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// My Components
import SummaryBox from './SummaryBox';
import Screenshot from './Screenshot';
import JSViewer from './JSViewer';

const UrlAnalysis = ({ ticket }) => {
  const { ticketInfo, malwareMatches } = ticket;
  const { ticketID, url } = ticketInfo;
  return (
    <div style={styles.root}>
      <Grid stackable columns={1}>
        <Grid.Column>
          {/* URL Header */}
          <Header as="h1" style={styles.urlHeader}>
            {url}
          </Header>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={2}>
        <Grid.Column>
          {/* Summary Box */}
          <SectionTitle title="Summary" />
          <SummaryBox malwareMatches={malwareMatches} ticketID={ticketID} />
          {/* Screenshot & OCR */}
          <SectionTitle title="Screenshot" />
          <Screenshot ticketID={ticketID} />
        </Grid.Column>
        <Grid.Column>
          {/* JavaScript */}
          <SectionTitle title="JavaScript" />
          <JSViewer ticketID={ticketID} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const SectionTitle = ({ title }) => <Header as="h2">{title}</Header>;

const styles = {
  root: {
    textAlign: 'left',
  },
  urlHeader: {
    textDecoration: 'underline',
  },
};

UrlAnalysis.propTypes = {
  ticket: PropTypes.element.isRequired,
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default UrlAnalysis;
