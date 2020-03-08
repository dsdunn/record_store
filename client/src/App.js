import React,  { Component } from 'react';
import './App.css';

import { Products } from './Products';
import { Cart } from './Cart';

import { Fetch } from './fetch';

class App extends Component {

  async componentDidMount() {
    let cartResponse = await Fetch.getCart();
    let productResponse = await Fetch.getProducts();
    
    this.setState({
      cart: cartResponse,
      products: productResponse
    })
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
