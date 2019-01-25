<template>
  <div >
  <!--进入选择地区-->
  <!--<div  >-->
<!--<div class="fistArea"><h3>请选择地区</h3>-->
<!--<ul>-->
  <!--<li @click="cityCheck(s)" v-for="s in currcityList">{{s.name}}</li>-->
<!--</ul>-->
<!--</div>-->
  <!--</div>-->



    <div   id="questiont" style="padding-bottom: 0px">

      <div class="showSwitch" style="margin-top:0; z-index: 9999; position: fixed; top:0;left:0;width:100%; border-bottom: 2px solid #EEE;">

        <span @click="filterpop=true;tabcat=0" >{{catcur?catcur:'专家分类'}}</span>

        <span class="last"  @click="filterpop=true;tabcat=1">
          {{city?curc:'全部地区'}}
            <!--<i style="font-style: normal; " v-show="city == ''">所属地区</i>-->
            <!--<i style="font-style: normal;  color:#999;" v-show="city != ''">{{curc}}</i>-->
          </span>

      </div>


      <!--<ul class="custom-la" v-show="show">-->
        <!--<li>-->
          <!--<dl class="clear">-->
            <!--<dt>类型:</dt>-->
            <!--<dd @click="ck2(c)" :class="select2.id == c.id?'selectbq':''" v-for="c in qtype2">{{c.classfyName}}</dd>-->

          <!--</dl>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p><span class="btn" @click="showListOk">确定</span></p>-->
        <!--</li>-->
      <!--</ul>-->

      <!--<ul class="custom-la" v-show="show_two">-->
        <!--<li>-->
          <!--<dl class="clear">-->
            <!--<dt>行业:</dt>-->
            <!--<dd @click="ck1(c)" :class="select1.id == c.id?'selectbq':''" v-for="c in qtype1">{{c.classfyName}}</dd>-->

          <!--</dl>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p><span class="btn" @click="showList_two_ok">确定</span></p>-->
        <!--</li>-->
      <!--</ul>-->

      <!--<ul class="custom-la" style="display: none;" >-->

      <!--</ul>-->

      <ul v-if="question_list.length > 0" class="experts" style="padding-top: 50px;">
        <li class="clear" v-for="item in question_list" @click="goEdetail(item)"  v-show="item.imId" >

            <img :src="item.expert_head" class="ar-l">
            <div class="desc ar-l">
              <div class="clear t1">
                <img class="cardpro" @click="proCard($event,item)"  src="./imgs/cardPro.png">
                <span class="ar-l">{{item.expert_name}} <i v-show="item.property_name" style="font-style: normal; margin-left:10px; color:#c69d62; font-size:12px; font-weight: bold; "  >{{item.property_name}}</i> <i style="font-style: normal; margin-left:10px; color:#999; font-size:12px;">{{item.city_name}}</i></span>

                <span class="ar-m">{{item.industry_name}}</span>


              </div>
              <p style="display:block; font-size:12px; margin:0px 0; color:#999; clear:both;"  >手机号：{{item.expert_mobile}} </p>
              <p style="display:block; font-size:12px; margin:0px 0; color:#999; clear:both;">{{item.expert_company}}</p>
              <p v-html="$options.filters.cut(item.expert_introduction,30)"></p>
              <div v-html="$options.filters.expertTags(item.tags)">
                <span  class="tags">12</span>

              </div>
            </div>


          <div class="clear chatbtns" @click="gozj(item)">
            <img src="./imgs/chatIcon.png"><a>立即咨询</a>
          </div>

        </li>
      </ul>
      <div style="margin-top:100px;" v-else class="no_num">暂无数据</div>
      <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
      <areas :pickerShow="areaShow" @areaok="areaOk" @areacancle="areaCancle"></areas>
      <!--<tabbar active=2 ></tabbar>-->
      <div :is="c.component"  :showcc="cityShow" @cityCheck="cityCheck" v-for="c in comms"></div>

    </div>


    <div class="catflpop" v-show="filterpop">
      <div class="catcontent">

        <ul class="cattabs">
          <li :class="tabcat == 0?'catcur':''" @click="tabcat = 0"><span>服务分类</span></li>
          <li :class="tabcat == 1?'catcur':''" @click="tabcat = 1"><span>地区</span></li>
          <div class="cl"></div>
        </ul>
        <ul class="catlis" v-show="tabcat == 0">


          <li @click="catCheck(s)" v-for="s in quickIcon">{{s.shortcutName}}</li>

        </ul>
        <ul class="catlis" v-show="tabcat == 1">

          <li @click="cityCheck(s)" v-for="s in currcityList">{{s.name}}</li>

        </ul>
      </div>

    </div>




  </div>


</template>
<script>
import tabbar from '../../components/tabbar'
import { time } from '@/filters/index'
import areas from '../../components//area/chsArea'
import citys from '../../components/citys'

export default {
    data() {
        return {
          mycatId:'',
          catcur:'',
          filterpop:false,
          tabcat:0,
          quickIcon:[],
          bannerList:[],
          exportItems:[],
          cityList:[],
          comms:[],
          curc:'',
          citySelect:{},
          areaShow:false,
          loadshow:true,
          cityShow:false,
          psize:15,
          pnumb:1,
          qtype1: [],
          qtype2: [],
          select1: {},
          select2: {},
            show:false,
            show_two:false,
            show_three:false,
            classType: [
                { _name: '名师课', icon: require('./imgs/icon4.png') },
                { _name: '公开课', icon: require('./imgs/icon3.png') },
                { _name: '专家讲堂', icon: require('./imgs/icon2.png') },
                { _name: '专栏课题', icon: require('./imgs/icon1.png') },
                { _name: '系列课程', icon: require('./imgs/icon5.png') }
            ],
          question_list:[],
          classfyid:'',
          intryid:'',
          province:'',
          city:'',
          county:'',
          currcityList:[]

        }
    },

    filters: {
        time
    },

    components: {
        tabbar,areas,citys
        //
    },

    computed: {
        //
    },

    methods: {
      proCard(e,obj){
        this.$router.push({path:'/coursepic',query:{id:obj.id,code:'EXPERT_BUSINESS_CARD'}});
        e.stopPropagation();
        return false;
      },
      gettype(){
        var that = this;
        return new Promise((resolve,reject)=>{
          this.$http.post('goods/goodsService/shortCut/list').then(
            res => {
              this.quickIcon = res.data.data;
              this.quickIcon.unshift({id:'',shortcutName:'全部分类'})
              if(this.mycatId){
                var idx = this.quickIcon.findIndex(function (item) {
                  return that.mycatId == item.id;
                })
                if(idx>=0){
                  that.catcur = this.quickIcon[idx].shortcutName;
                  that.classfyid = this.quickIcon[idx].id;
                  // that.getExperts();
                  resolve();

                }

              }else{
                resolve();
              }
              // var idx = this.quickIcon.findIndex(function (item) {
              //   return that.mycatId == item.id;
              // })
              // if(idx>=0){
              //   that.catcur = this.quickIcon[idx].shortcutName;
              //   that.classfyid = this.quickIcon[idx].id;
              //   // that.getExperts();
              //   resolve();
              //
              // }

            })


        })

      },
      getBanner(){
        this.$http.post('activity/activityService/banner/findList',{subData:3}).then(res=>{

          this.bannerList = res.data.data;


        })
      },
      goToService(){
        this.$router.push({path:'/service'})
      },
      callshe(e,obj){
        location.href="tel:"+obj.expert_mobile;
        e.stopPropagation();
        return false;

      },
      goEdetail(item){
        this.$router.push({path:'/expert-detail',query:{id:item.id,ph:1}});
      },
      getcurCityList(){
        this.$http.post('user/userService/expert/expertAreas').then(res=>{
          this.currcityList =  res.data.data;
          this.currcityList.unshift({code:'',name:'全部地区'})
        })
      },
      resetexpert(){
        this.pnumb = 1;
        this.question_list = [];
        this.province = 999999;
        this.city = '';
        this.getExperts();
      },
      catCheck(obj){
        this.question_list = [];
        this.filterpop = false;
        this.classfyid = obj.id;
        this.catcur = obj.shortcutName;
        this.getExperts();
      },
      cityCheck(obj){
        var ss={
          name:obj.name,
          code:obj.code
        }
        sessionStorage.setItem('city',JSON.stringify(ss));
        this.filterpop = false;
        this.cityShow = false;
        this.pnumb = 1;
        this.question_list = [];
        this.province = '';
        this.city = obj.code;
        this.curc = obj.name;
        this.getExperts();

      },
      filterCity(){
        this.cityShow = true;
        this.comms.push({
          component:citys

        })
      },
      gozj(obj){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
            this.$router.push('/login');
        });
          return false;
        }

        if(this.mineInfo.imId ==obj.imId){
          this.$toast('不能自己和自己聊天')
        }else{
          this.$router.push({path:'/chat',query:{targetAccount:obj.imId}});

        }
      })
      },
      popArea(){
        this.areaShow = true;
      },
      areaOk(obj){
        console.log(JSON.stringify(obj));
        // this.info.area = areaObj.province.name+'>'+areaObj.city.name+'>'+areaObj.county.name;
        // this.selectArea = areaObj
         this.areaShow = false;

        this.question_list = [];
        this.province = obj.province.code;
        this.city = obj.city.code;
        this.county = obj.county.code;
        this.pnumb = 1;
        this.getExperts();
      },
      areaCancle(){
        this.areaShow = false;
      },
        showList() {
            this.show = !this.show;

        },
      showListOk() {
        this.show = !this.show;
        this.question_list = [];
        this.pnumb = 1;
        this.classfyid = this.select2.id;

        this.getExperts();
      },
        showList_two() {
             this.show_two = !this.show_two;

        },
      showList_two_ok() {
        this.show_two = !this.show_two;
        this.question_list = [];
        this.pnumb = 1;

        this.intryid = this.select1.id
        this.getExperts();
      },
        showList_three() {
            this.show_three = !this.show_three
        },
        goToQuestion() {
            this.$router.push({ path: 'question', query: this.$route.query })
        },
        goToExperts() {
            this.$router.push({ path: 'experts', query: this.$route.query })
        },

        gotoDetail() {
            this.$router.push({ path: 'expert-detail', query: this.$route.query })
        },

        goToCourse() {
            this.$router.push({ path: 'course', query: this.$route.query })
        },
        askQuestion() {
            this.$router.push({ path: 'ask-question', query: this.$route.query })
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
      ck2(obj){

        this.select2 = obj;

      },
      ck1(obj){
        this.select1 = obj;

      },
      getExperts(){
        this.$http.post('user/userService/export/list',{
          "subData":{
            "pageNum":this.pnumb,
            "pageSize":this.psize,
            "product_classfy_id":this.classfyid,
            "expert_classfy_id":'',     //专家分类id
            "expert_industry_id":'',     //专家行业id
            "province":this.province,     //专家省份
             "city":this.city,//专家城市
             "country":this.county  //区/县
          }
        }).then(res=>{
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }

          this.loadshow = false;
          return false;
        }else{


            this.loadshow = true;
            if(this.question_list.length>0){
              let moreItem = res.data.data.list;
              for(var i in moreItem){
                this.question_list.push(moreItem[i])
              }

            }else{
              this.question_list = res.data.data.list;
            }

          }



      })
      },
      loadMoreitem(){
        this.pnumb++;
        this.getExperts();
      }

    },

    mounted() {
      // this.qgexperts();
      //   this.getType1();
      //   this.getType2();


      if(this.$route.query.id){
        this.mycatId = this.$route.query.id
      }
      this.getcurCityList();

      if(sessionStorage.getItem('city')){
        var sobj = JSON.parse(sessionStorage.getItem('city'));
        this.city = sobj.code;
        this.curc = sobj.name;

      }
      this.gettype().then(res=>{
        this.getExperts();
      });





      // var shareJson={
      //   type:1,
      //   title:'遇到问题不要慌，财税法权威专家就在您身边',
      //   desc:'大咖专家团在线，一对一为您解决企业经营难题',
      //   link:'/#/areaExperts',
      //   imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      // }
      // var shareJson2={
      //   type:1,
      //   title:'遇到问题不要慌，财税法权威专家就在您身边',
      //   desc:'大咖专家团在线，一对一为您解决企业经营难题',
      //   link:'/#/areaExperts',
      //   imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      // }
      // this.$parent.shareTimePage(shareJson2);
      // this.$parent.shareAppPage(shareJson);
    }
}
</script>
<style lang="scss" scoped>
  .catflpop{
    position: fixed;
    top:0;left:0;
    z-index: 9999;
    background: rgba(0,0,0,.5);
    width:100%;
    height:100%;
    .catcontent{
      position: relative;
      height:100%;
      .catlis{
        overflow:auto;
        position: absolute;
        top:90px;
        left:0;
        width:100%;
        bottom:100px;

        height:93%;
        padding:0 20px;
        padding:20px;
        li{
          padding:15px 0;
          /*border-bottom: 2px dashed #EEE;*/
        }
      }
      width:100%;
      background: #FFF;
      min-height: 300px;
      .cattabs{
        li{
          float:left;width:50%;text-align: center;
          span{
            padding:20px 0;
            display: inline-block;
            font-size:30px;
            color:#666;
          }
        }
        .catcur{
          span{color:#c69d62;}
        }
        border-bottom: 2px solid #EEE;
      }
    }
  }
  .banner_server2{
    height: 200px;
  }
  .box2 {
    margin-bottom: 10pt;
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



  .header {
    width: 750px;
    height: 90x;
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


  .fistArea{
    position: absolute;
    overflow: auto;
    height: 100%;
    background: #FFF;
    width:100%;
    h3{
      text-align: center;
      padding:20px;
      background: #FFF;
      border-bottom: 1px solid #EEE;
    }
    ul{
      li{
        padding:20px; text-align:left;
        border-bottom: 1px solid #EEE;
      }
    }
  }
  #questiont{
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
        &.active {
          color: #C9A063 !important;
          border-bottom: 4px solid #C9A063;
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
  }
    .bqtags{
        background-color:#D9B035;
        display: block;
        float:left;
        color:#FFF;
        padding:2px 7px;
        font-size:12px;
        border-radius: 100px;
        margin-right:10px;


    }
    .loadMore {text-align: center; background:#EEE; padding:20px;}
.showSwitch {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        -ms-align-items: center;
        align-items: center;
        background: #fff;

  border-left: 1px solid #ddd;
        margin:5pt 0 0;
        span {
            display: block;
            width: 45%;
            height: 90px;
            line-height: 90px;
            text-align: center;
            text-indent: -5%;
            position: relative;
        }
        span.act{
          color:#b5935c;font-weight: bold;
        }
        /*span:after {
            content: '';
            z-index: 3;
            width: 32px;
            height: 18px;
            position: absolute;
            top: 34px;
            left: 58%;
            background: url(./imgs/xia.png) no-repeat;
            background-size: 100% 100%;
        }*/
       .last {
         border-left: 1px solid #ddd;
       }
       span:after {
        content: '';
        z-index: 3;
        width: 25px;
        height: 25px;
        position: absolute;
        top: 35px;
        left: 65%;
        background: url(./imgs/xia.png) no-repeat;
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
        top: 76pt;
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

.selectBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #fff;
    border-bottom: 1pt solid #ddd;

    select {
        width: 30%;
        height: 32pt;
    }
    .line {
        height: 28pt;
        margin-top: 2pt;
        border-left: 2px solid #ddd;
        width: 0px;
    }
}

.searchBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    paddding: 3pt;

    .search {
        width: 100%;
        margin: 10pt;
        position: relative;
        border-radius: 4pt;
        input {
            width: 100%;
            height: 30pt;
        }
        img {
            position: absolute;
            top: 5pt;
            left: 5pt;
            width: 20pt;
            height: 20pt;
        }
    }

    .place {
        margin-right: 10pt;
        margin-top: 10pt;
        width: 35pt;
        height: 30pt;
        background-color: #fff;
        border-radius: 4pt;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        img {
            width: 18pt;
            height: 18pt;
        }
    }
}

.experts {
    padding: 4pt 0 42px;

    li {
        padding-top: 28px;
        margin-bottom: 4pt;
        background: #fff;

        img {
            width: 120px;
            height: 120px;
            margin: 0 22px 0 40px;
            border-radius: 60px;
        }
      .cardpro{
        position: absolute;
        right:20px;
        margin-top:10px;
        -webkit-border-radius: 0;
        width:50px;
        height: 40px;
        -moz-border-radius: 0;
        border-radius: 0;}

        .desc {
            width: 520px;

            padding-bottom: 2pt;

            .t1 .ar-l {
                color: #333;
                font-size: 30px;
                line-height: 60px;
            }
            .t1 .ar-m {
                color: #999;
                font-size: 20px;
                line-height: 60px;
                margin-left: 5pt;
            }
            .t1 .ar-r {
                color: #C9A063;
                font-size: 11pt;
                line-height: 60px;
            }

            p {
                color: #333;
                font-size: 28px;
                line-height: 40px;
                margin: 5pt 0;
              b{
                color: #C98500;
              }
            }

            .tags {
                color: #fff;
                font-size: 24px;
                line-height: 26px;
                display: inline-block;
                margin: 0 5pt 5pt 0;
                padding: 8px 16px;
                background-color: #DCBD60;
                border-radius: 19px;
            }


            .mar {
                margin-right: 22px;
            }
        }

        .t2 {
            padding: 8pt 10pt;
            color: #666;
            font-size: 20pt;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;


            span {
              color: #C98500;
              img{
                width:40px;
                height:40px;
                display: inline-block;
                margin:0;
                margin-right:5px;
              }
              a{
                color: #C98500;
                position: relative;
                top:-10px;
              }

            }
        }
      .chatbtns{
        border-top:1px solid #EEE;
        text-align: center;
        padding:20px 0;
        a{color:#C98500;}
        img{
          width:35px;
          height:35px;
          position: relative;
          top:7px;
          margin:0;
          margin-right:5px;
        }
      }

    }
}

.no_num {
    text-align: center;
    color: #999;
    line-height: 120px;
}

















#question {
    background: #f6f6f6;
    padding-bottom: 120px;

    .header {
        width: 750px;
        height: 90x;
        background: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      background: #FFF;

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
        .active {
            color: #C9A063 !important;
            border-bottom: 4px solid #C9A063;
        }
    }
}
</style>
