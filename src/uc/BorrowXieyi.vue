<template>
  <div class="header-panel">
        <mt-header fixed title="借款服务协议">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content" style="font-size:14px;" v-html="content">
            
        </div>
  </div>
</template>
<style>
    
</style>
<script>
export default {
    data(){
        return {
            content:null
        }
    },
    created:function(){
        this.borrowXieyi();
    },
    methods:{
        borrowXieyi(){
            this.$http.post(this.$store.state.host+'/app/content/borrow.do',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.content=resp.data.context;
                    }else{
                        Toast(resp.message);
                    }
            })
        }
    }
}
</script>