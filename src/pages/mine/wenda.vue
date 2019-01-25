<template>
    <div>
        <div class="shtab">
          <ul>
            <li :class="actives == 1?'act':''" @click="getwd(1)">待审核({{dshNumb}})</li>
            <li :class="actives == 2?'act':''" @click="getwd(2)">我的审核({{wdshNumb}})</li>
          </ul>
        </div>
        <ul class="messageList" v-show="actives == 1">
            <li v-for="(item,idx) in messageList" >
                <p>
                    <img class="tx" :src="item.headimgUrl"/><span class="nickn">{{item.nickName}}</span><span class="qtime">{{item.createdAt |timeNumb('yyyy-MM-dd hh:mm')}}</span>
                </p>
                <p class="nr" v-html="item.questionContent">


                </p>
              <div class="viewimgs" v-show="item.questionPic"><img @click="viewPic(item.questionPic)" :src="item.questionPic"/></div>
                <div v-show="item.state<=0" class="queaction">
                  <a class="btns a1" @click="changeQueState(item,1,idx,0)">通过</a>
                  <a class="btns a1" @click="changeQueState(item,1,idx,3)">通过(归类为个税)</a>
                  <a class="btns a2" @click="changeQueState(item,3,idx,0)">不通过</a>
                  <a  class="btns a3" @click="deleQue(item,2,idx)">删除</a>
                  <div class="clear"></div>
                </div>
            </li>
        </ul>


      <ul class="messageList" v-show="actives == 2">
        <li   v-for="item in messageList">
          <p>
            <img class="tx" :src="item.headimgUrl"/><span class="nickn">{{item.nickName}}</span><span class="qtime">{{item.createdAt |timeNumb('yyyy-MM-dd hh:mm')}}</span>
          </p>
          <p class="nr" v-html="item.questionContent">

          </p>
          <div class="viewimgs" v-show="item.questionPic" ><img @click="viewPic(item.questionPic)" :src="item.questionPic"/></div>
          <div  class="queaction" style="background: none;">
            <!--<a class="btns a1" @click="changeQueState(item,1)">通过</a>-->
            <!--<a class="btns a2" @click="changeQueState(item,2)">不通过</a>-->
            <a  class="btns a4">
              <span v-show="item.state == 2">已通过</span>
              <span v-show="item.state == 3">未通过</span>
            </a>
            <div class="clear"></div>
          </div>
        </li>
      </ul>


        <div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <noresult v-show="messageList.length == 0" :tipText="'暂无记录'"></noresult>
    </div>

</template>
<script>
    import noresult from '@/components/noresult.vue'
export default {
    data() {
        return {
            outDate: false,
            outDate1:true,
          courseListData:[{}],
          pnumb:1,
          actives:1,
          psize:15,
          sonid:'',

          vtype:'',
          qstate:0,//0:待审核，1:审核通过，2:审核不通过,3:已解决
          industryId:'',
          loadshow:true,
            messageList:[

            ],
          dshNumb:0,
          wdshNumb:0

        }
    },
  mounted(){
    if(this.actives == 1){
      this.getcourse();
    }else{
      this.getwdsh();
    }
    this.getwdshnumb();
  },
  components:{noresult},
    methods: {
      viewPic(obj){
        wx.ready(function (){
          wx.previewImage({
            current: obj, // 当前显示图片的http链接
            urls: [obj] // 需要预览的图片http链接列表
          });
        })
      },
      getwd(idx){
        this.pnumb = 1;
        this.messageList = [];
        if(idx == 1){
          this.getcourse();
        }else{
          this.getwdsh();
        }
        this.actives = idx;
      },
      getwdsh(){
        this.$http.post('ask/askService/queryOptPage',
          {
            "subData": {
              "pageNum":this.pnumb,
              "pageSize": this.psize
            }
          }).then(res=>{
          if(res.data.data.list.length == 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
            this.loadshow = false;
            return false;
          }
          if(this.messageList.length>0){
            let moreItem = res.data.data.list;
            for(var i in moreItem){
              this.messageList.push(moreItem[i])
            }
            this.loadshow = true;

          }else{
            this.messageList = res.data.data.list;
            this.loadshow = true;
          }

        })

      },
      getwdshnumb(){//获取我的审核数量
        this.$http.post('ask/askService/queryOptPage',{
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize
          }
        }).then(res=>{
          if(res.data.code == 1){
            this.wdshNumb = res.data.data.total;
          }
        })

      },
      loadMoreitem(){
        this.pnumb++;
        if(this.actives == 1){
          this.getcourse();
        }else{
          this.getwdsh();
        }


      },
      changeQueState(obj,states,idx,questiontype){
        let that = this;



        this.$http.get('ask/askService/modifyState?askId='+obj.id+'&state='+ states+"&questionClassifyId="+questiontype).then(res=>{
          if(res.data.code == 1){
            this.messageList.splice(idx,1);
            this.dshNumb--;
          }
        })

      },
      deleQue(obj,states,idx){
        this.$messagebox.confirm('确定要删除吗？', '提示').then(ret=>{
          this.$http.get('ask/askService/deleteById?askId='+obj.id).then(res=>{
            if(res.data.code == 1){
              this.messageList.splice(idx,1);
              this.dshNumb--;
            }
          })
        });


      },
      getcourse(){
        this.$http.post('ask/askService/queryPageByState?state=0', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize
          }
        }).then(
          res => {
            this.dshNumb = res.data.data.total;
          if(res.data.data.list.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.messageList.length>0){

          let moreItem = res.data.data.list;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data.list;
          this.loadshow = true;

        }


      }
      )
      },

    }

}
</script>
<style lang="scss" scoped>
  .viewimgs{
    img{
      -webkit-border-radius: 10px;
      width:150px;
      height:150px;
      -moz-border-radius: 10px;
      border-radius: 10px;
    }
  }
  .shtab {
    background:#FFF;
    display: block;
    clear: both;
    height:80px;
    line-height: 80px;

    li{
      width:375px;
      float:left;
      text-align: center;

    }
    .act {
      font-weight: bold;
      border-bottom:4px solid #b5935c;
      position: relative;
      color:#b5935c;
    }
  }
.messageList{
    background-color: #fff;
    margin-top:15px;
    li{
        padding:8pt 10pt;
        border-bottom:1pt solid #efefef;
        span{
            margin-bottom: 8pt;
            font-size: 10pt;
            color:#888;
        }
        p{
            font-size: 10pt;
            color:#666;
          .tx{
            width:50px;
            height:50px;

            border-radius: 1000px;
          }
          .nickn{
            position: relative;
            top:-10px;
            margin-left:8px;
          }
          .qtime{
            position: relative;
            top:5px;
            float: right;
            margin-left:8px;
          }
        }
      .nr{
        padding-top:15px;
        color:#333;
      }
      .queaction{
        .clear{display: block;clear: both}
        display: block;
        background:#f2f2f2;
        height:90px;
        padding-top:20px;
        margin-top: 20px;
        .btns{
          height:50px;
          line-height: 50px;
          display: block;
          float:left;
          margin-left:20px;
          padding:0px 15px;
          background:#b5935c;
          font-size:25px;
          border-radius: 10px;
          color:#FFF;
        }
        .a3{
          float: right;
          margin-right: 10px;
          background:none;
          color:red;
        }
        .a2{
          margin-left:40px;
          border:2px solid #b5935c;
          color:#b5935c;
          background: none;
        }
        .a4{
          color:#666;
          background: none;
          float: right;
        }
      }

    }
    li:last-child{
        border:0px solid #fff;
    }
}

</style>
