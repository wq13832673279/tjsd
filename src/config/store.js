import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

    state:{
        member:{
        },
        isShowTabbar:false,
        host:'http://tjsudai.com',
    },
    mutations:{
        /*setMember(state,member){
            state.member = member;
        },*/
        token (){
            return localStorage.getItem("TOKEN");
        },
        setToken(token){
            localStorage.setItem('TOKEN',token);
        },
        setMember(member){
            localStorage.setItem('MEMBER',JSON.stringify(member));
        },
        getMember(){
            var memberJson = localStorage.getItem("MEMBER");
            return memberJson?JSON.parse(memberJson):null;
        },
        showTabbar:function(state){
            state.isShowTabbar = true;
        },
        hideTabbar:function(state){
            state.isShowTabbar = false;
        }
    },
    getters:{
        getTabbarStatus(state){
            return state.isShowTabbar;
        },
        getMember(state){
            return state.member;
        }
    }
});