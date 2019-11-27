import React, { Component } from 'react';

import { Dropdown, Message } from 'semantic-ui-react';

import AceEditor from 'react-ace';
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

  fetchArtifacts() {
    const artifactURL = `http://localhost:8080/api/tickets/${this.props.ticketID}/artifacts`;
    try {
      fetch(artifactURL, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const artifacts = res.fileArtifacts.filter(artifact =>
            artifact.filename.endsWith('.js')
          );

          for (let i in artifacts) {
            const name = artifacts[i].filename;

            if (
              this.fileList.find(i => {
                return i.key === name;
              }) === undefined
            ) {
              const fileURL = `http://localhost:8080/api/tickets/${this.props.ticketID}/artifacts/${name}`;
              fetch(fileURL, {
                method: 'GET',
                responseType: 'text',
              })
                .then(res => res.text())
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
        });
    } catch (error) {
      console.log(error);
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
