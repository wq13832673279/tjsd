<template>
  <div class="header-panel">
        <mt-header fixed title="身份认证">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <mt-field label="姓名" placeholder="张三" type="text" v-model="name"></mt-field>
            <mt-field label="身份证号" placeholder="如:340825199903031900" type="text" v-model="cardno"></mt-field>
            <div class="mt-row">
				<input id="frontCardImg" type="hidden" name="frontCardImg" :value="frontCardImg" />
				<label>身份证照
					<br/>
					<span>身份证正面照</span>
				</label>
				<div class="iden acc_img">
					<div id="sss">
						<img class="acc_imgin" id="imgPreview" src="../../assets/images/identity1.png">
					</div>
					<div class="acc_sc" style="max-height: 115px;">
						<input @click="upload0" type="file" name="file0" accept="image/jpg,image/jpeg,image/png" capture="camera" id="inputFile1" multiple class="ph08" />
					</div>
				</div>
			</div>
            <div class="mt-row">
				<input id="backCardImg" type="hidden" name="backCardImg" :value="backCardImg" />
				<label>
					<span>身份证反面照</span>
				</label>
				<div class="iden acc_img">
					<div id="sss">
						<img class="acc_imgin" id="imgNext" src="../../assets/images/identity2.png">
					</div>
					<div class="acc_sc" style="max-height: 115px;">
						<input @click="upload0" type="file" name="file1" accept="image/jpg,image/jpeg,image/png" capture="camera" id="inputFile2" multiple class="ph08" />
					</div>
				</div>
			</div>
            <mt-button class="small" style="margin-top:50px;" @click="identity">提交</mt-button>
            <div class="gz" style="background:none;color:#8f8f94">
                <div class="gz-title">
                    <span></span>
                    <label style="">温馨提示</label>
                    <span></span>
                </div>
                <div class="gz-content" style="padding-left:20%">
                    <p>1.拍摄身份证照片务必要区分正反面</p>
                    <p>2.身份证需本人，清晰且完整</p>
                </div>
            </div>
            <div class="modal" style="position: fixed;display: none;background:rgba(0,0,0,0.5);top:0;width:100%;height: 100%;line-height: 500px;text-align: center;color:#ccc;">
		        正在上传中...
	        </div>
        </div>
  </div>
</template>
<style>
.mt-row{
    height: inherit;
    position:relative;
    background:#fff;
    clear:left;
    overflow:hidden;   
}
.mt-row label{
    padding: 50px 0 0 10px;
    line-height: 1.2;
    float:left;
    width:30%;
    color:#000;
}
.mt-row label span{
    font-size: 9px;
    color:#bbb;
}
.mt-row p{
    font-size:12px;
    float:left;
    padding:26% 0 0 10px;
}
.iden {
	float: left;
	width: 50%;
    height:115px;
	padding:15px 0 5px 0;
}
.acc_sc {
	position: relative;
	top: -100%;
	height: 100%;
}
.acc_sc .ph08 {
	opacity: 0;
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}
.acc_imgin{
    max-height: 115px;
    max-width:100%
}
.gz span{
    width:23%;
    border-top:1px dashed #8f8f94;
}
.mint-cell{
    min-height:48px;
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
.mint-msgbox-confirm{
    background:#FFD801;
}

</style>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            name:'',                 
            cardno:'',
            frontCardImg:'',
            backCardImg:''
        }
    },
    created:function(){
        this.init();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        upload0(){
            var that=this;
            $(":file").base64Upload(this.$store.state.host+'/upload/oss/base64',function(el,resp){
                var name = $(el).attr('name');
                var imgId = name == 'file0'?'imgPreview':'imgNext';
                var hiddenId = name == 'file0'?'frontCardImg':'backCardImg';
                $('#'+imgId).attr('src',resp.data);
                $('#'+hiddenId).val(resp.data);
                
                that.frontCardImg=$('#imgPreview').attr('src');
                that.backCardImg=$('#imgNext').attr('src');
            })
        },
        identity(){
            var params = {};
			params['realName'] = this.name;
			params['identNo'] = this.cardno;
			params['frontCardImg'] = this.frontCardImg;
            params['backCardImg'] = this.backCardImg;
            
            if(this.name==""){
                Toast('请输入姓名');
                return false;
            }
            if(this.cardno==""){
                Toast('请输入身份证');
                return false;
            }
            this.$http.post(this.$store.state.host+'/app/uc/auth/realname',params).then(response => {
                    var resp=response.body;
                    Toast(resp.message);
                    if(resp.code==0){
                        var that=this;
                        setTimeout(() => {
                            that.$router.push('/attention');
                            
                        },3000)
                    }
            })
        }
    }
}
</script>