<template>
  <div class="actsucess">
    <!--激活成功-->
    <div class="activeSucees">

      <div class="activeSucees_c" >
        <div class="hcbgs"><img src="./imgs/hcbg.png"></div>
        <h3>{{stips?'恭喜您':''}}</h3>
        <h1>{{stips?'激活成功':''}}</h1>
        <p>{{stips?'能够免费看课程啦！':''}}</p>
        <p v-show="!stips">{{errmsg}}</p>
        <p v-show="stips"><label  @click="goview">马上看课</label></p>
        <p  v-show="!stips"><label  @click="gohome">查看更多课程>></label></p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "course-active",
    data(){
      return{
        errmsg:'',
        actMa:'',
        actInfo:{},
        stips:false,
        money_czm:'',
      }
    },
    mounted(){
      if(this.$route.query.km){
        this.money_czm = this.$route.query.km;
        this.autoAct();
      }else{
        alert('非法请求，即将关闭');
        WeixinJSBridge.invoke('closeWindow',{},function(res){
        });
      }
    },
    methods:{
      autoAct(){
        this.$http.post('pay/payService/secret/payOrder?secret='+this.money_czm+'&optType=1',{
          secret:this.money_czm,
          optType:1
        }).then(res=>{
          if(res.data.code == 1){
            this.stips = true;
            this.actInfo =res.data.data;
          }else{
            this.stips = false;
            this.errmsg = res.data.msg;
            // this.$messagebox.alert(res.data.msg,'提示').then(action =>{
              // WeixinJSBridge.invoke('closeWindow',{},function(res){
              // });
            // });
          }
        },err=>{
          this.$messagebox.alert('服务异常请重试!','提示').then(action =>{
            // WeixinJSBridge.invoke('closeWindow',{},function(res){
            // });
          });
        })

      },
      gohome(){
        this.$router.replace({path:'school',query:{}})
      },
      goview(){
        if(this.actInfo.order_resource_id){
          this.$router.replace({path:'course-detail',query:{id:this.actInfo.order_resource_id}})
        }


      }
    }
  }
</script>

<style scoped lang="scss">
  .actsucess{
    position: absolute;width:100%;height:100%;top:0;left:0;


  }
  .activeSucees{

    position: fixed;
    width:100%;height:100%;
    background: rgba(0,0,0,.5);
    z-index:9;
    top:0;left:0;
  .activeSucees_c{
    text-align: center;
  h3{
    padding-top:100px;
    font-size:35px;
    color: #c69d62;
  }
  p{
    padding-top:20px;
    color:#666;
    font-size:30px;
  label{
    display: inline-block;
    -webkit-border-radius: 100px;
    padding:10px 30px;
    color:#FFF;
    background: #a38a64;
    -moz-border-radius: 100px;
    border-radius: 100px;
    margin:30px 0;
    margin-bottom: 80px;
    font-size:30px;
  }
  }
  h1{
    padding-top:10px;
    font-size:55px;
    color: #c69d62;

  }
  .hcbgs{
    position: absolute;
    width:100%;
    top:-170px;z-index:999;
  img{width:100%;

  }
  }
  background: #FFF;
  .headimgss{

  }
  border-radius: 10px;
  width:70%;
  min-height: 300px;
  margin:0 auto;
  position: relative;
  top:30%;
  }
  }
</style>
