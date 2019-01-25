<template>
    <div id="question" style=" padding-bottom: 100px;">
      <div class="banner" v-if="bannerList.length>0">
        <mt-swipe :auto="4000">
          <mt-swipe-item @click.native="bannerGo(s)" v-for="(s,key) in bannerList" :key="s.id"><img style="width:100%; height: 100%;" :src="s.img_url" alt=""></mt-swipe-item>

        </mt-swipe>
      </div>



        <div class="wrapper" ref="wrapper">

   <div class="gs_tab_bar">

            <ul class="gs_tab">
                <li class="t1" :class="active == 0?'curs':''"  @click="changTab(0)">最新政策</li>
                <li class="t1" :class="active == 1?'curs':''"   @click="changTab(1)">相关问答</li>
                <li class="t1"  :class="active == 2?'curs':''" @click="changTab(2)">培训课程</li>
            </ul>
   </div>

            <questionList :questionList="question_list" v-show="active == 1"></questionList>
            <courseList :courseListData="courseListData"  v-show="active == 2"></courseList>
            <knowledgeList :knowledgeListData="knowledgeListData"  v-show="active == 0"></knowledgeList>

            <div @click ="loadMoreitem" v-show="(question_list.length>0 ||knowledgeListData.length>0 ||courseListData.length>0 ) && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>

      <div class="quick_ask" @click="goask">我要提问</div>

    </div>
</template>
<script>

import BScroll from 'better-scroll'
import tabbar from '../../components/tabbar'
import questionList from '../../components/questionList'
import knowledgeList from '../../components/knowledgeList'
import courseList from '../../components/courseList'

export default {
    data() {

        return {
          bannerList:[],
            active: 1,
            questionList:{},
          isall:false,
          loadshow:true,
          qtype2:[],
            classType: [
                { _name: '名师课', icon: require('./imgs/icon4.png') },
                { _name: '公开课', icon: require('./imgs/icon3.png') },
                { _name: '专家讲堂', icon: require('./imgs/icon2.png') },
                { _name: '专栏课题', icon: require('./imgs/icon1.png') },
                { _name: '系列课程', icon: require('./imgs/icon5.png') }
            ],
            question_list: [],
          knowledgeListData: [],
          courseListData: [],
          psize:10,
          pnumb:1,
          noCount:0,
          listParam:{
            "subData": {
              "pageNum": 1,
              "pageSize": 20,
              keyword:'个人所得税',
              "classfyId": '',
              "requestType": 1 //请求类型 0直播，1最新列表，2最热，3推荐,4筛选排序
            }
          },
        }
    },

    filters: {

    },

    components: {
        tabbar,
        questionList,knowledgeList,courseList
        //
    },

    computed: {



        //
    },

    methods: {
      goask(){
        this.$router.push({path:'ask-question'})
      },
      getknowledge(){
        this.active = 0;
        this.$http.post('knowledge/knowledgeService/list',{
          "subData":{
            "pageNum":this.pnumb,
            "pageSize":this.psize,
            "type":143,
            "sortRule":this.guanzhu
          }
        }).then(res=>{
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
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
      getcourse(){
        this.active = 2;
        this.listParam.subData.pageNum = this.pnumb;
        this.$http.post('curriculum/curriculumService/list', this.listParam).then(
          res => {
            this.loadshow = true;
            if(res.data.data.list.length == 0){
              if(this.listParam.subData.pageNum>1){
                 this.$toast('没有了');
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

        getNewest() {
          this.active = 1;
          this.$http.post('ask/askService/getNewest', {
            "subData":{
              "questionClassifyId":3,
              "pageNum":this.pnumb,
              "pageSize":this.psize
            }
          }).then(res => {
            if(res.data.data.list.length == 0){
              if(this.pnumb>1){
                this.$toast('没有了');
              }
              this.isall = true;
                this.loadshow = false;
              return false;
          }
            if(this.question_list.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.question_list.push(moreItem[i])
            }

          }else{
            this.question_list = res.data.data.list;
          }
        })
        },

      changTab(type){
        this.pnumb = 1;
        this.active = type;
        this.isall = false;
        this.question_list = [];
        this.courseListData = [];
        this.knowledgeListData = [];
        this.loadshow = true;
        if(this.active == 0){
          this.getknowledge();
        }
        if(this.active == 2){
          this.getcourse();
        }
        if(this.active == 1){
          this.getNewest();
        }

      },
      loadMoreitem(){
          // console.log(this.$route.name);
          // if(this.$route.name == 'Question'){
            // setTimeout(()=>{
              this.isall = true;

              this.pnumb++;
              if(this.active == 0){
                this.getknowledge();
              }
              if(this.active == 2){
                this.getcourse();
              }
              if(this.active == 1){
                this.getNewest();
              }

            // },1000)
          // }

      },
      getBanner(){
        this.$http.post('activity/activityService/banner/findList',{subData:8}).then(res=>{

          this.bannerList = res.data.data;


        })

      },
      bannerGo(obj){
        if(obj.img_link.indexOf('http')<0){
          return false;
        }
        location.href = obj.img_link;
      }
    },
    mounted() {
      this.getBanner();

        //热门问答
      if(this.active ==0 ){
        this.getknowledge();
      }

      if(this.active ==1 ){
        this.getNewest();
      }
      if(this.active ==2 ){
        this.getcourse();
      }

      var shareJson={
        type:1,
        title:'关于2019年个税，你想知道的都在这里',
        desc:'2019年个人所得税相关政策、最新解读',
        link:'/#/ptax',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'关于2019年个税，你想知道的都在这里',
        desc:'2019年个人所得税相关政策、最新解读',
        link:'/#/ptax',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);

    }
}
</script>
<style lang="scss" scoped>
  .banner {
    width: 100%;
    height: 360px;

    background: #fff;
    overflow: hidden;


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
  .quick_ask{
    position: fixed;
    left:0;
    bottom:0;
    background: #c69d62;
     color:#FFf;
    text-align: center;
    height:100px;
    line-height: 100px;
    font-weight: bold;
    font-size:35px;
    width:100%;
  }
  .gs_banner{
    background: #FFF;
    img{
      width: 100%;
    }
  }
  .gs_tab_bar{
    background: #FFF;
    border-bottom:2px solid #EEE;
    padding:15px 0;
  }
  .gs_tab{
    background: #FFF;
    text-align: center;
    li{width:33.3333%; padding: 15px 0; float: left; border-left:1px solid #C9A061;  }
    li.curs{
      background: #C9A061;
      color:#FFF;
    }
    width:90%;
    margin:0 auto;
    overflow: hidden;
    border: 2px  #C9A061 solid;
    border-left:1px solid #C9A061;
    border-radius: 10px;

  }
  .noanswerbg_c{
    padding-top:20px;
    background: #FFF;
    .noanswerbg{
      color:#ff4949;
      text-decoration: underline;
      background: #fdeec9;
      padding: 15px;
      width:90%;
      border-radius: 100px;
      margin:0 auto;
      text-align: center;
    }
  }

    .loadMore {text-align: center; background:#EEE; padding:20px;}
#question {
  .cl{
    display: block;
    clear: both;
  }
  .quickBar{
    background:#FFF;
    margin-bottom: 15px;
    padding:10px 0;
    ul{
      padding:10px;
      li{

        float:left;
        width:33.33333%;


        .q_item{
          background: #FFF;

          margin:10px;
          padding:10px 0;

          box-shadow: 0 2px 5px #dcdcdc;
          border:2px solid #EEE;
          border-radius: 10px;
          text-align: center;
          img{

            position: relative;

          width:50px;}
          p{
            font-size:16px;
            padding:0 10px;

            color:#999;
          }
          h3{
            font-size:30px;
            font-weight: normal;
            color:#313131;

          }


        }

        .one{
          height:150px;
          padding-top:40px;
          margin-top:60px;
        }
      }
    }
  }
    background: #f6f6f6;
    padding-bottom: 120px;

    .header {
        width: 750px;
        height: 90x;
        background: #fff;
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
        padding: 32px 0 24px 48px;
        background: #fff;
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
