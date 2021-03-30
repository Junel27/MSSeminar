export default {
  namespaced: true,
  
  state: {
    required: false
  },
  getters: {
    required: state => state.required
  },
  mutations: {
    setRequired(state, orientation) {
      state.required = orientation
    },
    disableRequired(state) {
      state.required = false
    }
  },
  actions: {
  }
};