<template>
    <div class="myWallet">
      <ul class="tabss" style="z-index:99">
        <li :class="active == 1?'cur':''" @click="changetb(1)">零钱<p class="line"></p> </li>
        <li :class="active == 2?'cur':''" @click="changetb(2)">卡包<p class="line"></p></li>
        <div class="cl"></div>
      </ul>
      <div v-show="active == 1">
        <div class="scoreTop">
          <div class="shaiuishai" @click="gohbao()"><i class="lin"></i><span><img src="./img/shai.png"/></span>晒一晒</div>
            <img src="./img/wallet.png" alt="">

          <h3 style="font-size:40px; font-weight: normal">{{mineInfo.totalAmount}}</h3>
          <p>我的零钱(元)</p>
          <p style="color:#999;">零钱满100元后即可申请提现<br>您还可以使用零钱进行支付</p>
          <ul class="money_detail">
            <li>
              <h5>{{mineInfo.canBePresented}}</h5>
              <div class="moneyDetail_desc">提现余额(元)</div>
            </li>
            <li class="last">
              <h5>{{mineInfo.freezingAmount}}</h5>
              <div class="moneyDetail_desc">充值余额(元)</div>
            </li>

          </ul>
          <div class="cl"></div>
          <div class="optmoney">
            <ul>
              <li class="" @click="tixian()"><div class="nbtns">
                  <span v-show="mineInfo.canBePresented>=100"   >
                      全部提现
                  </span>
                  <span v-show="mineInfo.canBePresented<100"   >
                      全部提现
                  </span>
              </div>

              </li>
            <li @click="showchous = true"  class=""><div  class="nbtns nbtns_buy">充值<span class="hui">惠</span></div></li>
              <div class="cl"></div>
            </ul>

          </div>

        </div>
        <h4 class="title" style="color:#C9A063; text-align: center">
            零钱明细
        </h4>
        <ul class="movements">
            <li v-for="q in mxlist">
                <div>
                    <h4>{{q.typeMsg}}</h4>
                    <p>{{q.created_at | timeNumb('yyyy-MM-dd hh:mm')}}</p>
                </div>
                <div>
                  <h4>
                    <span v-if="q.balance>0">+{{q.balance}}</span>
                    <span v-if="q.balance<0" style="color:#333;">{{q.balance}}</span>
                  </h4>
                    <!--<p>{{q.balance}}</p>-->
                </div>
            </li>

        </ul>
      <noresult :tipText="'暂无记录'" v-show="mxlist.length == 0"></noresult>
      <div @click ="loadMoreitem" v-show="mxlist.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>

    </div>

      <!--<div v-show="active == 2">-->

        <!--<div class="kcards">-->
          <!--&lt;!&ndash;未购买&ndash;&gt;-->
          <!--<div class="nobuy" v-if="!showKnowlegCard">-->
            <!--<h3>知识卡</h3>-->
            <!--<p class="descs">您还没有知识卡</p>-->
            <!--<span class="buybtn" ><router-link :to="{path:'/knowledgeCard'}"  >购买知识卡</router-link></span>-->
          <!--</div>-->
          <!--&lt;!&ndash;已购买&ndash;&gt;-->
          <!--<div class="buyed" v-if="showKnowlegCard">-->

            <!--<h3>知识卡</h3>-->
            <!--<p class="descs">到期时间:{{cardinfo.end_time | timeNumb('yyyy-MM-dd')}}</p>-->
            <!--<span class="buybtn" ><router-link :to="{path:'/knowledgeCard'}"  >续费知识卡</router-link></span>-->

          <!--</div>-->
        <!--</div>-->


      <!--</div>-->
      <mt-popup v-model="showchous" position="bottom" class="czcontent">
        <div class="czcontent_c">
          <h3>充值<span class="closes" @click="showchous = false"><img src="./img/cancel.png"> </span></h3>
          <div class="pay_types"><span @click="pptype = 0" :class="pptype == 0?'curpay':''">微信充值</span><span :class="pptype == 1?'curpay':''" @click="pptype = 1">充值码充值</span> </div>
          <div class="lqlist" v-if="pptype == 0">

            <ul>
              <li  @click="paySelect = l" v-for="l in lqList">
                <div class="lqitem" :class="paySelect.id == l.id?'lqitem_cur':''">
                  <h3>{{l.amount}}元</h3>
                  <p>售价{{l.price}}元</p>
                </div>
              </li>

              <div class="cl"></div>

              <button v-show="paySelect.id" class="confirm_btn" @click="buylingq(paySelect)" >确定充值</button>


            </ul>
          </div>
          <div class="jhmcontent"  v-if="pptype == 1">
            <!--<h3>使用激活码充值</h3>-->
            <ul class="jhmul">
              <li class="libox"><input v-model="money_czm" placeholder="请输入充值码" type="text" class="matext"/></li>
              <li>
                <button class="dis" v-show="money_czm.trim().length!=12">充值</button>
                <button @click="money_cz" v-show="money_czm.trim().length==12">充值</button>
              </li>
            </ul>

          </div>
        </div>
      </mt-popup>

    </div>
</template>
<script>
  import  noresult from '@/components/noresult'
export default {
    data() {
        return {
          paySelect:{},
          pptype:0,
          money_czm:'',
          showchous:false,
          walletInfo:{},
          mineInfo:{},
          active:1,
          psize:15,
          pnumb:1,
          mxlist:[],
          loadshow:true,
          cardinfo:{},
          showKnowlegCard:false,
          lqList:[]
        }
    },
  components:{noresult},
    mounted(){
      if(this.$route.query.idx){
        this.active = this.$route.query.idx;
      }
      this.getmineInfo();
      this.getmx();
      this.getcards();
      this.getlqList();
    },

    methods: {
      paylist(){

      },

      money_cz:function () {
        this.$http.post('pay/payService/secret/payOrder?secret='+this.money_czm+'&optType=2',{
          secret:this.money_czm,
          optType:2
        }).then(res=>{

          if(res.data.code == 1){
            this.money_czm = '';
            this.$toast('充值成功')
          }else{

            this.$messagebox('提示',res.data.msg)
          }


        },err=>{
          this.$messagebox('提示','服务异常请重试!')
        })

      },
      getlqList(){
        this.$http.get('activity/rechargePackageService/packageList').then(res=>{
          this.lqList = res.data.data;
        })
      },
      createNeworder(obj){
        return new Promise((resolve,reject)=>{
          this.$http.post('order/orderService/newOrder',{
            subData:{
              order_type:13,
              order_resource_id:obj.id,
              amount:''
            }
          }).then(res=>{
            resolve(res)
          },error=>{
            reject('创建订单失败');
          })
        })
      },
      buylingq(obj){
        this.$indicator.open()
        this.createNeworder(obj).then(res=>{
          this.wxpaylq(res);
        },error=>{
          //
          this.$toast(error)
          setTimeout(()=>{
            this.$indicator.close()
          },2000)
        })
      },
      wxpaylq(paydata){
        let that = this;
        this.$http.post('pay/payService/wx/payOrder?orderId='+paydata.data.data,{
          subData: {
            orderId: paydata.data.data,
            couponId:'',
            presentedFlag:''
            // presentedAmount:that.buyInfo.type ==  7?0:that.iswallet
          }
        }).then(res=>{
          that.$indicator.close()
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
                that.getmineInfo();
                that.getmx();
                that.getcards();

                if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。


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


        },err=>{
          that.$indicator.close()
        })

      },
      changetb(id){
        if(id == 2){
          this.$router.push({path:'/newcard'});
        }
        // this.active = id;
        // this.$router.replace({path:'/wallet',query:{idx:id}});
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
      },
      gohbao(){
        this.$router.push({path:'/shai',query:{purl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/money.jpg',type:1}});
      },
      tixian(){
        this.$http.post('user/userAccountService/presented/withdrawal',{
          subData:{
            amount:this.mineInfo.canBePresented
          }
        }).then(res=>{
          if(res.data.code == 1){
            this.$toast('提现成功');
            this.getmineInfo();
            this.mxlist = [];
            this.pnumb = 1;
            this.getmx();
          }else{
            this.$toast(res.data.msg);
          }

        })
      },
      getmineInfo(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
        })
      },
      loadMoreitem(){
        this.pnumb++;
        this.getmx();
      },
      getmx(){
        this.$http.post('user/userAccountService/findMyPresentedList',{
         subData:{
             pageNum: this.pnumb,
             pageSize: this.psize
           }
        }).then(res=>{
          if(res.data.data.list.length==0){
            this.loadshow =false;
            if(this.pnumb == 1){

              return false;

            }
            this.$toast('没有了');


          }else{
            this.loadshow =true;
            if(this.mxlist.length>0){
              var s = res.data.data.list;
              for(var i in  s){
                this.mxlist.push(s[i]);
              }
            }else{
              this.mxlist = res.data.data.list;
            }
          }

        })
      }

    },

}
</script>
<style lang="scss" >
  .confirm_btn{
    margin-top:30px;
    background: #c69d62;
    color:#FFF;
    border:none;
    width:100%;
    padding:15px 0;
    border-radius: 10px;
    font-size:35px;
  }
  .pay_types{
    padding:20px 0;
    text-align: center;
    border-bottom: 2px solid #Eee;
    margin:0 10px;
    span{
      display: inline-block;
      padding:5px 15px;
      -webkit-border-radius: 10px;

      -moz-border-radius: 10px;
      border-radius: 10px;
      border: 2px solid #EEE;
      margin:0 10px;
      color:#666;


    }
    span.curpay{
      background:#c69d62;
      color:#FFF;

    }
  }
  .jhmcontent{
    margin-top:20px;
    h3{
      border-bottom: 2px solid #EEE;
    }
    .jhmul{
      padding:20px;
      .libox{
        border:2px solid #CCC;
        padding:10px;
        border-radius: 10px;
      }
      li{
        .matext{

          width:100%;
          padding:10px 0;
          border:none;


        }
        button{
          margin-top:30px;
          background: #c69d62;
          color:#FFF;
          border:none;
          width:100%;
          padding:15px 0;
          border-radius: 10px;
          font-size:35px;
        }
        button.dis{

          background: #CCC;

        }
      }
    }
  }
  .lqlist{
    ul{
      padding:20px;
    }
    li{
      width:33.3333%;

      float: left;

      .lqitem{
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 10px #eee;
        .bqs{
          position: absolute;
          width:150px;
          height:35px;
          background: #F60;
          top:10px;right:-50px;
          transform: rotate(45deg);
          color:#FFF;
          font-size:12px;
        }
        margin:10px;
        border:2px solid  #EEE;
        border-radius: 8px;
        background: linear-gradient(#FFFFFF,#F8F8F8);
        text-align: center;
        padding:20px 0;
        h3{
          border:none;
          padding: 0;
          color:#a38a64;

        }
        p{
          color:#c69d62;
          font-size:14px;
        }
      }
      .lqitem_cur{
        border:2px solid #c69d62;
        color: #FFF;
      }

    }
  }
  .czcontent{
    width:100%;
    min-height: 50%;


  }
  .czcontent_c{
    h3{
      position: relative;
      text-align: center;
      padding:25px 0;
      border-bottom: 2px solid #EEE;
      span.closes{
        position: absolute;
        top:20px;
        left:25px;
        img{
          width: 55px;
        }
      }
    }
  }
.optmoney{
  width:95%;
  clear: both;
  overflow: hidden;
  border-radius: 10px;
  margin:10px 20px;

  li{

    list-style: none;
    text-align:center;
    padding:20px 0;
    width:50%;


    float:left;
    position: relative;
    .nbtns {
      border:2px solid #EEE;
      margin:0 10px;
      border-radius: 10px;
      padding:15px 0;
      position: relative;

    }
    .nbtns_buy {
      background: #c69d62;
      color:#FFF;
      .hui{
        position: absolute;
        top:5px;
        right:5px;
        background: #F60;
        color:#FFF;
        padding:0 5px;

        font-size:18px;
        text-align: center;
        border-radius: 100px;

      }
    }


  }
  li:nth-child(1){



  }
  .outmoney{
    font-weight: bold;
    color:#b5935c;
    background: #FFF;
    border:2px solid #CCC;

  }
  .inmoney{
    background: #c69d62;
    font-weight: bold;
    color:#FFF;
    .hui{
      position: absolute;
      top:5px;
      right:5px;
      background: #F60;
      color:#FFF;
      width:40px;
      height:40px;
      font-size:14px;
      text-align: center;
      border-radius: 100px;

    }
  }
}
.myWallet {
  .money_detail{
    padding:30px 0;
    width:100%;
    li{
      width:50%;
      text-align: center;
      float:left;
      .moneyDetail_desc{
        color:#666;
      }
    }
    li.last{
      border-left:2px solid #EEE;
      margin-left:-2px;
    }
  }

  .tabss{
    background: #FFF;
    position: relative;
    z-index: 9999;
    border-bottom:2px solid #DDD;
    li{width:50%;float: left; text-align: center;
      position: relative; padding: 20px 0;}
    li.cur{
        color:#b5935c;
      p.line{
        position: absolute;
        width:200px;
         left:50%;
        height: 4px;background: #b5935c;
        margin-left:-100px;
        bottom:-2px;
      }
    }
  }

    .scoreTop {
        display: flex;
        flex-direction: column;
        align-items: center;
      position: relative;
        justify-content: center;
        padding: 15pt 0;
        background-color: #fff;
      .shaiuishai{
        i.lin{width:2px; background: rgba(255,76,0,1); height:60px;
          position: absolute; top:-60px;left:50%;}
        position: absolute;
        border-radius: 2000px;
        background: rgba(255,76,0,1);
        color:#FFF;
        box-shadow: 0 0 3px #CCC;
        padding:0 20px 5px 20px;
        font-size:20px;
        span{
          position: relative;
          top:6px;
          margin-right:5px;
          img{width:30px; height: 30px; margin:0;}
        }
        top:50px;
        right:20px;

        animation:mymove22 2s infinite;
        @keyframes mymove22
        {
          0%{  transform: scale(1)}
          50%{ transform: scale(.9)}
          100%{ transform: scale(1)}
        }
      }

        img {
            width: 50pt;
            height: 50pt;
            margin-bottom: 5pt;
        }
        h5 {
            line-height: 22pt;
            font-size: 15pt;
            color: #333;
          text-align: center;
        }
        p {
            line-height: 16pt;
            color: #666;
            font-size: 10pt;
            display:block;
          width:90%;
          text-align: center;
        }
        .ti{
            display: block;
            padding:6pt 20pt;
            font-size:30px;
            font-weight: bold;
            background-color: #C9A063;
            color:#fff;
            border-radius: 3pt;
            margin:5pt auto;
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
    .title{
        color:#666;
        font-size: 10pt;
        padding: 8pt 10pt;

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
                    font-size: 11pt;
                    line-height: 16pt;
                  color:#333;
                    span{
                      color:#C9A063;
                      font-size: 14pt;
                      font-weight: normal;
                    }
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
