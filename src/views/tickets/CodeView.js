import React, { Component } from 'react';

// import Prism from "prismjs"
// import 'prismjs/themes/prism-okaidia.css'

export default class CodeView extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.highlight();
  }
  componentDidUpdate() {
    this.highlight();
  }
  highlight = () => {
    if (this.ref && this.ref.current) {
      // Prism.highlightElement(this.ref.current)
    }
  };
  render() {
    const code = this.props.code;
    return (
      <pre>
        <code style={{ textAlign: 'left' }} ref={this.ref}>
          {code}
        </code>
      </pre>
    );
  }
}
