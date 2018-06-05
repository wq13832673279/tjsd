<template>
  <div class="header-panel">
        <mt-header fixed title="帮助中心">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <mt-cell :title="tab.question" v-for="tab in tabs" :to="tab.href">
              
            </mt-cell>
        </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return{
        tabs:[
        ]
      }
    },
    created:function(){
      this.init();  
      this.getHelp();
    },
    methods:{
      init(){
            this.$store.state.isShowTabbar=false;
      },
      getHelp(){
        this.$http.post(this.$store.state.host+'/app/content/question',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                      for(var i=0;i<resp.data.length;i++){
                        var arr={};
                        arr.question=resp.data[i].question;
                        arr.href="/helpDetail/type/"+i;
                        this.tabs.push(arr);
                      }
                    }else{
                        Toast(resp.message);
                    }
        })
      }
    }

}
</script>