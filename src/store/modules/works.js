import { authHeader, handleResponse } from '../../helpers'

export default {
  namespaced: true,

  state: {
    works: []
  },

  getters: {
    allWorks : state => {
      return state.works;
    }
  },

  mutations: {
    SET_WORKS(state, works) {
      state.works = works;
    },

    ADD_WORK(state, work) {
      const photoNumber = state.works.length + 1;
      work.id = Date.now();
      work.photo = 'work-' + photoNumber + '.jpg';
      state.works.push(work);
    },

    EDIT_WORK(state, editedWork) {
      state.works = state.works.map(work => {
        return work.id === editedWork.id ? editedWork : work;
      });
    },

    DELETE_WORK(state, deletedWork) {
      state.works = state.works.filter(
        work => work.id !== deletedWork.id
      );
    }
  },

  actions: {
    async addWork({ commit, state }, newWork) {
      if (state.works.length > 7) {
        return 'Works can not be more than 8! Reset state or remove works to be able to add works.';
      } else {

        const url = 'http://localhost:4000/works/create';
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(newWork)
        };
        requestOptions.headers['Content-Type'] = 'application/json';

        try {
          const response = await fetch(url, requestOptions);
          const responseData = await handleResponse(response);
          console.log('Response message : ', responseData.message); // CHECK TOKEN

          commit("ADD_WORK", newWork);

          const availableWork = 8 - state.works.length;

          return `You can add ${availableWork} more works`;

        } catch (e) {
          console.log('ERROR => ', 'Unable to create work!', e);
        }
      }
    },

    async editWork({ commit }, editedWork) {
      const url = 'http://localhost:4000/works/update';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(editedWork)
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("EDIT_WORK", editedWork);

      } catch (e) {
        console.log('ERROR => ', 'Unable to edit work!', e);
      }
    },

    async removeWork({ commit }, deletedWork) {
      const url = 'http://localhost:4000/works/delete';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({id: deletedWork.id})
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("DELETE_WORK", deletedWork);

      } catch (e) {
        console.log('ERROR => ', 'Unable to delete work!', e);
      }
    },

    async fetchWorks({ commit }) {
      const requestOptions = {
        method: 'GET'
      };

      try {
        const response = await fetch("http://localhost:4000/works", requestOptions);
        const works = await handleResponse(response);

        commit("SET_WORKS", works);
      } catch (error) {
        console.log('ERROR => ', 'Failed to get works');
      }

    }
  }
};
