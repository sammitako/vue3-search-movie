<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <RouterLink
          class="nav-link"
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
        >
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
          path: /^\/movie/, // '/movie'로 시작
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
  methods: {
    isMatch(path) {
      if (!path) return false; // Search, About
      return path.test(this.$route.fullPath); // 정규표현식과 fullPath가 일치하는 지 확인
    },
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
