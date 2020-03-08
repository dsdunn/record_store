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

  static getCart = () => {
    return this.fetchData('cart');
  }

  static getProducts = () => {
    return this.fetchData('products');
  }
}
