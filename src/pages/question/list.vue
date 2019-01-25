<template>
    <div id="askchild">       
        <ul class="box3 clear">
            <li class="active ar-l">{{$route.query.catname}}</li>
            <!--<li class="ar-l" @click="hotFilter(1)">热度</li>-->
            <li class="ar-l" @click="hotFilter(2)">筛选</li>
        </ul>

        <questionList :questionList="question_list"></questionList>
        <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>
        <tabbar icon=1></tabbar>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import { Picker } from 'mint-ui'
import { time } from '@/filters/index'
import questionList from '../../components/questionList'
import pickeritem from '../../components//pickercustom/picker'


export default {
    data() {
        return {
            classType: [
                { _name: '名师课', icon: require('./imgs/icon4.png') },
                { _name: '公开课', icon: require('./imgs/icon3.png') },
                { _name: '专家讲堂', icon: require('./imgs/icon2.png') },
                { _name: '专栏课题', icon: require('./imgs/icon1.png') },
                { _name: '系列课程', icon: require('./imgs/icon5.png') }
            ],
          question_list:[],
          psize:15,
          pnumb:1,
          guanzhu:'',
          classid:'',
          fitem1:[
            {classfyName:'按回复',value:1},
            {classfyName:'按热度',value:1}
          ],
          fitem2:[
            {classfyName:'按回复数',value:1},
            {classfyName:'关注数排序',value:1}
          ],
          pickershow:false,
          loadshow:true,
          cats:[],
          filterContion:null,
          itemComponents:[]
        }
    },

    components: {
        tabbar,questionList

    },

    computed: {
        //
    },

    methods: {
      hotFilter(types){
        this.filterContion = types
        if(types == 2){
          this.itemComponents.push({
            component:pickeritem,
            data: this.fitem1,
            isshow:true
          })
        }else{
          this.itemComponents.push({
            component:pickeritem,
            data: this.fitem2,
            isshow:true
          })
        }

      },
      itemOk(obj){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
        if(this.filterContion == 2){
          console.log('行业热度：'+JSON.stringify(obj));
          this.classid=obj.selectItem.id;
        }else{
          console.log('热度:'+JSON.stringify(obj));

          this.guanzhu = obj.selectItem.value;
        }
        this.question_list = [];
        this.pnumb = 1;
        this.getquestionList();

      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
        goToExperts() {
            this.$router.push({ path: 'experts', query: this.$route.query })
        },
        goToCourse() {
            this.$router.push({ path: 'course', query: this.$route.query })
        },
        gotoDetail() {
            this.$router.push({ path: 'question-detail', query: this.$route.query })
        },
        askQuestion() {
            this.$router.push({ path: 'ask-question', query: this.$route.query })
        },
      getquestionList(){
              this.$http.post('ask/askService/getClassfyHot',{
                "subData":{
                  "pageNum":this.pnumb,
                  "pageSize":this.psize,
                  "askClassfy":this.$route.query.catid,
                  "classfy":this.classid,
                  "sortAttention":this.guanzhu
                }
              }).then(res=>{
                if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.question_list.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.question_list.push(moreItem[i])
          }

        }else{
          this.question_list = res.data.data;
        }


              })
      },
      loadMoreitem(){
        this.pnumb++;
        this.getquestionList();
      },
      getType1() {
        this.$http.get('ask/askService/getQuestionTrade').then(res=>{
          this.fitem1 = res.data.data;
        // this.select1 = this.qtype1[0]
      })
      }
    },

    mounted() {
      this.getquestionList();
      this.getType1();
    }
}

</script>
<style lang="scss" scoped>
    .loadMore {text-align: center; background:#EEE; padding:20px;}
#askchild{
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