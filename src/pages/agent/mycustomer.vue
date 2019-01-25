<template>
    <div class="memberShip">
      <div class="coursetp">
        <label>请选择课程:</label>
        <select  v-model="catSelect" @change="changecourse" class="selCourse">
          <option v-for="item in catlist" :value="item">{{item.curriculumTitle}}</option>
        </select>
        <span>></span>
      </div>


        <ul class="tab clear" style="margin-top:0;">
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">浏览记录</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">咨询记录</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==2}" @click="tab(2)">成交记录</li>
        </ul>


        <div class="tabContent">
          <div class="cards" v-if="active == 0">
            <table style="text-align: left;">
              <tr>
                <th>用户</th>

                <th   width="50%" style="text-align: right">时间</th>
              </tr>
              <tr  v-for='item in messageList'>
                <td style="text-align: left; border-bottom: 1px solid #EEE; padding:10px 0; line-height: 150%;"><img class="fl" style="width:30px; border-radius: 100px; height:30px; display: inline-block" :src="item.headimgUrl"><label style="position:relative; top:5px; margin-left:5px;" class="fl">{{item.nickName}}</label><div class="cl"></div></td>

                <td style="text-align: right; border-bottom: 1px solid #EEE; ">{{item.createdAt | timeNumb('yyyy-MM-dd hh:mm') }}</td>
              </tr>
            </table>
          </div>
            <div class="cards" v-if="active == 1">
            	<table style="text-align: left;">
            		<tr>
            			<th>用户</th>
                  <th width="">手机</th>
            			<th   width=" " style="text-align: right">操作</th>
            		</tr>
            		<tr  v-for='item in messageList' >
            			<td style="text-align: left; border-bottom: 1px solid #EEE; line-height: 150%;">{{item.nickName}}<br>{{item.createdAt | timeNumb('yyyy-MM-dd hh:mm')}}</td>
                  <td style="text-align: left; color:#08F;  border-bottom: 1px solid #EEE;" @click="callcus(item)">{{item.mobile}}</td>
                  <td style="text-align: right;  border-bottom: 1px solid #EEE; ">
                    <label v-show="!item.isBuy" @click="sendCourseCode(item)" style="background:#C9A063; color:#FFF;padding:5px 10px; border-radius: 5px">发送课程码</label>
                    <label v-show="item.isBuy" style="float:right; font-size:14px;"  >已成交</label>
                  </td>
            		</tr>
            	</table>
            </div>

          <div class="cards" v-if="active == 2">

            <div class="used">
              <table>
                <tr>
                  <!--<th>课程名称</th>-->
                  <th>姓名</th>
                  <th>手机</th>
                  <th>支付类型</th>
                </tr>
                <tr v-for='item in messageList'>
                  <!--<td style="line-height: 25px; border-bottom:1px solid #EEE;"  >{{item.curriculumName}}<br><label style="font-size:13px; color: #999;">{{item.orderState==1?'未支付':'已支付'}} {{item.payTime | timeNumb('MM-dd hh:mm')}}</label></td>-->
                  <td style="line-height: 25px; border-bottom:1px solid #EEE;">{{item.userName}}</td>
                  <td style="line-height: 25px; color:#08F; border-bottom:1px solid #EEE;" @click="callcus(item)"> {{item.userMobile}}</td>
                  <td style="line-height: 25px; border-bottom:1px solid #EEE; ">
                    <label style="font-size:13px;" v-show="item.payType == 1">微信支付</label>
                    <label  style="font-size:13px;"v-show="item.payType == 2">余额支付</label>
                    <label  style="font-size:13px;"v-show="item.payType == 3">零钱支付</label>
                    <label  style="font-size:13px;"v-show="item.payType == 4">卡密支付</label>
                  </td>

                </tr>
              </table>


            </div>
          </div>
          <div v-show="messageList.length ==0 " style="padding:30px; text-align: center; color:#999;"> 暂无记录</div>
			<div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          catlist:[],
          catSelect:{},
            active: 1,
          messageList:[],
          courseListData:[],
		  pnumb:1,
          loadshow:true,
		  psize:15,
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

            ]
        }
    },
  mounted(){
      if(this.$route.query.tab) {
        this.active = this.$route.query.tab>3?1:this.$route.query.tab;
      }
        this.getcats();


  },
  watch:{
    // catSelect(oldVal,curVal){
    //   console.log(curVal);
    //   this.pnumb = 1;
    //   this.loadshow = true;
    //   this.messageList = []
    //    this.getcourse();
    // }
  },

    methods: {
      callcus(obj){
        location.href="tel:"+obj.mobile;
      },
      getSales(){
        let isState=0;

        this.$http.post('order/orderService/customerOrderPage/'+this.psize+'/'+this.pnumb,{
          "orderState": 2,
          "curriculumId":this.catSelect.id
        }).then(res => {
          if(res.data.data.list.length == 0){
            // alert('')
             // this.messageList = [{userMobile:15321117331}];
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
      getBroswer(){
        let isState=0;
        this.$http.post('user/visitRecordService/queryPage?pageSize='+this.psize+'&pageNum='+this.pnumb+'&curriculumId='+this.catSelect.id).then(res => {
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
              this.courseTotal = res.data.data.total;
              this.loadshow = true;
            }


          }
        )
      },
      changecourse(){
        this.pnumb = 1;
        this.loadshow = true;
        this.messageList = []
        if(this.active == 0){
          this.getBroswer();
        }else if(this.active == 1){
          this.getMycustom();
        }else{
          this.getSales();
        }

      },
      sendCourseCode(obj){
        this.$messagebox.confirm('点击确认将发送课程码给【'+obj.nickName+'】</br>请确认已线下收款，如未收款请取消').then(action => {

          this.$http.get('order/orderService/privateSchool/unlock?relationId='+obj.id).then(res=>{
            if(res.data.code == 1){
              this.$toast('发送成功');
              var idx = this.messageList.findIndex(function (item) {
                return item.id == obj.id
              })
              this.messageList[idx].isBuy= true;
            }else{
              this.$toast(res.data.msg)
            }

          },error=>{
            this.$toast('错误请重试')
          })

        },error=>{

        });


      },
      getcats(){
        let that = this;
        this.$http.post('curriculum/curriculumService/list', {
          "subData": {
            privateSchool:1,
            "pageNum":1,
            "pageSize":200,
            "classfyId":'',// this.sonid,
            "requestType":1,//0直播，1最新列表，2最热，3推荐
            "industryId":''//this.classfyid
          }
        }).then(res => {
            this.catlist = res.data.data.list;
            var routerid = this.$route.query.curriculumId;
            if(routerid){
              var idx = this.catlist.findIndex(function (item) {
                return item.id == routerid;
              })

              if(idx>=0){
                this.catSelect = this.catlist[idx]
              }else {
                this.catSelect = this.catlist[0]
              }
            }else{
              this.catSelect = this.catlist[0]
            }
            if(this.active == 0){
              this.getBroswer();
            }else  if(this.active == 1){
              this.getMycustom();
            }else{
              this.getSales();
            }


          }
        )

      },
      loadMoreitem(){
        this.pnumb++;
        if(this.active == 0){
          this.getBroswer();
        }else if(this.active == 1){
          this.getMycustom();
        }else{
          this.getSales();
        }


      },

      getMycustom(){
        this.$http.post('user/salesRelationshipService/queryPage?pageSize='+this.psize+'&pageNum='+this.pnumb+'&curriculumId='+this.catSelect.id,{
          pageSize:this.psize,
          pageNum:this.pnumb,
          curriculumId:this.catSelect.id
        }).then(res => {
          if(res.data.data.list.length == 0){
            // this.messageList = [{nickName:'1233',mobile:15321117331,id:11}];
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
          this.messageList =  res.data.data.list;
          this.loadshow = true;
        }


      }
      )
      },

        tab(index) {
            this.active = index;
            this.pnumb = 1;
            this.messageList = []
          this.courseListData = []
          if(index == 0){
            this.getBroswer();
          }else if(index == 1){
              this.getMycustom();
          }else{
              this.getSales();
          }

        }
    },

}
</script>
<style lang="scss">

.memberShip {
  .coursetp{
    background: #FFF;
    padding:20px;
    label{
      display: inline-block;width:150px;
    }
    position: relative;
    span{
      position:absolute;
      top:30px;
      right:50px;
    }

  }
  .selCourse {

    width:550px;
    border:2px solid #EEE;
    padding:10px 0;
    display: inline-block;


  }
    .tab {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        background-color: #fff;
        padding: 5pt 20pt 1pt;
        margin: 5pt 0 0;
        border-bottom: 1px solid #ddd;
        .kuan {
            width: 50pt;
            height: 25pt;
            line-height: 25pt;
            text-align: center;
        }
        .line {
            width: 1pt;
            height: 20pt;
            background-color: #ddd;
        }
        .kuan.active{
        	color:#C9A063;
        }
    }

    .cards {
        background-color: #fff;
        margin-top: 5pt;
        table{
        	width:100%;
        	padding:0 10pt;
        }
        th{
        	color:#333;
        	font-weight: normal;
        	font-size: 9pt;
        	line-height: 25pt;
        	border-bottom: 1px solid #ececec;
        }

        td{
        	text-align: center;
        	line-height: 25pt;
        	color:#666;
        	font-size: 10pt;
        }
    }
}
</style>
