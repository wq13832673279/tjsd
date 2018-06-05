<template>
   <div class="header-panel">
        <mt-header fixed title="天际速贷">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <router-link to="news" slot="right">
                <mt-button></mt-button>
            </router-link>
        </mt-header>
        <div class="mt-content" style="margin:0 0 70px 0">
            <div @click="applyBorrow1" class="mt-slider" style="background:url(/assets/images/borrow-bg1.png) no-repeat;background-size:cover;">
                <img class="jiekuan_icon" src="../../assets/images/icon.png"></img>
                <div class="jiekuan_title">一键下款</div>
                <div class="jiekuan_edu">¥<span>{{edu1}}</span></div>
                <div class="xyed">
                    信用额度
                </div>
                <p class="jiekuan_bottom">信用借款极速到账
                    <span>立即借款></span>
                </p>
            </div>
            <div @click="applyBorrow2" class="mt-slider" style="background:url(/assets/images/borrow-bg2.png) no-repeat;background-size:cover;">
                <img class="jiekuan_icon" src="../../assets/images/icon.png"></img>
                <div class="jiekuan_title">一键下款</div>
                <div class="jiekuan_edu">¥<span>{{edu2}}</span></div>
                <div class="xyed">
                    信用额度
                </div>
                <p class="jiekuan_bottom">信用借款极速到账
                    <span>立即借款></span>
                </p>
            </div>
            <div @click="applyBorrow3" class="mt-slider" style="background:url(/assets/images/borrow-bg3.png) no-repeat;background-size:cover;">
                <img class="jiekuan_icon" src="../../assets/images/icon.png"></img>
                <div class="jiekuan_title">一键下款</div>
                <div class="jiekuan_edu">¥<span>{{edu3}}</span></div>
                <div class="xyed">
                    信用额度
                </div>
                <p class="jiekuan_bottom">信用借款极速到账
                    <span>立即借款></span>
                </p>
            </div>  
        </div>
    </div>
</template>
<style>
.mint-header-button.is-right .mint-button{
    background: url(../../assets/images/message.png) center  no-repeat;
	background-size: cover;
	height: 20px;
    width: 20px;
}
</style>
<script>
import Vue from 'vue';
import Mint from 'mint-ui';

import { Range } from 'mint-ui';
Vue.component(Range.name, Range);

Vue.use(Mint);
export default {
    name:'borrow',
    data(){
        return {
            tabActivedId: 'tab-index',
            min_amount:'',
            max_amount:'',
            edu1:'1000',
            edu2:'2000',
            edu3:'3000',
            Lists:[
            ],
            changeActive:0,
        }
    },
    created:function(){
        this.init();
        this.beforeApply();
        this.actives(this.changeActive);
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=true;
        },
        actives:function(index){
            this.changeActive = index;
        },
        beforeApply(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/member/limit.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.min_amount=parseInt(resp.data.min_amount);
                    this.max_amount=parseInt(resp.data.max_amount);
                    for(var i=0;i<resp.data.cycle.length;i++){
                        var arr={};
                        arr.text=resp.data.cycle[i];
                        this.Lists.push(arr);
                    }
                }
            })
        },
        applyBorrow1(){
            this.$router.push("borrowApply?benjin="+this.edu1);
        },
        applyBorrow2(){
            this.$router.push("borrowApply?benjin="+this.edu2);
        },
        applyBorrow3(){
            this.$router.push("borrowApply?benjin="+this.edu3);
        },
    }
}
</script>
