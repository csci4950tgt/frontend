import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

import AceEditor from 'react-ace';
import { js as beautify } from 'js-beautify';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
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

          const numberOfFiles = artifacts.count;

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

                  if (this.fileList.count === numberOfFiles) {
                    this.setState({ ready: true });
                  }
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
