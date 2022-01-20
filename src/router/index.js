import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";
import Game from "../views/Game.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/join/:roomId", name: "Join", component: Lobby },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
