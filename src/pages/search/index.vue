<template>
    <div>
      <div class="fixedsearchBar">
      <div class="allSearch" style="">
        <div class="searchBox"  @click="showsearchbox">
          <div class="searchIcons" ><img src="../course/imgs/searchIcons.png"></div>
          <div class="searchTextBox"><span :class="keywords?'knr':''">{{keywords?keywords:'请输入关键字'}}</span></div>
          <div class="cl"></div>
        </div>
        <div class="ppsearch" v-show="searchShow">
          <div class="ppsearchBox">
            <div class="searchBox">
              <div class="searchIcons"><img src="../course/imgs/searchIcons.png"></div>
              <div class="searchTextBox"><input ref="searchinputbox" v-model="keywords"  @keyup.enter="reshearch()" placeholder="请输入关键字"/></div>
              <div class="cl"></div>
            </div>
            <span class="canclebtn" @click="reshearch()">搜索</span>
          </div>
          <div class="ppsearch_rel">
            <div v-show="hisList.length>0" class="hotKey">
              <h3>搜索记录</h3>
              <p>
                <a @click="hotSearch(k)" v-for="k in hisList"><span>{{k.keywords}}</span></a>

              <div class="cl"></div>
              </p>
            </div>

            <div class="jiqiren">
              <img @click="golijing" src="../course/imgs/search_tips.png"/>
            </div>

            <div class="closeSearch" @click="searchShow = false"><img src="../../components/imgs/closeSearch.png"/></div>
          </div>


        </div>

      </div>
      </div>
      <div class="newSearch">
        <ul class="slist">
          <li v-for="s in searchList" @click="godetail(s)">
            <div class="spic" v-if="s.icon_path">
              <img :src="s.icon_path">
            </div>
            <div :class="s.icon_path?'sdesc':'sdesc_full'">
              <h3 class="searchTitle">
                <span class="stypes" style="background:rgb(229,156,30) " v-show="s.type == 'curriculum'">课程</span>
              <span class="stypes" style="background:rgb(97,199,119) " v-show="s.type == 'question'">问答</span>
              <span class="stypes" style="background:rgb(224,105,73) " v-show="s.type == 'product'">产品</span>
              <span class="stypes" style="background:rgb(194,161,110) " v-show="s.type == 'knowledge'">知识</span>
              <span  v-html="s.highlight_title"></span>
              </h3>
              <p v-html="$options.filters.cut(s.content,50)">特邀讲师:李培</p>
              <p v-show="s.type == 'curriculum'" class="playbtn"><a>立即播放</a></p>
            </div>
            <div class="cl"></div>
          </li>


          <!--<li >-->
            <!--<div class="spic" >-->
              <!--<img src="http://ttslbcs.oss-cn-beijing.aliyuncs.com/xtpt/default/6ddb10bd-5bfe-4c83-9660-194676354ce9/RiJBDtr3Ep2256Khk8Cnxm2JD4XmQGid.png">-->

            <!--</div>-->
            <!--<div class="sdesc sdesc_full">-->
              <!--<h3  >索索内</h3>-->
              <!--<p  >特邀讲师:李培</p>-->
              <!--<p class="playbtn" ><a>立即播放</a></p>-->
            <!--</div>-->
            <!--<div class="cl"></div>-->
          <!--</li>-->





        </ul>
        <div @click ="loadMoreitem" v-show="searchList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <div  v-show="searchList.length == 0 && keywords">
          <noresult :tipText="'没有找到内容'"></noresult>
          <div class="expertips">
            <img @click="golijing" src="../course/imgs/search_noresult.png"/>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
  import noresult from '@/components/noresult'
export default {
    data() {
        return {
          searchShow:false,
          hisList:[],
          pnumb:1,
          psize:15,
          searchList:[],
          keywords:'',
          loadshow:true,
          ktype:'',
          classid:''
        }
    },
    components:{noresult},
    mounted(){

      this.getSearchhis();
      if(this.$route.query.kw){
        this.classid = this.$route.query.classid?this.$route.query.classid:'';
        this.ktype = this.$route.query.ktype?this.$route.query.ktype:'';
        this.keywords = this.$route.query.kw;
        this.searchResult();

      }else{
        this.$router.push({path:'/home'})
      }

    },
    methods: {
      golijing(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
          if(!this.mineInfo.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }
          if(this.mineInfo.imId =='obytr1bx52j2wielziducml8jyno'){
            this.$toast('不能和自己聊天')
          }else{
            this.$router.push({path:'/chat',query:{targetAccount:'obytr1bx52j2wielziducml8jyno'}});

          }
        })

      },
      godetail(obj){
        if(obj.type == 'curriculum'){
          if(obj.classfy_id ==142){
            this.$router.push({path:'/scourse-detail',query:{id:obj.id}});
          }else{
            this.$router.push({path:'/course-detail',query:{id:obj.id}});
          }

        }
        if(obj.type == 'knowledge'){
          this.$router.push({path:'/knowledge-detail',query:{id:obj.id}});
        }
        if(obj.type == 'question'){
          this.$router.push({path:'/question-detail',query:{questionId:obj.id}});
        }
        if(obj.type == 'product'){
          this.$router.push({path:'/service-detail',query:{id:obj.id}});
        }
      },
      showsearchbox(){
        // this.$searchinputbox.focus();
        this.$refs.searchinputbox.focus()
        this.searchShow = true;
      },
      getSearchhis(){
        this.$http.get('knowledge/statuteService/searchHistoryList').then(res=>{
          this.hisList = res.data.data;
        })
      },
      loadMoreitem(){
        this.pnumb++;
        this.searchResult();
      },
      hotSearch(obj){
        this.keywords = obj.keywords;
        this.pnumb = 1;
        this.searchList = [];
        this.searchResult();
        this.searchShow = false;
      },
      reshearch(){
        if(!this.keywords){
          this.$toast('请输入搜索内容');
          this.searchShow = true;
          return false;
        }
        this.$router.push({path:'/search',query:{kw:this.keywords,ktype:this.ktype}})

        // this.pnumb = 1;
        // this.searchList = [];
        // this.searchResult();
        // this.searchShow = false;
      },
      searchResult(){

        this.$http.get('knowledge/statuteService/searchPage?type='+this.ktype+'&keyWord='+this.keywords+'&pageNum='+this.pnumb+'&pageSize='+this.psize+'&classfyId='+this.classid).then(res=>{
          if(res.data.data.list.length == 0){

            if(this.pnumb == 1){
              return false;
            }
            this.$toast('没有了');
            this.loadshow = false;
          }else{
            this.loadshow = true;
            if(this.searchList.length>0){
              var tmp = res.data.data.list;
              for(var i in tmp ){
                this.searchList.push(tmp[i]);
              }
            }else{
              this.searchList = res.data.data.list;
            }
          }

        })
      }

    }
}
</script>
<style lang="scss" scoped>
  .expertips{
    img{
      width:100%;
    }
  }
  .newSearch{
    ul.slist{
      padding-top:100px;
      li{
        background: #FFF;
        padding:30px 20px;
        border-top:1px solid #eee;
        display: flex;
        .spic{

          width: 260px;
          height: 180px;
          overflow: hidden;
          border-radius: 10px;
          margin-right: 20px;
          img{
            width:100%;
            height:100%;

          }

        }

        .sdesc{
          width: 460px;
          position: relative;


          h3{

            font-weight: normal;
            font-size:30px;
            padding-bottom: 10px;

            b{
              color:red;
            }
            span.stypes{


              left:0;
              font-size:20px;
              color:#FFF;
              padding: 2px 10px 1px 10px;
              position: relative;
              top:-4px;
              display: inline-block;

              border-radius:5px;
            }
          }
          p{
            color:#999;
            font-size:20px;
          }
          .playbtn{
            text-align: right;
            padding-top:40px;
            a{
              padding:10px 20px;
              background: #b5935c;
              color:#FFF;
              border-radius: 5px;
            }
          }
        }
        .sdesc_full{
          width:700px;
          position: relative;


          h3{
            font-weight: normal;
            font-size:30px;
            padding-bottom: 10px;
            span.stypes{
display: inline-block;
              font-size:20px;
              color:#FFF;
              padding:2px 10px 1px 10px;
              position: relative;
              top:-4px;


              border-radius:5px;
            }
            b{
              color:red;
            }
          }
          p{
            color:#999;
            font-size:20px;

          }
          .playbtn{
            text-align: right;
            padding-top:40px;
            a{
              padding:10px 20px;
              background: #b5935c;
              color:#FFF;
              border-radius: 5px;
            }
          }
        }
      }
    }

  }
  .fixedsearchBar{
    border-bottom: 2px solid #DDD;
    position: fixed;
    width:100%;
    background: #FFF;
    z-index: 9;
    left:0;
    top:0;
  }
  .allSearch{
    position: relative;
    background:#FFF;

    padding:20px;
    .searchBox{
      background: #F6F6F6;
      width:700px;
      padding:15px;
      overflow: hidden;
      border-radius: 10px;
      .searchIcons{
        width:35px;
        height:35px;
        float:left;
        img{
          width:100%;
          height:100%;
          opacity: .4;
        }
      }
      .searchTextBox{
        float:left;
        width:500px;
        .knr{color:#333}
        span{color:#CCC; display: block;
          position: relative; top:-3px;  padding-left:10px;}
        input{
          background: #F6F6F6;
          border:none;
          position:relative; top:2px;;
          width:100%;
          margin-left:10px;

        }
      }

    }
    .ppsearch{
      position: fixed;
      width:100%;
      height:100%;
      left:0;
      top:0;
      background: rgba(0,0,0,.5);
      z-index: 99;
      .ppsearchBox{
        position: relative;
        .canclebtn{
          position:absolute;
          top:30px;
          right:25px;
        }
        background: #FFF;
        padding:20px;
        .searchBox{
          background: #F6F6F6;
          width:620px;
          padding:15px;
          overflow: hidden;
          border-radius: 10px;
          .searchIcons{
            width:35px;
            height:35px;
            float:left;
            img{
              width:100%;
              height:100%;
              opacity: .4;
            }
          }
          .searchTextBox{
            float:left;
            width:500px;
            input{
              background: #F6F6F6;
              border:none;
              width:100%;
              margin-left:10px;

            }
          }

        }
      }
      .ppsearch_rel{
        background:#FFF;
        padding:20px;
        position: relative;
        .closeSearch{
          width:80px;
          height:80px;
          bottom:-150px;

          position: absolute;
          margin-left:-40px;
          left:50%;
          img{
            width:100%;
            height:100%;
          }
        }
        .hotKey{
          p{
            a{
              display: block;float:left;
              margin:15px 20px 0 0px;
              span{
                white-space: nowrap;
                border:1px solid #EEE;
                padding:5px 10px;
              }
            }
          }
        }
        .jiqiren{
          margin:25px 10px 0 10px;
          border-top:1px solid #EEE;
          padding:20px 0;
          text-align: center;
          img{
            width:100%;
          }
          p{
            color:#ff6600;
            font-weight: bold;
            font-size: 30px;
          }
        }
      }
    }

  }
</style>
