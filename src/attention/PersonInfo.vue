<template>
  <div class="header-panel">
        <mt-header fixed title="个人信息">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="mt-content">
            <p class="p_tip1 color_red">基本信息</p>
            <mt-field label="QQ号码" placeholder="请输入您的QQ号码" type="text" v-model="qqno"></mt-field>
            <mt-field label="微信号码" placeholder="请输入您的微信号码" type="text" v-model="weino"></mt-field>
            <div class="mt-input-row" @click="showModal1">
				      <label style="font-size:16px;color:#000;">学 历</label>
              <span>{{education}}</span>
			      </div>
            <mt-field label="家庭住址" placeholder="请填写详细的家庭住址" type="text" v-model="home_address"></mt-field>
            <mt-field label="工作单位" placeholder="请填写工作单位" type="text" v-model="organization"></mt-field>
            <p class="p_tip1 color_red">紧急联系人一</p>
            <mt-field label="姓名" placeholder="请输入紧急联系姓名" type="text" v-model="name1"></mt-field>
            <mt-field label="电话号码" placeholder="请输入手机号码" type="text" v-model="phone1"></mt-field>
            <div class="mt-input-row" @click="showModal2">
				      <label style="font-size:16px;color:#000;">与本人关系</label>
              <span>{{relation1}}</span>
			      </div>
            <p class="p_tip1 color_red">紧急联系人二</p>
            <mt-field label="姓名" placeholder="请输入紧急联系姓名" type="text" v-model="name2"></mt-field>
            <mt-field label="电话号码" placeholder="请输入手机号码" type="text" v-model="phone2"></mt-field>
            <div class="mt-input-row" @click="showModal3">
				      <label style="font-size:16px;color:#000;">与本人关系</label>
              <span>{{relation2}}</span>
			      </div>
            <p class="p_tip1 color_red">紧急联系人三</p>
            <mt-field label="姓名" placeholder="请输入紧急联系姓名" type="text" v-model="name3"></mt-field>
            <mt-field label="电话号码" placeholder="请输入手机号码" type="text" v-model="phone3"></mt-field>
            <div class="mt-input-row" @click="showModal4">
				      <label style="font-size:16px;color:#000;">与本人关系</label>
              <span>{{relation3}}</span>
			      </div>
            <mt-button class="small" style="margin-top:50px;" @click="personinfo">提交</mt-button>
            <div @click="hideModal" id="hideAnniu" style="display:none;position:fixed;z-index:1000;background:#eee;bottom:150px;right:20px;">确定</div>
            <mt-picker id="modal1" style="display:none;position:fixed;width:100%;bottom:0;z-index:999;background:#eee;" :slots="slots1" @change="onValuesChange1"></mt-picker>
            <mt-picker id="modal2" style="display:none;position:fixed;width:100%;bottom:0;z-index:999;background:#eee;" :slots="slots2" @change="onValuesChange2"></mt-picker>
            <mt-picker id="modal3" style="display:none;position:fixed;width:100%;bottom:0;z-index:999;background:#eee;" :slots="slots2" @change="onValuesChange3"></mt-picker>
            <mt-picker id="modal4" style="display:none;position:fixed;width:100%;bottom:0;z-index:999;background:#eee;" :slots="slots2" @change="onValuesChange4"></mt-picker>
        </div>
  </div>
</template>
<style>
    .mint-cell{
        min-height:48px;
    }
    .mint-header-button.is-right .mint-button{
      background:none;
      width:auto;
    }
</style>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      qqno:'',
      weino:'',
      education:'',
      home_address:'',
      organization:'',
      name1:'',
      name2:'',
      name3:'',
      phone1:'',
      phone2:'',
      phone3:'',
      relation1:'',
      relation2:'',
      relation3:'',
      slots1: [
        {
          flex: 1,
          values: ['本科', '研究生', '大专', '高中/中专', '高中以下'],
          className: 'slot1',
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ['父亲', '母亲', '配偶', '子女', '其他亲属', '朋友', '同事', '其他'],
          className: 'slot2',
        }
      ]
    };
  },
  created:function(){
    this.init();
  },
  methods: {
    init(){
      this.$store.state.isShowTabbar=false;
    },
    onValuesChange1(picker,values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1,values[0]);
      }
       this.education=picker.getValues()[0];
    },
    onValuesChange2(picker,values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1,values[0]);
      }
      this.relation1=picker.getValues()[0];
    },
    onValuesChange3(picker,values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1,values[0]);
      }
      this.relation2=picker.getValues()[0];
    },
    onValuesChange4(picker,values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1,values[0]);
      }
      this.relation3=picker.getValues()[0];
    },
    personinfo(){
      var params = {};
			params['qq_number'] = this.qqno;
			params['weixin'] = this.weino;
			params['diploma'] = this.education;
      params['contact1_name'] = this.name1;
      params['contact1_mobile'] = this.phone1;
      params['contact1_relation'] = this.relation1;
      params['contact2_name'] = this.name2;
      params['contact2_mobile'] = this.phone2;
      params['contact2_relation'] = this.relation2;
      params['contact3_name'] = this.name3;
      params['contact3_mobile'] = this.phone3;
      params['contact3_relation'] = this.relation3;
           
            if(this.qqno==""){
                Toast('QQ号码不能为空');
                return false;
            }
            if(this.weino==""){
                Toast('微信号码不能为空');
                return false;
            }
            if(this.education==""||this.education==undefined){
                Toast('请选择学历');
                return false;
            }
            if(this.name1==""||this.name2==""||this.name3==""){
                Toast('姓名不能为空');
                return false;
            }
            if(this.phone1==""||this.phone2==""||this.phone3==""){
                Toast('电话不能为空');
                return false;
            }
            if(this.relation1==""||this.relation2==""||this.relation3==""){
                Toast('请选择关系');
                return false;
            }
            var body=JSON.stringify(params);
            
            console.log(body);
            this.$http.post(this.$store.state.host+'/app/uc/auth/member/detail',body).then(response => {
                    var resp=response.body;
                    Toast(resp.message);
                    if(resp.code==0){
                        var that=this;
                        setTimeout(() => {
                            that.$router.push('/attention');
                            
                        },3000)
                    }
            },JSON)
    },
    showModal1(){
      document.getElementById('modal2').style.display="none";
      document.getElementById('modal3').style.display="none";
      document.getElementById('modal4').style.display="none";
      document.getElementById('modal1').style.display="block";
      document.getElementById('hideAnniu').style.display="block";
    },
    showModal2(){
      document.getElementById('modal1').style.display="none";
      document.getElementById('modal3').style.display="none";
      document.getElementById('modal4').style.display="none";
      document.getElementById('modal2').style.display="block";
      document.getElementById('hideAnniu').style.display="block";
    },
    showModal3(){
      document.getElementById('modal1').style.display="none";
      document.getElementById('modal2').style.display="none";
      document.getElementById('modal4').style.display="none";
      document.getElementById('modal3').style.display="block";
      document.getElementById('hideAnniu').style.display="block";
    },
    showModal4(){
      document.getElementById('modal1').style.display="none";
      document.getElementById('modal2').style.display="none";
      document.getElementById('modal3').style.display="none";
      document.getElementById('modal4').style.display="block";
      document.getElementById('hideAnniu').style.display="block";
    },
    hideModal(){
      document.getElementById('modal1').style.display="none";
      document.getElementById('modal2').style.display="none";
      document.getElementById('modal3').style.display="none";
      document.getElementById('modal4').style.display="none";
      document.getElementById('hideAnniu').style.display="none";
    }
  }
};
</script>