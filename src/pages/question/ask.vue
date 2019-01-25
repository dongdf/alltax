<template>
    <div class="ask">
        <!--<div class="showSwitch">-->
            <!--<span @click="showList">{{showtypes}}</span>-->
          <!--<span  >请输入问题</span>-->
              <!--<div class="line"></div>-->
            <!--<span @click="showList">类型</span>-->
        <!--</div>-->
        <ul class="custom-la" v-show="show">
            <li>

                <dl class="clear">
                    <dt>类型:</dt>
                    <dd @click="ck2(c)" :class="select2.id == c.id?'selectbq':''" v-for="c in qtype2">{{c.classfyName}}</dd>

                </dl>
                <dl class="clear">
                    <dt>行业:</dt>

                    <dd @click="ck1(c)" :class="select1.id == c.id?'selectbq':''" v-for="c in qtype1">{{c.classfyName}}</dd>

                </dl>
            </li>
            <li>
                <p><span class="btn" @click="showList2">确定</span></p>
            </li>
        </ul>
        <div class="pics"  >
            <div class="tx">
                <textarea name="" id="tl" v-model="askcontent" placeholder="请输入提问内容" ></textarea>
                <!--<p v-show="pics">-->
                    <!--<span><img src="/imgs/upload.png" alt=""></span>-->
                <!--</p>-->
                <br>
              <csupload ref="csupload" :max="1"></csupload>
                <span class="btn" @click="subques">确定</span>
            </div>
        </div>
        <!-- <div class="tags">
      <div class="kuai active">悬赏</div>
      <div class="kuai">不悬赏</div>
    </div>

    <div class="tags">
      <div class="kuai active">1元</div>
      <div class="kuai">6元</div>
      <div class="kuai">8元</div>
    </div> -->
        <div class="success" v-show="success">
            <div class="smBox">
                <img src="./imgs/ok.png" alt="">
                <h5>提交成功</h5>
                <p>提交成功，请耐心等待回答</p>
                <div class="lightBtn" @click="successbtn">
                    我知道了
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import reply from '../../components/reply'
  import {time} from '@/filters/index'
  import csupload from '@/components/csupload'
  export default {
    data() {
      return {
        show: false,
        success: false,
        placeholder: '请输入提问内容（0/500）',
        qtype1: [],
        mineInfo:{},
        qtype2: [],
        select1: {id:''},
        select2: {id:''},
        askcontent:'',
        success:false,
        showtypes:'请选择分类',
        submitting:true
      }
    },
    mounted() {
      this.getType1();
      this.getType2();
      this.checkUser();
    },
    components: {
      reply,csupload
      //
    },
    methods: {
      checkUser(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
          if(!this.mineInfo.mobile){
            this.$messagebox.confirm('为了更好的解决您的问题，请先完善用户信息', '提示').then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }

        })
      },
      subques(){
        // if(!this.select1.id || !this.select2.id){
        //   this.$toast('请选择问题分类和行业');
        //   this.show = !this.show;
        //   return false;
        // }



        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('为了更好的解决您的问题，请先完善用户信息', '提示').then(ret=>{
            this.$router.push('/login');
          });
          return false;
        }
        if(!this.askcontent.trim()){
          this.$toast('请输入提问内容');
          return false;
        }
        this.askcontent = this.askcontent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
        this.askcontent = this.askcontent.replace(/\n/g, '<br/>'); //IE7-8
        this.askcontent = this.askcontent.replace(/\s/g, ' '); //空格处理
        if(!this.submitting){
          return false;
        }
        this.submitting = false;
        var imgurl='';
        if(this.$refs.csupload.tempImgs.length>0 && this.$refs.csupload.tempImgs[0].url){
          var imgurl=this.$refs.csupload.tempImgs[0].url;
        }
        this.$http.post('ask/askService/createAsk', {
          "subData":{
            question_classfy_id:this.select2.id,
            classfy_id:this.select1.id,
            question_content:this.askcontent,
            question_pic:imgurl
          }
        }).then(res => {
          if(res.data.code == 1){

          this.success = true;
        }else{
            this.$toast(res.data.msg);
        }
          this.submitting = true;

      })

      },
      successbtn(){
        this.success = false;
        this.$router.push({path:'/question'});
      },
      ck2(obj){
        this.select2 = obj;


      },
      ck1(obj){
        this.select1 = obj;
      },
      getType1() {
        this.$http.get('ask/askService/getQuestionTrade').then(res=>{
          this.qtype1 = res.data.data;
          // this.select1 = this.qtype1[0]
        })
      },
      getType2() {

        this.$http.get('ask/askService/getQuestionClassfy').then(res=>{

          this.qtype2 = res.data.data;
          // this.select2 = this.qtype2[0]
        })
      },
      showList() {
        this.show = !this.show;
        // this.showtypes = this.select2.classfy_name+'>'+this.select1.classfyName;
      },
      showList2() {
        this.show = false;
        if(!this.select2.classfy_name || !this.select1.classfyName){
          return false;
        }
        this.showtypes = this.select2.classfy_name+'>'+this.select1.classfyName;
      },
      showToast() {
        this.success = true;
      },
      goToCourse() {
        this.$router.push({path: 'course', query: this.$route.query})
      },

      gotoDetail() {
        this.$router.push({path: 'home', query: this.$route.query})
      }
    }

  }
</script>
<style lang="scss" scoped>
    .ask .custom-la dd.selectbq {
        background: #C9A061; color:#FFF;
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
                font-size: 9pt;
                padding:2pt;
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
            font-size: 9pt;
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
            font-size: 9pt;
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
    .ask {
        background: #f6f6f6;
        padding-bottom: 120px;

        .showSwitch {
            display: flex;
            flex-direction: row;
            justify-content: center;
            -ms-align-items: center;
            align-items: center;
            background: #fff;
            border-bottom: 1px solid #ddd;
            span {
                display: block;

                height: 90px;
                line-height: 90px;
                text-align: center;

                position: relative;
            }
            span:after {
               /* content: '';
                z-index: 3;
                width: 32px;
                height: 18px;
                position: absolute;
                top: 34px;
                right:-50px;
                background: url(./imgs/xia.png) no-repeat;
                background-size: 100% 100%;
                */
            }
            .line {
                height: 60px;
                width: 1px;
                left: 50%;
                border-left: 2px solid #ddd;
            }
        }

        .custom-la {
            position: fixed;
            top: 90px;
            width: 100%;
            background-color: #f6f6f6;
            padding: 10pt;
            border-bottom: 1pt solid #ddd;
            p {
                text-align: center;
                .btn {
                    margin: 10pt auto 5pt;
                    font-size: 11pt;
                    padding: 3pt 15pt;
                    border: none;
                    box-shadow: none;
                    appearance: none;
                }
            }
            dt {
                margin-top: 5pt;
                font-size: 12pt;
                color: #C9A063;
            }
            dd {
                float: left;
                margin: 5pt 5pt 5pt 0;
                padding: 0 3pt;
                border: 2px solid #ddd;
                border-radius: 3px;
                background-color: #fff;
                font-size: 10pt;
            }
        }
        .tags {
            background-color: #fff;
            padding: 0pt 14pt 10pt;
            display: flex;
            flex-direction: row;
        }
        .kuai {
            color: #666;
            font-size: 24px;
            line-height: 34px;
            display: inline-block;
            margin: 0 21pt 0pt 0;
            padding: 8px 20px;
            background-color: #ececec;
            border-radius: 8px;
        }
        .kuai.active {
            color: #fff;
            background-color: #C9A063;
        }
        .di {
            background: #fff;
            padding: 30pt 14pt 50pt 14pt;
        }
        .btn {
            width: 8rem;
            height: 0.93333rem;
            line-height: 0.93333rem;
            background: #b5935c;
            margin: 0 auto;
            text-align: center;
            border-radius: 0.10667rem;
            font-size: 34px;
            color: #fff;
        }
    }

    .success {
        display: flex;
        justify-content: center;
        -ms-align-items: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        .smBox {
            width: 70%;
            height: auto;
            background-color: #fff;
            border-radius: 10pt;
            padding: 20pt;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: 30pt;
                height: 30pt;
                margin-bottom: 10pt;
            }

            h5 {
                line-height: 23pt;
                height: 23pt;
                font-size: 11pt;
                font-weight: 500;
                color: #333;
            }
            p {
                line-height: 23pt;
                height: 23pt;
                font-size: 8pt;
                font-weight: 300;
                color: #333;
            }
            .lightBtn {
                width: 90%;
                border-radius: 5pt;

                text-align: center;
                color: #C9A063;
                border: 1pt solid #C9A063;
                margin-top: 10pt
            }
        }
    }
</style>
