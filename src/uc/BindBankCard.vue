<template>
  <div class="header-panel">
        <mt-header fixed title="添加银行卡">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
          <form class="" :action="action" method="get">
            <input type="hidden" name="uid" :value="uid"/>
            <input type="hidden" name="returnUrl" :value="returnUrl"/>
            <input type="hidden" name="bankCode" :value="bankCode">
            <input type="hidden" name="bankName" :value="bankName"/>
            <input type="hidden" name="cardNo" :value="cardNo"/>
              <div class="mt-input-row" @click="showModal">
                <label style="font-size:16px;">开户行</label>
                <span style="display:inline-block;width:80px;">{{bankName}}</span>
                <img src="../../assets/images/xiala.png" style="height:15px;float:right;padding-top:15px;">
              </div>
              <mt-field label="银行卡号" placeholder="请输入银行卡号" type="text" v-model="cardNo"></mt-field>
              <div @click="hideModal" id="hideAnniu" style="display:none;position:fixed;z-index:1000;background:#eee;bottom:150px;right:20px;">确定</div>
              <mt-picker id="modal" style="display:none;position:fixed;width:100%;bottom:0;z-index:999;background:#eee;" :slots="slots" @change="onValuesChange"></mt-picker>
              <button style="background:#FE5A59;color:#fff;border:0;border-radius:25px;height:41px;width:90%;margin:100px 5% 0 5%;" type="submit">提 交</button>
          </form>
        </div>
  </div>
</template>
<style>
.picker.active {
	-webkit-transform: translateY(0px);
}
.mint-cell{
    min-height:48px;
}
</style>
<script>
import { Toast } from 'mint-ui';
export default {
   data() {
    return {
        action:'',
        uid:'',
        returnUrl:'',
        bankCode:'',
        bankName:'',
        cardNo:'',
        slots: [
        {
          flex: 1,
          values: [

          ],
          className: 'slots',
        }
        ],
    }
  },
  created:function(){
    this.getBankDetail();
    this.bindBank();
  },
  methods: {
    onValuesChange(picker,values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1,values[0]);
      }
      var bankName=picker.getValues()[0];
      this.bankName=bankName;
      switch(this.bankName){
        case '中国农业银行':
          this.bankCode="ABC";
          break;
        case '中国银行':
          this.bankCode="BOC";
          break;
        case '上海银行':
          this.bankCode="BOS";
          break;
        case '渤海银行':
          this.bankCode="CBHB";
          break;
        case '中国建设银行':
          this.bankCode="CCB";
          break;
        case '中国光大银行':
          this.bankCode="CEB";
          break;
        case '兴业银行':
          this.bankCode="CIB";
          break;
        case '中信银行':
          this.bankCode="CITIC";
          break;
        case '招商银行':
          this.bankCode="CMB";
          break;
        case '中国民生银行':
          this.bankCode="CMBC";
          break;
        case '交通银行':
          this.bankCode="COMM";
          break;
        case '城市商业银行':
          this.bankCode="CSCB";
          break;
        case '浙商银行':
          this.bankCode="CZB";
          break;
        case '浙江稠州商业银行':
          this.bankCode="CZCB";
          break;
        case '恒丰银行':
          this.bankCode="EGBANK";
          break;
        case '广东发展银行':
          this.bankCode="GDB";
          break;
        case '广州市农信社':
          this.bankCode="GNXS";
          break;
        case '广州市商业银行':
          this.bankCode="GZCB";
          break;
        case '杭州银行':
          this.bankCode="HCCB";
          break;
        case '城市商业银行':
          this.bankCode="HKBCHINA";
          break;
        case '东亚银行':
          this.bankCode="HKBEA";
          break;
        case '徽商银行':
          this.bankCode="HSBANK";
          break;
        case '华夏银行':
          this.bankCode="HXB";
          break;
      }
    },
    showModal(){
      document.getElementById('modal').style.display="block";
      document.getElementById('hideAnniu').style.display="block";
    },
    hideModal(){
      document.getElementById('modal').style.display="none";
      document.getElementById('hideAnniu').style.display="none";
    },
    getBankDetail(){
      this.$http.post(this.$store.state.host+'/vendor/payment/bank',{}).then(response => {
          var resp=response.body;
          if(resp.code==0){
            for(var i=0;i<resp.data.length;i++){
              var arr={};
              arr=resp.data[i].bankName;
              this.slots[0].values.push(arr);
              
            }
          }
      })
    },
    bindBank(){
      this.action=this.$store.state.host+'/vendor/payment/auth';
      this.uid=JSON.parse(localStorage.getItem("MEMBER")).id;
      
      this.bankCode=this.bankCode;
      this.returnUrl='http://weixin.tjsudai.com/#/attention';
    }

  }
 
}
</script>