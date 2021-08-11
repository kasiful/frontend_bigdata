import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Kompetisi from "../views/Kompetisi.vue";
import About from "../views/About.vue";
import Dashboard from "../views/Dashboard.vue";
import Article from "../views/Article.vue";
import Publication from "../views/Publication.vue";
import Paper from "../views/Paper.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/kompetisi",
    name: "Kompetisi",
    component: Kompetisi,
  },
  {
    path: "/article",
    name: "Article",
    component: Article,
  },
  {
    path: "/publication",
    name: "Publikasi",
    component: Publication,
  },
  {
    path: "/paper",
    name: "Paper",
    component: Paper,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
