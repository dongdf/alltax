webpackJsonp([43],{PpNH:function(s,t){},ar59:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{searchShow:!1,hisList:[],pnumb:1,psize:15,searchList:[],keywords:"",loadshow:!0,ktype:"",classid:""}},components:{noresult:e("oPJ/").a},mounted:function(){this.getSearchhis(),this.$route.query.kw?(this.classid=this.$route.query.classid?this.$route.query.classid:"",this.ktype=this.$route.query.ktype?this.$route.query.ktype:"",this.keywords=this.$route.query.kw,this.searchResult()):this.$router.push({path:"/home"})},methods:{golijing:function(){var s=this;this.$http.get("user/userService/getUserWeChatVo").then(function(t){if(s.mineInfo=t.data.data,!s.mineInfo.mobile)return s.$messagebox.confirm("请先完善用户信息","提示").then(function(t){s.$router.push("/login")}),!1;"obytr1bx52j2wielziducml8jyno"==s.mineInfo.imId?s.$toast("不能和自己聊天"):s.$router.push({path:"/chat",query:{targetAccount:"obytr1bx52j2wielziducml8jyno"}})})},godetail:function(s){"curriculum"==s.type&&(142==s.classfy_id?this.$router.push({path:"/scourse-detail",query:{id:s.id}}):this.$router.push({path:"/course-detail",query:{id:s.id}})),"knowledge"==s.type&&this.$router.push({path:"/knowledge-detail",query:{id:s.id}}),"question"==s.type&&this.$router.push({path:"/question-detail",query:{questionId:s.id}}),"product"==s.type&&this.$router.push({path:"/service-detail",query:{id:s.id}})},showsearchbox:function(){this.$refs.searchinputbox.focus(),this.searchShow=!0},getSearchhis:function(){var s=this;this.$http.get("knowledge/statuteService/searchHistoryList").then(function(t){s.hisList=t.data.data})},loadMoreitem:function(){this.pnumb++,this.searchResult()},hotSearch:function(s){this.keywords=s.keywords,this.pnumb=1,this.searchList=[],this.searchResult(),this.searchShow=!1},reshearch:function(){if(!this.keywords)return this.$toast("请输入搜索内容"),this.searchShow=!0,!1;this.$router.push({path:"/search",query:{kw:this.keywords,ktype:this.ktype}})},searchResult:function(){var s=this;this.$http.get("knowledge/statuteService/searchPage?type="+this.ktype+"&keyWord="+this.keywords+"&pageNum="+this.pnumb+"&pageSize="+this.psize+"&classfyId="+this.classid).then(function(t){if(0==t.data.data.list.length){if(1==s.pnumb)return!1;s.$toast("没有了"),s.loadshow=!1}else if(s.loadshow=!0,s.searchList.length>0){var e=t.data.data.list;for(var i in e)s.searchList.push(e[i])}else s.searchList=t.data.data.list})}}},a={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",[i("div",{staticClass:"fixedsearchBar"},[i("div",{staticClass:"allSearch"},[i("div",{staticClass:"searchBox",on:{click:s.showsearchbox}},[s._m(0),s._v(" "),i("div",{staticClass:"searchTextBox"},[i("span",{class:s.keywords?"knr":""},[s._v(s._s(s.keywords?s.keywords:"请输入关键字"))])]),s._v(" "),i("div",{staticClass:"cl"})]),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:s.searchShow,expression:"searchShow"}],staticClass:"ppsearch"},[i("div",{staticClass:"ppsearchBox"},[i("div",{staticClass:"searchBox"},[s._m(1),s._v(" "),i("div",{staticClass:"searchTextBox"},[i("input",{directives:[{name:"model",rawName:"v-model",value:s.keywords,expression:"keywords"}],ref:"searchinputbox",attrs:{placeholder:"请输入关键字"},domProps:{value:s.keywords},on:{keyup:function(t){if(!("button"in t)&&s._k(t.keyCode,"enter",13,t.key,"Enter"))return null;s.reshearch()},input:function(t){t.target.composing||(s.keywords=t.target.value)}}})]),s._v(" "),i("div",{staticClass:"cl"})]),s._v(" "),i("span",{staticClass:"canclebtn",on:{click:function(t){s.reshearch()}}},[s._v("搜索")])]),s._v(" "),i("div",{staticClass:"ppsearch_rel"},[i("div",{directives:[{name:"show",rawName:"v-show",value:s.hisList.length>0,expression:"hisList.length>0"}],staticClass:"hotKey"},[i("h3",[s._v("搜索记录")]),s._v(" "),i("p",s._l(s.hisList,function(t){return i("a",{on:{click:function(e){s.hotSearch(t)}}},[i("span",[s._v(s._s(t.keywords))])])})),i("div",{staticClass:"cl"}),s._v(" "),i("p")]),s._v(" "),i("div",{staticClass:"jiqiren"},[i("img",{attrs:{src:e("HP2R")},on:{click:s.golijing}})]),s._v(" "),i("div",{staticClass:"closeSearch",on:{click:function(t){s.searchShow=!1}}},[i("img",{attrs:{src:e("JNLr")}})])])])])]),s._v(" "),i("div",{staticClass:"newSearch"},[i("ul",{staticClass:"slist"},s._l(s.searchList,function(t){return i("li",{on:{click:function(e){s.godetail(t)}}},[t.icon_path?i("div",{staticClass:"spic"},[i("img",{attrs:{src:t.icon_path}})]):s._e(),s._v(" "),i("div",{class:t.icon_path?"sdesc":"sdesc_full"},[i("h3",{staticClass:"searchTitle"},[i("span",{directives:[{name:"show",rawName:"v-show",value:"curriculum"==t.type,expression:"s.type == 'curriculum'"}],staticClass:"stypes",staticStyle:{background:"rgb(229,156,30)"}},[s._v("课程")]),s._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:"question"==t.type,expression:"s.type == 'question'"}],staticClass:"stypes",staticStyle:{background:"rgb(97,199,119)"}},[s._v("问答")]),s._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:"product"==t.type,expression:"s.type == 'product'"}],staticClass:"stypes",staticStyle:{background:"rgb(224,105,73)"}},[s._v("产品")]),s._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:"knowledge"==t.type,expression:"s.type == 'knowledge'"}],staticClass:"stypes",staticStyle:{background:"rgb(194,161,110)"}},[s._v("知识")]),s._v(" "),i("span",{domProps:{innerHTML:s._s(t.highlight_title)}})]),s._v(" "),i("p",{domProps:{innerHTML:s._s(s.$options.filters.cut(t.content,50))}},[s._v("特邀讲师:李培")]),s._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:"curriculum"==t.type,expression:"s.type == 'curriculum'"}],staticClass:"playbtn"},[i("a",[s._v("立即播放")])])]),s._v(" "),i("div",{staticClass:"cl"})])})),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:s.searchList.length>0&&s.loadshow,expression:"searchList.length>0 && loadshow"}],staticClass:"loadMore",on:{click:s.loadMoreitem}},[i("button",[s._v("加载更多...")])]),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==s.searchList.length&&s.keywords,expression:"searchList.length == 0 && keywords"}]},[i("noresult",{attrs:{tipText:"没有找到内容"}}),s._v(" "),i("div",{staticClass:"expertips"},[i("img",{attrs:{src:e("gWmT")},on:{click:s.golijing}})])],1)])])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"searchIcons"},[t("img",{attrs:{src:e("e03G")}})])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"searchIcons"},[t("img",{attrs:{src:e("e03G")}})])}]};var r=e("VU/8")(i,a,!1,function(s){e("PpNH")},"data-v-3463fc0d",null);t.default=r.exports},gWmT:function(s,t,e){s.exports=e.p+"static/img/search_noresult.59e3c5d.png"}});