webpackJsonp([71],{pdHY:function(s,t){},xa9E:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{outDate:!1,outDate1:!0,courseListData:[{}],pnumb:1,actives:1,psize:15,sonid:"",vtype:"",qstate:0,industryId:"",loadshow:!0,messageList:[],dshNumb:0,wdshNumb:0}},mounted:function(){1==this.actives?this.getcourse():this.getwdsh(),this.getwdshnumb()},components:{noresult:e("oPJ/").a},methods:{viewPic:function(s){wx.ready(function(){wx.previewImage({current:s,urls:[s]})})},getwd:function(s){this.pnumb=1,this.messageList=[],1==s?this.getcourse():this.getwdsh(),this.actives=s},getwdsh:function(){var s=this;this.$http.post("ask/askService/queryOptPage",{subData:{pageNum:this.pnumb,pageSize:this.psize}}).then(function(t){if(0==t.data.data.list.length)return s.pnumb>1&&s.$toast("没有了"),s.loadshow=!1,!1;if(s.messageList.length>0){var e=t.data.data.list;for(var a in e)s.messageList.push(e[a]);s.loadshow=!0}else s.messageList=t.data.data.list,s.loadshow=!0})},getwdshnumb:function(){var s=this;this.$http.post("ask/askService/queryOptPage",{subData:{pageNum:this.pnumb,pageSize:this.psize}}).then(function(t){1==t.data.code&&(s.wdshNumb=t.data.data.total)})},loadMoreitem:function(){this.pnumb++,1==this.actives?this.getcourse():this.getwdsh()},changeQueState:function(s,t,e,a){var i=this;this.$http.get("ask/askService/modifyState?askId="+s.id+"&state="+t+"&questionClassifyId="+a).then(function(s){1==s.data.code&&(i.messageList.splice(e,1),i.dshNumb--)})},deleQue:function(s,t,e){var a=this;this.$messagebox.confirm("确定要删除吗？","提示").then(function(t){a.$http.get("ask/askService/deleteById?askId="+s.id).then(function(s){1==s.data.code&&(a.messageList.splice(e,1),a.dshNumb--)})})},getcourse:function(){var s=this;this.$http.post("ask/askService/queryPageByState?state=0",{subData:{pageNum:this.pnumb,pageSize:this.psize}}).then(function(t){if(s.dshNumb=t.data.data.total,0==t.data.data.list.length)return s.pnumb>1&&s.$toast("没有了"),s.loadshow=!1,!1;if(s.messageList.length>0){var e=t.data.data.list;for(var a in e)s.messageList.push(e[a]);s.loadshow=!0}else s.messageList=t.data.data.list,s.loadshow=!0})}}},i={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"shtab"},[e("ul",[e("li",{class:1==s.actives?"act":"",on:{click:function(t){s.getwd(1)}}},[s._v("待审核("+s._s(s.dshNumb)+")")]),s._v(" "),e("li",{class:2==s.actives?"act":"",on:{click:function(t){s.getwd(2)}}},[s._v("我的审核("+s._s(s.wdshNumb)+")")])])]),s._v(" "),e("ul",{directives:[{name:"show",rawName:"v-show",value:1==s.actives,expression:"actives == 1"}],staticClass:"messageList"},s._l(s.messageList,function(t,a){return e("li",[e("p",[e("img",{staticClass:"tx",attrs:{src:t.headimgUrl}}),e("span",{staticClass:"nickn"},[s._v(s._s(t.nickName))]),e("span",{staticClass:"qtime"},[s._v(s._s(s._f("timeNumb")(t.createdAt,"yyyy-MM-dd hh:mm")))])]),s._v(" "),e("p",{staticClass:"nr",domProps:{innerHTML:s._s(t.questionContent)}}),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.questionPic,expression:"item.questionPic"}],staticClass:"viewimgs"},[e("img",{attrs:{src:t.questionPic},on:{click:function(e){s.viewPic(t.questionPic)}}})]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.state<=0,expression:"item.state<=0"}],staticClass:"queaction"},[e("a",{staticClass:"btns a1",on:{click:function(e){s.changeQueState(t,1,a,0)}}},[s._v("通过")]),s._v(" "),e("a",{staticClass:"btns a1",on:{click:function(e){s.changeQueState(t,1,a,3)}}},[s._v("通过(归类为个税)")]),s._v(" "),e("a",{staticClass:"btns a2",on:{click:function(e){s.changeQueState(t,3,a,0)}}},[s._v("不通过")]),s._v(" "),e("a",{staticClass:"btns a3",on:{click:function(e){s.deleQue(t,2,a)}}},[s._v("删除")]),s._v(" "),e("div",{staticClass:"clear"})])])})),s._v(" "),e("ul",{directives:[{name:"show",rawName:"v-show",value:2==s.actives,expression:"actives == 2"}],staticClass:"messageList"},s._l(s.messageList,function(t){return e("li",[e("p",[e("img",{staticClass:"tx",attrs:{src:t.headimgUrl}}),e("span",{staticClass:"nickn"},[s._v(s._s(t.nickName))]),e("span",{staticClass:"qtime"},[s._v(s._s(s._f("timeNumb")(t.createdAt,"yyyy-MM-dd hh:mm")))])]),s._v(" "),e("p",{staticClass:"nr",domProps:{innerHTML:s._s(t.questionContent)}}),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.questionPic,expression:"item.questionPic"}],staticClass:"viewimgs"},[e("img",{attrs:{src:t.questionPic},on:{click:function(e){s.viewPic(t.questionPic)}}})]),s._v(" "),e("div",{staticClass:"queaction",staticStyle:{background:"none"}},[e("a",{staticClass:"btns a4"},[e("span",{directives:[{name:"show",rawName:"v-show",value:2==t.state,expression:"item.state == 2"}]},[s._v("已通过")]),s._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:3==t.state,expression:"item.state == 3"}]},[s._v("未通过")])]),s._v(" "),e("div",{staticClass:"clear"})])])})),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.messageList.length>0&&s.loadshow,expression:"messageList.length>0 && loadshow"}],staticClass:"loadMore",on:{click:s.loadMoreitem}},[e("button",[s._v("加载更多...")])]),s._v(" "),e("noresult",{directives:[{name:"show",rawName:"v-show",value:0==s.messageList.length,expression:"messageList.length == 0"}],attrs:{tipText:"暂无记录"}})],1)},staticRenderFns:[]};var n=e("VU/8")(a,i,!1,function(s){e("pdHY")},"data-v-41315580",null);t.default=n.exports}});