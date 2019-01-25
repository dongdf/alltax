<template>
    <div id="question">
      <!--<div class="quickBar">-->
        <!--<ul>-->
          <!--&lt;!&ndash;<li class="">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="q_item " @click="askQuestion"><img src="./imgs/quick1.png"/><h3>快速提问</h3><p style="color:">公开提问，全员回答</p></div></li>&ndash;&gt;-->
          <!--<li><div class="q_item" @click="goToExperts"><img src="./imgs/quick2.png"/><h3>专家团</h3><p style="color:">权威专家  一对一</p></div></li>-->
          <!--<li><div class="q_item" @click="goToAreaExperts"><img src="./imgs/quick3.png"/><h3>区域专家</h3><p style="color:#FF675D">您身边的财税专家</p></div></li>-->
          <!--<li class="">-->
            <!--<div class="q_item" @click="askQuestion"><img src="./imgs/quick1.png"/><h3>快速提问</h3><p style="color:">公开提问 全员回答</p></div></li>-->
          <!--<div class="cl"></div>-->
        <!--</ul>-->

      <!--</div>-->


        <div class="wrapper" ref="wrapper">
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

            <!--<ul class="box3 clear">-->
              <!--待回答问题-->
                <!--&lt;!&ndash;<li  :class="{active:active==0}" @click="changTab(0)">热门</li>&ndash;&gt;-->
                <!--&lt;!&ndash;<li class="ar-l" :class="{active:active==1}" @click="changTab(1)">最新</li>&ndash;&gt;-->
                <!--&lt;!&ndash;<li class="ar-l" :class="{active:active==2}" @click="changTab(2)">我的</li>&ndash;&gt;-->
            <!--</ul>-->
          <div class="whdtitle">待回答问题</div>
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
          pnumb:1
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
          this.$http.post('ask/askService/findNoAnswerList', {
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
          if(this.$route.name == 'noanswer'){
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
  .whdtitle{
    border-bottom:2px solid #EEE;
    padding:20px;
    background: #FFF;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
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
        width:33.33333%;


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
