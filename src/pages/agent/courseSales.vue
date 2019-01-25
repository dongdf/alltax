<template>
    <div class="memberShip">
        <ul class="tab clear">
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">成交记录</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">浏览记录</li>
        </ul>

        <div class="tabContent">
            <div class="cards" v-if="active == 1">

                <div class="used">
                	<table>
            		<tr>
            			<th>课程名称</th>
            			<th>姓名</th>
            			<th>手机</th>
            			<th>支付类型</th>
            		</tr>
            		<tr v-for='item in messageList'>
                  <td style="line-height: 25px; border-bottom:1px solid #EEE;"  >{{item.curriculumName}}<br><label style="font-size:13px; color: #999;">{{item.orderState==1?'未支付':'已支付'}} {{item.payTime | timeNumb('MM-dd hh:mm')}}</label></td>
            			<td style="line-height: 25px; border-bottom:1px solid #EEE;">{{item.userName}}</td>
            			<td style="line-height: 25px; border-bottom:1px solid #EEE;"> {{item.userMobile}}</td>
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
            <div class="cards" v-if="active == 0">
            	<table style="text-align: left;">
            		<tr>
            			<th>课程</th>
            			<th style="text-align: right;" width="30%">操作</th>
            		</tr>
            		<tr  v-for='item in messageList'>
            			<td style="text-align: left; border-bottom: 1px solid #EEE; line-height: 150%;">{{item.curriculumTitle}}</td>
            			<td style="text-align: right;  border-bottom: 1px solid #EEE; text-decoration: underline" @click="gobrowser(item)">详细数据></td>
            		</tr>
            	</table>
            </div>
			<div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
      this.getcourse();
  },
    methods: {
      gobrowser(obj){
        this.$router.push({path:'/browserlist',query:{id:obj.id}});
      },
      // getbrowser(){
      //   this.$http.post('curriculum/curriculumService/list', {
      //     "subData": {
      //       privateSchool:1,
      //       "pageNum":this.pnumb,
      //       "pageSize": this.psize,
      //       "classfyId":'',// this.sonid,
      //       "requestType": 1,//0直播，1最新列表，2最热，3推荐
      //       "industryId":''//this.classfyid
      //     }
      //   }).then(
      //     res => {
      //
      //       if(res.data.data.list.length == 0){
      //         if(this.pnumb>1){
      //           this.$toast('没有了');
      //         }
      //         this.loadshow = false;
      //         return false;
      //       }
      //       if(this.messageList.length>0){
      //         let moreItem = res.data.data.list;
      //         for(var i in moreItem){
      //           this.messageList.push(moreItem[i])
      //         }
      //         this.loadshow = true;
      //
      //       }else{
      //         this.messageList = res.data.data.list;
      //         this.loadshow = true;
      //       }
      //
      //
      //     }
      //   )
      // },
      loadMoreitem(){
        this.pnumb++;
        if(this.active == 0){
          this.getbrowser();
        }else{
          this.getcourse();
        }



      },
      getcourse(){
        let isState=0;

        this.$http.post('order/orderService/customerOrderPage/'+this.psize+'/'+this.pnumb,{
          "orderState": 2
        }).then(res => {
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

        tab(index) {
            this.active = index;
            // alert(this.active)
            this.pnumb = 1;
            this.messageList = []
          // this.courseListData = []
          if(index == 1){
            this.getcourse();
          }else{
            this.getbrowser();
          }

        }
    },

}
</script>
<style lang="scss">

.memberShip {

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
