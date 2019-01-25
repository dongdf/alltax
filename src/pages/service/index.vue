<template>
    <div id="service">
        <!--<ul class="header clear">-->
            <!--<li class="active ar-l">产品</li>-->
            <!--&lt;!&ndash; <li class="ar-l" @click="goToExperts">找专家</li> &ndash;&gt;-->
            <!--<li class="ar-r"><img src="./imgs/icon6.png"></li>-->
        <!--</ul>-->
        <!--<ul class="newheader">-->
          <!--<li class="ncur"><span>产品</span></li>-->
          <!--<li ><span>找专家</span></li>-->
          <!--<div class="cl"></div>-->
        <!--</ul>-->

      <div class="quickBar">
        <ul>
          <li class="">
            <div class="q_item2 q_item_c2 "   ><img src="../course/imgs/courseQuick4.png"/><h3>区域产品</h3><p>专业靠谱的产品方案</p></div></li>
          <li><div class="q_item2 " @click="goToExperts"><img src="../course/imgs/courseQuick5.png"/><h3>区域专家</h3><p>您身边的财税专家</p>
            <!--<label class="newsicon">NEW</label>-->
          </div></li>
          <!--<li><div class="q_item"><img src="./imgs/quick3.png"/><h3>区域专家</h3><p>您身边的财税专家</p></div></li>-->
          <div class="cl"></div>
        </ul>

      </div>



        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item @click.native="bannerGo(s)" v-for="(s,key) in bannerList" :key="s.id"><img style="width:100%; height: 100%;" :src="s.img_url" alt=""></mt-swipe-item>

            </mt-swipe>
        </div>

        <ul class="box2 clear">
            <li v-for="item in quickIcon" class="ar-l" >
                <router-link :to="{path:'/service-list',query:{id:item.classfyId,name:item.classfyName}}">
                <img :src="item.shortcytIcon">
                <div>{{item.shortcutName}}</div>
                </router-link>
            </li>
        </ul>
        <ul class="box3 clear">
            <li :class="{active:active==0}" class="ar-l" @click="changeTab(0)">热门</li>
            <li :class="{active:active==1}" class="ar-l" @click="changeTab(1)">最新</li>
            <li :class="{active:active==2}" class="ar-l" @click="changeTab(2)">推荐</li>
        </ul>
        <serviceList :question_list="serviceData"></serviceList>
        <!--<div @click ="loadMoreitem" v-show="serviceData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>-->
        <tabbar active=2></tabbar>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
//import servicelist from '@/components/serviceList'
import serviceList from '../../components/serviceList'
import { time } from '@/filters/index'

export default {
    data() {
        return {
          bannerList:[],
          active:1,
          loadshow:true,
          listParam:{
                "subData": {
                    "pageNum": 1,
                    "pageSize": 1000,
                    "classfyId": null,
                    "requestType": 1 //求类型	1最新列表，2最热，3推荐,4其他
                }
            },
            classType:{},
          serviceData:[],
            question_list:{},
          quickIcon:[]
        }
    },

    filters: {
        time
    },

    components: {
        tabbar,
        serviceList
        //
    },

    computed: {
        //
    },

    methods: {
      goToExperts(){
        this.$router.push({path:'areaExperts'})
      },
      loadMoreitem(){

      },
      changeTab(s){
        this.active = s;
        if(s == 0){
          this.serviceHot();
        }
        if(s == 1){
          this.serviceNew();
        }
        if(s == 2){
          this.serviceRec();
        }

      },
       serviceHot() {
            this.active=0;
            this.listParam.subData.requestType=2;
            this.$http.post('goods/goodsService/product/list', this.listParam).then(
             res => {
                this.serviceData = res.data.data
                console.log(res.data.data)
            })
        },
        serviceNew() {
            this.active=1;
            this.listParam.subData.requestType=1;
             this.$http.post('goods/goodsService/product/list', this.listParam).then(
             res => {
                this.serviceData = res.data.data
                console.log(res.data.data)
            })
        },
        serviceRec() {
            this.active=2;
            this.listParam.subData.requestType=3;
            this.$http.post('goods/goodsService/product/list', this.listParam).then(
             res => {
                this.serviceData = res.data.data
                console.log(res.data.data)
            })
        },

        goToKnowledge() {
            this.$router.push({ path: 'knowledge', query: this.$route.query })
        },

        goToList() {
            this.$router.push({ path: 'service-list', query: this.$route.query })
        },

        gotoDetail() {
            this.$router.push({ path: 'service-detail', query: this.$route.query })
        },

        askQuestion() {
            this.$router.push({ path: 'ask-question', query: this.$route.query })
        },
      gettype(){
        this.$http.post('goods/goodsService/shortCut/list').then(
          res => {
          this.quickIcon = res.data.data
      })

      },
      getBanner(){
        this.$http.post('activity/activityService/banner/findList',{subData:3}).then(res=>{

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
      this.gettype();

       if(this.active == 0){
         this.serviceHot();
       }
      if(this.active == 1){
        this.serviceNew();
      }
      if(this.active == 2){
        this.serviceRec();
      }
       this.getBanner();




      var shareJson={
        type:1,
        title:'无论您的企业遇到了什么问题，我帮您！',
        desc:'您的企业经营顾问，一线专家为您筹划方案',
        link:'/#/service',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'无论您的企业遇到了什么问题，我帮您！',
        desc:'您的企业经营顾问，一线专家为您筹划方案',
        link:'/#/service',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);






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
        .q_item2{
          border-top:6px solid #FFF;
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
        .q_item_c2{

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
#service {
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
}



.searchBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    paddding: 3pt;

    .search {
        width: 100%;
        margin: 10pt;
        position: relative;
        border-radius: 4pt;
        input {
            width: 100%;
            height: 28pt;
            border-radius: 2pt;
            border: none;
            text-indent: 25pt;
        }
        img {
            position: absolute;
            top: 7pt;
            right: 5pt;
            width: 15pt;
            height: 15pt;
        }
    }
}

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

.box2 {
    margin-bottom: 10pt;
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
        img {
            width: 32px;
            height: 18px;
            margin-left: 6pt;
        }
    }
}




#service .hotService {
    padding: 5px 3pt 5pt;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
        align-content: flex-start;
        width: 46%;
        margin: 5pt 2% 0;

        img {
            width: 100%;
            height: 90pt;
            border-radius: 5pt;
        }

        .desc {
            width: 100%;

            .t1 .ar-l {
                width: 70%;
                overflow: hidden;
                height: 20pt;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
                font-size: 24px;
                line-height: 50px;
            }
            .t1 .ar-r {
                color: #999;
                font-size: 25px;
                line-height: 50px;
                font-weight: bold;
                color: #FFAA40;
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

.active {
    color: #C9A063 !important;
    border-bottom: 4px solid #C9A063;
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
