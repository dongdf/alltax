<template>
    <div >
        <mt-popup v-model="showPay"   position="bottom" class="mint-popup-3" :modal="true">

                <div class="buyBox">
                    <h4><span><img @click="closepay()" src="./imgs/cancel.png"></span>
                        <b >{{buyInfo.buyTitle?buyInfo.buyTitle:'订单金额'}}</b></h4>
                    <dl>
                      <dt v-if="buyInfo.info.money1"><div style="color:#666"><del>原价:￥{{buyInfo.info.money1}}</del></div>¥<b ref="realMoney">{{buyInfo.info.money}}</b> 元</dt>
                      <dt v-if="!buyInfo.info.money1">¥ <b ref="realMoney">{{buyInfo.info.money}}</b> 元</dt>
                        <dd v-show="buyInfo.isCoupon">
                            <span>优惠券：</span>
                            <span @click="selectQquan = true" v-if="userNumb"  class="quan">{{userNumb}}张可用</span>
                            <span v-else    class="quan">暂无可用</span>
                        </dd>
                      <dd v-show="buyInfo.type!=7" >
                        <span>我的零钱：<a><i v-if="isVip.totalAmount" style="font-style: normal">￥{{isVip.totalAmount}}</i>
                          <b v-show="zhijiePay"  style="font-weight:normal; margin-left:5px; font-size:14px; color:#c69d62">将抵扣￥{{isVip.totalAmount>=buyInfo.info.money?buyInfo.info.money:isVip.totalAmount}}</b>
                        </a></span>
                        <span><label :class="isLingqian?'label_ck':''" @click="checkISmoney()"></label></span>
                      </dd>

                    </dl>
                    <ul>
                        <li class="zhai">
                            <h5 v-show="!zhijiePay || isVip.totalAmount < buyInfo.info.money">请选择支付方式</h5></li>
                       <div v-show="buyInfo.wxPay"  @click="payChoose(1)">
                          <li v-show="!zhijiePay || isVip.totalAmount < buyInfo.info.money"><img src="./imgs/wechat.png" alt="">
                              <div class="right">微信
                                  <i :class="selectPay == 1?'checks':''"></i>
                              </div>
                          </li>

                       </div>

                        <li  v-show="buyInfo.memberPay && isVip.user_type>0">

                            <img src="./imgs/vip.png" alt="">
                            <div  @click="payChoose(2)"   class="right">
                                <p class="heng">
                                    <span>会员储值余额支付</span>
                                    <!--<label for="">会员价¥40元</label>-->
                                </p>
                                <p v-show="ischongzhi" class="ar-r" @click="openvip()">
                                    <label for="">余额不足</label>
                                    <span>去充值</span>
                                </p>
                                <i :class="selectPay == 2?'checks':''"></i>
                            </div>

                        </li>
                        <li v-show="buyInfo.memberPay && isVip.user_type<=0" @click="openvip()">

                            <img src="./imgs/vip.png" alt="">
                            <div class="right">
                                <p class="heng">
                                    <span>会员储值余额支付</span>
                                    <!--<label for="">会员价¥40元</label>-->
                                </p>
                                <p class="ar-r">
                                    <label for="">未开通</label>
                                    <span>购买会员</span>
                                </p>

                            </div>

                        </li>
                      <div v-show="!zhijiePay">
                        <button class="payc" v-show="selectPay" >
                          <span @click="confirmMethods" v-show="paying">确认支付</span>
                          <span  v-show="!paying">支付中</span>
                        </button>
                        <button class="payc" style="background: #CCC;" v-show="!selectPay" @click="confirmMethods">确认支付</button>
                      </div>
                      <div v-show="zhijiePay">

                        <div v-show="isVip.totalAmount >= buyInfo.info.money">
                          <button v-show="zhijiePayIng" class="payc"   @click="lingqianPay()">零钱支付</button>
                          <button v-show="!zhijiePayIng " class="payc" style="background: #CCC;"  @click="lingqianPay()">支付中</button>
                        </div>
                        <div v-show="isVip.totalAmount < buyInfo.info.money">
                          <button class="payc" v-show="selectPay" >
                            <span @click="confirmMethods" v-show="paying">确认支付</span>
                            <span  v-show="!paying">支付中</span>
                          </button>
                          <button class="payc" style="background: #CCC;" v-show="!selectPay" @click="confirmMethods">确认支付</button>
                        </div>
                      </div>


                    </ul>

                </div>


        </mt-popup>

        <mt-popup v-model="selectQquan" position="bottom" class="mint-popup-5" :modal="true">
            <div class="quancontent">
                <h3>请选择<span  @click="selectQquan = false" class="close"><img src="./imgs/cancel.png"></span></h3>
                <div>
                    <ul class="couponList">
                        <li v-for="q in quanList" v-show="q.coupon_scope == buyInfo.type || q.coupon_scope == 0">
                            <div class="left">
                                <h4 v-show="q.coupon_type == 1"><b style="font-size:16px;">￥</b>{{q.amount}}<span></span></h4>
                                <h4 v-show="q.coupon_type == 2">{{q.discount}}<span>折</span></h4>
                            </div>
                            <div class="right">
                                <div>
                                    <p class="lg">{{q.name}}</p>

                                    <p>{{q.coupon_end_time | timeNumb('yyyy-MM-dd')}} 到期</p>
                                </div>
                                <div class="use">
                                    <span v-show="q.isUse" @click="selectq(q)">去使用</span>
                                    <span style="border:none;opacity: .8" v-show="!q.isUse">已过期</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </mt-popup>
    </div>

</template>
<script>

export default {
    name: "pay",
    data() {
        return {
          quans:true,
          selectQquan:false,
          quanshow:false,
          isVip:{},
          quanList:null,
          userNumb:0,
          ischongzhi:false,
          cardPay:false,
          selectCoupon:{id:''},
          selectPay:'',
          paying:true,
          zhijiePay:false,
          zhijiePayIng:true,
          iswallet:0,
          isLingqian:true

        }
    },
    props:['showPay','buyInfo'],

    components: {

        //
    },

    computed: {
        //
    },

    methods: {
      checkISmoney(){
        this.isLingqian = !this.isLingqian;
        if(this.isLingqian){
            this.zhijiePay = true;
            this.iswallet = this.isVip.totalAmount;
            if(this.isVip.totalAmount>=this.buyInfo.info.money){
              this.$refs.realMoney.innerHTML = '0.00';
            }else{
              this.$refs.realMoney.innerHTML=(this.buyInfo.info.money - this.isVip.totalAmount).toFixed(2);
            }
        }else{
          this.zhijiePay = false;
          this.$refs.realMoney.innerHTML = this.buyInfo.info.money
          this.iswallet = 0;
        }

      },
      newOrders(){
        return new Promise((resolve,reject)=>{
          this.$http.post('order/orderService/newOrder',{
            subData:{
              order_type:this.buyInfo.type,
              order_resource_id:this.buyInfo.info.resourceId,
              amount:this.buyInfo.type == 8?this.buyInfo.info.money1:this.buyInfo.info.money,
              coupon_id:this.selectCoupon.id
            }
          }).then(res=>{
            resolve(res)
          })
        })
      },
      lingqianPay(){//不走支付直接产生订单
        if(!this.zhijiePayIng){
          return false;
        }
        this.zhijiePayIng = false;
        let that = this;
        if(this.buyInfo.type == 1){//专家咨询

          that.$http.post('pay/payService/presented/payOrder',{
            subData: {
              orderId:  that.buyInfo.info.resourceId,
              couponId: that.selectCoupon.id,
              presentedAmount:that.iswallet
            }
          }).then(res=>{
            this.zhijiePayIng = true;
            alert('购买成功');
            setTimeout(()=>{
              location.reload();
            },1000)
          })

        }else{
          this.newOrders().then(resorder=>{
            // return false;
            that.$http.post('pay/payService/presented/payOrder',{
              subData: {
                orderId: resorder.data.data,
                couponId: that.selectCoupon.id,
                presentedAmount:that.iswallet
              }
            }).then(res=>{
              this.zhijiePayIng = true;
              alert('购买成功');
              setTimeout(()=>{
                location.reload();
              },1000)
            })
          })

        }





          // orderId: paydata,
          // couponId: that.selectCoupon.id,
          //presentedAmount:this.iswallet


      },
      payChoose(type){
        this.selectPay = type;


      },
      confirmMethods(){
        if(!this.selectPay){
          alert('请选择支付方式');
          return false;
        }
        if(!this.paying){
          return false;
        }
        this.paying = false;
        if(this.selectPay == 1){//微信支付

          this.paystart();
        }
        if(this.selectPay == 2){//余额支付
          this.cardPays();

        }

      },
      getquan(){
        this.$http.post('activity/activityService/coupon/userCouponList').then(res=>{
          this.quanList=res.data.data;
          let cur = Date.parse(new Date());
          console.log(cur);
          for(var i in this.quanList){
            if(cur<=this.quanList[i].coupon_end_time && cur>this.quanList[i].coupon_start_time){
              if(this.buyInfo.type == this.quanList[i].coupon_scope || this.quanList[i].coupon_scope == 0){
                this.quanList[i].isUse = true;
                this.userNumb++;
              }

            }else{
              this.quanList[i].isUse = false;
            }

          }

        })

      },
      openvip(){
        this.$router.push({path:'/vip'});
      },
      selectq(obj){
            this.selectQquan =false;
            this.selectCoupon = obj;
            if(obj.coupon_type == 1){
              this.$refs.realMoney.innerHTML=(this.buyInfo.info.money - obj.amount).toFixed(2);
            }else{
              this.$refs.realMoney.innerHTML=(this.buyInfo.info.money*(obj.discount/10)).toFixed(2);
            }

        if(this.isVip.balance<this.$refs.realMoney.innerHTML){
          this.ischongzhi = true;
        }

      },
      getisVip(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          this.isVip = res.data.data;
          if(this.isLingqian){
            this.zhijiePay = true;
            this.iswallet = this.isVip.totalAmount;
            if(this.buyInfo.type!=7){
              this.zhijiePay = true;
              if(this.isVip.totalAmount>=this.buyInfo.info.money){
                this.$refs.realMoney.innerHTML = '0.00';
              }else{
                this.$refs.realMoney.innerHTML=(this.buyInfo.info.money - this.isVip.totalAmount).toFixed(2);
              }

            }else{
              this.zhijiePay = false;
            }



          }else{
            this.zhijiePay = false;
            this.iswallet = 0;
            this.$refs.realMoney.innerHTML = this.buyInfo.info.money
          }
          if(this.isVip.balance<this.buyInfo.info.money){
            this.ischongzhi = true;
          }
      })
      },
      closepay(){
        this.$emit('close');
      },
        hideToast() {
            this.payStart = false;
        },
      cardPays(){
        if(this.buyInfo.type == 1){//专家咨询

          this.$http.post('pay/payService/balance/payOrder', {
            subData: {
              orderId: this.buyInfo.info.resourceId,
              couponId: this.selectCoupon.id
            }
          }).then(res => {
            if(res.data.code == 1){
              setTimeout(()=>{
                this.paying = true;
              },800)
              alert('购买成功')
              setTimeout(()=>{
                location.reload();
              },1000)
            }else{
              alert(res.data.msg);
              setTimeout(()=>{
                location.reload();
              },1000)
            }
          })


        }else{
          this.$http.post('order/orderService/newOrder',{
            subData:{
              order_type:this.buyInfo.type,
              order_resource_id:this.buyInfo.info.resourceId,
              amount:this.buyInfo.type == 8?this.buyInfo.info.money1:this.buyInfo.info.money,
              coupon_id:this.selectCoupon.id
            }
          }).then(resOrder=>{
            if(resOrder.data.code == 1)
            {


              this.$http.post('pay/payService/balance/payOrder', {
                subData: {
                  orderId: resOrder.data.data,
                  couponId: this.selectCoupon.id
                }
              }).then(res => {
                if(res.data.code == 1){
                  setTimeout(()=>{
                    this.paying = true;
                  },800)
                  alert('购买成功');
                  if(this.buyInfo.info.resourceId == 2 || this.buyInfo.info.resourceId == 4 || this.buyInfo.info.resourceId == 5){
                    setTimeout(()=>{
                      window.history.back(-1);
                    },1000)
                  }else{
                    setTimeout(()=>{
                      location.reload();
                    },1000)
                  }



                }else{
                  alert(res.data.msg);
                  setTimeout(()=>{
                    location.reload();
                  },1000)
                }

              })
            }

          })
        }


      },
      paystart(){
          if(this.buyInfo.type == 1){//专家咨询
            // var paydata={
            //   orderNo:this.buyInfo.info.resourceId,
            //   payMoney:this.buyInfo.info.money
            // }
            // alert(JSON.stringify(paydata))
            this.weixinPay(this.buyInfo.info.resourceId);

          }else{
                this.$http.post('order/orderService/newOrder',{
                  subData:{
                    order_type:this.buyInfo.type,
                    order_resource_id:this.buyInfo.info.resourceId,
                    amount:this.buyInfo.type == 8?this.buyInfo.info.money1:this.buyInfo.info.money,
                    coupon_id:this.selectCoupon.id
                  }
                }).then(res=>{
                  if(res.data.code == 1){

                  // this.$toast('购买成功！')
                  // setTimeout(()=>{
                  //   location.reload();
                  // },1500)
                  this.weixinPay(res.data.data);

                }

              })

          }



        // this.$toast('生产订单并调用微信支付');
      },
      weixinPay(paydata){

        let that = this;
        var pdata ={
          orderNo:paydata.orderNo,
          price:paydata.payMoney,
          goodName:'商品购买',
          openId:localStorage.getItem('slbOpenId')?localStorage.getItem('slbOpenId'):localStorage.getItem('openId')
        };
        this.$http.post('pay/payService/wx/payOrder?orderId='+paydata,{
          subData: {
            orderId: paydata,
            couponId: that.selectCoupon.id,
            presentedFlag:(that.isLingqian && that.buyInfo.type !=7)?1:0
            // presentedAmount:that.buyInfo.type ==  7?0:that.iswallet
          }
        }).then(res=>{
          var wxconfig = res.data.data;
          // alert(JSON.stringify(wxconfig));
        setTimeout(()=>{
          this.paying = true;
        },800)

          // todo 微信支付开始
          function onBridgeReady(){

          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId":wxconfig.appId,     //公众号名称，由商户传入
              "timeStamp":wxconfig.timeStamp,         //时间戳，自1970年以来的秒数
              "nonceStr":wxconfig.nonceStr, //随机串
              "package":wxconfig.wxPackage,
              "signType":wxconfig.signType,         //微信签名方式：
              "paySign":wxconfig.paySign //微信签名
            },
            function(res){

              if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。

                if(that.buyInfo.info.resourceId == 2 || that.buyInfo.info.resourceId == 4 || that.buyInfo.info.resourceId == 5){
                  setTimeout(()=>{
                    window.history.back(-1);
                  },1000)
                }else{
                  setTimeout(()=>{
                    location.reload();
                  },1000)
                }


              }else if(res.err_msg == "get_brand_wcpay_request:cancel") {

                location.reload();

              }else if(res.err_msg == "get_brand_wcpay_request:fail") {


                location.reload();

              }else{
                location.reload();
              }
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined"){

          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{

          onBridgeReady();
        }
        // todo 微信支付结束


      })
      },
    },
    mounted(){

      this.getisVip();
      // this.$refs.realMoney.innerHTML='1233';
      this.getquan();
    }
}
</script>
<style lang="scss" scoped>
    .quancontent h3{
        border-bottom:1px solid #EEE;
        padding:25px;
        text-align: center;
    }
    .quancontent h3 span.close{
        position: absolute;top:20px; left:10px; width:40px; display: inline-block;
    }
    .quancontent h3 span.close img{
        width:100%;
    }
    .couponList {
        padding:5pt 10pt;
        li {
            width:100%;
            margin: 10pt 0;
            border-radius: 3pt;
            overflow: hidden;
            display: flex;
            .left {
                width:25%;
                background-color: #231916;
                text-align: center;
                display: flex;
                flex-direction: row;
                justify-content: center;
                -ms-align-items: center;
                align-items: center;
                color:#C9A063;
                h4{
                    font-size: 25pt;
                }
                span{
                    font-size: 7pt;
                    margin-left: 5px;
                }

            }
            .right {
                width:75%;
                padding:8pt 8pt 8pt 5pt;
                background-color: #c69d62;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                p{
                    font-size: 6pt;
                    color:#fff;
                }
                .lg{
                    font-size: 11pt;
                }
                .use{
                    display: flex;
                    flex-direction: column;
                    -ms-align-items: center;
                    align-items: center;
                    justify-content: center;
                    span{
                        display: inline-block;
                        padding:1pt 3pt;
                        border:1pt solid #fff;
                        font-size: 14px;
                        border-radius: 2pt;
                        color:#fff;
                    }
                }
            }
        }

        li.out {
            .left {
                background-color: #b8b8b8;
                color:#666;
            }
            .right {
                background-color: #cecece;
                color:#666;
                p{
                    color:#666;
                }
                .use span{
                    color:#666;
                    border:1pt solid #666;
                }
            }
        }
    }
    .mint-popup-5 {width:100%;
        height: 100%;}
    .mint-popup-3 {background: none!important; width:100%; height:100%;

        .buyBox {

            width: 100%;
            position: fixed;
            bottom: 0px;
            background-color: #fff;
            h4 {
                text-align: center;
                color: #666;
                padding:25px;
                position: relative;
                border-bottom: 1px solid #ddd;
                span {
                    position: absolute;
                    top:15px;left:15px;
                    img{
                        width:45px;
                    }
                }
            }

            dt {
                color: #DCBD60;
                font-size: 16pt;
                padding: 5pt 0;
                text-align: center;
                b{font-size: 16pt;}
            }
            dd {
                color: #666;
                padding:20px 30px;
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
              span{
                label{
                  background:url(./imgs/label_ck1.png) no-repeat center;
                  width:61px;height:38px;
                  background-size: 100%;
                  display:inline-block;
                }
                label.label_ck{
                  background:url(./imgs/label_ck2.png) no-repeat center;
                  width:61px;height:38px;
                  background-size: 100%;
                  display:inline-block;
                }
              }
            }
            ul {
                padding:10px 30px;
                padding-bottom: 80px;
                position:relative;
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


                    display: flex;
                    flex-direction: row;

                    align-items: center;
                    img {
                        width: 20pt;
                        height: 20pt;
                        margin-right: 15px;

                    }
                    .right {
                        width: 90%;
                        height: 30pt;
                        padding-right:100px;
                        border-bottom: 1px solid #ddd;
                        display: flex;
                        position: relative;
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
                    i{display: block;
                        width:40px;
                        position: absolute; right:30px; top:18px;
                        height:40px;
                        background: url("./imgs/radio-unchecked.png") no-repeat center;
                        background-size:100%;
                    }
                    i.checks{

                        background: url("./imgs/radio-checked.png") no-repeat center;
                        background-size:100%;
                    }
                }

                .payc{border:none;
                    span{display: block;}

                    border-radius:10px ; margin-top:50px; width:100%; display: block; padding:20px 0; background: #c69d62; color:#FFF;}
            }
        }

    }

</style>
