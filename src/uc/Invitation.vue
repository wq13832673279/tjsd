<template>
  <div class="header-panel">
        <mt-header title="邀请好友" fixed style="">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content" style="background:#fff;">
            <div class="invitation-top">
                <img width=100% src="../../assets/images/invitation_bg.png">
                <div style="text-align:center">
                    已成功邀请
                    <span class="color_red">{{memberSum}}位</span>好友赚取
                    <span class="color_red">{{commissionSum}}元</span>佣金
                </div>
            </div>
            <div class="hdgz">
                <div class="hdgz-title">
                    <span></span>
                    <label style="width:74px;">活动规则</label>
                    <span></span>
                </div>
                <div class="hdgz-content">
                    <p>1.注册用户邀请好友，成功注册并贷款即可获得丰厚奖励</p>
                    <p>2.好友成功注册还可获得贷款优惠券，贷款立即可用</p>
                </div>
            </div>
            <mt-button class="small" style="margin-top:30px;" @click="invitationRegister">邀请好友</mt-button>
        </div>
  </div>
</template>
<style>
    .invitation-top{
        background:#fff;
    }
    .hdgz label{
      width:100%;
    }
</style>
<script>
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            commissionSum:'',
            memberSum:''
        }
    },
    created:function(){
        this.init();
        this.getDetail();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        getDetail(){
            this.$http.post(this.$store.state.host+'/app/uc/promotion',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.commissionSum=parseInt(resp.data.summary.commissionSum);
                    this.memberSum=resp.data.summary.memberSum;
                }else{
                    Toast(resp.message);
                }
                
            })
        },
        invitationRegister(){
            location.href="http://wap.xindai.tjsudai.com/invitation-register.html";
        }
    }
}


</script>