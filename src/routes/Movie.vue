<template>
  <div>MOVIE!!</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("movie/searchMovieWithId", {
      id: this.$route.params.id,
    });
  },
};
</script>

<style lang="scss" scoped></style>
