webpackJsonp([11],{"8ESX":function(t,e,n){t.exports=n.p+"static/img/cancel.b87ecb9.png"},KAmq:function(t,e,n){t.exports=n.p+"static/img/checked.c7c8339.png"},RfSg:function(t,e){},VodX:function(t,e,n){t.exports=n.p+"static/img/phone.ee0d8e5.png"},jT7l:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("GKmE"),n("8ESX");var i={data:function(){return{phone:"",checkCodeLocal:"",checkCode:"",rulesShow:!1,password:"",errorMsg:"",checked:!0,isSend:!1,isSendText:"",seconds:120,isshens:!0}},props:["bs"],components:{},methods:{goNext:function(){var t=this;this.phone?this.checkCodeLocal?!0===this.checked?this.$http.post("user/userService/bindingTel",{subData:{code:this.checkCodeLocal,mobile:this.phone}}).then(function(e){1==e.data.code?t.bs?t.$emit("closeLogin"):t.$router.push({path:"compelete"}):t.$toast(e.data.msg)}):this.$toast("请阅读并同意平台服务协议"):this.$toast("请输入验证码"):this.$toast("请输入手机号")},checkBtn:function(){this.checked=!this.checked},yanPhone:function(){var t=this;return this.$options.filters.isphone(this.phone)?!!this.isshens&&(this.isshens=!1,this.errorMsg="",void this.$http.post("user/userService/sendSMS",{subData:{mobile:this.phone}}).then(function(e){if(1==e.data.code)var n=setInterval(function(){if(t.seconds<=0)return clearInterval(n),t.isSend=!1,t.seconds=120,t.isshens=!0,!1;t.isSend=!0,t.seconds--,t.isSendText=t.seconds},1e3);else t.$toast(e.data.msg)})):(this.$toast("请填写正确的手机号码！"),!1)}},mounted:function(){var t=this;setInterval(function(){t.errorMsg=""},3e3)}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"yanZheng"}},[t._m(0),t._v(" "),i("div",{staticClass:"input-group"},[i("p",[i("img",{attrs:{src:n("VodX"),alt:""}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入您的手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),i("p",[i("img",{attrs:{src:n("pGeg"),alt:""}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.checkCodeLocal,expression:"checkCodeLocal"}],attrs:{type:"text"},domProps:{value:t.checkCodeLocal},on:{input:function(e){e.target.composing||(t.checkCodeLocal=e.target.value)}}}),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:!t.isSend,expression:"!isSend"}],on:{click:t.yanPhone}},[t._v("获取验证码")]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.isSend,expression:"isSend"}]},[t._v(t._s(t.isSendText)+"S")])])]),t._v(" "),i("div",{staticClass:"box"},[t.bs?t._e():i("button",{staticStyle:{border:"none"},on:{click:t.goNext}},[t._v("下一步")]),t._v(" "),t.bs?i("button",{staticStyle:{border:"none"},on:{click:t.goNext}},[t._v("保存")]):t._e(),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:!t.bs,expression:"!bs"}],staticClass:"checkBox"},[i("span",{on:{click:t.checkBtn}},[i("img",{directives:[{name:"show",rawName:"v-show",value:!t.checked,expression:"!checked"}],attrs:{src:n("n7Jt"),alt:""}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.checked,expression:"checked"}],attrs:{src:n("KAmq"),alt:""}})]),t._v(" "),i("a",{on:{click:function(e){t.rulesShow=!0}}},[t._v("平台服务协议")])])]),t._v(" "),i("mt-popup",{staticClass:"rulesContent",attrs:{position:"bottom",modal:!1},model:{value:t.rulesShow,callback:function(e){t.rulesShow=e},expression:"rulesShow"}},[i("h3",[i("span",{on:{click:function(e){t.rulesShow=!1}}},[i("img",{attrs:{src:n("8ESX")}})]),t._v("用户注册协议")]),t._v(" "),i("div",{staticClass:"rcontent"},[i("div",{staticClass:"pdiv"},[i("p",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("尊敬的用户您好:")])]),t._v(" "),i("p",{staticStyle:{"text-indent":"24px"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("请您在注册前务必认真阅读（未成年人应当在监护人陪同下阅读）、充分理解本《用户注册协议》（以下简称《协议》）中规定的所有权利和限制。除非您接受本《协议》条款，否则您无权注册、登录或使用本协议所涉及的相关服务。您一旦注册、登录、使用或以任何方式使用本《协议》所涉及的相关服务的行为将视为对本《协议》的接受，即表示您同意接受本《协议》各项条款的约束。如果您不同意本《协议》中的条款，请不要注册、登录或使用本《协议》相关服务。 本《协议》是用户与"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("之间的法律协议。")])]),t._v(" "),i("p",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v(" ")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("一、服务内容")])])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("1.1")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("的具体内容由"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("根据实际情况提供，例如找知识、找产品、找课程、咨询大厅等。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v(" 1.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("您一旦注册成功成为用户，将得到一个密码和账号，您需要对自己在帐户中的所有活动和事件负全责。如果由于您的过失导致您的账号和密码脱离您的控制，则由此导致的针对您或任何第三方造成的损害，您将承担全部责任。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("1.3")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("提供的部分服务为收费服务，用户使用收费服务需要向"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("支付一定的费用。对于收费服务，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("会在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该收费服务。如用户拒绝支付相关费用，则"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("有权不向用户提供该服务。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("1.4 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户理解并接受，")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由用户自行负担。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left"}},[i("span",{staticStyle:{"font-family":"仿宋"}},[t._v(" ")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("二. 用户使用规则")])])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户在申请使用")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("服务时，必须")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("向")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("提供准确的个人资料，如个人资料有任何变动，必须及时更新。因用户提供个人资料不准确、不真实而引发的一切后果由用户承担。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户应妥善保存账号、密码，避免以任何脱离用户控制的形式交由他人使用。如用户发现其账号遭他人非法使用，应立即通知"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("。因黑客行为或用户的保管疏忽导致账号、密码遭他人非法使用，"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("不承担任何责任。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.3 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户应当为自身注册账户下的一切行为负责，因用户行为而导致的用户自身或其他任何第三方的任何损失或损害，"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("不承担责任。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.4 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户理解并接受"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("提供的服务中可能包括广告，用户同意在使用过程中显示"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("和第三方供应商、合作伙伴提供的广告。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户在使用"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("服务过程中，必须遵循以下原则：")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("遵守中国有关的法律和法规；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("遵守所有与网络服务有关的网络协议、规定和程序；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.3 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不得为任何非法目的而使用网络服务系统；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.4 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不得利用"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.5 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不得利用"),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{background:"white"}},[t._v("财合税专家咨询平台")])]),t._v("提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.6 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不得侵犯"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("和其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.7 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不得利用"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("网络服务系统进行任何不利于"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("的行为；")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.8 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户必须清楚使用规则，不可利用本服务对信息进行出售，或利用本服务进行调查、广告等其他商业目的；")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.5.9")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("如发现任何非法使用用户账号或账号出现安全漏洞的情况，应立即通告"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("2.6 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("如用户在使用网络服务时违反任何上述规定，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户收藏的内容、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("三. 服务变更、中断或终止")])])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("3.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("鉴于网络服务的特殊性，用户同意"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("有权根据业务发展情况随时变更、中断或终止部分或全部的网络服务（包括收费服务及免费服务）。如变更、中断或终止的服务属于免费服务，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("无需通知用户，也无需对任何客户和第三方承担任何责任；如变更、中断或终止的服务属于收费服务，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("应当在变更、中断或终止之前事先通知客户，并应向受影响的用户提供等值的替代性收费服务，如用户不愿意接受替代性的收费服务，就该用户已经向"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("支付的服务费，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v(" 财合税专家咨询平台")]),t._v("应当按照该用户实际使用收费服务的情况扣除相应服务费之后将剩余的服务费退还给该用户。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("3.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户理解，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("需要定期或不定期地对提供网络服务的平台（如互联网网站、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("无需为此承担任何责任，但"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("应尽可能事先进行通告。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("3.3 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("如发生下列任何一种情形，")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C",background:"white"}},[t._v("有权随时中断或终止向用户提供本《协议》项下的网络服务（包括收费网络服务）而无需对用户或任何第三方承担任何责任：")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("3.3.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户提供的个人资料不真实；")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("3.3.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户违反本《协议》中规定的使用规则；")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("3.3.3")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户在使用收费服务时未按规定向"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("支付相应的服务费；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("四. 知识产权")])])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("4.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("用户在使用"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("学习和交流时，不得侵犯第三方的著作权；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("4.2")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税(北京)信息技术有限公司对网站服务及本网站所使用的软件所包含的受知识产权法或其他法律保护的资料享有相应的权利，本网站的整体内容版权归财合税(北京)信息技术有限公司所有。本网站所有设计图样以及其他图样、产品及服务名称，均为财合税(北京)信息技术有限公司所享有，任何人不得使用、复制或用作其他用途。用户对本网站所使用的软件有非专属性使用权，但不得自行或许可任何第三方复制、修改、出售或衍生产品。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("4.3")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("经由本网站传送的文字、图片、音频、视频及其他内容，受到著作权法、商标法、专利法或其他法律的保护；除该文字、图片、音频、视频及其他内容的上载用户所享有的著作权，未经财合税(北京)信息技术有限公司书面授权许可，第三方不得进行修改、出租、售卖或衍生其他作品。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("4.4")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税(北京)信息技术有限公司对其专有内容、原创内容和其他通过授权取得的独占或者独家内容享有知识产权。未经财合税(北京)信息技术有限公司书面许可，任何单位和个人不得私自转载、传播和提供收听服务或者有其他侵犯财合税(北京)信息技术有限公司知识产权的行为。否则，将承担法律责任。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("4.5")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("除非财合税(北京)信息技术有限公司收到相应通知，财合税(北京)信息技术有限公司将视为用户在起其网站上传或发布的内容的版权所有人。用户点击同意本协议，即表明该用户主动将其在任何时间段在本网站发表的的任何形式内容的著作财产权无偿授权给财合税(北京)信息技术有限公司使用，财合税(北京)信息技术有限公司有权将前述内容进行复制、下载、编辑、修改、展示及网络传播。同时，用户许可财合税(北京)信息技术有限公司有权利就任何主体的侵权而单独提起诉讼，并获得赔偿。本协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于用户在财合税(北京)信息技术有限公司发布的任何受著作权法保护的内容，无论该内容形成于本协议签订前还是签订后。")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("五. 隐私保护")])])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("保护用户隐私是"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("的一项基本政策，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("承诺，未经用户同意，不会以非法形式对外公开或向第三方提供单个用户的个人信息，但下列情况除外：")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.1.1")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("根据有关法律法规的要求；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.1.2")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("按照相关政府主管部门的要求；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.1.3")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("为维护社会公众的利益；")])]),t._v(" "),i("p",{staticStyle:{"margin-bottom":"0","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-size":"12px","font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.1.4")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("为维护"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("的合法权益。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.2"),i("span",{staticStyle:{"text-decoration":"underline"}})]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("同等的保护用户隐私的责任，则"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("有权将用户的注册资料等提供给该第三方。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.3 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("在不透露单个用户隐私资料的前提下，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.4 ")]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("制定了以下四项隐私权保护原则，指导我们如何来处理产品中涉及到用户隐私权和用户信息等方面的问题：")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.4.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("利用我们收集的信息为用户提供有价值的产品和服务。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.4.2")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("开发符合隐私权标准和隐私权惯例的产品。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.4.3")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("将个人信息的收集透明化，并由权威第三方监督。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("5.4.4")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("尽最大的努力保护我们掌握的信息。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("六. 免责声明")])])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("6.1"),i("span",{staticStyle:{"text-decoration":"underline"}})]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("6.2"),i("span",{staticStyle:{"text-decoration":"underline"}})]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("不保证为向用户提供便利而设置的外部链接的准确性和完整性。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("6.3 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("对于因电信系统或互联网网络故障、计算机故障或病毒、信息损坏或丢失、计算机系统问题或其它任何不可抗力原因而产生损失，"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("七. 法律及争议解决")])])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("7.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("本协议的生效、履行、解释及争议的解决均适用中华人民共和国法律。用户因使用"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("而产生或与之相关的一切争议、权利主张或其他事项，均适用中华人民共和国法律。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("7.2 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("因本协议引起的或与本协议有关的任何争议，各方应友好协商解决；协商不成的，任何一方均可将有关争议提交至")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税(北京)信息技术有限公司所在地人民法院管辖")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"26px","line-height":"36px",background:"white"}},[i("strong",[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("八. 其他条款")])])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("8.1 ")]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("如果本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议的其余条款仍应有效并且有约束力。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("8.2"),i("span",{staticStyle:{"text-decoration":"underline"}})]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("有权随时根据有关法律、法规的变化以及公司经营状况和经营策略的调整等修改本协议，而无需另行单独通知用户。用户可随时通过网站浏览最新服务协议条款。当发生有关争议时，以最新的协议文本为准。如果不同意"),i("span",{staticStyle:{"text-decoration":"underline"}},[t._v("财合税专家咨询平台")]),t._v("对本协议相关条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受财合税专家咨询平台对本协议相关条款所做的修改。")])]),t._v(" "),i("p",{staticStyle:{"text-align":"left","text-indent":"24px","line-height":"36px",background:"white"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("8.3"),i("span",{staticStyle:{"text-decoration":"underline"}})]),i("span",{staticStyle:{"text-decoration":"underline"}},[i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("财合税专家咨询平台")])]),i("span",{staticStyle:{"font-family":"仿宋",color:"#5C5C5C"}},[t._v("在法律允许最大范围对本协议拥有解释权与修改权。")])]),t._v(" "),i("p",[i("br")])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"vipTips"},[e("div",{staticClass:"vipTipsCard"},[e("h3",[this._v("\n        您只需绑定手机号，即可成为会员用户\n      ")]),this._v(" "),e("div",{staticClass:"viptips_desc"},[this._v("\n        每天更新的视频小课免费学、问答大厅免费提问，还有更多活动惊喜，敬请期待！\n      ")])])])}]};var o=n("VU/8")(i,a,!1,function(t){n("RfSg")},null,null);e.default=o.exports},n7Jt:function(t,e,n){t.exports=n.p+"static/img/check.349f43b.png"},pGeg:function(t,e,n){t.exports=n.p+"static/img/password.ccdabf3.png"}});