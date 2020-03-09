import React,  { Component } from 'react';
import './App.css';

import { Products } from './Products';
import { Cart } from './Cart';
import { EmptyCartModal } from './EmptyCartModal';

import { Fetch } from './fetch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 1,
      products: [],
      cart: [],
      isModalOpen: false
    }
  }

  async componentDidMount() {
    let cartResponse = await Fetch.getCart(this.state.user_id);
    let productResponse = await Fetch.getProducts();

    if (cartResponse && !cartResponse.length) {
      this.setState({
      isModalOpen: true
      })
    };
    
    this.setState({
      cart: cartResponse,
      products: productResponse
    })
  }

  findCartItem = (record_id) => {
    return this.state.cart.find(item => {
      return item.record_id === record_id;
    })
  }

  addToCart = async (record_id, changeQty, priceToAdd) => {
    let cartItem = this.findCartItem(record_id)
    let newQuantity = cartItem && cartItem.quantity + changeQty;

    if (newQuantity <= 0) {
      let cart = await Fetch.deleteCartItem(record_id, priceToAdd, changeQty);
      this.setState({
        cart
      })
    } else if (newQuantity && cartItem) {
      let cart = await Fetch.putCartItem(record_id, priceToAdd, changeQty);
      this.setState({
        cart
      })
    } else if (changeQty > 0 && !cartItem) {
      let cart = await Fetch.postCartItem(record_id, priceToAdd);
      this.setState({
        cart
      });
    }
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  render() {  
    return (
      <div className="App">
        <h1>Dude's Record Store</h1>
        <h5>Click on an Item to Add to Cart</h5>
        <Products className="products-section" addToCart={ this.addToCart } products= { this.state.products } />
        <Cart className="cart" addToCart={ this.addToCart } cart={ this.state.cart } />
        <EmptyCartModal isOpen={ this.state.isModalOpen } closeModal={ this.closeModal } />
      </div>
    );
  }
}

export default App;
