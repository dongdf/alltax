<template>
    <div v-show="moneyShow" class="smoneyfixe">
        <div class="smoney">
            <h3>请选择付费金额</h3>
            <div class="moneyList">

                <li @click="ckmoney(m)" :class="selMoney.value == m.value?'sel':''" v-for="m in moneys">{{m.name}}</li>
            </div>
            <div class="smoneybtn">
                <button @click="moneyOk" class="actOk">确定</button>
                <button @click="moneyCancle" class="actCancle">取消</button>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: "send-money",
    props:['moneyShow'],
    methods:{
      moneyOk(){
        this.$http.post('order/orderService/newOrder',{
          subData:{
            order_type:'1',
            order_resource_id:'',
            amount:this.selMoney.value,
            coupon_id:'',
            imId:this.$parent.$route.query.targetAccount
          }
        }).then(res=>{
          if(res.data.code == 1){
            this.$emit('monenok');
            this.$toast('发起成功，请等待对方支付');
          }else{
            this.$toast(res.data.msg);
          }


      })


      },
      moneyCancle(){
        this.$emit('monenok')
      },
      ckmoney(obj){
        this.selMoney = obj;
      }
    },
    data(){
      return{
        moneys:[
          {name:'10元',value:10},
          {name:'20元',value:20},
          {name:'50元',value:50},
          {name:'100元',value:100}
        ],
        selMoney:{name:'10元',value:10}
      }

    }


  }
</script>

<style lang="scss" scoped>
    .smoneyfixe {
        position: fixed; width:100%; height:100%; top:0;left:0;background: rgba(0,0,0,.5)}
.smoney {
    width:640px; height:450px; margin:0 auto; text-align: center;
    -webkit-border-radius: 10px;
    background:#FFF;
    position: relative;
    top:25%;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
    h3{
        padding:20px; border:1px solid #EEE;
    }
    .moneyList {
        padding:40px 20px;
        margin-top:50px;
    }
    .moneyList li {display: inline; padding:20px 30px;
        -webkit-border-radius: 10px;
        margin:0 10px;
        -moz-border-radius: 10px;
        border-radius: 10px; background: #EEE; color:#333;}
    .moneyList li.sel {background: #C9A061; color:#FFF;}
    .smoneybtn {padding-top:60px;}
    .smoneybtn button{
        width:260px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        display: inline-block;
        padding:15px 0;
        margin:0 20px;
        background:#FFF;
        border:2px solid #C9A061;
        color:#b5935c;
    }
    .smoneybtn button.actOk{
        background:#C9A061;
        border:1px solid #C9A061;
        color:#FFF;
    }
}
</style>
