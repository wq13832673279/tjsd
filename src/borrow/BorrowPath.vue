<template>
   <div class="header-panel">
        <mt-header fixed title="申请借款">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="mt-content" style="padding:54px 20px 10px 20px">
            <div class="applyloan">
                <div class="apply" id="check_item1">
                    <div class="applyleft">
                        <img id="iImg0" class="check_img" src="../../assets/images/applyimg1-3.png" width="100%">
                        <img src="../../assets/images/xuxians.png">
                    </div>
                    <div class="applyright">
                        <h4 id="text0_1" class="active">{{text0_1}}</h4>
                        <p id="text0_2" class="">{{text0_2}}</p>
                    </div>
                </div>
                <div class="apply" id="check_item2">
                    <div class="applyleft">
                        <img id="iImg1" class="check_img" :src="activeImg1" width="100%">
                        <img src="../../assets/images/xuxians.png">
                    </div>
                    <div class="applyright">
                        <h4 id="text1_1">{{text1_1}}</h4>
                        <p id="text1_2" class="">{{text1_2}}</p>
                    </div>
                </div>
                <div class="apply" id="check_item3">
                    <div class="applyleft">
                        <img id="iImg2" class="check_img" :src="activeImg2" width="100%">
                        <img src="../../assets/images/xuxians.png">
                    </div>
                    <div class="applyright">
                        <h4 id="text2_1">{{text2_1}}</h4>
                        <p id="text2_2" class="">{{text2_2}}</p>
                    </div>
                </div>
            </div>
        </div>
        <mt-button class="small" id="btnCheck">{{btn_check}}</mt-button>
    </div>
</template>
<style>
.applyloan {
	background-color: #fff;
	padding: 40px 20px;
}
    .apply{
        overflow: hidden;
        height:95px;
    }
    .apply .applyleft {
	width: 20px;
	float: left;
	position: relative;
	margin-right: 13px;
}

.apply .applyleft img {
	display: block;
	margin: 0 auto;
	padding: 3px 0;
}

.apply .applyright {
	float: left;
	width: 80%;
}
.apply .applyright h4.active,.apply .applyright p.active {
	color:#FFA435
}
.apply .applyright h4 {
	margin: 0;
	font-weight: 400;
	font-size: 16px;
	padding: 2px 0 10px;
}

.apply .applyright p {
	font-size: 12px;
	color: #adadad;
}
</style>
<script>
export default {
    data() {
        return {
            text0_1:'初审中',
            text0_2:'预计30分钟以内通知您审核结果',
            text1_1:'确认借款',
            text1_2:'请再次确认借款金额',
            text2_1:'等待放款',
            text2_2:'放款完成后，注意查收到账！',
            activeImg1:'../../assets/images/applyimg1-1.png',
            activeImg2:'../../assets/images/applyimg1-1.png',
            activeImg3:'../../assets/images/applyimg1-1.png',
            btn_check:'请耐心等待'
        }
    },
    created:function(){
        this.checkCode();
        let that=this;
        setInterval(function(){
			that.checkCode()
        },3000)
    },
    methods:{
        checkCode(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/info.do',{}).then(response => {
                    var resp=response.body;
                    var btnCheck=document.getElementById('btnCheck');
                    if(resp.code==0){
                        if(resp.data.code!=1000){
                            //初审中
                            if(resp.data.status=='1'||resp.data.status=='2'){
                                this.btn_check='等待初审';
                                btnCheck.setAttribute('disabled','true');
                            }
                            //初审失败
                            if(resp.data.status=='10'||resp.data.status=='11'){
                                this.text0_2='';
                                this.btn_check='初审失败';
                            }
                            //确认中
                            if(resp.data.status=='3'){
                                btnCheck.removeAttribute('disabled');
                                document.getElementById('text1_1').className='active';
                                this.activeImg1='../../assets/images/applyimg1-3.png';
                                this.btn_check='等待确认';
                                var that=this;
                                btnCheck.onclick=function(){
                                    that.$router.push('/confirm');
                                    
                                }
                            }
                            //等待复审
                            
                            //放款中或已放款
                            if(resp.data.status=='4'||resp.data.status=='5'){
                                document.getElementById('text1_1').className='active';
                                document.getElementById('text2_1').className='active';
                                this.activeImg1='../../assets/images/applyimg1-3.png';
                                this.activeImg2='../../assets/images/applyimg1-3.png';
                                if(resp.data.status=='4'){
                                    this.btn_check='等待放款';
                                    btnCheck.setAttribute('disabled','true');
                                }else{
                                    btnCheck.removeAttribute('disabled');
                                    this.text2_1='已放款';
                                    this.btn_check='回到主页';
                                    var that=this;
                                    btnCheck.onclick=function(){
                                        that.$router.push('/home');
                                        
                                    }
                                }
                            }
                        
                        }else{
                            //还款完成
                            document.getElementById('text1_1').className='active';
                            document.getElementById('text2_1').className='active';
                            this.activeImg1='../../assets/images/applyimg1-3.png';
                            this.activeImg2='../../assets/images/applyimg1-3.png';
                            this.text2_1='已还款';
                            this.btn_check='回到主页';
                            var that=this;
                            btnCheck.onclick=function(){
                                that.$router.push('/home');
                                
                            }
                        }
                    }
            })
        }
    }
}
</script>