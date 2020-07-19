export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  clearItem(context, payload) {
    context.commit('clearItem', payload);
  },
  clearBasket(context, payload) {
    context.commit('clearBasket', payload);
  },
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  editItem(context, payload) {
    context.commit('editItem', payload);
  },
  addBasket(context, payload) {
    context.commit('addBasket', payload);
  },

  saveLocalState(context, payload) {
    context.commit('saveLocalState', payload);
  },
};
