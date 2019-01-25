<!-- 课程主页 -->

<template>
    <div id="school" style=" ">
        <!--<ul class="header clear">-->
            <!--<li class="active ar-l">大讲堂</li>-->
            <!--<li class="ar-l" @click="goToKnowledge">知识库</li>-->
            <!--&lt;!&ndash;<li class="ar-r" @click="goToSearch"><img src="./imgs/icon6.png"></li>&ndash;&gt;-->
        <!--</ul>-->

<msearch :ktype="'curriculum'" :searchTips="'请输入课程名称或专家姓名'"></msearch>

      <div class="quickBar">
        <ul>
          <li class="">
            <div class="q_item q_item_c " ><img src="./imgs/courseQuick1.png"/><h3>大讲堂</h3><p>权威专家授课分享</p></div></li>
          <li><div class="q_item" @click="goToSishu"><img src="./imgs/courseQuick3.png"/><h3>财税私塾</h3><p>高端课程大咖培训</p><label class="newsicon">NEW</label></div></li>
          <!--<li><div class="q_item"><img src="./imgs/quick3.png"/><h3>区域专家</h3><p>您身边的财税专家</p></div></li>-->
          <div class="cl"></div>
        </ul>

      </div>

      <div class="cbanner" v-show="bannerList.length>0">
      <mt-swipe :auto="4000">
        <mt-swipe-item @click.native="bannerGo(s)" v-for="(s,key) in bannerList" :key="s.id"><img style="width:100%; height: 100%;" :src="s.img_url" alt=""></mt-swipe-item>

      </mt-swipe>
      </div>

        <!-- 热门分类 -->
        <ul class="box2 clear" v-show="classType.length>0">
            <li v-for="item in classType" class="ar-l fivef" @click="golists(item)">
                <img :src="item.shortcytIcon">
                <div>{{item.shortcutName}}</div>
            </li>
        </ul>

        <!-- 课程列表分类 -->
        <ul class="box3 clear">
            <li :class="{active:active==0}" class="ar-l" @click="changeTab(0)">热门</li>
            <li :class="{active:active==1}" class="ar-l" @click="changeTab(1)">最新</li>
            <li :class="{active:active==2}" class="ar-l" @click="changeTab(2)">精品</li>
        </ul>


        <!--<ul  v-infinite-scroll="loadMoreitem"-->
             <!--infinite-scroll-disabled="isall"-->
             <!--infinite-scroll-distance="0">-->
        <courseList :courseListData=courseListData></courseList>
      <!--</ul>-->

        <!--<div class="loading-bar">-->
          <!--&lt;!&ndash;<svg class="icon icon-loading"&ndash;&gt;-->
               <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
            <!--&lt;!&ndash;<use xlink:href="#icon-loading"></use>&ndash;&gt;-->
          <!--&lt;!&ndash;</svg>&ndash;&gt;-->

          <!--<span v-show="!isall">加载中...</span>-->
          <!--<span v-show="isall">没有了</span>-->
        <!--</div>-->

        <div @click ="loadMoreitem" v-show="courseListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <tabbar active=1></tabbar>

    </div>
</template>
<script>

import tabbar from '../../components/tabbar'
import live from '../../components/live'
import courseList from '../../components/courseList'
import { time } from '@/filters/index'
import msearch from '../../components/msearch'
import {REDIRECT_URL} from '../../constants'
import PullTo from 'vue-pull-to'
export default {
    data() {
        return {
            bannerList:[],
            active: 1,
            classType: [],
          isall:false,
            courseListData: [],
            liveData:{},
          searchShow:false,
            //获取最新列表
            listParam:{
                "subData": {
                    "pageNum": 1,
                    "pageSize": 20,
                    "classfyId": '',
                    "requestType": 1 //请求类型 0直播，1最新列表，2最热，3推荐,4筛选排序
                }
            },
          loadshow:true
        }
    },
    filters: {
        time
    },

    components: {
        tabbar,
      PullTo,
        courseList,
        live,
      msearch
    },
    computed: {

    },
    methods: {
      loadmore(){
        console.log('loadings')
      },
      golists(obj){
        if(obj.id == 129){
          this.$router.push({path:'/cwrjhome'})
        }else{
          this.$router.push({path:'/course-list',query:{name:obj.classfyName,id:obj.id}})
        }

      },
      loadMoreitem(){
        this.isall=true;
        if(this.$route.name == 'School'){
          // setTimeout(()=>{
            this.listParam.subData.pageNum++;
            if(this.active==0){
              this.listParam.subData.requestType = 2;
              this.courseHot();
            }
            if(this.active==1){
              this.listParam.subData.requestType = 1;
              this.courseNew();
            }
            if(this.active==2){
              this.listParam.subData.requestType = 3;
              this.courseRec();
            }

          // },1000)
        }


      },
      changeTab(idx){
        this.active  = idx;
        this.isall =false;
        this.listParam.subData.pageNum=1;
        this.courseListData = [];

        if(this.active==0){
          this.listParam.subData.requestType = 2;
          this.courseHot();
        }
        if(this.active==1){
          this.listParam.subData.requestType = 1;
          this.courseNew();
        }
        if(this.active==2){
          this.listParam.subData.requestType = 3;
          this.courseRec();
        }

      },
        courseHot() {
            this.active=0;
            this.listParam.subData.requestType=2;

            this.$http.post('curriculum/curriculumService/list', this.listParam).then(
             res => {

               this.loadshow = true;
               if(res.data.data.list.length == 0){
                 if(this.listParam.subData.pageNum>1){
                   // this.$toast('没有了');
                   this.isall=true;
                 }
                 this.loadshow = false;
               }else{

                 if(this.courseListData.length>0){
                   var temp = res.data.data.list;
                   for(var i in temp){
                     this.courseListData.push(temp[i]);
                   }
                 }else{

                   this.courseListData = res.data.data.list
                 }
               }

            })
        },

        courseNew() {
            this.active=1;
            this.listParam.subData.requestType=1;
             this.$http.post('curriculum/curriculumService/list', this.listParam).then(
             res => {
               this.loadshow = true;
               if(res.data.data.list.length == 0){
                 if(this.listParam.subData.pageNum>1){
                   // this.$toast('没有了')
                   this.isall=true;
                 }
                 this.loadshow = false;
               }else{

                 if(this.courseListData.length>0){
                   var temp = res.data.data.list;
                   for(var i in temp){
                     this.courseListData.push(temp[i]);
                   }
                 }else{
                   this.courseListData = res.data.data.list
                 }
               }

             })
        },

        courseRec() {
            this.active=2;
            this.listParam.subData.requestType=3;
            this.$http.post('curriculum/curriculumService/list', this.listParam).then(
             res => {
               this.loadshow = true;
               if(res.data.data.list.length == 0){
                 if(this.listParam.subData.pageNum>1){
                   // this.$toast('没有了')
                   this.isall=true;
                 }
                 this.loadshow = false;
               }else{

                 if(this.courseListData.length>0){
                   var temp = res.data.data.list;
                   for(var i in temp){
                     this.courseListData.push(temp[i]);
                   }
                 }else{
                   this.courseListData = res.data.data.list
                 }
               }

             })
        },

        goToKnowledge() {
            this.$router.push({ path: 'knowledge', query: this.$route.query })
        },
      goToSishu() {
        this.$router.push({ path: 'scourse-list', query: this.$route.query })
      },

        goToList(typeId){
            this.$router.push({
                path: 'course-list',
                query:{
                    typeId:typeId
                }
            })
        },





        goToSearch() {
          alert('功能开发中，敬请期待')
            // this.$router.push({ path: 'search', query: this.$route.query })
        },
        getclass(){
          //获取分类图标名称
              this.$http.post('curriculum/curriculumService/shortCut/list', {}).then(
                res => {
                if (res.data.code == 1) {
                this.classType = res.data.data
              } else {}
            }
            )
        },
      bannerGo(obj){
        if(obj.img_link.indexOf('http')<0){
          return false;
        }
        location.href = obj.img_link;
      },
      getBanner(){
        this.$http.post('activity/activityService/banner/findList',{subData:4}).then(res=>{

          this.bannerList = res.data.data;
          // let swiper = new Swiper('.swiper-container', {
          //   speed: 400,
          //   autoplay: true,
          //   pagination: {
          //     el: '.swiper-pagination',
          //     bulletClass: 'bullet',
          //     bulletActiveClass: 'bullet-active',
          //   }
          // })


        })

      }
    },
    mounted() {
      this.getBanner();

      if(this.active == 0){
        this.courseHot();
      }
      if(this.active == 1){
        this.courseNew();
      }
      if(this.active == 2){
        this.courseRec();
      }

      this.getclass();

        //直播信息
        // this.$http.post('curriculumService/list', {
        //     "subData": {
        //             "pageNum": 1,
        //             "pageSize": 5,
        //             "classfyId": null,
        //             "requestType": 0
        //         }
        //     }).then(res => {
        //         console.log(JSON.stringify(res.data.data[1]));
        //         this.liveData = res.data.data[1]
        //     }
        // )

        // //课程列表
        // this.$http.post('curriculum/curriculumService/list', this.listParam).then(
        //     res => {
        //          //console.log(res.data)
        //         this.courseListData = res.data.data
        //     }
        // )
      var shareJson={
        type:1,
        title:'学习使我快乐，财税法大咖开课啦！',
        desc:'精品小课天天有，大咖直播周四见',
        link:'/#/school',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'学习使我快乐，财税法大咖开课啦！',
        desc:'精品小课天天有，大咖直播周四见',
        link:'/#/school',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);




    }
}
</script>
<style lang="scss" scoped>
.cbanner{
  height: 360px;
  margin-bottom: 15px;

}
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

          position: relative;
          overflow: hidden;
          .newsicon{
            display: block;
            padding:50px 50px 10px 50px;
            transform:rotate(45deg);
            background: red;
            position: absolute;
            top:-36px;right:-60px;
            font-size:16px;
            color:#FFF;
          }
          background: #FFF;

          margin:10px;
          margin-top:0;
          padding:20px 20px;
          height:120px;
          box-shadow: 0 1px 3px #dcdcdc;
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
.block-w {
    background-color: #fff;
    margin-bottom: 24px;
    padding: 34px 18px 26px 20px;
}

.title-w {
    position: relative;

    h2 {
        font-size: 34px;
    }
    .more {
        position: absolute;
        top: 0;
        right: 0;
        color: #030303;
        border: 1px solid #e8e8e8;
        padding: 8px 18px;
        font-size: 22px;
        line-height: 32px;
        border-radius: 32px;
    }
    .link-ask {
        position: absolute;
        top: 0;
        right: 0;
        color: #C7A43E;
    }
}

.recommends {

    .recommend {
        position: relative;
        padding-top: 26px;
        width: 710px;
        height: 340px;
        border-radius: 8px;
        margin: 26px auto 0;
        background-color: #999;
        overflow: hidden;
    }

    .time {
        color: #fff;
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 26px;
        line-height: 36px;
        padding: 8px 26px;
        border-radius: 36px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .rec-w {
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 114px;
        padding-left: 24px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.11), rgba(0, 0, 0, .4));
    }
    .rec-t {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 32px;
        line-height: 44px;
        margin: 8px 0 10px;
    }
    .rec-sub {
        width: 520px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 26px;
        line-height: 36px;
    }
    .play {
        position: absolute;
        top: 24px;
        right: 20px;
        width: 64px;
        height: 64px;
        background: url('./imgs/play.png') center center no-repeat;
        background-size: cover;
    }
}

.active {
    color: #C9A063 !important;
    border-bottom: 4px solid #C9A063;
}

#school .hotCourse {
    padding: 5px 0 20px;

    li {
        padding: 8pt 0;
        background: #fff;
        margin-bottom: 5pt;
        img {
            width: 70pt;
            height: 70pt;
            margin: 0 22px 0 40px;
        }

        .desc {
            width: 170pt;
            .t1 .ar-l {
                color: #333;
                font-size: 30px;
                line-height: 60px;
            }
            .t1 .ar-r {
                color: #999;
                font-size: 24px;
                line-height: 60px;
            }
            .t3 {
                margin-bottom: 5pt;
            }
            .t3 div {
                color: #999;
                font-size: 20px;

                span {
                    color: #666;
                    font-size: 20px;
                }
            }
            .t2 .ar-l {
                color: #FFAA40;
                font-size: 28px;
            }
            .t2 .ar-r {
                display: inline-block;
                background: #C9A063;
                color: #fff;
                width: 52pt;
                height: 20pt;
                line-height: 20pt;
                font-size: 24px;
                text-align: center;
                border-radius: 3pt;
            }
            .mar {
                margin-right: 22px;
            }
        }
    }
}











#school {

    background: #f6f6f6;
    padding-bottom: 120px;

    .header {
        width: 750px;
        height: 90x;
        padding-left: 80px;
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

    .box1 {
        height: 138px;
        padding-top: 34px;
        div {
            width: 600px;
            height: 70px;
            line-height: 70px;
            background: rgba(181, 147, 92, 1);
            font-size: 34px;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            border-radius: 8px;
        }
    }
    .box2 {
        margin-bottom: 10px;
        padding: 32px 0 0px 0px;
        background: #fff;
      .fivef{float:left; width:20%; margin-right:0;}
        li {
            text-align: center;
            margin-right: 30px;
            margin-bottom:30px;

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
    .active {
        color: #C9A063 !important;
        border-bottom: 4px solid #C9A063;
    }
    .box4 {
        background: #fff;
        padding: 34px 0 42px;
        li {
            padding-top: 28px;
            img {
                width: 60px;
                height: 60px;
                margin: 0 22px 0 40px;
                border-radius: 60px;
            }
            .desc {
                width: 590px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 16px;
                .t1 .ar-l {
                    color: #333;
                    font-size: 30px;
                    line-height: 60px;
                }
                .t1 .ar-r {
                    color: #999;
                    font-size: 24px;
                    line-height: 60px;
                }
                p {
                    color: #333;
                    font-size: 28px;
                    line-height: 40px;
                    margin: 24px 0 38px;
                }
                .t2 span {
                    color: #666;
                    font-size: 24px;
                }
                .mar {
                    margin-right: 22px;
                }
            }
        }
    }
    .no_num {
        text-align: center;
        color: #999;
        line-height: 120px;
    }
}
</style>
