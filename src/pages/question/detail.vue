
<template>

  <div id="question">
	  <ul class="box4 ">
        <li class="clear pss">
          <div class="state">
            <img v-show="questionInfo.askUser.state == 0" class="stateimg" src="./imgs/state22.png"/>
            <img v-show="questionInfo.askUser.state == 1" class="stateimg" src="./imgs/state22.png"/>
            <img v-show="questionInfo.askUser.state == 2" class="stateimg" src="./imgs/state33.png"/>
            <img v-show="questionInfo.askUser.state == 3" class="stateimg" src="./imgs/state44.png"/>
            <img v-show="questionInfo.askUser.state == 4" class="stateimg" src="./imgs/state44.png"/>
          </div>


          <img :src="questionInfo.askUser.user_head" class="ar-l">
          <div class="desc ar-l">
            <div class="clear t1">
              <span class="ar-l">{{questionInfo.askUser.nick_name}}</span>
              <span class="ar-r">{{questionInfo.askUser.created_time | time}}</span>
            </div>
            <p v-html="questionInfo.askUser.question_content"> </p>
            <div class="question_pic_list" v-if="questionInfo.askUser.question_pic">
<ul>
                <li @click="viewPic(questionInfo.askUser.question_pic)">
                  <img  :src="questionInfo.askUser.question_pic"/>
                </li>
  <div class="cl"></div>
</ul>
            </div>

            <div class="clear t2">
               <!--<span class="ar-l">悬赏 50元</span>-->

              <span class="ar-r"><span class="mar">回答{{questionInfo.answers.length?(questionInfo.answers.length):'0'}}</span>
                <!--关注{{questionInfo.attentionCount?questionInfo.attentionCount:'0'}}-->
              </span>
            </div>
          </div>
        </li>
    </ul>

    <div class="di">
      <div class="isdonequestion" @click="yijiejue(m)" v-show="ismy && questionInfo.askUser.state>0 && questionInfo.askUser.state !=2">此问题已解决</div>
      <div class="wo"  v-show="questionInfo.askUser.state !== 2 || mineInfo.expert" @click="goAnswer">
        我来回答
      </div>
    </div>
    <div class="daoliuExpert" v-show="ismy && questionInfo.askUser.state>0 && questionInfo.askUser.state !=2">
      <router-link :to="{path:'/experts'}"><img src="./imgs/zjt.jpg"/></router-link>
    </div>

    <div class="replys">
      <!-- <div class="noAnswer">
        <img src="./imgs/icon1.png" alt=""/>
      </div> -->
      <div class="answers">

        <ul class="box5 ">
            <li class="clear" :class="(questionInfo.askUser.finish_time && questionInfo.askUser.finish_time<m.created_time) && m.expert_level>0 ?'gaoliang':''"  v-for="m in questionInfo.answers">
              <div class="hbao" v-if="m.charge">
                <ul class="wgm" @click="buyQue(m)" v-if="m.is_able_read == 1">
                  <img :src="m.user_head" class="zjimg"/>
                  <div class="zjimfo">
                      <span >{{m.nick_name | textFilterPhone}}
                      <i  v-if="m.expert_level == 1" class="exp_biao"><img src="./imgs/exp_1.png"/></i>
                      <i   v-if="m.expert_level == 2" class="exp_biao"><img src="./imgs/exp_2_text.png"/></i>
                      <i   v-if="m.expert_level == 3" class="exp_biao"><img src="./imgs/exp_3.png"/></i>
                      <!--<i @click="goExpert(m)" v-if="m.expert_level == 1" class="exp_biao"><img src="./imgs/exp_1.png"/></i>-->
                      <!--<i @click="goExpert(m)" v-if="m.expert_level == 2" class="exp_biao"><img src="./imgs/exp_2_text.png"/></i>-->
                      <!--<i @click="goExpert(m)" v-if="m.expert_level == 3" class="exp_biao"><img src="./imgs/exp_3.png"/></i>-->
                    </span>
                    <p>打开锦囊，查看专家回复。</p>
                  </div>

                </ul>
                <ul class="ygm" v-if="m.is_able_read == 0">
                  <img :src="m.user_head" class="zjimg"/>
                  <div class="zjimfo">

                      <span >{{m.nick_name | textFilterPhone}}
                      <i @click="goExpert(m)" v-if="m.expert_level == 1" class="exp_biao"><img src="./imgs/exp_1.png"/></i>
                      <i @click="goExpert(m)" v-if="m.expert_level == 2" class="exp_biao"><img src="./imgs/exp_2_text.png"/></i>
                      <i @click="goExpert(m)" v-if="m.expert_level == 3" class="exp_biao"><img src="./imgs/exp_3.png"/></i>

                    </span>
                    <!--<div>fame123500 回答于2018-12-12 29:20</div>-->
                    <div class="ptime">{{m.created_time | time}}</div>
                    <p  v-html="m.answer_content" ></p>
                  </div>
                  <div class="cl"></div>

                </ul>
              </div>
              <div v-if="!m.charge">
                <img :src="m.user_head" class="ar-l"/>

                <div class="desc ar-l" >
                  <div class="clear t1">
                    <span class="ar-l">{{m.nick_name | textFilterPhone}}
                      <i @click="goExpert(m)" v-if="m.expert_level == 1" class="exp_biao"><img src="./imgs/exp_1.png"/></i>
                      <i @click="goExpert(m)" v-if="m.expert_level == 2" class="exp_biao"><img src="./imgs/exp_2.png"/></i>
                      <i @click="goExpert(m)" v-if="m.expert_level == 3" class="exp_biao"><img src="./imgs/exp_3.png"/></i>
                    </span>
                    <span class="ar-r">{{m.created_time | time}}</span>
                  </div><div class="cl"></div>
                  <div class="ansource" v-if="m.p_content">{{m.p_nick_name}} 回答于{{m.p_created_at | timeNumb('MM-dd hh:mm')}}<p class="zhuic"><div v-html="m.p_content"></div> <div class="cl"></div></p><div class="cl"></div></div>
                  <p><span style="background:#ffcc66; color:#FFF; font-size:13px; padding:0 2px; display: inline-block; border-radius: 3px;" v-show="m.is_best">最佳</span><a style="color:#333" v-html="m.answer_content"></a>
                    <div v-show="m.is_tip == 1" class="fl" style="color:rgb(201, 133, 0)"><img src="./imgs/wallet.png" style="width:18px; position:relative; height: 18px; margin:0; margin-right:5px; top:4px;"><span>已打赏</span></div>
                    <div class="fr zhuis">
                      <span @click="zan(m)" v-if="!m.thumb_id"><i class="newzan"><img  src="./imgs/newzan1.png"/></i>赞{{m.thumb_num}}</span>
                      <span @click="zan(m)" v-if="m.thumb_id"><i class="newzan"><img  src="./imgs/newzan2.png"/></i>赞{{m.thumb_num}}</span>
                      &nbsp;<p style="display: inline" v-show="questionInfo.askUser.state !== 2">|&nbsp;<span  @click="zhuiwen(m)"><i class="zhuiicon"><img src="./imgs/zhuiicon.png"/> </i>回复</span></p>  </div>
                    <div class="cl"></div>
                  </p>

                  <div class="clear t2">
                    <span class="ar-r"></span>
                    <!-- <span class="ar-l">悬赏 50元</span> -->
                    <!--<span class="ar-r"><span class="mar">回复</span>收起</span>-->
                  </div>

                </div>
                <div v-show="ismy && !isbest && questionInfo.askUser.state>0" style="display: block; padding:15px 0; clear:both; text-align: center"><span class="isdone"  @click="zuijia(m)">设为最佳答案</span></div>

              </div>
            </li>

          <!--<div class="apply_answer">-->
            <!--<div><textarea></textarea></div>-->
            <!--<div><button>提交</button></div>-->
          <!--</div>-->
            <!--<li class="clear">-->
              <!--<img src="../knowledge/imgs/temp.jpg" class="ar-l">-->
            <!---->
              <!--<div class="desc ar-l">-->
                <!---->
                <!--<div class="clear t1">-->
                  <!--<span class="ar-l">张俪</span>-->
                  <!--<span class="ar-r">30分钟前</span>-->
                <!--</div>-->

                <!--<p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>-->
                <!---->
                <!--<div class="clear t2">-->
                  <!--&lt;!&ndash; <span class="ar-l">悬赏 50元</span> &ndash;&gt;-->
                  <!--<span class="ar-r"><span class="mar">回复</span>收起</span>-->
                <!--</div> -->

                <!--<div class="clear t3">-->
                  <!--<div class="clear">-->
                    <!--<span class="ar-l">张俪</span>-->
                    <!--<span class="ar-r">30分钟前</span>-->
                  <!--</div>-->
                  <!--<p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>-->
                <!--</div>-->
                <!--<div class="clear t3">-->
                  <!--<div class="clear">-->
                    <!--<span class="ar-l">张俪</span>-->
                    <!--<span class="ar-r">30分钟前</span>-->
                  <!--</div>-->
                  <!--<p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>-->
                <!--</div>-->
               <!---->
               <!---->
              <!--</div>-->
            <!--</li>-->
        </ul>
        <noresult v-show="questionInfo.answers.length == 0" :tipText="'暂无记录'"></noresult>
        <div :is="c.component" v-for="c in paycomm" :showPay = "c.parentShowpay" :buyInfo="c.buyInfo"  @close="payClose"></div>
      </div>
    </div>

    <!--v-show = "vipQuestion"-->
    <div class="vipQes" v-show = "vipQuestion" >
      <div class="vipQescc">
        <h3><span><img @click="vipQuestion=false" src="../experts/imgs/cancel2.png"/></span></h3>
        <!--<div class="img1"><img src="./imgs/jinnang.png"></div>-->
        <div class="imgtext">
          <h3>VIP会员<br> 享专属特权
            免费打开锦囊</h3>
          <p class="text1">￥{{buyobj.charge}}</p>
          <p class="text2">￥0.00</p>
        </div>
        <div class="img2" @click="createVipOrder()"><img src="./imgs/chaijinnang.png"></div>
      </div>
      <!--<button >买</button>-->
    </div>

    <div :is="item.component" :parentShowzhui="item.parentShowzhui" @submitzhui ="submitzhui" :zhuiInfo="item.zhuiInfo" @close="closezhui" v-for="item in zhuis"></div>


  </div>
</template>
<script>
  import tabbar from '../../components/tabbar'
  import pay from '@/components/pay'
  import {time} from '@/filters/index'
  import noresult from '@/components/noresult'
  import zhui from '@/components/zhui'

  export default {

    data() {
      return {
        vipQuestion:false,
        zhuis:[],
        zhuishow:false,
        ismy:false,
        isbest:false,
        paycomm:[],
        viewpic:'',
        buyInfo:{},
        isShowVip:{},
        vipquesBuy:true,
        buyobj:{},
        myinfos:{},
        mineInfo:{},
        questionInfo:{
          askUser:{},
          answers:[]
        }
      }
    },
    components: {
      noresult,pay
      //
    },

    computed: {
      //
    },

    methods: {
      checkUser(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
          // if(!this.mineInfo.mobile){
          //   this.$messagebox.confirm('请完善用户信息后继续回答问题', '提示').then(ret=>{
          //     this.$router.push('/login');
          //   });
          //   return false;
          // }

        })
      },
      zan(m){
        // var idx = this.questionInfo.answers.findIndex(function (item) {
        //   return m.answer_id == item.answer_id
        // })
        if(m.thumb_id){
          this.$http.get('/ask/askService/deleteThumbUp?id='+m.answer_id).then(res=>{
            this.getqDetail();

          })

        }else{
          this.$http.get('/ask/askService/addThumbUp?id='+m.answer_id).then(res=>{
            this.getqDetail();
          })

        }


      },
      submitzhui(){
        this.zhuis[0].parentShowzhui = false;
        this.zhuis=[];
        this.getqDetail();
      },
      closezhui(){

        this.zhuis[0].parentShowzhui = false;
        this.zhuis=[];

      },
      zhuiwen(m){
        this.zhuis.push({
          component:zhui,
          parentShowzhui:true,
          zhuiInfo:{
            qid:this.$route.query.questionId,
            anid:m.answer_id
          }
        })
        // this.$router.push({path:'/answer-question',query:{pid:m.answer_id,questionId:this.$route.query.questionId}});
      },
      buyQue(obj){

        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.myinfos = res.data.data;
          if(!res.data.data.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示', {confirmButtonText: '确定'}).then(ret=>{
              this.$router.push('/login');
            });
            return false;


          }else{
            if(this.myinfos.user_type == 2){//超级vip 不需购买
              // alert('创建订单');
              this.vipQuestion = true;
              this.buyobj = obj;
            }else{
              this.buyobj = obj;
              this.toPayinfo();
              this.paycomm.push({
                component:pay,
                parentShowpay:true,
                buyInfo:this.buyInfo

              })

            }


          }
        })

      },
      createVipOrder(){
        if(!this.vipquesBuy){
          return false;
        }
        this.vipquesBuy = false;
        this.$http.post('order/orderService/newOrder',{
          subData:{
            order_type:'8',
            order_resource_id:this.buyobj.answer_id,
            amount:0,
          }
        }).then(res=>{
          // alert('购买成功');
          this.vipquesBuy = true;
          this.vipQuestion = false;
          this.getqDetail();

        })

      },
      payClose(){
        this.paycomm[0].parentShowpay = false;
        this.paycomm=[];
      },
      toPayinfo(){

        this.buyInfo={
          buyTitle:'订单金额',//标题
          isCoupon:true,//是否使用优惠券
          type:'8',//购买问题
          info:{
            money:this.buyobj.charge,
            money1:this.buyobj.charge,
            resourceId:this.buyobj.answer_id
          },//商品基本信息
          wxPay:true,
          memberPay:false
        }
      },
      viewPic(obj){
        wx.ready(function (){
          wx.previewImage({
          current: obj, // 当前显示图片的http链接
          urls: [obj] // 需要预览的图片http链接列表
          });
        })
      },

      goExpert(obj){
        if(obj.expert_level == 2){
          this.$router.push({path:'/expert-detail',query:{id:obj.expert_id}});
        }
        if(obj.expert_level == 1 ||obj.expert_level == 3){
          this.$router.push({path:'/expert-detail',query:{ph:1,id:obj.expert_id}});
        }

      },
      yijiejue(obj){
        this.$http.post('ask/askService//finishQuestion',{
          subData:this.questionInfo.askUser.ask_question_id
        }).then(res=>{
          if(res.data.code == 1){
          this.$toast('操作成功');
          this.ismy = false;
          this.getqDetail();

        }


      })
      },
      zuijia(obj){

        this.$http.post('ask/askService/setBestAnswer',{
          subData:obj.answer_id
        }).then(res=>{
          if(res.data.code == 1){
            this.$toast('操作成功');
            this.isbest = true;
            this.getqDetail();

        }


        })

      },
      isRight(){
        this.$http.post('',{
          subData:{}
        }).then(res=>{

        })

      },
      goToCourse(){
        this.$router.push({path: 'course', query: this.$route.query})
      },

      goAnswer(){
        this.$router.push({path: 'answer-question', query: this.$route.query})
      },
      getqDetail(){
        this.$http.post('ask/askService/getDetail',{"subData": this.$route.query.questionId}).then(res => {
          console.log(res.data)
        if (res.data.code == 1) {

          this.questionInfo = res.data.data
          this.ismy = this.questionInfo.myself;
          this.isbest = this.questionInfo.hasBest;





        }else{
          //
        }
      })
      }

    },

    mounted() {
      this.checkUser();

      this.$http.post('ask/askService/getDetail',{"subData": this.$route.query.questionId}).then(res => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.questionInfo = res.data.data
          this.ismy = this.questionInfo.myself;
          this.isbest = this.questionInfo.hasBest;

          function delHtmlTag(str){
            return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
          }
          var nr = delHtmlTag(this.questionInfo.askUser.question_content);



          var shareJson={
            type:1,
            title:'我在财合税专家咨询平台提问了，快来帮我解决吧！',
            desc:'财合税专家咨询平台，您身边的财税专家。',
            link:'/#/question-detail?questionId='+this.$route.query.questionId,
            imgUrl:this.questionInfo.askUser.user_head?this.questionInfo.askUser.user_head:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
          }
          var shareJson2={
            type:1,
            title:'我在财合税专家咨询平台提问了，快来帮我解决吧！',
            desc:'财合税专家咨询平台，您身边的财税专家。',
            link:'/#/question-detail?questionId='+this.$route.query.questionId,
            imgUrl:this.questionInfo.askUser.user_head?this.questionInfo.askUser.user_head:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
          }
          this.$parent.shareTimePage(shareJson2);
          this.$parent.shareAppPage(shareJson);


        }else{
          //
        }
      })
    }
  }

</script>

<style lang="scss" scoped>
  .zhuis{
    color:#CCC;
  }
  .zhuis span{ margin:0 20px; color:#333;
   i.zhuiicon{

   }
  }
  .ansource{background: #F7F7F7;  font-size:16px;   padding:20px;

    padding-bottom: 10px;
    color:#999;
    border-radius: 5px;
  p.zhuic{
    color: #333;
    margin:0;
  }
  }
  .vipQes{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.5);
    z-index:99;
    .vipQescc{
      position: relative;
      width:600px;
      margin:0 auto;
      height:800px;
      overflow: hidden;
      background:#D73321 ;
      top:160px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      text-align: center;
      .img1{
        width:200px;
        opacity: .2;

        margin:0 auto;
        margin-top:100px;
      }
      .imgtext{
        text-align: center;
        h3{
          color:#FFCF00;
          margin-top:200px;
          font-size:35px;
          padding-bottom: 20px;

        }
        .text1{
          font-size:55px;

          color:#FFF;
          text-decoration:line-through;
        }
        .text2{
          font-size:35px;
          color:#FFCF00;

        }

      }
      .img2{
        width:150px;
        padding-top:50px;
        img{
          width:100%;
        }
        margin:0 auto;

      }
      h3{

        span{
          img{
            width: 50px;
            opacity: .3;
          }
          position: absolute;
          top:10px;
          right:20px;
        }
      }
    }
  }

  .daoliuExpert{

    background: #FFF;
    margin-top:20px;
    img{width:100%;}
  }
  .isdonequestion {color: #b5935c; text-align: center; padding:10px 0 20px 0; margin-bottom: 20px; text-decoration: underline;}
  .isdone {
    border:1px solid  #b5935c;
    color:#b5935c!important;
    border:2px solid #b5935c;
    padding:5px 10px;
    border-radius: 10px;
  }
  #question{
    background:#f6f6f6;
    padding-bottom: 120px;

    .header{
      width:750px;
      height:90x;
      background:#fff;
      padding-left:80px;
      li{
        height:90px;
        line-height:90px;
        font-size:34px;
        color:#999;
        text-align:center;

        &.ar-l{
          width:212px;
        }
        &.ar-l:first-child{
          margin-right:70px;
        }
        &.ar-r{
          width:110px;
          border-left:1px solid #eee;
          img{
            width:40px;
            margin-top:24px;
          }
        }
      }
    }
    .box1{
      height:138px;
      padding-top:34px;
      div{
        width:600px;
        height:70px;
        line-height:70px;
        background:rgba(181,147,92,1);
        font-size:34px;
        color:#fff;
        margin:0 auto;
        text-align:center;
        border-radius:8px;
      }
    }
    .box2{
      margin-bottom:10px;
      padding:32px 0 24px 48px;
      background:#fff;
      li{
        text-align:center;
        margin-right:30px;
        &:last-child{
          margin-right:0;
        }
      }
      img{
        width:100px;
        height:100px;
        border-radius:50px;
      }
      div{
        color:#2F2F2F;
        font-size:28px;
        margin-top:10px;
      }
    }
    .box3{
      padding-left:24px;
      border-bottom:2px solid #ddd;
      background:#fff;
      li{
        width:212px;
        line-height:90px;
        height:90px;
        text-align:center;
        margin-right:33px;
        color:#2F2F2F;
        font-size:30px;
        &:last-child{
          margin-right:0;
        }
      }
    }
    .active{
      color:#C9A063 !important;
      border-bottom:4px solid #C9A063;
    }

    .box4{
      background:#fff;
      padding:34px 0 42px;
      li{
        padding-top:28px;
        img{
          width:60px;
          height:60px;
          margin:0 22px 0 40px;
          border-radius: 60px;
        }

        .desc{
          width:590px;
          padding-bottom:16px;
          .t1 .ar-l{
            color:#333;
            font-size:30px;
            line-height:60px;
          }

          .t1 .ar-r{
            color:#999;
            font-size:24px;
            line-height:60px;
          }
          p{
            color:#333;
            font-size:28px;
            line-height:40px;
            margin:24px 0 38px;
            word-break:break-all;
          }
          .t2 span{
            color:#666;
            font-size:24px;
          }
          .mar{
            margin-right:22px;
          }
        }
        .question_pic_list{
          ul{
            li{
              padding:0;
              float:left;
              img{
                width:150px;
                height:150px;
                margin:0;
                padding: 0;
                border-radius: 10px;
              }
            }
          }

        }
      }
      .pss{
        position: relative;
        .state{

          position:absolute;
          top:5pt;
          right:80pt;
          width:150px;
          height:150px;
          img{width:100px;
            height: 100px;}
        }

      }

    }
     .box5{

      padding:10px 0 10px;
       .gaoliang{background: #fde7c4}
      li{
        i.zhuiicon{
          img{ width:35px; height:35px;
            position: relative; top:4px; margin:0; margin-right:5px; border-radius: 0;}
        }
        i.newzan{
          img{width:35px; height:35px;
            position: relative; top:4px; margin:0; margin-right:5px; border-radius: 0;}
        }
        .hbao{
          margin-top:-35px;
          ul.wgm{
            height:196px;
            background: url("./imgs/hbao.png") center no-repeat;
            background-size: 100%;
            color:#FFF;
            .zjimg{
              width:60px;
              height:60px;
              margin:40px 22px 0 40px;
              border-radius: 60px;
              float:left;

            }
            .zjimfo{

              float:left;
              margin:40px 0px 0 0px;
              position: relative;
              img{
                height:30px;
                width:auto;
                border-radius: 0;
                margin:0;
                position: relative;
                top:5px;
              }
            }

          }
          ul.ygm{
            background: #cd5445;
            padding-bottom: 50px;


            display: block;
            background-size: 100%;
            color:#FFF;
            position: relative;
            .zjimg{
              width:60px;
              height:60px;
              margin:40px 22px 0 40px;
              border-radius: 60px;
              float:left;

            }
            .zjimfo{
              .ptime{
                position:absolute;
                right:20px;
                top:35px;
                opacity: .5;
              }
              p{
                padding-top:20px;
              }
              float:left;
              margin:40px 0px 0 0px;
              width:600px;

              img{
                height:30px;
                width:auto;
                border-radius: 0;
                margin:0;
                position: relative;
                top:5px;
              }
            }

          }
        }
        background: #FFF;
        margin: 10px 0;
        padding-top:28px;
        img{
          width:60px;
          height:60px;
          margin:0 22px 0 40px;
          border-radius: 60px;
        }
        .desc{
          p.zhuic{
            color: #333;
            margin:0;
          }
          width:590px;
          padding-bottom:16px;
          border-bottom:1px solid #eee;
          .t1 .ar-l{
            color:#333;
            font-size:30px;
            line-height:60px;

              .exp_biao{
                img{
                  width:auto;
                  height:35px;
                  border-radius: 0;
                  position: relative;
                  top:5px;
                  margin-left:5px;
                }
              }
          }
          .t1 .ar-r{
            color:#999;
            font-size:24px;
            line-height:60px;
          }
          p{
            color:#333;
            font-size:28px;
            line-height:40px;
            margin:20px 0 10px;
          }
          .t2 span{
            color:#999;
            font-size:24px;
          }
          .t3{
            background:#f8f8f8;
            padding:10px 30px 5px;
            .ar-r{
              font-size:24px;
              color:#999;
            }
            p{
              padding-bottom:20px;
              border-bottom:1px solid #ddd;
            }
          }
          .mar{
            margin-right:22px;
          }
        }
        .gaoliang{background: red}
      }

    }
    .di{
      background: #fff;
      padding-bottom:50px;
    }
    .wo{
      width: 8rem;
      height: 0.93333rem;
      line-height: 0.93333rem;
      background: #b5935c;
      margin: 0 auto;
      text-align: center;
      border-radius: 0.10667rem;
      font-size:34px;
      color:#fff;
    }

    .no_num{
      text-align:center;
      color:#999;
      line-height:120px;
    }

  }

</style>
