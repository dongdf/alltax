webpackJsonp([9],{"1uiC":function(t,e,i){t.exports=i.p+"static/img/pro_hb.bee7824.png"},"2YyC":function(t,e,i){t.exports=i.p+"static/img/guanzhuma.734328e.png"},eV9S:function(t,e){},"ei0+":function(t,e,i){t.exports=i.p+"static/img/heart1.608dc77.png"},g7RQ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("bOdI"),s=i.n(a),o=i("k1Tv"),n=i("j+K+"),r=(i("qI5z"),i("Q0Ca")),c={data:function(){return{}},filters:{cut:r.cut},props:["knowledgeListData"],components:{},computed:{},methods:{goToDetail:function(t){this.$router.push({path:"knowledge-detail",query:{id:t.id}})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"knowledge"},[t.knowledgeListData.length>0?i("div",[i("div",{staticClass:"ktitle"},[t._v("相关知识")]),t._v(" "),t._l(t.knowledgeListData,function(e){return i("div",{staticClass:"know-item clearfix",on:{click:function(i){t.goToDetail(e)}}},[i("img",{directives:[{name:"show",rawName:"v-show",value:e.iconPath,expression:"item.iconPath"}],attrs:{src:e.iconPath,alt:""}}),t._v(" "),i("dl",[i("dt",[t._v(t._s(e.title))]),t._v(" "),i("dd",{staticClass:"desc",domProps:{innerHTML:t._s(t.$options.filters.cut(e.summary,50))}},[t._v("{{}}")]),t._v(" "),i("dd",{directives:[{name:"show",rawName:"v-show",value:e.publish_time,expression:"item.publish_time"}],staticClass:"timers"},[[t._v(t._s(e.wh)+"  ")],t._v(t._s(t._f("time")(e.publish_time))+"  ")],2)])])})],2):t._e()])])},staticRenderFns:[]};var d=i("VU/8")(c,l,!1,function(t){i("eV9S")},"data-v-8cb0eafc",null).exports,u={data:function(){var t;return t={playSound:!1,audioPlay:null,isshowma:1,islike:!1,article:{},konwlege:[],cuuiculu:[],goods:[],relInfo:{name:"知识",title:"122"},experts:[{}],aloading:!1},s()(t,"islike",!1),s()(t,"knowledgeListData",[]),t},components:{recommends:o.a,experts:n.a,relknowlege:d},computed:{},methods:{playVoice:function(){this.playSound=!this.playSound;var t=document.getElementById("audioContent2"),e=document.createElement("AUDIO");e.setAttribute("id","my-audio2"),e.setAttribute("controls","controls"),e.setAttribute("controlsList","nodownload"),e.style.width="100%",this.audioPlay||(t.appendChild(e),this.audioPlay=document.getElementById("my-audio2"),this.audioPlay.src=this.article.mp3_path),this.audioPlay.paused?this.audioPlay.play():this.audioPlay.pause()},getisguanzhu:function(){},gohaibao:function(){this.$router.push({path:"/znl",query:{pic:this.article.iconPath,fxtitle:this.article.title,mp3path:this.article.mp3_path}})},actlike:function(){var t=this;this.$http.post("knowledge/knowledgeService/attention",{subData:{knowledgeId:this.$route.query.id}}).then(function(e){1==e.data.code&&(t.islike=!0)})},actunlike:function(){var t=this;this.$http.post("knowledge/knowledgeService/attention/cancel",{subData:{knowledgeId:this.$route.query.id}}).then(function(e){1==e.data.code&&(t.islike=!1)})},getkonwlege:function(){var t=this;this.$http.post("knowledge/knowledgeService/relKnowledges",{subData:{resourceId:this.$route.query.id,pageSize:5,pageNum:1}}).then(function(e){1==e.data.code&&(t.knowledgeListData=e.data.data.list)})},getcuuiculu:function(){var t=this;this.$http.post("knowledge/knowledgeService/relCurriculum",{subData:{resourceId:this.$route.query.id,pageSize:5,pageNum:1}}).then(function(e){1==e.data.code&&(t.cuuiculu=e.data.data.list)})},getgoods:function(){var t=this;this.$http.post("knowledge/knowledgeService/relGoods",{subData:{resourceId:this.$route.query.id,pageSize:5,pageNum:1}}).then(function(e){1==e.data.code&&(t.goods=e.data.data.list)})},getexperts:function(){var t=this;this.$http.post("knowledge/knowledgeService/relExpert",{subData:{resourceId:this.$route.query.id,pageSize:5,pageNum:1}}).then(function(e){1==e.data.code&&(t.experts=e.data.data.list)})},addhis:function(){var t=this;this.$http.post("knowledge/knowledgeService/relExpert",{subData:{knowledgeId:this.$route.query.id,pageSize:5,pageNum:1}}).then(function(e){t.experts=e.data.data.list})}},mounted:function(){var t=this;this.getisguanzhu(),this.$http.post("knowledge/knowledgeService/detail",{subData:{knowledgeId:this.$route.query.id}}).then(function(e){1!=e.data.code&&t.$router.replace({path:"/noresource"}),console.log(e.data),t.article=e.data.data,t.relInfo.title=t.article.title,t.relInfo.id=t.$route.query.id,t.aloading=!0,t.article.like?t.islike=!0:t.islike=!1;var i=t.article.title;t.article.mp3_path&&(i="【附语音】"+i);var a={type:1,title:i,desc:"财合税专家咨询平台",link:"/#/knowledge-detail?id="+t.$route.query.id,imgUrl:t.article.iconPath?t.article.iconPath:"https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg"},s={type:1,title:i,desc:"财合税专家咨询平台",link:"/#/knowledge-detail?id="+t.$route.query.id,imgUrl:t.article.iconPath?t.article.iconPath:"https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg"};t.$parent.shareTimePage(s),t.$parent.shareAppPage(a),128==t.article.type&&t.article.mp3_path&&t.playVoice()}),this.getgoods(),this.getkonwlege(),this.getcuuiculu(),this.getgoods(),this.getexperts()}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"know-detail"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.aloading,expression:"!aloading"}]},[a("img",{staticStyle:{width:"100%"},attrs:{src:i("riRI")}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.aloading,expression:"aloading"}],staticClass:"article"},[a("h1",[t._v(t._s(t.article.title)+"\n\t\t"),a("p",{staticStyle:{"text-align":"center","font-weight":"normal",color:"#666"}},[t._v(t._s(t._f("timeNumb")(t.article.publish_time,"yyyy-MM-dd")))]),t._v(" "),t.article.mp3_path?a("div",{staticClass:"voice"},[a("div",{staticClass:"voicec",on:{click:t.playVoice}},[a("div",{staticClass:"playSoundPic"},[a("img",{class:t.playSound?"playSounding":"",attrs:{src:i("ae2b")}})])])]):t._e()]),t._v(" "),a("div",{staticClass:"detail"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.article.wh,expression:"article.wh"}],staticClass:"falv"},[a("p",{staticStyle:{color:"red"}},[t._v("\n            文号："+t._s(t.article.wh)+"\n          ")]),t._v(" "),a("p",[t._v("\n            发文时间："+t._s(t._f("timeNumb")(t.article.publish_time,"yyyy-MM-dd"))+"\n          ")]),t._v(" "),a("p",{staticStyle:{color:"red"}},[t._v("\n            效力："+t._s(1==t.article.yxbz?"有效":"无效")+"\n          ")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:2==t.article.yxbz,expression:"article.yxbz == 2"}],staticStyle:{color:"red"}},[t._v("\n            失效时间："+t._s(t._f("timeNumb")(t.article.sx_time,"yyyy-MM-dd"))+"\n          ")])]),t._v(" "),a("div",{staticClass:"txt",attrs:{id:"procontent"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.article.content,expression:"!article.content"}],attrs:{id:"zhe"}},[a("span",[a("router-link",{attrs:{to:{path:"/knowledgeCard",query:{ctype:2}}}},[t._v("购买查看全部知识")])],1)]),t._v(" "),a("div",{attrs:{id:"zhishi"},domProps:{innerHTML:t._s(t.article.content?t.article.content:t.article.summary)}},[t._v("\n            知识正文\n          ")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.article.sz,expression:"article.sz"}],staticClass:"bq_items"},[t._v("标签:"+t._s(t.article.sz)+" "+t._s(t.article.industry))]),t._v(" "),a("div",{staticClass:"lbtn"},[a("div",{staticClass:"guanzhu"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.islike,expression:"!islike"}],staticClass:"ht",on:{click:function(e){t.actlike()}}},[t._m(0),t._v(" "),a("p",[t._v("关注")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.islike,expression:"islike"}],staticClass:"ht",on:{click:function(e){t.actunlike()}}},[t._m(1),t._v(" "),a("p",[t._v("已关注")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.article.iconPath,expression:"article.iconPath"}],staticClass:"haibao",on:{click:function(e){t.gohaibao()}}},[t._m(2),t._v(" "),a("p",[t._v("海报")])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isshowma,expression:"!isshowma"}],staticClass:"guanzhuma"},[a("img",{attrs:{src:i("2YyC")}})])])]),t._v(" "),a("relknowlege",{attrs:{knowledgeListData:t.knowledgeListData}}),t._v(" "),a("experts",{attrs:{expertInfo:t.experts,relInfo:t.relInfo}}),t._v(" "),a("recommends",{attrs:{konwlege:t.konwlege,cuuiculu:t.cuuiculu,goods:t.goods}}),t._v(" "),a("div",{attrs:{id:"audioContent2"}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cimg"},[e("img",{attrs:{src:i("ei0+")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cimg"},[e("img",{attrs:{src:i("oGj3")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cimg"},[e("img",{attrs:{src:i("1uiC")}})])}]};var p=i("VU/8")(u,h,!1,function(t){i("yIH6")},"data-v-6057781c",null);e.default=p.exports},oGj3:function(t,e,i){t.exports=i.p+"static/img/heart.3ecbc99.png"},riRI:function(t,e,i){t.exports=i.p+"static/img/sending.3c3e278.jpg"},yIH6:function(t,e){}});