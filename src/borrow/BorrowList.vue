<template>
  <div class="header-panel">
        <mt-header fixed title="我的借款">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
          <ul>
            <li style="background:#fff;font-size:12px;margin-bottom:10px;" v-for="tab in tabs" v-show="showBorrow">
             <router-link :to="tab.href">
                <div class='loan_title'>
                  <div style="width:70%;float:left;">
                    <span style="font-size:15px;">编号：</span>
                    <label>{{tab.borrowNo}}</label>
                  </div>
                  <div style="width:30%;float:left;text-align:right;">
                    <label>{{tab.date}}</label>
                  </div>
                </div>
                <div class='loan_content'>
                  <div class='mt-col-4'>
                    金 额
                    <p>{{tab.jine}}</p>
                  </div>
                  <div class='mt-col-4'>
                    期 限
                    <p>{{tab.qixian}}</p>
                  </div>
                  <div class='mt-col-4'>
                    状 态
                    <p>{{tab.status}}</p>
                  </div>
                </div>
             </router-link>
            </li>
          </ul>
        </div>
  </div>
</template>
<style>
  .mint-header-title{
    color:#000;
  }
  .mint-cell-label {
    margin-left:0;
  }
  .loan_title{
    line-height:24px;
    padding:0 5px;
    height:30px;
    border-bottom:1px solid #eee;
  }
  .loan_title label{
    color:#bbb;
  }
  .loan_content{
    height:60px;
    color:#bbb;
  }
  .loan_content .mt-col-4{
    float:left;
    width:33%;
    text-align:center;
    padding:10px 0;
  }
  .loan_content p{
    color:#000;
    line-height:30px;
  }
</style>
<script>
import { Toast } from 'mint-ui';
  export default{
    data:function(){
      return{
        tabs:[
        ],
        showBorrow:false
        
      }
    },
    created:function(){
      this.init();
      this.getBorrowAll();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        getBorrowAll(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/all.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                  if(resp.data.length!=0){
                    this.showBorrow=true;
                    for(var i=0;i<resp.data.length;i++){
                      var arr={};
                      if(resp.data[i].final_amount=='0.00'){
                        arr.jine=parseFloat(resp.data[i].audit_amount).toFixed(2)+'元';
                      }else{
                        arr.jine=parseFloat(resp.data[i].final_amount).toFixed(2)+'元';
                      }
                      //console.log(resp.data[i].borrow_no);
                      arr.borrowNo=resp.data[i].borrow_no;
                      arr.date=(resp.data[i].apply_time).split(' ')[0];
                      arr.href="/borrowDetail/borrowNo/"+resp.data[i].borrow_no;
                      arr.qixian=resp.data[i].cycle+'天';
                      if(resp.data[i].status==1||resp.data[i].status==2){
				        	      var status="审核中";	
				              }
                      if(resp.data[i].status==3){
				        	      var status="待确认";	
				              }
                      if(resp.data[i].status==4){
				        	      var status="待放款";	
				              }
                      if(resp.data[i].status==5){
				        	      var status="待还款";	
				              }
                      if(resp.data[i].status==6){
				        	      var status="已还款";	
				              }
                      if(resp.data[i].status==-1){
				        	      var status="已取消";	
				              }
                      if(resp.data[i].status==10||resp.data[i].status==11){
				        	      var status="不通过";	
				              }
                      arr.status=status;
                      this.tabs.push(arr);
                    }
                  }else{
                    Toast('暂无借款记录');
                  }
                  
                }else{
                  Toast(resp.message);
                }
            })
        }
    }
}
</script>