<template>
    <div>
        <div class="phoness"><input placeholder="请输入您的手机号" v-model="mobile" type="number"/></div>
        <!--<reply type=2 pics=false></reply>-->
        <div class="pics" >
        <div class="tx">
            <textarea name="" id="tl" v-model="adviceContent" maxlength="500" placeholder="请输入建议内容"></textarea>
            <!--<p v-show="pics">-->
                <!--<span><img src="/imgs/upload.png" alt=""></span>-->
            <!--</p>-->
            <span class="btn" @click="subAdvice">提交</span>
        </div>
    </div>
    </div>

</template>

<script>
import reply from '../../components/reply'
export default {
    data() {
        return {
          adviceContent:'',
          mobile:'',
          mineInfo:{}
            
        }
    },
  mounted(){
      this.getmineInfo();
  },
  methods:{
    getmineInfo(){
      this.$http.get('user/userService/getUserWeChatVo').then(res=>{
        // this.$http.get('way/serverport').then(res=>{
        this.mineInfo= res.data.data;
        this.mobile = this.mineInfo.mobile;

    })
    },
    subAdvice(){
      if(!this.mobile && !this.adviceContent){
        this.$toast('请填写手机和建议')
        return false;
      }
      this.$http.post('user/userService/addComplaint',{
        subData:{
          mobile:this.mobile,
          content:this.adviceContent
        }
      }).then(res=>{
        // this.$http.get('way/serverport').then(res=>{
        if(res.data.code == 1){
          this.$toast('提交成功,24小时内会与您联系');
          this.adviceContent = '';
          this.$router.push('/mine')
      }

    })

    }

  },
    components:{
    	reply
    }
}
</script>
<style scoped lang="scss">
    .phoness {
        padding:35px;
        padding-bottom: 20px;
        input{
            width:100%;
            border:1px solid #DDD;
            padding:20px;
        }
    }

    .small{
        .replyBox{
            position:fixed;
            height:62pt;
            padding:2pt;
            width:100%;
            bottom:0px;
            left:0px;
            display:flex;
            flex-direction: row;
            background-color: #eee;

            textarea{
                width:90%;
                height:100%;
                background-color: #fff;
                border:1px solid #ddd;
                border-radius: 2pt;
                color: #666;

                padding:2pt;
                outline: none;
            }

            .send{
                display: block;
                height:100%;
                width:10%;
                background: url(/imgs/send_h.png);
                background-size: 100% 100%;
                margin-left:3pt;
            }
        }
    }
    .tx{
        background: #fff;
        padding: 10pt 14pt;
        text-align: center;
        textarea{
            font-size:20px;
        }
        #tx {
            display: block;
            width: 100%;
            padding: 3pt 2%;
            height: 80pt;
            background: #f6f6f6;
            border: 2px solid #c9c9c9;
            border-radius: 4pt;
            appearance: none;
            color: #666;
            font-size: 11pt;
        }
        #tl{
            display: block;
            width: 100%;
            padding: 3pt 2%;
            height: 120pt;
            background: #f6f6f6;
            border: 2px solid #c9c9c9;
            border-radius: 4pt;
            appearance: none;
            color: #666;
            font-size: 11pt;
        }

        img {
            width: 20pt;
            height: 20pt;
            margin: 5pt;
        }
        .btn {
            display: inline-block;
            width: 8rem;
            height: 0.93333rem;
            line-height: 0.93333rem;
            background: #b5935c;
            margin: 10pt auto;
            text-align: center;
            border-radius: 0.10667rem;
            font-size: 11pt;
            color: #fff;
        }
    }

</style>