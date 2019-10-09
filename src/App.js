import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{width: 50, height: 50}} />
        <h3> Vigilante Web Heist </h3>
        {/*}<a className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React</a> */}
        </header>
      <body className="body">
        <div className="InputSection">
          <h3> Enter a url: </h3>

          <h3> Enter an image height: </h3>

          <h3> Enter an image width: </h3>
          <Form />
        </div>
        <div className="OutputSection">
        <h3> The url that you have entered is </h3>
        </div>
    </body>
    </div>

  );
}

const collectInput = (value, setFunc) => {
  // console.log(e)
  // console.log(e.value)
  console.log(value.target.value)
  setFunc(value.target.value)
}

const Form = () => {

  const [url, height, width, setUrl, setHeight, setWidth] = useState("", 100, 100)

  return(
    <Url url={url} setUrl={setUrl} />,
    <Height height={height} setHeight={setHeight} />,
    <Width width={width} setWidth={setWidth} />
  )

}

const Url = ({url, setUrl}) => {

  return( <input className= "input" onChange={(e) => collectInput(e, setUrl)} value = {url} name="url"/>)
}

const Height = ({height, setHeight}) =>{
  return( <input className= "input" onChange={(e) => collectInput(e, setHeight)} value = {height} name="height" />)

}

const Width = ({width, setWidth}) =>{
  return( <input className= "input" onChange={(e) => collectInput(e, setWidth)} value = {width} name="width" />)

}

{/*const IncButton = () => {
  const [count, setCount] = useState(0)

  const incButton = () => {
    setCount(count + 1)
  }

  // const response = await fetch("http://localhost:8080/api/createClient", {
  //   url: "google.com"
  // })

  return (
    <>
    <button onClick={incButton}>click me!!!</button>
      <p>{count}</p>
    </>
  )
}*/}



export default App;
