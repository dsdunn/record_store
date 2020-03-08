export class Fetch {
  static fetchData = async (endpoint, method = 'GET', body) => {
    let response = await fetch(`http://localhost:8080/api/v1/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body && JSON.stringify(body)
    });

    return await response.json();
  }

  static getCart = (user_id = 1) => {
    return this.fetchData(`cart?user_id=${user_id}`);
  }

  static getProducts = () => {
    return this.fetchData('products');
  }

  static postCartItem = (record_id, priceToAdd, user_id = 1) => {
    return this.fetchData(`cart_item?record_id=${record_id}&user_id=${user_id}&price_to_add=${priceToAdd}`, 'POST');
  }

  static putCartItem = (record_id, priceToAdd, itemQtyChange, user_id = 1) => {
    return this.fetchData(`cart_item?record_id=${record_id}&user_id=${user_id}&price_to_add=${priceToAdd}&item_quantity_change=${itemQtyChange}`, 'PUT');
  }

  static deleteCartItem = (record_id, priceToAdd, itemQtyChange, user_id = 1) => {
    return this.fetchData(`cart_item?record_id=${record_id}&user_id=${user_id}&price_to_add=${priceToAdd}&item_quantity_change=${itemQtyChange}`, 'DELETE');
  }
}
