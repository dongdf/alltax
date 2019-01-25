<template>
    <div class="memberShip">
      <div class="coursetp">
          <label>请选择课程:</label>
           <select  v-model="catSelect" @change="changecourse()" class="selCourse">
            <option v-for="item in catlist" :value="item">{{item.curriculumTitle}}</option>
          </select>
          <span>></span>
      </div>
        <ul class="tab clear">
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">未使用</li>
              <li class="line"></li>
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">已使用</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==2}" @click="tab(2)">已发送</li>
        </ul>

        <div class="tabContent">
          <div class="cards" v-if="active == 2">

            <div class="used">
              <table>
                <tr>
                  <th>卡号</th>
                  <th>卡密</th>
                  <th>状态</th>
                </tr>
                <tr v-for='item in messageList'>
                  <td>{{item.serialNum}}</td>
                  <td>{{item.secret}}</td>
                  <td style="color:#999">
                    未使用
                  </td>
                </tr>
              </table>


            </div>
          </div>
            <div class="cards" v-if="active == 1">
                <div class="used">
                	<table>
            		<tr>
            			<th>卡号</th>
            			<th>手机</th>
            			<!--<th>用户</th>-->
            			<th>使用时间</th>
            		</tr>
            		<tr v-for='item in messageList'>
                  <td>{{item.serialNum}}</td>
                  <!--<td>{{item.nickName}}</td>-->
            			<td>{{item.mobile}}</td>
            			<td>{{item.activiteTime | timeNumb('yyyy-MM-dd hh:mm')}}</td>
            		</tr>
            	</table>


                </div>
            </div>
            <div class="cards" v-if="active == 0">
            	<table>
            		<tr>
            			<th>卡号</th>
            			<th>卡密</th>
            			<th>状态</th>
            		</tr>
            		<tr v-for='item in messageList'>
            			<td>{{item.serialNum}}</td>
            			<td>{{item.secret}}</td>
            			<td style="color:#999">
							 未使用
						</td>
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
          catlist:[],
          catSelect:{},
            active: 0,
          messageList:[],
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
      // this.getcourse();
      this.getcats();
  },
    watch:{
      // catSelect(oldVal,curVal){
      //   console.log(curVal);
      //
      //
      //
      // }
    },
    methods: {
      changecourse(){
        this.pnumb = 1;
        this.loadshow = true;
        this.messageList = []
        this.getcourseCard();
      },
      getcats(){
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
            this.catSelect = this.catlist[0]
            this.getcourseCard();
          }
        )

      },
      loadMoreitem(){
        this.pnumb++;

          this.getcourseCard();

      },
      getcourseCard(){
        //0未使用 1已使用 2已发送
        this.$http.get('user/secretCodesService/curriculumSecretPage?pageNum='+this.pnumb+'&pageSize='+this.psize+'&curriculumId='+this.catSelect.id+'&state='+this.active).then(res=>{

          if(res.data.data.list<=0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }
            this.loadshow = false;

          }else{
            if(this.messageList.length>0){
              var temp = res.data.data.list;
              for(var i  in  temp ){
                this.messageList.push(temp[i]);
              }
            }else{
              this.messageList = res.data.data.list;
            }
          }


        })
      },
      getcourse(){
        let isState=0;

        this.$http.post('activity/activityService/crad/findAgentCardPage', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize,
            cardState:this.active

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

        tab(index) {
            this.active = index;
            this.pnumb = 1;
          this.loadshow = true;
            this.messageList = []
          	this.getcourseCard();
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
