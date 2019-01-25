<template>
    <div id="consultmanage">
        <div class="lianjie">
            <div class="lurl">
                <span style="font-size: 20pt;">
					{{zuxunCount}}
				</span>
                <br>
                <span>
					明日咨询人数
				</span>
            </div>
            <div class="lbtn">
                <div @click="setNumb" class="save-btn">
                    设置
                </div>
            </div>
        </div>
        <div class="newTab">
            <span @click="chgTab(1)" :class="actives == 1?'actives':''">全部咨询</span>
            <span @click="chgTab(2)" :class="actives == 2?'actives':''">付费记录</span>
        </div>
        <div id="expertinfo">
            <ul v-if="actives == 2">
                <template v-for="s in messageList">
                <li class="clearfix">
                    <div>
                        <div class="touxiang">
                            <img :src="s.expertHeand">
                        </div>
                        <div class="zhiwu">
                            <span>
								{{s.expertName}}
							</span>
                            <span class="zxshijian">
								{{s.createTime | time}}
							</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="pricediv">
                        {{s.customerName}}咨询了你，支付费用
                        <label class="price">￥{{s.price}}</label>
                    </div>
                </li>
                <li class="sxian">
                    <img src="./imgs/xian.png">
                </li>
                </template>

            </ul>
            <ul v-if="actives == 1">
                <template v-for="s in messageList">
                    <li class="clearfix">
                        <router-link :to="{path:'/chat',query:{targetAccount:s.imId}}">
                        <div>
                            <div class="touxiang">
                                <img :src="s.userUrl">
                            </div>
                            <div class="zhiwu">
                            <span>
								{{s.userName}}
							</span>
                                <span class="zxshijian">
								{{s.createTime | time}}
							</span>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="pricediv">
                            {{s.customerName}}咨询了你
                        </div>
                        </router-link>
                    </li>
                    <li class="sxian">
                        <img src="./imgs/xian.png">
                    </li>
                </template>

            </ul>
        </div>
        <noresult v-show="messageList.length == 0" :tipText="'没有记录'"></noresult>
        <div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>
<script>
  import noresult from '../../components/noresult'
export default {
    data() {
        return {
            value: '请输入用户民',
          loadshow:true,
          messageList:[],
          psize:15,
          pnumb:1,
          actives:1,
          zuxunCount:0
        }
    },
    components: {
      noresult
        //
    },
  mounted(){
      this.getnumb();
    if(this.actives == 1){
      this.getchats();
    }else{
      this.getorders();
    }

  },
    methods: {
      getnumb(){
        this.$http.post('order/orderService/expertOrder', {
          "subData": {
            "pageNum":1,
            "pageSize":1

          }
        }).then(res =>{
            this.zuxunCount =res.data.data.ConsultNum;

          })

      },
      chgTab(idx){
        this.actives = idx;
        this.pnumb=1;
        this.messageList = [];
        if(this.actives == 1){
          this.getchats();
        }else{
          this.getorders();
        }
      },
      loadMoreitem(){

        this.pnumb++;
        if(this.actives == 1){
          this.getchats();
        }else{
          this.getorders();
        }


      },
      getchats(){
        this.$http.post('user/userService/expert/listExpertChat', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res=>{

        if(res.data.data.list.length === 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }

          this.loadshow = false;
          return false;
        }

        if(this.messageList.length>0){
          let moreItem = res.data.data.orders.list;
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
      getorders(){//获取订单
        this.$http.post('order/orderService/expertOrder', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res =>{
            // console.log(res.data.data.orders.list.length);
            // this.zuxunCount =res.data.data.total;
          if(res.data.data.orders.list.length === 0){
            if(this.pnumb>1){
              this.$toast('没有了');
            }

          this.loadshow = false;
          return false;
        }
        // this.messageList = res.data.data.orders.list;
        if(this.messageList.length>0){
          let moreItem = res.data.data.orders.list;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data.orders.list;
          this.loadshow = true;
        }


      }
      )
      },
        setNumb(){
          this.$messagebox.prompt('咨询人数', '设置', {
            inputPlaceholder: '请输入',
            showInput:true,
            inputValue:'',
            inputType:'number',
          }).then((obj) => {
            if(obj.action == 'confirm'){
              this.$http.post('user/userService/expert/updateExpertConsultNum',{
                subData:obj.value
              }).then(res=>{
                if(res.data.code == 1){
                  this.zuxunCount = obj.value;

            }

              })
              console.log(obj.value);
          }
        },(errors)=>{
            console.log(errors);
          })
        },
        goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
        }

    }
}
</script>
<style lang="scss">
#consultmanage {
    .newTab{

        border-bottom: 1px solid #DDD;
        border-top: 1px solid #DDD;
        background:#FFF;
        display: block;
        clear: both;
        height:92px;
        padding-top:2px;
        line-height: 90px;
        span{width:350px;float:left;position: relative;
            top:-6px; text-align: center;}
        .actives{
            color:#b5935c;
            font-weight: bold;
            border-bottom:4px solid #b5935c;
            position: relative;
            top:-6px;
        }
    }

    .lianjie {
        height: 100pt;
        background-color: #fff;
        padding-top: 5%;
        .lurl {
            text-align: center;
        }
        .lbtn {

            .save-btn {
                display: block;
                margin: .5rem 0;
                background-color: #fff;
                color: #C9A063;
                text-align: center;
                height: 25pt;
                line-height: 25pt;
                width: 28%;
                border-radius: 3pt;
                font-size: 12pt;
                margin-left: 36%;

                border: 1pt solid #C9A063;
            }
        }
    }
    .save-btn {
        display: block;
        margin: 1rem 0;
        background-color: #C9A063;
        color: #fff;
        text-align: center;
        height: 33pt;
        line-height: 33pt;
        width: 75%;
        border-radius: 20px;
        font-size: 17pt;
        margin-left: 12%;
    }
    .clearfix {
        content: "";
        display: block;
        clear: both;
        padding-left: 5%;
        padding-top: 3%;
        line-height: 20pt;
        .pricediv {
            margin-left: 15%;
            .price {
                color: #FFAA40;
            }
        }
    }
    #expertinfo {
        background-color: #fff;
        margin-top: 10pt;
        .zhiwu {
            margin-left: 15pt;
            float: left;
            .zxshijian {
                font-size: 9pt;
                color: #999999;
            }
        }
        .shijian {
            float: right;
            padding-top: 5pt;
            margin-right: 10pt;
        }
        .touxiang {
            float: left;
            img {
                height: 25pt;
            }
            ;
        }

        ul {
            .sxian {
                width: 100%;
                text-align: center;
                img {
                    width: 90%;
                }
            }
            li {
                a {
                    display: inline-block;
                    width: 100%;
                    line-height: 25pt;
                }
                .left {
                    float: left;
                    height: .5rem;
                    margin-right: .5rem;
                    padding-left: 20%;
                }
                .right {
                    float: right;
                    height: .5rem;
                    padding-right: 5%;
                    margin-top: 3%;
                }
                .right1 {
                    float: right;
                    height: 1rem;
                    padding-right: 5%
                }
            }
        }
    }
}
</style>
