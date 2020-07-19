import Component from '../component';
import store from '../store/index';
import listeners from '../listeners/listeners';
import addBasketListener from '../listeners/addBasket';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.main-container'),
    });
    this.listenerAttached = false;
    this.basketCosts = [];
  }

  calculateBasketsCosts() {
    this.basketCosts = [];
    if (store.state.items !== [] && store.state.items !== undefined) {
      store.state.items.forEach((basket) => {
        let cost = 0;
        basket.content.forEach((item) => {
          cost = cost + Math.round(Number(item.price) * Number(item.amount) * 100) / 100;
        });
        this.basketCosts = [...this.basketCosts, Math.round(cost * 1000) / 1000];
      });
    }
  }
  basketListener() {
    addBasketListener();
  }
  render() {
    this.calculateBasketsCosts();

    if (store.state.item && store.state.items.length === 0) {
      this.element.innerHTML = `<section class="add-basket"><img src="../../img/add.png"/></section>`;
      return;
    }

    this.element.innerHTML = `
        ${
          store.state.items
            ? store.state.items
                .map((item, itemIndex) => {
                  return `
            <section id="${item.name.toLowerCase()}" >
              <header>
                <h2>
                ${item.name}</h2>
              </header>
              <ul> 
              <li>
              <p class="item-name">Name</p> 
              <p>Amount</p>
              <p>Price/Unit </p>
              <p>Total Price</p>
              <p>Action</p>
              </li>
              ${item.content
                .map((contentItem, contentItemIndex) => {
                  return `
                <li>
                  <p class="item-name">${contentItem.name}</p> 
                  <p>${contentItem.amount} ${contentItem.unit}</p>
                  <p> ${contentItem.price} </p>
                  <p> ${Math.round(contentItem.price * contentItem.amount * 100) / 100} </p>
                  <span><button id=edit-${itemIndex}-${contentItemIndex} class="edit-item">&#9998;</button><button id=del-${itemIndex}-${contentItemIndex} class="delete">&#10006;</button></span>
                  </li>
                `;
                })
                .join('')}
              </ul>
            <footer> 
                  <p>${this.basketCosts[itemIndex]} zł</p>
                  <button id="add-item-${itemIndex}" class="add-item">&#10010;</button>
                  <button id="del-basket-${itemIndex}" class="del-basket">&#10006;</button>
            </footer>
            </section>
          `;
                })
                .join('')
            : ' '
        }
          <section class="add-basket"><img class="add-basket-img" src="../../img/add.png"/>
          <form id="bakset-form">
          <label for="bakset-form-name">Bakset name:</label><br />
          <input required id="bakset-form-name" name="bakset-form-name" type="text" /><br/ >
          <input class="bakset-form-submit" id="bakset-form-submit" name="bakset-form-submit" type="submit" value="Add new basket"/>
          </form>
          </section>
          `;

    if (this.listenerAttached === false) {
      this.element.addEventListener('click', (e) => {
        listeners(e);
      });
      this.listenerAttached = true;
    }
    this.basketListener();
    store.dispatch('saveLocalState', {});
  }
}
