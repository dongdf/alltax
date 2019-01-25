<template>
    <div>
    <ul class="consulationList">
        <!--<li class="clear">-->
            <!--<div class="left">-->
                <!--<div class="user">-->
                    <!--<img src="./img/ren.png" class="ar-l">-->
                    <!--<div class="clear t1">-->
                        <!--<span class="ar-l">张俪</span>-->
                        <!--<span class="">30分钟前</span>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<p>您咨询了张某某专家，支付费用<span>¥50元</span></p>-->
            <!--</div>-->
            <!--<div class="right">-->
                <!--<span class="ar-l">剩余时间：13:22 </span>-->
                <!--<span class="redBtn">立即支付</span>-->
            <!--</div>-->
        <!--</li>-->
        <li class="clear" v-for="s in courseListData">

            <div class="left">
                <div class="user">
                    <img :src="s.userUrl" class="ar-l">
                    <div class="clear t1">
                        <span class="ar-l">{{s.userName}}</span>
                        <span class="">{{s.createTime |time}}</span>
                    </div>
                </div>
                <p>您咨询了{{s.resourceName}}专家
                    <!--支付费用<span>¥50元</span>-->
                </p>
            </div>
            <div class="right">
                <!-- <span class="ar-l">剩余时间：13:22 </span> -->
                <router-link :to="{path:'chat',query:{targetAccount:s.imId}}"><span class="redBtn">查看咨询记录</span></router-link>
            </div>
        </li>
    </ul>
        <noresult v-show="courseListData.length == 0" :tipText="'没有记录'"></noresult>
    <div @click ="loadMoreitem" v-show="courseListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>
<script>
    import noresult from '@/components/noresult'
export default {
    data() {
        return {
          courseListData:[],
          pnumb:1,
          psize:15,
          sonid:'',
          vtype:'',
          industryId:'',
          loadshow:true,

        }
    },
    filters: {

    },
    props: {

    },

    components: {
      noresult

    },

    computed: {
        // 
    },

    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getcourse();

      },
      getcourse(){
        this.$http.post('user/userService/expert/listMyChat', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize
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
        if(this.courseListData.length>0){
          let moreItem = res.data.data.list;
          for(var i in moreItem){
            this.courseListData.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.courseListData = res.data.data.list;
          this.loadshow = true;
        }


      }
      )
      },

      showToast() {
            this.success = true;
        },
        hideToast() {
            this.success = false;
        },
        tab(index) {
            this.active = index;
        },
        playClick() {
            this.isPlay = !this.isPlay
        }
    },

    mounted() {

      this.getcourse();
    }
}
</script>
<style lang="scss">
.consulationList {
    background: #fff;
    padding: 5pt 10pt 0;

    li {
        padding: 8pt 0;
        display: flex;
        justify-content: space-between;
        -ms-align-items: center;
        align-items: center;
        border-bottom:1pt solid rgba(211,211,211,0.3);

        .left {
            width: 70%;
            color: #666;
            .user {
                display: flex;
                flex-direction: row;
                -ms-align-items: flex-end;
                align-items: flex-end;

                img {
                    width: 70px;
                    height: 70px;
                    margin: 0 8pt 0 0px;
                    border-radius: 60px;
                }
                span{
                    color:#999;
                    font-size: 9pt;
                    line-height: 20pt;
                }
                .ar-l {
                    font-size: 11pt;
                    margin-right: 5pt;
                    color: #333;
                }
            }

            p {
                font-size: 10pt;
                margin-top: 8pt;
                span {
                    color: #b5935c;
                    margin: 0 1pt;
                }
            }
        }
        .right {
            width: 30%;
            display: flex;
            flex-direction: column;
            .ar-l {
                width: 100%;
                font-size: 12px;
                word-wrap: break-word;
                color: #b5935c;
                word-break: break-all;
            }
            .redBtn {
                display: block;
                text-align: center;
                padding: 2pt 9pt;
                border-radius: 3pt;
                border: 1pt solid #c9a063;
                color: #c9a063;
                font-size: 9pt;
                margin: 3pt auto;
            }
        }

        &:last-child .desc {
            border-bottom: none;
        }
    }
}
</style>