<template>
  <div class="header-panel">
        <mt-header fixed title="银行卡认证">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <mt-cell-swipe v-show="showBankDetail" :title="bankName" :label="cardNo" value="解除绑定" :right="[{content: '解除绑定',style: { background: 'red', color: '#fff' },handler: () => unbindBankcard()}]">
                <img id="identity" slot="icon" :src="bankIcon">
            </mt-cell-swipe>
            <div style="background:#fff;">
			    <p style="text-align:center;height:60px;line-height:60px" @click="bindBankcard">
                    <img style="vertical-align:middle;height:20px;" src="../../assets/images/add.png">添加银行卡
                </p>	
		    </div>
        </div>
  </div>
</template>
<style>
    .mint-cell-value{
        color:#FC5D22;
    }
</style>
<script>
import App from '../App.vue';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {
            bankName:'',
            cardNo:'',
            bankIcon:'',
            showBankDetail:false
        }
    },
    created:function(){
        this.init();
        this.getBankDetail();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        getBankDetail(){
            this.$http.post(this.$store.state.host+'/app/uc/bankcard/detail.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.showBankDetail=true;
                    this.bankIcon='http://xindai.shihuidai.cn'+resp.data.logo;
                    this.bankName=resp.data.bankName+'-储蓄卡';
                    this.cardNo=resp.data.cardNo.substring(0,4)+'********'+resp.data.cardNo.substring(15,19);
                }else{
                    this.showBankDetail=false;
                    
                }
                
            })
        },
        bindBankcard(){
            if(this.showBankDetail==true){
                Toast('请先解绑原有银行卡');
            }else{
                this.$router.push('/bindBankcard');
            }  
        },
        unbindBankcard(){
            MessageBox.confirm('是否确认解绑该银行卡?').then(action => {
                this.$http.post(this.$store.state.host+'/app/uc/unbind/card.do',{}).then(response => {
                    var resp=response.body;
                    Toast(resp.message);
                    if(resp.code==0){
                        this.showBankDetail=false;
                    }
                })
            })
        }
    }
    
}
</script>
