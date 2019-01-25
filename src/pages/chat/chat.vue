<template>
    <div class="cframe">
        <div class="chatFrame">
<!--<button @click="playAudio({})">play</button>-->
            <div class="chatList" id="chatFrame">
                <div @click="gethisChat" v-show="hisbtn" class="hisbtn"><span>历史消息</span></div>
                    <template v-for="msg in msgList">
                        <p class="timeTag">{{msg.time | timeNumb('MM-dd hh:mm')}}</p>

                        <!--<div class="serviceInfo">-->
                            <!--<img src="./imgs/chang.png" alt="">-->
                            <!--<div>-->
                                <!--<h5>服务名称</h5>-->
                                <!--<p>¥ 服务价格</p>-->
                            <!--</div>-->
                        <!--</div>-->

                        <div class="chatContent"   v-show="mines.imId != msg.from && (msg.type == 'custom' && JSON.parse(msg.content).type == 'audio' || msg.type != 'custom')">
                            <img :src="targetHead" alt="">
                            <div class="chatRight">
                                <h6>
                                    <span>{{msg.fromNick}}</span>
                                    <!--<label for="">税务专家</label>-->
                                </h6>
                                <p v-if="msg.type == 'text'">
                                    {{msg.text}}
                                </p>
                                <p v-if="msg.type == 'image'">
                                    <img style="border-radius: 0;"  @click="viewImg(msg.file.url)" class="picc" :src="msg.file.url"/>
                                </p>
                                <p class="voice" v-if="msg.type == 'custom' && JSON.parse(msg.content).type == 'audio'" @click="playAudio(msg,$event)" style = 'background: rgb(245, 202, 138)'>
                                  <i>{{parseInt(JSON.parse(msg.content).timer/1000) == 0 ? 1:parseInt(JSON.parse(msg.content).timer/1000)}}s</i>&nbsp;&nbsp;<img  src="./imgs/audioIcon.png" />

                                </p>
                            </div>

                        </div>
<!--关联消息-->
                      <div class="relThing" v-if="msg.type == 'custom' && JSON.parse(msg.content).type == 'relting'">
                        <span class="relfrom">
                          <a>来源:[{{ $options.filters.cvtjson(msg.content).content.name }}]{{ $options.filters.cvtjson(msg.content).content.title }}</a>
                        </span>

                      </div>

                      <div class="relThing" v-if="msg.type == 'custom' && JSON.parse(msg.content).type == 'relzjt'">
                        <span class="relzjt">
                        专家团向您发送了一个需求表单，<router-link :to="{path:'collection',query:{pos:1}}">点击填写</router-link>
                        </span>
                      </div>
<!--关联消息-->
                        <div class="myContent" v-show="mines.imId == msg.from  && (msg.type == 'custom' && JSON.parse(msg.content).type == 'audio' || msg.type != 'custom')">
                            <div class="chatRight">
                                <h6>
                                    <span>{{msg.fromNick}}</span>
                                </h6>
                                <p v-if="msg.type == 'text'">
                                    {{msg.text}}
                                </p>
                                <p v-if="msg.type == 'image'">
                                    <img style="border-radius: 0" @click="viewImg(msg.file.url)" class="picc" :src="msg.file.url"/>
                                </p>
                               <p class="voice" v-if="msg.type == 'custom' && JSON.parse(msg.content).type == 'audio'" @click="playAudio(msg,$event)" style = 'background: rgb(245, 202, 138)'>
                               <i>{{parseInt(JSON.parse(msg.content).timer/1000) == 0 ? 1:parseInt(JSON.parse(msg.content).timer/1000)}}s</i>&nbsp;&nbsp;<img src="./imgs/audioIcon2.png"/>


                              </p>
                            </div>
                            <img  :src="mines.headimg_url" alt="">
                        </div>

                    </template>

            </div>
        </div>
        <!--v-show="ableChat"-->
        <div class="chatBottom" v-show="ableChat">
            <div class="left">
                <span>
                  <img v-show="!startVoice" @click="startVoice =!startVoice" src="./imgs/voice.png" alt="">
                  <img v-show="startVoice"  @click="startVoice =!startVoice" src="./imgs/writeText.png" alt="">
                  <!--<img  src="./imgs/writeText.png" alt="">-->
                </span>
              <!--@click="mostart" @touchstart="mostart" @touchend="mostart"-->
                <input v-show="!startVoice" v-model="sayText" @focus="mostart"  type="text">
              <div v-show="startVoice" class="record_voice " :class="isRcording?'record_press':''" @touchmove="moveRecord($event)"  @touchstart="startRecord($event)"  @touchend="endRecord($event)">
                <span  v-show="!isRcording">按住 说话</span>
                <span v-show="isRcording">松开 结束</span>
              </div>
            </div>
            <div class="right" >
                <!--<span><img src="./imgs/faces.png" alt=""></span>-->
                <span @click="moreaction = true"  v-show="!sayText"><img src="./imgs/add.png" alt=""></span>
                <span v-show="sayText && !startVoice"><button @click="saySend" class="sendbtn">发送</button></span>
            </div>
        </div>


        <mt-popup v-model="moreaction" position="bottom" @click.native="moreaction = false" class="chat_action" :modal="true">

            <div class="moreFrame">
                <div style="position:relative; overflow: hidden">
                    <input type="file"  accept="image/*" @change="sendPic" id="imgUpload" style="font-size:1000px; opacity: 0; position: absolute; top:0;left:0;"/>
                    <img  src="./imgs/photo.png" alt="">
                    <p>照片</p>
                </div>
                <!--<div>-->
                    <!--<img src="./imgs/camera.png" alt="">-->
                    <!--<p>拍摄</p>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<img src="./imgs/doctor.png" alt="">-->
                    <!--<p>发起会诊</p>-->
                <!--</div>-->
                <div v-show="mines.expert && targetInfos.user_type<2">
                    <img @click="sendmoneyShow = true" src="./imgs/charge.png" alt="">
                    <p>发起付费</p>
                </div>
                <div v-show="mines.expert">
                    <img @click="sendcaiji()" src="./imgs/expertRec.png" alt="">
                    <p>发送表单</p>
                </div>
                <!--<div>-->
                    <!--<img src="./imgs/class.png" alt="">-->
                    <!--<p>推荐课程</p>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<img src="./imgs/knowledge.png" alt="">-->
                    <!--<p>推荐知识</p>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<img src="./imgs/end.png" alt="">-->
                    <!--<p>结束查询</p>-->
                <!--</div>-->
            </div>

        </mt-popup>
        <sendMoney :moneyShow="sendmoneyShow" @monenok="sendOrderOk"></sendMoney>
        <!--客户支付-->
        <!--<pay :showPay = "parentShowpay" :buyInfo="buyInfo"   @close="payClose" ></pay>-->
        <div :is="c.component" v-for="c in paycomm" :showPay = "c.parentShowpay" :buyInfo="c.buyInfo"  @close="payClose"></div>
        <!--客户支付-->

       <!--  <div class="moreFrame">
        	<div>
        		<img src="./imgs/photo.png" alt="">
        		<p>照片</p>
        	</div>
        	<div>
        		<img src="./imgs/camera.png" alt="">
        		<p>拍摄</p>
        	</div>
        	<div>
        		<img src="./imgs/service.png" alt="">
        		<p>推荐服务</p>
        	</div>
        	<div>
        		<img src="./imgs/expert.png" alt="">
        		<p>推荐专家</p>
        	</div>
        	<div>
        		<img src="./imgs/class.png" alt="">
        		<p>推荐课程</p>
        	</div>
        	<div>
        		<img src="./imgs/knowledge.png" alt="">
        		<p>推荐知识</p>
        	</div>
        	<div>
        		<img src="./imgs/end.png" alt="">
        		<p>结束查询</p>
        	</div>
        	<div></div>
        </div> -->
        <relChat :isRel="isRel"></relChat>
        <!--<div class="nochatele" v-show="noChat"><div class="info">支付后可继续聊天</div><p><a @click="userPay">去支付</a></p></div>-->
      <div class="nochatele" v-show="noChat" >
        <div class="info">
          <div class="chat_desc">
            <img src="./imgs/nochatbg.png"/>
            <div class="desc_div">
              <div class="desc_text">
                <h3>
                  支付后可继续沟通
                </h3>
                <p>
                  专家每日排号有限，如您还需进一步咨询专家，请先付款哦，感谢您的支持！
                </p>
              </div>
              <div @click="userPay" class="desc_btns">去支付</div>
            </div>
          </div>
        </div>
        <!--<p><a >去支付</a></p>-->
      </div>
      <transition name="fade">
      <div class="newmssage" v-show="isShowMessage" >

        <div @click="goMessageCenter()"  class="messageC">
          <p class="tit">提醒</p>
          <p>您有新的消息点击进行查看</p>
          <span @click="closeMessage($event)" >关闭</span>
        </div>

      </div>
      </transition>

      <div class="viewbg" @click="viewUrl=''" v-show="viewUrl">
        <div class="closebtn" @click="viewUrl=''"><img src="./imgs/cancel.png"/></div>
        <transition name="fade">
        <img :src="viewUrl" @click="viewUrl=''">
        </transition>
      </div>

      <div class="exPay" v-if="pqyUserlist.length>0" >
        <div class="expayCon">
          <span @click="closePayOrder">关闭</span>
          <ul>
            <li v-for="s in pqyUserlist">
              <img :src="s.user_head">
              <p>{{s.user_name}} 已支付</p>
            </li>
          </ul>
        </div>
      </div>
      <div  class="fixedp" v-show="isRcording">
        <div class="rec">
          <div class="recImg">
            <img  v-show="recordSend" src="./imgs/recording.png">
            <img v-show="!recordSend" src="./imgs/recording_cancle.png">
          </div>
          <p v-show="recordSend">手指上滑 取消发送<br>不要超过60S</p>
          <p v-show="!recordSend">松开手指 取消发送</p>
        </div>
      </div>
      <audio ref="audios"></audio>
    </div>
</template>
<script>
    import Vue from 'vue'
    import sendMoney from '@/components/sendMoney'
    import pay from '@/components/pay'
    import relChat from '@/components/relChat'
    import { imAppKey,imAppSecret } from '@/constants'
export default {
      components:{sendMoney,relChat},
  data(){
    return{
      testChat:0,
      isShowMessage:false,
      viewUrl:'',
      isOnline:false,
      isRel:false,
      paycomm:[],
      moreaction:false,
      sayText:'',
      msgList:[],
      payInfoShow:false,
      mineInfo:{
        account:'caiheshui02',
        token:'111111'
      },
      targetAccount:null,
      nim:null,
      hisbtn:true,
      sendmoneyShow:false,
      noChat:false,
      mines:{},
      //支付入参
      buyInfo:{
        isCoupon:true,//是否使用优惠券
        buyTitle:'订单金额',//标题
        type:'1',//1专家  2知识 3课程 4 服务 5实体卡  6 充值 7虚拟卡
        info:{
          money:'998'
        },//商品基本信息
        wxPay:true,
        memberPay:false
      },
      parentShowpay:false,
      targetHead:'',
      userPayInfo:{},
      uPay:false,
      reflashOrder:null,
      ableChat:false,
      paysucees:false,
      payHeart:null,
      pqyUserlist:[],
      isPayinfo:false,
      targetInfos:null,
      startVoice:false,
      isRcording:false,
      startRecordTime:0,
      endRecordTime:0,
      moveX:[],
      moveingSign:true,
      recordSend:true,
      timeslong:0,
      relInfo:{}

    }

  },
  mounted(){
    document.getElementById('app').style.background="#FFF";
    let that = this;
    //获取自己的链接IM的信息
    this.targetAccount = this.$route.query.targetAccount;

    that.getmineInfo().then(mine=>{
      return that.updatemineToken(mine);
    }).then(updateMine=>{
      that.mineInfo.account=this.mines.imId;
      that.mineInfo.token=updateMine;


      that.connectIm();
      this.findOrder();
      that.findPayOrder()
    },(error)=>{
      console.log(error);
    })

    // 测试用
    if(this.$route.query.token){
      this.mineInfo.token = this.$route.query.token
    }
    if(this.$route.query.account){
      this.mineInfo.account = this.$route.query.account
    }

    // 测试用


    this.gethead();

    this.isAblechat();
    this.allowVoice();//允许录音

  },
  destroyed(){
    clearInterval(this.payHeart);
    this.$indicator.close()
        if(this.nim){
          clearInterval(this.reflashOrder)
          this.nim.destroy({
            done: function (err) {
              console.log('实例已被完全清除')
            }
          })

        }




  },
  methods:{
        sendcaiji(){
          let that = this;
          var sendNr={
            type:"relzjt",
            content:'专家团信息'
          }
          that.nim.sendCustomMsg({
            scene: 'p2p',
            to: that.targetAccount,
            content:JSON.stringify(sendNr),
            done: sendMsgDone
          });

          function sendMsgDone(error, msg) {

            console.log(error);
            console.log(msg);
            console.log('发送' + msg.scene + ' ' + JSON.stringify(msg.text) + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);

            that.$toast('发送成功');
            that.mostart();
            that.mostartWords();
            if(!error){
              that.msgList.push(msg);
              // that.addChatRecord(that.sayText);
            }else{
              that.$toast('消息发送失败，请重试');
            }
            document.getElementById('chatFrame').scrollTop =document.getElementById('chatFrame').scrollHeight+"px";
          }


        },
        sendrelInfo(){//发送关联产品 知识  课程 消息
          let that = this;
          var sendNr={
            type:"relting",
            content:this.relInfo
          }
          that.nim.sendCustomMsg({
            scene: 'p2p',
            to: that.targetAccount,
            content:JSON.stringify(sendNr),
            done: sendMsgDone
          });

          function sendMsgDone(error, msg) {
            // console.log(error);
            console.log(msg);
            console.log('发送' + msg.scene + ' ' + JSON.stringify(msg.text) + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);


            that.mostart();
            that.mostartWords();
            if(!error){
              that.msgList.push(msg);
              that.addChatRecord(that.sayText);
            }else{
              that.$toast('消息发送失败，请重试');
            }
            document.getElementById('chatFrame').scrollTop =document.getElementById('chatFrame').scrollHeight+"px";
          }

        },
        allowVoice(){
          if(!localStorage.getItem('rainAllowRecord')){
            wx.startRecord({
              success: function() {
                localStorage.setItem('rainAllowRecord',1);
                // 仅仅为了授权，所以立刻停掉
                wx.stopRecord();
              },
              cancel: function() {
                alert('用户拒绝授权录音');
                localStorage.setItem('rainAllowRecord',0);
              }
            });
          }
        },
    playAudio(voices,e){
      // this.$refs.audios.src="http://vod5aaoiaha.vod.126.net/vod5aaoiaha/f2aaeee5-0f95-4dfc-bd7a-29ae59dc55b0.mp3";
      // this.$refs.audios.play();

      var obj = JSON.parse(voices.content);
      // console.log(obj.voiceId);
      // alert(obj.voiceId);
      this.$refs.audios.src=obj.voiceId;
      this.$refs.audios.play();

      $('.voice').find('img').removeClass('playingv');
      var curplay = e.currentTarget;
      $(curplay).find('img').addClass('playingv');
      setTimeout(()=>{
        $(curplay).find('img').removeClass('playingv');
      },obj.timer)




    },
    startRecord(e){
      this.isRcording = true;
      this.startRecordTime = new Date().getTime();
      wx.ready(function () {
        wx.startRecord({
          success: function(){

          },
          cancel: function () {
            alert('用户拒绝授权录音');
          }
        });
      })
      e.preventDefault();
    },
    moveRecord(e){
      this.moveX.push(e.touches[0].pageY);
       if(this.moveX.length>2){
         var iend = this.moveX.length-1;
         if(this.moveX[0] - this.moveX[iend]>50){
           // console.log('上滑动取消');
           console.log(this.moveX[0] - this.moveX[iend]);
           this.recordSend = false;
         }else{
           this.recordSend = true;
         }

       }
    },
    endRecord(e){
      let that = this;
      this.isRcording = false;
      if(!this.recordSend){
        this.recordSend = true;
        wx.ready(function(){
          wx.stopRecord({
            success: function (res) {},
            fail: function (res) {

            }
          });
        })
        return false;
      }
      this.endRecordTime = new Date().getTime();
      if(this.endRecordTime - this.startRecordTime < 300){
        this.isRcording = false;
        alert('说话时间太短，请重新说一次');
        wx.ready(function (){
          wx.stopRecord({
            success: function (res) {},
            fail: function (res) {}
          });
        })
        return false;
      }
      this.timeslong = this.endRecordTime - this.startRecordTime;
      wx.ready(function (){
        wx.stopRecord({
          success: function (res) {
            // console.log(res);
            // voice.localId = res.localId;
            that.uploadVoice(res);
          },
          fail: function (res) {
            alert('不要超过一分钟');
          }
        });
      })

      e.preventDefault();
    },
    uploadVoice(obj){
      let that = this;
      wx.uploadVoice({
        localId: obj.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
          // alert('上传语音成功 serverId 为 '+res.serverId);
          that.$http.get('authentication/weChat/uploadVoiceToOSS?mediaId='+res.serverId).then(ret=>{
            // alert('上传语音成功，oss地址 为' + ret.data.data);
            if(ret.data.code == 0){
              that.sendVoice(ret);
            }else{
              that.$toast('语音发送失败，请重试');
            }
          })
        }
      });
    },
    sendVoice(obj){
      let that = this;
      var sendNr={
        type:"audio",
        timer:that.timeslong,
        voiceId:obj.data.data
      }
      that.nim.sendCustomMsg({
        scene: 'p2p',
        to: that.targetAccount,
        content:JSON.stringify(sendNr),
        done: sendMsgDone
      });

      function sendMsgDone(error, msg) {
        // console.log(error);
        console.log(msg);
        console.log('发送' + msg.scene + ' ' + JSON.stringify(msg.text) + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);


        that.mostart();
        that.mostartWords();
        if(!error){
          that.msgList.push(msg);
          that.addChatRecord(that.sayText);
        }else{
          that.$toast('消息发送失败，请重试');
        }
        document.getElementById('chatFrame').scrollTop =document.getElementById('chatFrame').scrollHeight+"px";
      }
      // this.nim.sendFile({
      //   scene: 'p2p',
      //   to: that.targetAccount,
      //   type: 'audio',
      //   dataURL:obj.data.data,
      //   beginupload: function(upload) {
      //     // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
      //     // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
      //   },
      //   uploadprogress: function(obj) {
      //     // that.$indicator.open('上传中...');
      //
      //   },
      //   uploaddone: function(error, file) {
      //     // console.log(error);
      //     // console.log(file);
      //     // console.log('上传' + (!error?'成功':'失败'));
      //     if(!error){
      //       setTimeout(()=>{
      //         that.$indicator.close()
      //       },500)
      //     }else{
      //       that.$toast('上传音频失败');
      //     }
      //   },
      //   beforesend: function(msg) {
      //     // console.log('正在发送p2p image消息, id=' + msg.idClient);
      //     that.msgList.push(msg);
      //     console.log(JSON.stringify(msg));
      //
      //   },
      //   // done: function (msg) {
      //   //   console.log(JSON.stringify(msg))
      //   // }
      // });

    },
    viewImg(str){


        wx.ready(function (){
          wx.previewImage({
            current: str, // 当前显示图片的http链接
            urls: [str] // 需要预览的图片http链接列表
          });
        })

    },
    mostart(){
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // if(isiOS){
      //   return false;
      // }
      setTimeout(()=>{
        $('html,body').scrollTop(9999);
      },1000)
    },
    mostartWords(){

      setTimeout(()=>{
         $('body,html').scrollTop(9999);
        $('.chatFrame').scrollTop(9999);
        // alert('1');
      },100)

    },
    isAblechat(){//查询是否可以聊天
      this.$http.post('/user/userService/expert/isAbleChat',{
        subData:{
          accId:this.targetAccount,
          content:''
        }
      }).then(res=>{
        this.ableChat = res.data.data;
        if(res.data.code == 1){
          if(!this.ableChat){
            alert('今天排号数量已使用完');
          }
        }else{
            alert(res.data.msg);
            this.ableChat = false;
        }
      })
    },
    gethead(){
      this.$http.get('user/userService/user/findUserByImId?imId='+this.targetAccount).then(res=>{
        this.targetHead = res.data.headimg_url;
        this.targetInfos = res.data;
      })
    },
    getpayState(){
      this.$http.post('order/orderService/getChatNewOrder',{
        subData:{
          imId:this.$route.query.targetAccount
        }
      }).then(res=>{
        if(res.data.data.id){
            this.userPayInfo = res.data.data;
            this.uPay = true;
            clearInterval(this.reflashOrder)
            this.creatPay();
            this.paycomm.push({
              component:pay,
              parentShowpay:true,
              buyInfo:this.buyInfo
            })
        }
      })
    },
    findOrder(){
      // if(this.mines.expert || (this.mines.agent && this.mines.agentLevel == 1)){
      //
      // }else{
      //   this.reflashOrder = setInterval(()=>{
      //     this.getpayState();
      //   },10000)
      //
      // }
      this.reflashOrder = setInterval(()=>{
        this.getpayState();
      },10000)
    },
    findPayOrder(){
      if(this.mines.expert){
        this.payHeart = setInterval(()=>{
          this.checkPayorder();
        },10000)
      }
    },
    closePayOrder(){
      this.pqyUserlist = [];
      this.payHeart = setInterval(()=>{
        this.checkPayorder();
      },10000)
    },
    checkPayorder(){

      let that = this;
      this.$http.post('order/orderService/expertOrderPayedToday').then(res=>{
        if(res.data.code == 1){
          this.pqyUserlist = res.data.data;
           if(this.pqyUserlist.length>0){
             clearInterval(that.payHeart);
           }
        }

      })

    },
    updatemineToken(obj){//更新用户token
      return new Promise((resolve,reject)=>{
        this.$http.post('authentication/weChatAut/im/refreshToken',{subData:obj.imId}).then(res=>{
            if(res.data.code == 1){
                resolve(res.data.data);

             }else{
                 reject(res.data.msg);
             }
        })
    })
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
    creatPay(){
      this.buyInfo={
        isCoupon:true,//是否使用优惠券
          buyTitle:'专家的付费咨询',//标题
          type:'1',//1专家  2知识 3课程 4 服务 5实体卡  6 充值 7虚拟卡
          info:{
          money:this.userPayInfo.pay_price,
          money1:this.userPayInfo.order_price,
          resourceId:this.userPayInfo.id
        },//商品基本信息
        wxPay:true,
        memberPay:false
      }
    },
    payClose(){
      this.paycomm[0].parentShowpay = false;
      this.noChat = true;
    },
    userPay(){
      this.noChat = false;
      this.paycomm[0].parentShowpay = true;
    },
    sendOrderOk(){
      this.sendmoneyShow = false;
    },
    connectIm() {
      let that  = this;
      if(!this.nim){
        this.$indicator.open('连接中...');
      }

      this.nim = this.$IM.NIM.getInstance({
        debug:false,
        appKey: imAppKey,
        account: that.mineInfo.account,
        token: that.mineInfo.token,
        onconnect: function () {
          that.getTodayChat();

          if(that.$route.query.rel){//发送自定义消息
            that.relInfo = JSON.parse(that.$route.query.rel);
            that.sendrelInfo();
          }
          adds();

          dyue();
              setTimeout(()=>{
                that.$indicator.close()
              that.$toast({
                message:'连接成功',
                duration:800
              })
            },500)
        },
        ondisconnect: function (obj) {
          that.$indicator.close()
        },
        onerror: function (error) {
          console.log(error);
          that.$indicator.close();
        },
        onroamingmsgs: onRoamingMsgs,
        onofflinemsgs: onOfflineMsgs,
        onmsg: that.onMsg,
        onfriends: onFriends,
        onpushevents: onPushEvents
      })
      function onPushEvents(param) {
        console.log(param);
        var arrrs = param.msgEvents;
        var idx = arrrs.findIndex(function (x) {
          return x.account == that.targetAccount
        })
        if(idx>=0){
          if(JSON.parse(arrrs[idx].serverConfig).online.length == 0){
            that.isOnline = false
          }else {
            that.isOnline = true
          }
        }else{
          that.isOnline = false
        }
        // console.log(that.isOnline);
        // console.log('订阅事件2222', param.msgEvents);
      }
      function dyue () {
        var arr = [];
        arr.push(that.targetAccount)
        that.nim.subscribeEvent({
          type: 1,
          accounts: arr,
          subscribeTime:  3600 * 24 * 30,
          sync: true,
          done: subscribeEventDone
        });
        function subscribeEventDone(error, obj) {
          console.log('订阅事件' + (!error?'成功':'失败'), error, obj);
        }

      }
      function fabudy(){
        // that.nim.publishEvent({
        //   type: 100000,
        //   value: 2,
        //   custom: 'hello world',
        //   vaildTime: 60,
        //   sync: false,
        //   done: publishEventDone
        // });
        // function publishEventDone(error, obj) {
        //   console.log('发布事件' + (!error?'成功':'失败'), error, obj);
        // }
      }
      function adds() {
        that.nim.addFriend({
          account: that.targetAccount,
          ps: 'ps',
          done: addFriendDone
        });
        function addFriendDone(error, obj) {
          console.log(error);
          console.log(obj);
          console.log('直接加为好友' + (!error?'成功':'失败'));
          // if (!error) {
          //   onAddFriend(obj.friend);
          // }
        }


      }

      function onFriends(friends) {
        console.log('收到好友列表', friends);
        dyue();
        // data.friends = nim.mergeFriends(data.friends, friends);
        // data.friends = nim.cutFriends(data.friends, friends.invalid);
        // refreshFriendsUI();
      }
      // test
      // this.nim.updateFriend({
      //   account: 'caiheshui02',
      //   alias: 'alias',
      //   custom: 'custom',
      //   done: updateFriendDone
      // });
      // function updateFriendDone(error, obj) {
      //   console.log(error);
      //   console.log(obj);
      //   console.log('更新好友' + (!error?'成功':'失败'));
      //   if (!error) {
      //     //onUpdateFriend(obj);
      //   }
      // }
// test
      function onRoamingMsgs(obj) {
        // console.log('收到漫游消息', obj);
        // that.msgList.pushMsg(obj.msgs);
      }
      function onOfflineMsgs(obj) {
        // console.log('收到离线消息', obj);
        // that.msgList.push(obj.msgs);
      }

    },
    onMsg(msg){
      let that = this;
      console.log('收到消息', msg.scene, msg.type, msg);
      if(msg.to == this.mines.imId && msg.from == this.targetAccount){


        that.msgList.push(msg);
        if(msg){
          that.mostart();
          that.mostartWords();
        }
      }else{
        if(msg && msg.text){
          that.isShowMessage = true;
          setTimeout(()=>{
            that.isShowMessage = false;
          },5000)
        }
        // this.$messagebox.confirm('有新的用户咨询您，点击前往查看','提醒',{
        //
        //   confirmButtonText: '前往'
        // }).then(ret=>{
        //   if(this.mines.expert){//专家咨询
        //     this.$router.push('/consult');
        //   }else{
        //     this.$router.push('/my-consulation');
        //   }
        //
        // });
      }

    },
    closeMessage(e){
      e.stopPropagation();
      this.isShowMessage = false;
      return false;
    },
    goMessageCenter(){
        if(this.mines.expert){//专家咨询
          this.$router.push('/consult');
        }else{
          this.$router.push('/my-consulation');
        }
    },
    gethisChat(){
      let that = this;

      that.nim.getHistoryMsgs({
        scene: 'p2p',
        to: that.targetAccount,
        done: getHistoryMsgsDone
      });
      function getHistoryMsgsDone(error, obj) {
        console.log('获取p2p历史消息' + (!error?'成功':'失败'));

        console.log(JSON.stringify(obj.msgs));
        that.msgList = obj.msgs.reverse();
        // that.autoScroll(999999);
        that.hisbtn = false;
        if (!error) {
          console.log(obj.msgs);
        }
      }

    },
    getTodayChat(){
      let that = this;
      var btime = new Date(new Date().toLocaleDateString()).getTime();
      var etime = new Date().getTime();

      that.nim.getHistoryMsgs({
        scene: 'p2p',
        beginTime:btime,
        endTime:etime,
        to: that.targetAccount,
        done: getHistoryMsgsDone
      });
      function getHistoryMsgsDone(error, obj) {
        console.log('获取p2p历史消息' + (!error?'成功':'失败'));

        console.log(JSON.stringify(obj.msgs));
        that.msgList = [];
        that.msgList = obj.msgs.reverse();
        that.mostart();
        that.mostartWords();
        // that.autoScroll(999999);
        // that.hisbtn = false;
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
        scene: 'p2p',
        to: that.targetAccount,
        text: that.sayText,
        done: sendMsgDone
      });
      // console.log('正在发送p2p text消息, id=' + msg.idClient);
      // pushMsg(msg);
      function sendMsgDone(error, msg) {
        // console.log(error);
        console.log(msg);
        console.log('发送' + msg.scene + ' ' + JSON.stringify(msg.text) + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);


        that.mostart();
        that.mostartWords();
        if(!error){
          that.msgList.push(msg);
          that.addChatRecord(that.sayText);
        }else{
          that.$toast('发送失败，请重试');
        }

        that.sayText = '';
        // that.autoScroll(999999);

// console.log(document.getElementById('chatFrame').scrollHeight+"px");
        document.getElementById('chatFrame').scrollTop =document.getElementById('chatFrame').scrollHeight+"px";
      }


    },
    sendPic(event){
      let that = this;
       this.nim.sendFile({
         scene: 'p2p',
         to: that.targetAccount,
         type: 'image',
         fileInput: document.getElementById('imgUpload'),
         beginupload: function(upload) {
           // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
           // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
         },
         uploadprogress: function(obj) {
           that.$indicator.open('上传中...');

         },
         uploaddone: function(error, file) {
           // console.log(error);
           // console.log(file);
           // console.log('上传' + (!error?'成功':'失败'));
           if(!error){
             setTimeout(()=>{
               that.$indicator.close()
           },500)
           }else{
             that.$toast('上传图片失败');
           }
         },
         beforesend: function(msg) {
           // console.log('正在发送p2p image消息, id=' + msg.idClient);
           that.msgList.push(msg);
           that.addChatRecord('图片消息');
           console.log(JSON.stringify(msg));

         },
         // done: function (msg) {
         //   console.log(JSON.stringify(msg))
         // }
       });

       this.moreaction = false;
       event.stopPropagation();//不会打印1，但是页面会跳转；

     },
    addChatRecord(msg){//咨询记录添加
      this.$http.post('/user/userService//expert/addChat',{
        subData:{
          accId:this.targetAccount,
          content:msg,
          isOnline:this.isOnline
        }
      }).then(res=>{

      })

    }
  }
}
</script>
<style lang="scss" scoped>
  .relThing{

    margin:20px auto;
    padding-bottom:30px;

    text-align: center;
    font-size:25px;

.relfrom{
  margin:0 auto;
  text-align: center;
  a{
    font-size:25px;
  }
  font-size:25px;
}

    span{
      font-size:25px;
      background:rgba(0,0,0,.1);
      color:#666;
      padding:10px;
      border-radius: 10px;
      a{
        font-size:20px;
        color:#666;
      }
    }
    .relzjt{
      a{
        font-size:25px;
        color:#08F ;
        text-decoration: underline;
      }
    }
  }

  .fixedp{
    position:absolute;
    width:280px;
    height:280px;
    left:50%;
    top:50%;
    margin-left:-140px;
    margin-top:-140px;
    color:#FFF;
    background: rgba(0,0,0,.7);
    text-align: center;
    border-radius:10px ;
    .rec{
      .recImg{
        width:160px;
        height:160px;
        text-align: center;
        margin:0 auto;
        margin-top:30px;
        img{
          width:100%;
          height: 100%;
        }

      }
    }
  }
  .exPay{
    position: fixed;
    width:100%;

    top:0;
    left:0;
    .expayCon{
      position: relative;
      background: linear-gradient(#FFFFFF,#F5F5F5);
      min-height: 100px;
      margin:20px;
      box-shadow: 0 0 20px #DDD;
      border:2px solid #DDD;
      border-radius: 10px;
      padding:10px 0;
      ul{
        li{

          height:60px;
          line-height: 60px;
          img{width:40px;
            position: relative; top:10px; float:left; margin-right: 8px;  display: inline-block }
          text-align: left;
          height:60px;
          padding-left:20px;
          display: block;
          clear: both;
          border-bottom: 1px solid #EEE;
          p{
            font-size:25px;
            color:#666;
            position: relative;
            top:3px;
            float:left;
            b{
              color:#F60;
            }
          }
        }
      }
      span{
        position: absolute;
        top:10px;
        font-size:25px;
        right:10px;
      }
    }
  }
  .viewbg{ width:100%;
    .closebtn{
      top:0px;
      right:0px;
      padding:0;
      position: fixed;
      width:80px; height:80px;
      background:#000;
      color:#FFF;
      opacity: .8;
      img{width:100%;

        display: block;
      }
    }
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    overflow: auto;
    z-index:99999;
    background: rgba(0,0,0,.5);
    img{width:100%;}
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .newmssage{
    position: fixed;
    width:100%;
    top:0;left:0;
    .messageC{

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      margin:20px;
      padding:20px;
      position: relative;
      height:100%;
      border:1px solid #EEE;
      background:#f8f8f8; box-shadow:0px 2px 5px #DDD;
      transition: all .2s;
      span{
        position: absolute;
        right:20px;
        top:20px;
        font-size:25px;
        background: #e7e7e7;
        border-radius: 100px;
        padding:5px 10px;
      }
      p{
        font-size:25px;
        color:#b5935c;
      }
      p.tit{
        color:#b5935c;
        font-weight: bold;
        font-size:25px;
      }
    }
  }
    .nochatele{
        width:100%;

        position: fixed;
        left: 0;
        background: rgba(0,0,0,.5);
        height: 100%;
        text-align: center;
        top:0;

        z-index:99999999;
        a{
            padding:20px 30px;
            color:#FFF;
            background:#ffcc66;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
        .info{
          padding-top:200px; padding-bottom: 100px; color:#FFF;
          .chat_desc{
            position: relative;
            margin:0 auto; width:658px; height:834px;
            img{width:100%;}
            .desc_div{
              position: absolute;
              top:400px;
              padding:0 10%;
              .desc_text{

                color:#666;
                padding:40px 0;
                h3{
                  font-size:30px;padding:15px 0;
                }

              }
              .desc_btns{

                width:90%;
                margin:0 auto;
                background: #b5935c;
                padding:15px;
                font-weight: bold;
                font-size:30px;
                border-radius: 10px;
              }
            }

          }
        }
    }
    .pay_action {
        width:100%;
        height:100%;

    }
    .meminfo {
        position: absolute; top:30px; right:10px; font-size:25px; color:#F60;}
    .meminfo b { border:2px solid #F60;padding:8px 10px; margin: 0 15px;
        -webkit-border-radius: 10px;
        font-size:25px;
        -moz-border-radius: 10px;
        border-radius: 10px;}
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
    .hisbtn { text-align: center; }
    .hisbtn span {display: inline-block; padding:10px 20px;
        -webkit-border-radius: 100px; font-size:25px; background:#EEE;
        -moz-border-radius: 100px;
        border-radius: 100px;}
    .cframe {

    width:100%;

      height:100%;

    }
    .chat_action {width:100%; height:100%;}
    .mint-popup { background: none;}
#app {
    background-color: #fff;
}
.chatFrame {
    padding: 10pt 5pt 10pt;

    width:100%;
  position: fixed;
  bottom:80px;
  -webkit-overflow-scrolling: touch;
    top:0;
    left:0;
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

            border-radius:1000px ;
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
              .playingv{
                animation:mymove .8s infinite;
                @keyframes mymove
                {
                  from {opacity: 0}
                  to {opacity: 0.8}
                }
              }
              img{
                width:35px;
                height:35px;
                border-radius: 0;
              }
              .picc{


                width: 200px;
                height:auto;
                margin-right: 0;

              }

                i{
                  position: relative;
                  font-style: normal;
                  top:8px;
                  float:right;
                }
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
            border-radius: 1000px;
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
              .playingv{
                animation:mymove .8s infinite;
                @keyframes mymove
                {
                  from {opacity: 0}
                  to {opacity: 0.8}
                }
              }
              img{
                width:35px;
                height:35px;
                border-radius: 0;
              }
              i{
                position: relative;
                font-style: normal;
                top:8px;
                float:left;
              }
              .picc{


                width: 200px;
                height:auto;
                margin-left: 0;

              }
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
    z-index:99;
    height: 45pt;
    background-color: #f1f1f1;
    border-top: 1pt solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    img {
        width: 22pt;
        height: 22pt;
        margin: 0 5pt 0 0;
    }
    input {
        height: 25pt;
        width: 560px;
        border-radius: 2pt;
        border: 0px solid #fff;
        box-shadow: none;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
      .record_voice{
        background: #F6F6F6;
        text-align: center;
        user-select:none;
        width:580px;
        border-radius:5px;
        color:#666;
        border:2px solid #CCC;
        line-height: 35pt;
        position: relative;
        height:35pt;
      }
      .record_press{
        background:#e1e1e1;

      }
    }
    .right {margin-left:10px}
    .sendbtn {
            background:#C9A061;
        color:#FFF;
        -webkit-border-radius: 5px;
        padding:11px 10px;
border:none;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
}
.moreFrame{
	position: fixed;
	bottom:0pt;
	left:0pt;
	width:100%;
	padding:5pt 10pt 5pt;
	height:160pt;
	background-color: #f1f1f1;
	border-top: 1pt solid #ddd;

	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	div{
		width:25%;
		float:left;
        text-align: center;
		-ms-align-items: center;
		align-items: center;
		margin-top: 5pt;
		img{
			width:65%;
			margin-bottom: 5pt;
		}
		p{
			font-size: 9pt;
			line-height: 15pt;
		}
	}
}
</style>


