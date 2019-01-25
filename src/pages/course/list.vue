<!-- 分类课程列表 -->
<template>
    <div>
        <div class="typeTitle">{{$route.query.name}}</div>
        <!--<div class="showSwitch">-->
            <!--<span @click="showList" v-show="isShowSon">分类</span>-->
            <!--<div class="line" v-show="isShowSon"></div>-->
            <!--<span @click="showList_two">行业</span>-->
            <!--<div class="line"></div>-->
            <!--<span class="last" @click="hotFilter(1)">筛选</span>-->
        <!--</div>-->

        <ul class="custom-la" v-show="show">
            <li>
                <dl class="clear">
                    <dt>子分类:</dt>
                    <dd @click="ck2(c)" :class="select2.id == c.id?'selectbq':''" v-for="c in qtype2">{{c.classfyName}}</dd>

                </dl>
            </li>
            <li>
                <p><span class="btn" @click="showListOk">确定</span></p>
            </li>
        </ul>

        <ul class="custom-la" v-show="show_two">
            <li>
                <dl class="clear">
                    <!--<dt>行业:</dt>-->
                    <dd @click="ck1(c)" :class="select1.id == c.id?'selectbq':''" v-for="c in qtype1">{{c.classfyName}}</dd>

                </dl>
            </li>
            <li>
                <p><span class="btn" @click="showList_two_ok">确定</span></p>
            </li>
        </ul>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>

        <!--<selectFrame :typeList=typeList :cateShow=false></selectFrame>-->
        <courseList :courseListData=courseListData></courseList>
        <div @click ="loadMoreitem" v-show="courseListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>

<script>
import courseList from '../../components/courseList'
import selectFrame from '../../components/select'
import pickeritem from '../../components//pickercustom/picker'

export default {
    data() {
        return {
            typeList: '',
          loadshow:true,
            courseListData:[],
            cateShow: false,
          areaShow:false,
          loadshow:true,
          psize:15,
          pnumb:1,
          qtype1: [],
          qtype2: [],
          select1: {},
          select2: {},
          show:false,
          show_two:false,
          itemComponents:[],
          fitem1:[
            {classfyName:'直播',value:0},
            {classfyName:'最新列表',value:1},
            {classfyName:'最热',value:2},
            {classfyName:'推荐',value:3}
          ],
          fitem2:[
            {classfyName:'直播',value:0},
            {classfyName:'最新列表',value:1},
            {classfyName:'最热',value:2},
            {classfyName:'推荐',value:3}
          ],
          vtype:1,
          sonid:'',
          isShowSon:false


        }
    },
    components: {
        selectFrame,
        courseList,
      pickeritem
    },
    computed: {
        //
    },

    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getcourse();

      },
      ck2(obj){
        this.select2 = obj;
      },
      ck1(obj){
        this.select1 = obj;
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
        // if(this.filterContion == 2){
        //   console.log('行业热度：'+JSON.stringify(obj));
        //   this.classid=obj.selectItem.id;
        // }else{
        //   console.log('热度:'+JSON.stringify(obj));
        //
        //   this.guanzhu = obj.selectItem.value;
        // }
        this.vtype = obj.selectItem.value;
        this.courseListData = [];
        this.pnumb = 1;
        this.getcourse();

      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
      showList() {
        this.show = !this.show;

      },
      showListOk() {
        this.show = !this.show;
        this.question_list = [];
        this.pnumb = 1;
        this.sonid = this.select2.id;

        this.getcourse();
      },
      showList_two() {
        this.show_two = !this.show_two;
      },
      showList_two_ok() {
        this.show_two = !this.show_two;
        this.courseListData = [];
        this.pnumb = 1;
        this.classfyid = this.select1.id;
        this.getcourse();

      },
        showCate() {
            this.cateShow = true
        },
      getcourse(){
        this.$http.post('curriculum/curriculumService/list', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize,
            "classfyId": this.sonid,
            "requestType": this.vtype,//0直播，1最新列表，2最热，3推荐
            "industryId":this.classfyid
          }
        }).then(
          res => {

          if(res.data.data.list.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.courseListData.length>0){
          let moreItem = res.data.data.list;
          for(var i in moreItem){
            this.courseListData.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.courseListData = res.data.data.list;
          this.loadshow = true;
        }


      }
      )
      },
      gettype1(){
        //获取分类图标名称
        let that = this;
        this.$http.post('curriculum/curriculumService/type/list', {}).then(
          res => {
          if (res.data.code == 1) {
            let t = res.data.data;
            for(var i in t ){
              if(that.$route.query.id == t[i].id){
                this.qtype2 = t[i].children;
              }
            }

        } else {}
        if(this.qtype2.length == 0){
            this.isShowSon = false;
        }
      })
      },
      getType2() {

        this.$http.get('ask/askService/getQuestionTrade').then(res=>{
          this.qtype1 = res.data.data;
        // this.select1 = this.qtype1[0]
      })

      },
    },

    mounted() {
        // let typeId = this.$route.query.typeId;
        //分类课程列表
      this.sonid = this.$route.query.id;
        this.getcourse();
        this.gettype1();
        this.getType2();


    }
}
</script>
<style lang="scss" scoped>

    .typeTitle {padding:30px 20px; font-size: 30px; text-align: center; font-weight: bold; background: #FFF; border-bottom:1px solid #DDD;}
    .showSwitch {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        -ms-align-items: center;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #ddd;
        margin:0pt 0 0;
        span {
            display: block;
            width: 45%;
            height: 90px;
            line-height: 90px;
            text-align: center;
            text-indent: -5%;
            position: relative;
        }
        span:after {
            content: '';
            z-index: 3;
            width: 32px;
            height: 18px;
            position: absolute;
            top: 34px;
            left: 58%;
            background: url(./imgs/xia.png) no-repeat;
            background-size: 100% 100%;
        }
        .last:after {
            content: '';
            z-index: 3;
            width: 45px;
            height: 45px;
            position: absolute;
            top: 20px;
            left: 60%;
            background: url(./imgs/filter.png) no-repeat;
            background-size: 100% auto;
        }
        /* span:after {
            content: '';
            z-index: 3;
            width: 32px;
            height: 18px;
            position: absolute;
            top: 34px;
            left: 55%;
            background: url() no-repeat;
            background-size: 100% 100%;
        } */
        .line {
            height: 60px;
            width: 1px;
            left: 50%;
            border-left: 2px solid #ddd;
        }
    }
    .custom-la {
        position: fixed;
        z-index:999;
        top: 73pt;
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
        dd.selectbq {
            background: #C9A061; color:#FFF;
        }
        .btn {background:#b5935c; color:#FFF;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;}
    }
</style>
