import React, { Component } from 'react';
import { Dropdown, Message } from 'semantic-ui-react';
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
    };
  }

  fileList = [];

  async fetchArtifacts() {
    const ticketId = this.props.ticketID;

    try {
      const res = await getArtifactListing(ticketId);
      const artifacts = res.fileArtifacts.filter(artifact =>
        artifact.filename.endsWith('.js')
      );

      for (let i in artifacts) {
        const name = artifacts[i].filename;

        if (!this.fileList.find(i => i.key === name)) {
          getArtifact(ticketId, name)
            .then(res => {
              this.fileList.push({
                key: name,
                text: <span className="text">{name}</span>,
                value: beautify(res),
              });
            })
            .catch(error => {
              this.setState({ filesBeingBlocked: true });

              this.fileList.push({
                key: name,
                text: (
                  <span className="text">
                    {name + ' (blocked by the adblocker)'}
                  </span>
                ),
                value: 'dummy value',
                // if we don't put value and this disabled entry is the first one, it will be pre-selected and highlighted
                // see https://github.com/Semantic-Org/Semantic-UI-React/issues/3130#issuecomment-530703465
                disabled: true,
              });
              console.log(error);
            });
        }
      }
    } catch (error) {
      // todo: tell user about error
    }
  }

  componentDidMount() {
    this.fetchArtifacts();
  }

  handleOnChange = (e, data) => {
    this.props.onFileSelectionChange(e, data);
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
        <Dropdown
          placeholder="Select a File"
          fluid
          selection
          options={this.fileList}
          onChange={this.handleOnChange}
        />
        <AceEditor
          mode="javascript"
          theme="monokai"
          readOnly={true}
          width=""
          height="800px"
          value={this.props.code}
          cursorStart={1}
          wrapEnabled={true}
          editorProps={{ $blockScrolling: true }}
        />
      </>
    );
  }
}
