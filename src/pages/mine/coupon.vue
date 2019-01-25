<template>
    <div>
    <ul class="couponList">
        <li v-for="q in quanList" v-show="q.is_use == 0" >
            <div class="left">
                <h4 v-show="q.coupon_type == 1"><b style="font-size:16px;">￥</b>{{q.amount}}<span></span></h4>
                <h4 v-show="q.coupon_type == 2">{{q.discount}}<span>折</span></h4>
            </div>
            <div class="right">
                <div>
                    <p class="lg">{{q.name}}</p>

                    <p>{{q.coupon_end_time | timeNumb('yyyy-MM-dd')}} 到期</p>
                </div>
                <div class="use">
                    <span v-show="q.isUse" @click="selectq(q)">去使用</span>
                    <span style="border:none;opacity: .8" v-show="!q.isUse">已过期</span>
                </div>
            </div>
        </li>
    </ul>
    <noresult v-show="quanList.length == 0" :tipText="'暂无优惠券'"></noresult>
    </div>
</template>
<script>
    import noresult from '@/components/noresult.vue'
export default {
    data() {
        return {
            outDate: false,
            outDate1:true,
            quanList:[],
            userNumb:''

        }
    },
  mounted(){
      this.getquan()
  },
  components:{noresult},

    methods: {
      selectq(q){
        if(q.coupon_scope == 3){
          this.$router.push('/school');
        }
        if(q.coupon_scope == 1){
          this.$router.push('/experts');
        }
        if(q.coupon_scope == 0){
          this.$router.push('/');
        }
      },
      getquan(){
        this.$http.post('activity/activityService/coupon/userCouponList').then(res=>{
          this.quanList=res.data.data;
        let cur = Date.parse(new Date());
        console.log(cur);
        for(var i in this.quanList){
          if(cur<=this.quanList[i].coupon_end_time && cur>this.quanList[i].coupon_start_time){
            this.quanList[i].isUse = true;

          }else{
            this.quanList[i].isUse = false;
          }

        }

      })

      },

    }

}
</script>
<style lang="scss" scoped>
.couponList {
	padding:5pt 10pt;
    li {
    	width:100%;
        margin: 10pt 0;
        border-radius: 3pt;
        overflow: hidden;
        display: flex;
        .left {
        	width:25%;
            background-color: #231916;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            -ms-align-items: center;
            align-items: center;
            color:#C9A063;
            h4{
                font-size: 25pt;
            }
            span{
                font-size: 7pt;
                margin-left: 5px;
            }

        }
        .right {
        	width:75%;
            padding:8pt 8pt 8pt 5pt;
            background-color: #c69d62;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            p{
                font-size: 6pt;
                color:#fff;
            }
            .lg{
                font-size: 11pt;
            }
            .use{
                display: flex;
                flex-direction: column;
                -ms-align-items: center;
                align-items: center;
                justify-content: center;
                span{
                    display: inline-block;
                    padding:1pt 3pt;
                    border:1pt solid #fff;
                    font-size: 14px;
                    border-radius: 2pt;
                    color:#fff;
                }
            }
        }
    }

    li.out {
        .left {
            background-color: #b8b8b8;
            color:#666;
        }
        .right {
            background-color: #cecece;
            color:#666;
            p{
                color:#666;
            }
            .use span{
               color:#666;
               border:1pt solid #666;
            }
        }
    }
}
</style>
