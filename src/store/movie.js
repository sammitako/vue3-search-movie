import axios from "axios";

export default {
  
  namespaced: true,
  state: () => ({
    movies: [],
  }),
  getters: {
    moivesIds(state) {
      return state.movies.map((m) => m.imdbID);
    },
  },
  mutations: {
    resetMovies(state) {
      state.movies = [];
    },
  },
  actions: {
    searchMovies() {
       const OMDB_API_KEY = "1763cb00";
       const res = await axios.get(
         `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`
       );
    },
  },
};
