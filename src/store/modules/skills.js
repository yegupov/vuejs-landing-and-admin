import { authHeader, handleResponse } from '../../helpers'

export default {
  namespaced: true,

  state: {
    skills: []
  },

  getters: {
    allSkills : state => {
      return state.skills;
    }
  },

  mutations: {
    SET_SKILLS(state, skills) {
      state.skills = skills;
    },

    ADD_SKILL(state, skill) {
      skill.id = Date.now();
      state.skills.push(skill);
    },

    EDIT_SKILL(state, editedSkill) {
      state.skills = state.skills.map(skill => {
        return skill.id === editedSkill.id ? editedSkill : skill;
      });
    },

    DELETE_SKILL(state, deletedSkill) {
      state.skills = state.skills.filter(
        skill => skill.id !== deletedSkill.id
      );
    }
  },

  actions: {
    async addSkill({ commit, state }, newSkill) {
      if (state.skills.length > 4) {
        return 'Skills can not be more than 5! Reset state or remove skills to be able to add skills.';
      } else {
        const url = 'http://localhost:4000/skills/create';
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(newSkill)
        };
        requestOptions.headers['Content-Type'] = 'application/json';

        try {
          const response = await fetch(url, requestOptions);
          const responseData = await handleResponse(response);
          console.log('Response message : ', responseData.message); // CHECK TOKEN

          commit("ADD_SKILL", newSkill);

          const availableSkill = 5 - state.skills.length;

          return `You can add ${availableSkill} more skills`;

        } catch (e) {
          console.log('ERROR => ', 'Unable to create skill!', e);
        }
      }
    },

    async editSkill({ commit }, editedSkill) {
      const url = 'http://localhost:4000/skills/update';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(editedSkill)
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("EDIT_SKILL", editedSkill);

      } catch (e) {
        console.log('ERROR => ', 'Unable to edit skill!', e);
      }
    },

    async removeSkill({ commit }, deletedSkill) {
      const url = 'http://localhost:4000/skills/delete';
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({id: deletedSkill.id})
      };
      requestOptions.headers['Content-Type'] = 'application/json';

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await handleResponse(response);
        console.log('Response message : ', responseData.message); // CHECK TOKEN

        commit("DELETE_SKILL", deletedSkill);

      } catch (e) {
        console.log('ERROR => ', 'Unable to delete skill!', e);
      }
    },

    async fetchSkills({ commit }) {
      const requestOptions = {
        method: 'GET'
      };

      try {
        const response = await fetch("http://localhost:4000/skills", requestOptions);
        const skills = await handleResponse(response);

        commit("SET_SKILLS", skills);

      } catch (error) {
        console.log('ERROR => ', 'Failed to get skills');
      }

    }
  }
};
