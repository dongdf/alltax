webpackJsonp([75],{ZYpm:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Zssq"),i=s.n(e),n={data:function(){return{value:"请输入用户民",mineInfo:{},ownArea:{}}},components:{},mounted:function(){this.getmineInfo(),this.ownArea={name1:"",name2:"",name3:""}},methods:{getmineInfo:function(){var t=this;this.$http.get("user/userService/getUserWeChatVo").then(function(a){t.mineInfo=a.data.data,t.convertArea()})},convertArea:function(){var t=this;if(t.mineInfo.company_province||(this.ownArea.name1="",this.ownArea.name2="",this.ownArea.name3=""),999999===t.mineInfo.company_province)this.ownArea.name1="全国",this.ownArea.name2="",this.ownArea.name3="";else{var a=i.a.find(function(a){return a.code==t.mineInfo.company_province.substring(0,2)});this.ownArea.name1=a.name;var s=a.children.find(function(a){return a.code==t.mineInfo.company_city.substring(0,4)});this.ownArea.name2=s.name;var e=s.children.find(function(a){return a.code==t.mineInfo.company_country});this.ownArea.name3=e.name}},goNext:function(){this.$router.push({path:"compelete",query:this.$route.query})}}},r={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"agentinfodiv"}},[s("div",{attrs:{id:"expertinfo"}},[s("ul",[s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("头像")]),t._v(" "),s("i",[s("img",{attrs:{src:t.mineInfo.headimg_url}})])])]),t._v(" "),t._m(0),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("昵称")]),t._v(" "),s("span",{staticClass:"right1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.mineInfo.nick_name)+"\n\t\t\t\t\t")])])]),t._v(" "),t._m(1),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("姓名")]),t._v(" "),s("span",{staticClass:"right1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.mineInfo.real_name)+"\n\t\t\t\t\t")])])]),t._v(" "),t._m(2),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("手机号")]),t._v(" "),s("span",{staticClass:"right1"},[s("a",{directives:[{name:"show",rawName:"v-show",value:t.mineInfo.mobile,expression:"mineInfo.mobile"}]},[t._v(t._s(t.mineInfo.mobile))]),s("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.mineInfo.mobile,expression:"!mineInfo.mobile"}],attrs:{to:{path:"/login"}}},[t._v("点击完善信息")])],1)])]),t._v(" "),t._m(3),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("专家标签")]),t._v(" "),s("span",{staticClass:"right1"}),t._v(" "),s("div",{staticClass:"clear"},[t._v(t._s(t.mineInfo.tags))])])]),t._v(" "),t._m(4),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("所属级别")]),t._v(" "),s("span",{staticClass:"right1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.ownArea.name1)+t._s(t.ownArea.name2)+t._s(t.ownArea.name3)+" 专家\n\t\t\t\t\t")])])]),t._v(" "),t._m(5),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("公司名称")]),t._v(" "),s("span",{staticClass:"right1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.mineInfo.company_name)+"\n\t\t\t\t\t")])])]),t._v(" "),t._m(6),t._v(" "),s("li",{staticClass:"clearfix"},[s("a",{attrs:{href:"javascript:void(0);"}},[s("span",{staticClass:"left"},[t._v("所在地区")]),t._v(" "),s("span",{staticClass:"right1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.ownArea.name1)+t._s(t.ownArea.name2)+t._s(t.ownArea.name3)+"\n\t\t\t\t\t")])])]),t._v(" "),t._m(7),t._v(" "),s("li",{staticClass:"clearfix"},[t._m(8),t._v(" "),s("div",{staticClass:"clearfix"}),t._v(" "),s("div",{staticStyle:{"padding-bottom":"50px","padding-right":"10px",color:"#666"},domProps:{innerHTML:t._s(t.mineInfo.introduction)}}),t._v(" "),s("div",{staticClass:"clearfix"})])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"sxian"},[a("img",{attrs:{src:s("3Q+X")}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("a",{attrs:{href:"javascript:void(0);"}},[a("span",{staticClass:"left"},[this._v("简介")])])}]};var c=s("VU/8")(n,r,!1,function(t){s("vxyZ")},"data-v-2afc2478",null);a.default=c.exports},vxyZ:function(t,a){}});