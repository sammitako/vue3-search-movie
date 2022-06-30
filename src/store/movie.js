import axios from "axios";
import _uniqBy from "lodash/unionBy";

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
      const { Search, totalResults } = res.data;
      context.commit("updateState", {
        movies: _uniqBy(Search, "imdbID"), // 첫 10개 영화 목록
      });
      const total = parseInt(totalResults, 10);
      const pageLength = Math.ceil(total / 10); // 268 -> 27

      // 데이터 추가 요청
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > number / 10) break;
          const res = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
          );
          const { Search } = res.data;
          context.commit("updateState", {
            movies: [...context.state.movies, ..._uniqBy(Search, "imdbID")], // 첫 10개 영화 목록 + 나중에 추가된 영화 목록
          });
        }
      }
    },
  },
};
