<template>
  <div class="header-panel">
        <mt-header fixed title="提现记录">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content" style="margin-top:30px;">
          <mt-cell v-show="showTixian" :title="tab.jine" :label="tab.date" :value="tab.status" v-for="tab in tabs" is-link>
            
          </mt-cell>
        </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
  export default{
    data:function(){
      return{
        tabs:[
          {jine:'',date:'',status:''},
          {jine:'',date:'',status:''}
        ],
        showTixian:''
        
      }
    },
    created:function(){
      this.getTixianRecord();
    },
    methods:{
        getTixianRecord(){
            this.$http.post(this.$store.state.host+'/app/uc/commission/withdraw/history',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                  if(resp.data.length!=0){
                    this.showTixian=true;
                    for(var i=0;i<resp.data.length;i++){
                      this.tabs[i].jine='-'+resp.data[i].amount;  
                      this.tabs[i].date=(resp.data[i].create_time).split(' ')[0];
                    }
                    for(var j=0;j<resp.data.length;j++){
                      if(resp.data[j].status=='0'){
                        this.tabs[j].status='审核中';
                      }
                      if(resp.data[j].status=='1'){
                        this.tabs[j].status='转账中';
                      }
                      if(resp.data[j].status=='2'){
                        this.tabs[j].status='已完成';
                      }
                      if(resp.data[j].status=='-1'){
                        this.tabs[j].status='失败';
                      }
                    }
                  }else{
                    this.showTixian=false;
                    Toast('暂无提现记录');
                  }
                  
                }else{
                  Toast(resp.message);
                }
            })
        }
    }
}
</script>