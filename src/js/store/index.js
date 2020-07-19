import actions from './actions';
import mutations from './mutations';
import appState from './state';
import Store from './store';

let state = appState();
export default new Store({
  actions,
  mutations,
  state,
});
