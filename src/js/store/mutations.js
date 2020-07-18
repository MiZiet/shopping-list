export default {
  addItem(state, payload) {
    state.items.push(payload);
    return state;
  },

  clearItem(state, payload) {
    const action = payload.id.split('-');
    const item = parseInt(action[1]);
    const content = parseInt(action[2]);
    console.log(action, item, content);
    state.items[item].content.splice(content, 1);
    return state;
  },

  clearBasket(state, payload) {
    const action = payload.id.split('-');
    const item = parseInt(action[2]);
    state.items.splice(item, 1);
    return state;
  },

  addItem(state, payload) {
    const action = payload.id.split('-');
    const item = parseInt(action[2]);
    state.items[item].content.push({
      name: 'Ziemniaki',
      price: '2',
      amount: ' 1.2',
      unit: 'kg',
    });
    return state;
  },
};
