<template>
  <div class="page-view">
    <div class="page-content">
      <router-view></router-view>
    </div>
    <div class="page-footer" v-show="showTabbar">
      <mt-tabbar @click="tab(index)" v-model="tabActivedId">
        <router-link to="borrow">
          <mt-tab-item id="tab-index" class="jiekuan">
            我要借款
          </mt-tab-item>
        </router-link>
        <router-link to="attention">
          <mt-tab-item id="tab-find" class="attention">
            认证中心
          </mt-tab-item>
        </router-link>
        <router-link to="home">
          <mt-tab-item id="tab-my" class="user">
            个人中心
          </mt-tab-item>
        </router-link>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Mint from 'mint-ui';
import '../assets/js/app.js';
import {mapGetters,mapActions} from 'vuex';

export default {
  name: 'app',
  data() {
    num: 1;
    return {
      tabActivedId: '',
    }
  },
  computed:{
    'showTabbar':function(){
      return this.$store.state.isShowTabbar
    }
  },
  watch:{
    'tabActivedId':function(val,oldVal){
      //console.log('selected changed from '+oldVal+' to '+val);
    }
  }
}

</script>

<style>
body{
  background:#F4F4F4;
  margin:0;
  color:#8f8f94;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2,
h3,
h4,
h5{
  font-weight: normal;
  margin:0;
  color:#000;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

p{
  padding:0;
  margin:0;
}

a {
  color: #000;
  text-decoration:none;
}

.page-content{
  margin-bottom:56px;
}

.mint-header-title{
  color:#000;
  font-size:1.2em;
  height:20px;
}

.mint-header{
  background:#fff;
  color:#000;
}

.mint-header .mint-button {
  width:16px;
}
.mint-header-button.is-right .mint-button{
  width:100%;
  text-align:right;
}
.mint-button-text{
  font-size:0.9em
}

#loginForm{
  padding-top:30px;
  position:relative;
}

.mint-field-core{
  font-size:0.8em;
}

#checkbox1{
  height:10px;
}

button.mint-button{
  background:#FE5A59;
  color:#fff;
  margin:0 auto;
  width:90%;
  border-radius:25px;
}
button.mint-button.small{
  margin:10px 5%;
}
button.mint-button.big{
  width:100%;
  margin-top:30px;
}

.mint-tabbar{
  position:fixed;
}

.mt-content{
  padding-top:39px;
  min-height:100%;
  margin-top:10px;
}
.home-top{
  background:#FE5A59;
  background-size:cover;
  text-align:center;
}
.home-top img {
	border-radius: 50%;
	height: 95px;
	width: 95px;
}
#headImg {
		height: 95px;
		width: 95px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top:0;
		opacity: 0;
    
	}
.home-middle{
  padding:15px 0;
  background:#fff;
  height:20px;
  font-size:12px;
  line-height:20px;
  text-align:center;
  color:#bbb
}
.home-middle div{
  float:left;
  width:49%;
}
.home-middle span{
  font-size:15px;
  color:#000;
  padding:0 5px;
}
.mint-cell img{
    height: 25px;
		vertical-align: bottom;
		margin-right: 10px;
}
.mint-cell-title{
  line-height:20px;
}
.mint-cell-wrapper {
    background-image:none;
    background-image:none;
}
.mint-tabbar{
  background:#fff;
}
.mint-tabbar a{
  flex:1;
}
.mint-tab-item-icon:empty {
  display: block;
}
.mint-tabbar .mint-tab-item.jiekuan .mint-tab-item-icon{
  background:url(/assets/images/jiekuan1.png) no-repeat;
  background-size:cover;
}
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.jiekuan,
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.attention,
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.user{
  color:#FC5D22;
}
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.jiekuan .mint-tab-item-icon{
   background:url(/assets/images/jiekuan2.png) no-repeat;
   background-size:cover;
}
.mint-tabbar .mint-tab-item.attention .mint-tab-item-icon{
  background:url(/assets/images/attention1.png) no-repeat;
  background-size:cover;
}
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.attention .mint-tab-item-icon{
   background:url(/assets/images/attention2.png) no-repeat;
   background-size:cover;
}
.mint-tabbar .mint-tab-item.user .mint-tab-item-icon{
  background:url(/assets/images/user1.png) no-repeat;
  background-size:cover;
}
.mint-tabbar .router-link-exact-active.router-link-active .mint-tab-item.user .mint-tab-item-icon{
   background:url(/assets/images/user2.png) no-repeat;
   background-size:cover;
}
.mint-tabbar .mint-tab-item.is-selected{
    color:#000;
    background:#fff;
}
.mint-cell-allow-right::after{
    background:url(/assets/images/more.png) no-repeat;
    width:8px;
    height:14px;
    top:43%;
    right:10px;
    border:0;
    -webkit-transform:none;
    transform:none;
    background-size:cover;
}
.p_tip1{
	  margin: 0;
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
    font-size:12px;
}
.mint-cell{
    border-bottom:1px solid #eee;
}
.mint-cell-label {
    margin-left:30px;
}
.mint-cell-value span{
    font-size: 12px;
}
.mint-cell-text{
  color:#000;
}
.hdgz{
        background:#FEF2F4;
        padding-bottom:25px;
        margin:0 auto;
        margin-top:20px;
        width:90%;
    }
    .hdgz-title{
        width: 260px;
        height:30px;
        margin: 0 auto;
        padding-top:35px;
        color:#000;
    }
    .hdgz-content{
        width:274px;
        margin:0 auto;
        font-size:11px;
    }
    .hdgz label{
      float:left;
      width:74px;
      text-align: center;
    }
    .hdgz-content p{
        line-height:25px;
    }
    .hdgz-content a{
        display:inline-block;
        color:#fff;
        background:#FC5D22;
        border-radius:50%;
        width:25px;
        line-height:25px;
        text-align:center;
        margin-right:10px;
    }
.gz{
  width:90%;
  margin:20px auto;
  color:#000;
}
.gz-title{
  height:40px;
}
.gz-content{
  font-size:12px;
}
.gz label{
  float:left;
  font-size:14px;
  width:53%;
  text-align:center;
}
.gz span,.hdgz span{
  float:left;
  line-height:1px;
  margin-top:10px;
  width:90px;
  border-top:1px solid #8f8f94;
}

.tianshu span{
    float:left;
    width:38%;
    height:30px;
    line-height:30px;
    border:1px solid #FFD801;
    border-radius:5px;
    margin:0 3%;
    cursor:pointer;
    text-align:center;
    color:#85730C;
}
.picker{
    margin-top:5px;
}
.picker-slot {
    font-size: 14px;
}

.mt-input-row{
    background-color:#fff;
    min-height:48px;
    line-height:48px;
    overflow:hidden;
    padding:0 10px;
    border-bottom:1px solid #eee;
    font-size:13px;
}
.mt-input-row label{
    float:left;
    color:#8f8f94;
    width:105px;
}
.mt-input-row span{
    color:#000;
}
.color_red{
    color:#FC5D22 !important;
}
.color_blue{
    color:#386BDE !important;
}

.repayHeader{
    width:63%;
    top: 5px;
    right: 0;
    left: 19%;
    position: fixed;
    z-index: 1;
    
}
.repayHeader .mint-button{
    color: #fff;
    width:48%;
	height:30px;
    z-index:99;
    line-height:30px;
	overflow: hidden;
	text-align: center;
    color:#000;
    border:1px solid #F4F4F4;
    background:#F4F4F4;
}
.repayHeader .mint-button.active{
    background:#FE5A59
}
/*借款主页*/
.mt-slider{
  position:relative;
  width:92%;
  margin:10px auto;
  border-radius:5px;
  padding-top:50%;
  color:#fff;
  font-size:13px;
}
.jiekuan_icon{
  position:absolute;
  width:40px;
  top:10px;
  left:20px;
}
.jiekuan_title{
  position:absolute;
  top:15px;
  left:80px;
}
.xyed{
  position:absolute;
  bottom:35%;
  left:5%;
}
.jiekuan_edu{
  position:absolute;
  top:42%;
  left:35%;
  font-size:48px;
  line-height:40px;
}
.jiekuan_bottom{
  position:absolute;
  color:#8f8f94;
  width:92%;
  bottom:10px;
  left:15px;
}
.jiekuan_bottom span{
  float:right;
}
/*登录页面*/
#sendCode{
  width: 30%;
  height:30px;
  font-size: 14px;
  position: absolute;
  background:#fff;
  color: #FC5D22;
  top:147px;
  right:15px;
  padding-left: 2px;
  z-index: 999;
  border:0;
}

#getimg{
  width: 30%;
  height:30px;
  position: absolute;
  top:97px;
  right:15px;
  z-index: 999;
}
</style>