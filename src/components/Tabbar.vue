<template>
<mt-tabbar v-model="tabActivedId">
    <mt-tab-item id="tab-index">
    <img slot="icon" src="/assets/images/icon-home.png"> 主页
    </mt-tab-item>
    <mt-tab-item id="tab-find">
    <img slot="icon" src="/assets/images/icon-find.png"> 发现
    </mt-tab-item>
    <mt-tab-item id="tab-my">
    <img slot="icon" src="/assets/images/icon-user.png"> 我的
    </mt-tab-item>
</mt-tabbar>  
</template>
<script>
export default {
    name:'tabbar',
    props:['selected'],
    data(){
        return {
            tabActivedId:'',
        }
    },
    watch:{
    'tabActivedId':function(val,oldVal){
      console.log('tabActivedId changed from '+oldVal+' to '+val);
    }
  }
}
</script>

