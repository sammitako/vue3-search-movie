<template>
  <div class="container">
    <!-- 스켈레톤 -->
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader :size="3" :z-index="9" fixed />
    </template>
    <!-- 상세 영화 데이터 -->
    <div v-else class="movie-details">
      <div class="poster"></div>
      <div class="specs"></div>
      <div class="title">
        {{ theMovie.Title }}
      </div>
      <div class="labels">
        <span>{{ theMovie.Released }}</span>
        <span>{{ theMovie.Runtime }}</span>
        <span>{{ theMovie.Country }}</span>
      </div>
      <div class="plot">
        {{ theMovie.Plot }}
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "~/components/Loader";
export default {
  components: {
    Loader,
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie;
    },
    loading() {
      return this.$store.state.movie.loading;
  },
  created() {
    this.$store.dispatch("movie/searchMovieWithId", {
      id: this.$route.params.id,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;

  .poster {
    /* 감소 너비 사용 안함 */
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs {
    /* Flex는 가로 너비를 최대한 적게 사용하려 하므로  */
    /* 아래의 코드를 통해 최대한 많은 증가 너비를 사용 */
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
</style>
