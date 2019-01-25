<template>
    <div>
      <mt-popup v-model="parentShowzhui"   position="bottom" class="zhuiContent"  :modal="true">
        <div  class="zhuic" >
<h3>回复<span @click="closezhui()"><img src="./imgs/cancel.png"/> </span></h3>
          <div>
            <div class="tra"><textarea v-model="zhuicontent" placeholder="请输入回复内容"></textarea></div>
          </div>
          <button class="zhuibtn" @click="zhuitj">提交</button>
        </div>

      </mt-popup>
    </div>
</template>

<script>
  export default {
    name: "zhui",
    data(){
      return{
        showzhui:true,
        zhuicontent:'',
        mineInfo:{},
        anshow:true
      }

    },
    mounted(){
      this.checkUser();
    },
    props:['parentShowzhui','zhuiInfo'],
    methods:{
      checkUser(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
          if(!this.mineInfo.mobile){
            this.$messagebox.confirm('请完善用户信息后继续回答问题', '提示').then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }

        })
      },
      zhuitj(){

        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('请完善用户信息后继续回答问题', '提示').then(ret=>{
            this.$router.push('/login');
          });
          return false;
        }
        let that = this;
        if(!this.zhuicontent.trim()){
          this.$toast('请输入内容');
          return false;
        }
        if(!this.anshow){
          return false;
        }
        this.anshow = false;

        this.zhuicontent = this.zhuicontent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
        this.answercontent = this.zhuicontent.replace(/\n/g, '<br/>'); //IE7-8
        this.zhuicontent = this.zhuicontent.replace(/\s/g, ' '); //空格处理


        this.$http.post('ask/askService/createAnswer', {
          "subData":{
            ask_question_id:this.$route.query.questionId,
            answer_content:this.zhuicontent,
            pid:this.zhuiInfo.anid

          }
        }).then(res => {
          if(res.data.code == 1){
            this.$toast('提交成功');
            this.$emit('submitzhui');
            // setTimeout(()=>{
            //   this.anshow = true;
            //   that.$router.replace({path:'/question-detail',query:{questionId:this.$route.query.questionId}});
            // },1000)

          }else{
            this.$toast(res.data.msg);
          }

        })


      },
      closezhui(){
        this.$emit('close')

      }
    }
  }
</script>

<style lang="scss" scoped>
  .zhuiContent{
    position: fixed;
    bottom:0;

    background: #FFF!important;
    width:100%;

    .zhuic{
      padding:20px;
      h3{
        text-align: center;
        padding:15px;
        position: relative;
        /*border-bottom: 2px solid #EEE;*/
        span{
          position: absolute;
          top:10px; left:10px;
          img{
            width:45px;
          }
        }
      }
      .tra{
        border:2px solid #EEE;
        margin:20px 0;
        padding:10px;
        border-radius: 10px;
        textarea{
          outline: none;
          height:400px;
          border: none;
          width:100%;
        }
      }
      .zhuibtn{
        width:100%;
        padding:10px 0;
        border:none;
        background: #b5935c;
        color:#FFF;
        border-radius: 10px;
        padding:20px 0;

      }
    }

  }

</style>
