<template>
  <div class="header-panel">
        <mt-header title="确认借款" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <div class="mt-input-row">
			    <label>借款金额：</label>
                <span>{{borrow_amount}}</span>
			</div>
            <div class="mt-input-row">
			    <label>借款期限：</label>
                <span>{{cycle_day}}</span>
			</div>
            <div class="mt-input-row">
			    <label>审核费：</label>
                <span>{{shenheFee}}</span>
			</div>
            <div class="mt-input-row">
			    <label>服务费：</label>
                <span>{{borrow_fee_rate}}</span>
			</div>
            <div class="mt-input-row">
			    <label>利息：</label>
                <span>{{interest}}</span>
			</div>
            <div style="font-size:13px;padding:10px 15px 0 15px;">
					<label>
                        <img id="checkbox1" :src="src" @click="changeCheckbox">
                        我同意
						<router-link to="borrowXieyi">
                            <a>《借款协议》</a>
                        </router-link>
					</label>
                    <mt-button class="big" @click="confirm">确认</mt-button>
            </div>
        </div>
  </div>
</template>
<style>
    .mt-input-row span{
        float:right;
    }
</style>
<script>
import { Toast } from 'mint-ui';
  export default{
    data:function(){
      return{
        borrow_amount:'',
        cycle_day:'',
        shenheFee:'',
        borrow_fee_rate:'',
        interest:'',
        src:'../../assets/images/select.png',
        borrowNo:'',
        audit_amount:''
      }
    },
    created:function(){
      this.getBorrowInfo();
    },
    methods:{
        getBorrowInfo(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/info.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    for(var i=0;i<resp.data.feeTypes.length;i++){
                            var code=resp.data.feeTypes[i].code;
                            if(code=="shenhe"){
                                var shenhe=resp.data.feeTypes[i].fee_rate;
                            }else if(code=="lixi"){
                                var lixi=resp.data.feeTypes[i].fee_rate;
                            }else if(code=="fuwu"){
                                var bshouxu=resp.data.feeTypes[i].fee_rate;
                            }
                    }
                    var tianshu=resp.data.cycle_day;
                    this.borrow_amount=resp.data.audit_amount+'元';
                    this.cycle_day=resp.data.cycle_day+'天';
                    this.borrowNo=resp.data.borrow_no;
                    this.audit_amount=resp.data.audit_amount;
                    this.shenheFee=(shenhe*this.audit_amount*tianshu).toFixed(2)+'元';
                    this.borrow_fee_rate=(bshouxu*this.audit_amount*tianshu).toFixed(2)+'元';
                    this.interest=(lixi*this.audit_amount*tianshu).toFixed(2)+'元';
                }
            })
        },
        changeCheckbox(){
            if(this.src=="../../assets/images/select.png"){
                this.src="../../assets/images/select1.png"
            }else{
                this.src="../../assets/images/select.png"
            }
        },
        confirm(){
            var params = {};
			params['borrowNo']=this.borrowNo;
			params['finalAmount']=this.audit_amount;
            if(this.src=='../../assets/images/select.png'){
                Toast('请同意');
                return false;
            }
            this.$http.post(this.$store.state.host+'/app/uc/borrow/confirm.do',params).then(response => {
                var resp=response.body;
                Toast(resp.message);
                if(resp.code==0){
                    this.$router.push('/borrowPath');
                    
                }
            })
        }
    }
  }
</script>