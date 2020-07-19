import PubSub from '../pubsub';

export default class Store {
  constructor(params) {
    const self = this;
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new PubSub();
    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }
    this.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;

        self.events.publish('stateChange', self.state);

        self.status = 'resting';

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') return false;

    this.status = 'action';

    this.actions[actionKey](this, payload);

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') return false;

    this.status = 'mutation';

    let newState = this.mutations[mutationKey](this.state, payload);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}
