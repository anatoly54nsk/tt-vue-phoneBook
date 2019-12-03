import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import MainPage from "./components/MainPage";
import {MdButton, MdToolbar, MdIcon, MdTooltip, MdCard, MdField, MdProgress} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import './assets/css/google-fonts.css';
import EditPage from "./components/EditPage";

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

Vue.use(VueRouter);
Vue.use(MdButton);
Vue.use(MdToolbar);
Vue.use(MdIcon);
Vue.use(MdTooltip);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdProgress);

const routes = [
    {path: '/', component: MainPage},
    {path: '/add', component: EditPage},
    {path: '/edit/:id', component: EditPage},
];

const router = new VueRouter({routes});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
