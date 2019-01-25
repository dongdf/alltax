<template>
    <div id="question">
      <!--<div class="quickBar">-->
        <!--<ul>-->
          <!--&lt;!&ndash;<li class="">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="q_item " @click="askQuestion"><img src="./imgs/quick1.png"/><h3>快速提问</h3><p style="color:">公开提问，全员回答</p></div></li>&ndash;&gt;-->
          <!--<li><div class="q_item" @click="goToExperts"><img src="./imgs/quick2.png"/><h3>分类专家</h3><p style="color:">权威专家  一对一</p></div></li>-->
          <!--&lt;!&ndash;<li><div class="q_item" @click="goToAreaExperts"><img src="./imgs/quick3.png"/><h3>区域专家</h3><p style="color:#FF675D">您身边的财税专家</p></div></li>&ndash;&gt;-->
          <!--<li class="">-->
            <!--<div class="q_item" @click="goTax()"><img src="./imgs/quick4.png"/><h3>个税专区</h3><p style="color:">知识、课程、问答</p></div></li>-->
          <!--<div class="cl"></div>-->
          <!--<div class="q_ask"  @click="askQuestion">快速提问</div>-->
        <!--</ul>-->

      <!--</div>-->

      <div class="newqBar" v-show="topList.length>0">
        <ul>
          <li @click="goexpert(p)" v-for="p in topList">
            <div class="qmp">
              <div class="qmpImg"><img :src="p.expert_head"></div>
              <h3>{{p.expert_name}}</h3>
              <p v-show="p.property_name"><span>{{p.property_name}}</span></p>
            </div>
          </li>

          <div class="cl"></div>
          <div class="q_ask"  @click="askQuestion">快速提问</div>
        </ul>
      </div>

        <div class="wrapper" ref="wrapper">
          <div class="noanswerbg_c" v-if="noCount>0">
            <div class="noanswerbg" @click="gonoanswer()">当前有<b>{{noCount}}</b>个问题待回答，回答问题赢取奖金>></div>
          </div>


            <!--<ul class="header clear">-->
                <!--<li class="active ar-l">问答</li>-->
                <!--<li class="ar-l" @click="goToExperts">找专家</li>-->
                <!--<li class="ar-r"><img src="./imgs/icon6.png"></li>-->
            <!--</ul>-->

            <!--<div class="box1">-->
                <!--<div @click="askQuestion">我要提问</div>-->
            <!--</div>-->

            <!--<ul class="box2 clear">-->
                <!--<li v-for="item in qtype2" class="ar-l" >-->
                    <!--<router-link :to="{path:'/question-list',query:{catid:item.id,catname:item.classfy_name}}">-->
                    <!--<img :src="item.classfy_icon">-->
                    <!--<div>{{item.classfy_name}}</div>-->
                <!--</router-link>-->
                <!--</li>-->
            <!--</ul>-->

            <ul class="box3 clear">
                <li class="ar-l" :class="{active:active==0}" @click="changTab(0)">热门</li>
                <li class="ar-l" :class="{active:active==1}" @click="changTab(1)">最新</li>
                <li class="ar-l" :class="{active:active==2}" @click="changTab(2)">我的</li>
            </ul>
          <!--<ul  v-infinite-scroll="loadMoreitem"-->
               <!--infinite-scroll-disabled="isall"-->
               <!--infinite-scroll-distance="0">-->
            <questionList :questionList=question_list ></questionList>
          <!--</ul>-->
          <!--<div class="loading-bar">-->

            <!--<span v-show="!isall">加载中...</span>-->
            <!--<span v-show="isall">没有了</span>-->
          <!--</div>-->
            <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>
        <tabbar active=4></tabbar>
    </div>
</template>
<script>

import BScroll from 'better-scroll'
import tabbar from '../../components/tabbar'
import questionList from '../../components/questionList'

export default {
    data() {

        return {
            active: 1,
            questionList:{},
          isall:false,
          loadshow:true,
          qtype2:[],
            classType: [
                { _name: '名师课', icon: require('./imgs/icon4.png') },
                { _name: '公开课', icon: require('./imgs/icon3.png') },
                { _name: '专家讲堂', icon: require('./imgs/icon2.png') },
                { _name: '专栏课题', icon: require('./imgs/icon1.png') },
                { _name: '系列课程', icon: require('./imgs/icon5.png') }
            ],
            question_list: [],
          psize:10,
          pnumb:1,
          topList:[],
          noCount:0
        }
    },

    filters: {

    },

    components: {
        tabbar,
        questionList
        //
    },

    computed: {



        //
    },

    methods: {
      goexpert(obj){
        this.$router.push({path:'expert-detail',query:{id:obj.id}})
      },
      getTop(){


          this.$http.post('user/userService/export/list',{
            "subData":{
              "pageNum":1,
              "pageSize":3,
              "expert_classfy_id":'',     //专家分类id
              "expert_industry_id":'',     //专家行业id
              "province":999999,     //专家省份
              "city":'',//专家城市
              "country":''  //区/县
            }
          }).then(res=>{
              this.topList = res.data.data.list;
          })

      },
      goTax(){
        this.$router.push({path:"/ptax"});
      },
      gonoanswer(){
        this.$router.push({path:"/noanswer"});
      },
      getnoanswer(){
        this.$http.get('ask/askService/findNoAnswerCount').then(res=>{
          this.noCount = res.data.data;
        })

      },
        goToExperts() {
            this.$router.push({ path: 'experts', query: this.$route.query })
        },
      goToAreaExperts(){
        this.$router.push({ path: 'areaExperts', query: this.$route.query })
      },
        goToList() {
            this.$router.push({ path: 'question-list', query: this.$route.query })
        },
        gotoDetail() {
            this.$router.push({ path: '', query: this.$route.query })
        },
        askQuestion() {
            this.$router.push({ path: 'ask-question', query: this.$route.query })
        },
      getType2() {
            this.$http.get('ask/askService/getQuestionClassfy').then(res=>{
              this.qtype2 = res.data.data;
          })
      },

        getNewest() {
          this.active = 1;
          this.$http.post('ask/askService/getNewest', {
            "subData":{
              "pageNum":this.pnumb,
              "pageSize":this.psize
            }
          }).then(res => {
            if(res.data.data.list.length == 0){
              if(this.pnumb>1){
                this.$toast('没有了');
              }
              this.isall = true;
                this.loadshow = false;
              return false;
          }
            if(this.question_list.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.question_list.push(moreItem[i])
            }

          }else{
            this.question_list = res.data.data.list;
          }
        })
        },
        getRec() {
            this.active = 2;
            this.$http.post('ask/askService/getMyQuiz', {
              "subData":{
                "pageNum":this.pnumb,
                "pageSize":this.psize
              }

            }).then(res => {
              if(res.data.data.list.length == 0){

            if(this.pnumb>1){
              this.$toast('没有了');

            }
            this.loadshow = false;
            this.isall = true;
            return false;
          }
              if(this.question_list.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.question_list.push(moreItem[i])
            }

          }else{
            this.question_list = res.data.data.list;
          }
                })
        },
        getHot() {
            this.active = 0;
            this.$http.post('ask/askService/getHotList', {
              "subData":{
                "pageNum":this.pnumb,
                "pageSize":this.psize
              }

            }).then(
                res => {
              if(res.data.data.list.length == 0){

            if(this.pnumb>1){
              this.$toast('没有了');
            }
                this.isall = true;
            this.loadshow = false;
            return false;
          }
                  if(this.question_list.length>0){
                    let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.question_list.push(moreItem[i])
            }

          }else{
            this.question_list = res.data.data.list;
          }

                })
        },
      changTab(type){
        this.pnumb = 1;
        this.active = type;
        this.isall = false;
        this.question_list = [];
        this.loadshow = true;
        if(this.active == 0){
          this.getHot();
        }
        if(this.active == 2){
          this.getRec();
        }
        if(this.active == 1){
          this.getNewest();
        }

      },
      loadMoreitem(){
          // console.log(this.$route.name);
          if(this.$route.name == 'Question'){
            // setTimeout(()=>{
              this.isall = true;

              this.pnumb++;
              if(this.active == 0){
                this.getHot();
              }
              if(this.active == 2){
                this.getRec();
              }
              if(this.active == 1){
                this.getNewest();
              }

            // },1000)
          }



      }
    },
    mounted() {
      this.getTop();
      this.getnoanswer();
      this.getType2();
        //热门问答
      if(this.active ==0 ){
        this.getHot();
      }

      if(this.active ==1 ){
        this.getNewest();
      }
      if(this.active ==2 ){
        this.getRec();
      }

    }
}
</script>
<style lang="scss" scoped>
  .newqBar{
    ul{
      padding:20px 10px;
      padding-top:60px;
      li{
        width:33.33333%;
        float: left;

        .qmp{
          position: relative;
          padding-bottom: 20px;
          height:160px;

          .qmpImg{
            position: absolute;
            width:100px;
            height: 100px;
            border-radius: 1000px;
            /*background: #c69d62;*/
            margin:0 auto;
             left:50%;
            margin-left:-50px;
            top:-50px;
            overflow: hidden;
            img{width:100%;height:100%;}
          }
          h3{
            padding-top:60px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
          }
          text-align: center;

          border-radius: 10px;
          background: #FFF;
          margin:10px;

          p{


            white-space: nowrap;
            overflow: hidden;

            text-overflow: ellipsis;

              background: #c69d62;
              color:#FFF;

              border-radius: 1000px;
            span{
              font-size:20px;
            }

              padding:0px 8px 3px 8px;
            margin:0 30px;



          }

        }
      }
    }
  }
  .q_ask{
    background: #BD8E4B;
    color:#FFF;
    padding:20px 0;
    border-radius: 10px;
    text-align: center;

    font-weight: bold;
    margin: 20px 20px;
  }
  .noanswerbg_c{
    padding-top:20px;
    background: #FFF;
    .noanswerbg{
      color:#ff4949;
      text-decoration: underline;
      background: #fdeec9;
      padding: 15px;
      width:90%;
      border-radius: 100px;
      margin:0 auto;
      text-align: center;
    }
  }

    .loadMore {text-align: center; background:#EEE; padding:20px;}
#question {
  .cl{
    display: block;
    clear: both;
  }
  .quickBar{
    background:#FFF;
    margin-bottom: 15px;
    padding:10px 0;
    ul{
      padding:10px;
      li{

        float:left;
        width:50%;


        .q_item{
          background: #FFF;

          margin:10px;
          padding:10px 0;

          box-shadow: 0 2px 5px #dcdcdc;
          border:2px solid #EEE;
          border-radius: 10px;
          text-align: center;
          img{

            position: relative;

          width:50px;}
          p{
            font-size:16px;
            padding:0 10px;

            color:#999;
          }
          h3{
            font-size:30px;
            font-weight: normal;
            color:#313131;

          }


        }

        .one{
          height:150px;
          padding-top:40px;
          margin-top:60px;
        }
      }
    }
  }
    background: #f6f6f6;
    padding-bottom: 120px;

    .header {
        width: 750px;
        height: 90x;
        background: #fff;
        padding-left: 80px;
        li {
            height: 90px;
            line-height: 90px;
            font-size: 34px;
            color: #999;
            text-align: center;

            &.ar-l {
                width: 212px;
            }
            &.ar-l:first-child {
                margin-right: 70px;
            }
            &.ar-r {
                width: 110px;
                border-left: 1px solid #eee;
                img {
                    width: 40px;
                    margin-top: 24px;
                }
            }
        }
    }
    .box1 {
        height: 138px;
        padding-top: 34px;
        div {
            width: 600px;
            height: 70px;
            line-height: 70px;
            background: rgba(181, 147, 92, 1);
            font-size: 34px;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            border-radius: 8px;
        }
    }
    .box2 {
        margin-bottom: 10px;
        padding: 32px 0 24px 48px;
        background: #fff;
        li {
            text-align: center;
            margin-right: 30px;
            &:last-child {
                margin-right: 0;
            }
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
        }
        div {
            color: #2F2F2F;
            font-size: 28px;
            margin-top: 10px;
        }
    }
    .box3 {
        padding-left: 24px;
        border-bottom: 2px solid #ddd;
        background: #fff;
        li {
            width: 212px;
            line-height: 90px;
            height: 90px;
            text-align: center;
            margin-right: 33px;
            color: #2F2F2F;
            font-size: 30px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .active {
        color: #C9A063 !important;
        border-bottom: 4px solid #C9A063;
    }
    .box4 {
        background: #fff;
        padding: 34px 0 42px;
        li {
            padding-top: 28px;
            img {
                width: 60px;
                height: 60px;
                margin: 0 22px 0 40px;
                border-radius: 60px;
            }
            .desc {
                width: 590px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 16px;
                .t1 .ar-l {
                    color: #333;
                    font-size: 30px;
                    line-height: 60px;
                }
                .t1 .ar-r {
                    color: #999;
                    font-size: 24px;
                    line-height: 60px;
                }
                p {
                    color: #333;
                    font-size: 28px;
                    line-height: 40px;
                    margin: 24px 0 38px;
                }
                .t2 span {
                    color: #666;
                    font-size: 24px;
                }
                .mar {
                    margin-right: 22px;

                }
            }
        }
    }
    .no_num {
        text-align: center;
        color: #999;
        line-height: 120px;
    }
}
</style>
