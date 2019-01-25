<template>
    <div class="live-detail">
        <div class="fixedTop">
            <div id="neplayer"  v-if="courseInfo.source == 1">
                <img :src="courseInfo.coverUrl" alt=""  class="bigPic" @click="playClick('')" >
                <img class="playbtn" src="./imgs/play.png" @click="playClick('')" />
                <!--<video id="my-video" class="video-js vjs-big-play-centered vjs-fluid"  x5-playsinline x-webkit-airplay="allow" webkit-playsinline controls preload="auto" >-->
                    <!--<source :src="videoSrc" type="video/mp4">-->
                <!--</video>-->
            </div>
          <div id="qqvideo"   >
            <img v-if="courseInfo.source == 2 && !pinfo.videoId" :src="courseInfo.coverUrl">

          </div>
          <video id="player-container-id" v-if="courseInfo.source == 2 && pinfo.videoId"  preload="auto"   x5-playsinline playsinline webkit-playsinline></video>

          <!--<div  class="prism-player" v-if="courseInfo.source == 2" :class="pytpe?'mp3types':''" id="J_prismPlayer"></div>-->


        </div>
<div style="">
      <ul class="tab clear">
        <li class="kuan" :class="{active:active==1}" @click="tab(1)">简介</li>
        <li class="line"></li>
        <li class="kuan" :class="{active:active==0}" @click="tab(0)">讨论</li>
      </ul>

        <div class="tabContent">



            <div class="cards" style="" v-show="active == 0">
                <div class="sign" style="">
                    <span v-show="!isSign" class="kuai" @click="signToday">点击签到</span>
                    <!--<span v-show="isSign" class="kuai" @click="signToday">今日已签到</span>-->

                </div>

                <!--群组聊天-->
                <div style="background: #FFF;">
                    <div class="chatFrame" >
                        <!--<div class="serviceInfo">-->
                            <!--<img src="./imgs/chang.png" alt="">-->
                            <!--<div>-->
                                <!--<h5>服务名称</h5>-->
                                <!--<p>¥ 服务价格</p>-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="chatList" style="background:none">
                            <div @click="gethisChat" v-show="hisbtn" class="hisbtn"><span>历史消息</span></div>
                            <template v-for="m in msgList" >
                                <p class="timeTag" v-show="m.text">{{m.time | timeNumb('MM-dd hh:mm')}}</p>
                                <div class="chatContent" v-show="(mines.imId != m.from) && m.text">
                                    <img :src="m.heads?m.heads:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chsIcon/common.png'" alt="">
                                    <div class="chatRight">
                                        <h6>
                                            <span>{{m.fromNick?m.fromNick:'匿名'}}</span>
                                            <!--<label for="">税务专家</label>-->
                                        </h6>
                                        <p>
                                            {{m.text}}
                                        </p>
                                    </div>
                                </div>

                                <div class="myContent" v-show="(mines.imId.toLowerCase() == m.from) && m.text">
                                    <div class="chatRight">
                                        <h6>
                                            <span>{{mines.nick_name}}</span>
                                        </h6>
                                        <p>
                                            {{m.text}}
                                        </p>
                                    </div>
                                    <img :src="mines.headimg_url" alt="">
                                </div>

                            </template>



                        </div>
                    </div>
                    <div class="chatBottom">
                        <div class="left">
                            <!--<span><img src="./imgs/voice.png" alt=""></span>-->
                            <input type="text" @focus="mostartscroll" @click="mostartscroll" @touchstart="mostartscroll" @touchend="mostartscroll"  v-model="sayvalue">
                        </div>
                        <div class="right">
                            <!--<span><img src="./imgs/faces.png" alt=""></span>-->
                            <!--<span><img src="./imgs/add.png" alt=""></span>-->
                            <span v-show="sayvalue" @click="saySend" class="sendText">发送</span>
                            <span v-show="!sayvalue"  class="dissendText">发送</span>


                        </div>
                    </div>



                </div>


                 <!--群组聊天-->



            </div>
            <div class="cards"    v-show="active == 1">
                <div class="sign">
                    <span v-show="!isSign" class="kuai" @click="signToday">点击签到</span>
                    <!--<span v-show="isSign" class="kuai" @click="signToday">今日已签到</span>-->

                </div>
                <div  v-html="courseInfo.curriculumIntroduction" class="content" style="background:#FFF;padding:0 20px;">


                </div>
                <br>
                <!--群组ID:{{courseInfo.imTid}}-->
                <!--<comments :commentList=discussList :star=false></comments>-->
                <!--<reply type=1></reply>-->
            </div>
        </div>

</div>
        <div>


        </div>
        <mt-popup v-model="sign"  class="qiancc">
            <div class="qiancc_s">
                <div class="calendarBox" style=" padding-bottom: 5%;">
                    <h5>签到</h5>
                    <p>连续5天签到，多享50积分</p>
                    <!--<signCalendar   ></signCalendar>-->
                    <div :is="item.component" :arr="item.arr" v-for="item in componentsList"></div>
                    <div class="btn" v-show="!isSign" @click="clicksign">
                        点击签到
                    </div>
                    <div class="btn" v-show="isSign" @click="sign=false">
                        关闭
                    </div>
                </div>

            </div>

        </mt-popup>


    </div>
</template>
<script>

import reply from '../../components/reply'
import comments from '../../components/comments'
import signCalendar from '../../components/calendar'
import { imAppKey,imAppSecret } from '@/constants'
import filters from '@/filters/index.js'
export default {

  data() {
        return {
          pinfo:{},
          touchnumb:0,
          nim:null,
          mp3types:false,
          pytpe:false,
          qian:true,
          hisbtn:true,
            componentsList:[],
          mines:{},
            active: 1,
            clicked: false,
            sign: false,
          isSign:true,
          playVideo:'',
            videoSrc: '',
            courseInfo: '',
          courseInfo2: '',
            discussList: {},
            arr:[],
            liveId:'',
          sayvalue:'',
          msgList:[],
          aliplayer:{},
          qqplayer:null,
          spic:true,
          mineInfo:{
            account:'caiheshui02',
            token:'111111'
          }

        }
    },

  components: {
        reply,
        comments,
        signCalendar
        //
    },

  computed: {
        //
    },

  methods: {
    mostartscroll(){
      var u = navigator.userAgent;

      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
        return false;
      }
      setTimeout(()=>{
        $('body,html').scrollTop(99999);
        $('.chatFrame').scrollTop(99999);

      },100)

    },
    mostartscrollKeywords(){

      setTimeout(()=>{
        $('body,html').scrollTop(99999);
        $('.chatFrame').scrollTop(99999);

      },100)

    },
    getmineInfo(){//获取用户基本信息
          return new Promise((resolve,reject)=>{
                this.$http.get('user/userService/getUserWeChatVo').then(res=>{
                if(res.data.code == 1){
                this.mines= res.data.data;
                resolve(this.mines);

              }

            })
        })
    },
      updatemineToken(obj){//更新用户token
         return new Promise((resolve,reject)=>{
                  this.$http.post('authentication/weChatAut/im/refreshToken',{subData:obj.imId}).then(res=>{
                  if(res.data.code == 1){

                  resolve(res.data.data);

                }
              })
          })
      },
      tab(index) {
            this.active = index;
        },
      signToday() {
          this.componentsList = [];
          function fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = (date.getMonth()+1);
            var d =date.getDate();
            return y+"/"+m+"/"+d;
          }

          this.$http.post('curriculum/curriculumService/sign/list', {
            subData: {
              pageNum: 1,
              pageSize: 5,
              videoId: this.liveId
            }
          }).then(res => {
            if(res.data.code == 1){
            let t = res.data.data;
            for(var i in t){
              var tm = fmtDate(t[i].signDay);
              this.arr.push(tm);
              console.log(tm);
            }
            this.sign = true;
            this.componentsList.push({
              component:signCalendar,
                  arr:this.arr
              })

          }
        })
        },
      createVideo(){
        var container = document.getElementById('neplayer');
        var swidth=document.body.clientWidth;
        container.innerHTML = '<video id="my-videos" x5-playsinline  playsinline="" webkit-playsinline=""  class="" controls  width="'+swidth+'"   data-setup=\'{}\'></video>';
        this.playVideo = document.getElementById("my-videos");
      },
        mostart(){
          this.playClick();
          this.touchnumb++;
        },
        moend(){
          setTimeout(()=>{
            this.playVideo.play();
            // this.listenVideoEnd();
        },1000)
          this.touchnumb++;
        },
    getmyinfo(){
      return new Promise((resolve,reject)=>{
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          resolve(res.data.data);
        })
      })
    },
    playClick(str){
      var that =this;
         this.getmyinfo().then(data=>{
           if(!data.mobile){

             this.$messagebox.confirm('请先完善用户信息', '提示',{confirmButtonText:'确定'}).then(ret=>{
               this.$router.push('/login');
             });
             return false;

           }else{

             this.clicked = !this.clicked;
             this.$http.post('curriculum/curriculumService/play', {
               "subData": { "videoId": this.liveId }
             }).then(
               res => {
                 if(str == 'zhibo'){
                    // alert('')
                   this.playVideo.addEventListener("play",function(){
                     // alert('456')
                     that.addrealPlay();

                   })
                   return false;
                 }
                 if(res.data.code==1){
                   this.createVideo();
                   this.playVideo.src = res.data.data.curriculumUrl;

                   this.playVideo.addEventListener("play",function(){
                     // alert('456')
                     that.addrealPlay();

                   })

                 }else{
                   this.$toast(res.data.msg);
                   return false;
                 }

               })

           }
         })

        },
    addrealPlay(){
      var that = this;
      // alert('123')
      //  alert('123')
      var local = sessionStorage.getItem('courseid');
      if(local == that.$route.query.liveId){
        return false;
      }else{
        sessionStorage.setItem('courseid',this.$route.query.liveId);
        this.$http.post('curriculum/curriculumService/addPlayRecord?videoId='+this.$route.query.liveId)

      }
    },
      connectIm() {
        let that  = this;
        that.active = 0;
        if(!this.nim){
          this.$indicator.open('连接中...');
        }

        this.nim = this.$IM.NIM.getInstance({
          debug:false,
          appKey:imAppKey,
          account: that.mineInfo.account,
          token: that.mineInfo.token,
          onconnect: function () {
            setTimeout(()=>{
              that.$indicator.close()
            that.$toast({
              message:'连接成功',
              duration:800
            })
          },500)

            // that.nim.getTeamMembers({
            //   teamId: 590743829,
            //   done: getTeamMembersDone
            // });
            // function getTeamMembersDone(error, obj) {
            //   console.log(error);
            //   console.log(obj);
            //   console.log('获取群成员' + (!error?'成功':'失败'));
            //   if (!error) {
            //     onTeamMembers(obj);
            //   }
            // }


          },
          onerror:function(error){
            console.log(error);
            that.$indicator.close();
            alert(JOSN.stringify(error))
            // location.reload()
          },
          ondisconnect: function (obj) {
            // location.reload()
            console.log('SDK 连接断开', obj)
          },
          onerror: function (error) {
            console.log('SDK 连接失败', error)
          },

          onmsg: that.onMsg







        })




// test
        function onRoamingMsgs(obj) {
          console.log('收到漫游消息', obj);
          that.msgList.pushMsg(obj.msgs);
        }
        function onOfflineMsgs(obj) {
          console.log('收到离线消息', obj);
          that.msgList.push(obj.msgs);
        }

      },
      getuserInfo(accid){
        let that = this;
        this.nim.getUser({
          account:accid,
          sync: true,
          done: getUserDone
        });
        function getUserDone(error, user) {
          console.log(error);
          console.log(JSON.stringify(user));
          return user;
          console.log('获取用户资料' + (!error?'成功':'失败'));
          if (!error) {
            onUsers(user);
          }
        }
      },
      onMsg(msg){
        let that = this;
        console.log('收到消息', msg.scene, msg.type, JSON.stringify(msg));
        if(msg.target == this.courseInfo.imTid){

          that.nim.getUser({
              account:msg.from,
              sync: true,
              done:function(error, user){
                msg.heads = user.avatar
                msg.fromNick = user.nick

                that.msgList.push(msg);
                if(msg){
                  that.mostartscroll();
                  that.mostartscrollKeywords();
                }
              }
            });

        }

      },
      gethisChat(){
      let that = this;

      that.nim.getHistoryMsgs({
        scene: 'team',
        to: that.courseInfo.imTid,
        done: getHistoryMsgsDone
      });
      function getHistoryMsgsDone(error, obj){
        console.log('获取p2p历史消息' + (!error?'成功':'失败'));

        console.log(JSON.stringify(obj.msgs));
        var msgs = obj.msgs;
        that.msgList = [];
        // for(var i in msgs){
        //   that.nim.getUser({
        //     account:msgs[i].from.toLowerCase(),
        //     done:function(error, user){
        //       msgs[i].heads = user.avatar
        //       msgs[i].fromNick = user.nick
        //
        //       that.msgList.unshift(msgs[i]);
        //     }
        //   });
        //
        // }
        that.msgList = msgs.reverse();
        // console.log(JSON.stringify(that.msgList))
        that.hisbtn = false;
        if (!error) {
          console.log(obj.msgs);
        }
      }

    },
      autoScroll(target){

          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          if (scrollT >target) {
            var timer = setInterval(function(){
              var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
              var step = Math.floor(-scrollT/6);
              document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
              if(scrollT <= target){
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
              }
            },20)
          }else if(scrollT == 0){
            var timer = setInterval(function(){
              var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
              var step = Math.floor(300/3*0.7);
              document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
              console.log(scrollT)
              if(scrollT >= target){
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
              }
            },20)
          }else if(scrollT < target){
            var timer = setInterval(function(){
              var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
              var step = Math.floor(scrollT/6);
              document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
              if(scrollT >= target){
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
              }
            },20)
          }else if(target == scrollT){
            return false;
          }
      },
      saySend(){
        let that = this;

        // var msg = this.nim.sendCustomMsg({
        //   scene: 'p2p',
        //   to: 'caiheshui01',
        //   content: {
        //     a:1,b:2
        //   },
        //   done: sendMsgDone
        // });

        var msg = this.nim.sendText({
          scene: 'team',
          to: that.courseInfo.imTid,
          text: that.sayvalue,
          done: sendMsgDone
        });
        // console.log('正在发送p2p text消息, id=' + msg.idClient);
        // pushMsg(msg);
        function sendMsgDone(error, msg) {
          // console.log(error);
          console.log(JSON.stringify(msg));
          console.log('发送' + msg.scene + ' ' + JSON.stringify(msg.text) + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
          that.msgList.push(msg);
          that.sayvalue = '';
          if(msg){
            that.mostartscroll();
            that.mostartscrollKeywords();
          }

          // console.log(document.getElementById('chatFrame').scrollHeight+"px");
          // document.getElementById('chatFrame').scrollTop =document.getElementById('chatFrame').scrollHeight+"px";
        }
      },
      getliveInfo(){

         return new Promise((resolve,reject)=>{
           //根据直播id获取直播信息
           this.$http.post('curriculum/curriculumService/detail', {
           "subData": { "videoId": this.liveId }
         }).then(res => {
           if(res.data.code == 1){
          console.log(res.data.data)
          resolve(res.data.data);
          this.courseInfo = res.data.data;
          // if(this.courseInfo.curriculumUrl){
          //   this.createVideo();
          //   this.playVideo.setDataSource(res.data.data.curriculumUrl);
          //   this.playVideo.play();
          // }

        }
      })

         })

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
      this.$http.post('curriculum/curriculumService/getPlayQqAuth',{subData:this.$route.query.liveId}).then(res=> {

        if (res.data.code == 1) {


          this.pinfo =res.data.data;
          // alert(res.data.data.appid)
          if(!res.data.data.videoId){
            this.$toast('该课程无法试看，请购买后观看');
            return false;
          }

          var options={
            controls:true,
            autoplay:true,
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
    aliPlay(){
      let that = this;
      this.$http.post('curriculum/curriculumService/getPlayAuth',{subData:this.$route.query.liveId}).then(res=>{
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
            x5_type:'h5', //声明启用同层H5播放器，支持的值：h5
            autoplay: false,
            preload: false,
            language: "zh-cn",
          },function(player){
            console.log('播放器创建好了。')
            that.spic = true;
          });


          that.aliplayer.on("ended", ()=>{
            // that.listenVideoEnd();
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
                return false;
              }

              that.aliplayer = new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                controlBarVisibility:"always",
                source:res.data.data.curriculumUrl,
                playsinline:true,
                cover: that.courseInfo.coverUrl,
                /* 设置封面时需要将 autoplay 和 preload 设置为 false */
                autoplay: false,
                preload: false,
                x5_type:'h5', //声明启用同层H5播放器，支持的值：h5
                language: "zh-cn",
              },function(player){
                console.log('播放器创建好了。')
                that.spic = true;

              });


              that.aliplayer.on("ended", ()=>{
                // that.listenVideoEnd();
                console.log('播放完毕')
              });


              var obj = res.data.data.curriculumUrl;
              var suffix=obj.substr(obj.lastIndexOf(".")).toLowerCase();//获得文件后缀名
              if(suffix =='.mp3'){
                that.pytpe = true;
                // this.$refs.audioCover.style.display='none';
                // console.log(this.$refs.audioCover)

                // this.creatAudio();
                // this.audioPlay.src = res.data.data.curriculumUrl
                // this.audioPlay.play();
                //
                // // this.audioPlay.addEventListener('ended', function () {
                // //       console.log('播放完成')
                // //     }, false);
                // this.listenAudioEnd()

              } else{
                // this.clicked = true;
                //
                // this.createVideo();
                //
                // if(this.courseInfo.isSerial){
                //
                //   if(res.data.data.isBuy){//购买过播放第一个
                //     this.selectVideo = that.vList[0];
                //     this.playVideo.src = res.data.data.curriculumUrl;
                //   }else{
                //     this.selectVideo ={};
                //     this.siglVideoUrl = res.data.data.curriculumUrl;
                //     this.playVideo.src = res.data.data.curriculumUrl;
                //   }
                // }else{
                //   this.playVideo.src = res.data.data.curriculumUrl;
                // }
                //
                // // this.playVideo.src = res.data.data.curriculumUrl;
                // if(localStorage.getItem('play')){
                //   var localPlay = eval("(" + localStorage.getItem('play')+ ")")
                //   var idx = localPlay.findIndex(function (item) {
                //     return item.courseId == that.courseInfo.id;
                //   })
                //   if(idx>=0){
                //     this.playVideo.currentTime = localPlay[idx].currentPlay;
                //   }
                //
                // }
                //
                //
                //
                // this.playVideo.play();
                // // setTimeout(()=>{
                // //   this.playVideo.play();
                // //   alert('重复调用')
                // // },200)
                // this.listenVideoEnd();
              }

            }else{
              this.$toast(res.data.msg);
              this.clicked = false;
            }
          })



        }
      })


    },
      getliveInfo2(){
      var that = this;
            //根据直播id获取直播信息
            this.$http.post('curriculum/curriculumService/detail', {
              "subData": { "videoId": this.liveId }
            }).then(res => {
              if(res.data.code == 1){
                // console.log(res.data.data)

                this.courseInfo2 = res.data.data;

                // if(this.courseInfo.source == 1){
                //
                // }else{
                //   this.aliPlay();
                // }

                // alert(JSON.stringify(this.courseInfo2))




                if(this.courseInfo2.curriculumUrl){

                  this.getmyinfo().then(rdata=> {
                    if(!rdata.mobile){
                      this.$messagebox.alert('请先完善用户信息', '提示', {confirmButtonText: '好的'}).then(ret => {
                        this.$router.push('/login');
                      });
                      return false;
                    }else{
                      var ntime = new Date().getTime();
                      var endtime = this.courseInfo2.publishTime+this.courseInfo2.durationMill*60*1000;
                      console.log(ntime)
                      console.log(endtime)
                      if(ntime>=endtime){
                        this.$router.replace({path:'/course-detail',query:{id:this.liveId}});
                      }else{

                        if(this.courseInfo2.source == 1){
                          // this.playClick();

                          this.createVideo();
                          this.playVideo.src = res.data.data.curriculumUrl;
                          // this.playVideo.play();
                          this.playClick('zhibo');
                          // alert('123')

                        }else{
                          this.qqPlay();
                        }


                        // this.playClick();


                        // this.playVideo.src = res.data.data.curriculumUrl;

                      }
                    }

                  })

                }else{

                  var ntime = new Date().getTime();
                  var endtime = this.courseInfo2.publishTime+this.courseInfo2.durationMill*60*1000;
                  if(ntime>=endtime){
                    this.$router.replace({path:'/course-detail',query:{id:this.liveId}});
                  }
                  if(this.courseInfo2.source == 2){
                    // alert(123)
                    this.qqPlay();
                  }
                }






                this.$http.get('user/userService/getUserWeChatVo').then(res=>{
                  // this.$http.get('way/serverport').then(res=>{
                  // this.mineInfo= res.data.data;
                  var mineInfo = res.data.data;
                  var time = filters.timeNumb(this.courseInfo.publishTime,'hh')
                  console.log(time);
                  var city  = mineInfo.nick_name?mineInfo.nick_name+'邀请您一起学习':'邀请您学习'
                  var shareText= '[直播]今天'+time+'时，'+city+this.courseInfo.curriculumTitle;

                  var shareJson={
                    type:1,
                    title:shareText,
                    desc:'财合税专家咨询平台',
                    link:'/#/live-detail?liveId='+this.$route.query.liveId,
                    imgUrl:this.courseInfo.coverUrl?this.courseInfo.coverUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
                  }
                  var shareJson2={
                    type:1,
                    title:shareText,
                    desc:'财合税专家咨询平台',
                    link:'/#/live-detail?liveId='+this.$route.query.liveId,
                    imgUrl:this.courseInfo.coverUrl?this.courseInfo.coverUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
                  }
                  this.$parent.shareTimePage(shareJson2);
                  this.$parent.shareAppPage(shareJson);





                })

              }
            })








    },
      getcomments(){
        //渲染讨论列表
        this.$http.post('curriculum/curriculumService/chat/list', {
          subData: {
            pageSize: 0,
            pageNum: 5,
            //videoId: 11
            videoId: this.liveId
          }
        }).then(res => {
          console.log(res.data)
        if (res.data.code == 1) {
          this.discussList = res.data.data
        } else {
          console.log(res.msg)
        }
      })
      },
      checksign(){
        //获取签到状态
        this.$http.post('curriculum/curriculumService/sign/get', {
          subData: {
            videoId: this.liveId
          }
        }).then(res => {
          this.isSign = res.data.data;
          if(this.isSign){
            this.isconnect();//链接聊天室
          }
      })
      },
      clicksign(){
        //点击签到
        this.$http.post('curriculum/curriculumService/sign/add', {
          subData: {
            videoId: this.liveId
          }
        }).then(res => {
          if(res.data.code == 1){
            this.sign = false;
          this.isconnect();//链接聊天室

          this.isSign = false;
          this.checksign();
        }else{
          this.sign = false;
        }
      })
      },
      isconnect(){
        this.getmineInfo().then(mine=>{
          return this.updatemineToken(mine)
        }).then(res=>{
            this.mineInfo.account = this.mines.imId;
            this.mineInfo.token =res;
            this.connectIm();

          })
      },
      joinTeam(){//加入群组
        return new Promise((resolve,reject)=>{
            this.$http.post('/authentication/weChatAut/im/inTeam',{
              subData:{
                tid:this.courseInfo.imTid,
                owner:this.courseInfo.expertImId,
                members:[this.mines.imId],
                magree:0,
                msg:'123',
                attach:'123123x'
              }

            }).then(res=>{
               resolve(res.data);
            })

        })
      }

    },
  destroyed(){
    this.$indicator.close()
    // if(this.playVideo){
    //   this.playVideo.release();
    // }
  },

  mounted() {
        this.liveId = this.$route.query.liveId;
        document.getElementById('app').style.background = '#FFF'
        // this.getcomments();
        this.getliveInfo2();
        // this.getsignlist();

        this.getliveInfo().then(res=>{
           return this.getmineInfo();
        }).then(res=>{
             return this.joinTeam();
        }).then(res=>{
          this.checksign();



// test



        })

       //将当前用户拉入群
    }
}
</script>
<style lang="scss" scoped>
  #player-container-id{
    width: 100%;
    height:400px;
  }
  #qqvideo{
    img{width:100%;}
  }
    #my-video{width:100%;}
    .qiancc {width:100%;height:100%; background:none!important;}
    .qiancc_s {
        position: fixed;
        width:100%;
        bottom:0;

    }
    .hisbtn { text-align: center;   }
    .hisbtn span {display: inline-block; padding:10px 20px;
        -webkit-border-radius: 100px; font-size:25px; background:#EEE;
        -moz-border-radius: 100px;
        border-radius: 100px;}


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
    }

.live-detail{

}
.tabContent {
   /*padding-top:700px;*/
}

.fixedTop{
    width:100%;




  background: #FFF;
}
.bigPic {
    width: 100%;

}

@import '../../assets/scss/neplayer.min.css';

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    font-size: 80px;
    line-height: 120px;
}

.tab {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    background-color: #fff;
    padding: 5pt 20pt 1pt;
    margin:0;
    border-bottom: 1px solid #ddd;
    .kuan {
        width: 50pt;
        height: 25pt;
        line-height: 25pt;
        text-align: center;
    }
    .line {
        width: 1pt;
        height: 20pt;
        background-color: #ddd;
    }
}

.sign {
    background-color: #fff;
    padding: 10pt 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .kuai {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        background-color: #C9A063;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
    }
    .hui {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        background-color: #f6f6f6;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
    }
}

.chat {
    text-align: center;
    line-height: 300pt;
    background-color: #fff;
    min-height: 300pt;
}

.active {
    color: #333 !important;
    border-bottom: 4px solid #C9A063;
}

#course-detail {
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
}





    /******************/
.chatFrame {
    padding: 0pt 5pt 10pt;
    width:100%;
    background-color: #fff;
    height: 100%;
    padding-bottom: 100px;
    overflow: auto;
    .serviceInfo {
        background-color: #f6f6f6;
        border-radius: 3pt;
        padding: 8pt;
        display: flex;
        flex-direction: row;
        -ms-align-items: center;
        align-items: center;
        margin-bottom: 10pt;
        h5 {
            margin-bottom: 10pt;
            font-size: 11pt;
            color: #333;
        }
        p {
            font-size: 10pt;
            color: #DCBD60;
        }
        img {
            height: 50pt;
            margin-right: 10pt;
        }
    }
    .chatList {
        .timeTag {
            text-align: center;
            color: #999;
            font-size: 10pt;
        }
    }
    .chatContent {
        display: flex;
        padding-right: 8pt;
        padding-bottom: 8pt;
        img {
            width: 35pt;
            height: 35pt;
            margin-right: 8pt;
        }
        .chatRight {
            padding-top: 8pt;
            h6 {
                padding-bottom: 5pt;
                span{
                    font-size: 10pt;
                    color: #333;
                    font-weight: 500;
                }
                label {
                    color: #999;
                    font-size: 7pt;
                    font-weight: 500;
                }
            }
            p {
                max-width: 490px;
                padding: 6pt;
                font-size: 10pt;
                color: #333;
                border-radius: 3pt;
                background-color: #f1f1f1;
            }
        }
    }
    .myContent {
        display: flex;
        padding-left: 8pt;
        padding-bottom: 8pt;
        justify-content: flex-end;
        img {
            width: 35pt;
            height: 35pt;
            margin-left: 8pt;
        }
        .chatRight {
            padding-top: 8pt;
            h6 {
                padding-bottom: 5pt;
                text-align: right;
                span {
                    font-size: 10pt;
                    color: #333;
                    font-weight: 500;
                }
                label {
                    color: #999;
                    font-size: 8pt;
                    font-weight: 500;
                }
            }
            p {
                max-width: 490px;
                padding: 6pt;
                font-size: 10pt;
                color: #333;
                border-radius: 3pt;
                background-color: #f1f1f1;
            }
        }
    }
}
.chatBottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 0 5pt;
    height: 30pt;
    background-color: #f1f1f1;
    border-top: 1pt solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    img {
        width: 17pt;
        height: 17pt;
        margin: 0 5pt 0 0;
    }
    input {
        height: 19pt;
        width: 600px;
        border-radius: 2pt;
        border: 0px solid #fff;
        box-shadow: none;
    }
    span.sendText{
        background: #a38a64;
        color:#FFF;
        padding:8px 12px;
        border-radius: 5px;
    }
    span.dissendText{
        background: #CCC;
        color:#FFF;
        padding:8px 12px;
        border-radius: 5px;
    }
    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .right {}
}
</style>
