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
    <div class="user" @click="toAbout">
      <img :src="image" :alt="name" />
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
  computed: {
    image() {
      return this.$store.state.about.image;
    },
    name() {
      return this.$store.state.about.name;
    },
  },
  methods: {
    isMatch(path) {
      if (!path) return false; // Search, About
      return path.test(this.$route.fullPath); // 정규표현식과 fullPath가 일치하는 지 확인
    },
    toAbout() {
      this.$router.push("/about");
    },
  },
  components: { Logo },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  /* Header 안에 있는 로고 */
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    overflow: hidden;
    border: 3px solid $gray-200;
    /* 수직 가운데 */
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    transition: 0.4s;
    right: 40px;
    &:hover {
      border: 3px solid darken($gray-200, 10%);
    }
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>
