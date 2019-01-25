<template>
    <div>
    <div class="myVip">
      <div class="black_bg">

        <div class="vip_bg">

          <div class="headsimg">
            <img :src="isvip.headimg_url"/>
          </div>
          <div class="vipInfos">
            <p class="p1">会员等级：
              <b v-show="isvip.user_type == 2">VIP会员</b>
              <b v-show="isvip.user_type == 1">会员用户</b>
              <b v-show="isvip.user_type == 0">普通用户</b>
            </p>
            <!--<p class="p2">账户余额：<b>{{isvip.balance}}</b></p>-->
            <p class="p3" v-show="isvip.vip_end_time">有效期至：{{isvip.vip_end_time | timeNumb('yyyy-MM-dd')}}</p>
          </div>
        </div>
      </div>
      <div class="tuanyi_pro">
        <img src="./img/tuanyi.jpg"/>
      </div>
        <!--<div class="vipTop">-->
            <!--<p>会员等级：<span>{{isvip.isVip?'会员用户':'普通用户'}}</span></p>-->
            <!--<p>余额：<span>{{isvip.balance}}</span></p>-->
        <!--</div>-->
        <!--<div class="cardInfo">-->
            <!--<h4 class="level">VIP</h4>-->
            <!--<p>余额: <span>980</span></p>-->
        <!--</div>-->
        <!--<div class="caoZuo">-->

            <!--<div v-show="!isvip.isVip" class="lightBtn" @click="buyVip()">购买会员卡 （ ¥998 ）</div>-->
            <!--<div v-show="!isvip.isVip" class="darkBtn" @click="actcard()">激活实体卡</div>-->
            <!--<div v-show="isvip.isVip" class="darkBtn" @click="addmoneyShow = !addmoneyShow">充值</div>-->
            <!--<div class="chongzhijl">充值记录</div>-->

        <!--</div>-->
        <div v-show="addmoneyShow" class="chongzhipop">
<div class="chongzhi">
            <div class="moneynumbs"><span>￥</span><input type="number" placeholder="请输入充值金额" v-model="addmoney"/></div>
            <button class="addok" @click="chongzhi()">确定</button>
            <button class="addcancle"  @click="cancleCz">取消</button>
</div>
        </div>

    </div>
    <!--<pay :showPay = "parentShowpay" :buyInfo="buyInfo"   @close="payClose" ></pay>-->
    <div :is="c.component" v-for="c in paycomm" :showPay = "c.parentShowpay" :buyInfo="c.buyInfo"  @close="payClose"></div>
    <mt-popup v-model="activeVip" position="bottom" class="actvip" :modal="true">
        <div>
            <div class="step" v-show="activation==0">
                <h4><span><img @click="activeVip = false" src="./img/cancel.png"></span>激活实体卡</h4>
                <!--<div class="colum">-->
                    <!--<input type="text" v-model="cardId">-->
                <!--</div>-->
                <div class="colum">
                    <input type="text" placeholder="请输入密码" v-model="password">
                </div>
                <div class="colum">
                    <div class="lightBtn" @click="actVip">立即激活</div>
                </div>
            </div>
            <div class="step" v-show="activation==1">
                <h4 class="noBorder"><span><img @click="activeVip = false" src="./img/cancel.png"></span></h4>
                <p>恭喜您，实体卡激活成功</p>
                <p><span></span></p>
                <div class="lightBtn" @click="activeVip = false">我知道了</div>
            </div>
            <div class="step" v-show="activation==2">
                <h4 class="noBorder"><span><img @click="activeVip = false" src="./img/cancel.png"></span></h4>
                <p>{{cardError}}</p>
                <p>请确认后重新输入或联系客服</p>
                <div class="lightBtn" @click="activation = 0">重新输入</div>
            </div>
        </div>
    </mt-popup>
    <!--<activate :start=false></activate>-->
        <!--<button @click="test1">111</button>-->
        <!--<button @click="test2">2222</button>-->
    <!--<pickeritem :pickerShow="testshow" :pickerList="curentitems" @itemcancle="itemCancle"></pickeritem>-->
      <div class="buycard">
        <ul v-show="isvip.user_type<=2">
          <li @click="buyVip()">
            立即购买
          </li>
          <li @click="actcard()">
            <div class="lines"></div>
            激活实体卡
          </li>
        </ul>
        <!--<ul v-show="isvip.user_type==2">-->
          <!--<li @click="addmoneyShow = !addmoneyShow" style="width:100%;">-->
            <!--充值-->
          <!--</li>-->

        <!--</ul>-->
      </div>
</div>
</template>
<script>
import pay from '@/components/pay'
import activate from '@/components/activate'
import pickeritem from '@/components//pickercustom/picker'
export default {
    data() {
        return {
          cardlist:[],
          cardError:'',
          paycomm:[],
            active: 0,
            activeVip:false,
            tipsError:'',
            activation:0,
          cardId:'',
          password:'',
          isvip:{},
          addmoney:'',
          addmoneyShow:false,

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

          // testshow:false,
          // curentitems:[{name:'1111111'},{name:'1111111'}],
          // fitems1:[{name:'1111111'},{name:'1111111'}],
          // fitems2:[{name:'2222222'},{name:'2222222'}]

        }
    },
    components:{


        activate,
      // pickeritem
    },
    methods: {
      // test1(){
      //   this.testshow = true;
      //   this.curentitems = this.fitems1;
      // },
      // test2(){
      //   this.testshow = true;
      //   this.curentitems = this.fitems2;
      // },
      // itemCancle(){
      //   this.testshow = false;
      // },
      cancleCz(){
        this.addmoneyShow = false
        this.addmoney = ''
      },
      createCz(){
        this.buyInfo={
          buyTitle:'订单金额',//标题
          isCoupon:false,//是否使用优惠券
          type:'6',//1专家  2知识 3课程 4 服务 5实体卡  6 充值 7虚拟卡
          info:{
            money:this.addmoney,
            resourceId:''
          },//商品基本信息
          wxPay:true,
          memberPay:false
        }
      },
      chongzhi(){
        if(this.addmoney == ''){
          this.$toast('请输入充值金额');
          return false;
        }
        this.createCz();
        this.paycomm.push({
          component:pay,
          parentShowpay:true,
          buyInfo:this.buyInfo

        })

      },
      getcards(){
        this.$http.post('activity/activityService/fictitiousCard/findList',{"subData": {"card_type":0}}).then(res=>{
          this.cardlist = res.data.data;
        })
      },
      toPayinfo(){
        this.buyInfo={
          buyTitle:'订单金额',//标题
          isCoupon:false,//是否使用优惠券
          type:'7',//1专家  2知识 3课程 4 服务 5实体卡  6 充值 7虚拟卡
          info:{
            money:this.cardlist[0].amount,
            resourceId:this.cardlist[0].id
          },//商品基本信息
          wxPay:true,
          memberPay:false
        }
      },
      actcard(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          if(!res.data.data.mobile){
          this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
            this.$router.push('/login');
        });
          return false;


        }else{
          this.activeVip = true;

        }
      })


      },
      buyVip(){

        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          if(!res.data.data.mobile){
          this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
            this.$router.push('/login');
        });
          return false;


        }else{
          this.toPayinfo();
          this.paycomm.push({
            component:pay,
            parentShowpay:true,
            buyInfo:this.buyInfo

          })

        }
      })


        //this.parentShowpay = true;

      },
      payClose(){
        this.paycomm[0].parentShowpay = false;
        this.paycomm = [];
      },
      actVip(){
        // this.$toast('激活成功');
        // this.activeVip = false;
        // this.tipsError = `<p style="color:red;">输入卡号密码错误</p>`;
        // this.tipsError = `<p style="color:green;">激活成功</p>`;
        // setTimeout(()=>{
        //   this.tipsError='';
        // },2000)
        this.$http.post('activity/activityService/card/activateCard',{
          subData:{
            cardPassword:this.password
          }
        }).then(res=>{
          if(res.data.code == 1){
          this.activation = 1;
          this.getisVip();

        }else{
          this.activation = 2;
          this.cardError = res.data.msg;
        }

        })

      },
        tab(index) {
            this.active = index;
        },
      checku(){

        this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
              this.$router.push('/login');
          });

      },
      getisVip(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          this.isvip = res.data.data;
      })
      }
    },
    mounted(){
      this.getisVip();
      this.getcards();
    }

}
</script>
<style lang="scss">
  .buycard{
    background: #000;
    height:90px;
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 9;
    width:100%;
    li{
      width:50%;
      text-align: center;
      float:left; font-weight: bold;
      font-size:30px;
      position: relative;
      color:#BC8F34;
      line-height: 90px;
      .lines{
        position: absolute;
        top:20px;
        height:60px;
        left:0;
        background:#BC8F34 ;
        width:2px;
      }
    }
  }
    .step {
        width: 100%;
        position: fixed;
        bottom: 0px;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        h4 {
            padding:25px; border-bottom:1px solid #ddd;
            position: relative;
            font-size:35px;
            text-align: center;
            span {
                position: absolute;

                left:10px;
                top:22px;
                img{width:45px;}
            }
        }
        .noBorder{
            border:0px solid #fff;
        }
        .colum {
            padding: 5pt 10pt;
            input {
                appearance: none;
                width: 100%;

                font-weight: bold;
                border:none;
                border-bottom: 2px solid #DDD;
                padding:20px;
                color: #333;
                font-size: 35px;
            }
        }
        p {
            text-align: center;
            line-height: 20pt;
            color:#666;
            span{
                font-size: 13pt;
                font-weight: bold;
                color:#333;
            }
        }



        .darkBtn {
            display: block;
            width: 80%;
            height: 28pt;
            line-height: 28pt;
            background-color: #C9A063;
            text-align: center;
            border-radius: 3pt;
            color: #fff;
            font-size: 11pt;
            margin: 15pt auto 10pt;
            font-weight: bold;
        }

        .lightBtn {
            display: block;
            width: 80%;
            height: 28pt;
            line-height: 28pt;
            text-align: center;
            border-radius: 3pt;
            color: #fff;
            font-size: 11pt;
            margin: 15pt auto 10pt;
            border: 1pt solid #C9A063;
            background-color: #fff;
            color: #C9A063;
            font-weight: bold;
        }


        dt {
            color: #DCBD60;
            font-size: 16pt;
            padding: 5pt 0;
            text-align: center;
        }
        dd {
            color: #666;
            padding: 5pt 15pt 5pt 10pt;
            display: flex;
            justify-content: space-between;
            -ms-align-items: center;
            align-items: center;
            border-bottom: 1px solid #ddd;
            .quan {
                display: inline-block;
                width: 50pt;
                height: 16pt;
                font-size: 6pt;
                line-height: 16pt;
                text-align: center;
                background-image: url(/imgs/quan.png);
                background-size: 100% 100%;
            }
        }
        ul {
            h5 {
                width: 100%;
                text-align: center;
                padding: 5pt 0pt;
                font-weight: normal;
            }
            .zhai {
                padding: 3pt 0;
            }
            li {
                padding: 5pt 10pt;
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    width: 20pt;
                    height: 20pt;
                    margin-right: 5pt;
                }
                .right {
                    width: 90%;
                    height: 30pt;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .ar-r {
                        label {
                            font-size: 7pt;
                        }
                        span {
                            font-size: 7pt;
                            display: inline-block;
                            padding: 2pt 4pt;
                            background-color: #C9A063;
                            color: #fff;
                        }
                    }
                }
                .heng {
                    display: flex;
                    flex-direction: column;
                    label {
                        font-size: 3pt;
                        color: #DCBD60;
                    }
                }
                li:last-child {
                    .right {
                        border: none;
                    }
                }
            }
        }
    }
    .actvip{
        width:100%; height:100%;
        background: none!important;

    }
    .chongzhipop{
      position: fixed;
      top:0;
      left:0;
      width:100%; height:100%;
      background: rgba(0,0,0,.5);
      z-index: 99;
    }
   .chongzhi{
       text-align:center;
       padding:20px;
     top:200px;
     position: relative;
     background: #FFF;
       color: #C9A061;
   }
    .myVip {
      .tuanyi_pro{

        text-align: center;
        background: #FFF;
        padding:20px;
        img{
          width:100%;
        }
      }

      .black_bg{
        background: #333;
        padding:30px 0;
        padding-top:100px;
        background: #000 url(./img/lights.png) no-repeat center 270px;

        .vip_bg{
          position: relative;
          width:732px;
          margin: 0 auto;
          height:269px;
          background: url(./img/big_vip.png) no-repeat center;

          background-size: cover;
          .headsimg{
            box-shadow: 1px 1px 3px #CCC;
            width:150px;
            height:150px;
            padding:5px;
            border-radius: 1000px;
            overflow: hidden;
            background: #FFF;
            position: absolute;
            top:-75px;
            left:50%;
            margin-left: -75px;
            img{
              width:100%;
              height: 100%;
              border-radius: 1000px;
            }
          }
          .vipInfos{
            padding-top:90px;

            text-align: center;
            p{
              font-size:30px;
              line-height:48px;

            }
            .p2 {
              b{
                font-size:30px;
                color: #cc0000;
              }
            }
          }
        }
      }
    padding-bottom: 20pt;
    .chongzhi {border:3px solid #EEE; box-shadow: 0 0 3px #DDD;
        -webkit-border-radius: 10px;
        padding:30px;
        margin:30px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        input{
            border:none; border-bottom: 2px solid #DDD; padding:20px; width:100%;font-size:45px;
            margin-bottom:20px;
            text-align: right;

        }
        .moneynumbs{
            position: relative;
            span{
                position: absolute;
                top:15px;
                left:15px;
                color:#CCC;
                font-size:50px;
            }
        }
        /*placeholder字体颜色*/
        ::-webkit-input-placeholder { /* WebKit browsers */
            color:#CCC;
            font-size:25px;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:#CCC;
            font-size:25px;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#CCC;
            font-size:25px;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            color:#CCC!important;
            font-size:25px;
        }

        button{
            display: block;

            border:none;
            width:100%;
            padding:20px 0px;
            margin:20px 0px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
        button.addok{
            font-weight: bold;
            background: #C9A063;
            color:#FFF;
        }
        button.addcancle{
            border:2px solid #C9A063;
            color:#C9A063;
            background: #FFF;
        }
    }

    .vipTop {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10pt 0;
        height: 50pt;
        line-height: 50pt;
        border-bottom: 10pt solid #f6f6f6;
        font-size: 10pt;

        span {
            color: #C9A063;
            font-size: 11pt;
        }
    }

    .cardInfo {
        /*background-image: url(./img/big_vip.jpg);*/
        background-size: 100% 100%;
        width: 90%;
        height: 110pt;
        padding:20px 0;
        margin: 15pt auto;
        h4 {
            color: #c9a063;
            padding-top: 10pt;
            margin: 0pt 10pt 30pt 10pt;
            font-size: 13pt;
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

    .darkBtn {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        background-color: #C9A063;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
        margin: 15pt auto 10pt;
        font-weight: bold;
    }

    .lightBtn {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
        margin: 15pt auto 10pt;
        border: 1pt solid #C9A063;
        background-color: #fff;
        color: #C9A063;
        font-weight: bold;
    }

    .scoreTop {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15pt 0;
        background-color: #fff;
        img {
            width: 50pt;
            height: 50pt;
            margin-bottom: 5pt;
        }
        h5 {
            line-height: 22pt;
            font-size: 15pt;
            color: #333;
        }
        p {
            line-height: 16pt;
            color: #666;
            font-size: 10pt;
        }
        .ti {
            display: inline-block;
            padding: 3pt 20pt;
            background-color: #C9A063;
            color: #fff;
            border-radius: 3pt;
            margin: 5pt auto;
        }
    }

    .tab {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        background-color: #fff;
        padding: 5pt 20pt 1pt;
        margin: 5pt 0 0;
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
        .kuan.active {
            color: #C9A063;
        }
    }
    .title {
        margin-top: 10pt;
        background-color: #fff;
        font-size: 10pt;
        padding: 8pt 10pt;
        color: #333;
        border-bottom: 1pt solid #ececec;
    }
    .movements {
        width: 100%;
        padding: 0 10pt;
        background-color: #fff;
        li {
            flex-direction: row;
            justify-content: space-between;
            display: flex;
            -ms-align-items: center;
            align-items: center;
            color: #666;
            padding: 7pt 5pt;
            border-bottom: 1pt solid #ececec;
            h4 {
                font-size: 10pt;
                line-height: 16pt;
            }
            p {
                font-size: 7pt;
                -ms-align-self: flex-end;
                align-self: flex-end;
            }
        }
        li:last-child {
            border: 0px solid #ddd;
        }
    }


    .cards {
        background-color: #fff;
        margin-top: 5pt;

        table {
            width: 100%;
            padding: 0 10pt;
        }
        th {
            color: #333;
            font-weight: normal;
            font-size: 9pt;
            line-height: 25pt;
            border-bottom: 1px solid #ececec;
        }

        td {
            text-align: center;
            line-height: 25pt;
            color: #666;
            font-size: 10pt;
        }
    }
}
</style>
