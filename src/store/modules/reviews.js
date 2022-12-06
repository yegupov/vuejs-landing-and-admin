import { authHeader, handleResponse } from '../../helpers'

export default {
  namespaced: true,

  state: {
    reviews: []
  },

  getters: {
    allReviews : state => {
      return state.reviews;
    }
  },

  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },

    ADD_REVIEW(state, review) {
      review.id = Date.now();
      state.reviews.push(review);
    },

    EDIT_REVIEW(state, editedReview) {
      state.reviews = state.reviews.map(review => {
        return review.id === editedReview.id ? editedReview : review;
      });
    },

    DELETE_REVIEW(state, deletedReview) {
      state.reviews = state.reviews.filter(
        review => review.id !== deletedReview.id
      );
    }
  },

  actions: {
    async addReview({ commit, state }, newReview) {
      if (state.reviews.length > 8) {
        return 'Reviews can not be more than 9! Reset state or remove reviews to be able to add reviews.';
      } else {
        const url = 'http://localhost:4000/reviews/create';
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        };

        try {
          const response = await fetch(url, requestOptions);
          const responseData = await handleResponse(response);
          console.log('Response message : ', responseData.message); // CHECK TOKEN

          commit("ADD_REVIEW", newReview);

          const availableReview = 9 - state.reviews.length;

          return `You can add ${availableReview} more reviews`;

        } catch (e) {
          console.log('ERROR => ', 'Unable to create review!', e);
        }
      }
    },

    async editReview({ commit }, editedReview) {
      const url = 'http://localhost:4000/reviews/update';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(editedReview)
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("EDIT_REVIEW", editedReview);

      } catch (e) {
        console.log('ERROR => ', 'Unable to edit review!', e);
      }
    },

    async removeReview({ commit }, deletedReview) {
      const url = 'http://localhost:4000/reviews/delete';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({id: deletedReview.id})
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("DELETE_REVIEW", deletedReview);

      } catch (e) {
        console.log('ERROR => ', 'Unable to delete review!', e);
      }
    },

    async fetchReviews({ commit }) {
      const requestOptions = {
        method: 'GET'
      };

      try {
        const response = await fetch("http://localhost:4000/reviews", requestOptions);
        const reviews = await handleResponse(response);

        commit("SET_REVIEWS", reviews);

      } catch (error) {
        console.log('ERROR => ', 'Failed to get reviews');
      }

    }
  }
};
