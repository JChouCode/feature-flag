import React, { Component } from 'react';
// import logo from './logo.svg';
import { Button } from 'reactstrap';

import './App.css';

import FlagCard from "./components/flag-card"

class App extends Component {
  render() {
    return (
      <main>
        <FlagCard />
        <div id="buttons">
          <Button color="danger">Delete</Button>
          <Button color="primary">Add</Button>
        </div>
      </main>
    );
  }
}

export default App;
