import React from 'react';

export const Cart = ({ addToCart, cart= [] }) => {
  let cartItemsComponents = () => cart.map(item => {
    return (
      <div className="cartItem" key={ item.cart_item_id }>
        <p>item: { item.record_name } quantity: { item.quantity }</p>
        <div className="cart-item-control">
          <span onClick={ () => addToCart(item.record_id, 1, item.record_price) }>
            Add One</span>
          <span onClick={ () => addToCart(item.record_id, -1, -1 * item.record_price)}>
            Remove One</span>
          <span onClick={ () => addToCart(item.record_id, -1 * item.quantity, -1 * item.quantity * item.record_price)}>
            Remove all From Cart</span>
        </div>
      </div>
      )
  })


  let cartSummary = cart.reduce((summary, item) => {
    summary.totalPrice += item.record_price * item.quantity;
    summary.totalItems++;
    return summary;
  }, {totalPrice: 0, totalItems: 0});

  return ( 
    <section className="cart-container">
      { cartItemsComponents() }
      <div>
        <p>Total Price: { cartSummary.totalPrice }</p>
        <p>Total Items: { cartSummary.totalItems }</p>
      </div>
    </section>
    );
}