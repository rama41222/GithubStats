const state = () => ({
  user: null,
  stats: []
});

const getters = {
  getUser: state => {
    return state.user
  },
  getStats: state => {
    return state.stats
  }
};

const mutations = {
  setUser: function (state, user) {
    state.user = user
  },
  setStats: function (state, stats) {
    state.stats = stats
  }
};

const actions = {
  async fetchUser({commit}, accessToken) {
    try {
      let { user } = await this.$axios.$get(`http://localhost:3001/me?access_token=${accessToken}`);
      commit('setUser', user);
      this.$auth.setUser(user);
      this.$router.push('/dashboard')
    } catch (e) {
      errorHandler(this, e)
    }
  },
  async fetchLanguages({commit}, accessToken) {
    try {
      let stats = await this.$axios.$get(`http://localhost:3001/languages?access_token=${accessToken}`);
      commit('setStats', stats);
    } catch (e) {
      errorHandler(this, e)
    }
  },
};

const errorHandler = (co, e) => {
  co.$toast.show(e.response.data.errorMessage, {icon: "error", duration: 5000})
};

export default {
  state,
  actions,
  mutations,
  getters
}
