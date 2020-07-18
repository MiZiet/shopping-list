import store from '../store/index.js';
export default function (e) {
  if (e.target.classList.contains('delete')) {
    const id = e.target.id;
    store.dispatch('clearItem', { id });
  }
  if (e.target.classList.contains('del-basket')) {
    const id = e.target.id;
    store.dispatch('clearBasket', { id });
  }
  if (e.target.classList.contains('add-item')) {
    const id = e.target.id;
    store.dispatch('addItem', { id });
  }
}
