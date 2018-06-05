<template>
  <div class="header-panel">
        <mt-header fixed title="平台反馈">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content" style="padding:59px 15px 0 15px;">
            <mt-field placeholder="请提出您的宝贵意见，有助于我们做的更好..." type="textarea" rows="8" :value="opinion"></mt-field>
            <mt-button class="big" @click="postOpinion">提交</mt-button>
        </div>
  </div>
</template>
<style>
    .mint-header-title{
        color:#000;
    }
</style>
<script>
import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                opinion:''
            }
        },
        created:function(){
            this.init();
        },
        methods:{
            init(){
                this.$store.state.isShowTabbar=false;
            },
            postOpinion(){
                this.$http.post(this.$store.state.host+'/app/content/opinion.do',{opinion:this.opinion}).then(response => {
                    var resp=response.body;
                    Toast(resp.message);
                    if(resp.code==0){
                        this.$router.push('/home');
                        
                    }
                })
            }
        }
    }
</script>