<template>
  <div id="app"  >
    <!---->
    <div class="tipsma" v-show="!isshowma"  @click="maershow = true">
      <img class="fl logoimg" src="https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg">
      <div class="tipsc fl">
        <h3>关注财合税专家咨询平台</h3>
        <p>日更课程 热门知识 答疑解惑 一站式服务 <a>点击关注</a></p>
      </div>
      <div class="cl"></div>

    </div>
    <div class="mapic" v-show="maershow">
      <div class="piccontent">
        <img src="https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/normal.jpg"/>
        长按识别二维码
        <br>
        <span @click="maershow = false">关闭</span>
      </div>
    </div>


<!--<br><br><br>-->
<!--{{$route.meta.keepAlive}}-->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive&& isRouterAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>

    <!--<div class="fxpresent" v-show="activeShow" @click="presentShow = true"><i></i><label>{{shareActive.title}}</label></div>-->
    <!--<div class="fxpresent_pop" v-show="presentShow">-->
      <!--<div class="pcontent">-->
        <!--<h3>{{shareActive.title?shareActive.title:'活动说明'}}<span @click="presentShow = false">关闭</span></h3>-->
        <!--<div class="pc" v-html="shareActive.remark"  >-->

        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
    <!--v-show="jiangshow"-->
    <div  v-show="jiangshow" class="jiangtips">
      <div class="jiangtips_content">
        <div class="shareimg"><img src="./pages/home/activeimg/share_bg.png"/></div>
        <div class="tipsText">1次抽奖机会</div>
        <div class="tipact">
          <button @click="goshuang11">点击查看</button>
          <div v-show="isPhone" class="completeInfo">完善信息后可以抽奖，<span @click="gologin">点击完善</span></div>
        </div>
        <span class="close" @click="jiangshow = false"><img src="./pages/home/activeimg/quxiao.png"/></span>

      </div>

    </div>

  </div>
</template>

<script>
import {REDIRECT_URL} from './constants'
export default {
  name: 'App',
  data(){
    return{
      shareActive:{},
      jiangshow:false,
      activeShow:false,
      presentShow:false,
      isRouterAlive: true,
      maershow:false,
      isshowma:1,
      isPhone:false,
      iskeep:false,
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initWeixin();
      this.getActive(this.$route.name);
    })

  },
  watch:{
    '$route' (to, from) {
      document.body.style.overflow = 'auto'
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;

        if(to.name == 'LiveDetail'){
          this.iskeep = false;
        }else{
          this.iskeep = true;

        }
        console.log(to.name);
          this.shareAppPage({});
          this.shareTimePage({});
        this.getisguanzhu();
        this.getActive(to.name);
        var urls = window.location.href;
        if(to.name == 'CourseDetail' || to.name == 'KnowledgeDetail'|| to.name == 'LiveDetail'){
          this.addhist(2,urls)
        }

      })


    }
  },
  methods:{
    goshuang11(){
      this.jiangshow = false;
      this.$router.push({path:'/shuang11'})
    },
    gologin(){
      this.jiangshow = false;
      this.$router.push({path:'/login'})
    },
    getActive(path){
      // alert(path);
      if(path =='LiveDetail'){
         path ='CourseDetail'
      }
      if(path =='znl'){
        path ='KnowledgeDetail'
      }
      this.$http.get('activity/shareActivityService/lastActivity/detail').then(res=>{
        if(res.data.data){
          this.shareActive = res.data.data;
          var temps = this.shareActive.model_arr.split(',');
          var idx = temps.findIndex(function (item) {
            return path == item;
          })
          if(idx>=0){
            this.activeShow = true;
          }else{
            this.activeShow = false;
          }
        }else{

        }

      })

    },
    getisguanzhu(){
      this.$http.get('user/userService/getUserWeChatVo').then(res=>{
        // this.$http.get('way/serverport').then(res=>{
        this.isshowma= res.data.data.subscribe;
        if(res.data.data.mobile){
          this.isPhone = false;
        }else{
          this.isPhone = true;
        }
      })

    },
    shareTimePage(objs){
      var curUrl = window.location.href.split('#')[1];
      var that = this;
      var templink;
      if(objs.type){
        templink = objs.link;
      }else{
        templink = curUrl;
      }
      var openid = localStorage.getItem('WX_UID')?localStorage.getItem('WX_UID'):'';
      if(templink.indexOf('?')>=0){
        if(templink.indexOf('fxopenid')>=0){
          templink = templink;
        }else{
          templink = templink+'&fxopenid='+openid;
        }

      }else{
        if(templink.indexOf('fxopenid')>=0){
          templink = templink;
        }else{
          templink = templink+'?fxopenid='+openid;
        }
      }

      if(objs.type){
        objs = {
          title:objs.title,
          desc:objs.desc,
          link:REDIRECT_URL+templink,
          imgUrl:objs.imgUrl
        }
      }else{
        objs = {
          title:'财合税专家咨询平台',
          desc:'传播最新财税法知识，提供一站式财税法服务！财合税，做您身边的财税法专家',
          link:REDIRECT_URL+'/#'+templink,
          imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
        }
      }
      wx.ready(function () {
          wx.onMenuShareTimeline({
            title:objs.title, // 分享标题
            link: objs.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: objs.imgUrl, // 分享图标
            success: function (res) {
              // alert(JSON.stringify(res));
              // 用户点击了分享后执行的回调函数
              that.addhist(0,objs.link);
            },
            cancel: function () {
// 用户取消分享后执行的回调函数
            }
            })

      })
    },
    shareAppPage(objs){
      var curUrl = window.location.href.split('#')[1];
      var templink;
      var that = this;
      if(objs.type){
        templink = objs.link;
      }else{
        templink = curUrl;
      }
      var openid = localStorage.getItem('WX_UID')?localStorage.getItem('WX_UID'):'';
      if(templink.indexOf('?')>=0){
        if(templink.indexOf('fxopenid')>=0){
          templink = templink;
        }else{
          templink = templink+'&fxopenid='+openid;
        }
      }else{
        if(templink.indexOf('fxopenid')>=0){
          templink = templink;
        }else{
          templink = templink+'?fxopenid='+openid;
        }
      }
      if(objs.type){
        objs = {
          title:objs.title,
          desc:objs.desc,
          link:REDIRECT_URL+templink,
          imgUrl:objs.imgUrl
        }
      }else{
        objs = {
          title:'财合税专家咨询平台',
          desc:'传播最新财税法知识，提供一站式财税法服务！财合税，做您身边的财税法专家',
          link:REDIRECT_URL+'/#'+templink,
          imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
        }
      }

      // alert(objs.link)
      wx.ready(function () {

        wx.onMenuShareAppMessage({
          title:objs.title, // 分享标题
          desc:objs.desc, // 分享描述
          link:objs.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:objs.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            // alert(JSON.stringify(res));
            // 用户点击了分享后执行的回调函数
            that.addhist(1,objs.link);
          },
          cancel: function () {
// 用户取消分享后执行的回调函数
          }
        });

      })
    },
    addhist(optType,urls){
      var model='other';
      var modelId='';

      if(urls.indexOf('course-detail')>=0){
        model = this.$route.name;
        modelId = this.$route.query.id?this.$route.query.id:'';
      }
      if(urls.indexOf('live-detail')>=0){
        model = 'CourseDetail';
        modelId = this.$route.query.liveId?this.$route.query.liveId:'';
      }

      if(urls.indexOf('question-detail')>=0){
        model = this.$route.name;
        modelId = this.$route.query.questionId;
      }

      if(urls.indexOf('knowledge-detail')>=0 || urls.indexOf('znl')>=0){
        model = 'KnowledgeDetail';
        modelId = this.$route.query.id?this.$route.query.id:'';
      }
      if(urls.indexOf('service-detail')>=0){
        model = this.$route.name;
        modelId = this.$route.query.id?this.$route.query.id:'';
      }
      if(urls.indexOf('expert-detail')>=0){
        model = this.$route.name;
        modelId = this.$route.query.id?this.$route.query.id:'';
      }



      var optType = optType;
      var curls =window.location.href;
      this.$http.get('authentication/weChat/share/addHistory?model='+model+'&modelId='+modelId+'&optType='+optType+'&url='+encodeURIComponent(curls)).then(res=>{
        if(res.data.data.lotteryNum){
          this.jiangshow = true;
        }else{
          this.jiangshow = false;
        }

      });
    },
    initWeixin(){
      var locationUrl = location.href.split('#')[0];
      // locationUrl = locationUrl.split('?')[0];
      locationUrl = encodeURIComponent(locationUrl);
      // alert(locationUrl)
      this.$http.get('authentication/weChat/signature?url='+locationUrl).then(res=>{
        var qm = res.data;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: qm.appId, // 必填，公众号的唯一标识
          timestamp:qm.timestamp, // 必填，生成签名的时间戳
          nonceStr: qm.noncestr, // 必填，生成签名的随机串
          signature: qm.signature,// 必填，签名，见附录1
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        // wx.error(function(res){
        //    alert(JSON.stringify(res))
        // });

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .jiangtips{
    width:100%;
    height:100%;
    z-index:9999;
    position: fixed;
    top:0;left:0;
    background: rgba(0,0,0,.6);
    .jiangtips_content{
      .shareimg{

        img{width:100%; display: block;}
      }
      position: relative;
      top:40%;
      border-radius: 10px;
      padding-bottom: 50px;
      span.close{
        position: absolute;
        top:20px;
        width:50px;
        height:50px;
        line-height: 50px;
        text-align: center;
        border-radius: 1000px;
        background: rgba(0,0,0,.5);

        right:20px;
        img{
          width:30px;
          position: relative;
          top:5px;
        }
      }
      .tipsText{
        position: absolute;
        width:90%;
        left:5%;
        text-align: center;
        top:180px;
        color:#FFF;
        font-size:40px;
      }
      .tipact{
        position: absolute;
        bottom:40px;
        width:100%;
        text-align: center;
        left:0;
        button{
          border:none;
          background: #FF002E;
          padding:15px 80px;
          color:#FFF;
          font-size:35px;
          border-radius: 1000px;
          margin-bottom: 30px;
        }
      }
      width: 70%;
      margin:0 auto;

      background: #FFF;
      .completeInfo{
        span{
          font-weight: bold;
          text-decoration: underline;
        }
      }
    }
  }
  #containers{
    position: absolute;
    top:0;left:0;
    width:100%;height: 100%;
    overflow: auto;
  }
.tipsma{
  .logoimg{
    width:80px;
    margin:10px;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }
  .tipsc{
    text-align: left;
    padding-top:10px;
    h3{ font-size:25px;}
    p{
      font-size:20px;
      a{
        position: absolute;
        top:20px; right:20px;
        color:#f9d783;
        font-weight: bold;
        -webkit-border-radius: 1000px;
        border:2px solid #f9d783;
        -moz-border-radius: 1000px;
        border-radius: 1000px;
        padding:5px 10px;
        font-size:25px;
      }
    }
  }

  top:0;
  left:0;
  width:100%;


  color:#FFF;
  background: rgba(0,0,0,.7);
  z-index: 99;
  text-align: center;
  a{
    color:#f9d783;
    font-weight: bold;
  }

}
.mapic{
  position: fixed;
  top:0;
  text-align: center;
  color:#FFF;
  left:0;
  z-index: 999;
  width:100%;
  height: 100%;
  background: rgba(0,0,0,.8);
  .piccontent{
    img{
      width:100%;
    }

    width:400px;
    position: relative;
    margin:0 auto;
    top:300px;
    border-radius: 10px;
    span{
      color:#999;
      top:50px;
      position: relative;
      border:2px solid #999;
      padding:5px 15px;

      border-radius: 1000px;
    }
  }


}
</style>
