import Vue from 'vue';
import App from './App.vue';
import routes from './config/routes.js';
import VueRouter from 'vue-router';
import store from './config/store.js';
import { MessageBox } from 'mint-ui';

import VueResource from 'vue-resource';


Vue.use(VueRouter);

Vue.use(VueResource);

Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=utf-8'
};


const router = new VueRouter({
    mode: 'hash',
    routes
});

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    methods: {
        init: function() {
            /*if(this.$store.state.member != null){
              //router.push('/home');
              this.$router.push('/');
            }*/
            Vue.http.interceptors.push((request, next) => {
                request.method = 'POST';　　
                next((response) => {
                    if (response.body.code == '4000') {
                        MessageBox.alert('登录失效,请重新登录', '').then(action => {
                            router.push('/login');
                        });
                        return false;
                    }
                    if (response.body.code == '502') {
                        Toast('网络异常,请检查网络');
                    }　　　　
                    return response;
                })
            });
        }
    },
    created: function() {
        this.init();
    }
});
window.g = { app, router };