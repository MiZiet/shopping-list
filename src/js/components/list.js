import Component from '../component';
import store from '../store/index';
import listeners from '../listeners/listeners';
import addBasketListener from '../listeners/addBasket';

import ListItem from './listItem';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.main-container'),
    });
    this.listenerAttached = false;
  }

  basketListener() {
    addBasketListener();
  }
  render() {
    if (store.state.item && store.state.items.length === 0) {
      this.element.innerHTML = `<section class="add-basket"><img src="../../img/add.png"/></section>`;
      return;
    }

    this.element.innerHTML = `
        ${
          store.state.items
            ? store.state.items
                .map((item, itemIndex) => {
                  return `<section id="${item.name.toLowerCase()}"></section>`;
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
    store.state.items.map((item, itemIndex) => {
      new ListItem(item, itemIndex).render();
    });
    this.basketListener();
    store.dispatch('saveLocalState', {});
  }
}
