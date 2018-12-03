import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      greeting: ''
    }
  }

  componentDidMount() {
    this.fetchHelloWorld();
  }

  async fetchHelloWorld() {
    const response = await axios.get('http://localhost:8080');

    this.setState({
      greeting: response.data.greeting
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1>Hello React</h1>

        <p>Server response: {this.state.greeting}</p>
      </div>
    );
  }
}

export default App;
