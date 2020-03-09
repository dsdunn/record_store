import React from 'react';

export const EmptyCartModal = ({ isOpen, closeModal }) => {
  const modal = () => {
    return (
      <div className="empty-cart-modal-container">
        <div className="empty-cart-modal">
          <h4>Your cart is empty. Click an item to add to cart.</h4>
          <button className="modal-button" onClick={ () => closeModal() }>OK</button>
        </div>
      </div>
      )
  }

  return isOpen ? modal() : null;
}