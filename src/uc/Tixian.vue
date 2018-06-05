<template>
  <div class="header-panel">
        <mt-header fixed title="提现">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <router-link to="tixianRecord" slot="right">
                <mt-button style="background: none;width:100%;">记录</mt-button>
            </router-link>
        </mt-header>
        <div class="mt-content" style="margin-top:30px;">
            <div class="mt-input-row" style="color:#000;">
				<label style="font-size:16px;">账户余额</label>
				<span style="display:inline-block;padding-right: 20px;">{{yue}}</span>元
			</div>
            <mt-field label="提现金额" placeholder="请输入提现金额（元）" type="text" v-model="jine"></mt-field>
            <mt-button class="small" style="border-radius:0;margin-top:50px;" @click="withdraw">提交</mt-button>
        </div>
  </div>
</template>
<style>
    #yue .mint-field-other{
        width:70%;
        color:#000;
    }
    .mt-input-row label{
        text-align:left;
    }
</style>
<script>
import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                yue:'',
                jine:''
            }
        },
        created:function(){
            this.getTixian();
        },
        methods:{
            getTixian(){
                this.$http.post(this.$store.state.host+'/app/uc/member/detail.do',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.yue=resp.data.commission;
                    }else{
                        Toast(resp.message);
                    }
                })
            },
            withdraw(){
                if(this.jine==''){
                    Toast('请填写提现金额');
                    return false;
                }
                this.$http.post(this.$store.state.host+'/app/uc/commission/withdraw',{amount:this.jine}).then(response => {
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

