import React, { Component } from 'react';
import { Dropdown, Message, Loader, Segment, Dimmer } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import { getArtifact, getArtifactListing } from '../../utils/api';
import { js as beautify } from 'js-beautify';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import PropTypes from 'prop-types';

export default class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesBeingBlocked: false,
      currentCode: '',
      fileList: null,
    };
  }

  async fetchArtifacts() {
    const ticketId = this.props.ticketID;

    try {
      // Get file artifact listings, filter for js files
      const res = await getArtifactListing(ticketId);
      const artifacts = res.fileArtifacts.filter(artifact =>
        artifact.filename.endsWith('.js')
      );

      // Asynchronously fetch all artifact filenames, resolve into list
      const jsArtifactPromises = artifacts.map(async a => {
        const res = await getArtifact(ticketId, a.filename);
        return { key: a.filename, text: a.filename, value: beautify(res) };
      });

      const fileList = await Promise.all(jsArtifactPromises);

      // Successfully got js file artifacts, save in state
      let currentCode;
      if (fileList.length > 0) {
        currentCode = fileList[0].value;
      } else {
        currentCode = 'No JavaScript found on this website.';
        fileList.push({
          key: 'No JavaScript found',
          text: 'No JavaScript found',
          value: currentCode,
          disabled: true,
        });
      }
      this.setState({ fileList, currentCode });
    } catch (error) {
      // TODO: let user know about error getting artifact listing
      // this.setState(prevState => {
      //       return {
      //         filesBeingBlocked: true,
      //         fileList: [
      //           ...prevState.fileList,
      //           {
      //             key: i,
      //             text: name + ' (blocked by the adblocker)',
      //             value:
      //               'It looks like this resource is blocked by your adblocker',
      //             // if we don't put value and this disabled entry is the first one, it will be pre-selected and highlighted
      //             // see https://github.com/Semantic-Org/Semantic-UI-React/issues/3130#issuecomment-530703465
      //             disabled: true,
      //           },
      //         ],
      //       };
      //     });
      console.error(error.message);
    }
  }

  componentDidMount() {
    this.fetchArtifacts();
  }

  handleFileChange = (e, data) => {
    this.setState({ currentCode: data.value });
  };

  render() {
    return (
      <>
        {this.state.filesBeingBlocked && (
          <Message negative style={{ textAlign: 'left' }}>
            <Message.Header>
              One or more JavaScript files are blocked by your adblocker.
            </Message.Header>
            <p>
              If you want to see all the files, please disable your adblocker
              and refresh this page.
            </p>
          </Message>
        )}
        {this.state.fileList ? (
          <>
            <Dropdown
              fluid
              selection
              options={this.state.fileList}
              value={this.state.currentCode}
              onChange={this.handleFileChange}
            />
            <AceEditor
              mode="javascript"
              theme="monokai"
              readOnly={true}
              // width="500px"
              // height="700px"
              width="100%"
              value={this.state.currentCode}
              cursorStart={1}
              wrapEnabled={true}
              editorProps={{ $blockScrolling: true }}
            />
          </>
        ) : (
          <Segment style={{ height: '500px' }}>
            <Dimmer active>
              <Loader />
            </Dimmer>
          </Segment>
        )}
      </>
    );
  }
}

CodeBlock.propTypes = {
  ticketID: PropTypes.number,
};
