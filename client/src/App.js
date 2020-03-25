import React, { useState, useEffect } from 'react';
import './App.css';

import { Products } from './Products';
import { Cart } from './Cart';
import { EmptyCartModal } from './EmptyCartModal';

import { Fetch } from './fetch';

const App = () => {
  // constructor() {
  //   super();
  //   state = {
  //     user_id: 1,
  //     products: [],
  //     cart: [],
  //     isModalOpen: false
  //   }
  // }
  const [ user_id, setUserId ] = useState(1);
  const [ products, setProducts ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect( () => {
    const getCart = async () => {
      let cartResponse = await Fetch.getCart(user_id);
      let productResponse = await Fetch.getProducts();

      console.log(cartResponse, productResponse);

      if (cartResponse && !cartResponse.length) {
        setIsModalOpen(true);
      };

      setCart(cartResponse);
      setProducts(productResponse);
    }
    // console.log(getCart())
    getCart();

  });

  // async componentDidMount() {
  //   let cartResponse = await Fetch.getCart(state.user_id);
  //   let productResponse = await Fetch.getProducts();

  //   if (cartResponse && !cartResponse.length) {
  //     setState({
  //     isModalOpen: true
  //     })
  //   };
    
  //   setState({
  //     cart: cartResponse,
  //     products: productResponse
  //   })
  // }

  const findCartItem = (record_id) => {
    return cart.find(item => {
      return item.record_id === record_id;
    })
  }

  const addToCart = async (record_id, changeQty, priceToAdd) => {
    let cartItem = findCartItem(record_id)
    let newQuantity = cartItem && cartItem.quantity + changeQty;

    if (newQuantity <= 0) {
      let cart = await Fetch.deleteCartItem(record_id, priceToAdd, changeQty);
      setCart(cart);
    } else if (newQuantity && cartItem) {
      let cart = await Fetch.putCartItem(record_id, priceToAdd, changeQty);
      setCart(cart);
    } else if (changeQty > 0 && !cartItem) {
      let cart = await Fetch.postCartItem(record_id, priceToAdd);
      setCart(cart);;
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <h1>Dude's Record Store</h1>
      <h5>Click on an Item to Add to Cart</h5>
      <Products className="products-section" addToCart={ addToCart } products= { products } />
      <Cart className="cart" addToCart={ addToCart } cart={ cart } />
      <EmptyCartModal isOpen={ isModalOpen } closeModal={ closeModal } />
    </div>
  );
}

export default App;
