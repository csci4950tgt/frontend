import React, {Component} from 'react';

class UserInput extends Component {
  state = {
    url: '',
    height: '',
    width: ''
  }
  //for multiple on forms on a field
  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.userInput(this.state.url, this.state.height, this.state.width);
    this.setState({url: '',
      height: '',
      width: ''});
    this.props.onSubmit(this.state.url);

  }
  render(){
    return (
      <div>
        <h3> Enter Parameters:</h3>
        <form
        onSubmit={this.onFormSubmit}
        style={{display: 'inline-block'}}>
        <input
          style={inputStyle}
          type="text"
          name="url"
          placeholder="Enter an url"
          value={this.state.url}
          onChange={this.onChange} />
        <input
          style={inputStyle}
          type="text"
          name="width"
          placeholder="Enter an image width"
          value={this.state.width}
          onChange={this.onChange} />
        <input
          style={inputStyle}
          type="text"
          name="height"
          placeholder=" Enter an image height"
          value={this.state.height}
          onChange={this.onChange} />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1'}}/>
      </form>
      </div>
    );
  }
}

const inputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px'
}

export default UserInput;
