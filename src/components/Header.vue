<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <RouterLink class="nav-link" :to="nav.href" active-class="active">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  data() {
    return {
      navigations: [
        {
          name: "Search",
          href: "/",
        },
        {
          name: "Movie",
          href: "/movie/tt4520988",
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
  components: { Logo },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  /* Header 안에 있는 로고 */
  .logo {
    margin-right: 40px;
  }
}
</style>
