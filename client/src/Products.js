import React from 'react';

export const Products = ({ addToCart, products }) => {
  let productComponents = products.map(product => {
    return (
      <div className="product-item" key={ product.record_id }>
        <div>
          { product.record_name }
        </div>
        <div>
          { product.record_description }
        </div>
        <div>
          ${ product.record_price }
        </div>
      </div>
      )
  })
  return (
    <div className="products-container">
      { productComponents }
    </div>
    )
}