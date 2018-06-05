import Vue from 'vue';
import Login from '../uc/Login.vue';
import BorrowXieyi from '../uc/BorrowXieyi.vue';

import Borrow from '../borrow/Borrow.vue';

import News from '../cms/News.vue';
import NewsDetail from '../cms/NewsDetail.vue';

import BorrowApply from '../borrow/BorrowApply.vue';
import BorrowPath from '../borrow/BorrowPath.vue';
import Confirm from '../borrow/Confirm.vue';
import BorrowList from '../borrow/BorrowList.vue';
import BorrowDetail from '../borrow/BorrowDetail.vue';
import Repay from '../borrow/Repay.vue';

import Attention from '../attention/Attention.vue';
import IdentityPage from '../attention/IdentityPage.vue';
import PersonInfo from '../attention/PersonInfo.vue';

import Home from '../uc/Home.vue';

import Invitation from '../uc/Invitation.vue';
import Tixian from '../uc/Tixian.vue';
import TixianRecord from '../uc/TixianRecord.vue';

import BindBankCard from '../uc/BindBankCard.vue';
import MyBankcard from '../uc/MyBankcard.vue';

import Help from '../uc/Help.vue';
import HelpDetail from '../uc/HelpDetail.vue';

import Setting from '../uc/Setting.vue';
import AboutUs from '../uc/AboutUs.vue';
import Feedback from '../uc/Feedback.vue';



export default [
        {path:'/login',component:Login},
        {path:'/borrowXieyi',component:BorrowXieyi},
        {path:'/',component:Borrow},
        {path:'/borrow',component:Borrow},
        {path:'/news',component:News},
        {path:'/newsDetail',component:NewsDetail},
        {path:'/newsDetail/cateId/:cateId/type/:type',component:NewsDetail},
        {path:'/borrowApply',component:BorrowApply},
        {path:'/borrowPath',component:BorrowPath},
        {path:'/confirm',component:Confirm},
        {path:'/borrowList',component:BorrowList},
        {path:'/borrowDetail',component:BorrowDetail},
        {path:'/borrowDetail/borrowNo/:borrowNo',component:BorrowDetail},
        {path:'/repay',component:Repay},
        {path:'/attention',component:Attention},
        {path:'/identityPage',component:IdentityPage},
        {path:'/personInfo',component:PersonInfo},
        {path:'/home',component:Home},
        {path:'/invitation',component:Invitation},
        {path:'/tixian',component:Tixian},
        {path:'/tixianRecord',component:TixianRecord},
        {path:'/bindBankCard',component:BindBankCard},
        {path:'/myBankcard',component:MyBankcard},
        {path:'/help',component:Help},
        {path:'/helpDetail',component:HelpDetail},
        {path:'/helpDetail/type/:type',component:HelpDetail},
        {path:'/setting',component:Setting},
        {path:'/aboutUs',component:AboutUs},
        {path:'/feedback',component:Feedback}
    ];