import axios from 'axios'
export default {
  namespaced: true,

  state: {
    settings: {},
    event_slug: null
  },

  getters: {
    settings: state => state.settings,
    event_slug: state => state.event_slug
  },

  mutations: {
    SET_SETTINGS(state, payload) {
      state.settings = payload
    },
    SET_EVENT_SLUG(state, payload) {
      state.event_slug = payload
    }
  },

  actions: {
    fetchSettings(context, event_slug) {
      var antiCacheSuperAlgo = Math.random();
      var params = {
        rand: antiCacheSuperAlgo
      }
      
      var slug = context.getters['event_slug']
      if (!slug) {
        slug = event_slug
        context.commit('SET_EVENT_SLUG', event_slug)
      }

      axios.get(`https://event-microservice-public-bucket.s3-ap-southeast-1.amazonaws.com/settings/${slug}.json`,
      { params })
      .then(response => {
        console.log(response.data)
        context.commit('SET_SETTINGS', response.data)
      })
      .catch( error => { console.error(error)})
    }
  }
}