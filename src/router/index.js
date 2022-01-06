import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/join/:roomId", name: "Join", component: Home },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
