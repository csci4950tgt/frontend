import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default class CodeBlock extends Component {
  state = {
    id: '',
    processed: '',
    count: 0,
  };

  fileList = [];

  onResponseReceived = async e => {
    this.state.id = this.props.ticketID;
    //there is not reason why this should be called twice but
    //I can't figure out how to pass the processed flag through the routes
    try {
      const res = await fetch(
        'http://localhost:8080/api/tickets/' + this.state.id,
        {
          method: 'GET',
        }
      );

      const response = await res.json();
      var processed = response.ticket.processed;
    } catch (error) {
      console.log(error);
    }

    if (processed) {
      this.setState({ processed: true });
      const endpoint =
        'http://localhost:8080/api/tickets/' + this.state.id + '/artifacts';
      try {
        const res = await fetch(endpoint, {
          method: 'GET',
        });
        const json = await res.json();
        const artifacts = json.fileArtifacts.filter(artifact =>
          artifact.filename.endsWith('.js')
        );
        artifacts.forEach(async artifact => {
          const e =
            'http://localhost:8080/api/tickets/' +
            this.state.id +
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
            this.setState({ count: this.state.count + 1 });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleOnChange = (e, data) => {
    this.props.onFileSelectionChange(e, data);
  };

  render() {
    if (!this.state.processed) {
      this.onResponseReceived();
    }

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
          value={this.props.code}
        />
      </div>
    );
  }
}
