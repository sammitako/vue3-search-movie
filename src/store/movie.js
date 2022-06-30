import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
  }),
  getters: {
    // moivesIds(state) {
    //   return state.movies.map((m) => m.imdbID);
    // },
  },
  mutations: {
    // 통합적인  변이 메소드
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  actions: {
    async searchMovies(context, payload) {
      const { title, type, number, year } = payload;
      const OMDB_API_KEY = "1763cb00";
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );
      console.log(res);

      const { Search, totalResults } = res.data;
      context.commit("updateState", {
        movies: Search,
      });
    },
  },
};
