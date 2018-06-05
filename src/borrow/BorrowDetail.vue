<template>
  <div class="header-panel">
        <mt-header fixed title="我的借款">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <div class="mt-input-row">
			    <label>申请时间：</label>
                <span>{{apply_time}}</span>
			</div>
            <div class="mt-input-row">
			    <label>借款编号：</label>
                <span>{{borrow_no}}</span>
			</div>
            <div class="mt-input-row">
			    <label>借款金额：</label>
                <span>{{borrow_amount}}</span>
			</div>
            <div class="mt-input-row">
			    <label>借款期限：</label>
                <span>{{cycle}}</span>
			</div>
            <div class="mt-input-row" style="margin-top:10px;">
			    <label>打款日：</label>
                <span>{{pass_time}}</span>
			</div>
            <div class="mt-input-row">
			    <label>预定还款日：</label>
                <span>{{repay_date}}</span>
			</div>
            <div class="mt-input-row">
			    <label>实际还款日：</label>
                <span>{{real_repay_time}}</span>
			</div>
            <div class="mt-input-row" style="margin-top:10px;">
			    <label>审核费：</label>
                <span>{{shenheFee}}</span>
			</div>
            <div class="mt-input-row">
			    <label>服务费：</label>
                <span>{{serviceFee}}</span>
			</div>
            <div class="mt-input-row">
			    <label>利息：</label>
                <span>{{lixiFee}}</span>
			</div>
            <div class="mt-input-row">
			    <label>到期还款额：</label>
                <span>{{total_repay_amount}}</span>
			</div>
            <div class="mt-input-row">
			    <label>借款状态：</label>
                <span class="color_blue">{{status}}</span>
			</div>
            <router-link :to="url">
                <mt-button @click="cancelBorrow" v-show="showButton" class="small">{{buttons}}</mt-button>
            </router-link>
            
        </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
  export default{
    data:function(){
      return{
        apply_time:'',
        borrow_no:'',
        borrow_amount:'',
        cycle:'',
        pass_time:'',
        repay_date:'',
        real_repay_time:'',
        shenheFee:'',
        serviceFee:'',
        lixiFee:'',
        total_repay_amount:'',
        status:'',
        buttons:'',
        url:'',
        showButton:false
      }
    },
    created:function(){        
      this.borrow_no=this.$route.params.borrowNo;
      this.getBorrowdetail();
    },
    methods:{
        getBorrowdetail(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/detail.do',{borrowNo:this.borrow_no}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    if(resp.data.final_amount=='0.00'){
                        this.borrow_amount=parseFloat(resp.data.audit_amount).toFixed(2)+'元';
                        var benjin=parseFloat(resp.data.audit_amount).toFixed(2);
                    }else{
                        this.borrow_amount=parseFloat(resp.data.final_amount).toFixed(2)+'元';
                        var benjin=parseFloat(resp.data.final_amount).toFixed(2);
                    }
                    if(resp.data.pass_time==null){
                        resp.data.pass_time='----';
                    }
                    if(resp.data.repay_date==null){
                        resp.data.repay_date='----';
                    }
                    if(resp.data.real_repay_time==null){
                        resp.data.real_repay_time='----';
                    }
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
                    this.apply_time=resp.data.apply_time.split(' ')[0];
                    this.cycle=resp.data.cycle_day+'天';

                    this.pass_time=resp.data.pass_time.split(' ')[0];
                    this.repay_date=resp.data.repay_date;
                    this.real_repay_time=resp.data.real_repay_time;

                    var tianshu=resp.data.cycle_day;
                    this.shenheFee='¥'+(shenhe*benjin*tianshu).toFixed(2);
                    this.serviceFee='¥'+(bshouxu*benjin*tianshu).toFixed(2);
                    this.lixiFee='¥'+(lixi*benjin*tianshu).toFixed(2);
                    this.total_repay_amount='¥'+benjin;

                      if(resp.data.status==1||resp.data.status==2){
				        	      this.status="审核中";
                                  this.showButton=true;
                                  this.buttons="取消申请";	
				              }
                      if(resp.data.status==3){
				        	      this.status="待确认";
                                  this.showButton=true;
                                  this.buttons="取消申请";	
				              }
                      if(resp.data.status==4){
				        	      this.status="待放款";
                                  this.showButton=true;
                                  this.buttons="取消申请";	
				              }
                      if(resp.data.status==5){
				        	      this.status="待还款";
                                  this.showButton=true;
                                  this.buttons="去还款";
                                  this.url="/repay";		
				              }
                      if(resp.data.status==6){
				        	      this.status="已还款";	
				              }
                      if(resp.data.status==-1){
				        	      this.status="已取消";	
				              }
                      if(resp.data.status==10||resp.data.status==11){
				        	      this.status="不通过";	
				              }
                }
            })
        },
        cancelBorrow(){
            if(this.buttons=="取消申请"){
                MessageBox.confirm('确认取消本次借款申请?').then(action => {
                    this.$http.post(this.$store.state.host+'/app/uc/borrow/cancel.do',{borrowNo:this.borrow_no}).then(response => {
                        var resp=response.body;
                        Toast(resp.message);
                        if(resp.code==0){
                            setTimeout(() => {
                                this.$router.push('/home'); 
                            },3000) 
                        }
                    })
                });  
            }
            
        }
    }
  }
</script>