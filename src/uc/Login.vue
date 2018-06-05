<template>
    <div class="header-panel" style="background:#fff">
        <mt-header fixed title="登录">

        </mt-header>
        <div class="mt-content">
            <div class="mt-content-top">
                <img style="width:130px" src="../../assets/images/logo.png">
            </div>
            <div id="loginForm">
                <mt-field placeholder="请输入手机号码" type="tel" style="width:84%;margin:0 auto 10px;" v-model="phone">
                    <img style="height:20px" src="../../assets/images/user.png">
                </mt-field>
                <mt-field placeholder="请输入图片验证码" type="text" style="width:84%;margin:0 auto;" v-model="captcha">
                    <img style="height:20px" src="../../assets/images/passwd.png">
                </mt-field>
                <img style="width: 38%; float: right;height: 30px;padding: 0px;" @click="getimg" id="getimg" alt="star" :src="captchaImg" />
                <mt-field placeholder="请输入短信验证码" type="text" style="width:84%;margin:0 auto;" v-model="code">
                    <img style="height:20px" src="../../assets/images/passwd.png">
                </mt-field>
                <input type="button" id="sendCode" value="获取验证码" class="yanzheng" @click="sendCode()">
                <div style="font-size:12px;padding:10px 7% 0;">
                        <label style="float:right;">
                            <img id="checkbox1" :src="src" @click="changeCheckbox">
                            我同意
                            <router-link to="borrowXieyi">
                                <a class="color_red">《借款服务协议》</a>
                            </router-link>
                        </label>
                        <mt-button class="big" @click="codeLogin">登录</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.mt-content-top{
    padding:40px 0;
    text-align:center;
    background:#fff;
}
.mint-cell-value input{
    padding-left:40px;
}
.mint-field-core{
    font-size:1em;
}
.mint-field-other{
    right:88%;
}
.mint-msgbox-confirm {
  background:#fff;
}
.mint-msgbox-content{
  border:0;
}
.mint-msgbox-message{
  font-size:15px;
  text-align:left;
  color:#333;
  line-height:25px;
}
</style>
<script>
import Vue from 'vue';
import App from '../App.vue';
import {Field} from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

Vue.component(Field.name,Field);

export default {
    data(){
        return {
            phone:'',
            captcha:'',
            code:'',
            src:'../../assets/images/select.png',
            popupVisible:true,
            countdown:60,
            captchaImg: '../../assets/images/yzmbj.png',
        }
    },
    created: function(){
        this.init();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        getimg(){
            if(this.phone==''){
                Toast('手机号码不能为空');
                return false;
            }
            this.$http.post(this.$store.state.host+'/app/uc/captcha.do',{phone:this.phone}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.captchaImg="data:image/png;base64,"+resp.data.base64Img;
                }else{
                    Toast(resp.message);
                }
            })
        },
        changePhone(){
            this.showModal();
        },
        showModal(){
            MessageBox({
                title: '温馨提示',
                message: '尊敬的用户：如果之前账户的手机号停用，请联系实惠袋人工客服。<br>客服微信：shihuidai',
                showCancelButton: true,
                cancelButtonText:'知道了',
                confirmButtonText:'复制号码'
            });
        },
        changeCheckbox(){
            if(this.src=="../../assets/images/select.png"){
                this.src="../../assets/images/select1.png"
            }else{
                this.src="../../assets/images/select.png"
            }
        },
        codeLogin(){
            var params={};
            params['mobilePhone']=this.phone;
            params['code']=this.code;
            if(this.phone==''){
                Toast('手机号码不能为空');
                return false;
            }
            if(this.code==''){
                Toast('短信验证码不能为空');
                return false;
            }
            if(this.src=="../../assets/images/select.png"){
				Toast('请同意');
				return false;
			}
            else{
                this.$http.post(this.$store.state.host+'/app/uc/code/login.do',params).then(response => {
                    var resp=response.body;
                    //console.log(resp);
                    if(resp.code==0){
                        localStorage.setItem('MEMBER',JSON.stringify(resp.data));
                        localStorage.setItem('TOKEN',resp.data.token);
                        this.$router.push('/borrow');
                    }else{
                        Toast(resp.message);
                    }
                })
            }
        },
        settime(){
            var obj=document.getElementById('sendCode');
            //console.log(obj);
            if(this.countdown == 0) {
				obj.removeAttribute("disabled");
				obj.value = "发送验证码";
				this.countdown = 60;                   
				return;
			} else {
				obj.setAttribute("disabled", true);
				obj.value = this.countdown;
				this.countdown--;
			}
            var that=this;
            setTimeout(function() {
				that.settime()
			}, 1000)
            
		},
        sendCode(){
            this.settime();
            var mobilePhone=this.phone;
            var base64Code=this.captcha;
            var params={};
            if(mobilePhone==""){
				this.countdown=0;
				Toast("请输入手机号");
				return;
			}
            if(base64Code==""){
				this.countdown=0;
				Toast("请输入图片验证码");
				return;
			}
            params['mobilePhone']=mobilePhone;
            params['base64Code']=base64Code;
            this.$http.post(this.$store.state.host+'/app/uc/mobile/code.do',params).then(response => {
                    var resp=response.body;
                    Toast('请注意查收短信');
                    if(resp.code==0){
                        
                    }else{
                        this.countdown=0;
                        Toast(resp.message);
                    }
            })
        }
    }

}
</script>
