import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

import AceEditor from 'react-ace';

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

  async fetchArtifacts() {
    const endpoint =
      'http://localhost:8080/api/tickets/' + this.props.ticketID + '/artifacts';
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
      });
      const json = await res.json();
      const artifacts = json.fileArtifacts.filter(artifact =>
        artifact.filename.endsWith('.js')
      );
      const numberOfFiles = artifacts.count;
      artifacts.forEach(async artifact => {
        const e =
          'http://localhost:8080/api/tickets/' +
          this.props.ticketID +
          '/artifacts/' +
          artifact.filename;

        const c = await fetch(e, {
          method: 'GET',
          responseType: 'text',
        });
        const cc = await c.text();
        const name = artifact.filename;
        if (
          this.fileList.find(i => {
            return i.key === name;
          }) === undefined
        ) {
          this.fileList.push({
            key: name,
            text: <span className="text">{name}</span>,
            value: cc,
            image: null,
          });
          if (this.fileList.count === numberOfFiles) {
            this.setState({ ready: true });
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
      <div>
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
          name="test"
          width=""
          height="800px"
          value={this.props.code}
        />
      </div>
    );
  }
}
