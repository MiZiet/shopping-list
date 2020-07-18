import Component from '../component.js';
import store from '../store/index.js';
import listeners from '../listeners/listeners.js';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.main-container'),
    });
    this.listenerAttached = false;
  }

  render() {
    let self = this;

    if (store.state.items.length === 0) {
      self.element.innerHTML = `<p class="no-items">Add your first basket</p>`;
      return;
    }

    self.element.innerHTML = `
        ${store.state.items
          .map((item, itemIndex) => {
            return `
            <section id="${item.name.toLowerCase()}" >
              <header>
                <h2>
                  ${item.name}
                </h2>
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
                  <p> ${contentItem.price * contentItem.amount} </p>
                  <span><button class="edit">&#9998;</button><button id=del-${itemIndex}-${contentItemIndex} class="delete">&#10006;</button></span>
                  </li>
                `;
                })
                .join('')}
              </ul>
            <footer> 
                  <p> 10 zł</p>
                  <button id="add-item-${itemIndex}" class="add-item">&#10010;</button>
                  <button id="del-basket-${itemIndex}" class="del-basket">&#10006;</button>
            </footer>
            </section>
          `;
          })
          .join('')}
    `;

    if (this.listenerAttached === false) {
      self.element.addEventListener('click', (e) => {
        listeners(e);
        console.log('added');
      });
      this.listenerAttached = true;
    }
  }
}
