<template>
  <div class="container">
    <div class="inner">
      <MovieItem />
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem";
export default {
  components: {
    MovieItem,
  },
  data() {
    return {
      movies: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
