import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/base.css";
import "normalize.css";
import vuex from "@/vuex";
import element from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "@/network";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$url = "http://172.16.99.87:8008/api/";
app.config.globalProperties.$ask = axios;

app.use(element);
app.use(router);
app.use(vuex);

app.mount("#app");