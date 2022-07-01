import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import Movie from "./Movie";
import About from "./About";

export default createRouter({
  // Hash, History 모드
  // Hash 모드 -> https://google.com/#/search
  history: createWebHashHistory(),
  // pages
  // path: https://google.com/ -> 메인 페이지
  // component: '/' 뒤에 연결할 컴포넌트
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/movie/:id",
      component: Movie,
    },
  ],
});
