import Component from '../component';
import store from '../store/index';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#page-footer'),
    });
    this.totalCost = 0;
  }

  calculateTotalCost() {
    let cost = 0;

    store.state.items &&
      store.state.items.forEach((basket) => {
        basket.content.forEach((item) => {
          cost = cost + Math.round(Number(item.price) * Number(item.amount) * 100) / 100;
        });
      });
    this.totalCost = cost;
  }

  render() {
    this.calculateTotalCost();
    this.element.innerHTML = ` <div id="total-cost"><p>Total cost:<strong>${this.totalCost}</strong>zł</p></div>`;
  }
}
