<template>
    <div>
        <div class="ptitle" @click="hotFilter">{{fitem2Select.classfyName}}<span><img src="./img/down.png"> </span></div>
    <div id="order">

        <div class="haveorder" >
            <!--<br><br><br><br><br><br><br><br><br><br>-->
            <!--<button @click="pjorder({})">sfsdfsdf</button>-->

            <ul  v-if="active == 1">
                <li v-for="s in courseListData" >
                    <div class="one">
                        <span>{{s.createTime | timeNumb('yyyy-MM-dd hh:mm')}}</span>
                        <span class="right">合计￥{{s.orderPrice}}</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two" @click="goCourse(s)">
                        <div class="sgoods">
                            <img :src="s.purl">
                        </div>
                        <div class="content">
                            <span>{{s.ptitle}}</span>
                            <span class="price">￥{{s.pprice}}</span>
                        </div>
                        <div class="clear"></div>
                        <!--<div class="jieguo">-->
                            <!--<img src="./img/yijiesuan.png">-->
                        <!--</div>-->
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>购买人:{{s.userName}}</span>
                        <span class="right">手机号:{{s.userMobile}}</span>
                    </div>
                    <div class="three">
                        <span>订单号:{{s.orderNo}}</span>

                    </div>
                    <div class="pjbtns" >
                        <span v-show="!s.criticism"  @click="pjorder(s,1)">评价</span>
                        <span v-show="s.criticism" style="border:none;">已评价</span>
                    </div>
                </li>
            </ul>

            <ul v-if="active == 2">
                <li v-for="s in courseListData" >
                    <div class="one">
                        <span>{{s.createTime | timeNumb('yyyy-MM-dd hh:mm')}}</span>
                        <span class="right">合计￥{{s.orderPrice}}</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two">
                        <div class="sgoods">
                            <img :src="s.purl">
                        </div>
                        <div class="content">
                            <span>{{s.ptitle}}</span>
                            <span class="price">￥{{s.orderPrice}}</span>
                        </div>
                        <div class="clear"></div>
                        <!--<div class="jieguo">-->
                        <!--<img src="./img/yijiesuan.png">-->
                        <!--</div>-->
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>购买人:{{s.userName}}</span>
                        <span class="right">手机号:{{s.userMobile}}</span>
                    </div>
                    <div class="three">
                        <span>订单号:{{s.orderNo}}</span>

                    </div>
                    <div class="pjbtns">

                        <span v-show="!s.criticism"  @click="pjorder(s,2)">评价</span>
                        <span v-show="s.criticism" style="border:none;">已评价</span>
                    </div>
                </li>



            </ul>

<!--问答订单-->

          <ul v-if="active == 3">
            <li v-for="s in courseListData"  @click="goQes(s)">
              <div class="one">
                <span>{{s.createTime | timeNumb('yyyy-MM-dd hh:mm')}}</span>
                <span class="right">合计￥{{s.orderPrice}}</span>
              </div>
              <div class="sxian">
                <img src="./img/xian.png">
              </div>
              <div class="two">
                <!--<div class="sgoods">-->
                  <!--<img :src="s.purl">-->
                <!--</div>-->
                <div class="content">
                  <span v-html="s.content"> </span>
                  <span class="price">￥{{s.orderPrice}}</span>
                </div>
                <div class="clear"></div>
                <!--<div class="jieguo">-->
                <!--<img src="./img/yijiesuan.png">-->
                <!--</div>-->
              </div>
              <div class="sxian">
                <img src="./img/xian.png">
              </div>
              <div class="three">
                <span>购买人:{{s.userName}}</span>
                <span class="right">手机号:{{s.userMobile}}</span>
              </div>
              <div class="three">
                <span>订单号:{{s.orderNo}}</span>

              </div>
              <!--<div class="pjbtns">-->

                <!--<span v-show="!s.criticism"  @click="pjorder(s,2)">评价</span>-->
                <!--<span v-show="s.criticism" style="border:none;">已评价</span>-->
              <!--</div>-->
            </li>



          </ul>
          <!--问答订单-->

          <!--购卡订单-->

          <ul v-if="active == 4">
            <li v-for="s in courseListData"  >
              <div class="one">
                <span>{{s.createTime | timeNumb('yyyy-MM-dd hh:mm')}}</span>
                <span class="right">合计￥{{s.price}}</span>
              </div>
              <div class="sxian">
                <img src="./img/xian.png">
              </div>
              <div class="two">
                <!--<div class="sgoods">-->
                <!--<img :src="s.purl">-->
                <!--</div>-->
                <div class="content">
                  <span v-html="s.durationName"> </span>
                  <span class="price">￥{{s.price}}</span>
                </div>
                <div class="clear"></div>
                <!--<div class="jieguo">-->
                <!--<img src="./img/yijiesuan.png">-->
                <!--</div>-->
              </div>
              <div class="sxian">
                <img src="./img/xian.png">
              </div>
              <div class="three">
                <!--<span>购买人:{{s.userName}}</span>-->
                <!--<span class="right">手机号:{{s.userMobile}}</span>-->
              </div>
              <div class="three">
                <span>订单号:{{s.orderNo}}</span>

              </div>
              <!--<div class="pjbtns">-->

              <!--<span v-show="!s.criticism"  @click="pjorder(s,2)">评价</span>-->
              <!--<span v-show="s.criticism" style="border:none;">已评价</span>-->
              <!--</div>-->
            </li>



          </ul>
          <!--购卡订单-->




        </div>
         <!--<div class="noorder" v-else>-->
            <!--<img class="noorder1" src="./img/noorder.png">-->
            <!--<img class="noorder2" src="./img/noorder1.png">-->
        <!--</div>-->
    </div>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" @updatecomm="updatecommparent" :ptype="item.type" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>
        <noresult v-show="courseListData.length == 0" :tipText="'没有记录'" ></noresult>
        <div @click ="loadMoreitem" v-show="courseListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import pickeritem from '../../components//pickercustom/picker'
import sendComm from '../../components/submitStar'
import noresult from '../../components/noresult'
export default {
    data() {
        return {
          itemComponents:[],
            value: '请输入用户民',
            order: [1, 1, 1],
            fitem2:[{classfyName:'课程订单',value:1},{classfyName:'咨询订单',value:2},{classfyName:'问答订单',value:3},{classfyName:'购卡订单',value:4}],
            fitem2Select:{classfyName:'课程订单',value:1},
          courseListData:[],
          pnumb:1,
          psize:15,
          sonid:'',
          active:1,
          vtype:'',
          industryId:'',
          loadshow:true,

        }
    },
    components: {
        tabbar,pickeritem,noresult
        //
    },
    methods: {
      goQes(obj){
        this.$router.push({path:'/question-detail',query:{questionId:obj.qid}});
      },
      goCourse(obj){
        this.$router.push({path:'/course-detail',query:{id:obj.pid}});
      },
      updatecommparent(idx){
        this.itemComponents = [];

        for(var i in this.courseListData){
          if(this.courseListData[i].id == idx){
            this.courseListData[i].criticism = true;
          }
        }

      },
      pjorder(obj,types){
        this.itemComponents = [];
        this.itemComponents.push({
          component:sendComm,
          data:{rel:obj,type:types},//课程订单  2  专家订单
          isshow:true
        })
      },
      hotFilter(){
          this.itemComponents.push({
            component:pickeritem,
            data: this.fitem2,
            isshow:true
          })
      },
      itemOk(obj){
        console.log(JSON.stringify(obj));
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
        this.fitem2Select = obj.selectItem;
        this.pnumb = 1;
        this.courseListData = [];
        this.loadshow = true;
        if(obj.selectItem.value == 1){
          this.active = 1;
          this.getcourse()
        }else if(obj.selectItem.value == 2){
          this.active = 2;
          this.getexpert()
        }else if(obj.selectItem.value == 4){
          this.active = 4;
          this.getCardorder();
        }else{
          this.active = 3;
          this.getquestion();
        }

      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
      showp(){

      },
      goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
      },
      loadMoreitem(){
        this.pnumb++;
        if(this.fitem2Select.value == 1){

          this.getcourse()
        }else if(this.fitem2Select.value == 2){

          this.getexpert()
        }else if(this.fitem2Select.value == 4){
          this.getCardorder();
        }else{
          this.getquestion();
        }

      },
      getCardorder(){//购卡订单
        this.$http.post('order/orderService/getMyFictitiousOrder', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res =>{

          if(res.data.data.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
            this.loadshow = false;
            return false;
          }
          if(this.courseListData.length>0){
            let moreItem = res.data.data;
            for(var i in moreItem){
              this.courseListData.push(moreItem[i])
            }
            this.loadshow = true;

          }else{
            this.courseListData = res.data.data;
            this.loadshow = true;
          }


        })
      },
      getquestion(){//问答订单
        this.$http.post('order/orderService/getMyAskSilkBagOrder', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res =>{

          if(res.data.data.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
            this.loadshow = false;
            return false;
          }
          if(this.courseListData.length>0){
            let moreItem = res.data.data;
            for(var i in moreItem){
              this.courseListData.push(moreItem[i])
            }
            this.loadshow = true;

          }else{
            this.courseListData = res.data.data;
            this.loadshow = true;
          }


        })
      },
      getexpert(){//专家订单
            this.$http.post('order/orderService/getMyExpertOrder', {
              "subData": {
                "pageNum":this.pnumb,
                "pageSize": this.psize

              }
            }).then(res =>{

              if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
              this.loadshow = false;
              return false;
            }
            if(this.courseListData.length>0){
              let moreItem = res.data.data;
              for(var i in moreItem){
                this.courseListData.push(moreItem[i])
              }
              this.loadshow = true;

            }else{
              this.courseListData = res.data.data;
              this.loadshow = true;
            }


          })

      },
      getcourse(){//课程订单
        this.$http.post('order/orderService/getMyCurriculumOrder', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }

          this.loadshow = false;
          return false;
        }
        if(this.courseListData.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.courseListData.push(moreItem[i])
          }
          this.loadshow = true;
        }else{
          this.courseListData = res.data.data;
          this.loadshow = true;
        }
      })

      },


    },
    mounted(){
      this.getcourse();
    }
}
</script>
<style lang="scss">

    .ptitle {padding:20px;
        position: fixed; width:100%; border-bottom:1px solid #DDD; background:#FFF;font-size:30px; font-weight: bold;  text-align: center;
    span{
        width:35px;
        img{width:35px;
            position: relative;
            top:8px;
            left:8px;
        }
    }
    }
#order {

    padding: 10pt 0 0;


    .hide {
        display: none !important;
    }

    .noorder {

        height: 100%;
        padding-top: 20%;
        background-color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .noorder1 {
            padding-top: 10pt;
            width: 150pt;
        }
        .noorder2 {
            padding-top: 10%;
            width: 50pt;
        }
    }

    .haveorder {
        .pjbtns {
            display: block;
            clear: both;
            padding:20px;
            position: absolute;
            right:20px;
            top:40%;
            height:40px;
            text-align:right;

            span{
                border:2px solid #a38a64;
                color:#b5935c;
                -webkit-border-radius: 5px;
                font-size:25px;
                padding:5px 20px;
                -moz-border-radius: 5px;
                border-radius: 5px;

            }
        }
        ul{
            padding-top:80px;
            .sxian {
                width: 100%;
                text-align: center;
                img {
                    width: 95%;
                }
            }

            li {
                position: relative;
            	padding:0 6pt;
                background-color: #fff;
                margin-bottom: 10pt;
                .one {
                    padding-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    .right {
                        float: right;
                    }
                }
                .sxian {
                    width: 100%;
                    text-align: center;
                    img {
                        width: 95%;
                    }
                }
                .two {
                    margin-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    display: flex;
                    img {
                        width: 100%;
                    }
                    .price {
                        color: #FFAA40;
                        padding-top: 20%;
                    }
                    .content {
                        display: flex;
                        flex-direction: column;
                        padding-left: 6pt;
                        padding-top: 3pt;
                        width: 40%;
                    }
                    .jieguo {
                        width: 20%;
                        img {
                            width: 80%
                        }
                    }
                    .sgoods {
                        width: 35%;
                    }
                }
                .three {
                    margin-left: 5pt;
                    margin-right: 5pt;
                    padding-bottom: 5pt;
                    .right {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
