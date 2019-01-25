
<!-- 首页 -->


<template>
    <div id="home" style="padding:0;">
      <div class="cwrjp"  >
        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item @click.native="bannerGo(s)"  ><img style="width:100%; height: 100%;" src="https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj.jpg" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>


        <div class="block-w expert-list" v-show="expertList.length>0">
            <div class="title-w clearfix">
                <h2>相关专家</h2>
                <!--<div class="more"><router-link :to="{path:'/experts'}">全部</router-link></div>-->
            </div>
            <div class="items clearfix">
                <div class="item" v-for="z in expertList">
                    <router-link :to="{path:'/expert-detail',query:{id:z.id,ph:1}}">
                        <img :src="z.expert_head" alt="" class="exp-img">
                        <div class="exp-t">{{z.expert_name}}</div>
                        <div class="exp-desc">{{z.industry_name}}</div>
                    </router-link>
                </div>

            </div>
        </div>
        <div class="block-w comments" style="padding-bottom:0px; padding:0;">
            <div class="title-w clearfix" style="padding:20px 0 0 10px;">
              <h2>相关视频<p class="more"style="top:20px; right:10px;"><router-link :to="{path:'/school'}">更多</router-link></p></h2>

            </div>
          <courseList :courseListData=courseListData></courseList>
        </div>
      </div>
      <tabbar ></tabbar>

    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import questionList from '../../components/questionList'
import live from '../../components/live'
import msearch from '../../components/msearch'
import courseList from '../../components/courseList'
import {REDIRECT_URL} from '../../constants'

export default {
    data() {
        return {
          expertList:[],
          pnumb:1,
          psize:100,
          sonid:129,
          vtype:1,
          classfyid:'',
          courseListData:[],
        }
    },

    components: {
        tabbar,
        questionList,
        live,
      msearch,
      courseList
        //
    },

    computed: {
        //
    },

    methods: {
      getcourse(){
        this.$http.post('curriculum/curriculumService/list', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize,
            "classfyId": this.sonid,
            "requestType": this.vtype,//0直播，1最新列表，2最热，3推荐
            "industryId":this.classfyid
          }
        }).then(
          res => {

            if(res.data.data.list.length == 0){
              if(this.pnumb>1){
                this.$toast('没有了');
              }
              this.loadshow = false;
              return false;
            }
            if(this.courseListData.length>0){
              let moreItem = res.data.data.list;
              for(var i in moreItem){
                this.courseListData.push(moreItem[i])
              }
              this.loadshow = true;

            }else{
              this.courseListData = res.data.data.list;
              this.loadshow = true;
            }


          }
        )
      },

      loadMoreitem(){
          this.pnumb++;
          this.getHot();
      },


      getexperts(){//推荐专家
        this.$http.post('user/userService/exportSimpleList',{
          "subData":{
            "pageNo":1,
            "pageSize":10,
            "specially":'1',     //是否特邀专家0:不是，1：是
            "classfyId":'19',     //专家分类id（标签）
          }
        }).then(res=>{
          if(res.data.data.list.length == 0){
          // this.$toast('没有了');
          this.loadshow = false;
          return false;
        }
        if(this.expertList.length>0){
          let moreItem = res.data.data.list;
          for(var i in moreItem){
            this.expertList.push(moreItem[i])
          }

        }else{
          this.expertList = res.data.data.list;
        }


      })


      },

      bannerGo(obj){

        this.$router.push({path:'/cwrjpro'});
      }

    },

    mounted() {

      this.getexperts()
      this.getcourse();
      var shareJson={
        type:1,
        title:'财务管家',
        desc:'免费云端财务管理软件，帮助财会人员更轻松更高效的处理业务，可大幅提升工作效率和质量，欢迎体验试用。',
        link:'/#/cwrjhome',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj_logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'财务管家-相关视频学习及问题咨询',
        desc:'免费云端财务管理软件，帮助财会人员更轻松更高效的处理业务，可大幅提升工作效率和质量，欢迎体验试用。',
        link:'/#/cwrjhome',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj_logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);

    }
}
</script>
<style lang="scss">
.cwrjp{
  padding-bottom: 150px;
}
#home {

    .sfznl_pop{
      position: fixed;
      top:0;
      left:0;
      width:100%;

      height:100%;
      z-index:99999;
      .sfznl_c{
        width:680px;
        position:relative;
        top:10%;
        height:980px;
        margin:0 auto;
        background:url("./imgs/sfznl.png") no-repeat;
        background-size: 100%;
        border-radius: 15px;
        .sfznl_zw{
          position: absolute;
          width:80%;
          left:10%;
          height:490px;color:#FFF;
          overflow: auto;
          top:300px;
          -webkit-overflow-scrolling: touch;
        }
        .sfznl_share_btn{
          position: absolute;
          bottom:100px;

          width:70%;
          text-align: center;
          img{width:100%;}
          border-radius: 10px;
          height:80px;
          text-align: center;
          color:#FFF;
          left:15%;
          line-height: 80px;
        }
        .sfznl_close{
          img{width:60%;
          }
          width:50px;
          height:50px;
          position: absolute;
          top:30px;
          right:20px;
        }

      }
    }
    background-color: #f6f6f6;
    padding-bottom: 124px;

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

    .block-w {
        background-color: #fff;
        margin-bottom: 24px;
        padding: 34px 18px 26px 20px;
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

    .experts {
        background-color: #fff;
        padding: 24px 12px;
        margin-bottom: 24px;
        position: relative;
        .block {
            width: 50%;
            float: left;
            padding: 0 12px 24px;
        }

        .expert {
            color: #333;
            font-size: 34px;
            height: 144px;
            padding: 46px 0 0 160px;
        }

        .wd {
            background: url('./imgs/bg4.jpg') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .zsk {
            background: url('./imgs/bg.jpg') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .kc {
            background: url('./imgs/bg3.jpg') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .cp {
            background: url('./imgs/bg2.jpg') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .spec {
            position: absolute;
            top: 98px;
            left: 50%;
            margin-left: -80px;
            width: 160px;
            height: 160px;
            background: linear-gradient(136.5deg, rgba(255, 231, 126, 1), rgba(216, 117, 43, 1));
            border-radius: 90px;
            text-align: center;
            font-size: 34px;
            color: #fff;
            line-height: 165px;
        }
    }

    .expert-list {
        .items {
            padding-top: 32px;
        }

        .item {
            float: left;
            width: 170px;
            height: 200px;
            border-radius: 8px;
            box-shadow: 0 4px 40px #dcdcdc;
            margin-right: 8px;
            padding-top: 14px;
            text-align: center;

            &:last-child {
                margin-right: 0;
            }
        }

        .exp-img {
            display: block;
            width: 120px;
            height: 120px;
            margin: 0 auto 12px;
            border-radius: 120px;
        }
        .exp-t {
            color: #333;
            font-size: 28px;
            line-height: 40px;
        }
        .exp-desc {
            color: #666;
            font-size: 24px;
            line-height: 34px;
        }
    }



    .hots {

        .hot {
            padding-top: 26px;
            a{color:#FFF;font-size:20px;}
        }

        span {
            color: #fff;
            font-size: 24px;
            line-height: 34px;
            display: inline-block;
            margin: 0 12px 12px 0;
            padding: 8px 20px;
            background-color: #C9A063;
            border-radius: 8px;
        }
    }


    .comments {
        margin-bottom: 0;

        .box4 {
            background: #fff;
            padding: 34px 0 42px;
            li {
                padding-top: 28px;
                img {
                    width: 60px;
                    height: 60px;
                    margin: 0 22px 0 0px;
                    border-radius: 60px;
                }
                .desc {
                    width: 628px;
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

                &:last-child .desc {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
