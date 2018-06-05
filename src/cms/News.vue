<template>
  <div class="header-panel">
        <mt-header fixed title="消息中心">
          <router-link to="borrow" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div class="mt-content">
          <router-link v-for="(tab,index) in tab" :to="tab.href">
            <div class="list">
              <img :src="tab.cover">
              <h4>{{tab.title}}</h4>
              <p>{{tab.publishTime}}</p>
            </div>
          </router-link>
        </div>
  </div>
</template>
<style>
  .list{
    height:100px;
    border-bottom:2px solid #eee;
    background:#fff;
  }
  .list img{
    float:left;
    width:140px;
    height:90px;
    padding:5px;
  }
  .list h4{
    padding-top:10px;
    height:60%;
  }
  .list p{
    padding:0 5px 10px 0;
    text-align:right;
  }
</style>
<script>
import { Toast } from 'mint-ui';
  export default {
    data(){
        return {
            tab:[

            ]
        }
    },
    created:function(){
        this.getNews();
        this.init();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        getNews(){
          this.$http.post(this.$store.state.host+'/app/content/article.do',{cateId:2,limit:10}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        if(resp.data.length!=0){
                        for(var i=0;i<resp.data.length;i++){
                           var arr={};                         
                           arr.href="/newsDetail/cateId/2"+"/type/"+i;
                           arr.cover=resp.data[i].cover;
                           arr.title=resp.data[i].title;
                           arr.publishTime=resp.data[i].publishTime.split(' ')[0];
                           this.tab.push(arr); 
                         }
                      }else{
                           Toast('暂无消息');
                      }
                    }else{
                        Toast(resp.message);
                    }
            });
        }
        
    }
}
</script>