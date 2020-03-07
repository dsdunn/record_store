import React,  { Component } from 'react';
import './App.css';

import { Products } from './Products';
import { Cart } from './Cart';

import { Fetch } from './fetch';

class App extends Component {
  
  componentDidMount() {
    let response = Fetch.getCart();
    console.log(response);
  }

  render() {  
    return (
      <div className="App">
        <h1>Dude's Record Store</h1>
        <Products />
        <Cart />
      </div>
    );
  }
}

export default App;
