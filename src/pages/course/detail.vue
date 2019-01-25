<!-- 课程详情 -->
<template>
  <div>
    <div id="course-detail">
      <!--<VueAliplayer @click="aliPlay()"></VueAliplayer>-->
      <div class="courseHead" id="neplayer" v-if="courseInfo.source == 1">
        <div id="audioContent"></div>
        <!--@touchstart="mostart"  @touchend="moend"-->
        <!--<div v-if="agenweb">-->
          <!--<img :src="courseInfo.coverUrl"  alt="" v-show="!clicked"   @touchstart="mostart"  @touchend="moend"  class="bigPic">-->
          <!--<img class="playbtn" src="./imgs/play.png" @touchstart="mostart"  @touchend="moend" v-show="audioShow" />-->

        <!--</div>-->
        <div>
          <img :src="courseInfo.coverUrl"  alt="" v-show="!clicked"  @click="playClick"   class="bigPic">
          <img class="playbtn" src="./imgs/play.png" @click="playClick"  v-show="audioShow" />

        </div>

        <!--<img :src="courseInfo.coverUrl"  alt="" v-show="!clicked"   @click="newplay()" class="bigPic">-->
        <!--<img class="playbtn" src="./imgs/play.png"  @click="newplay()"/>-->

        <!--<video id="my-video"   @click="newplay()" class="video-js"  x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true" controls  preload="auto"></video>-->

      </div>
      <div id="qqvideo" v-if="courseInfo.source == 2" >
        <img  v-if="courseInfo.source == 2 && !pinfo.videoId" :src="courseInfo.coverUrl">

      </div>
      <video id="player-container-id" v-if="courseInfo.source == 2 && pinfo.videoId"  preload="auto"   x5-playsinline playsinline webkit-playsinline></video>

      <!--<div  class="prism-player"   v-if="courseInfo.source == 2" :class="pytpe?'mp3types':''" id="J_prismPlayer"><img v-if="!spic" :src="courseInfo.coverUrl" style="width:100%;"/></div>-->
      <div v-show="isShowVip.user_type < 2">
        <div class="infosbuy" v-show="courseInfo.isBuy ==0 && courseInfo.curriculumPrice !=0 && courseInfo.vipPrice !=0">购买后查看完整视频</div>

      </div>



      <!-- 课程信息 -->
      <div class="box1">
        <h5 >{{courseInfo.curriculumTitle}}</h5>
        <div class="clear">
          <div class="ar-l">
                        <span v-if="courseInfo.curriculumPrice!==0" >
                        <a style="text-decoration: line-through;" v-if="courseInfo.vipPrice">市场价：￥{{courseInfo.curriculumPrice.toFixed(2)}}</a>
                        <label style="color:#F60;" v-if="courseInfo.vipPrice" >会员价：￥{{courseInfo.vipPrice.toFixed(2)}}</label>
                    </span>
            <span v-else>免费</span>
          </div>

          <div class="ar-r">
            <span><img src="./imgs/icon2.png">{{courseInfo.attentTotal}}</span>
            <span><img src="./imgs/icon4.png">{{courseInfo.playTotal}}</span>
          </div>
        </div>

        <div class="hbImgs" @click="gohbImage"><img src="./imgs/yaoqing.png">生成邀请卡,分享给朋友</div>


      </div>
      <!--是否会员2：{{isShowVip}}-->

      <!--<br>-->
      <!--是否购买此课程：{{isBuy}}-->
      <div class="video_lisss" v-show="vList.length>0">
        <h3>课程列表</h3>
        <ul class="list">
          <!--@touchstart="moliststart(v)"  @touchend="molistend(v)"-->
          <!--<li v-if="agenweb" :class="selectVideo.id == v.id?'curr':''" v-for="v in vList"   @touchstart="moliststart(v)"  @touchend="molistend(v)" >{{v.curriculumTitle}}<span>播放中</span></li>-->
          <li v-show="v.zshow"  :class="$route.query.id == v.id?'curr':''" v-for="v in vList" @click="playV(v)" >{{v.title}}
            <!--<span>播放中</span>-->
          </li>
          <div v-show="isableZhe" class="small_more" @click="smallzhe()">
            <p v-show="!morezhe">展开<img src="./imgs/zhev1.png"> </p>
            <p v-show="morezhe">收起<img src="./imgs/zhev2.png"> </p>
          </div>
        </ul>
      </div>
      <div style="">
      <!-- 专家信息 -->
      <expertCard :relInfo="relInfo" :expertInfo="experts"></expertCard>

      <ul class="box3 clear">
        <li class="ar-l" :class="{active:active==0}" @click="tab(0)">简介</li>
        <li class="ar-l" :class="{active:active==1}" @click="tab(1)">讨论</li>
        <li class="ar-l" :class="{active:active==2}" @click="tab(2)">评价</li>
      </ul>

      <div class="tabContent">
        <div class="cards" v-show="active == 0">
          <div class="AboutCourse">
            <div class="content" >
              <div id="procontent" v-html="courseInfo.curriculumIntroduction">

              </div>

            </div>
            <recommends :konwlege="konwlege" :cuuiculu="cuuiculu" :goods="goods"></recommends>

          </div>
        </div>
        <div class="cards" v-show="active == 1">
          <comments :commentList=discussList :star=false></comments>
          <div  @click="commentsQesLoadmore()" class="loadMore" v-show="commentsQesMore">加载更多</div>
          <reply type="1" :relId="courseId"></reply>
        </div>

        <div class="cards" v-show="active == 2">
          <comments :commentList=commentList :star=true></comments>
          <noresult v-show="commentList.length == 0" :tipText="'暂无记录'"></noresult>
          <div  @click="commentsLoadmore()" class="loadMore" v-show="commentsMore">加载更多</div>
        </div>
      </div>




      </div>



    </div>

    <footer>
      <ul class="foot">
        <li class="ar-l">
        </li>
        <div  v-show="courseInfo.curriculumPrice!=0 && isShowVip.user_type < 2">
          <li  v-show="!courseInfo.isBuy" @click="wxbuy"  class="ar-r">
            <h5>立即购买</h5>
            <p >会员享受更多优惠</p>
          </li>
          <li  v-show="courseInfo.isBuy" class="ar-r">
            <h5>已购买</h5>
            <!--<p >会员享受更多优惠</p>-->
          </li>

        </div>
        <div  v-show=" courseInfo.curriculumPrice==0 || isShowVip.user_type == 2">
          <li  class="ar-r">
            <h5>免费</h5>
          </li>
        </div>

        <li class="ar-m" style="margin-right:60px;">
          <div v-show="islike" style="text-align: center" @click="cancelAttent">
            <img src="./imgs/heart.png" alt="">
            <p>已关注</p>
          </div>

          <div v-show="!islike" style="text-align: center"  @click="attent" >
            <img src="./imgs/heart1.png" alt="">
            <p>关注</p>
          </div>
        </li>
      </ul>
    </footer>
    <!-- <pay payStart=false></pay> -->
    <toastOne @buy="tipsBuys" v-show="videoBuytip" @closebuy="tipsBuysClose" ></toastOne>

    <!--<pay :showPay = "parentShowpay" :buyInfo="buyInfo"   @close="payClose" ></pay>-->
    <div :is="c.component" v-for="c in paycomm" :showPay = "c.parentShowpay" :buyInfo="c.buyInfo"  @close="payClose"></div>

    <submitStar :starShow="startShow"></submitStar>

    <mt-popup v-model="chooseCourse" :modal="true" position="bottom" class="mint-popup-3">
      <div class="choosekc">
        <h3>购买课程
          <span @click="closebuy()"><img src="./imgs/cancel.png"/> </span>
          <p class="tips" v-show="huiMoney>0" >打包购买省￥{{huiMoney.toFixed(2)}},更优惠</p>
        </h3>
        <div class="chooseContent">
          <ul>
            <template  v-for="v in vList">
              <li  v-show="!v.isshow" style="color:#999;" >
                <span style="padding-left:0px">{{v.title}}</span>
                <p style="padding-left:0">
                 <b class="fl" v-if="v.vipPrice" style="color:#999;">￥{{v.vipPrice.toFixed(2)}}</b>
                  <!--<span class="fr zts"  >已购买</span>-->
                <div class="cl"></div>
                </p>
              </li>
              <li  v-show="v.isshow" style="color:#333; background: #F8F8F8;" >
                <!--<i :class="v.bcked?'checked':''"></i>-->
                <span>{{v.title}}</span>
                <p style="padding-left:0">
                  <b class="fl" v-if="v.vipPrice">￥{{v.vipPrice.toFixed(2)}}</b>
                  <span class="fr"  ></span>
                <div class="cl"></div>
                </p>
              </li>
            </template>
          </ul>
        </div>
        <div class="buyBottom">
          <ul>
            <li @click="wxgoumais(1)">
              <span><img src="./imgs/danbuy.png"/></span>
              单独购买
              <p class="dangoujia" v-show="chooseMoney>0">￥{{chooseMoney.toFixed(2)}}</p>
            </li>
            <li @click="wxgoumais(2)" class="buyall">
              <span><img src="./imgs/buyall.png"/></span>
              打包购买
              <p class="dangoujia" >￥{{totalMoney.toFixed(2)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import pay from '@/components/pay'
  import toastOne from '@/components/toastOne'
  import expertCard from '@/components/expertCard'
  import recommends from '@/components/recommends'
  import SendComments from '@/components/sendComments'
  import comments from '@/components/comments'
  import reply from '@/components/reply'
  import submitStar from '@/components/submitStar'
  import Coupu from './coupon'
  import experts from '@/components/experts'
  import noresult from '@/components/noresult'
  // import nePlayer from'../../assets/js/neplayer.min.js'

  export default {
    data() {
      return {
        pinfo:{},
        spic:false,
        isableZhe:true,
        morezhe:false,
        totalMoney:0,
        chooseMoney:0,
        chooseCourse:false,
        huiMoney:100,
        agenweb:null,
        touchnumb:0,
        paycomm:[],
        audioPlay:null,
        isBuy:false,
        startShow:false,
        active: 0,
        videoBuytip:false,
        courseInfo: '',
        clicked: false,
        videoSrc: '',
        commentList: {},
        discussList: {},
        expertId: '',
        videoId: '',
        expertInfo: {},
        attented: true,
        islike:true,
        audioShow:true,
        payShow:false,
        selectQquan:false,
        konwlege:[],
        cuuiculu:[],
        goods:[],
        courseId:'',
        experts:[],
        commentPnumb:1,
        commentPsize:15,
        commentsMore:true,
        commentQesPnumb:1,
        commentQesPsize:15,
        commentsQesMore:true,
        vList:[],
        selectVideo:{id:''},
        playVideo:null,
        isShowVip:false,
        isVip:null,
        hisPlay:null,
        siglVideoUrl:'',
        mineInfo:{},
        pytpe:false,

        buyInfo:{
          buyTitle:'订单金额',//标题
          isCoupon:true,//是否使用优惠券
          type:'3',//购买课程
          info:{
            money:'11980'
          },//商品基本信息
          wxPay:true,
          memberPay:true
        },
        parentShowpay:false,
        relInfo:{
          name:'课程',
          title:'122'
        },
        aliplayer:null,
        qqplayer:null

      }
    },
    filters: {

    },
    components: {
      // VueAliplayer,
      noresult,
      submitStar,
      toastOne,
      comments,
      SendComments,
      recommends,
      reply,
      expertCard,
      Coupu,

      experts
    },
    computed: {

    },

    methods: {
      gohbImage(){
        this.$router.push({path:'commcoursepic',query:{id:this.courseId}});
      },
      creatQQ(){
     // <video id="player-container-id" v-if="courseInfo.source == 2"  preload="auto"   x5-playsinline playsinline webkit-playsinline></video>
        return new Promise((resolve,reject)=>{
          $.getScript('//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.min.js',()=>{
            resolve();
          })

        })

      },
      qqPlay(){
        var that = this;
        this.$http.post('curriculum/curriculumService/getPlayQqAuth',{subData:this.$route.query.id}).then(res=> {
          if (res.data.code == 1) {
            this.pinfo =res.data.data;
            // alert(res.data.data.appid)
            if(!res.data.data.videoId){
              this.$toast('该课程无法试看，请购买后观看');
              return false;
            }

            var options={
              controls:true,
              autoplay:false,
              fileID:res.data.data.videoId, // 请传入需要播放的视频filID 必须
              appID: res.data.data.appid, // 请传入点播账号的appID 必须
              t: res.data.data.t,
              us: res.data.data.us,
              sign:res.data.data.sign,
              // exper:res.data.data.exper?res.data.data.exper:0,
              plugins:{
                ContinuePlay:{ // 开启续播功能
                  auto: true, //[可选] 是否在视频播放后自动续播
                  text:'上次播放至 ', //[可选] 提示文案
                  btnText: '恢复播放' //[可选] 按钮文案
                },
              }

            }
            if(res.data.data.exper){
              options.exper = res.data.data.exper;
            }

            // if(that.qqplayer){
            //   alert('')
            //   that.qqplayer.play();
            // }else{
            //   alert('no')
            //   that.qqplayer = TCPlayer('player-container-id', options);
            // }
            // return false;
            that.creatQQ().then(ress=>{
              that.qqplayer =TCPlayer('player-container-id', options);

              that.qqplayer.on("ended", ()=>{
                that.listenVideoEnd();
                console.log('播放完毕')
              });

              that.qqplayer.on("play", ()=>{
                that.addrealPlay()
                console.log('播放完毕')
              });


            })






          }else{
            this.$toast(res.data.msg)
          }
        })


      },
      addrealPlay(){
        var that = this;
        // alert('123')
        var local = sessionStorage.getItem('courseid');
        if(local == that.$route.query.id){
          return false;
        }else{
          sessionStorage.setItem('courseid',this.$route.query.id);
          this.$http.post('curriculum/curriculumService/addPlayRecord?videoId='+this.$route.query.id)

        }
      },
      aliPlay(){
        let that = this;
        this.$http.post('curriculum/curriculumService/getPlayQqAuth',{subData:this.$route.query.id}).then(res=>{
          if(res.data.code == 1){
            that.aliplayer = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              //播放方式二：点播用户推荐
              vid : res.data.data.videoId,
              playauth : res.data.data.playAuthCode,
              playsinline:true,
              cover: that.courseInfo.coverUrl,
              /* 设置封面时需要将 autoplay 和 preload 设置为 false */
              autoplay: false,
              preload: false,
              x5_type:'h5', //声明启用同层H5播放器，支持的值：h5
              // x5_video_position:'top',
              language: "zh-cn",
            },function(player){
              console.log('播放器创建好了。')
              that.spic = true;
            });

            that.aliplayer.on("ended", ()=>{
              that.listenVideoEnd();
              console.log('播放完毕')
            });

            this.aliplayer.tag.addEventListener("x5videoexitfullscreen", ()=>{
              if(WeixinJSBridge){
                // WeixinJSBridge.call('closeWindow');
              }
            });



          }else{
            that.$toast(res.data.msg);
          }

        })
      },
      aliPlayXin(){
        let that = this;
        this.getmyinfo().then(data=>{
          if(!data.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示',{confirmButtonText: '确定'}).then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }else{

            this.$http.post('curriculum/curriculumService/play', {
              "subData": { "videoId": this.courseInfo.id }
            }).then(res => {
              if(res.data.code==1){
                if(!res.data.data.curriculumUrl){
                  this.$toast('该课程无法试看，请购买后观看')
                  // $('#J_prismPlayer').html('<img src="+that.courseInfo.coverUrl+"/>');
                  return false;
                }


                that.aliplayer = new Aliplayer({
                  id: 'J_prismPlayer',
                  width: '100%',
                  controlBarVisibility:"always",
                  source:res.data.data.curriculumUrl,
                  playsinline:true,
                  cover:that.courseInfo.coverUrl,
                  /* 设置封面时需要将 autoplay 和 preload 设置为 false */
                  autoplay: false,
                  preload: false,
                  x5_type:'h5', //声明启用同层H5播放器，支持的值：h5
                  language: "zh-cn",
                },function(player){
                  console.log('播放器创建好了。');
                  that.spic = true;

                  // $('#J_prismPlayer video').attr('poster',that.courseInfo.coverUrl)

                });


                that.aliplayer.on("ended", ()=>{
                  that.listenVideoEnd();
                  console.log('播放完毕')
                });


                var obj = res.data.data.curriculumUrl;
                var suffix=obj.substr(obj.lastIndexOf(".")).toLowerCase();//获得文件后缀名
                if(suffix =='.mp3'){
                  that.pytpe = true;
                }

              }else{
                this.$toast(res.data.msg);
                this.clicked = false;
              }
            })



          }
        })











      },
      smallzhe(){
        let that = this;
        // for(var i in this.vList){
        //   alert(1)
        //   this.vList[i].zshow = true;
        // }


        if(!this.morezhe){

          for(var i in this.vList){

            this.$set(this.vList[i],'zshow',true);
          }

        }else{
          var curIdx = this.vList.findIndex(function (e) {
            return e.id == that.courseId
          })
          curIdx++;
          if(curIdx<3){
            curIdx = 3;
          }
          for(var i in this.vList){
            if(i<curIdx){
              this.vList[i].zshow = true;
            }else{
              this.vList[i].zshow = false;
            }

          }
        }
        this.morezhe = !this.morezhe;


      },
      wxgoumais(btype){
        this.chooseCourse =false;
        var binfo;
        if(btype == 1){//单独购买
            binfo={
            buyTitle:'订单金额',//标题
            isCoupon:true,//是否使用优惠券
            type:'3',//购买课程3  购买专家1
            info:{
              money:this.isShowVip.user_type==1?this.courseInfo.vipPrice:this.courseInfo.curriculumPrice,
              resourceId:this.courseId
            },//商品基本信息
            wxPay:true,
            memberPay:false
          }
        }
        if(btype == 2){//打包购买
          binfo={
            buyTitle:'订单金额',//标题
            isCoupon:true,//是否使用优惠券
            type:'3',//购买课程3  购买专家1
            info:{
              money:this.isShowVip.user_type==1?this.courseInfo.pVipPrice:this.courseInfo.pPrice,
              resourceId:this.courseInfo.pid
            },//商品基本信息
            wxPay:true,
            memberPay:false
          }
        }


        this.paycomm = [];
        this.paycomm.push({
          component:pay,
          parentShowpay:true,
          buyInfo:binfo

        })

      },

      closebuy(){
        this.chooseCourse =false;
      },
      youhuiMoney(){
        var dmoney=0;
        for(var i in this.vList){
          dmoney+=this.vList[i].vipPrice;
        }


        this.huiMoney = dmoney - this.totalMoney;

        this.chooseMoney = 0;
        for(var i in this.vList){
          if(this.vList[i].bcked){
            this.chooseMoney+=this.vList[i].vipPrice
          }
        }


      },
      buyck(obj){
        var idx = this.vList.findIndex(function (x) {
          return obj.id == x.id
        })

        if(obj.bcked){
          // this.$set(this.vList[idx].bcked, false)
          // this.vList[idx].bcked = false;
          //   this.$set(this.vList,idx,{curriculumTitle:obj.curriculumTitle,id:obj.id,bcked:false})
          this.$set(this.vList[idx], 'bcked', false);
        }else{
          // this.$set(this.vList,idx,{curriculumTitle:obj.curriculumTitle,id:obj.id,bcked:true})
          this.$set(this.vList[idx], 'bcked', true);
        }
        // this.chooseMoney = 0;
        // for(var i in this.vList){
        //   if(this.vList[i].bcked){
        //     this.chooseMoney+=this.vList[i].prices
        //   }
        // }

      },
      toPayinfo(){
        this.buyInfo={
          buyTitle:'订单金额',//标题
          isCoupon:true,//是否使用优惠券
          type:'3',//购买课程3  购买专家1
          info:{
            money:this.isShowVip.user_type==1?this.courseInfo.vipPrice:this.courseInfo.curriculumPrice,
            resourceId:this.courseId
          },//商品基本信息
          wxPay:true,
          memberPay:false
        }
      },
      tipsBuys(){
        this.videoBuytip = false;
        this.toPayinfo();
        this.parentShowpay = true;
        this.wxbuy();
      },
      tipsBuysClose(){
        this.videoBuytip = false;
      },
      payClose(){
        this.paycomm[0].parentShowpay = false;
        this.paycomm=[];
      },
      wxbuy(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          if(!res.data.data.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示', {confirmButtonText: '确定'}).then(ret=>{
              this.$router.push('/login');
            });
            return false;


          }else{
            if(this.courseInfo.pid){
              this.chooseCourse = true;
              this.youhuiMoney();

            }else{

              this.toPayinfo();
              this.paycomm.push({
                component:pay,
                parentShowpay:true,
                buyInfo:this.buyInfo

              })
            }


          }
        })
        // this.buyInfo.info.money = this.courseInfo.curriculumPrice;


      },
      tab(index) {
        if(index == 1){
          this.discussList = [];
          this.commentQesPnumb = 1;
          this.commentsMore = true;
          this.getcommentsQuestion();
        }
        if(index == 2){

          this.commentList = [];
          this.commentPnumb = 1;
          this.commentsQesMore = true;
          this.getcomments();

        }
        this.active = index;
      },
      createVideo(){
        // video-js vjs-big-play-centered
        var swidth=document.body.clientWidth;
        var container = document.getElementById('neplayer');
        container.innerHTML="";
        container.innerHTML = '<video id="my-video" x5-playsinline  playsinline="" webkit-playsinline="" class="" controls  width="'+swidth+'"   data-setup=\'{}\'></video>';

        // container.innerHTML = '<video id="my-video" controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster=""  preload="none"  preload="auto"  class="video-js vjs-big-play-centered"  width="'+swidth+'"   data-setup=\'{}\'></video>';
        this.playVideo = document.getElementById('my-video');


      },
      creatAudio(){

        var container = document.getElementById('audioContent');
        var x = document.createElement("AUDIO");
        x.setAttribute("id", "my-audio");
        x.setAttribute("controls", "controls");
        x.setAttribute("controlsList", "nodownload");
        x.style.width = '100%';
        if(!this.audioPlay){
          container.appendChild(x);
        }
        this.audioShow = false;

        this.audioPlay = document.getElementById('my-audio');

      },
      listenVideoEnd(){
        var that = this;
        if(this.courseInfo.source == 1){
          this.playVideo.addEventListener("ended",function(){

          if (!that.isBuy && that.courseInfo.vipPrice) {
            that.videoBuytip = true;

          }

          })
        }else{

          if (!that.isBuy && that.courseInfo.vipPrice) {
            that.videoBuytip = true;

          }
        }

        // this.playVideo.addEventListener("ended",function(){

            // if (!that.isBuy && that.courseInfo.vipPrice) {
            //     that.videoBuytip = true;
            //
            //   }

        // })
        // this.playVideo.on("ended",()=> {
        //   console.log('播放完成');
        //   if (!this.isBuy) {
        //     this.videoBuytip = true;
        //
        //   }
        // })

      },
      listenAudioEnd(){

        var that = this;

        this.audioPlay.addEventListener("ended",function(){
          if (!that.isBuy && that.courseInfo.vipPrice) {
            that.videoBuytip = true;
          }

        })

        // this.audioPlay.addEventListener('ended', function () {
        //   console.log('播放完成')
        // }, false);

      },
      getmyinfo(){
        return new Promise((resolve,reject)=>{
          this.$http.get('user/userService/getUserWeChatVo').then(res=>{
            // this.$http.get('way/serverport').then(res=>{
            resolve(res.data.data);
          })
        })
      },
      mostart(){
        this.playClick();
        this.touchnumb++;
      },
      moend(){
        let that = this;

        setTimeout(()=>{
          if(this.playVideo){
            that.playVideo.play();
            that.listenVideoEnd();
          }else{
            that.audioPlay.play();
          }
        },1000)


        this.touchnumb++;
      },
      moliststart(obj){
        this.playV(obj);

      },
      molistend(obj){
        setTimeout(()=>{
          if(this.playVideo){
            this.playVideo.play();
            this.listenVideoEnd();
          }else{
            this.audioPlay.play();
          }
        },1000)

      },
      newplay(){//测试函数
        //   let that = this;
        //
        //
        //   this.$http.post('curriculum/curriculumService/play', {
        //     "subData": { "videoId": this.courseInfo.id }
        //   }).then(res => {
        //     if(res.data.code==1){
        //     var obj = res.data.data.curriculumUrl;
        //     var suffix=obj.substr(obj.lastIndexOf(".")).toLowerCase();//获得文件后缀名
        //     if(suffix =='.mp3'){
        //       // this.$refs.audioCover.style.display='none';
        //       // console.log(this.$refs.audioCover)
        //       this.creatAudio();
        //
        //
        //       this.audioPlay.src = res.data.data.curriculumUrl
        //       this.audioPlay.play();
        //
        //       // this.audioPlay.addEventListener('ended', function () {
        //       //       console.log('播放完成')
        //       //     }, false);
        //
        //     } else{
        //       this.clicked = true;
        //       var player = document.getElementById('my-video')
        //       // this.createVideo();
        //       if(this.courseInfo.isSerial){
        //         if(res.data.data.isBuy){//购买过播放第一个
        //           // this.selectVideo = that.vList[0];
        //           player.src=that.selectVideo.curriculumUrl;
        //         }else{
        //           this.selectVideo ={};
        //           this.siglVideoUrl = res.data.data.curriculumUrl;
        //           player.src =res.data.data.curriculumUrl;
        //         }
        //
        //         player.play();
        //         // document.addEventListener("WeixinJSBridgeReady", function () {
        //         //
        //         //   document.getElementById('my-video_html5_api').play()
        //         //   that.listenVideoEnd();
        //         // }, false);
        //
        //         // setTimeout(()=>{
        //         //   this.playVideo.play();
        //         //   this.listenVideoEnd();
        //         // },200)
        //
        //
        //       }else{
        //         // this.playVideo.setDataSource('//nos.netease.com/vod163/demo.mp4');
        //         player.src=res.data.data.curriculumUrl;
        //         player.play();
        //
        //         // this.playVideo.play();
        //         // this.playVideo.seekTo(1000)
        //         // this.listenVideoEnd()
        //         // setTimeout(()=>{
        //         //       this.playVideo.play();
        //         //     this.listenVideoEnd();
        //         // },200)
        //
        //         // document.addEventListener("WeixinJSBridgeReady", function () {
        //         //   alert('');
        //         //   document.getElementById('my-video_html5_api').play();
        //         //   this.playVideo.play();
        //         //   that.listenVideoEnd();
        //         // }, false);
        //
        //
        //
        //       }
        //
        //     }
        //
        //
        //   }else{
        //     this.$toast(res.data.msg);
        //     this.clicked = false;
        //   }
        // })

      },
      playClick() {

        let that = this;
        this.getmyinfo().then(data=>{
          if(!data.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示',{confirmButtonText: '确定'}).then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }else{

            this.$http.post('curriculum/curriculumService/play', {
              "subData": { "videoId": this.courseInfo.id }
            }).then(res => {
              if(res.data.code==1){
                if(!res.data.data.curriculumUrl){
                  this.$toast('该课程无法试看，请购买后观看')
                  return false;
                }
                var obj = res.data.data.curriculumUrl;
                var suffix=obj.substr(obj.lastIndexOf(".")).toLowerCase();//获得文件后缀名
                if(suffix =='.mp3'){
                  // this.$refs.audioCover.style.display='none';
                  // console.log(this.$refs.audioCover)

                  this.creatAudio();
                  this.audioPlay.src = res.data.data.curriculumUrl
                  this.audioPlay.play();

                  // this.audioPlay.addEventListener('ended', function () {
                  //       console.log('播放完成')
                  //     }, false);
                  this.listenAudioEnd()

                } else{
                  this.clicked = true;

                  this.createVideo();

                  if(this.courseInfo.isSerial){

                    if(res.data.data.isBuy){//购买过播放第一个
                      this.selectVideo = that.vList[0];
                      this.playVideo.src = res.data.data.curriculumUrl;
                    }else{
                      this.selectVideo ={};
                      this.siglVideoUrl = res.data.data.curriculumUrl;
                      this.playVideo.src = res.data.data.curriculumUrl;
                    }
                  }else{
                    this.playVideo.src = res.data.data.curriculumUrl;
                  }

                  // this.playVideo.src = res.data.data.curriculumUrl;
                  if(localStorage.getItem('play')){
                    var localPlay = eval("(" + localStorage.getItem('play')+ ")")
                    var idx = localPlay.findIndex(function (item) {
                      return item.courseId == that.courseInfo.id;
                    })
                    if(idx>=0){
                      this.playVideo.currentTime = localPlay[idx].currentPlay;
                    }

                  }



                  // this.playVideo.play();
                  this.playVideo.addEventListener("play",function(){
                    that.addrealPlay();

                  })
                  // setTimeout(()=>{
                  //   this.playVideo.play();
                  //   alert('重复调用')
                  // },200)
                  this.listenVideoEnd();
                }

              }else{
                this.$toast(res.data.msg);
                this.clicked = false;
              }
            })



          }
        })


      },
      playV(obj){
        this.$router.replace({path:'/course-detail',query:{id:obj.id}});
        return false;
        if(!this.isBuy){
          if(this.courseInfo.vipPrice !==0 && this.courseInfo.curriculumPrice !=0){
            this.videoBuytip = true;
            return false;
          }

        }
        var objsource = obj.curriculumUrl;
        var suffix=objsource.substr(objsource.lastIndexOf(".")).toLowerCase();//获得文件后缀名
        if(suffix == '.mp3'){
          this.selectVideo = objsource;
          // alert('')
          this.creatAudio();
          this.selectVideo = obj;
          this.audioPlay.src = objsource
          this.audioPlay.play();
          this.audioPlay.addEventListener('ended', function () {
            console.log('播放完成')

          }, false);


        }else{
          this.clicked = true;
          this.selectVideo = obj;
          if(!this.playVideo){
            this.createVideo()
          }

          this.playVideo.src = obj.curriculumUrl;
          this.playVideo.play();
          this.listenVideoEnd();

        }

      },
      attent() {
        this.$http.post('curriculum/curriculumService/attent/add', {
          "subData": { videoId: this.courseId }
        }).then(res => {
          if (res.data.code == 1) {
            this.islike = true;
            this.courseInfo.attentTotal++

          }
          console.log(res.data)
        })
      },

      cancelAttent() {
        this.$http.post('curriculum/curriculumService/attent/delete', {
          "subData": { videoId: this.courseId }
        }).then(res => {


          this.islike = false;
          if(this.courseInfo.attentTotal == 0){
            return false;

          }else{
            this.courseInfo.attentTotal--
          }


        })
      },
      getkonwlege(){
        this.$http.post('curriculum/curriculumService/relKnowledge',{
          "subData":{
            'resourceId':this.courseId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res=>{
          this.konwlege = res.data.data.list;
          // alert(JSON.stringify(this.exprotDetail.extags))
        })
      },
      getcuuiculu(){
        this.$http.post('curriculum/curriculumService/relExpert',{
          "subData":{
            'resourceId':this.courseId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res=>{
          this.cuuiculu = res.data.data.list;
          // alert(JSON.stringify(this.exprotDetail.extags))
        })
      },
      getgoods(){
        this.$http.post('curriculum/curriculumService/relGoods',{
          "subData":{
            'resourceId':this.courseId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res=>{
          this.goods = res.data.data.list;
          // alert(JSON.stringify(this.exprotDetail.extags))
        })
      },
      getcoursedetail(){//请求课程数据
        this.$http.post('curriculum/curriculumService/detail', {
          "subData": { "videoId": this.courseId }
        }).then(res => {
          if(res.data.code !=1){
            this.$router.replace({path:'/noresource'});
          }
          if(res.data.data.classfyId == 142){
            this.$router.replace({path:'scourse-detail',query:{id:this.courseId}});
          }
          if(res.data.code==1){

            this.courseInfo = res.data.data;
            if(this.courseInfo.pid){
              this.totalMoney = res.data.data.pVipPrice;
            }else{
              this.totalMoney = res.data.data.vipPrice;
            }

            this.relInfo.id = this.courseId;
            this.relInfo.title = this.courseInfo.curriculumTitle;
            this.isBuy = this.courseInfo.isBuy;
            this.videoId = parseFloat(this.courseInfo.id);
            if(this.courseInfo.isSerial || this.courseInfo.pid){
              var idx = this.courseInfo.isSerial?this.courseId:this.courseInfo.pid;
              this.getVideoList(idx);
            }

            if(this.courseInfo.source == 1){
              this.playClick();
            }else{
               this.qqPlay();
            }


            if(this.courseInfo.isPreview){
              this.isShowVip = true;
            }
            this.expertId = parseFloat(this.courseInfo.expertId);
            if(this.courseInfo.like){
              this.islike = true;
            }else{
              this.islike = false;
            }
            this.getcurrentPlay();


            var shareJson={
              type:1,
              title:this.courseInfo.curriculumTitle,
              desc:'财合税专家咨询平台',
              link:'/#/course-detail?id='+this.courseId,
              imgUrl:this.courseInfo.coverUrl?this.courseInfo.coverUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
            }
            var shareJson2={
              type:1,
              title:this.courseInfo.curriculumTitle,
              desc:'财合税专家咨询平台',
              link:'/#/course-detail?id='+this.courseId,
              imgUrl:this.courseInfo.coverUrl?this.courseInfo.coverUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
            }
            this.$parent.shareTimePage(shareJson2);
            this.$parent.shareAppPage(shareJson);




          }else{
            console.log(res.data.msg)
          }
        })

      },
      getexperts(){//请求专家信息
        this.$http.post('curriculum/curriculumService/relExpert', {
          // subData: this.expertId
          subData: {
            'resourceId':this.courseId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res => {

          this.experts = res.data.data.list;

        })
      },
      getcomments(){//课程评论
        let that = this;
        this.$http.post('curriculum/curriculumService/criticism/list', {
          subData: {
            'pageNum':this.commentPnumb,
            'pageSize':this.commentPsize,
            videoId:this.courseId
            //videoId: this.courseInfo.id
          }
        }).then(res => {
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
            this.commentsMore = false;
            return false;
          }
          if(this.commentList.length>0){
            let t = res.data.data.list;
            for(var i in t){
              that.commentList.push(t[i]);
            }

          }else{
            this.commentList = res.data.data.list
          }
        })
      },
      commentsLoadmore(){
        this.commentPnumb++;
        this.getcomments();
      },
      addcomments(){//课程添加讨论
        this.$http.post('curriculum/curriculumService/chat/add', {
          subData: {
            videoId: this.courseId,
            content: 'wwwwwwwwwwwwwwwww'
          }
        }).then(res => {
          if(res.data.code==1){
            console.log(res.data)
          }else{
            console.log(res.data)
          }
        })

      },
      commentsQesLoadmore(){
        this.commentQesPnumb++;
        this.getcommentsQuestion();
      },
      getcommentsQuestion(){ //渲染讨论列表
        let that = this;
        this.$http.post('curriculum/curriculumService/chat/list', {
          subData: {
            "pageNum": this.commentQesPnumb,
            "pageSize": this.commentQesPsize,
            //videoId: 11
            videoId: this.courseId
          }
        }).then(res => {

          // this.discussList=res.data.data
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }

            this.commentsQesMore = false;
            return false;
          }
          if(this.discussList.length>0){
            let t = res.data.data.list;
            for(var i in t){
              that.discussList.push(t[i]);
            }

          }else{
            this.discussList = res.data.data.list
          }

        })
      },
      getVideoList(idx){
        let that = this;
        this.$http.post('curriculum/curriculumService/curriculumSerial',{
          subData:{
            videoId:idx
          }
        }).then(res=>{
          this.vList = res.data.data;

          var curIdx = this.vList.findIndex(function (e) {
            return e.id == that.courseId
          })
          var tempidx = curIdx;
          curIdx++;
          if(curIdx<3){
            curIdx = 3;
          }
          if(this.vList.length == curIdx){
            this.isableZhe= false;
          }


          for(var i in this.vList){
            if(this.vList[i].id == this.courseId){
              this.$set(this.vList[i],'isshow',true)
              this.$set(this.vList[i],'bcked',true)
              // this.vList[i].isshow=true;
              // this.vList[i].bcked = true;

            }else{
              this.$set(this.vList[i],'isshow',false)
            }

              if(i<curIdx){
                this.$set(this.vList[i],'zshow',true)
                // this.vList[i].zshow = true;
              }else{
                this.$set(this.vList[i],'zshow',false)
              }





          }

        })

      },
      getisVip(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          this.isShowVip = res.data.data;
        })
      },
      getisBuy(){
        //   this.$http.post('curriculum/curriculumService/play',{"subData": { "videoId": this.courseId}}).then(res=>{
        //     if(res.data.data.isBuy){
        //     this.isBuy = true;
        //   }else{
        //     this.isBuy = false;
        //   }
        // })
      },
      getcurrentPlay(){

        let tarray = localStorage.getItem('play')?eval("(" + localStorage.getItem('play')+ ")"):[];
        let idx = tarray.findIndex((x)=>{
          return x.courseId == this.courseId;
        });
        if(idx>=0){
          this.hisPlay = tarray[idx];
          console.log(JSON.stringify(this.hisPlay));
        }

      }
    },
    destroyed(){
      // document.getElementById('player-container-id').innerHTML='';
      if(this.qqplayer){
        this.qqplayer = null;
      }

      if(this.playVideo){
        let tarray = localStorage.getItem('play')?eval("(" + localStorage.getItem('play')+ ")"):[];
        let cur;
        // if(this.vList.length>0){
        //   cur = {
        //     courseId:this.courseId,
        //     currseInfo:this.selectVideo,
        //     currentPlay:this.playVideo.currentTime.toFixed(1)()
        //   }
        // }else{
        //   cur={
        //     courseId:this.courseId,
        //     currseInfo:'',
        //     currentPlay:this.playVideo.currentTime.toFixed(1)()
        //   }
        // }
        // var v = document.getElementById('my-video');
        // console.log(v);
        cur={
              courseId:this.courseId,
              currseInfo:'',
              currentPlay:this.playVideo.currentTime.toFixed(1)
        }

        var idx = tarray.findIndex(function(x){
          return x.courseId == cur.courseId;
        });
        if(idx<0){
          tarray.push(cur);
        }else{
          for(var i in tarray){
            if(cur.courseId == tarray[i].courseId){
              tarray[i] = cur;
            }
          }
        }

        localStorage.setItem('play',JSON.stringify(tarray));

        this.playVideo =null;
        this.audioPlay =null;
      }

    },
    mounted() {
      this.agenweb = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
      this.courseId = this.$route.query.id;
      this.getcoursedetail();//获取课程详情
      this.getexperts();//获取专家
      this.getgoods()
      this.getkonwlege()
      this.getisVip();
      this.getisBuy();

      // console.log(nePlayer)
      // this.getcurrentPlay();

      // this.getcuuiculu()
      // this.getexperts();
      // this.getcomments();
      // this.getcommentsQuestion()



    }
  }
</script>
<style lang="scss" scoped>
  .hbImgs{
    text-align: center;
    padding:15px;
    background: #FFF;

    border-top: 2px solid #EEE;

    margin:0 auto;
    margin-top: 15px;
    color:#c69d62;
    font-weight: bold;
    img{width:30px;
      margin-right:5px;
      position:relative; top:5px;}
  }
  #qqvideo{
    img{width:100%;}
  }
  #player-container-id{
    width: 100%;
    height:400px;
  }
  .mp3types{
    background: green url("./imgs/audios.png") no-repeat center;
    background-size: 100px auto;
  }
  #J_prismPlayer{
    min-height: 300px;
  }

.choosekc{
  position: fixed;
  width:100%;
  left:0;bottom:0;
  background:#FFF;

  h3{
    position: relative;
    padding:20px 0;
    text-align: center;
    border-bottom: 2px solid #EEE;
    span{
      position: absolute;
      top:20px;
      left:30px;
      img{
        width:50px;
      }
    }
    p.tips{
      font-size:20px; color: #F60;
      font-weight: normal;
    }
  }

  .chooseContent{
    ul{
      padding:30 0px;
      max-height: 900px;

      overflow: scroll;
      li{

        border-bottom:2px solid #EEE;
        padding:20px 30px;
        p{font-size:25px; padding-top:5px; padding-left:35px; .zts{color:#999; font-size: 20px;} b{color: #F60;
                                                                                  font-weight: normal;}}
        i{
          display: inline-block;
          width:30px;
          height:30px;
          border:2px solid #DDD;
          position: relative;
          top:5px;
          margin-right:5px;

          border-radius:5px ;
        }
        i.checked{
          background: #b5935c url("./imgs/fxk_ck.png") no-repeat center;
          background-size: 90%;
          border:2px solid #b5935c;
        }
      }
    }

  }
  .buyBottom{
    border-top: 2px solid #DDD;
    ul{

      li{

        vertical-align:middle;
        width:50%;
        float: left;
        position: relative;
        display: table-cell;
        padding:25px 0;
        text-align: center;
        font-size:32px;
        p.shihui{
          font-size:20px;
          opacity: .8;
        }
        span{
          img{width:30px;}
        }
        p.dangoujia{
          position: absolute;
          top:5px;right:30px;
          -webkit-border-radius: 1000px;
          padding:0px 10px;
          background: #F90;
          color:#FFF;
          font-size:20px;
          -moz-border-radius: 1000px;
          border-radius: 1000px;
        }
      }
      li.buyall{
        display: table-cell;
        background: #b5935c;
        color:#FFF;
        vertical-align:middle;
        p.shihui{
          font-size:20px;
          opacity: .8;
        }
      }
    }
  }

}
  .infosbuy {
    text-align: center;
    padding:10px;
    color:#b5935c;
  }


  #neplayer{
    position: relative;
    .playbtn{
      position: absolute;
      top:50%;
      left:50%;
      margin-top:-50px;
      margin-left:-50px;
      width:100px;
      height:100px;

    }
    #audioContent{
      position: absolute;
      width:100%;
      bottom:10px;
      audio{
        width:100%;
      }
    }
  }
  .video_lisss{
    background:#FFF;
    margin:20px 0;
    .small_more{
      text-align: center;
      padding:15px 0;
      color:#666;
      p{
        img{
          width:30px;
          opacity: .6;
          position: relative;
          top:4px;
          margin-left:5px;
        }

      }
    }
    h3{
      padding:25px;
      font-weight: normal;
      font-size:30px;
      border-bottom:1px solid #eee;
    }
    .list{
      padding:10px;
      li{
        padding:20px; border-bottom: 1px solid #eee;
        position: relative;
        font-size:25px;
        span{
          display:none;
          position: absolute;
          right:20px;
          top:15px;
          background:#C9A061;
          color:#FFF;
          font-size:20px;
          padding:1px 3px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
      li:nth-last-child{
        border:none;
      }
      .curr{
        color:#C9A061;
        font-weight: bold;
        span{
          display: block;
          font-weight: normal;
        }

      }
    }

  }
  .experts{
    background-color: #fff;
    padding: 0 24px;
    padding-bottom: 25px;
    margin-bottom: 24px;
    padding-top:30px;
    .descs{
      position: relative;
      padding: 24px 160px 24px 120px;
    }

    img{
      position: absolute;
      width: 90px;
      height: 90px;
      top: 24px;
      left: 0;
      border-radius: 90px;
    }

    .t{
      font-size:24px;
      color:#666;
      line-height:34px;
      margin-bottom: 12px;
      span{
        font-size:28px;
        color:#333;
        line-height:40px;
      }
    }
    .desc{
      font-size:24px;
      color:#666;
      line-height:34px;
      margin-bottom: 14px;
    }
    .tags span{
      display: inline-block;
      background:#DCBD60;
      font-size:22px;
      color:#fff;
      line-height:32px;
      padding: 2px 22px;
      margin-right: 30px;
      border-radius: 36px;
    }
    .zx{
      position: absolute;
      top: 36px;
      right: 0;
      font-size:28px;
      color:#C9A063;
      line-height:40px;
    }
  }

  .mint-popup-3 {
    width: 100%;
    height:100%;
  }


  .mint-popup {background: none;}
  .mint-popup-right {top:auto; bottom:54;}
  .order_short {
    position: fixed; width:100%; bottom:0; background:#FFF;}
  .order_short h3{ text-align: center;padding:20px 20px;
    position: relative;  border-bottom: 1px solid #EEE;}
  .order_short h3 span.order_short_close{
    position: absolute;
    font-weight: normal;
    top:20px; left:10px;
  }
  .order_short h3 span.order_short_close img {width:40px;}
  .order_bg { background:#F5F5F5;}
  .order_quan { background:#FFF; padding:20px;
    position: relative;}
  .order_quan .quandetail {
    position: absolute;top:20px; right:10px;
  }

  .order_quan .quandetail img { display:inline;width:10px;}
  .order_quan .quandetail span { background:#F60; padding:0 10px; margin-right:20px;font-size:25px; color:#FFF;}
  .order_pay_c { margin-top: 20px; background:#FFF;

  }
  .order_money { padding:30px; text-align: center; font-size:60px; background:#FFF; font-weight: bold; color:#b5935c;}

  .paylist li { padding:20px;
    position: relative; border-bottom:1px solid #EEE;}
  .paylist li img {width:40px; display: inline; margin-right: 10px;
    position: relative; top:10px}
  .meminfo {
    position: absolute; top:30px; right:10px; font-size:25px; color:#F60;}
  .meminfo b { border:1px solid #F60;padding:8px 10px; margin: 0 15px;
    -webkit-border-radius: 10px;
    font-size:25px;
    -moz-border-radius: 10px;
    border-radius: 10px;}






  @import '../../assets/scss/neplayer.min.css';

  .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    font-size: 80px;
    line-height: 120px;
  }

  #course-detail {
    .courseHead{
      height:400px; overflow: hidden;
      .bigPic {
        width: 100%;
        height:100%;
      }

    }
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
    .active {
      color: #333 !important;
      border-bottom: 4px solid #C9A063;
    }
    .box4 {
      background: #fff;
      padding: 30px 0 0pt;
      color: #333;
    }
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
      width: 36pt;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        width: 16pt;
        height: 14pt;margin:0 auto;
      }
      p {
        font-size: 15px;
      }
    }

    .ar-r {
      height: 38pt;
      width: 50%;
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

  .cards {
    background-color: #fff;
    .content {
      padding: 10pt 10pt 10pt;
      line-height: 36px;
      font-size: 26px;
      p{
        img{width:100%;
          height: auto;}
      }
    }
  }
</style>
