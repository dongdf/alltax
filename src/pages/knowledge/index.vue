<!-- 知识列表 -->
<template>
    <div id="knowledge">
        <!--<ul class="header clear">-->
            <!--<li class=" ar-l" @click="goToSchool">大讲堂</li>-->
            <!--<li class="ar-l active">知识库</li>-->
            <!--<li class="ar-r" ><img src="./imgs/icon6.png"></li>-->
        <!--</ul>-->
      <msearch :ktype="'knowledge'"  :searchTips="'请输入知识关键字'"></msearch>
      <div class="quickBar">
        <ul>

          <li><div class="q_item q_item_c" ><img src="./imgs/courseQuick2.png"/><h3>查税法</h3><p >财税知识经典案例</p></div></li>
          <li class=""><div class="q_item  "   @click="goAsk"><img src="./imgs/courseQuick1.png"/><h3>李静讲税法</h3><p  >一对一在线解决问题</p></div></li>
          <!--<li><div class="q_item"><img src="./imgs/quick3.png"/><h3>区域专家</h3><p>您身边的财税专家</p></div></li>-->
          <div class="cl"></div>
        </ul>

      </div>


        <div class="banner" >
            <!--<div class="swiper-container knowledgeBanner">-->
                <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide" @click="bannerGo(s)" v-for="s in bannerList"><img style="width:100%;" :src="s.img_url" alt=""></div>-->

                <!--</div>-->
                <!--<div class="swiper-pagination"></div>-->
            <!--</div>-->
            <mt-swipe :auto="4000">
                <mt-swipe-item @click.native="bannerGo(s)" v-for="(s,key) in bannerList" :key="s.id"><img style="width:100%; height: 100%;" :src="s.img_url" alt=""></mt-swipe-item>

            </mt-swipe>
        </div>

        <ul class="box2 clear">
            <li v-for="item in classType" @click="goknList(item)" class="ar-l fivef" >

                <img :src="item.shortcytIcon">
                <div>{{item.shortcutName}}</div>

            </li>
        </ul>

        <ul class="box3 clear">
            <!-- <li class="active ar-l">热门</li>
            <li class="ar-l">最新</li>
            <li class="ar-l">推荐</li> -->
            <li :class="{active:active==0}" class="ar-l" @click="getkno(0)">热门</li>
            <li :class="{active:active==1}" class="ar-l"  @click="getkno(1)">最新</li>
            <li :class="{active:active==2}" class="ar-l"  @click="getkno(2)">推荐</li>
        </ul>
      <!--<ul  v-infinite-scroll="loadMoreitem"-->
           <!--infinite-scroll-disabled="isall"-->
           <!--infinite-scroll-distance="0">-->
        <knowledgeList :knowledgeListData=knowledgeListData></knowledgeList>
      <!--</ul>-->
      <!--<div class="loading-bar">-->
        <!--<svg class="icon icon-loading"-->
        <!--aria-hidden="true">-->
        <!--<use xlink:href="#icon-loading"></use>-->
        <!--</svg>-->

        <!--<span v-show="!isall">加载中...</span>-->
        <!--<span v-show="isall">没有了</span>-->
      <!--</div>-->
        <div @click ="loadMoreitem" v-show="knowledgeListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <tabbar active=1></tabbar>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import knowledgeList from '../../components/knowledgeList'
import msearch from '../../components/msearch'
export default {
    data() {
        return {
            active:1,
            classType: [],
          isall:false,
            knowledgeListData: [],
           loadshow:true,
          pnumb:"1",
          psize:"15",
          bannerList:[]
        }
    },

    components: {
        tabbar,
        knowledgeList,
      msearch
    },
    computed: {

    },
    methods: {
      goAsk(){
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
      goknList(item){
        if(item.id == 127){
          this.$router.push({path:'/law-list',query:{id:item.id,name:item.classfyName}})
        }else{
          this.$router.push({path:'/knowledge-list',query:{id:item.id,name:item.classfyName}})
        }
      },
      getkno(str){
        this.active = str;
        this.knowledgeListData = [];
        this.loadshow = true;
        if(this.active == 0){
          this.pnumb=1;
          this.knowledgeHot();
        }
        if(this.active == 1){
          this.pnumb=1;
          this.knowledgeNew();
        }
        if(this.active == 2){
          this.pnumb=1;
          this.knowledgeRec();
        }
      },
      loadMoreitem(){
        // console.log(this.$route.name);
        if(this.$route.name == 'Knowledge'){
          // setTimeout(()=>{

            if(this.active == 0){
              this.pnumb++;
              this.knowledgeHot();
            }
            if(this.active == 1){
              this.pnumb++;
              this.knowledgeNew();
            }
            if(this.active == 2){
              this.pnumb++;
              this.knowledgeRec();
            }

          // })
        }

      },
        goToSchool(){
            this.$router.push({ path: 'school', query: this.$route.query })
        },
        goToList(typeId) {
            this.$router.push({
                path: 'knowledge-list',
                query: { typeId: typeId }
            })
        },
        goToDetail() {
            this.$router.push({ path: 'knowledge-detail', query: this.$route.query })
        },
        goToCourse() {
            this.$router.push({ path: 'course-detail', query: this.$route.query })
        },
        knowledgeHot() {
            this.active=0;
            this.$http.post('knowledge/knowledgeService/list', {
                "subData":{
                  "pageNum":this.pnumb,
                  "pageSize":this.psize,
                  "sortRule":"visit"
                }
            }).then(res =>{

                // this.knowledgeListData = res.data.data.list
          if(res.data.data.list.length == 0){
            // this.$toast('没有了');
            this.loadshow = false;
            return false;
          }
          if(this.knowledgeListData.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.knowledgeListData.push(moreItem[i])
            }

          }else{
            this.knowledgeListData = res.data.data.list;
          }
            })
        },
        knowledgeNew() {
            this.active=1;
            this.$http.post('knowledge/knowledgeService/list', {
                "subData":{
                  "pageNum":this.pnumb,
                  "pageSize":this.psize,
                  "sortRule":"newest"
                }
            }).then(res => {
              if(res.data.data.list.length == 0){
            // this.$toast('没有了');
            this.loadshow = false;
            return false;
          }
          if(this.knowledgeListData.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.knowledgeListData.push(moreItem[i])
            }

          }else{
            this.knowledgeListData = res.data.data.list;
          }

            })
        },
        knowledgeRec() {
            this.active=2;
            this.$http.post('knowledge/knowledgeService/list', {
                "subData":{
                  "pageNum":this.pnumb,
                  "pageSize":this.psize,
                  "sortRule":"recommend"
                }
            }).then(res => {
              if(res.data.data.list.length == 0){
            // this.$toast('没有了');
            this.loadshow = false;
            return false;
          }
          if(this.knowledgeListData.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.knowledgeListData.push(moreItem[i])
            }

          }else{
            this.knowledgeListData = res.data.data.list;
          }
            })
        },
      getBanner(){
        this.$http.post('activity/activityService/banner/findList',{subData:2}).then(res=>{

          this.bannerList = res.data.data;


      })

      },
      bannerGo(obj){
        if(!obj.img_link.trim()){
          return false;
        }
        location.href = obj.img_link;
      }
    },


    mounted() {
      this.getBanner();

        this.$http.post('knowledge/knowledgeService/shortCut/list', {}).then(res => {
            this.classType = res.data.data
        })
        this.knowledgeNew();


      var shareJson={
        type:1,
        title:'我仿佛沉浸在知识的海洋里无法自拔',
        desc:'最新财税法政策解读，最热行业案例分享',
        link:'/#/knowledge',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'我仿佛沉浸在知识的海洋里无法自拔',
        desc:'最新财税法政策解读，最热行业案例分享',
        link:'/#/knowledge',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);

        //设置轮播图

    }
}
</script>
<style lang="scss" scoped>
  .quickBar{
    background:#FFF;
    margin-bottom: 15px;
    padding:10px 0;
    ul{
      padding:10px;
      li{

        float:left;
        width:50%;


        .q_item{
          background: #FFF;
          margin:10px;
          padding:20px 20px;
          height:120px;
          box-shadow: 0 2px 5px #dcdcdc;
          border:2px solid #EEE;
          border-radius: 10px;
          img{float:left;
            margin-left:10px;
            position: relative;
            top:5px;
            width:50px;}
          p{
            font-size:20px;
            padding-left:70px;
            color:#999;
          }
          h3{
            font-weight: normal;
            color:#313131;
            font-size:30px;
            position: relative;

            padding-left:70px;
          }
          border-top:6px solid #FFF;

        }
        .q_item_c{
          border-top:6px solid #C9A063;
        }
        .one{
          height:150px;
          padding-top:40px;
          margin-top:60px;
        }
      }
    }
  }
    .loadMore {text-align: center; background:#EEE; padding:20px;}
#knowledge {
    background: #f6f6f6;
    padding-bottom: 120px;
}


.header {
    width: 750px;
    height: 90x;
    padding-left: 80px;
    margin-bottom: 2px;
    li {
        height: 90px;
        line-height: 90px;
        font-size: 34px;
        color: #999;
        text-align: center;

        &.ar-l {
            width: 212px;
        }
        &.ar-l:first-child {
            margin-right: 70px;
        }
        &.ar-r {
            width: 110px;
            border-left: 1px solid #eee;
            img {
                width: 40px;
                margin-top: 24px;
            }
        }
    }
}

.active {
    color: #C9A063 !important;
    border-bottom: 4px solid #C9A063;
}

.box2 {
    margin-bottom: 10px;
    padding: 32px 0 24px 0px;
    background: #fff;
  .fivef{float:left; width:20%; margin-right:0;}
    li {
        text-align: center;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
    div {
        color: #2F2F2F;
        font-size: 28px;
        margin-top: 10px;
    }
}

.box3 {
    padding-left: 24px;
    border-bottom: 2px solid #ddd;
    background: #fff;
    li {
        width: 212px;
        line-height: 90px;
        height: 90px;
        text-align: center;
        margin-right: 33px;
        color: #2F2F2F;
        font-size: 30px;
        &:last-child {
            margin-right: 0;
        }
    }
}







.banner {
    height: 360px;
    margin-bottom: 24px;

    .swiper-container {
        height: 100%;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .bullet {
        display: inline-block;
        width: 40px;
        height: 4px;
        background-color: #aaa;
        margin: 0 8px;

        &.bullet-active {
            background-color: #fff;
        }
    }
}


.knowledge {
    background-color: #f6f6f6;

    .know-item {
        background-color: #fff;
        margin-bottom: 24px;
        padding: 24px;
    }

    img {
        float: left;
        width: 226px;
        height: 226px;
        border-radius: 8px;
        margin-right: 24px;
    }

    dt {
        font-size: 28px;
        color: #333;
        line-height: 40px;
        padding-top: 4px;
    }

    .t {
        font-size: 24px;
        color: #555;
        line-height: 34px;
        margin: 20px 0 14px;

        span {
            color: #333;
            font-size: 24px;
        }
    }
    .desc {
        font-size: 24px;
        color: #666;
        line-height: 34px;
    }
}
</style>
