<template>
  <div class="header-panel">
        <mt-header title="消息详情" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <div style="background:#fff;" v-html="content"></div>
        </div>
  </div>
</template>
<style>
    p{
        line-height:30px;
    }
</style>
<script>
export default {
    data(){
        return{
           title:'',
           content:'',
           cateId:'',
           type:'' 
        }
    },
    created:function(){
      this.cateId=this.$route.params.cateId;
      this.type=this.$route.params.type;
      this.getNewsDetail();
    },
    methods:{
      getNewsDetail(){
        this.$http.post(this.$store.state.host+'/app/content/article.do',{cateId:this.cateId,limit:10}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.title=resp.data[this.type].title;
                        this.content=resp.data[this.type].content;
                    }else{
                        
                    }
        })
      }
    }
}
</script>