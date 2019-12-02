import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import MainPage from "./components/MainPage";
import {MdButton, MdToolbar, MdIcon, MdTooltip, MdCard, MdField} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import './assets/css/google-fonts.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MdButton);
Vue.use(MdToolbar);
Vue.use(MdIcon);
Vue.use(MdTooltip);
Vue.use(MdCard);
Vue.use(MdField);

const routes = [
    {path: '/', component: MainPage},
];

const router = new VueRouter({routes});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
