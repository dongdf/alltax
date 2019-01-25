<template>
  <div>
    <ul class="box4 ">
        <li class="clear solved">
          <div class="state">
            <img v-show="questionInfo.askUser.state == 0" class="stateimg" src="./imgs/state22.png"/>
            <img v-show="questionInfo.askUser.state == 1" class="stateimg" src="./imgs/state22.png"/>
            <img v-show="questionInfo.askUser.state == 2" class="stateimg" src="./imgs/state33.png"/>
            <img v-show="questionInfo.askUser.state == 3" class="stateimg" src="./imgs/state44.png"/>
            <img v-show="questionInfo.askUser.state == 4" class="stateimg" src="./imgs/state44.png"/>
          </div>
          <img :src="questionInfo.askUser.user_head" class="ar-l">
          <div class="desc ar-l">
            <div class="clear t1">
              <span class="ar-l">{{questionInfo.askUser.nick_name}}</span>
              <span class="ar-r">{{questionInfo.askUser.created_time | time}}</span>
            </div>
            <p v-html="questionInfo.askUser.question_content"> </p>
            <div class="clear t2">
              <!--<span class="ar-l">悬赏 50元</span>-->
              <span class="ar-r"><span class="mar">回答{{questionInfo.answers.length?(questionInfo.answers.length):'0'}}</span>
                <!--关注{{questionInfo.attentionCount?questionInfo.attentionCount:'0'}}-->
              </span>
            </div>
          </div>
        </li>
    </ul>
    <div class="ask">

    <div class="tx">
    <textarea name="" id="tx" placeholder="请输入回答内容" v-model="answercontent"></textarea>
      <div class="xuanshang" v-show="mineInfo.company_province == 999999 && mineInfo.isSpecially!=1">
        <h3>选择悬赏金额<i>用户付费后才可以查看您的回答内容</i></h3>
        <p>
          <a @click="ckxs(s)" v-for="s in shanglist" :class="shangSelect.value == s.value?'cur':''"><span>{{s.name}}</span></a>

        </p>
        <p v-show="shangSelect.value" @click="shangSelect={}" class="delchose"><a>取消悬赏</a></p>
      </div>

    </div>


    <div class="di">
      <div @click="subques" class="btn">
        提交
      </div>
    </div>

  </div>






  </div>




</template>

<script>
  import tabbar from '../../components/tabbar'
  import {time} from '@/filters/index'
  export default {

    data() {
      return {
        submitting:true,
        placeholder:'请输入回答内容（0/500）',
        questionInfo:{askUser:{},answers:{}},
      answercontent:'',
        shangSelect:{},
        shanglist:[
          {name:'1元',value:1},
          {name:'2元',value:2},
          {name:'3元',value:3},
          {name:'5元',value:5}
        ],
        anshow:true,
        mineInfo:{}
      }
    },
    components: {
      //
    },

    computed: {
      //
    },

    methods: {
      ckxs(obj){
        if(this.shangSelect.value == obj.value){
          this.shangSelect = {};
        }else{
          this.shangSelect = obj;
        }
      },
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

      subques(){

        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('请完善用户信息后继续回答问题', '提示').then(ret=>{
            this.$router.push('/login');
          });
          return false;
        }
        let that = this;
        if(!this.answercontent.trim()){
          this.$toast('请输入回答内容');
          return false;
        }
        if(!this.anshow){
          return false;
        }
        this.anshow = false;

        this.answercontent = this.answercontent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
        this.answercontent = this.answercontent.replace(/\n/g, '<br/>'); //IE7-8
        this.answercontent = this.answercontent.replace(/\s/g, ' '); //空格处理


        this.$http.post('ask/askService/createAnswer', {
          "subData":{
            ask_question_id:this.$route.query.questionId,
            answer_content:this.answercontent,
            charge:this.shangSelect.value,
            answer_pic:''
          }
        }).then(res => {
          if(res.data.code == 1){
            this.$toast('提交成功');
          setTimeout(()=>{
            this.anshow = true;
            that.$router.replace({path:'/question-detail',query:{questionId:this.$route.query.questionId}});
        },1000)

        }else{
          this.$toast(res.data.msg);
        }

      })

      },
      goToCourse(){
        this.$router.push({path: 'course', query: this.$route.query})
      },

      gotoDetail(){

        this.$router.push({path: 'home', query: this.$route.query})
      }

    },

    mounted() {
      this.checkUser();
      this.$http.post('ask/askService/getDetail',{"subData": this.$route.query.questionId}).then(res => {
        console.log(res.data)
      if (res.data.code == 1) {
        this.questionInfo = res.data.data
      }else{
        //
      }
    })
    }
  }

</script>


<style lang="scss" scoped>

.box4{
      background:#fff;
      padding:34px 0 42px;

      li{
        position: relative;
        padding-top:28px;
        img{
          width:60px;
          height:60px;
          margin:0 22px 0 40px;
          border-radius: 60px;
        }

        .desc{
          width:590px;
          padding-bottom:16px;
          .t1 .ar-l{
            color:#333;
            font-size:30px;
            line-height:60px;
          }
          .t1 .ar-r{
            color:#999;
            font-size:24px;
            line-height:60px;
          }
          p{
            color:#333;
            font-size:28px;
            line-height:40px;
            margin:24px 0 38px;
          }
          .t2 span{
            color:#666;
            font-size:24px;
          }
          .mar{
            margin-right:22px;
          }
        }
      }
      .state{
        content:'';
        position:absolute;
        top:5pt;
        right:80pt;
        width:100px;
        height:100px;


      }
    .state img.stateimg {width:100%; height: 100%; margin:0;padding:0;}

    }

  .ask{
    background:#f6f6f6;
    padding-bottom: 120px;
    .xuanshang{

      text-align: center;
      padding:35px 0 0 0;


      h3{
        font-weight: normal;
        i{font-style: normal; display: block; color:#999; font-size:20px;}
      }
      p.delchose{
        color:#666;
        margin:30px 0 0 0;
        a{
          padding:10px 15px;
          border:2px solid #DDD;
          font-size:20px;

          border-radius: 10px;
        }


      }
      p{
        padding-top:30px;
        a{
          margin-right: 20px;
          color:#333;
          span{
            white-space: nowrap;
            padding:10px 20px;
            display: inline-block;
            border-radius: 5px;
            border:2px solid #DDD;

          }
        }
        a.cur{

          span{
            padding:10px 20px;
            background: #FF5C26;
            border:2px solid #FF5C26;
            color:#FFF;
            box-shadow: 0 0 4px #CCC;
          }
        }
      }
    }

    .selects{
      width:100%;
      height:90px;
      display: flex;
      flex-direction: row;
      align-items: arround;
      border-bottom:1px solid #ddd;
      background:#fff;
      color:#666;
      position:relative;
      justify-content:space-between;
      select{
        width:45%;
        height:90px;
        text-align:center;
      }
      .line{
        height:70px;
        width:1px;
        left:50%;
        border-left:1px solid #ddd;
        margin-top:10px;
      }
    }

    .tx{
          background:#fff;
          padding:30pt 14pt;
          text-align:center;
      }

      #tx{
        display:block;
        width:96%;
        padding:3pt 2%;
        height:140pt;
        background:#f6f6f6;
        border:2px solid #c9c9c9;
        border-radius:4pt;
      }
      .tags{
        background-color: #fff;
        padding: 0pt 14pt 10pt;
        display: flex;
        flex-direction: row;
      }
      .kuai{
        color: #666;
        font-size: 24px;
        line-height: 34px;
        display: inline-block;
        margin: 0 21pt 0pt 0;
        padding: 8px 20px;
        background-color: #ececec;
        border-radius: 8px;
      }
      .kuai.active{
        color: #fff;
        background-color: #C9A063;
      }
      .di{
         background:#fff;
         padding:0pt 14pt 50pt 14pt;
      }
      .btn{
        width: 8rem;
        height: 0.93333rem;
        line-height: 0.93333rem;
        background: #b5935c;
        margin: 0 auto;
        text-align: center;
        border-radius: 0.10667rem;
        font-size:34px;
        color:#fff;
      }




  }
</style>
