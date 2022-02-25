import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from "vue-3-socket.io";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(
    new VueSocketIO({
      debug: process.env.VUE_APP_DEBUG === "true",
      connection: `http://${window.location.hostname}:${process.env.VUE_APP_SERVER_PORT}`,
    })
  )
  .mount("#app");
