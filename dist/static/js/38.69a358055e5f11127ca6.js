webpackJsonp([38],{Ozhd:function(t,a,i){t.exports=i.p+"static/img/cancel.e31ab10.png"},RSuL:function(t,a){},egTF:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i("mTUd"),o={name:"knowledge-card",components:{pay:s.a},data:function(){return{activeVip:!1,activation:0,cardError:"",password:"",paycomm:[],cardlist:[],buyInfo:{isCoupon:!0,buyTitle:"订单金额",type:"1",info:{money:"998"},wxPay:!0,memberPay:!1},ctype:2}},mounted:function(){this.ctype=this.$route.query.ctype,this.getcards()},methods:{gocardpro:function(t){this.$router.push({path:"cardpro",query:{cardurl:t.link_url}})},actVip:function(){var t=this;this.$http.post("activity/activityService/card/activateCard",{subData:{cardPassword:this.password}}).then(function(a){1==a.data.code?(t.activation=1,t.getisVip()):(t.activation=2,t.cardError=a.data.msg)})},actcard:function(){var t=this;this.$http.get("user/userService/getUserWeChatVo").then(function(a){if(!a.data.data.mobile)return t.$messagebox.confirm("请先完善用户信息","提示").then(function(a){t.$router.push("/login")}),!1;t.activeVip=!0})},getcards:function(){var t=this;this.$http.post("activity/activityService/fictitiousCard/findList",{subData:{card_type:this.ctype}}).then(function(a){t.cardlist=a.data.data})},chooseBuy:function(t){var a=this;this.$http.get("user/userService/getUserWeChatVo").then(function(i){if(!i.data.data.mobile)return a.$messagebox.confirm("请先完善用户信息","提示").then(function(t){a.$router.push("/login")}),!1;a.toPayinfo(t),a.showPay()})},payClose:function(){this.paycomm[0].parentShowpay=!1,this.paycomm=[]},toPayinfo:function(t){this.buyInfo={buyTitle:"订单金额",isCoupon:!1,type:"7",info:{money:t.amount,resourceId:t.id},wxPay:!0,memberPay:!1}},showPay:function(){this.paycomm.push({component:s.a,parentShowpay:!0,buyInfo:this.buyInfo})}}},c={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"cards"},[s("ul",[t._l(t.cardlist,function(a){return[s("li",[s("div",{staticClass:"card fl"},[s("img",{attrs:{src:a.pic_url}})]),t._v(" "),s("div",{staticClass:"cardinfo fl"},[s("div",{staticClass:"cinfo"},[s("h3",[t._v(t._s(a.duration_name))]),t._v(" "),s("p",[t._v(t._s(a.describe))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:a.link_url,expression:"k.link_url"}],staticClass:"mores",on:{click:function(i){t.gocardpro(a)}}},[t._v("详细介绍>>")]),t._v(" "),s("div",{staticClass:"buyb",on:{click:function(i){t.chooseBuy(a)}}},[t._v("购买")])])]),t._v(" "),s("div",{staticClass:"cl"})])]})],2),t._v(" "),t._l(t.paycomm,function(a){return s(a.component,{tag:"div",attrs:{showPay:a.parentShowpay,buyInfo:a.buyInfo},on:{close:t.payClose}})}),t._v(" "),s("div",{staticClass:"shopcard",on:{click:function(a){t.actcard()}}},[t._v("\n\n    激活实体卡\n  ")]),t._v(" "),s("mt-popup",{staticClass:"actvip",attrs:{position:"bottom",modal:!0},model:{value:t.activeVip,callback:function(a){t.activeVip=a},expression:"activeVip"}},[s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.activation,expression:"activation==0"}],staticClass:"step"},[s("h4",[s("span",[s("img",{attrs:{src:i("Ozhd")},on:{click:function(a){t.activeVip=!1}}})]),t._v("激活实体卡")]),t._v(" "),s("div",{staticClass:"colum"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"text",placeholder:"请输入密码"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}})]),t._v(" "),s("div",{staticClass:"colum"},[s("div",{staticClass:"lightBtn",on:{click:t.actVip}},[t._v("立即激活")])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.activation,expression:"activation==1"}],staticClass:"step"},[s("h4",{staticClass:"noBorder"},[s("span",[s("img",{attrs:{src:i("Ozhd")},on:{click:function(a){t.activeVip=!1}}})])]),t._v(" "),s("p",[t._v("恭喜您，实体卡激活成功")]),t._v(" "),s("p",[s("span")]),t._v(" "),s("div",{staticClass:"lightBtn",on:{click:function(a){t.activeVip=!1}}},[t._v("我知道了")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.activation,expression:"activation==2"}],staticClass:"step"},[s("h4",{staticClass:"noBorder"},[s("span",[s("img",{attrs:{src:i("Ozhd")},on:{click:function(a){t.activeVip=!1}}})])]),t._v(" "),s("p",[t._v(t._s(t.cardError))]),t._v(" "),s("p",[t._v("请确认后重新输入或联系客服")]),t._v(" "),s("div",{staticClass:"lightBtn",on:{click:function(a){t.activation=0}}},[t._v("重新输入")])])])])],2)},staticRenderFns:[]};var n=i("VU/8")(o,c,!1,function(t){i("RSuL")},"data-v-50cc1da0",null);a.default=n.exports}});