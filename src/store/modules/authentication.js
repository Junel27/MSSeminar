export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
  },

  getters: {
    token: state => state.token,
    user: state => state.user,
    headers: state => { 
      return {
        'Authorization': 'Bearer ' + state.token
      } 
    }
  },

  mutations: {
    SET_TOKEN(state, auth_token) {
      localStorage.setItem('token', auth_token)
      state.token = auth_token
    },
    CLEAR_TOKEN(state) {
      localStorage.removeItem('token')
      state.token = null
    },
    SET_USER(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    CLEAR_USER(state) {
      localStorage.removeItem('user')
      state.user = null
    }
  },

  actions: {
    /**
     * store action that calls the event register API
     * and store token to the localStorage and vuex 
     */
    register(context, {data, onSuccess, onError, onDone} = {} ) {
      if ( !this._vm.$http) {
        return console.error('authentication:', 'Please setup axios on Vue.prototype.$http (main.js)')
      }
      console.log('authentication: register')

      // register post request
      this._vm.$http.post('user', data)
      // register successs
      .then( response => {
        // console.log(response.data)
        context.commit('SET_TOKEN', response.data.data.token)
        context.commit('SET_USER', response.data.data.user)

        if (typeof onSuccess === 'function' )
          onSuccess(response)
      })
      // register error
      .catch( error => {
        console.error('login',error)
        if (typeof onError === 'function' )
          onError(error)
      })
      // register done
      .then( response => {
        if (typeof onDone === 'function' )
          onDone(response)
      })
    },
    
    /**
     * store action that calls the event login API
     * and store token to the localStorage and vuex 
     */
    login(context, { data, onSuccess, onError, onDone} = {}) {
      if ( !this._vm.$http) {
        return console.error('authentication:', 'Please setup axios on Vue.prototype.$http (main.js)')
      }
      console.log('authentication: login')
      
      // login post request
      this._vm.$http.post('login', data)
      // login success
      .then( response => {
        context.commit('SET_TOKEN', response.data.data.token)
        context.commit('SET_USER', response.data.data.user)

        if (typeof onSuccess === 'function' )
          onSuccess(response)
      })
      // login error
      .catch( error => {
        console.error('login',error)
        if (typeof onError === 'function' )
          onError(error)
      })
      // login done
      .then( response => {
        if (typeof onDone === 'function' )
          onDone(response)
      })
    },
    
    /**
     * store action that calls the event logout API
     * and remove  token from the localStorage and vuex 
     */
    logout(context, { onSuccess, onError, onDone } = {}) {
      if ( !this._vm.$http) {
        return console.error('authentication:', 'Please setup axios on Vue.prototype.$http (main.js)')
      }
      console.log('authentication: logout')
      
      var headers = context.getters['headers']
      // logout post request
      this._vm.$http.post('logout', null,  { headers })
      // logout success
      .then( response => {
        if (response.status == 200) {
          context.commit('CLEAR_TOKEN')
          context.commit('CLEAR_USER')
          if (typeof onSuccess === 'function' )
            onSuccess(response)
        }
      })
      // logout error
      .catch( error => {
        // console.error('logout',error)
        if (typeof onError === 'function' )
          onError(error)
      })
      // logout done
      .then( response => {
        if (typeof onDone === 'function' )
          onDone(response)
      })
    },
    
    /**
     * store action that calls the event ping API 
     */
    ping(context, { onSuccess, onError, onDone } = {} ) {
      if ( !this._vm.$http) {
        return console.error('authentication:', 'Please setup axios on Vue.prototype.$http (main.js)')
      }
      if ( !context.getters['token'] )
        return;
      
      // console.log('authentication: ping')

      var headers = context.getters['headers']
      // ping get request
      this._vm.$http.get('ping', { headers })
      // ping success
      .then( response => {
        if (response.status == 200) {
          if (typeof onSuccess === 'function' )
            onSuccess(response)
        }
      })
      // ping error
      .catch( error => {
        console.error('logout',error)
        if (typeof onError === 'function' )
          onError(error)
      })
      // ping done
      .then( response => {
        if (typeof onDone === 'function' )
          onDone(response)
      })  
    },
  }

}