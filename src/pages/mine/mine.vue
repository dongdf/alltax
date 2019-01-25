<template>
    <div id="mine">

        <div id="yanZheng">
          <div class="bgcolor">
            <div class="mineinfo">
                <div class="minepic">
                    <img :src="mineInfo.headimg_url" style="border-radius: 10000px;">
                  <div class="reflashWx" :class="andonghua?'reflashA':''" v-show="!mineInfo.expert" @click="updateWx"></div>
                </div>
                <div class="flpInfo">
                    <div class="minename">
                        <span class="mingzizuo"><h2 class="mingzi">{{mineInfo.nick_name}}
                          <a style="background: #FF4300;" v-show="mineInfo.user_type == 2">VIP会员</a>
                          <a style="background: #F49B1E;" v-show="mineInfo.user_type == 1">会员用户</a>
                          <a style="background: #999;" v-show="mineInfo.user_type == 0">普通用户</a>
                        </h2></span>

                    </div>
                    <div class="minephone" >
                        <span>手机号：</span>
                        <span v-show="mineInfo.mobile">{{mineInfo.mobile}}</span>
                        <span v-show="!mineInfo.mobile"><router-link style="color:#c18831" :to="{path:'/login'}">点击完善>></router-link></span>
                    </div>
                </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <!--v-show="mineInfo.expert"-->
            <div class="experts_tool" v-show="mineInfo.expert" >
              <ul>
                <li v  >
                  <div class="propic2"  @click="proCard($event,mineInfo)"><img class="cardpro"   src="../experts/imgs/cardPro.png"><label>生成电子名片</label></div>
                </li>
                <li>
                  <div class="propic2"   @click="gomoneyPic($event,mineInfo)"><img class="mas"   src="./img/moneyMa.png"><label>生成收款码</label></div>

                </li>
                <div class="cl"></div>
              </ul>

            </div>



          <div  class="new_grap" style="">

            <div class="two">
              <!--@click="goToScore"-->
              <div @click="goWallet()" >
                <p><b>{{mineInfo.totalAmount}}</b></p>
                <p>我的零钱(元)</p>
              </div>
              <div @click="goToCoupon">
                <p>
                  <!--{{mineInfo.couponNum}}-->
                  {{otherList.length}}
                </p>
                <p>中奖记录</p>
              </div>
              <div @click="goGuanzhu">

                <p>{{mineInfo.attentionNum}}</p>
                <p>收藏关注</p>

              </div>
              <div @click="goToMessage">
                <p>{{mineInfo.messageNum}}</p>
                <p>消息</p>
              </div>
            </div>

          </div>
          </div>
            <!-- <div class="sxian">
                <img src="./img/xian.png">
            </div> -->
            <!-- <div class="qianbao">
                <div class="qian" @click='goToWallet'>
                    <span>0.00</span>
                    <br>
                    <br>
                    <span>我的钱包(元)</span>
                </div>
                <div class="xian">
                    <img src="./img/xian1.png">
                </div>
                <div class="qian" @click="goToVip">
                    <span>100.00</span>
                    <br>
                    <br>
                    <span>VIP充值(元)</span>
                </div>
            </div> -->
            <div class="cardInfo" @click="goToVip">
              <!--v-show="mineInfo.vip"-->
                <h4 class="level">
                  <div v-show="mineInfo.user_type<2" class="flashvip">
                    <p>激活会员 立享特权</p>
                    <div class="vipbtns"><img src="./img/vipact.png"/></div>
                  </div>
                  <div  v-show="mineInfo.user_type==2" class="flashvip">
                    <p style="padding-left:0; text-align: center">您好，尊敬的VIP会员</p>

                  </div>
                </h4>


                <!--<p>含储值 <span>980</span></p>-->
            </div>


        </div>
        <div class="clear"></div>
        <div id="zhong">
            <div class="clinetitle">
                <p>
                    <h2>我的</h2>
                </p>
            </div>
            <div class="clear"></div>

            <div class="one">
                <div @click="goToMyQuestion">
                    <img src="./img/wenda.png">
                    <p>问答</p>
                </div>
                <div @click="goToMyConsulation">
                    <img src="./img/zixun.png">
                    <p>咨询</p>
                </div>
                <div @click="goToMyService">
                    <img src="./img/dingdan.png">
                    <p>订单</p>
                </div>
                <div @click="goToMyCourse">
                    <img src="./img/kecheng.png">
                    <p>课程</p>
                </div>
                <div @click="goToMyKnowledge">
                    <img src="./img/zhishi.png">
                    <p>知识</p>
                </div>
            </div>
            <div class="clear"></div>

        </div>
        <div v-show="mineInfo.expert" id="woshizhuanjia">
            <div class="clinetitle">
                <p>
                    <h2>我是专家</h2></p>
            </div>
            <div class="clear"></div>

            <div class="one">
                <div @click="goToExpert">
                    <img src="./img/zjxx.png">
                    <p>专家信息</p>
                </div>
                <div @click="goToConsult">
                    <img src="./img/tdgl.png">
                    <p>咨询管理</p>
                </div>
                <!--<div @click="goToTeam">-->
                    <!--<img src="./img/zxgl.png">-->
                    <!--<p>佣金管理</p>-->
                <!--</div>-->
                <div v-show="mineInfo.handle_ask" >
                  <router-link style="color:#333;" :to="{path:'expert-wd'}">
                    <img src="./img/wdsh.png">
                    <p>问答审核</p>
                  </router-link>
                </div>
            </div>
        </div>
      <!--v-show="mineInfo.agent"-->
        <div id="woshijingjiren"  v-show="mineInfo.agent">
            <div class="clinetitle">
                <p>
                    <h2>我是经纪人</h2></p>
            </div>
            <div class="clear"></div>

            <div class="one jirmgr">
                <div @click="goToAgent">
                    <img src="./img/jjrxx.png">
                    <p>经纪人信息</p>
                </div>
                <div @click="goToBroker">
                    <img src="./img/jjrtdgl.png">
                    <p>团队管理</p>
                </div>
                <!--<div @click="goToSales">-->
                    <!--<img src="./img/xsysh.png">-->
                    <!--<p>佣金管理</p>-->
                <!--</div>-->
                <div @click="goToMember"  >
                    <img src="./img/hyk.png">
                    <p>销卡管理</p>
                </div>

              <div @click="goCourseCode" v-show="mineInfo.isSeniorAgent == 1"  >
                <img src="./img/kcm.png">
                <p><b>课程码</b></p>
              </div>
              <!--<div @click="goCourseSales"  v-show="mineInfo.isSeniorAgent == 1"  >-->
                <!--<img src="./img/xgtj.png">-->
                <!--<p><b>销售统计</b></p>-->
              <!--</div>-->

              <div @click="gomycustomer"  v-show="mineInfo.isSeniorAgent == 1"   >
                <img src="./img/xgtj.png">
                <p><b>销售统计</b></p>
              </div>



            </div>
          <div class="clear"></div>
        </div>
        <!-- <div class="clear"></div> -->
        <div id="minefooter">
            <ul>
                <!--<li class="clearfix" @click="goToMember">-->
                    <!--<a href="javascript:void(0);">-->
                                    <!--<img class="left" src="./img/huiyuanka.png">-->
                                    <!--<span class="left">我的会员卡</span>-->
                                    <!--<img  class="right" src="./img/jiantou.png">-->
                                    <!--</a>-->
                <!--</li>-->
                <!--<li class="clearfix" >-->
                    <!--<router-link :to="{path:'/order'}">-->
                        <!--<img class="left" src="./img/order_s.png">-->
                        <!--<span class="left">我的订单</span>-->
                        <!--<img  class="right" src="./img/jiantou.png">-->
                    <!--</router-link>-->
                <!--</li>-->

                <li class="clearfix" @click="goToSettings">
                    <a href="javascript:void(0);">
                    <img class="left" src="./img/shezhi.png">
                    <span class="left">设置</span>
                    <img  class="right" src="./img/jiantou.png">
                    </a>
                </li>
            </ul>
        </div>
        <tabbar active=3></tabbar>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
export default {
    data() {
        return {
          value: '请输入用户民',
          cardinfo:{},
          mineInfo:{},
          andonghua:false,
          showKnowlegCard:false,
          mineJiang:{},
          otherList:[]
        }
    },
    components: {
        tabbar
        //
    },
    methods: {
      proCard(e,obj){

        this.$router.push({path:'/coursepic',query:{id:obj.expertId,code:'EXPERT_BUSINESS_CARD'}});
      },
      gomoneyPic(e,obj){

        this.$router.push({path:'/moneyPic',query:{id:obj.expertId,code:'EXPERT_BUSINESS_CARD'}});
      },

      gomycustomer(){
        this.$router.push({path:'mycustomer'});
      },
      getotherList(){
        this.$http.get('activity/trophyService/recordList?status=1').then(res=>{
          this.otherList = res.data.data;
        })
      },
        updateWx(){
          this.andonghua = true;
          setTimeout(()=>{
            this.andonghua = false;
          },2000)

          this.$http.get('authentication/weChat/updateWechatFromWx').then(res=>{
            if(res.data.code == 1){
              this.getmineInfo();
            }
          })
        },
      goCourseCode(){
        this.$router.push({ path: 'courseCode', query: this.$route.query })
      },
      goCourseSales(){
        this.$router.push({ path: 'courseSales', query: this.$route.query })
      },
        goWallet(){
          this.$router.push({ path: 'wallet', query: this.$route.query })
        },
        goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
        },
        goToAgent() {
            this.$router.push({ path: 'agent-info', query: this.$route.query })
        },
        goToWallet() {
            this.$router.push({ path: 'wallet', query: this.$route.query })
        },
        goToVip() {
            this.$router.push({ path: 'newcard', query: this.$route.query })
        },
        goToScore() {
            this.$router.push({ path: 'score', query: this.$route.query })
        },
        goToCoupon() {
            this.$router.push({ path: '/zjlist', query: this.$route.query })
        },
        goGuanzhu(){
          this.$router.push({path:'/my-guanzhu'});
        },
        goToTeam() {
            this.$router.push({ path: 'team', query: this.$route.query })
        },
        goToConsult() {
            this.$router.push({ path: 'consult', query: this.$route.query })
        },
        goToMember() {
            this.$router.push({ path: 'member', query: this.$route.query })
        },
        goToMessage() {
            this.$router.push({ path: 'message', query: this.$route.query })
        },
        goToMyService() {
            this.$router.push({ path: '/order', query: this.$route.query })
        },
        goToBroker() {
            this.$router.push({ path: 'broker', query: this.$route.query })
        },
        goToUser() {
            this.$router.push({ path: 'user-info', query: this.$route.query })
        },
        goToExpert() {
            this.$router.push({ path: 'expert-info', query: this.$route.query })
        },
        goToMyOrder() {
            this.$router.push({ path: 'order', query: this.$route.query })
        },
        goToMyQuestion() {
            this.$router.push({ path: 'my-question', query: this.$route.query })
        },
        goToMyConsulation() {
            this.$router.push({ path: 'my-consulation', query: this.$route.query })
        },
        goToMyCourse() {
            this.$router.push({ path: 'my-course', query: this.$route.query })
        },
        goToMyKnowledge() {
            this.$router.push({ path: 'my-knowledge', query: this.$route.query })
        },
        goToSales() {
            this.$router.push({ path: 'agentMoney', query: this.$route.query })
        },
        goToSettings() {
            this.$router.push({ path: 'settings', query: this.$route.query })
        },
        getmineInfo(){
          this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
                this.mineInfo= res.data.data;
          })
        },
      getcards(){
          this.$http.get('order/orderService/getMyKnowledgeCrdOrder').then(res=>{

            if(res.data.data.length == 0){
              this.showKnowlegCard = false;
              this.cardinfo = {}
            }else{
              this.showKnowlegCard = true;
              this.cardinfo = res.data.data[0];
            }
          })
      }
    },
    mounted(){
      this.getcards();
      this.getmineInfo();
      // this.getJiang();
      this.getotherList();
      document.getElementById('app').style.background='#f6f6f6';

    }
}
</script>
<style lang="scss">
  .experts_tool{
    li{
      float:left;width:50%;
    }
  }

  .jirmgr{
    div{
      float:left;
      width:25%;
    }
  }
#mine {

  .propic2{
text-align:center;
    background: #FFF;

    border:1px solid #EEE;

    padding:25px 15px;



    label{
      position: relative;
      top:-3px;
      margin-left: 5px;
      color:#000;
      font-weight: bold;
    }
    img{
      width:35px;

    }
    .mas{
      position: relative;
      top:0px;
    }

  }
    height:auto;
    overflow: auto;
    padding-bottom:250px;
    .clearfix {
        content: "";
        display: block;
        clear: both;
        padding-left: 5%;
        padding-top: 3%;
    }

    #minefooter {
      background-color: #fff;
      margin:20px;

      border:2px solid #EEE;
      border-radius: 20px;

        ul {
            padding:10px;
            padding-bottom:30px;
            .sxian {
                width: 100%;
                text-align: center;
                img {
                    width: 90%;
                }
            }
            li {
                a {
                    display: inline-block;
                    width: 100%;
                }
                .left {
                    float: left;
                    height: .5rem;
                    margin-right: .5rem;
                }
                .right {
                    float: right;
                    height: .5rem;
                    padding-right: 5%
                }
            }
        }
    }

    #woshijingjiren {
      .clinetitle{
        border-bottom: 2px solid #EEE;
        padding-bottom: 15px;
      }
      background-color: #fff;
      margin:20px;
      padding-bottom: 30px;
      border:2px solid #EEE;
      border-radius: 20px;
        .one {

          color:#555;
            text-align: center;
            padding-bottom: 10pt;
            justify-content: center;
            img {
                width: 60px;
              margin:0 60px;
            }
            div {
                margin-top: 10pt;

                /* margin-bottom: 10pt; */
            }
        }

        .sxian {
            width: 100%;
            text-align: center;
            img {
                width: 90%;
            }
        }
        h2 {
            padding-left: 5%;
            padding-top: 3%;
        }
    }

    #woshizhuanjia {
      .clinetitle{
        border-bottom: 2px solid #EEE;
        padding-bottom: 15px;
      }
      background-color: #fff;
      margin:20px;
      padding-bottom: 30px;
      border:2px solid #EEE;
      border-radius: 20px;
        .one {
            display: flex;
          color:#555;
            text-align: center;
            padding-bottom: 10pt;
            justify-content: center;
            img {
                width: 60px;
              margin:0 60px;
            }
            div {
                margin-top: 10pt;
                /* margin-bottom: 10pt; */
            }
        }
        .sxian {
            width: 100%;
            text-align: center;
            img {
                width: 90%;
            }
        }
        h2 {
            padding-left: 5%;
            padding-top: 3%;
        }
    }

    #zhong {
      .clinetitle{
        border-bottom: 2px solid #EEE;
        padding-bottom: 15px;
      }
        background-color: #fff;
        margin:20px;
        padding-bottom: 30px;
        border:2px solid #EEE;
        border-radius: 20px;

        .one {
          display: flex;
          color:#555;
          flex-direction: row;
            text-align: center;
            justify-content: center;
            padding:0 7pt;
            img {
                width: 60px;
              margin:0 40px;
            }
            div {

                margin-top: 10pt;
                /* margin-bottom: 10pt; */
            }
        }
        .two {
            display: flex;
          border-top:1px solid #DDA85F;
          margin:0 20px;
            text-align: center;
            justify-content: space-around;
            padding-top: 8pt;
            padding-bottom: 8pt;
            color:#FFF;
        }
        .sxian {
            width: 100%;
            text-align: center;
            img {
                width: 90%;
            }
        }
        h2 {
            padding-left: 5%;
            padding-top: 3%;
        }
    }

    #yanZheng {
      .bgcolor{
        background:linear-gradient(-140deg,#FFFFFF 80%, #F8F8F8 20%);
        color:#333;
      }
        .new_grap{

          margin-top:0;
          background:rgba(0,0,0,.05);
        }
      .two {
        display: flex;
        border-top:1px solid #eee;

        text-align: center;
        justify-content: space-around;
        padding-top: 8pt;
        padding-bottom: 8pt;

      }


        padding-bottom: 0pt;
        .mineinfo {

          padding:30px 20px;
          .flpInfo{
            float: left;
            width:500px;
          }



            .minepic {
              position: relative;
  float:left;
                width: 150px;
                height:150px;
                img {
                    width: 100%;
                  height:100%;
                }
              .reflashWx{
                width:45px;
                height:45px;
                right: 0;
                bottom:8px;
                border-radius: 100px;
                background:rgba(0,0,0,.6) url("./img/treflash.png") no-repeat center;
                box-shadow: 1px 1px 1px #999;

                background-size: 95%;
                position: absolute;


              }
              .reflashA{
                animation:mymove 2s infinite;
                @keyframes mymove
                {
                  from {transform:rotate(0deg)}
                  to {transform:rotate(360deg)}
                }
              }
            }


            .minename {
                margin-left: 10pt;
                margin-top: 5pt;
                display: flex;
                .mingzizuo {
                    margin-right: 10pt;
                }

                .huiyuan {
                    display: inline-block;
                    background: url(./img/beijing.png) no-repeat;
                    -moz-background-size: auto 100%;
                    background-size: auto 100%;
                    height:15pt;
                    padding: 0 15px;
                    text-align: center;
                    span {
                        font-size: 8pt;
                        color: #fff;
                        line-height: 13pt;
                    }
                }
                .mingzi {
                    font-size: 35px;
                    padding-top:.25rem ;
                    overflow: hidden;
                    width:400px;
                  white-space: nowrap;
                  text-overflow: ellipsis;

                  display: block;
                  height:.8rem;
                  a{ font-size:25px;

                    color:#FFF;
                    position: absolute;
                    top:90px;
                    right:20px;
                    white-space: nowrap;
                    padding:5px 10px;
                    font-weight:normal;
                    border-radius: 1000px;}

                }
            }
            .minephone {
                clear: both;
                font-size:20px;
                color:#666;
                margin-left: 10pt;
                margin-top: 5pt;
            }
        }
        .sxian {
            width: 100%;
            text-align: center;
            img {
                width: 90%;
            }
        }
        .cardInfo {
            /*background-image: url(./img/small_vip.jpg);*/
            /*background-size: 100% 100%;*/
          background: #000;
            width: 94%;

            margin: 20px auto;
            margin-bottom: 0;
            border-radius: 1000pt;
            /* padding-bottom:10pt; */
            h4 {
                color: #c9a063;
                height:120px;
                margin: 0pt 10pt 0pt 10pt;
                font-size: 13pt;
              position: relative;
              .flashvip{
                p{
                  font-size:35px;
                  text-shadow: 1px 1px 3px #a38a64;
                  line-height: 120px;
                  color:#f9d783;
                  text-align: left;
                  padding-left:80px;
                }
                .vipbtns{
                  width:90px;
                  -webkit-border-radius: 100pt;
                  -moz-border-radius: 100pt;
                  border-radius: 100pt;
                  height:90px;
                  position: absolute;
                  /*background: red;*/
                  top:15px;
                  right:-5px;
                  img{
                    width:100%;
                    animation: dou 1s infinite linear;
                  }
                  @keyframes dou {
                    0%  { transform: rotate(-15deg);}
                    25% { transform: rotate(-5deg);}
                    50% { transform: rotate(0deg);}
                    75% { transform: rotate(5deg);}
                    78% { transform: rotate(15deg);}
                    100% { transform: rotate(-15deg);}
                  }
                }
                font-weight: normal;
                /*line-height: 120px;
                background-image: -webkit-linear-gradient(left, #FFCC00, #FFFFBF 25%, #FFFFBF 50%, #FFFFBF 75%, #FFCC00);
                -webkit-text-fill-color: transparent;
                box-shadow: -1px 0px -2px #000;
                -webkit-background-clip: text;
                -webkit-background-size: 200% 100%;
                -webkit-animation: masked-animation 4s infinite linear;*/
              }
              @-webkit-keyframes masked-animation {
                0%  { background-position: 0 0;}
                100% { background-position: -100% 0;}
              }
            }
            p {
                text-align: center;
                color: #fff;
                span {
                    font-size: 15pt;
                    margin-left: 10pt;
                }
            }
        }
        .qianbao {
            display: flex;
            /* height: 63pt; */
            justify-content: space-around;
            .qian {
                text-align: center;
                margin-top: 10pt;
            }
            .xian {
                height: 100%;
                /* line-height: 105pt; */
                img {
                    height: 80%
                }
            }
        }
    }
}
</style>
