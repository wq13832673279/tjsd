var app = {
    host:'http://tjsudai.com',
    token (){
        return localStorage.getItem("TOKEN");
    },
    setToken(token){
        localStorage.setItem('TOKEN',token);
    },
    setMember(member){
        localStorage.setItem('MEMBER',JSON.stringify(member));
    },
    getMember(){
        var memberJson = localStorage.getItem("MEMBER");
        return memberJson?JSON.parse(memberJson):null;
    },
    post:function(url,data,fn){
        $.ajax({
            url:app.host+url,
            data:data,
            type:'post',
            dataType:'json',
            success:function(resp,status,xhr){
                /*if( location.href.indexOf('invitation-register')!='-1'){
                     if(resp.code == 4000&&!location.href.endsWith('app-download.html')){
                             location.href = '../login.html';
                             return false;
                    }
                }*/
                if(typeof fn == 'function'){
                    fn(resp);
                }
            }
        })
    }      
};
var API = {
    REGISTER:'/app/uc/register.do',//用户注册
    CODE:'/app/uc/mobile/code.do',//手机验证码发送
    LOGIN:'/app/uc/login.do',//用户登录
    PWD:'/app/uc/reset/pwd.do',//忘记（修改）密码
    BANNER:'/app/index/banner',//
    DETAIL:'/app/uc/member/detail.do',//用户基本信息
    APPLY:'/app/uc/borrow/apply.do',//申请借款
    LIMIT:'/app/uc/borrow/member/limit.do',//额度费率查询
    REALNAME:'/app/uc/auth/realname',//实名认证接口
    AUTH:'/vendor/payment/auth',//银行卡认证接口
    ALL:'/app/uc/borrow/all.do',//我的所有借款
    CONFIRM:'/app/uc/borrow/confirm.do',//确认借款
    INFO:'/app/uc/borrow/info.do',//借款信息
    CANCEL:'/app/uc/borrow/cancel.do',//取消借款
    REPAY:'/app/uc/borrow/repay.do',//还款
    BORROWDETAIL:'/app/uc/borrow/detail.do',//借款详情
    MEMBERDETAIL:'/app/uc/auth/member/detail',//详细资料认证接口
    BANK:'/vendor/payment/bank',//银行列表查询
    LIST:'/app/uc/auth/list',//认证列表（有无认证）
    IMAGE:'/upload/oss/image.do',
    LOGOUT:'/app/uc/logout.do',//退出登录
    UPLOAD:'/upload/oss/base64',//上传图片
    AVATAR:'/app/uc/member/avatar.do',//更改头像
    URL:'/app/uc/auth/url',//查询认证H5链接
    REGISTERXIEYI:'/app/content/register.do',//注册协议
    BORROWXIEYI:'/app/content/borrow.do',//借款协议
    BANKDETAIL:'/app/uc/bankcard/detail.do',//银行卡详情
    UNBIND:'/app/uc/unbind/card.do',//解绑银行卡
    OPINION:'/app/content/opinion.do',//平台反馈
    PROMOTION:'/app/uc/promotion', //查询用户推广信息
    ABOUTUS:'/app/uc/about-us',//关于我们
    ARTICLE:'/app/content/article.do',//文章列表
    VERSION:'/app/uc/version',//APP版本信息
    WITHDRAW:'/app/uc/commission/withdraw',//提现
    WITHDRAWHISTORY:'/app/uc/commission/withdraw/history',//提现记录
    CODElOGIN:'/app/uc/code/login.do'//用户验证码登录
}