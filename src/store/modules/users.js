import router from '../../router'
import { authHeader, handleResponse } from '../../helpers'

export default {
  namespaced: true,

  state: {
    users: [],
    loggedUser: null
  },

  getters: {
    allUsers : state => {
      return state.users;
    },

    loggedUser : state => {
      return state.loggedUser;
    }
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },

    SET_LOGGEDUSER(state, user) {
      state.loggedUser = user;
    },

    CLEAR_LOGGEDUSER(state) {
      state.loggedUser = null
    }
  },

  actions: {

    async login({ commit }, loginUser) {
      const url = 'http://localhost:4000/users/auth';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser.username, password: loginUser.password })
      };

      try {
        const response = await fetch(url, requestOptions);
        const user = await handleResponse(response);

        // login successful if there's a jwt token in the response
        if (user.token) {
            commit("SET_LOGGEDUSER", user);
            router.push('/admin');

            return user;
        }
        else commit("CLEAR_LOGGEDUSER");

      } catch (e) {
        console.log('ERROR => ', 'Unable to login');
      }
    },

    async fetchUsers({ commit }) {
      const requestOptions = {
        method: 'GET',
        headers: authHeader()
      };

      return fetch('http://localhost:4000/users', requestOptions)
        .then(handleResponse)
        .then(users => {
          commit("SET_USERS", users);
          return users;
        });
    },

    setLoggedUser({ commit }, loggedUser) {
      commit("SET_LOGGEDUSER", loggedUser);
    },

    logout({ commit }) {
      commit("CLEAR_LOGGEDUSER");
    }
  }
};
