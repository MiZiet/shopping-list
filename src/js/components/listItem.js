import Component from '../component';
import store from '../store/index';

export default class ListItem extends Component {
  constructor(item, index) {
    super({
      store,
      element: document.querySelector(`#${item.name.toLowerCase()}`),
    });
    this.index = index;
    this.item = item;
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
  render() {
    this.calculateBasketsCosts();
    this.element.innerHTML = `
              <header>
                <h2>
                ${this.item.name}</h2>
              </header>
              <ul> 
              <li>
              <p class="item-name">Name</p> 
              <p>Amount</p>
              <p>Price/Unit </p>
              <p>Total Price</p>
              <p>Action</p>
              </li>
              ${this.item.content
                .map((contentItem, contentItemIndex) => {
                  return `
                <li>
                  <p class="item-name">${contentItem.name}</p> 
                  <p>${contentItem.amount} ${contentItem.unit}</p>
                  <p> ${contentItem.price} </p>
                  <p> ${Math.round(contentItem.price * contentItem.amount * 100) / 100} </p>
                  <span><button id=edit-${
                    this.index
                  }-${contentItemIndex} class="edit-item">&#9998;</button><button id=del-${
                    this.index
                  }-${contentItemIndex} class="delete">&#10006;</button></span>
                  </li>
                `;
                })
                .join('')}
              </ul>
            <footer> 
                  <p>${this.basketCosts[this.index]} zł</p>
                  <button id="add-item-${this.index}" class="add-item">&#10010;</button>
                  <button id="del-basket-${this.index}" class="del-basket">&#10006;</button>
            </footer>
          `;
  }
}
