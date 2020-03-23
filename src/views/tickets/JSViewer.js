import React, { Component } from 'react';
import { Dropdown, Message, Loader, Segment, Dimmer } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import { getArtifact, getArtifactListing } from '../../utils/api';
import { js as beautify } from 'js-beautify';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesBeingBlocked: false,
      currentCode: '',
      fileList: [],
    };
  }

  async fetchArtifacts() {
    const ticketId = this.props.ticketID;

    try {
      const res = await getArtifactListing(ticketId);
      const artifacts = res.fileArtifacts.filter(artifact =>
        artifact.filename.endsWith('.js')
      );

      const fileList = [];

      // Loop through artifact filenames, fetch them, push into list
      for (let i in artifacts) {
        const name = artifacts[i].filename;

        try {
          if (!fileList.find(i => i.key === name)) {
            const res = await getArtifact(ticketId, name);
            fileList.push({
              key: i,
              // text: <span className="text">{name}</span>,
              text: name,
              value: beautify(res),
            });
          }
        } catch (error) {
          this.setState({
            filesBeingBlocked: true,
            fileList: [
              {
                key: i,
                text: (
                  <span className="text">
                    {name + ' (blocked by the adblocker)'}
                  </span>
                ),
                value:
                  'It looks like this resource is blocked by your adblocker',
                // if we don't put value and this disabled entry is the first one, it will be pre-selected and highlighted
                // see https://github.com/Semantic-Org/Semantic-UI-React/issues/3130#issuecomment-530703465
                disabled: true,
              },
            ],
          });
          console.error(error.message);
        }
      }

      // Successfully got js file artifacts, save in state
      let currentCode;
      if (fileList.length > 0) {
        currentCode = fileList[0]['value'];
      }
      this.setState({ fileList, currentCode });
    } catch (error) {
      // TODO: let user know about error getting artifact listing
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
      <div style={{ maxWidth: '500px', maxHeight: '700px' }}>
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
        {this.state.fileList.length > 0 ? (
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
          <Segment style={{ height: '100px' }}>
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Segment>
        )}
      </div>
    );
  }
}
