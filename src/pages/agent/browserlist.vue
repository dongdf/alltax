<template>
    <div class="memberShip">
        <ul class="tab clear" style="margin:0;">
            <!--<li class="kuan" :class="{active:active==1}" @click="tab(1)">成交记录</li>-->
            <!--<li class="line"></li>-->
            <div  style="padding:8px 0;"   @click="tab(0)">浏览记录({{courseTotal}}次)</div>
        </ul>

        <div class="tabContent">
            <div class="cards" v-if="active == 1">

                <div class="used">
                	<table>
            		<tr>
            			<th>卡号</th>
            			<th>密码</th>
            			<th>激活时间</th>
            			<th>激活用户</th>
            		</tr>
            		<tr v-for='item in messageList'>
            			<td>{{item.cardNo}}</td>
            			<td>{{item.password}}</td>
            			<td>{{item.activiteTime | timeNumb('yyyy-MM-dd hh:mm')}}</td>
            			<td>{{item.userName}}</td>
            		</tr>
            	</table>


                </div>
            </div>
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
          <div v-show="messageList.length ==0 " style="padding:30px; text-align: center; color:#999;"> 暂无记录</div>
			<div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          courseTotal:0,
            active: 0,
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
      loadMoreitem(){
        this.pnumb++;

        this.getcourse();

      },

      getcourse(){
        let isState=0;

        this.$http.post('user/visitRecordService/queryPage?pageSize='+this.psize+'&pageNum='+this.pnumb+'&curriculumId='+this.$route.query.id).then(res => {
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

        tab(index) {
            this.active = index;
            this.pnumb = 1;
            this.messageList = []
          this.courseListData = []
          if(index == 1){
            this.getcourse();
          }else{
              this.getcourse();
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
