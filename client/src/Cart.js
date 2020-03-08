import React from 'react';

export const Cart = ({ addToCart, cart= [] }) => {
  let cartItemsComponents = () => cart.map(item => {
    return (
      <div className="cart-item" key={ item.cart_item_id }>
        <p className="item-info"><span>Item: { item.record_name }</span> <span>Quantity: { item.quantity }</span></p>
        <div className="cart-item-control">
          <span 
            className="button add"
            onClick={ () => addToCart(item.record_id, 1, item.record_price) }>
            Add One</span>
          <span 
            className="button remove" 
            onClick={ () => addToCart(item.record_id, -1, -1 * item.record_price)}>
            Remove One</span>
          <span 
            className="button remove-all" 
            onClick={ () => addToCart(item.record_id, -1 * item.quantity, -1 * item.quantity * item.record_price)}>
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
      <h3>Cart</h3>
      { cartItemsComponents() }
      <div>
        <p>Total Price: { cartSummary.totalPrice }</p>
        <p>Total Items: { cartSummary.totalItems }</p>
      </div>
    </section>
    );
}