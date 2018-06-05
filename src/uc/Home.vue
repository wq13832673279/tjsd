<template>
  <div class="header-panel">
        <h3 style="font-size:1.1em;line-height:40px;height:40px;text-align:center;background:#FE5A59;color:#fff;">
            我的
        </h3>
        <div class="mt-content" style="padding-top:0;margin-top:0;box-shadow:none;">
            <div class="home-top" style="position:relative;height:110px;">
                <div style="width:90%;height:110px;position:absolute;top:70px;left:5%;background:#fff;">
                    <div style="position:absolute;top:30%;left:20px;">
                        <span class="color_red">{{commissionSum}}</span>
                        <p style="font-size:12px;">推广佣金</p>
                    </div>
                    <router-link to='tixian'>
                        <a class="tx color_red">提现</a>
                    </router-link>
                    <form name="form0" id="form0" style="position: relative;">
                        <input type="file" @click="uploadImg" name="file0" id="headImg" multiple="multiple" />
                        <br>
                        <div class="img-upload" style="margin-top:-68px;">
                            <img :src="userSrc" id="img0">
                        </div>
                        <p id="phone">{{phone}}</p>
                    </form>
                </div>
            </div>
            <div style="margin-top:90px;">
                    <mt-cell title="我的借款" to="borrowList" is-link>
                        
                    </mt-cell>
               
                    <mt-cell title="邀请好友" to="invitation" is-link>
                        
                    </mt-cell>
               
                    <mt-cell title="联系客服">
                        <a :href="thistel" style="font-size:12px;" class="color_red">0936-8255795</a>
                        
                    </mt-cell>
                    <mt-cell title="平台反馈" to="feedback" is-link>
                        
                    </mt-cell>
                    <div @click="logout">
                        <mt-cell title="退出登录">
                            
                        </mt-cell>
                    </div>
		    </div>
        </div>      
  </div>
</template>
<style>
    .tx{
        height: 25px;
        line-height:25px;
		width: 56px;
		border: 1px solid #FF9E51;
		border-radius: 15px;
		position:absolute;
        top:37%;
        right:20px;
		font-size: 13px;
        z-index:99;
    }
    #phone{
        color:#000;
    }
</style>
<script>
import App from '../App.vue';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';

export default {
    data(){
        return {
            userSrc:'../../assets/images/user_pic.png',
            phone:'',
            commissionSum:'',
            memberSum:'',
            thistel:'tel:0936-8255795'
        }
    },
    created:function(){
        this.init();
        this.getDetail();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=true;
        },
        getDetail(){
            this.$http.post(this.$store.state.host+'/app/uc/member/detail.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.commissionSum='¥'+resp.data.promotionSummary.commissionSum;
                    this.memberSum=resp.data.promotionSummary.memberSum;
                    if(resp.data.avatar==null){
                        this.userSrc='../../assets/images/user_pic.png';
                    }else{
                        this.userSrc=resp.data.avatar;
                    }
                    this.phone=resp.data.mobilePhone;
                    Indicator.close();
                }else{
                    Toast(resp.message);
                }
                
            })
        },
        uploadImg(){
            var that=this;
            $(":file").base64Upload(that.$store.state.host+'/upload/oss/base64',function(el,resp){
                var name = $(el).attr('name');
                var imgId = 'img0';
                var hiddenId = 'headImg';
                $('#'+imgId).attr('src',resp.data);
                var urlimg=$('#img0').attr('src');
                
                    that.$http.post(that.$store.state.host+'/app/uc/member/avatar.do',{avatar:urlimg}).then(response => {
                        var resp=response.body;
                        if(resp.code==0){
                            Toast('上传头像成功');
                        }else{
                            Toast(resp.message);
                        }
                    })
            })
        },
        logout(){
            var that=this;
            MessageBox.confirm('',{
                title: '温馨提示',
                message: '确认退出登录？',
                showCancelButton: true
            }).then(action => {
                that.$http.post(that.$store.state.host+'/app/uc/logout.do',{}).then(response => {
                    var resp=response.body;
                    Toast(resp.message);
                    if(resp.code==0){
                        localStorage.setItem('MEMBER',JSON.stringify(null));
                        localStorage.setItem('TOKEN',null);
                        that.$router.push('/login');
                    }
                })
            })
            
        }
    }
}


</script>
