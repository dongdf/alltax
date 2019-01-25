<template>
<div class="cards">
  <ul>
    <template v-for="k in cardlist">
      <li >
        <div class="card fl"><img :src="k.pic_url"/>
          <!--<div class="ftext">{{k.amount}}<span>元</span></div>-->
        </div>
        <div class="cardinfo fl">
          <div class="cinfo">
            <h3>{{k.duration_name}}</h3>
            <p>{{k.describe}}</p>
            <div class="mores" v-show="k.link_url" @click="gocardpro(k)">详细介绍>></div>
            <div  @click="chooseBuy(k)" class="buyb">购买</div>
          </div>
        </div>
        <div class="cl"></div>
      </li>

      <!--<li v-if="k.id == 4">-->
        <!--<div class="card fl"><img src="./imgs/ka2.png"/><div class="ftext">{{k.amount}}<span>元</span></div></div>-->
        <!--<div class="cardinfo fl">-->
          <!--<div class="cinfo">-->
            <!--<h3>知识半年卡</h3>-->
            <!--<p>活动期间<br>充5个月送1个月</p>-->
            <!--<div  @click="chooseBuy(k)" class="buyb">开通</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="cl"></div>-->
      <!--</li>-->
      <!--<li v-if="k.id == 5">-->
        <!--<div class="card fl"><img src="./imgs/ka3.png"/><div class="ftext">{{k.amount}}<span>元</span></div></div>-->
        <!--<div class="cardinfo fl">-->
          <!--<div class="cinfo">-->
            <!--<h3>知识年卡</h3>-->
            <!--<p>活动期间<br>充10个月送2个月</p>-->
            <!--<div @click="chooseBuy(k)" class="buyb">开通</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="cl"></div>-->
      <!--</li>-->
      <!--<li v-if="k.id == 1">-->
        <!--<div class="card fl"><img src="./imgs/ka4.png"/><div class="ftext">{{k.amount}}<span>元</span></div></div>-->
        <!--<div class="cardinfo fl">-->
          <!--<div class="cinfo">-->
            <!--<h3>VIP会员卡</h3>-->
            <!--<p>享全站特权<br><router-link :to="{path:'/vip'}">>>详情</router-link></p>-->
            <!--<div @click="chooseBuy(k)" class="buyb">开通</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="cl"></div>-->
      <!--</li>-->

    </template>



  </ul>

  <div :is="c.component" v-for="c in paycomm" :showPay = "c.parentShowpay" :buyInfo="c.buyInfo"  @close="payClose"></div>

  <div class="shopcard" @click="actcard()">

    激活实体卡
  </div>
  <mt-popup v-model="activeVip" position="bottom" class="actvip" :modal="true">
    <div>
      <div class="step" v-show="activation==0">
        <h4><span><img @click="activeVip = false" src="./imgs/cancel.png"></span>激活实体卡</h4>
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
        <h4 class="noBorder"><span><img @click="activeVip = false" src="./imgs/cancel.png"></span></h4>
        <p>恭喜您，实体卡激活成功</p>
        <p><span></span></p>
        <div class="lightBtn" @click="activeVip = false">我知道了</div>
      </div>
      <div class="step" v-show="activation==2">
        <h4 class="noBorder"><span><img @click="activeVip = false" src="./imgs/cancel.png"></span></h4>
        <p>{{cardError}}</p>
        <p>请确认后重新输入或联系客服</p>
        <div class="lightBtn" @click="activation = 0">重新输入</div>
      </div>
    </div>
  </mt-popup>

</div>
</template>

<script>
  import pay from '@/components/pay'
  export default {
    name: "knowledge-card",
    components:{pay},
    data(){
      return{
        activeVip:false,
        activation:0,
        cardError:'',
        password:'',
        paycomm:[],
        cardlist:[],
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
        ctype:2,//0 vip  1 课程 2 知识
      }
    },
    mounted(){
        this.ctype = this.$route.query.ctype;
        this.getcards();
    },
    methods:{
      gocardpro(obj){
        this.$router.push({path:'cardpro',query:{cardurl:obj.link_url}})
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
      getcards(){
        // alert(this.ctype);
        this.$http.post('activity/activityService/fictitiousCard/findList',{"subData": {"card_type":this.ctype}}).then(res=>{
          this.cardlist = res.data.data;
        })
      },
      chooseBuy(obj){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          if(!res.data.data.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }else{
            this.toPayinfo(obj);
            this.showPay();

          }
        })


      },
      payClose(){
        this.paycomm[0].parentShowpay = false;
        this.paycomm = [];
      },
      toPayinfo(obj){
        this.buyInfo={
          buyTitle:'订单金额',//标题
          isCoupon:false,//是否使用优惠券
          type:'7',//1专家  2知识 3课程 4 服务 5实体卡  6 充值 7虚拟卡
          info:{
            money:obj.amount,
            resourceId:obj.id
          },//商品基本信息
          wxPay:true,
          memberPay:false
        }
      },
      showPay(){
        this.paycomm.push({
          component:pay,
          parentShowpay:true,
          buyInfo:this.buyInfo

        })
      }

    }

  }
</script>

<style lang="scss" scoped>
  .shopcard{
    position: fixed;
    width:100%;
    padding:25px 15px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    background: #b5935c;
    color:#FFF;
    left:0;
    bottom:0;
  }
  .cards{
    .actvip{
      width:100%; height:100%;
      background:none;

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


    ul{
      li{
        background: #FFF;
        padding:20px;
        margin-bottom: 20px;
        .card{
          width:300px;
          position: relative;
          .ftext{
            position: absolute;
            color:#FFF;
            top:35px;
            left:50px;
            font-size:60px;
            font-weight: bold;

          }
          img{width:100%;}
        }
        .cardinfo{
          width:410px;
          .cinfo{
            position: relative;
            padding-left:25px;
            h3{
              padding:15px 0;

            }
            .mores{
              color:#b5935c;
              font-size:20px;
              text-align:right;
            }
            p{
              font-size:20px;
              color:#999;

              a{
                font-size:20px;
                color:#b5935c;
              }
            }
            .buyb{
              position: absolute;

              text-align: center;
              top:35px;right:0px;
              margin-top:-25px;
              font-size:20px;
              width:80px;
              line-height: 45px;

              background: #C9A063;
              color:#FFF;
              border-radius: 1000px;
            }
          }
        }
      }
    }
  }
</style>
