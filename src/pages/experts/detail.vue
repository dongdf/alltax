<template>
    <div id="expert-detail">
        <div class="topPic">
            <img :src="exprotDetail.expert_head">
           <span class="propic"  @click="proCard($event,exprotDetail)"><img class="cardpro"  src="./imgs/cardPro.png"><label>电子名片</label></span>
        </div>
        <div class="expertInfo">
            <div class="hang clear">
                <div class="ar-l">
                    <span>{{exprotDetail.expert_name}} <div style="display: inline; margin-left:15px; color:#666;" >
                    <img style="width:15px; margin-right: 5px;" src="./imgs/heart1.png">{{exprotDetail.attentionNum}}
                </div></span>
                    <span class="small">{{exprotDetail.industry_name}}</span>
                </div>
                <div class="ar-r">
                    <div class="star" v-html="$options.filters.stars(exprotDetail.evaluate_level)">

                    </div>
                </div>
            </div>
            <div class="hang1 clear">
                <div class="sign">
                    <span class="ar-l" v-for="(item,key) in extags">{{item}}</span>
                </div>
            </div>

        </div>
        <ul class="box3 clear">
            <!--<li class="ar-l" style="width:100%;" :class="{active:active==0}">简介</li>-->
            <!--<li class="ar-l" :class="{active:active==1}">动态</li>-->
            <!--<li class="ar-l" :class="{active:active==2}">评价</li>-->
        </ul>
        <div class="aboutExpert">
            <div class="pro">简介</div>
            <div class="content" v-html="exprotDetail.expert_introduction">
        </div>
            <recommends :konwlege="konwlege" :cuuiculu="cuuiculu" :goods="goods"></recommends>
            <!--<comments star=true></comments>-->
            <!--<chooseExpert></chooseExpert>-->
        </div>
        <footer>
            <ul class="foot">
                <li class="ar-l" v-show="!exprotDetail.is_specially && exprotDetail.province == '999999'">
                    今日排号:<span>{{exprotDetail.consultNumInfo}}</span>
                </li>
                <li @click="gochat()" class="ar-r">
                    <h5>立即咨询</h5>
                    <p>会员享受更多优惠</p>
                </li>
                <li v-show="!islike" class="ar-m" @click="actlike">
                    <img src="./imgs/heart1.png" alt="">
                        <p>关注</p>
                </li>
                <li  v-show="islike" class="ar-m" @click="actunlike">
                    <img src="./imgs/heart.png" alt="">
                        <p>已关注</p>
                </li>
            </ul>
        </footer>
    </div>
</template>
<script>

import recommends from '@/components/recommends'
import comments from '@/components/comments'
import chooseExpert from '@/components/chooseExpert'
import noresult from '@/components/noresult'

import { time } from '@/filters/index'


export default {
    data() {
        return {
          active:0,
          exprotDetail:{tags:['企业并购','重组','税务筹划']},
          islike:true,
          extags:[],
          konwlege:[],
          cuuiculu:[],
          goods:[],
          mineInfo:{}



        }
    },
  methods:{
    proCard(e,obj){
      this.$router.push({path:'/coursepic',query:{id:obj.id,code:'EXPERT_BUSINESS_CARD'}});

    },
    actlike(){
      this.$http.post('user/userService/export/addAttent',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
        if(res.data.code == 1){
        this.islike = true;
        this.exprotDetail.attentionNum++
      }

    })


    },
    actunlike(){//取消关注
      this.$http.post('user/userService/export/deleteAttent',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
        if(res.data.code == 1){
        this.islike = false;
        if(!this.exprotDetail.attentionNum){
          return false;
        }
        this.exprotDetail.attentionNum--
      }
    })
    },
    getExportDetail(){
      // alert(this.$route.query.id);
      this.$http.post('user/userService/expertInfo',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
        this.exprotDetail = res.data.data;
        if(this.exprotDetail.like){
          this.islike = true;
        }else{
          this.islike = false;
        }
        // this.exprotDetail.evaluate_level=5;
        // this.exprotDetail.tags = '企业并购,重组,税务筹划,企业并购,重组,税务筹划';
        if(this.exprotDetail.tags){
          this.extags=this.exprotDetail.tags.split(',')
        }

        var shareJson={
          type:1,
          title:'我是'+this.exprotDetail.expert_name+'，您可以点击立即咨询向我提问。',
          desc:'企业经营有难题，平台专家一对一',
          link:'/#/expert-detail?id='+this.$route.query.id,
          imgUrl:this.exprotDetail.expert_head?this.exprotDetail.expert_head:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
        }
        var shareJson2={
          type:1,
          title:'我是'+this.exprotDetail.expert_name+'，您可以点击立即咨询向我提问。',
          desc:'企业经营有难题，平台专家一对一',
          link:'/#/expert-detail?id='+this.$route.query.id,
          imgUrl:this.exprotDetail.expert_head?this.exprotDetail.expert_head:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
        }
        this.$parent.shareTimePage(shareJson2);
        this.$parent.shareAppPage(shareJson);


      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    getkonwlege(){
      this.$http.post('user/userService/export/knowledge',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
       this.konwlege = res.data.data;
      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    getcuuiculu(){
      this.$http.post('user/userService/export/curriculum',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
        this.cuuiculu = res.data.data;
      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    getgoods(){
      this.$http.post('user/userService/export/goods',{
        "subData":{
          "expertid":this.$route.query.id
        }
      }).then(res=>{
        this.goods = res.data.data;
      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    gochat(){
      this.$http.get('user/userService/getUserWeChatVo').then(res=>{
        // this.$http.get('way/serverport').then(res=>{
        this.mineInfo= res.data.data;
        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
                this.$router.push('/login');
            });
          return false;
        }
        if(this.mineInfo.imId ==this.exprotDetail.imId){
          this.$toast('不能自己和自己聊天')
        }else{
          this.$router.push({path:'/chat',query:{targetAccount:this.exprotDetail.imId}});

        }
    })


    }
  },

    components: {
        recommends,
        comments,
        chooseExpert,
      noresult
        //
    },
    filters: {

    },

    computed: {
        //
    },

    mounted() {
      this.getExportDetail();
      this.getkonwlege();
      this.getcuuiculu();
      this.getgoods();
    }
}
</script>
<style lang="scss">
.star {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    height: 35px;
    span {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-image: url(./imgs/star1.png);
        background-repeat: no-repeat;
        background-size: 28px 28px;
        margin-right: 3px;
    }
    span.light {
        background-image: url(./imgs/star.png);
        background-size: auto 30px;
    }
}

.active {
    color: #333 !important;
    border-bottom: 4px solid #C9A063;
}

.aboutExpert {
    background: #fff;
    padding: 30px 0 0pt;
    color: #333;

    .content {
        padding: 5pt 10pt 10pt;
        line-height: 36px;
        font-size: 24px;
        border-bottom: 8pt solid #f6f6f6;
    }
    .pro { border-bottom:1px solid #DDD;     font-size: 11pt; font-weight: bold; margin:0 30px; padding:0px 0 10px 0;}
}

.foot {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 38pt;
    background-color: #fff;
    z-index: 100;
    .ar-l {
        line-height: 38pt;
        padding-left: 5pt;
        span {
            color: #C9A063;
            font-size: 30px;
        }
    }

    .ar-m {
        height: 38pt;
        float: right;
        margin-right:50px;
        position: relative;
        top:5px;
        width: 36pt;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            display: block;
            width: 16pt;
            height: 14pt;
        }
        p {
            font-size: 15px;
        }
    }

    .ar-r {
        height: 38pt;
        width: 40%;
        text-align: center;
        background-color: #C9A063;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
            font-size: 18px;
        }
    }
}

#expert-detail {

    background: rgba(238, 237, 237, 1);
    min-height: 100%;
    padding-bottom: 140px;
    .video-js .vjs-big-play-button {
        width: 120px;
        height: 120px;
        border: 0;
        border-radius: 60px;
        margin-top: -60px;
        margin-left: -60px;
        background-color: #C9A063;
    }

    #my-video {
        width: 750px;
        height: 400px;
    }

    .topPic {
      position: relative;

        display: flex;
        align-items: center;
        img {
            width: 100%;
        }
        .propic{
          position: absolute;
          top:30%;
          right:0px;
          z-index: 9999;
          background: #FFF;


          padding:5px 15px;
          box-shadow: 0 0 4px #CCC;

          border-radius: 1000px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          label{
            position: relative;
            top:-3px;
            margin-left: 5px;
            color:#c69d62;
          }
          img{
            width:35px;
            height: 25px;
          }

        }
    }

    .expertInfo {
        background: #fff;
        padding: 30px 28px 14px;
        margin-bottom: 17px;
        position: relative;
        .hang {
            margin-bottom: 10pt;
        }
        .hang1 {
            display: flex;
            align-items: space-between;
            align-items: center;
        }

        .ar-l {
            font-size: 30px;
            height: 30px;
            line-height: 30px;
            .small {
                font-size: 20px;
                margin-left: 5pt;
            }
        }

        .sign {
            padding-top: 6px;
            span {
                color: #fff;
                background-color: #DCBD60;
                font-size: 20px;
                height: 36px;
                line-height: 37px;
                border-radius: 17px;
                padding: 0 20px;
                margin: 0 5pt 5pt 0pt;
            }
        }
        .like {
            position: absolute;
            bottom:10px;
            right:100px;
            width: 30px;
            display: flex;
            align-items: center;
            font-size: 25px;
            color: #666;
            img {
                width:100%;
                margin-right: 2pt;
            }
        }
    }




    .box1 {
        padding: 20px 28px 14px;
        background: #fff;
        margin-bottom: 17px;
        h5 {
            color: #A38A64;
            font-size: 34px;
            font-weight: normal;
            line-height: 34px;
            margin-bottom: 19px;
        }
        div.ar-l span {
            line-height: 28px;
            color: #A38A64;
            font-size: 28px;
            &:first-child {
                color: #999;
                font-size: 26px;
            }
        }
        div.ar-r span {
            color: #A38A64;
            font-size: 28px;
            line-height: 31px;
            img {
                width: 31px;
                vertical-align: bottom;
                margin-right: 6px;
            }
            &:first-child {
                margin-right: 30px;
                img {
                    width: 28px;
                    vertical-align: middle;
                }
            }
        }
    }

    .box2 {
        background: #fff;
        margin-bottom: 10px;
        h5 {
            color: #333;
            font-weight: normal;
            height: 78px;
            line-height: 78px;
            border-bottom: 1px solid #ddd;
            padding-left: 27px;
        }
        .desc {
            padding: 0 26px 22px;
            img {
                width: 108px;
                height: 108px;
                margin: 42px 26px 0 0;
            }
            .note {
                width: 564px;
                .title {
                    .ar-l {
                        margin: 44px 0 20px;
                        span {
                            color: #333;
                            font-size: 24px;
                            line-height: 34px;
                            &:first-child {
                                font-size: 32px;
                                margin-right: 10px;
                            }
                        }
                    }
                    .ar-r {
                        width: 150px;
                        height: 48px;
                        background: #A38A64;
                        border-radius: 4px;
                        color: #fff;
                        text-align: center;
                        line-height: 48px;
                        margin-top: 19px;
                    }
                }
                p {
                    font-size: 24px;
                    color: #333;
                    line-height: 30px;
                }
            }
            .sign {
                padding-top: 36px;
                span {
                    color: #A38A64;
                    font-size: 20px;
                    height: 36px;
                    line-height: 32px;
                    border: 2px solid #A38A64;
                    border-radius: 17px;
                    padding: 0 20px;
                    margin-right: 34px;
                }
            }
        }
    }
    .box3 {
        padding-left: 24px;
        border-bottom: 2px solid #ddd;
        background: #fff;
        li {
            width: 212px;
            line-height: 80px;
            height: 80px;
            text-align: center;
            margin-right: 33px;
            color: #999;
            font-size: 30px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
