<template>
   <div class="zjcon">
     <ul>
       <li v-for="o in otherList">
         <p><span class="louimg fl"><img :src="o.trophy_img"/></span><label class="fl">{{o.trophy_name}} <div v-show="o.redbag_amount">{{o.redbag_amount}} 元</div></label>  <span class="duibtn_dis" v-show="o.state == 1">已领取</span> <span class="duibtn" @click="lingqu(o)" v-show="o.state == 0">领取</span><div class="cl"></div> </p>
       </li>
     </ul>
     <center v-show="otherList.length == 0" style="color:#999;padding-top: 80px;">还没有中奖纪录</center>
   </div>

</template>

<script>
  export default {
    name: "zj-list",
    data(){
      return{
        otherList:[]
      }
    },
    mounted(){
      this.getotherList();
    },
    methods:{
      getotherList(){
        this.$http.get('activity/trophyService/recordList?status=1').then(res=>{
          this.otherList = res.data.data;
        })
      },
      lingqu(obj){
        this.$http.get('activity/trophyService/gain?id='+obj.id).then(res=>{
          if(res.data.code ==1){
            this.$messagebox.alert('领取成功').then(action => {
              this.getotherList();
              // return;
            });
          }else{
            this.$toast(res.data.msg);
          }
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
.zjcon{
  ul{
    background: #FFF;
    li{
      padding:20px;
      border-bottom:2px solid #EEE;
      position: relative;
      .louimg{
        width:160px;
        text-align: center;
        background: #F8F8F8;
        margin-right: 5px;
        padding:15px 0;
        border-radius: 10px;

        display: block;

        img{height:50%;}
      }
      label{
        position: relative;
        top:0px;
         margin-right:50px;
        padding-left:10px;
        height:80px;
        top:0px;

        font-weight: bold;
        display: block;
      }
      .duibtn{
        padding:10px 20px;
        border-radius: 1000px;
        background: #F10000;
        color:#FFF;
        position: absolute;
        top:35px;
        right:30px;
      }
      .duibtn_dis{
        position: absolute;
        top:35px;
        right:30px;
        padding:10px 20px;
        border-radius: 1000px;
        background: #CCC;
        color:#FFF;
      }
    }
  }
}
</style>
