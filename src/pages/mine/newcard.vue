<template>
    <div class="myWallet">
      <ul class="tabss">
        <li :class="active == 1?'cur':''" @click="changetb(1)">零钱<p class="line"></p> </li>
        <li :class="active == 2?'cur':''" @click="changetb(2)">卡包<p class="line"></p></li>
        <div class="cl"></div>
      </ul>
      <!--<div v-show="active == 1">-->
        <!--<div class="scoreTop">-->
          <!--<div class="shaiuishai" @click="gohbao()"><i class="lin"></i><span><img src="./img/shai.png"/></span>晒一晒</div>-->
            <!--<img src="./img/wallet.png" alt="">-->
            <!--<p>我的零钱</p>-->
          <!--<h3 style="font-size:40px; font-weight: normal">¥{{mineInfo.can_be_presented}}</h3>-->
          <!--<p style="color:#999;">零钱满100元后即可申请提现<br>您还可以使用零钱进行支付</p>-->
            <!--<p>-->
                <!--<span v-show="mineInfo.can_be_presented>=100" @click="tixian()" class="ti">-->
                    <!--全部提现-->
                <!--</span>-->
                <!--<span v-show="mineInfo.can_be_presented<100" style="background: #CCC;" class="ti">-->
                    <!--全部提现-->
                <!--</span>-->


            <!--</p>-->

        <!--</div>-->
        <!--<h4 class="title" style="color:#C9A063; text-align: center">-->
            <!--零钱明细-->
        <!--</h4>-->
        <!--<ul class="movements">-->
            <!--<li v-for="q in mxlist">-->
                <!--<div>-->
                    <!--<h4>{{q.typeMsg}}</h4>-->
                    <!--<p>{{q.created_at | timeNumb('yyyy-MM-dd hh:mm')}}</p>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<h4>-->
                    <!--<span v-if="q.balance>0">+{{q.balance}}</span>-->
                    <!--<span v-if="q.balance<0" style="color:#333;">{{q.balance}}</span>-->
                  <!--</h4>-->
                    <!--&lt;!&ndash;<p>{{q.balance}}</p>&ndash;&gt;-->
                <!--</div>-->
            <!--</li>-->

        <!--</ul>-->
      <!--<noresult :tipText="'暂无记录'" v-show="mxlist.length == 0"></noresult>-->
      <!--<div @click ="loadMoreitem" v-show="mxlist.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>-->

    <!--</div>-->

      <div v-show="active == 2">
        <div class="kcards" v-for="k in cardinfo">


          <!--未购买-->
          <div class="nobuy" v-if="!k.hasOpened">
            <h3 v-if="k.cardType == 0">会员卡</h3>
            <h3 v-if="k.cardType == 1">课程卡</h3>
            <h3 v-if="k.cardType == 2">知识卡</h3>
            <p class="descs" v-if="k.cardType == 0">您还没有会员卡</p>
            <p class="descs" v-if="k.cardType == 1">您还没有课程卡</p>
            <p class="descs" v-if="k.cardType == 2">您还没有知识卡</p>
            <label class="logos"><img src="./img/cslogo.png"> </label>

            <span class="buybtn" ><router-link :to="{path:'/knowledgeCard',query:{ctype:k.cardType}}"  >购买/激活</router-link></span>
          </div>
          <!--已购买-->
          <div class="buyed" v-if="k.hasOpened">

            <h3 v-if="k.cardType == 0">会员卡</h3>
            <h3 v-if="k.cardType == 1">课程卡</h3>
            <h3 v-if="k.cardType == 2">知识卡</h3>
            <p class="descs">到期时间:{{k.invalidTime | timeNumb('yyyy-MM-dd')}}</p>
            <label class="logos"><img src="./img/cslogo.png"> </label>
            <span class="buybtn" ><router-link :to="{path:'/knowledgeCard',query:{ctype:k.cardType}}"  >续费 </router-link></span>

          </div>
        </div>

        <div class="vipcards">

        </div>


      </div>

    </div>
</template>
<script>
  import  noresult from '@/components/noresult'
export default {
    data() {
        return {
          walletInfo:{},
          mineInfo:{},
          active:2,
          psize:15,
          pnumb:1,
          mxlist:[],
          loadshow:true,
          cardinfo:[],

          showKnowlegCard:false,
        }
    },
  components:{noresult},
    mounted(){
      if(this.$route.query.idx){
        this.active = this.$route.query.idx;
      }
      this.getmineInfo();
      this.getmx();
      this.getcards();
    },

    methods: {
      changetb(id){

        if(id == 1){
          this.active = id;
          this.$router.push({path:'/wallet'});
        }
        // this.$router.replace({path:'/wallet',query:{idx:id}});
      },
      getcards(){
        this.$http.get('activity/cardService/cardBag/list').then(res=>{


            this.cardinfo = res.data.data;

        })
      },
      gohbao(){
        this.$router.push({path:'/shai',query:{purl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/money.jpg',type:1}});
      },
      tixian(){
        this.$http.post('user/userAccountService/presented/withdrawal',{
          subData:{
            amount:this.mineInfo.can_be_presented
          }
        }).then(res=>{
          if(res.data.code == 1){
            this.$toast('提现成功');
            this.getmineInfo();
            this.mxlist = [];
            this.pnumb = 1;
            this.getmx();
          }else{
            this.$toast(res.data.msg);
          }

        })
      },
      getmineInfo(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
        })
      },
      loadMoreitem(){
        this.pnumb++;
        this.getmx();
      },
      getmx(){
        this.$http.post('user/userAccountService/findMyPresentedList',{
         subData:{
             pageNum: this.pnumb,
             pageSize: this.psize
           }
        }).then(res=>{
          if(res.data.data.list.length==0){
            this.loadshow =false;
            if(this.pnumb == 1){

              return false;

            }
            this.$toast('没有了');


          }else{
            this.loadshow =true;
            if(this.mxlist.length>0){
              var s = res.data.data.list;
              for(var i in  s){
                this.mxlist.push(s[i]);
              }
            }else{
              this.mxlist = res.data.data.list;
            }
          }

        })
      }

    },

}
</script>
<style lang="scss" >

.myWallet {
  .kcards{
    background: #006aff; margin:20px;  overflow: hidden; border-radius:10px ;  color:#FFF;
    position: relative;
    h3{
      font-size:35px;
    }
    .descs{
      color:#FFF;
      font-size:25px;
      opacity: .9;
    }
    .buybtn{
      position: absolute;

      padding:5px 15px;
      border-radius: 1000px;
      background: #FFF;

      top:60px;
      right:40px;
      a{
        color:#d29f54;
        font-size:25px;
        font-weight: bold;
      }

    }

      .logos{
        position: absolute;
        bottom:10px;
        right:20px;
        img{
          width:150px;
          opacity: .3;
        }
      }

    .nobuy {
      padding:50px 30px;
      background: #d29f54;

  }
    .buyed{
      background: #d29f54;
      padding:50px 30px;
    }


  }
  .tabss{
    background: #FFF;
    position: relative;
    z-index: 9999;
    border-bottom:2px solid #DDD;
    li{width:50%;float: left; text-align: center;
      position: relative; padding: 20px 0;}
    li.cur{
        color:#b5935c;
      p.line{
        position: absolute;
        width:200px;
         left:50%;
        height: 4px;background: #b5935c;
        margin-left:-100px;
        bottom:-2px;
      }
    }
  }

    .scoreTop {
        display: flex;
        flex-direction: column;
        align-items: center;
      position: relative;
        justify-content: center;
        padding: 15pt 0;
        background-color: #fff;
      .shaiuishai{
        i.lin{width:2px; background: rgba(255,76,0,1); height:60px;
          position: absolute; top:-60px;left:50%;}
        position: absolute;
        border-radius: 2000px;
        background: rgba(255,76,0,1);
        color:#FFF;
        box-shadow: 0 0 3px #CCC;
        padding:0 20px 5px 20px;
        font-size:20px;
        span{
          position: relative;
          top:6px;
          margin-right:5px;
          img{width:30px; height: 30px; margin:0;}
        }
        top:50px;
        right:20px;

        animation:mymove22 2s infinite;
        @keyframes mymove22
        {
          0%{  transform: scale(1)}
          50%{ transform: scale(.9)}
          100%{ transform: scale(1)}
        }
      }

        img {
            width: 50pt;
            height: 50pt;
            margin-bottom: 5pt;
        }
        h5 {
            line-height: 22pt;
            font-size: 15pt;
            color: #333;
          text-align: center;
        }
        p {
            line-height: 16pt;
            color: #666;
            font-size: 10pt;
            display:block;
          width:90%;
          text-align: center;
        }
        .ti{
            display: block;
            padding:6pt 20pt;
            font-size:30px;
            font-weight: bold;
            background-color: #C9A063;
            color:#fff;
            border-radius: 3pt;
            margin:5pt auto;
        }
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
        .kuan.active {
            color: #C9A063;
        }
    }
    .title{
        color:#666;
        font-size: 10pt;
        padding: 8pt 10pt;

        border-bottom: 1pt solid #ececec;
    }
    .movements {
            width: 100%;
            padding: 0 10pt;
            background-color: #fff;
            li {
                flex-direction: row;
                justify-content: space-between;
                display: flex;
                -ms-align-items: center;
                align-items: center;
                color: #666;
                padding: 7pt 5pt;
                border-bottom: 1pt solid #ececec;
                h4 {
                    font-size: 11pt;
                    line-height: 16pt;
                  color:#333;
                    span{
                      color:#C9A063;
                      font-size: 14pt;
                      font-weight: normal;
                    }
                }
                p {
                    font-size: 7pt;
                    -ms-align-self: flex-end;
                    align-self: flex-end;
                }
            }
            li:last-child {
                border: 0px solid #ddd;
            }
        }


    .cards {
        background-color: #fff;
        margin-top: 5pt;

        table {
            width: 100%;
            padding: 0 10pt;
        }
        th {
            color: #333;
            font-weight: normal;
            font-size: 9pt;
            line-height: 25pt;
            border-bottom: 1px solid #ececec;
        }

        td {
            text-align: center;
            line-height: 25pt;
            color: #666;
            font-size: 10pt;
        }
    }
}
</style>
