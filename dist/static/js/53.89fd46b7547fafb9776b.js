webpackJsonp([53],{az22:function(e,t){},"bh+r":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{adviceContent:"",mobile:"",mineInfo:{}}},mounted:function(){this.getmineInfo()},methods:{getmineInfo:function(){var e=this;this.$http.get("user/userService/getUserWeChatVo").then(function(t){e.mineInfo=t.data.data,e.mobile=e.mineInfo.mobile})},subAdvice:function(){var e=this;if(!this.mobile&&!this.adviceContent)return this.$toast("请填写手机和建议"),!1;this.$http.post("user/userService/addComplaint",{subData:{mobile:this.mobile,content:this.adviceContent}}).then(function(t){1==t.data.code&&(e.$toast("提交成功,24小时内会与您联系"),e.adviceContent="",e.$router.push("/mine"))})}},components:{reply:n("Wkgs").a}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"phoness"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],attrs:{placeholder:"请输入您的手机号",type:"number"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"pics"},[n("div",{staticClass:"tx"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.adviceContent,expression:"adviceContent"}],attrs:{name:"",id:"tl",maxlength:"500",placeholder:"请输入建议内容"},domProps:{value:e.adviceContent},on:{input:function(t){t.target.composing||(e.adviceContent=t.target.value)}}}),e._v(" "),n("span",{staticClass:"btn",on:{click:e.subAdvice}},[e._v("提交")])])])])},staticRenderFns:[]};var o=n("VU/8")(i,a,!1,function(e){n("az22")},"data-v-f519b506",null);t.default=o.exports}});