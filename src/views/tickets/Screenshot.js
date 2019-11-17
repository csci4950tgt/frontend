import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';

export default class Screenshot extends Component {
  state = {
    id: '',
    blobUrl: '',
  };

  arrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach(b => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  };

  onResponseReceived = async e => {
    this.state.id = this.props.ticketID;
    const endpoint =
      'http://localhost:8080/api/tickets/' + this.state.id + '/artifacts';
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
      });
      const response = await res.json();
      //const myBlob = res.blob();
      //console.log(res.blob());
      // const myBlob = await res.blob();
      // const blobUrl = URL.createObjectURL(myBlob);
      // const url = blobUrl.replace(/[blob:]{5}/gi,'')
      // this.setState({ blobUrl: url});
      //this.setState({ blobUrl: blobUrl});
      //console.log(this.state.blobUrl)
      //debugger;
      //console.log(response.blob());
      // const stringRes = JSON.stringify(response);
      // const jsonObj = JSON.parse(stringRes);
      // const png = jsonObj.fileArtifacts[0].filename;
      // debugger;
      // this.state.blobUrl= blobUrl;
      // console.log(this.state.blobUrl);
      // return blobUrl;

      //  Obtain a blob: URL for the image data.
      var arrayBufferView = new Uint8Array(this.response);
      console.log(arrayBufferView);
      var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);
      console.log(imageUrl);
      var img = document.querySelector('#photo');
      img.src = imageUrl;
      //debugger;
      // this.setState({ blobUrl: imageUrl});
      // var arrayBuffer = await myBlob.arrayBuffer();   //: ArrayBuffer
      // //response.arrayBuffer().then((buffer) => {
      // var base64Flag = 'data:image/jpeg;base64,';
      // var imageStr = this.arrayBufferToBase64(arrayBuffer);

      //document.querySelector('photo').src = base64Flag + imageStr;
      //});
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    var yourPicture = require('./logo192.png');
    this.onResponseReceived();
    let url = this.state.blo;
    return (
      <div>
        <Header as="h3"> Screenshot</Header>
        <img id="photo" />
        <img src={yourPicture} />
      </div>
    );
  }
}
