import React from 'react';
//import '../styles/App.css';
class App extends React.Component {
  render() {
    return <><div className="container">
      <input className="form-control form-control-lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" />
      <input className="form-control" type="text" placeholder="Default input" aria-label="default input example" />
      <input className="form-control form-control-sm" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example" />
    </div></>
  }
}

export default App;
