<template>
    <div>
        <ul class="tab clear">
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">我的提问</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">我的回答
            </li>
        </ul>
        <div class="tabContent">
            <div class="cards" v-show="active == 0">
                <questionList :questionList=question_list></questionList>
            </div>
            <div class="cards" v-show="active == 1">
               <answerquestionList :questionList=question_list></answerquestionList>
            </div>
            <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>
    </div>
</template>
<script>

// import quetionList from '@/components/questionList'
 import questionList from '../../components/questionList'
import answerquestionList from '../../components/answerquestionList'
export default {
     data() {
        return {
            active: 0,
          question_list:[],
            members: [{
                    cardId: '22333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                },
                {
                    cardId: '33333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                }
            ],
            unUsed: [{
                    cardId: '33333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                },
                {
                    cardId: '2d222',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                }

            ],
          pnumb:1,
          psize:15,
          loadshow:true
        }
    },
    components:{
      questionList,answerquestionList
    },
  mounted(){
    this.getmyAsk();
  },
    methods: {
        tab(index) {
            this.active = index;
            this.pnumb = 1;
            this.question_list = []
            this.loadshow = true;
            if(index== 1){
              this.getmyAnswer();
            }else{
              this.getmyAsk()
            }
        },
      loadMoreitem(){

          if(this.active == 1){
            this.pnumb++;
            this.getmyAnswer();
          }else{
            this.pnumb++;
            this.getmyAsk();
          }
      },
      getmyAsk() {
        this.active = 0;
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
      getmyAnswer(){
        this.active = 1;
        this.$http.post('ask/askService/getMyAnswer', {
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
      }
    },

}
</script>
<style lang="scss" scoped>
    .tab {
        background:#FFF;
        border-bottom: 1px solid #EEE;
        .kuan {
            width:50%; float:left;
            text-align: center;
            padding:20px 0;

        }
      .active{
        font-weight: bold;
        border-bottom: 4px solid #b5935c;
      }

    }
</style>
