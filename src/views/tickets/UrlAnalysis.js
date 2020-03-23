import React from 'react';
import { Header } from 'semantic-ui-react';

// Components
import SummaryBox from './SummaryBox';
import Screenshot from './Screenshot';
import JSViewer from './JSViewer';

const UrlAnalysis = ({ ticket }) => {
  const { ticketInfo, malwareMatches } = ticket;
  const { ticketID, url } = ticketInfo;
  return (
    <div style={styles.root}>
      {/* URL Header */}
      <Header as="h1" style={styles.urlHeader}>
        {url}
      </Header>
      {/* Summary Box */}
      <SectionTitle title="Summary" />
      <SummaryBox malwareMatches={malwareMatches} />
      {/* Screenshot & OCR */}
      <SectionTitle title="Screenshot" />
      <Screenshot ticketID={ticketID} />
      {/* JavaScript */}
      <SectionTitle title="JavaScript" />
      <JSViewer
        ticketID={ticketID}
        // onFileSelectionChange={onFileSelectionChange}
        // code={currentCode}
      />
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

export default UrlAnalysis;
