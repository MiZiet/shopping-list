import store from '../store';

export default function () {
  let addBasketForm = document.getElementById('bakset-form');
  let BasketFormName = document.getElementById('bakset-form-name');
  addBasketForm.addEventListener('submit', (e) => {
    submitNewBasket(e, BasketFormName.value.toString());
  });
}

function submitNewBasket(e, name) {
  e.preventDefault();
  store.dispatch('addBasket', { name });
}
