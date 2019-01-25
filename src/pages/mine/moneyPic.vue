<template>
   <div>
     <div class="money">
        <div class="moneyImg">
             <img v-if="maUrl" :src="maUrl">
          <img v-if="!maUrl" src="./img/moneytips_1.jpg">
        </div>
        <div class="actmoney">
           <span @click="maUrl=''" v-show="maUrl">清空金额</span>
          <span @click="showset= true;" v-show="!maUrl">设置收款金额</span>
        </div>

       <div class="moneyList" v-show="orderlist.length>0">
         <h3>历史收款记录</h3>
         <ul>
           <li v-for="o in orderlist">
               <div class="paypic">

                 <img :src="o.headPic">
               </div>
               <div class="payinfo">
                 <h3>{{o.nickName}}</h3>
                 <p>{{o.payTime | timeNumb('yyyy-MM-dd hh:mm') }}</p>
               </div>
             <label class="payPrice">￥{{o.payPrice}}</label>
             <div class="cl"></div>

           </li>







         </ul>
         <div class="loads" v-show="loadm && orderlist.length>=psize" @click="loadmores">点击加载</div>
       </div>
     </div>
     <mt-popup v-model="showset"  position="bottom" :modal="true" class="setmoneys" >
           <div class="moneysc">
               <h3><label @click="showset= false;" class="close">关闭</label>设置收款金额</h3>
               <div class="mboxs">

                 <div class="ibox"><label>￥</label><input  v-model="maPrice" placeholder="请输入金额"/></div>
                 <button @click="resetting">设置</button>
               </div>
           </div>
     </mt-popup>
   </div>
</template>

<script>
  export default {
    name: "money-pic",
    data(){
      return {
        // orgImg:'',
        showset:false,
        maUrl:'',
        maPrice:0,
        orderlist:[],
        pnumb:1,
        psize:10,
        loadm:true
      }
    },
    mounted(){
      // this.setMoney();
      this.getorder();
    },
    methods:{
      resetting(){


        if(this.maPrice<=0){
          this.$toast('请输入金额');
          this.showset = true;
          return false;

        }

        this.setMoney();
        this.showset = false;

      },
      loadmores(){
        this.pnumb++;
        this.getorder();
      },
      getorder(){
        this.$http.post('order/orderService/qrPayOrderList/'+this.psize+'/'+this.pnumb).then(res=>{
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了')
            }
            this.loadm = false;
            return false;

          }else{
            this.loadm = true;
            if(this.orderlist.length>0){
              var temp = res.data.data.list;
              for(var i in temp){
                this.orderlist.push(temp[i]);
              }
            }else{
              this.orderlist = res.data.data.list;
            }
          }

        })
      },
      setMoney(){

        this.$http.post('activity/posterService/getPayQrByAmount',{
          "amount": this.maPrice,
          "headLogo": 1
        }).then(res=>{
          this.maUrl = res.data.data
        },error=>{
          alert('请重试');
          this.showset = true;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .mboxs{
    padding:30px;
    .ibox{
      border:2px solid #CCC;
      padding:5px;
      -webkit-border-radius: 8px;
      margin-bottom: 20px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      position: relative;
      label{
        position: absolute;
        font-size:55px;
        color:#c69d62;
        left:25px; top:15px;
      }
      input{
        padding:20px 0;
        text-align: right;
        margin-left:150px;
        width:520px;
        border:none;
        font-size:40px;
      }

    }
    button{
      background: #c69d62;
      color:#FFF;
      width:100%;
      border:none;
      padding:15px;
      font-size:35px;
      font-weight: bold;
      border-radius: 10px;
    }
  }
  .setmoneys{
    position: fixed;
    width:100%;
    overflow: hidden;
    bottom:0;
  }
  .moneysc{

    background: #FFF;
    width:100%;
    height: 400px;
    z-index: 9999;
    h3{
      padding:25px;
      text-align: center;
      border-bottom: 2px solid #EEE;
      position: relative;
      .close{
        position: absolute;
        top:25px;
        left:20px;
        font-weight: normal;
      }
    }
  }
  .money{
    position: absolute;height:100%;
    overflow: auto;
    background: #ffd700;
  }
  .actmoney{
    margin: 0 auto;
    text-align: center;
    span{
      text-align: center;display: inline-block;
      padding:15px 40px;
      color:#FFF;
      background: #CC0000;

      box-shadow: 1px 3px 5px rgba(0,0,0,.5);
      font-weight: bold;
      border-radius: 1000px;
    }

  }
  .moneyList{
    .loads{
      text-align: center;
      padding:30px 0;

    }
      margin-top:40px;
    h3{
      padding:20px 0 20px 20px;

      color:#FFF;

      background: rgba(0,0,0,.2);
      text-align: center;
      font-size:25px;
      font-weight: normal;
    }
    ul{
      padding:0 20px;
      li{
        border-bottom: 2px solid #EEE;
        position: relative;
        .payPrice{
          position: absolute;
          top:20px;
          right:20px;
          color:#CC0000;
          font-size:45px;
        }
        padding:15px 0;
        .paypic{width:100px;
          height: 100px;
          background: #c69d62;
          -webkit-border-radius: 1000px;
          -moz-border-radius: 1000px;
          border-radius: 1000px;
          float:left;
          img{
            width:100%;
            height:100%;
            -webkit-border-radius: 1000px;
            -moz-border-radius: 1000px;
            border-radius: 1000px;
          }
      }
        .payinfo{
          float: left;
          width:590px;
          padding-left:20px;
          padding-top:8px;
         h3{
           color:#000;
           text-align: left;
           font-size:30px;
           padding:0;
           background:none;
         }
          p{
            color:#999;
          }
        }
        }
    }

  }
.moneyImg{
  img{
    width:100%;
  }

}
</style>
