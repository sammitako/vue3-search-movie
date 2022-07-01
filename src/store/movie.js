import axios from "axios";
import _uniqBy from "lodash/unionBy";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: "Search for the movie title!",
    loading: false,
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
      // 유저가 Apply 버튼을 계속 눌러서 _featchMovie가 계속 실행되는 상황
      if (context.state.loading) return;

      // 검색 시작
      context.commit("updateState", {
        message: "",
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        const { Search, totalResults } = res.data;
        context.commit("updateState", {
          movies: _uniqBy(Search, "imdbID"), // 첫 10개 영화 목록
        });
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10); // 268 -> 27

        // 데이터 추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            context.commit("updateState", {
              movies: [...context.state.movies, ..._uniqBy(Search, "imdbID")], // 첫 10개 영화 목록 + 나중에 추가된 영화 목록
            });
          }
        }
      } catch (message) {
        context.commit("updateState", {
          movies: [], // 이미 출력된 영화가 있을 경우, 초기화
          message,
        });
      } finally {
        context.commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

function _fetchMovie(payload) {
  const { title, type, year, page } = payload;
  const OMDB_API_KEY = "1763cb00";
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
