import React,  { Component } from 'react';
import './App.css';

import { Products } from './Products';
import { Cart } from './Cart';

import { Fetch } from './fetch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: []
    }
  }

  async componentDidMount() {
    let cartResponse = await Fetch.getCart();
    let productResponse = await Fetch.getProducts();
    
    this.setState({
      cart: cartResponse,
      products: productResponse
    })
  }

  isProductInCart(record_id) {
    return this.state.cart.find(item => {
      return item.record_id === record_id;
    })
  }

  addToCart = async (record_id, changeQty) => {
    let response;
    let cartItem = this.findCartItem(record_id)
    let newQuantity = cartItem && cartItem.quantity + changeQty;

    if (newQuantity === 0) {
      // Fetch.deleteCartItem
      // delete cartItemFromState
    } else if (newQuantity && cartItem) {
      // Fetch.putCartItem -> returns new cart
      // setState(cart)
    } else if (newQuantity && !cartItem) {
      // Fetch.postCartItem(record_id, record_name) -> returns new cart
      // setState(cart)
    }
  }

  render() {  
    return (
      <div className="App">
        <h1>Dude's Record Store</h1>
        <Products className="products-section" addToCart={ this.addToCart } products= { this.state.products } />
        <Cart className="cart" addToCart={ this.addToCart } cart={ this.state.cart } />
      </div>
    );
  }
}

export default App;
