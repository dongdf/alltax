<template>
<div>
  <div class="invicontent">
    <img :src="inviDetail.meeting_pic"/>
  </div>

  <div v-show="isshowqian" class="qianc" @click="qinfoshow = true">立即签到</div>
  <mt-popup v-model="qinfoshow"  position="bottom" class="inviInfo" :modal="true">
     <div class="qdpp_cc">
       <h3>请填写签到信息</h3>
       <ul>
         <li><label>姓&nbsp;&nbsp;&nbsp;名</label><input v-model="name" placeholder="请输入姓名"/></li>
         <li><label>手机号</label><input v-model="phone" placeholder="请输入手机号"/></li>
         <li class='qbtn'>
           <button @click="qiandao">确认签到</button>
         </li>
       </ul>
     </div>
  </mt-popup>
</div>
</template>

<script>
  export default {
    name: "invitation-card",
    data(){
      return {
        qinfoshow:false,
        name:'',
        phone:'',
        inviDetail:{},
        imgPath:{},
        mid:'',
        isshowqian:false,
      }
    },
    mounted(){
      if(this.$route.query.id){
        this.mid = this.$route.query.id;
        this.getQstate();
        this.getinviDetail();

      }

    },
    methods:{
      getQstate(){//检查签到状态
        this.$http.get('activity/meetingService/signInCheck?meetingId='+this.mid).then(res=>{
          if(res.data.code == 1){
            this.isshowqian = true;
          }else{
            this.isshowqian = false;
          }
        })
      },
      qiandao(){
        if(!this.name.trim()){
          this.$toast('请输入姓名');
          return false;
        }
        if (!this.$options.filters.isphone(this.phone)) {
          this.$toast("请填写正确的手机号码！");
          return false;
        }
        this.$http.get('activity/meetingService/signIn?meetingId='+this.mid+"&name="+this.name.trim()+"&mobile="+this.phone).then(res=>{
          if(res.data.code == 1){
            this.$messagebox.alert('签到成功');
            this.qinfoshow = false;
            this.isshowqian = false;
            setTimeout(()=>{
              this.getQstate();
            },1000)
          }else{
            this.$toast(res.data.msg);
          }


        })

      },
      getinviDetail(){
        this.$http.get('activity/meetingService/detail?id='+this.mid).then(res=>{
          if(res.data.code!=1){
            this.$toast(res.data.msg);
            setTimeout(()=>{
              this.$router.replace('/home');
            },2000)
            return false;
          }
          this.inviDetail = res.data.data;

          document.title = res.data.data.meeting_name;

          var shareJson={
            type:1,
            title:this.inviDetail.meeting_name,
            desc:this.inviDetail.meeting_name,
            link:'/#/invitationCard?id='+this.mid+'&fxopenid='+this.inviDetail.p_openid,
            imgUrl:res.data.data.meeting_pic
          }
          this.$parent.shareTimePage(shareJson);
          this.$parent.shareAppPage(shareJson);


        })

      }
    }
  }
</script>
<style lang="scss" scoped>
.inviInfo{
  width:100%;
  position: fixed;
  bottom:0;
  height:100%;
  background: none;
  .qdpp_cc{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    background: #FFF;
    h3{
      text-align: center;
      position: relative;
      padding:20px 0;
      border-bottom: 2px solid #DDD;
    }
    ul{
      padding:30px;
      li{
        border-bottom: 2px solid #eee;
        padding:20px 0;
        label{
          display: inline-block;
          width:120px;
        }
        input{ border:none;width:500px;}
      }
      .qbtn{
        border:none;
        button{
          background: rgba(255,0,0,.8);
          color:#FFF;
          border:none;
          padding:25px 0;
          border-radius: 10px;
          width:100%;
        }
      }
    }
  }
}


  .invicontent{
    img{
      display: block;
      width:100%;
    }
  }
  .qianc{
    position: fixed;

    left:0;
    width:100%;
    text-align: center;
    padding:30px 0;
    font-weight: bold;
    font-size:35px;
    bottom:0;
    background: rgba(255,0,0,.8);
    color:#FFF;
  }

</style>
