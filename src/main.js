import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import MainPage from "./components/MainPage";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
    {path: '/', component: MainPage},
];

const router = new VueRouter({routes});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
