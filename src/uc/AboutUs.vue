<template>
  <div class="header-panel">
        <mt-header fixed title="关于我们">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <div class="aboutUs-top">
                <img src="../../assets/images/aboutUs_Logo.png">
                <h4>{{ABOUT_NAME}}</h4>
            </div>
            <p style="padding:0 10px 10px 10px;font-size:13px;background:#fff;">{{ABOUT_DESC}}</p>
            <div style="margin-top:10px;height:25px;line-height:25px;padding:0 10px;background:#fff;">
                <label style="float:left;text-align:left;">版本信息</label><span style="font-size: 13px;float:right">V1.0</span>
            </div>
            <div style="position: fixed;width:100%;bottom:20px;color:#8c8c8c;font-size: 14px;text-align:center;">{{ABOUT_COPYRIGHT}}</div>
        </div>
  </div>
</template>
<style>
    .aboutUs-top{
        padding:40px 0;
        text-align:center;
        background:#fff;
    }
    .aboutUs-top img{
        width:70px;
    }
</style>
<script>
import { Toast } from 'mint-ui';
  export default{
    data:function(){
      return{
        ABOUT_NAME:'',
        ABOUT_DESC:'',
        ABOUT_COPYRIGHT:''
        
      }
    },
    created:function(){
      this.getAboutUs();
    },
    methods:{
        getAboutUs(){
            this.$http.post(this.$store.state.host+'/app/uc/about-us',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.ABOUT_NAME=resp.data.ABOUT_NAME;
                    this.ABOUT_DESC=resp.data.ABOUT_DESC;
                    this.ABOUT_COPYRIGHT=resp.data.ABOUT_COPYRIGHT
                }
            })
        }
    }
}
</script>