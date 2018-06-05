<template>
  <div class="header-panel">
        <mt-header fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="repayHeader">
          <mt-button style="border-radius:0;" v-for="(list,index) in buttonLists" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</mt-button>
		</div>
        <div class="mt-content">
            <div class="hk" v-show="showHk">
                <div class="huankuan">
                    <p>{{hk_title}}</p>
                    <div class="hkDay">
                        <span id="countdown">{{countdown}}</span>
                    </div>
                    <div class="hkDate">
                        到期还款日：<span>{{dqhkDate}}</span>
                    </div>
                </div>
                <div class="mt-input-row">
                    <label>放款时间：</label>
                    <span>{{fkDate}}</span>
                </div>
                <div class="mt-input-row">
                    <label>借款金额：</label>
                    <span>{{benjin}}</span>
                </div>
                <div class="mt-input-row">
                    <label>利息：</label>
                    <span>{{lixiFee}}</span>
                </div>
                <div class="mt-input-row" v-show="showThree">
                    <label>{{hk_three}}</label>
                    <span>{{hk_three_content}}</span>
                </div>
                <div class="mt-input-row">
                    <label>应还总额：</label>
                    <span class="color_red">{{total}}</span>
                </div>
            </div>
            <div class="xq" v-show="showXq">
                <div>
                    <div class="mt-input-row">
                        <label>续期期限：</label>
                        <span>7天</span>
                    </div>
                    <div class="mt-input-row">
                        <label>续期到期时间：</label>
                        <span>{{xqhkDate}}</span>
                    </div>
                </div>
                <div style="text-align:center;line-height:49px;font-size:15px;color:#000;border-bottom:1px solid #eee;">续期费用</div>
                <div class="mt-input-row">
                    <label>续期手续费：</label>
                    <span>{{totalFee}}</span>
                </div>
                <div class="mt-input-row">
                    <label>总计：</label>
                    <span class="color_red">{{totalFee}}</span>
                </div>
            </div>
            <mt-button style="margin-top:20px;" class="small" @click="postButton">{{buttons}}</mt-button>
        </div>
  </div>
</template>
<style>
body{
    background:#fff;
}
.mt-input-row span{
    float:right;
}
.huankuan{
    position:relative;
    width:202px;
    height:150px;
    margin:0 auto;
    background:url(../../assets/images/hkbg.png) no-repeat;
    background-size:cover;
    font-size:12px;
    margin:30px auto 50px auto;
}
.huankuan p{
    position:absolute;
    top:30%;
    left:30%;
}
.hkDay{
    position:absolute;
    top:45%;
    left:38%;
    font-size:20px;
    color:#FC5D22;
}
#countdown{
    font-size:40px;
}
.huankuan img{
    width:20px;
    position:absolute;
    top:85%;
    left:45%;
}
.hkDate{
    position:absolute;
    top:100%;
    left:15%; 
}

</style>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            buttonLists:[
                {
                    "text":"还款"                     
                },
                {
                    "text":"续期"                     
                }
            ],
            changeActive:0,
            hk_title:'',
            countdown:'',
            dqhkDate:'',
            benjin:'',                 
            fkDate:'',
            showThree:false,
            hk_three:'',
            hk_three_content:'',
            hk_four:'',
            total:'',
            buttons:'',
            borrowNo:'',
            showHk:true,
            showXq:false,
            xqhkDate:'',
            lixiFee:'',
            serviceFee:'',
            totalFee:''
        }
    },
    created:function(){
        this.actives(this.changeActive);
        this.getborrowInfo();
    },
    methods:{
        actives:function(index){
            this.changeActive = index;
            console.log(this.changeActive);
            
            if(this.changeActive==1){
                this.showHk=false;
                this.showXq=true;
                 this.buttons='立即支付';
            }
            if(this.changeActive==0){
                this.showHk=true;
                this.showXq=false;
                 this.buttons='立即还款';
            }
        },
        getborrowInfo(){
            setInterval(() => {
            this.$http.post(this.$store.state.host+'/app/uc/borrow/info.do',{}).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    for(var i=0;i<resp.data.feeTypes.length;i++){
                                var code=resp.data.feeTypes[i].code;
                                if(code=="shenhe"){
                                    var shenhe=resp.data.feeTypes[i].fee_rate;
                                }else if(code=="lixi"){
                                    var lixi=resp.data.feeTypes[i].fee_rate;
                                }else if(code=="fuwu"){
                                    var bshouxu=resp.data.feeTypes[i].fee_rate;
                                }
                    }
                    var lixiFee=(lixi*resp.data.final_amount*7).toFixed(2);
                    this.lixiFee='¥'+lixiFee;
                    if(resp.data.is_overdue=='1'){
                        this.hk_title='逾期天数';
                        this.countdown=resp.data.overdue_day;
                        this.showThree=true;
                        this.hk_three='逾期罚息：';
                        var yuqiFee=resp.data.overdue_fee_rate*resp.data.overdue_day*resp.data.final_amount;
                        this.hk_three_content='¥'+yuqiFee.toFixed(2);
                        this.total='¥'+(parseFloat(resp.data.final_amount)+parseFloat(yuqiFee)).toFixed(2);
                    }else{
                        this.hk_title='还款倒计时(天)';
                        this.countdown=resp.data.countdown;
                        this.showThree=false;
                        this.total='¥'+(parseFloat(resp.data.final_amount)+parseFloat(lixiFee)).toFixed(2);
                        if(resp.data.code=="3000"){

                            this.countdown=resp.data.countdown;
                            this.dqhkDate=resp.data.repay_date;
                            this.benjin='¥'+resp.data.final_amount;
                            this.fkDate=(resp.data.pass_time).split(' ')[0];
                            this.total=this.benjin;
                            
                            function addDate(date,days){ 
                                var d=new Date(date); 
                                var d2=d.getTime()+days*24*60*60*1000;
                                var d3=new Date(d2);
                                return d3.getFullYear()+'-'+(d3.getMonth()+1)+'-'+d3.getDate();
				            } 
                            this.xqhkDate=addDate(this.dqhkDate,7);
                            for(var i=0;i<resp.data.feeTypes.length;i++){
                                var code=resp.data.feeTypes[i].code;
                                if(code=="shenhe"){
                                    var shenhe=resp.data.feeTypes[i].fee_rate;
                                }else if(code=="lixi"){
                                    var lixi=resp.data.feeTypes[i].fee_rate;
                                }else if(code=="fuwu"){
                                    var bshouxu=resp.data.feeTypes[i].fee_rate;
                                }
                            }
                            this.lixiFee='¥'+(resp.data.continue_rate*resp.data.final_amount*7).toFixed(2);
                            this.serviceFee='¥'+(resp.data.continue_fee_rate*resp.data.final_amount*7).toFixed(2);
                            this.totalFee='¥'+(resp.data.continue_rate*resp.data.final_amount*7+resp.data.continue_fee_rate*resp.data.final_amount*7).toFixed(2);
                            this.borrowNo=resp.data.borrow_no;
                        }else{
                            Toast('您没有正在还款中的借款');
                            var that=this;
                            setTimeout(() => {
                                that.$router.push('/home');
                               
                            },3000)
                        }
                    }
                        
                    }
            })
            },1000)
        },
        postButton(){
            if(this.buttons=="立即还款"){
                MessageBox.confirm('确认还款?').then(action => {
                    this.$http.post(this.$store.state.host+'/app/uc/borrow/repay.do',{borrowNo:this.borrowNo}).then(response => {
                        var resp=response.body;
                        Toast(resp.message);
                        if(resp.code==0){
                            var that=this;
                            setTimeout(() => {
                                that.$router.push('/borrowPath');
                            
                            },3000)
                        
                        }
                    })
                })    
            }else{
                var params={};
                params['borrowNo']=this.borrowNo;
                params['renewal']=7;
                MessageBox.confirm('确认续期?').then(action => {
                    this.$http.post(this.$store.state.host+'/app/uc/borrow/renewal.do',params).then(response => {
                        var resp=response.body;
                        Toast(resp.message);
                        if(resp.code==0){
                        this.changeActive=0;
                        this.showXq=false;
                        this.showHk=true;
                        }
                    })
                }) 
            }

        }
    }
}
</script>