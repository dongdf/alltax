
<!-- 首页 -->


<template>
    <div id="home">
      <msearch :ktype="''" :searchTips="'查找课程、知识、法规'"></msearch>
        <div class="banner">
            <!--<div class="swiper-container"  >-->
                <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide" @click="bannerGo(s)" v-for="s in bannerList"><img :src="s.img_url" alt=""></div>-->

                    <!--<div class="swiper-pagination"></div>-->
                 <!--</div>-->
        <!--</div>-->
            <mt-swipe :auto="4000">
                <mt-swipe-item @click.native="bannerGo(s)" v-for="(s,key) in bannerList" :key="s.id"><img style="width:100%; height: 100%;" :src="s.img_url" alt=""></mt-swipe-item>

            </mt-swipe>
        </div>
      <div class="msglist" v-show="prizeList.length>0">
        <label class="fl msgicon"><img src="./imgs/msgIcons.png"/></label>
        <ul class="fl" :style="{ top }">

            <li @click="gowx(s)" class="item" v-for="s in prizeList" >
               {{s.content}}
            </li>

        </ul>


      </div>



        <div class="experts clearfix">
            <div class="block">
                <div class="expert wd" @click="gotoPage('question')"></div>
            </div>
            <div class="block">
                <div class="expert zsk" @click="gotoPage('knowledge')"></div>
            </div>
            <div class="block">
                <div class="expert kc" @click="gotoPage('school')"></div>
            </div>
            <div class="block">
                <div class="expert cp" @click="gotoPage('areaExperts')"></div>
            </div>
            <router-link :to="{path:'/collection',query:{ctype:0}}"><div class="spec"><label class="firs">业务</label><label>合作</label></b></div></router-link>
        </div>

        <div class="block-w expert-list">
            <div class="title-w clearfix">
                <h2>推荐专家</h2>
                <div class="more"><router-link :to="{path:'/experts'}">全部</router-link></div>
            </div>
            <div class="items clearfix">
                <div class="item" v-for="z in expertList">
                    <router-link :to="{path:'/expert-detail',query:{id:z.id}}">
                        <img :src="z.expert_head" alt="" class="exp-img">
                        <div class="exp-t">{{z.expert_name}}</div>
                        <div class="exp-desc">{{z.industry_name}}</div>
                    </router-link>

                </div>
                <!--<div class="item" @click="goToExpert()">-->
                    <!--<img src="./imgs/yzy.jpg" alt="" class="exp-img">-->
                    <!--<div class="exp-t">阮志勇</div>-->
                    <!--<div class="exp-desc">税务专家</div>-->
                <!--</div>-->
                <!--<div class="item" @click="goToExpert()">-->
                    <!--<img src="./imgs/xdj.png" alt="" class="exp-img">-->
                    <!--<div class="exp-t">熊德金</div>-->
                    <!--<div class="exp-desc">高级财税讲师</div>-->
                <!--</div>-->
                <!--<div class="item" @click="goToExpert()">-->
                    <!--<img src="./imgs/mhl.png" alt="" class="exp-img">-->
                    <!--<div class="exp-t">马海龙</div>-->
                    <!--<div class="exp-desc">财税实务</div>-->
                <!--</div>-->
            </div>
        </div>

        <live :liveData=liveData></live>

        <div class="block-w hots">
            <div class="title-w clearfix">
                <h2>热门知识</h2>
                <div class="more" @click="gotoPage('knowledge')">更多</div>
            </div>
            <div class="hot">
                <span v-for="n in knowledgeListData"><router-link :to="{path:'/knowledge-detail',query:{id:n.id}}">{{n.title | cutrandom }}</router-link></span>
            </div>
        </div>

        <div class="block-w comments" style="padding-bottom: 50px;">
            <div class="title-w clearfix">
                <h2>最新问答</h2>
                <div class="link-ask"><router-link :to="{path:'/ask-question'}">我要提问</router-link></div>
            </div>

            <questionList :questionList=question_list></questionList>
            <!--<div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>-->
            <div class="loadMore"><button><router-link :to="{path:'/question'}">更多问答></router-link></button></div>
        </div>
        <tabbar active=0></tabbar>

      <!--税法正能量-->
      <!--v-show="sfznl.content"-->
      <div id="audioContent2" ></div>
      <div class="sfznl_pop" v-show="sfznl.content" >
        <div class="sfznl_c">

          <div class="voice">
            <div class="voicec" @click="playVoice">
              <!--<div class="playSoundBtn"><img  src="./imgs/misc.png"/></div>-->
              <div class="playSoundPic"><img :class="playSound?'playSounding':''" src="../knowledge/imgs/misc.png"/></div>
            </div>
          </div>


          <div class="sfznl_close" @click="closesfznl"><img src="./imgs/sfznl_close.png"></div>
          <div v-html="sfznl.content" class="sfznl_zw">

          </div>
          <!--v-show="sfznl.iconPath"-->
          <div class="sfznl_share_btn"  @click="goshare(sfznl)"> <img src="./imgs/sharebtn.png"></div>

        </div>
      </div>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import questionList from '../../components/questionList'
import live from '../../components/live'
import msearch from '../../components/msearch'
import {REDIRECT_URL} from '../../constants'

export default {
    data() {
        return {
          playSound:false,
          audioPlay:null,
            name: '',
            liveData:{},
          question_list:[],
            questionList:{},
            demos: [],
          psize:5,
          pnumb:1,
          loadshow:true,
          expertList:[],
          loadMore:false,
          active:'',
          knowledgeListData:[],
          bannerList:[],
          sfznl_show:true,
          sfznl:{content:''},
          messageList:[],
          items:[
            {title:'1111111'},{title:'1111111'},{title:'1111111'},{title:'1111111'}
          ],
          activeIndex:0,
          prizeList:[]
        }
    },

    components: {
        tabbar,
        questionList,
        live,
      msearch
        //
    },

  computed: {
    top() {
      return - this.activeIndex * 40 + 'px';
    }

  },

    methods: {
      gowx(obj){
        if(!obj.link_url){
          return false;
        }
        location.href=obj.link_url;
      },
      ScrollUp(){
        if(this.prizeList == 1){
          return false;
        }
         setInterval(()=>{
          if (this.activeIndex < this.prizeList.length-1) {
            this.activeIndex += 1;
          } else {
            this.activeIndex = 0;
          }
        }, 3000);

      },
      getmyinfoList(){
        this.$http.post('activity/activityService/message/findUserMessage', {
          "subData": {
            "pageNum":1,
            "pageSize":100

          }
        }).then(res =>{
          this.prizeList = res.data.data.list;
        })
      },
      closesfznl(){
        this.sfznl = {};
        this.audioPlay.pause();

      },
      playVoice(){
        this.playSound = !this.playSound;

        var container = document.getElementById('audioContent2');
        var x = document.createElement("AUDIO");
        x.setAttribute("id", "my-audio2");
        x.setAttribute("controls", "controls");
        x.setAttribute("controlsList", "nodownload");
        x.style.width = '100%';
        if(!this.audioPlay){
          container.appendChild(x);
          this.audioPlay = document.getElementById('my-audio2');
          this.audioPlay.src = this.sfznl.mp3_path;


        }
        // console.log(this.audioPlay.paused)

        if(this.audioPlay.paused){
          this.audioPlay.play();
        }else{
          this.audioPlay.pause();
        }




      },
      getznl(){
        this.$http.post('knowledge/knowledgeService/todayMyNotRead',
        {"subData":128}
        ).then(res=>{
          if(res.data.data){
            this.sfznl = res.data.data;
          }

        })
      },
      goshare(obj){
        setTimeout(()=>{
          this.sfznl = {content:''}
        },200);
        this.$router.push({path:'/znl',query:{pic:obj.iconPath,fxtitle:obj.title,mp3path:obj.mp3_path}});

      },
        //页面跳转

        gotoPage(tag) {

            this.$router.push({ path: tag})
        },

        goToCourse() {
            this.$router.push({ path: 'course-detail', query: this.$route.query })
        },
        goToLive() {
            this.$router.push({ path: 'live-detail', query: this.$route.query })
        },
        goToExpert() {
            this.$router.push({ path: 'expert-detail', query: this.$route.query })
        },
      loadMoreitem(){
          this.pnumb++;
          this.getHot();

      },
      getHot() {
        this.active = 0;
        //getHotList
        this.$http.post('ask/askService/getNewest', {
          "subData":{
            "pageNum":this.pnumb,
            "pageSize":this.psize
          }

        }).then(
          res => {
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
          // this.$toast('没有了');
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
      knowledgeHot() {
        this.active=0;
        this.$http.post('knowledge/knowledgeService/list', {
          "subData":{
            "pageNum":this.pnumb,
            "pageSize":this.psize,
            "sortRule":"recommend"
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
      getexperts(){//推荐专家
        this.$http.post('user/userService/export/list',{
          "subData":{
            "pageNum":1,
            "pageSize":4,
            "expert_classfy_id":'',     //专家分类id
            "expert_industry_id":'',     //专家行业id
            "province":'',     //专家省份
            "city":'',//专家城市
            "country":'',  //区/县
            "isRecommed":1
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
      getBanner(){
         this.$http.post('activity/activityService/banner/findList',{subData:1}).then(res=>{

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

      },
      bannerGo(obj){
        if(obj.img_link.indexOf('http')<0){
          return false;
        }
          location.href = obj.img_link;
      }

    },

    mounted() {
      this.ScrollUp();

      this.getmyinfoList();
      this.getznl();
        this.getBanner();

        //热门问答
        this.getHot()
        this.knowledgeHot();
        this.getexperts();

    }
}
</script>
<style lang="scss">

#home {
  .msglist{
    background: #FFF;
    margin:0px 0 25px 0px;
    padding:0 20px;
    height: 80px;
    overflow: hidden;
    ul{
      position: relative;
      transition:top 1s;
      height:80px;
      width:650px;
      li{
        color:#F60;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 80px;
        line-height: 90px;
      }
    }
    label.msgicon{
      display: block;
      width:50px;
      height:50px;
      margin-right:5px;
      img{
        width:90%;
        position: relative;
        top:22px;
      }
    }
  }
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




        .voice{
          position: absolute;
          width:80px;
          height:80px;
          background:rgb(158, 115, 73);

          right:100px; top:90px;
          overflow: hidden;
          z-index: 999;
          -webkit-border-radius: 1000px;
          -moz-border-radius: 1000px;
          border-radius: 1000px;
          .voicec{
            position: relative;
            width:80px;
            height:80px;
            .playSoundBtn{
              width:50px;
              height:50px;
              position: absolute;
              z-index: 99;
              left:15px;

              top:15px;
              background:#FFF;
              -webkit-border-radius: 1000px;
              -moz-border-radius: 1000px;
              border-radius: 1000px;

              .playSounding{
                animation:mymove22 5s infinite linear;
                @keyframes mymove22
                {
                  0%{  transform: rotate(0deg);}

                  100%{ transform: rotate(360deg);}
                }
              }

              img{
                position:relative;
                top:6px;
                width:80%;
                height:80%;


              }

            }
            .playSoundPic{
              position: absolute;
              z-index: 8;
              width:71px;
              height:71px;
              text-align:center;
              left:4px;
              top:4px;
              z-index:5;
              .playSounding{
                animation:mymove22 5s infinite linear;
                @keyframes mymove22
                {
                  0%{  transform: rotate(0deg);}

                  100%{ transform: rotate(360deg);}
                }
              }
              img{
                width:80%;
                height:80%;
                position: relative;
                top:5px;
                left:-2px;

              }
            }
          }
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

            .firs{ margin-top:60px;}
            label{
              display: block;
              font-size:35px;
              height: 40px;
              line-height: 0px;
              text-align: center;
              text-shadow: 0 0 3px #a38a64;
              font-weight: bold;


            }

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
