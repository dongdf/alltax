webpackJsonp([5],{"+jtx":function(t,s,e){t.exports=e.p+"static/img/state33.f45f5cb.png"},"5EYy":function(t,s,e){t.exports=e.p+"static/img/zhuiicon.56ba77e.png"},DURJ:function(t,s,e){t.exports=e.p+"static/img/newzan1.1eec753.png"},Fw6O:function(t,s,e){t.exports=e.p+"static/img/cancel2.1871576.png"},Gxxn:function(t,s,e){t.exports=e.p+"static/img/state22.58f7d8b.png"},MAM6:function(t,s,e){t.exports=e.p+"static/img/wallet.fda4446.png"},ML8t:function(t,s,e){t.exports=e.p+"static/img/exp_1.68d36cb.png"},Njz4:function(t,s,e){t.exports=e.p+"static/img/exp_3.c145d93.png"},OVJH:function(t,s,e){t.exports=e.p+"static/img/newzan2.b9ae885.png"},OoJt:function(t,s){},ULoC:function(t,s){},XWzf:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("MTyd");var i=e("mTUd"),a=(e("Q0Ca"),e("oPJ/")),n={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",[i("mt-popup",{staticClass:"zhuiContent",attrs:{position:"bottom",modal:!0},model:{value:t.parentShowzhui,callback:function(s){t.parentShowzhui=s},expression:"parentShowzhui"}},[i("div",{staticClass:"zhuic"},[i("h3",[t._v("回复"),i("span",{on:{click:function(s){t.closezhui()}}},[i("img",{attrs:{src:e("xR9Y")}})])]),t._v(" "),i("div",[i("div",{staticClass:"tra"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.zhuicontent,expression:"zhuicontent"}],attrs:{placeholder:"请输入回复内容"},domProps:{value:t.zhuicontent},on:{input:function(s){s.target.composing||(t.zhuicontent=s.target.value)}}})])]),t._v(" "),i("button",{staticClass:"zhuibtn",on:{click:t.zhuitj}},[t._v("提交")])])])],1)},staticRenderFns:[]};var o=e("VU/8")({name:"zhui",data:function(){return{showzhui:!0,zhuicontent:"",mineInfo:{},anshow:!0}},mounted:function(){this.checkUser()},props:["parentShowzhui","zhuiInfo"],methods:{checkUser:function(){var t=this;this.$http.get("user/userService/getUserWeChatVo").then(function(s){if(t.mineInfo=s.data.data,!t.mineInfo.mobile)return t.$messagebox.confirm("请完善用户信息后继续回答问题","提示").then(function(s){t.$router.push("/login")}),!1})},zhuitj:function(){var t=this;return this.mineInfo.mobile?this.zhuicontent.trim()?!!this.anshow&&(this.anshow=!1,this.zhuicontent=this.zhuicontent.replace(/\r\n/g,"<br/>"),this.answercontent=this.zhuicontent.replace(/\n/g,"<br/>"),this.zhuicontent=this.zhuicontent.replace(/\s/g," "),void this.$http.post("ask/askService/createAnswer",{subData:{ask_question_id:this.$route.query.questionId,answer_content:this.zhuicontent,pid:this.zhuiInfo.anid}}).then(function(s){1==s.data.code?(t.$toast("提交成功"),t.$emit("submitzhui")):t.$toast(s.data.msg)})):(this.$toast("请输入内容"),!1):(this.$messagebox.confirm("请完善用户信息后继续回答问题","提示").then(function(s){t.$router.push("/login")}),!1)},closezhui:function(){this.$emit("close")}}},n,!1,function(t){e("OoJt")},"data-v-40df606f",null).exports,r={data:function(){return{vipQuestion:!1,zhuis:[],zhuishow:!1,ismy:!1,isbest:!1,paycomm:[],viewpic:"",buyInfo:{},isShowVip:{},vipquesBuy:!0,buyobj:{},myinfos:{},mineInfo:{},questionInfo:{askUser:{},answers:[]}}},components:{noresult:a.a,pay:i.a},computed:{},methods:{checkUser:function(){var t=this;this.$http.get("user/userService/getUserWeChatVo").then(function(s){t.mineInfo=s.data.data})},zan:function(t){var s=this;t.thumb_id?this.$http.get("/ask/askService/deleteThumbUp?id="+t.answer_id).then(function(t){s.getqDetail()}):this.$http.get("/ask/askService/addThumbUp?id="+t.answer_id).then(function(t){s.getqDetail()})},submitzhui:function(){this.zhuis[0].parentShowzhui=!1,this.zhuis=[],this.getqDetail()},closezhui:function(){this.zhuis[0].parentShowzhui=!1,this.zhuis=[]},zhuiwen:function(t){this.zhuis.push({component:o,parentShowzhui:!0,zhuiInfo:{qid:this.$route.query.questionId,anid:t.answer_id}})},buyQue:function(t){var s=this;this.$http.get("user/userService/getUserWeChatVo").then(function(e){if(s.myinfos=e.data.data,!e.data.data.mobile)return s.$messagebox.confirm("请先完善用户信息","提示",{confirmButtonText:"确定"}).then(function(t){s.$router.push("/login")}),!1;2==s.myinfos.user_type?(s.vipQuestion=!0,s.buyobj=t):(s.buyobj=t,s.toPayinfo(),s.paycomm.push({component:i.a,parentShowpay:!0,buyInfo:s.buyInfo}))})},createVipOrder:function(){var t=this;if(!this.vipquesBuy)return!1;this.vipquesBuy=!1,this.$http.post("order/orderService/newOrder",{subData:{order_type:"8",order_resource_id:this.buyobj.answer_id,amount:0}}).then(function(s){t.vipquesBuy=!0,t.vipQuestion=!1,t.getqDetail()})},payClose:function(){this.paycomm[0].parentShowpay=!1,this.paycomm=[]},toPayinfo:function(){this.buyInfo={buyTitle:"订单金额",isCoupon:!0,type:"8",info:{money:this.buyobj.charge,money1:this.buyobj.charge,resourceId:this.buyobj.answer_id},wxPay:!0,memberPay:!1}},viewPic:function(t){wx.ready(function(){wx.previewImage({current:t,urls:[t]})})},goExpert:function(t){2==t.expert_level&&this.$router.push({path:"/expert-detail",query:{id:t.expert_id}}),1!=t.expert_level&&3!=t.expert_level||this.$router.push({path:"/expert-detail",query:{ph:1,id:t.expert_id}})},yijiejue:function(t){var s=this;this.$http.post("ask/askService//finishQuestion",{subData:this.questionInfo.askUser.ask_question_id}).then(function(t){1==t.data.code&&(s.$toast("操作成功"),s.ismy=!1,s.getqDetail())})},zuijia:function(t){var s=this;this.$http.post("ask/askService/setBestAnswer",{subData:t.answer_id}).then(function(t){1==t.data.code&&(s.$toast("操作成功"),s.isbest=!0,s.getqDetail())})},isRight:function(){this.$http.post("",{subData:{}}).then(function(t){})},goToCourse:function(){this.$router.push({path:"course",query:this.$route.query})},goAnswer:function(){this.$router.push({path:"answer-question",query:this.$route.query})},getqDetail:function(){var t=this;this.$http.post("ask/askService/getDetail",{subData:this.$route.query.questionId}).then(function(s){console.log(s.data),1==s.data.code&&(t.questionInfo=s.data.data,t.ismy=t.questionInfo.myself,t.isbest=t.questionInfo.hasBest)})}},mounted:function(){var t=this;this.checkUser(),this.$http.post("ask/askService/getDetail",{subData:this.$route.query.questionId}).then(function(s){if(console.log(s.data),1==s.data.code){t.questionInfo=s.data.data,t.ismy=t.questionInfo.myself,t.isbest=t.questionInfo.hasBest;t.questionInfo.askUser.question_content.replace(/<[^>]+>/g,"");var e={type:1,title:"我在财合税专家咨询平台提问了，快来帮我解决吧！",desc:"财合税专家咨询平台，您身边的财税专家。",link:"/#/question-detail?questionId="+t.$route.query.questionId,imgUrl:t.questionInfo.askUser.user_head?t.questionInfo.askUser.user_head:"https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg"},i={type:1,title:"我在财合税专家咨询平台提问了，快来帮我解决吧！",desc:"财合税专家咨询平台，您身边的财税专家。",link:"/#/question-detail?questionId="+t.$route.query.questionId,imgUrl:t.questionInfo.askUser.user_head?t.questionInfo.askUser.user_head:"https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg"};t.$parent.shareTimePage(i),t.$parent.shareAppPage(e)}})}},c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"question"}},[i("ul",{staticClass:"box4 "},[i("li",{staticClass:"clear pss"},[i("div",{staticClass:"state"},[i("img",{directives:[{name:"show",rawName:"v-show",value:0==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state == 0"}],staticClass:"stateimg",attrs:{src:e("Gxxn")}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:1==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state == 1"}],staticClass:"stateimg",attrs:{src:e("Gxxn")}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:2==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state == 2"}],staticClass:"stateimg",attrs:{src:e("+jtx")}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:3==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state == 3"}],staticClass:"stateimg",attrs:{src:e("XsX2")}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:4==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state == 4"}],staticClass:"stateimg",attrs:{src:e("XsX2")}})]),t._v(" "),i("img",{staticClass:"ar-l",attrs:{src:t.questionInfo.askUser.user_head}}),t._v(" "),i("div",{staticClass:"desc ar-l"},[i("div",{staticClass:"clear t1"},[i("span",{staticClass:"ar-l"},[t._v(t._s(t.questionInfo.askUser.nick_name))]),t._v(" "),i("span",{staticClass:"ar-r"},[t._v(t._s(t._f("time")(t.questionInfo.askUser.created_time)))])]),t._v(" "),i("p",{domProps:{innerHTML:t._s(t.questionInfo.askUser.question_content)}}),t._v(" "),t.questionInfo.askUser.question_pic?i("div",{staticClass:"question_pic_list"},[i("ul",[i("li",{on:{click:function(s){t.viewPic(t.questionInfo.askUser.question_pic)}}},[i("img",{attrs:{src:t.questionInfo.askUser.question_pic}})]),t._v(" "),i("div",{staticClass:"cl"})])]):t._e(),t._v(" "),i("div",{staticClass:"clear t2"},[i("span",{staticClass:"ar-r"},[i("span",{staticClass:"mar"},[t._v("回答"+t._s(t.questionInfo.answers.length?t.questionInfo.answers.length:"0"))])])])])])]),t._v(" "),i("div",{staticClass:"di"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.ismy&&t.questionInfo.askUser.state>0&&2!=t.questionInfo.askUser.state,expression:"ismy && questionInfo.askUser.state>0 && questionInfo.askUser.state !=2"}],staticClass:"isdonequestion",on:{click:function(s){t.yijiejue(t.m)}}},[t._v("此问题已解决")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2!==t.questionInfo.askUser.state||t.mineInfo.expert,expression:"questionInfo.askUser.state !== 2 || mineInfo.expert"}],staticClass:"wo",on:{click:t.goAnswer}},[t._v("\n        我来回答\n      ")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ismy&&t.questionInfo.askUser.state>0&&2!=t.questionInfo.askUser.state,expression:"ismy && questionInfo.askUser.state>0 && questionInfo.askUser.state !=2"}],staticClass:"daoliuExpert"},[i("router-link",{attrs:{to:{path:"/experts"}}},[i("img",{attrs:{src:e("qtRy")}})])],1),t._v(" "),i("div",{staticClass:"replys"},[i("div",{staticClass:"answers"},[i("ul",{staticClass:"box5 "},t._l(t.questionInfo.answers,function(s){return i("li",{staticClass:"clear",class:t.questionInfo.askUser.finish_time&&t.questionInfo.askUser.finish_time<s.created_time&&s.expert_level>0?"gaoliang":""},[s.charge?i("div",{staticClass:"hbao"},[1==s.is_able_read?i("ul",{staticClass:"wgm",on:{click:function(e){t.buyQue(s)}}},[i("img",{staticClass:"zjimg",attrs:{src:s.user_head}}),t._v(" "),i("div",{staticClass:"zjimfo"},[i("span",[t._v(t._s(t._f("textFilterPhone")(s.nick_name))+"\n                      "),1==s.expert_level?i("i",{staticClass:"exp_biao"},[i("img",{attrs:{src:e("ML8t")}})]):t._e(),t._v(" "),2==s.expert_level?i("i",{staticClass:"exp_biao"},[i("img",{attrs:{src:e("fxk7")}})]):t._e(),t._v(" "),3==s.expert_level?i("i",{staticClass:"exp_biao"},[i("img",{attrs:{src:e("Njz4")}})]):t._e()]),t._v(" "),i("p",[t._v("打开锦囊，查看专家回复。")])])]):t._e(),t._v(" "),0==s.is_able_read?i("ul",{staticClass:"ygm"},[i("img",{staticClass:"zjimg",attrs:{src:s.user_head}}),t._v(" "),i("div",{staticClass:"zjimfo"},[i("span",[t._v(t._s(t._f("textFilterPhone")(s.nick_name))+"\n                      "),1==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("ML8t")}})]):t._e(),t._v(" "),2==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("fxk7")}})]):t._e(),t._v(" "),3==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("Njz4")}})]):t._e()]),t._v(" "),i("div",{staticClass:"ptime"},[t._v(t._s(t._f("time")(s.created_time)))]),t._v(" "),i("p",{domProps:{innerHTML:t._s(s.answer_content)}})]),t._v(" "),i("div",{staticClass:"cl"})]):t._e()]):t._e(),t._v(" "),s.charge?t._e():i("div",[i("img",{staticClass:"ar-l",attrs:{src:s.user_head}}),t._v(" "),i("div",{staticClass:"desc ar-l"},[i("div",{staticClass:"clear t1"},[i("span",{staticClass:"ar-l"},[t._v(t._s(t._f("textFilterPhone")(s.nick_name))+"\n                      "),1==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("ML8t")}})]):t._e(),t._v(" "),2==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("ulvK")}})]):t._e(),t._v(" "),3==s.expert_level?i("i",{staticClass:"exp_biao",on:{click:function(e){t.goExpert(s)}}},[i("img",{attrs:{src:e("Njz4")}})]):t._e()]),t._v(" "),i("span",{staticClass:"ar-r"},[t._v(t._s(t._f("time")(s.created_time)))])]),i("div",{staticClass:"cl"}),t._v(" "),s.p_content?i("div",{staticClass:"ansource"},[t._v(t._s(s.p_nick_name)+" 回答于"+t._s(t._f("timeNumb")(s.p_created_at,"MM-dd hh:mm"))),i("p",{staticClass:"zhuic"}),i("div",{domProps:{innerHTML:t._s(s.p_content)}}),t._v(" "),i("div",{staticClass:"cl"}),i("p"),i("div",{staticClass:"cl"})]):t._e(),t._v(" "),i("p",[i("span",{directives:[{name:"show",rawName:"v-show",value:s.is_best,expression:"m.is_best"}],staticStyle:{background:"#ffcc66",color:"#FFF","font-size":"13px",padding:"0 2px",display:"inline-block","border-radius":"3px"}},[t._v("最佳")]),i("a",{staticStyle:{color:"#333"},domProps:{innerHTML:t._s(s.answer_content)}})]),i("div",{directives:[{name:"show",rawName:"v-show",value:1==s.is_tip,expression:"m.is_tip == 1"}],staticClass:"fl",staticStyle:{color:"rgb(201, 133, 0)"}},[i("img",{staticStyle:{width:"18px",position:"relative",height:"18px",margin:"0","margin-right":"5px",top:"4px"},attrs:{src:e("MAM6")}}),i("span",[t._v("已打赏")])]),t._v(" "),i("div",{staticClass:"fr zhuis"},[s.thumb_id?t._e():i("span",{on:{click:function(e){t.zan(s)}}},[t._m(0,!0),t._v("赞"+t._s(s.thumb_num))]),t._v(" "),s.thumb_id?i("span",{on:{click:function(e){t.zan(s)}}},[t._m(1,!0),t._v("赞"+t._s(s.thumb_num))]):t._e(),t._v("\n                       "),i("p",{directives:[{name:"show",rawName:"v-show",value:2!==t.questionInfo.askUser.state,expression:"questionInfo.askUser.state !== 2"}],staticStyle:{display:"inline"}},[t._v("| "),i("span",{on:{click:function(e){t.zhuiwen(s)}}},[t._m(2,!0),t._v("回复")])])]),t._v(" "),i("div",{staticClass:"cl"}),t._v(" "),i("p"),t._v(" "),t._m(3,!0)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ismy&&!t.isbest&&t.questionInfo.askUser.state>0,expression:"ismy && !isbest && questionInfo.askUser.state>0"}],staticStyle:{display:"block",padding:"15px 0",clear:"both","text-align":"center"}},[i("span",{staticClass:"isdone",on:{click:function(e){t.zuijia(s)}}},[t._v("设为最佳答案")])])])])})),t._v(" "),i("noresult",{directives:[{name:"show",rawName:"v-show",value:0==t.questionInfo.answers.length,expression:"questionInfo.answers.length == 0"}],attrs:{tipText:"暂无记录"}}),t._v(" "),t._l(t.paycomm,function(s){return i(s.component,{tag:"div",attrs:{showPay:s.parentShowpay,buyInfo:s.buyInfo},on:{close:t.payClose}})})],2)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.vipQuestion,expression:"vipQuestion"}],staticClass:"vipQes"},[i("div",{staticClass:"vipQescc"},[i("h3",[i("span",[i("img",{attrs:{src:e("Fw6O")},on:{click:function(s){t.vipQuestion=!1}}})])]),t._v(" "),i("div",{staticClass:"imgtext"},[t._m(4),t._v(" "),i("p",{staticClass:"text1"},[t._v("￥"+t._s(t.buyobj.charge))]),t._v(" "),i("p",{staticClass:"text2"},[t._v("￥0.00")])]),t._v(" "),i("div",{staticClass:"img2",on:{click:function(s){t.createVipOrder()}}},[i("img",{attrs:{src:e("gP48")}})])])]),t._v(" "),t._l(t.zhuis,function(s){return i(s.component,{tag:"div",attrs:{parentShowzhui:s.parentShowzhui,zhuiInfo:s.zhuiInfo},on:{submitzhui:t.submitzhui,close:t.closezhui}})})],2)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("i",{staticClass:"newzan"},[s("img",{attrs:{src:e("DURJ")}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("i",{staticClass:"newzan"},[s("img",{attrs:{src:e("OVJH")}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("i",{staticClass:"zhuiicon"},[s("img",{attrs:{src:e("5EYy")}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"clear t2"},[s("span",{staticClass:"ar-r"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",[this._v("VIP会员"),s("br"),this._v(" 享专属特权\n            免费打开锦囊")])}]};var u=e("VU/8")(r,c,!1,function(t){e("ULoC")},"data-v-4c637118",null);s.default=u.exports},XsX2:function(t,s,e){t.exports=e.p+"static/img/state44.6d38e7a.png"},fxk7:function(t,s,e){t.exports=e.p+"static/img/exp_2_text.1c7a1df.png"},gP48:function(t,s,e){t.exports=e.p+"static/img/chaijinnang.c39678a.png"},qtRy:function(t,s,e){t.exports=e.p+"static/img/zjt.9540d0b.jpg"},ulvK:function(t,s,e){t.exports=e.p+"static/img/exp_2.ba1cc6e.png"}});