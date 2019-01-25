<template>
    <div id="askchild">
        <!--<ul class="box3 clear">-->
            <!--<li class="active ar-l">{{$route.query.name}}</li>-->
            <!--<li class="ar-l" @click="hotFilter(1)">排序</li>-->
            <!--<li class="ar-l" @click="hotFilter(2)">排序</li>-->
            <!--<div class="searchIcon">-->
              <!--<msearch :ktype = "'knowledge'" :classid = "$route.query.id"></msearch>-->

            <!--</div>-->
        <!--</ul>-->
       <div class="lawBar">
         <div class="filterBox">

           <div class="pos"><msearch :ktype = "'knowledge'" :classid = "$route.query.id"></msearch></div>
           <!--<input placeholder="请输入搜索关键字" @keyup.enter="enterSearch()" v-model="lawKey"/>-->
         </div>
         <div class="filterIcons"  @click="lawsearch = true">
           <img src="../experts/imgs/filter.png"/>筛选

         </div>
         <div class="cl"></div>
       </div>
<div class="lawitems" >
  <div class="law_condition" v-show="lawSelect1.value || lawSelect2.id">筛选条件：<span v-show="lawSelect1.value">{{lawSelect1.name}}</span> <span  v-show="lawSelect2.id">{{lawSelect2.classfyName}}</span>
  <p class="clearbtn" @click="resetSearch()">重置</p>
  </div>
        <knowledgeList :knowledgeListData="question_list"></knowledgeList></div>
        <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>
        <tabbar :active=1></tabbar>

       <mt-popup v-model="lawsearch"  position="right" class="lawc" :modal="true" >
         <div class="lawc1">
           <h3>筛选条件<span @click="lawsearch = false">
             <img src="../experts/imgs/cancel.png"/>
           </span></h3>
             <div class="lawcc">
             <div class="lawcc2">
               <h4>年度</h4>
               <p>
                 <a @click="lawclick1(s)" v-for="s in lawfilter1"  :class="lawSelect1.value == s.value?'curs':''"><span>{{s.name}}</span></a>

               </p>
             </div>
             <div class="lawcc2">
               <h4>税种</h4>
               <p>
                 <a @click="lawclick2(s)" v-for="s in lawfilter2"  :class="lawSelect2.id == s.id?'curs':''"><span>{{s.classfyName}}</span></a>
                 <!--<a><span>企业所得税</span></a>-->
               </p>
             </div>
               <div class="cl"></div>
             </div>

           <div class="lawccBottom">
             <a class="search" @click="slideBarSearch"><span>筛选</span></a>
             <a @click="resetSearch()"><span >重置</span></a>
           </div>
         </div>

       </mt-popup>

    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import { Picker } from 'mint-ui'
import { time } from '@/filters/index'
import questionList from '../../components/questionList'
import pickeritem from '../../components//pickercustom/picker'
import knowledgeList from '../../components/knowledgeList'
import msearch from '../../components/msearch'
export default {
    data() {
        return {
            classType: [
                // { _name: '名师课', icon: require('./imgs/icon4.png') },
                // { _name: '公开课', icon: require('./imgs/icon3.png') },
                // { _name: '专家讲堂', icon: require('./imgs/icon2.png') },
                // { _name: '专栏课题', icon: require('./imgs/icon1.png') },
                // { _name: '系列课程', icon: require('./imgs/icon5.png') }
            ],
          question_list:[],
          lawsearch:false,
          psize:15,
          pnumb:1,
          guanzhu:'',
          classid:'',
          lawKey:'',
          fitem1:[
            {classfyName:'最新',value:'newst'},
            {classfyName:'推荐',value:'recommend'},
            {classfyName:'访问量',value:'visit'},
            {classfyName:'关注量',value:'attention'}
          ],
          fitem2:[
            {classfyName:'最新',value:'newst'},
            {classfyName:'推荐',value:'recommend'},
            {classfyName:'访问量',value:'visit'},
            {classfyName:'关注量',value:'attention'}
          ],
          pickershow:false,
          loadshow:true,
          lawfilter1:[
            {name:'不限',value:''},
            {name:'2018',value:2018},
            {name:'2017',value:2017},
            {name:'2016',value:2016},
          ],
          lawfilter2:[],
          lawSelect1:{},
          lawSelect2:{},
          cats:[],
          filterContion:null,
          itemComponents:[],
          curtime:new Date().getTime()
        }
    },

    components: {
        tabbar,questionList,knowledgeList,msearch
    },

    computed: {
        //
    },

    methods: {
      reloadComponent(){

      },
      resetSearch(){
        this.$router.replace({path:'/law-list',query:{id:127,name:'法规库',law1:'',law2:'',curtime:this.curtime}});
      },
      enterSearch(){
        this.$router.push({path:'/search',query:{kw:this.lawKey,classid:127}});
      },
      slideBarSearch(){
        this.$router.replace({path:'/law-list',query:{id:127,name:'法规库',law1:JSON.stringify(this.lawSelect1),law2:JSON.stringify(this.lawSelect2),curtime:this.curtime}});
      },
      lawclick1(obj){
        this.lawSelect1 = obj;
      },
      lawclick2(obj){
        this.lawSelect2 = obj;
      },
      getsz(){
        this.$http.get('user/commonService/getClassfyTree?classfyType=13&classfyRootId=').then(res=>{
          this.lawfilter2 = res.data;
          this.lawfilter2.unshift({classfyName:'不限',id:''})
        })
      },
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
          this.guanzhu = obj.selectItem.value;
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
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
              this.$http.post('knowledge/knowledgeService/list',{
                "subData":{
                  "pageNum":this.pnumb,
                  "pageSize":this.psize,
                  "type":this.$route.query.id,
                  "sortRule":this.guanzhu,
                  years:this.lawSelect1.value,
                  szId:this.lawSelect2.id

                }
              }).then(res=>{

                setTimeout(()=>{
                  this.$indicator.close();
                },200);

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
      if(this.$route.query.id == 127){
        this.guanzhu = 'publishTime';
      }
      document.title = this.$route.query.name;
      if(this.$route.query.law1){
        this.lawSelect1 = JSON.parse(this.$route.query.law1)
      }
      if(this.$route.query.law2){
        this.lawSelect2 = JSON.parse(this.$route.query.law2)
      }
      this.getsz();
      this.getquestionList();
      this.getType1();
    }
}

</script>
<style lang="scss" scoped>
  .pos{
    position: relative;
    margin-top:-20px;
    .allSearch{
      margin-bottom: 0;
    }
  }
  .law_condition{
    background: #FFF;padding:20px;
    border-bottom: 2px solid #EEE;
    padding:40px 20px 10px 20px;

    margin-bottom: 20px;
    span{
      display: inline-block;
      margin-bottom:20px;
      -webkit-border-radius: 5px;
      border:2px solid #EEE;
      height:50px;
      line-height: 50px;
      margin-right:10px;
      padding:0 15px;
      white-space: nowrap;
      -moz-border-radius: 5px;
      border-radius: 5px;
      color:#999;
    }
    .clearbtn {
      text-align: center;
      color: #a38a64;
      border-top:2px solid #EEE;
      padding-top:15px;

    }
  }
  .lawitems{
    padding-top:110px;
  }
  .lawBar{
    position: fixed;
    top:0;
    left:0;
    width:100%;


    padding:20px 10px;
    background: #FFF;

    .filterBox{
      background: #F8F8F8;
      float:left;
      width:620px;
      overflow: hidden;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      input{
        background: none;
        border:none;
        padding:20px;
      }
    }
    .filterIcons{
      margin-left:10px;
      width:100px;
      height:60px;
      text-align: center;

      font-size:20px;
      float: left;
      color:#999;
      img{
        display: block;
        margin:0 auto;
        opacity: .6;


        width:35px;
        height:35px;
      }
    }
  }
  .lawc{

    width:80%;
    position: fixed;
    height:100%;
   bottom:0;
    right:auto;
    left:20%;
    .lawc1{
      position: relative;
      height:100%;
      h3{
        height:80px;
        line-height: 80px;
        border-bottom: 2px solid #DDD;
        position: relative;
        text-align: center;
        span{
          position: absolute;
          left:10px;
          top:15px;
          font-weight: normal;
          img{width:50px; }
          color:#999;
        }
      }
      .lawcc{
        position: absolute;
        width:100%;

        top:80px;
        bottom:100px;
        left:0;

        overflow: auto;
        .lawcc2{
          padding:20px;
          h4{
            clear:both;
          }
          p{
            padding:25px 0;
            a{ display: block;float: left;
              margin-right:15px;
              margin-bottom: 15px;
              span{
                border:2px solid #DDD;
                white-space: nowrap;
                height: 50px;
                line-height: 50px;
                padding:0 15px;
                display: inline-block;

                border-radius: 5px;
              }
            }
            a.curs{ display: block;float: left;
              margin-right:15px;
              margin-bottom: 15px;
              span{
                border:2px solid #b5935c;
                white-space: nowrap;

                background: #b5935c;
                color:#FFF;
                height: 50px;
                line-height: 50px;
                padding:0 15px;
                display: inline-block;

                border-radius: 5px;
              }
            }
          }
        }
      }
      .lawccBottom{
        position: absolute;
        bottom:0px;
        left:0;
        right:0;
        padding:0 10px;

        height:100px;
        background: #F8F8F8;

        border-top: 2px solid #eee;
        a{
          display: block;
          float:left;
          padding-top:15px;
          width:50%;
          text-align: center;
          span{
            display: block;
            margin:0 10px;
            padding:10px 0;

            border:2px solid #DDD;
            border-radius: 5px;

          }
        }
        a.search {
          display: block;
          float:left;
          padding-top:15px;
          width:50%;
          text-align: center;
          span{
            display: block;
            margin:0 10px;
            padding:10px 0;
            background: #b5935c;
            border:2px solid #b5935c;
            color:#FFF;
            border-radius: 5px;

          }
        }
      }



    }


  }
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
        position:relative;
        .searchIcon{
          position:  absolute;
          width:120px;
          height:60px;
          background:red;
          right:30px;
          top:-7px;
        }
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
