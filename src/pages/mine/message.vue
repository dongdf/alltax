<template>
    <div>
        <ul class="messageList">
            <li  v-for="item in messageList">
                <p>
                    <span>{{item.created_at |timeNumb('yyyy-MM-dd hh:mm')}}</span>
                </p>
                <p>
                    {{item.content}}
                </p>
            </li>
        </ul>
        <div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
        <noresult v-show="messageList.length == 0" :tipText="'暂无消息'"></noresult>
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
          psize:15,
          sonid:'',
          vtype:'',
          industryId:'',
          loadshow:true,
            messageList:[

            ]

        }
    },
  mounted(){
      this.getcourse();
  },
  components:{noresult},
    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getcourse();

      },

      getcourse(){
        this.$http.post('activity/activityService/message/findUserMessage', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res =>{
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

    }

}
</script>
<style lang="scss" scoped>
.messageList{
    background-color: #fff;
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
        }

    }
    li:last-child{
        border:0px solid #fff;
    }
}

</style>
