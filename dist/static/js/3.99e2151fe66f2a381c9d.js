webpackJsonp([3],{"1u4E":function(t,e,s){t.exports=s.p+"static/img/recording.ac61bda.png"},"958d":function(t,e,s){t.exports=s.p+"static/img/photo.3666852.png"},EPBT:function(t,e,s){t.exports=s.p+"static/img/fang.d3d5fc2.png"},FX4T:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("KWF9"),o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cframe"},[n("div",{staticClass:"chatFrame"},[n("div",{staticClass:"chatList",attrs:{id:"chatFrame"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.hisbtn,expression:"hisbtn"}],staticClass:"hisbtn",on:{click:t.gethisChat}},[n("span",[t._v("历史消息")])]),t._v(" "),t._l(t.msgList,function(e){return[n("p",{staticClass:"timeTag"},[t._v(t._s(t._f("timeNumb")(e.time,"MM-dd hh:mm")))]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.mines.imId!=e.from&&("custom"==e.type&&"audio"==JSON.parse(e.content).type||"custom"!=e.type),expression:"mines.imId != msg.from && (msg.type == 'custom' && JSON.parse(msg.content).type == 'audio' || msg.type != 'custom')"}],staticClass:"chatContent"},[n("img",{attrs:{src:t.targetHead,alt:""}}),t._v(" "),n("div",{staticClass:"chatRight"},[n("h6",[n("span",[t._v(t._s(e.fromNick))])]),t._v(" "),"text"==e.type?n("p",[t._v("\n                                    "+t._s(e.text)+"\n                                ")]):t._e(),t._v(" "),"image"==e.type?n("p",[n("img",{staticClass:"picc",staticStyle:{"border-radius":"0"},attrs:{src:e.file.url},on:{click:function(s){t.viewImg(e.file.url)}}})]):t._e(),t._v(" "),"custom"==e.type&&"audio"==JSON.parse(e.content).type?n("p",{staticClass:"voice",staticStyle:{background:"rgb(245, 202, 138)"},on:{click:function(s){t.playAudio(e,s)}}},[n("i",[t._v(t._s(0==parseInt(JSON.parse(e.content).timer/1e3)?1:parseInt(JSON.parse(e.content).timer/1e3))+"s")]),t._v("  "),n("img",{attrs:{src:s("mMjS")}})]):t._e()])]),t._v(" "),"custom"==e.type&&"relting"==JSON.parse(e.content).type?n("div",{staticClass:"relThing"},[n("span",{staticClass:"relfrom"},[n("a",[t._v("来源:["+t._s(t.$options.filters.cvtjson(e.content).content.name)+"]"+t._s(t.$options.filters.cvtjson(e.content).content.title))])])]):t._e(),t._v(" "),"custom"==e.type&&"relzjt"==JSON.parse(e.content).type?n("div",{staticClass:"relThing"},[n("span",{staticClass:"relzjt"},[t._v("\n                        专家团向您发送了一个需求表单，"),n("router-link",{attrs:{to:{path:"collection",query:{pos:1}}}},[t._v("点击填写")])],1)]):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.mines.imId==e.from&&("custom"==e.type&&"audio"==JSON.parse(e.content).type||"custom"!=e.type),expression:"mines.imId == msg.from  && (msg.type == 'custom' && JSON.parse(msg.content).type == 'audio' || msg.type != 'custom')"}],staticClass:"myContent"},[n("div",{staticClass:"chatRight"},[n("h6",[n("span",[t._v(t._s(e.fromNick))])]),t._v(" "),"text"==e.type?n("p",[t._v("\n                                    "+t._s(e.text)+"\n                                ")]):t._e(),t._v(" "),"image"==e.type?n("p",[n("img",{staticClass:"picc",staticStyle:{"border-radius":"0"},attrs:{src:e.file.url},on:{click:function(s){t.viewImg(e.file.url)}}})]):t._e(),t._v(" "),"custom"==e.type&&"audio"==JSON.parse(e.content).type?n("p",{staticClass:"voice",staticStyle:{background:"rgb(245, 202, 138)"},on:{click:function(s){t.playAudio(e,s)}}},[n("i",[t._v(t._s(0==parseInt(JSON.parse(e.content).timer/1e3)?1:parseInt(JSON.parse(e.content).timer/1e3))+"s")]),t._v("  "),n("img",{attrs:{src:s("TAWz")}})]):t._e()]),t._v(" "),n("img",{attrs:{src:t.mines.headimg_url,alt:""}})])]})],2)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.ableChat,expression:"ableChat"}],staticClass:"chatBottom"},[n("div",{staticClass:"left"},[n("span",[n("img",{directives:[{name:"show",rawName:"v-show",value:!t.startVoice,expression:"!startVoice"}],attrs:{src:s("ye19"),alt:""},on:{click:function(e){t.startVoice=!t.startVoice}}}),t._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:t.startVoice,expression:"startVoice"}],attrs:{src:s("WzzQ"),alt:""},on:{click:function(e){t.startVoice=!t.startVoice}}})]),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:!t.startVoice,expression:"!startVoice"},{name:"model",rawName:"v-model",value:t.sayText,expression:"sayText"}],attrs:{type:"text"},domProps:{value:t.sayText},on:{focus:t.mostart,input:function(e){e.target.composing||(t.sayText=e.target.value)}}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.startVoice,expression:"startVoice"}],staticClass:"record_voice ",class:t.isRcording?"record_press":"",on:{touchmove:function(e){t.moveRecord(e)},touchstart:function(e){t.startRecord(e)},touchend:function(e){t.endRecord(e)}}},[n("span",{directives:[{name:"show",rawName:"v-show",value:!t.isRcording,expression:"!isRcording"}]},[t._v("按住 说话")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.isRcording,expression:"isRcording"}]},[t._v("松开 结束")])])]),t._v(" "),n("div",{staticClass:"right"},[n("span",{directives:[{name:"show",rawName:"v-show",value:!t.sayText,expression:"!sayText"}],on:{click:function(e){t.moreaction=!0}}},[n("img",{attrs:{src:s("lTLB"),alt:""}})]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.sayText&&!t.startVoice,expression:"sayText && !startVoice"}]},[n("button",{staticClass:"sendbtn",on:{click:t.saySend}},[t._v("发送")])])])]),t._v(" "),n("mt-popup",{staticClass:"chat_action",attrs:{position:"bottom",modal:!0},nativeOn:{click:function(e){t.moreaction=!1}},model:{value:t.moreaction,callback:function(e){t.moreaction=e},expression:"moreaction"}},[n("div",{staticClass:"moreFrame"},[n("div",{staticStyle:{position:"relative",overflow:"hidden"}},[n("input",{staticStyle:{"font-size":"1000px",opacity:"0",position:"absolute",top:"0",left:"0"},attrs:{type:"file",accept:"image/*",id:"imgUpload"},on:{change:t.sendPic}}),t._v(" "),n("img",{attrs:{src:s("958d"),alt:""}}),t._v(" "),n("p",[t._v("照片")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.mines.expert&&t.targetInfos.user_type<2,expression:"mines.expert && targetInfos.user_type<2"}]},[n("img",{attrs:{src:s("JSBX"),alt:""},on:{click:function(e){t.sendmoneyShow=!0}}}),t._v(" "),n("p",[t._v("发起付费")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.mines.expert,expression:"mines.expert"}]},[n("img",{attrs:{src:s("L6iJ"),alt:""},on:{click:function(e){t.sendcaiji()}}}),t._v(" "),n("p",[t._v("发送表单")])])])]),t._v(" "),n("sendMoney",{attrs:{moneyShow:t.sendmoneyShow},on:{monenok:t.sendOrderOk}}),t._v(" "),t._l(t.paycomm,function(e){return n(e.component,{tag:"div",attrs:{showPay:e.parentShowpay,buyInfo:e.buyInfo},on:{close:t.payClose}})}),t._v(" "),n("relChat",{attrs:{isRel:t.isRel}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.noChat,expression:"noChat"}],staticClass:"nochatele"},[n("div",{staticClass:"info"},[n("div",{staticClass:"chat_desc"},[n("img",{attrs:{src:s("fsKc")}}),t._v(" "),n("div",{staticClass:"desc_div"},[t._m(0),t._v(" "),n("div",{staticClass:"desc_btns",on:{click:t.userPay}},[t._v("去支付")])])])])]),t._v(" "),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMessage,expression:"isShowMessage"}],staticClass:"newmssage"},[n("div",{staticClass:"messageC",on:{click:function(e){t.goMessageCenter()}}},[n("p",{staticClass:"tit"},[t._v("提醒")]),t._v(" "),n("p",[t._v("您有新的消息点击进行查看")]),t._v(" "),n("span",{on:{click:function(e){t.closeMessage(e)}}},[t._v("关闭")])])])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.viewUrl,expression:"viewUrl"}],staticClass:"viewbg",on:{click:function(e){t.viewUrl=""}}},[n("div",{staticClass:"closebtn",on:{click:function(e){t.viewUrl=""}}},[n("img",{attrs:{src:s("h4dm")}})]),t._v(" "),n("transition",{attrs:{name:"fade"}},[n("img",{attrs:{src:t.viewUrl},on:{click:function(e){t.viewUrl=""}}})])],1),t._v(" "),t.pqyUserlist.length>0?n("div",{staticClass:"exPay"},[n("div",{staticClass:"expayCon"},[n("span",{on:{click:t.closePayOrder}},[t._v("关闭")]),t._v(" "),n("ul",t._l(t.pqyUserlist,function(e){return n("li",[n("img",{attrs:{src:e.user_head}}),t._v(" "),n("p",[t._v(t._s(e.user_name)+" 已支付")])])}))])]):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isRcording,expression:"isRcording"}],staticClass:"fixedp"},[n("div",{staticClass:"rec"},[n("div",{staticClass:"recImg"},[n("img",{directives:[{name:"show",rawName:"v-show",value:t.recordSend,expression:"recordSend"}],attrs:{src:s("1u4E")}}),t._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:!t.recordSend,expression:"!recordSend"}],attrs:{src:s("J8ZR")}})]),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:t.recordSend,expression:"recordSend"}]},[t._v("手指上滑 取消发送"),n("br"),t._v("不要超过60S")]),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:!t.recordSend,expression:"!recordSend"}]},[t._v("松开手指 取消发送")])])]),t._v(" "),n("audio",{ref:"audios"})],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"desc_text"},[e("h3",[this._v("\n                  支付后可继续沟通\n                ")]),this._v(" "),e("p",[this._v("\n                  专家每日排号有限，如您还需进一步咨询专家，请先付款哦，感谢您的支持！\n                ")])])}]};var i=function(t){s("yup2")},a=s("VU/8")(n.a,o,!1,i,"data-v-62fd344a",null);e.default=a.exports},J8ZR:function(t,e,s){t.exports=s.p+"static/img/recording_cancle.b04e25b.png"},JSBX:function(t,e,s){t.exports=s.p+"static/img/charge.a9e6cb6.png"},KWF9:function(t,e,s){"use strict";(function(t){var n=s("//Fk"),o=s.n(n),i=s("mvHQ"),a=s.n(i),c=(s("7+uW"),s("jIrA")),r=s("mTUd"),l=s("oLp/"),d=s("qI5z");e.a={components:{sendMoney:c.a,relChat:l.a},data:function(){return{testChat:0,isShowMessage:!1,viewUrl:"",isOnline:!1,isRel:!1,paycomm:[],moreaction:!1,sayText:"",msgList:[],payInfoShow:!1,mineInfo:{account:"caiheshui02",token:"111111"},targetAccount:null,nim:null,hisbtn:!0,sendmoneyShow:!1,noChat:!1,mines:{},buyInfo:{isCoupon:!0,buyTitle:"订单金额",type:"1",info:{money:"998"},wxPay:!0,memberPay:!1},parentShowpay:!1,targetHead:"",userPayInfo:{},uPay:!1,reflashOrder:null,ableChat:!1,paysucees:!1,payHeart:null,pqyUserlist:[],isPayinfo:!1,targetInfos:null,startVoice:!1,isRcording:!1,startRecordTime:0,endRecordTime:0,moveX:[],moveingSign:!0,recordSend:!0,timeslong:0,relInfo:{}}},mounted:function(){var t=this;document.getElementById("app").style.background="#FFF";var e=this;this.targetAccount=this.$route.query.targetAccount,e.getmineInfo().then(function(t){return e.updatemineToken(t)}).then(function(s){e.mineInfo.account=t.mines.imId,e.mineInfo.token=s,e.connectIm(),t.findOrder(),e.findPayOrder()},function(t){console.log(t)}),this.$route.query.token&&(this.mineInfo.token=this.$route.query.token),this.$route.query.account&&(this.mineInfo.account=this.$route.query.account),this.gethead(),this.isAblechat(),this.allowVoice()},destroyed:function(){clearInterval(this.payHeart),this.$indicator.close(),this.nim&&(clearInterval(this.reflashOrder),this.nim.destroy({done:function(t){console.log("实例已被完全清除")}}))},methods:{sendcaiji:function(){var t=this;t.nim.sendCustomMsg({scene:"p2p",to:t.targetAccount,content:a()({type:"relzjt",content:"专家团信息"}),done:function(e,s){console.log(e),console.log(s),console.log("发送"+s.scene+" "+a()(s.text)+"消息"+(e?"失败":"成功")+", id="+s.idClient),t.$toast("发送成功"),t.mostart(),t.mostartWords(),e?t.$toast("消息发送失败，请重试"):t.msgList.push(s);document.getElementById("chatFrame").scrollTop=document.getElementById("chatFrame").scrollHeight+"px"}})},sendrelInfo:function(){var t=this,e={type:"relting",content:this.relInfo};t.nim.sendCustomMsg({scene:"p2p",to:t.targetAccount,content:a()(e),done:function(e,s){console.log(s),console.log("发送"+s.scene+" "+a()(s.text)+"消息"+(e?"失败":"成功")+", id="+s.idClient),t.mostart(),t.mostartWords(),e?t.$toast("消息发送失败，请重试"):(t.msgList.push(s),t.addChatRecord(t.sayText));document.getElementById("chatFrame").scrollTop=document.getElementById("chatFrame").scrollHeight+"px"}})},allowVoice:function(){localStorage.getItem("rainAllowRecord")||wx.startRecord({success:function(){localStorage.setItem("rainAllowRecord",1),wx.stopRecord()},cancel:function(){alert("用户拒绝授权录音"),localStorage.setItem("rainAllowRecord",0)}})},playAudio:function(e,s){var n=JSON.parse(e.content);this.$refs.audios.src=n.voiceId,this.$refs.audios.play(),t(".voice").find("img").removeClass("playingv");var o=s.currentTarget;t(o).find("img").addClass("playingv"),setTimeout(function(){t(o).find("img").removeClass("playingv")},n.timer)},startRecord:function(t){this.isRcording=!0,this.startRecordTime=(new Date).getTime(),wx.ready(function(){wx.startRecord({success:function(){},cancel:function(){alert("用户拒绝授权录音")}})}),t.preventDefault()},moveRecord:function(t){if(this.moveX.push(t.touches[0].pageY),this.moveX.length>2){var e=this.moveX.length-1;this.moveX[0]-this.moveX[e]>50?(console.log(this.moveX[0]-this.moveX[e]),this.recordSend=!1):this.recordSend=!0}},endRecord:function(t){var e=this;return this.isRcording=!1,this.recordSend?(this.endRecordTime=(new Date).getTime(),this.endRecordTime-this.startRecordTime<300?(this.isRcording=!1,alert("说话时间太短，请重新说一次"),wx.ready(function(){wx.stopRecord({success:function(t){},fail:function(t){}})}),!1):(this.timeslong=this.endRecordTime-this.startRecordTime,wx.ready(function(){wx.stopRecord({success:function(t){e.uploadVoice(t)},fail:function(t){alert("不要超过一分钟")}})}),void t.preventDefault())):(this.recordSend=!0,wx.ready(function(){wx.stopRecord({success:function(t){},fail:function(t){}})}),!1)},uploadVoice:function(t){var e=this;wx.uploadVoice({localId:t.localId,isShowProgressTips:0,success:function(t){e.$http.get("authentication/weChat/uploadVoiceToOSS?mediaId="+t.serverId).then(function(t){0==t.data.code?e.sendVoice(t):e.$toast("语音发送失败，请重试")})}})},sendVoice:function(t){var e=this,s={type:"audio",timer:e.timeslong,voiceId:t.data.data};e.nim.sendCustomMsg({scene:"p2p",to:e.targetAccount,content:a()(s),done:function(t,s){console.log(s),console.log("发送"+s.scene+" "+a()(s.text)+"消息"+(t?"失败":"成功")+", id="+s.idClient),e.mostart(),e.mostartWords(),t?e.$toast("消息发送失败，请重试"):(e.msgList.push(s),e.addChatRecord(e.sayText));document.getElementById("chatFrame").scrollTop=document.getElementById("chatFrame").scrollHeight+"px"}})},viewImg:function(t){wx.ready(function(){wx.previewImage({current:t,urls:[t]})})},mostart:function(){navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);setTimeout(function(){t("html,body").scrollTop(9999)},1e3)},mostartWords:function(){setTimeout(function(){t("body,html").scrollTop(9999),t(".chatFrame").scrollTop(9999)},100)},isAblechat:function(){var t=this;this.$http.post("/user/userService/expert/isAbleChat",{subData:{accId:this.targetAccount,content:""}}).then(function(e){t.ableChat=e.data.data,1==e.data.code?t.ableChat||alert("今天排号数量已使用完"):(alert(e.data.msg),t.ableChat=!1)})},gethead:function(){var t=this;this.$http.get("user/userService/user/findUserByImId?imId="+this.targetAccount).then(function(e){t.targetHead=e.data.headimg_url,t.targetInfos=e.data})},getpayState:function(){var t=this;this.$http.post("order/orderService/getChatNewOrder",{subData:{imId:this.$route.query.targetAccount}}).then(function(e){e.data.data.id&&(t.userPayInfo=e.data.data,t.uPay=!0,clearInterval(t.reflashOrder),t.creatPay(),t.paycomm.push({component:r.a,parentShowpay:!0,buyInfo:t.buyInfo}))})},findOrder:function(){var t=this;this.reflashOrder=setInterval(function(){t.getpayState()},1e4)},findPayOrder:function(){var t=this;this.mines.expert&&(this.payHeart=setInterval(function(){t.checkPayorder()},1e4))},closePayOrder:function(){var t=this;this.pqyUserlist=[],this.payHeart=setInterval(function(){t.checkPayorder()},1e4)},checkPayorder:function(){var t=this,e=this;this.$http.post("order/orderService/expertOrderPayedToday").then(function(s){1==s.data.code&&(t.pqyUserlist=s.data.data,t.pqyUserlist.length>0&&clearInterval(e.payHeart))})},updatemineToken:function(t){var e=this;return new o.a(function(s,n){e.$http.post("authentication/weChatAut/im/refreshToken",{subData:t.imId}).then(function(t){1==t.data.code?s(t.data.data):n(t.data.msg)})})},getmineInfo:function(){var t=this;return new o.a(function(e,s){t.$http.get("user/userService/getUserWeChatVo").then(function(s){1==s.data.code&&(t.mines=s.data.data,e(t.mines))})})},creatPay:function(){this.buyInfo={isCoupon:!0,buyTitle:"专家的付费咨询",type:"1",info:{money:this.userPayInfo.pay_price,money1:this.userPayInfo.order_price,resourceId:this.userPayInfo.id},wxPay:!0,memberPay:!1}},payClose:function(){this.paycomm[0].parentShowpay=!1,this.noChat=!0},userPay:function(){this.noChat=!1,this.paycomm[0].parentShowpay=!0},sendOrderOk:function(){this.sendmoneyShow=!1},connectIm:function(){var t=this;function e(){var e=[];e.push(t.targetAccount),t.nim.subscribeEvent({type:1,accounts:e,subscribeTime:2592e3,sync:!0,done:function(t,e){console.log("订阅事件"+(t?"失败":"成功"),t,e)}})}this.nim||this.$indicator.open("连接中..."),this.nim=this.$IM.NIM.getInstance({debug:!1,appKey:d.d,account:t.mineInfo.account,token:t.mineInfo.token,onconnect:function(){t.getTodayChat(),t.$route.query.rel&&(t.relInfo=JSON.parse(t.$route.query.rel),t.sendrelInfo()),function(){t.nim.addFriend({account:t.targetAccount,ps:"ps",done:function(t,e){console.log(t),console.log(e),console.log("直接加为好友"+(t?"失败":"成功"))}})}(),e(),setTimeout(function(){t.$indicator.close(),t.$toast({message:"连接成功",duration:800})},500)},ondisconnect:function(e){t.$indicator.close()},onerror:function(e){console.log(e),t.$indicator.close()},onroamingmsgs:function(t){},onofflinemsgs:function(t){},onmsg:t.onMsg,onfriends:function(t){console.log("收到好友列表",t),e()},onpushevents:function(e){console.log(e);var s=e.msgEvents,n=s.findIndex(function(e){return e.account==t.targetAccount});n>=0?0==JSON.parse(s[n].serverConfig).online.length?t.isOnline=!1:t.isOnline=!0:t.isOnline=!1}})},onMsg:function(t){var e=this;console.log("收到消息",t.scene,t.type,t),t.to==this.mines.imId&&t.from==this.targetAccount?(e.msgList.push(t),t&&(e.mostart(),e.mostartWords())):t&&t.text&&(e.isShowMessage=!0,setTimeout(function(){e.isShowMessage=!1},5e3))},closeMessage:function(t){return t.stopPropagation(),this.isShowMessage=!1,!1},goMessageCenter:function(){this.mines.expert?this.$router.push("/consult"):this.$router.push("/my-consulation")},gethisChat:function(){var t=this;t.nim.getHistoryMsgs({scene:"p2p",to:t.targetAccount,done:function(e,s){console.log("获取p2p历史消息"+(e?"失败":"成功")),console.log(a()(s.msgs)),t.msgList=s.msgs.reverse(),t.hisbtn=!1,e||console.log(s.msgs)}})},getTodayChat:function(){var t=this,e=new Date((new Date).toLocaleDateString()).getTime(),s=(new Date).getTime();t.nim.getHistoryMsgs({scene:"p2p",beginTime:e,endTime:s,to:t.targetAccount,done:function(e,s){console.log("获取p2p历史消息"+(e?"失败":"成功")),console.log(a()(s.msgs)),t.msgList=[],t.msgList=s.msgs.reverse(),t.mostart(),t.mostartWords(),e||console.log(s.msgs)}})},autoScroll:function(t){var e=document.body.scrollTop||document.documentElement.scrollTop;if(e>t)var s=setInterval(function(){var e=document.body.scrollTop||document.documentElement.scrollTop,n=Math.floor(-e/6);document.documentElement.scrollTop=document.body.scrollTop=n+e,e<=t&&(document.body.scrollTop=document.documentElement.scrollTop=t,clearTimeout(s))},20);else if(0==e)s=setInterval(function(){var e=document.body.scrollTop||document.documentElement.scrollTop,n=Math.floor(70);document.documentElement.scrollTop=document.body.scrollTop=n+e,console.log(e),e>=t&&(document.body.scrollTop=document.documentElement.scrollTop=t,clearTimeout(s))},20);else if(e<t)s=setInterval(function(){var e=document.body.scrollTop||document.documentElement.scrollTop,n=Math.floor(e/6);document.documentElement.scrollTop=document.body.scrollTop=n+e,e>=t&&(document.body.scrollTop=document.documentElement.scrollTop=t,clearTimeout(s))},20);else if(t==e)return!1},saySend:function(){var t=this;this.nim.sendText({scene:"p2p",to:t.targetAccount,text:t.sayText,done:function(e,s){console.log(s),console.log("发送"+s.scene+" "+a()(s.text)+"消息"+(e?"失败":"成功")+", id="+s.idClient),t.mostart(),t.mostartWords(),e?t.$toast("发送失败，请重试"):(t.msgList.push(s),t.addChatRecord(t.sayText));t.sayText="",document.getElementById("chatFrame").scrollTop=document.getElementById("chatFrame").scrollHeight+"px"}})},sendPic:function(t){var e=this;this.nim.sendFile({scene:"p2p",to:e.targetAccount,type:"image",fileInput:document.getElementById("imgUpload"),beginupload:function(t){},uploadprogress:function(t){e.$indicator.open("上传中...")},uploaddone:function(t,s){t?e.$toast("上传图片失败"):setTimeout(function(){e.$indicator.close()},500)},beforesend:function(t){e.msgList.push(t),e.addChatRecord("图片消息"),console.log(a()(t))}}),this.moreaction=!1,t.stopPropagation()},addChatRecord:function(t){this.$http.post("/user/userService//expert/addChat",{subData:{accId:this.targetAccount,content:t,isOnline:this.isOnline}}).then(function(t){})}}}}).call(e,s("7t+N"))},L6iJ:function(t,e,s){t.exports=s.p+"static/img/expertRec.02e675e.png"},TAWz:function(t,e,s){t.exports=s.p+"static/img/audioIcon2.d190333.png"},WzzQ:function(t,e,s){t.exports=s.p+"static/img/writeText.9209d73.png"},fsKc:function(t,e,s){t.exports=s.p+"static/img/nochatbg.9d9dd75.png"},h4dm:function(t,e,s){t.exports=s.p+"static/img/cancel.e31ab10.png"},jIrA:function(t,e,s){"use strict";var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:t.moneyShow,expression:"moneyShow"}],staticClass:"smoneyfixe"},[s("div",{staticClass:"smoney"},[s("h3",[t._v("请选择付费金额")]),t._v(" "),s("div",{staticClass:"moneyList"},t._l(t.moneys,function(e){return s("li",{class:t.selMoney.value==e.value?"sel":"",on:{click:function(s){t.ckmoney(e)}}},[t._v(t._s(e.name))])})),t._v(" "),s("div",{staticClass:"smoneybtn"},[s("button",{staticClass:"actOk",on:{click:t.moneyOk}},[t._v("确定")]),t._v(" "),s("button",{staticClass:"actCancle",on:{click:t.moneyCancle}},[t._v("取消")])])])])},staticRenderFns:[]};var o=s("VU/8")({name:"send-money",props:["moneyShow"],methods:{moneyOk:function(){var t=this;this.$http.post("order/orderService/newOrder",{subData:{order_type:"1",order_resource_id:"",amount:this.selMoney.value,coupon_id:"",imId:this.$parent.$route.query.targetAccount}}).then(function(e){1==e.data.code?(t.$emit("monenok"),t.$toast("发起成功，请等待对方支付")):t.$toast(e.data.msg)})},moneyCancle:function(){this.$emit("monenok")},ckmoney:function(t){this.selMoney=t}},data:function(){return{moneys:[{name:"10元",value:10},{name:"20元",value:20},{name:"50元",value:50},{name:"100元",value:100}],selMoney:{name:"10元",value:10}}}},n,!1,function(t){s("vuSa")},"data-v-0b63eebc",null);e.a=o.exports},lTLB:function(t,e,s){t.exports=s.p+"static/img/add.4a6b20e.png"},mMjS:function(t,e,s){t.exports=s.p+"static/img/audioIcon.8d681f6.png"},"oLp/":function(t,e,s){"use strict";var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:this.isRel,expression:"isRel"}],staticClass:"relgds"},[e("div",{staticClass:"relcontent"},[e("img",{attrs:{src:s("EPBT")}}),this._v(" "),this._m(0),this._v(" "),e("div",{staticClass:"actcontent"},[e("span",{staticClass:"btn",on:{click:this.close}},[this._v("关闭")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"infoc"},[e("h3",[this._v("商品名称商品名称")]),this._v(" "),e("p",[this._v("商品名称商品名称商")])])}]};var o=s("VU/8")({name:"rel-chat",props:["isRel"],data:function(){return{}},methods:{close:function(){this.$parent.isRel=!1}}},n,!1,function(t){s("ruJX")},"data-v-02be70af",null);e.a=o.exports},ruJX:function(t,e){},vuSa:function(t,e){},ye19:function(t,e,s){t.exports=s.p+"static/img/voice.4722f9b.png"},yup2:function(t,e){}});