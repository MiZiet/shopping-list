import store from '../store/index.js';

export function modalInit() {
  let modal = document.getElementById('modal-container');
  let modalBackground = document.getElementsByClassName('modal-background');
  let modalCloseBtn = document.getElementById('modal-close-btn');

  modal.addEventListener('click', (e) => {
    if (e.target === modalBackground[0] || e.target === modalCloseBtn) hideModal(modal);
  });
}

export function showModal(containerId, editItem = false) {
  let modalForm = document.getElementById('modal-form');
  modalForm.addEventListener('submit', (e) => formSubmit(e, containerId, editItem), {
    once: true,
  });
  if (!editItem) setFormValues();
  if (editItem) setFormValues(containerId);
  let modal = document.getElementById('modal-container');
  modal.classList.add('modal-show');
  modal.classList.remove('modal-hide');
  changePrice();
  modalListeners();
}

function hideModal() {
  let modal = document.getElementById('modal-container');
  modal.classList.remove('modal-show');
  modal.classList.add('modal-hide');
}

function modalListeners() {
  let priceInput = document.getElementById('price-per-unit');
  let amountInput = document.getElementById('form-amount');
  priceInput.addEventListener('change', changePrice);
  amountInput.addEventListener('change', changePrice);
}

function changePrice() {
  let priceInput = document.getElementById('price-per-unit');
  let amountInput = document.getElementById('form-amount');
  let priceContainer = document.getElementById('modal-price');
  priceContainer.innerHTML = `${Math.round(amountInput.value * priceInput.value * 100) / 100} zł`;
}

function formSubmit(e, containerId, editItem) {
  e.preventDefault();
  let productName = document.getElementById('form-product-name').value;
  let unitsList = document.getElementById('form-units').value;
  let pricePerUnit = document.getElementById('price-per-unit').value;
  let formAmount = document.getElementById('form-amount').value;

  const newItem = {
    name: productName,
    price: pricePerUnit,
    amount: formAmount,
    unit: unitsList,
  };

  if (!editItem) store.dispatch('addItem', { containerId, newItem });
  if (editItem) store.dispatch('editItem', { containerId, newItem });
  hideModal();
}

function setFormValues(id = '') {
  let modalTitle = document.getElementById('modal-title');
  if (id === '') {
    modalTitle.innerHTML = 'Add new item';
    document.getElementById('form-product-name').value = '';
    document.getElementById('form-units').value = '';
    document.getElementById('price-per-unit').value = 1;
    document.getElementById('form-amount').value = 1;
  }
  if (id !== '') {
    modalTitle.innerHTML = 'Edit item';
    const action = id.split('-');
    const item = parseInt(action[2]);
    const basket = parseInt(action[1]);
    const { name, price, amount, unit } = store.state.items[basket].content[item];
    document.getElementById('form-product-name').value = name;
    document.getElementById('form-units').value = unit;
    document.getElementById('price-per-unit').value = price;
    document.getElementById('form-amount').value = amount;
  }
}
