<template>
  <div class="header-panel">
        <mt-header fixed title="帮助中心">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <div class="mt-content" style="font-size:14px;" v-html="content">

            </div>
        </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return{
        type:'',
        content:''
      }
    },
    created:function(){
      this.type=this.$route.params.type;
      this.getHelpDetail();
    },
    methods:{
      getHelpDetail(){
        this.$http.post(this.$store.state.host+'/app/content/question',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.content=resp.data[this.type].answer;
                    }else{
                        
                    }
        })
      }
    }

}
</script>