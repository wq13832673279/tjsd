<template>
   <div class="header-panel">
        <mt-header fixed title="我要借款">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="mt-content" style="margin:0;">
            <div class="borrow-amount">
                <h1 style="color:#fff;">{{benjin}}</h1>
                <p>借款金额(元)</p>
            </div>
            <div class="borrow-detail">
                <div class="borrow-detail-qixian">
                    <mt-cell title="借款期限：" :value="qixian"></mt-cell>        
                </div>
                <div class="borrow-detail-table" style="margin-top:10px;">
                    <div style="background:#fff;text-align:center;border-bottom:1px solid #eee;line-height:49px;font-size:14px;color:#000;">一键借款，飞速审核</div>
                    <mt-cell title="审核费：" :value="shenheFee"></mt-cell>
                    <mt-cell title="服务费：" :value="serviceFee"></mt-cell>
                    <mt-cell title="利息：" :value="lixiFee"></mt-cell>
                    <mt-cell title="实际放款金额：" :value="fkJine"></mt-cell>
                    <mt-cell title="实际还款金额：" :value="hkJine"></mt-cell>                                          
                </div>
            </div>
            <mt-button style="margin:30px 5%;" @click="borrow">确认借款</mt-button>
        </div>
    </div>
</template>
<style>
.mint-header-button.is-right .mint-button{
    background: none;
	width:100%;
}
    .borrow-amount{
        background:#FE5A59;
        color:#fff;
        text-align:center;
        padding:15px 0 25px 0;
    }
    .borrow-amount h1{
        font-size:3.5em;
        
    }
   .borrow-detail-qixian .mint-cell-value{
       color:#FE5A59;
   }
   .borrow-detail-qixian .mint-cell-value span{
       font-size:14px;
   }
.mint-cell-text{
    color:#888;
}
.mint-cell-value{
    color:#000;
}
</style>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            tabActivedId: 'tab-index',
            benjin:'',
            qixian:'',
            changeActive:0,
            shenheFee:'',
            serviceFee:'',
            lixiFee:'',
            fkJine:'',
            hkJine:''
        }
    },
    created:function(){
        this.init();
        this.actives(this.changeActive);
        this.checkInfo();
        this.benjin=this.$route.query.benjin;
        this.limit();
    },
    methods:{
        init(){
            this.$store.state.isShowTabbar=false;
        },
        actives:function(index){
            this.changeActive = index;
            this.limit();            
        },
        checkInfo(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/info.do',{}).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        if(resp.data.code=='3000'){
                            Toast('您有正在还款中的借款');
                            setTimeout(() => {
                                this.$router.push('/repay');
                                
                            },3000)
                        }
                    }
            })
        },
        limit(){
            this.$http.post(this.$store.state.host+'/app/uc/borrow/member/limit.do',{}).then(response => {
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
                        var tianshu=resp.data.cycle_list;
                        this.qixian=tianshu+'天';
                        var shenheFee=(shenhe*this.benjin*tianshu).toFixed(2);
                        this.shenheFee='¥'+shenheFee;
                        var serviceFee=(bshouxu*this.benjin*tianshu).toFixed(2);
                        this.serviceFee='¥'+serviceFee;
                        var lixiFee=(lixi*this.benjin*tianshu).toFixed(2);
                        this.lixiFee='¥'+lixiFee;
                        
                        this.fkJine='¥'+(this.benjin-shenheFee-serviceFee).toFixed(2);
                        this.hkJine='¥'+(parseInt(this.benjin)+parseFloat(lixiFee)).toFixed(2);
                    }else{
                        Toast(resp.message);
                    }
            })
        },
        borrow(){
            var params = {};
			params['amount'] = this.benjin;
			params['cycle'] = parseInt(this.qixian);
			params['source']='WAP';
            this.$http.post(this.$store.state.host+'/app/uc/borrow/apply.do',params).then(response => {
                    var resp=response.body;
                    var href;
                    Toast(resp.message);
                    if(resp.code==0||resp.code==3001){
                        href = "borrowPath";
                    }else{
                        href = "attention"; 
                    }
                    var that=this;
                    setTimeout(() => {
                        that.$router.push(href);
                        
                    },3000)
            })
            
        }
    }
}
</script>