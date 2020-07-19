export default {
  clearItem(state, payload) {
    const action = payload.id.split('-');
    const item = parseInt(action[1]);
    const content = parseInt(action[2]);
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
    const action = payload.containerId.split('-');
    const item = parseInt(action[2]);
    state.items[item].content.push(payload.newItem);
    return state;
  },

  editItem(state, payload) {
    const action = payload.containerId.split('-');
    const basket = parseInt(action[1]);
    const item = parseInt(action[2]);
    state.items[basket].content[item] = payload.newItem;
    return state;
  },

  addBasket(state, payload) {
    state.items.push({
      name: payload.name,
      content: [],
    });
    return state;
  },

  saveLocalState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
  },
};
