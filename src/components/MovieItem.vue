<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie"
  >
    <!-- <img :src="movie.Poster" alt="" width="200" /> -->
    <Loader v-if="imageLoading" :size="1.5" absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
        <div class="title">
          {{ movie.Title }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from "~/components/Loader";
export default {
  components: {
    Loader,
  },
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      imageLoading: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 영화 포스터가 없는 경우 예외 처리
      const poster = this.movie.Poster;
      if (!poster || poster === "N/A") {
        this.imageLoading = false;
      } else {
        await this.$loadImage(poster);
        this.imageLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import "~/scss/main"; */
.movie {
  $width: 200px;
  width: $width;
  height: calc($width * 3 / 2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, 0.3);
    width: 100%;
    padding: 14px; // height 용도
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
