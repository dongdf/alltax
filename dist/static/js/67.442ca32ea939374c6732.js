webpackJsonp([67],{"2JeC":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("mvHQ"),n=o.n(a),r=o("qI5z"),i=o("GKmE"),s=(o("3pLw"),{data:function(){return{shouquanShow:!1,error:""}},methods:{},mounted:function(){var e=this;function t(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),o=new RegExp("(^|/)"+e+"/([^/]*)(/|$)","i"),a=window.location.search.substr(1).match(t),n=window.location.pathname.substr(1).match(o);return null!=a?unescape(a[2]):null!=n?unescape(n[2]):""}function o(e,t){try{var o,a=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i");if(e.split("?")[1])return null!=(o=e.split("?")[1].match(a)?e.split("?")[1].match(a):e.split("?")[2].match(a))?unescape(o[2]):""}catch(e){return""}}var a=t("code")?t("code"):this.$route.query.code;if(localStorage.getItem("WX_UID"))this.$router.push({path:"/home"});else if(a){var s,l,c=localStorage.getItem("llrouterUrl")?localStorage.getItem("llrouterUrl"):r.c;c.indexOf("fxopenid")>=0&&(s=o(c,"fxopenid")),c.indexOf("mobile")>=0&&(l=o(c,"mobile")),this.$http.post("/authentication/weChatAut/userinfo",{code:a,popenId:s,mobile:l}).then(function(t){if(0==t.data.code){i.a.set("USER_INFO",n()(t.data.data)),i.a.set("WX_UID",t.data.data.openid);var o=localStorage.getItem("orgPage")?localStorage.getItem("orgPage"):"",a=localStorage.getItem("boss")?localStorage.getItem("boss"):"";o?e.$router.push({name:o,query:{boss:a}}):window.location.replace(c)}else e.shouquanShow=!0,e.error=t.data},function(t){e.shouquanShow=!0,e.error="服务器开小差，请关闭后重新进入"})}else window.location.replace(r.b)}}),l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"auth"}},[this._m(0),this._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:this.shouquanShow,expression:"shouquanShow"}],staticStyle:{"text-align":"center",color:"#red","font-weight":"bold","padding-top":"20%"}},[this._v(this._s(this.error))])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{"text-align":"center","padding-top":"20%"}},[this._v("授权中..."),t("br"),this._v("请允许,否则无法正常访问")])}]};var c=o("VU/8")(s,l,!1,function(e){o("94vH")},null,null);t.default=c.exports},"94vH":function(e,t){}});