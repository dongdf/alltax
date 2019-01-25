 <template>

 	<div>
        <div class="typeTitle">{{$route.query.name}}</div>



        <!--<div class="showSwitch">-->
            <!--<span @click="showList" v-show="qtype2">分类</span>-->
            <!--<div class="line" v-show="qtype2"></div>-->
            <!--<span @click="showList_two">行业</span>-->
            <!--<div class="line"></div>-->
            <!--<span class="last" @click="hotFilter(1)">筛选</span>-->
        <!--</div>-->

        <ul class="custom-la" v-show="show">
            <li>
                <dl class="clear">
                    <!--<dt>类型:</dt>-->
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

 		 <!--<ul class="box3 clear">-->

          <!--<li class="ar-l">分类<img src="./imgs/xia.png"></li>-->
		      <!--<li class="ar-l">筛选<img src="./imgs/xia.png"></li>-->
		      <!--<li class="ar-l">排序<img src="./imgs/xia.png"></li>-->
        <!--</ul>-->
 		  <serviceList :question_list="question_list"></serviceList>
        <div @click ="loadMoreitem" v-show="question_list.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
 	</div>

 </template>
 <script>
 	import serviceList from '../../components/serviceList'
    import pickeritem from '../../components//pickercustom/picker'

    export default{
 		data(){
 			return{
              areaShow:false,
              loadshow:true,
              psize:15,
              pnumb:1,
              qtype1: [],
              qtype2: [],
              select1: {},
              select2: {},
              loadshow:true,
              show:false,
              show_two:false,
              itemComponents:[],
              question_list:[],
              serviceData:[{},{},{}],
              fitem1:[
                {classfyName:'访问量',value:'visit'},
                {classfyName:'关注数',value:'attention'},
                {classfyName:'推荐',value:'recommend'}
              ],
              fitem2:[
                {classfyName:'最新',value:1},
                {classfyName:'最热',value:2},
                {classfyName:'推荐',value:3}
              ],
              serId:'',
              retype:1

 			}
 		},
 		components: {
    serviceList,pickeritem
    //
  },
      methods:{
        loadMoreitem(){
          this.pnumb++;
          this.getserviceList();
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
        ck2(obj){
          this.select2 = obj;
        },
        ck1(obj){
          this.select1 = obj;
        },
        itemOk(obj){

          this.itemComponents[0].isshow=false;
          this.itemComponents=[];
          this.pnumb=1;
          this.question_list = [];
          this.retype = obj.selectItem.value;
          this.loadshow = true;
          this.getserviceList();

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
          this.classfyid = this.select2.id;
          this.loadshow = true;
          this.getserviceList();
        },
        showList_two() {
          this.show_two = !this.show_two;

        },
        showList_two_ok(){
          this.show_two = !this.show_two;
          this.question_list = [];
          this.pnumb = 1;
          this.intryid = this.select1.id
          this.loadshow = true;
          this.getserviceList();
        },
        getMaintype(){
          this.$http.post('goods/goodsService/type/list').then(
            res => {
            let t = res.data.data;
            for(var i in t){
              if(t[i].id == this.classfyid){
                this.qtype2 = t[i].children;
              }
            }

        })

        },
        getserviceList(){
          this.active=0;
          // this.listParam.subData.requestType=2;
          this.$http.post('goods/goodsService/product/list', {
            subData:{
              pageSize:this.psize,
              pageNum:this.pnumb,
              requestType:this.retype,//	请求类型	1最新列表，2最热，3推荐,4其他
              classfyId:this.classfyid,
              industryId:this.intryid
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
        getType1() {
          this.$http.get('ask/askService/getQuestionTrade').then(res=>{
            this.qtype1 = res.data.data;
          // this.select1 = this.qtype1[0]
        })
        }
      },
      mounted(){
 		  this.classfyid = this.$route.query.id;
 		  this.getMaintype();
 		  this.getserviceList();
 		  this.getType1();
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
 .box3{
      padding-left:24px;
      border-bottom:2px solid #ddd;
      background:#fff;
      margin-bottom:5pt;
      li{
        width:212px;
        line-height:90px;
        height:90px;
        text-align:center;
        margin-right:33px;
        color:#2F2F2F;
        font-size:30px;
        &:last-child{
          margin-right:0;
        }
        img{
          width: 32px;
          height: 18px;
          margin-left: 6pt;
        }
      }
    }



 </style>


