localStorage.removeItem('range')

export default {
  namespaced: true,
  
  state: {
    dot: JSON.parse(localStorage.getItem('dots') || '[]'),
    range: [],
    dotIntervalId: null,
    rangeIntervalId: null,
  },

  getters: {
    dot: state => {
      return state.dot
    },
    range: state => {
      return state.range
    }
  },

  mutations: {
    ADD_DOT(state, payload) {
      state.dot.push(payload)
      localStorage.setItem('dots', JSON.stringify(state.dot))
    },
    CLEAR_DOT(state) {
      state.dot = [],
      localStorage.removeItem('dots')
    },
    ADD_RANGE(state, payload) {
      state.range.push(payload)
      localStorage.setItem('range', JSON.stringify(state.range))
    },
    REMOVE_RANGE(state, payload) {
      var rangeIndex = state.range.findIndex( element => {
        var same = payload.main_key === element.main_key
        if (payload.sub_key)
          same = same && payload.sub_key === element.sub_key
        else
          same = same && !element.sub_key
        
        return same
      })
      state.range.splice(rangeIndex, 1)
      localStorage.setItem('range', JSON.stringify(state.range))
    }
  },

  actions: {
    dot(context,  { main_key, sub_key, data_action } = {}) {
      var dot = {
        main_key: main_key,
        sub_key: sub_key || null,
        data_action: data_action || 'enter'
      }
      context.commit('ADD_DOT', dot);
      // console.log(dot)
      
      const sendDot = ()=>{
        // auth header
        var headers = context.rootGetters['authentication/headers']
        // console.log(headers)
        var dots = context.getters['dot']
        
        var data = {
          dot_array: dots
        }

        var event_slug = context.rootGetters['settings/event_slug']
        this._vm.$http.post(`https://awit-production.fourello.com/api/${event_slug}/data/dot`, data, { headers })
        .then( () =>{
          // console.log('analytics-dot: ', response)
        })

        context.commit('CLEAR_DOT')
      } 
      
      if (context.getters['dot'].length === 10) {
        sendDot()  
      }
      else if (!context.getters['dotIntervalId']) {
        context.state.dotIntervalId = setInterval(()=>{
          if ( context.getters['dot'].length > 0 ) {
            sendDot()
          }
        },30000)
      }
    },
    addRange(context,  { main_key, sub_key } = {}) {
      var range = {
        main_key: main_key,
        sub_key: sub_key || null,
      }
      
      var headers = context.rootGetters['authentication/headers']
      
      var event_slug = context.rootGetters['settings/event_slug']
      this._vm.$http.post(`https://awit-production.fourello.com/api/${event_slug}/data/range`, range, { headers })
      .then( response =>{
        range.slug = response.data.data.slug 
        context.commit('ADD_RANGE', range)
      })

      if (!context.getters['rangeIntervalId'] ) {
        context.state.rangeIntervalId = setInterval(()=>{
          
          var ranges = {
            slug: context.getters['range'].map(element => element.slug)
          }

          var headers = context.rootGetters['authentication/headers']

          var event_slug = context.rootGetters['settings/event_slug']
          if (ranges.slug.length > 0 ) {
            this._vm.$http.post(`https://awit-production.fourello.com/api/${event_slug}/data/range`, ranges, { headers })
            .then( () =>{ 
              // console.log('analytics-range', response) 
            })  
          } 
        },30000)
      }
    },

    removeRange(context, range) {
      context.commit('REMOVE_RANGE', range)
    }
  }
};