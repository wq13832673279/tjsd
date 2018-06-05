<template>
  <div class="header-panel">
        <mt-header fixed title="设置">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content" style="margin-top:10px;">
            <mt-cell title="关于我们" to="aboutUs" is-link>
            </mt-cell>
            <mt-cell title="意见反馈" to="feedback" is-link>
            </mt-cell>
            <mt-button class="small" style="margin-top:200px;color:#fff;background:#BDBFC0;" @click="logout">退出登录</mt-button>
        </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  created:function(){
    this.init();
  },
  methods:{
    init(){
        this.$store.state.isShowTabbar=false;
    },
    logout(){
        this.$http.post(this.$store.state.host+'/app/uc/logout.do',{}).then(response => {
                var resp=response.body;
                Toast(resp.message);
                if(resp.code==0){
                    localStorage.setItem('MEMBER',JSON.stringify(null));
                    localStorage.setItem('TOKEN',null);
                    this.$router.push('/login');
                }
        })
    }
  }
}
</script>