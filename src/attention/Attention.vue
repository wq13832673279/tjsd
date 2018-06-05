<template>
  <div class="header-panel">
        <mt-header fixed title="认证中心">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <p class="p_tip1">基础认证<span class="color_red">必填</span></p>
				
                        <mt-cell title="身份认证" label="请根据要求完善身份认证" :to="identityPage" :value="id" is-link>
                            <img id="identity" slot="icon" :src="idn">
                            
                        </mt-cell>
                  
                        <mt-cell title="个人信息" label="请根据要求完善个人信息" :to="personInfo" :value="person" is-link>
                            <img id="person" slot="icon" :src="personn">
                            
                        </mt-cell>
                  
                        <mt-cell title="手机认证" label="请根据要求完善手机认证" :to="mobileHref" :value="mobile" is-link>
                            <img id="mobile" slot="icon" :src="mobilen">
                            
                        </mt-cell>
                   
                        <mt-cell title="银行卡认证" label="银行卡认证有助于提升额度" :to="bindBankCard" :value="bankcard" is-link>
                            <img id="bankcard" slot="icon" :src="bankcardn">
                            
                        </mt-cell>
        </div>
  </div>
</template>
<style>
    .mint-cell-title{
        line-height:10px;
    }
    .mint-cell img{
        float:left;
    }
    .mint-cell-value{
        color:#FC5D22;
    }
</style>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            id:'',
            face:'',
            person:'',
            mobile:'',
            bankcard:'',
            idn:'',
            personn:'',
            mobilen:'',
            bankcardn:'',
            identityPage:'',
            personInfo:'',
            mobileHref:'',
            bindBankCard:''
        }
    },
    created:function(){
        this.init();
        this.authUrl();
        this.checkList(); 
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=true;
        },
        authUrl(){
            this.$http.post(this.$store.state.host+'/app/uc/auth/url',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.mobileHref=resp.data.carrier+'&returnUrl=http://weixin.tjsudai.com/#/attention';
                    }
            })
        },
        checkList(){
            this.$http.post(this.$store.state.host+'/app/uc/auth/list',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        if(resp.data.real_name==0){
                            this.identityPage='identityPage';
                            this.id="未完善";
                            this.idn="../../assets/images/idn.png";
                            Toast('请先进行身份认证');
                        }else{
                            this.id="已完成";
                            this.idn="../../assets/images/idy.png";
                            document.querySelectorAll("a.mint-cell")[0].removeAttribute('href');
                            document.querySelectorAll("div.mint-cell-value")[0].style.color='#888';
                        }
                        if(resp.data.detail==0){
                            this.personInfo='personInfo'
                            this.person="未完善";
                            this.personn="../../assets/images/personn.png";
                        }else{
                            this.person="已完成";
                            this.personn="../../assets/images/persony.png";
                            document.querySelectorAll("a.mint-cell")[1].removeAttribute('href');
                            document.querySelectorAll("div.mint-cell-value")[1].style.color='#888';
                        }
                        if(resp.data.carrier==0){
                            this.mobile="未完善";
                            this.mobilen="../../assets/images/mobilen.png";
                        }else{
                            this.mobile="已完成";
                            this.mobilen="../../assets/images/mobiley.png";
                            document.querySelectorAll("a.mint-cell")[2].removeAttribute('href');
                            document.querySelectorAll("div.mint-cell-value")[2].style.color='#888';
                        }
                        if(resp.data.bank_card==0){
                            this.bindBankCard='myBankCard';
                            this.bankcard="未完善";
                            this.bankcardn="../../assets/images/bankcardn.png";
                        }else{
                            this.bindBankCard='myBankcard';
                            this.bankcard="已完成";
                            this.bankcardn="../../assets/images/bankcardy.png";
                            document.querySelectorAll("div.mint-cell-value")[3].style.color='#888';
                        }
                    }
                    
            })
        }
    }
}
</script>