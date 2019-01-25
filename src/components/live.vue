<!-- 今日直播 -->
<template>
    <div class="block-w recommends" v-if="liveDatas.curriculumTitle">
        <div class="title-w clearfix">
            <h2>今日公开课</h2>
            <!-- <div class="more" @click="gotoPage('kc')">更多</div> -->
        </div>
        <div class="recommend" @click="goToLive()">
            <img class="short" :src="liveDatas.coverUrl" alt="">
            <div class="time">{{liveDatas.durationMill}}分钟</div>
            <div class="rec-w">
                <!--<div class="rec-t">{{liveDatas.curriculumTitle}}</div>-->
                <div class="rec-sub"></div>
                <div class="play"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
export default {
    data() {
        return {
          liveDatas:{curriculumTitle:''}
        }
    },
    props: {
        liveData: {}
    },
    components: {

        //
    },
    computed: {
        //
    },
    methods: {
        goToLive(){
            //alert(itemId);
          if(this.liveDatas.isLive){
            this.$router.push({
              path: 'live-detail',
              query: {liveId:this.liveDatas.id}
            })
          }else{
            this.$router.push({
              path: 'course-detail',
              query: {liveId:this.liveDatas.id}
            })
          }

        }
    },
    mounted() {
      // this.$http.baseURL = 'http://192.168.1.210:16101';
      // axios.defaults.baseURL='http://192.168.1.210:16101/'
      this.$http.post('curriculum/curriculumService/list', {
        "subData": {
          "pageNum": 1,
          "pageSize": 1,
          "classfyId": '',
          "requestType": 0
        }
      }).then(res => {
        console.log(JSON.stringify(res.data.data[0]));
        if(res.data.data.list.length>0){
          this.liveDatas = res.data.data.list[0];
        }

    }
    )


    }
}
</script>

<style lang="scss" scoped>
.recommends {
    .recommend {
        position: relative;
        width: 710px;
        height: 340px;
        border-radius: 8px;
        margin: 26px auto 0;
        background-color: #999;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .time {
        color: #fff;
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 26px;
        line-height: 36px;
        padding: 8px 26px;
        border-radius: 36px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .rec-w {
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 114px;
        padding-left: 24px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.11), rgba(0, 0, 0, .7));
    }
    .rec-t {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 32px;
        line-height: 44px;
        margin: 8px 0 10px;
    }
    .rec-sub {
        width: 520px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 26px;
        line-height: 36px;
    }
    .play {
        position: absolute;
        top: 24px;
        right: 20px;
        width: 64px;
        height: 64px;
        background: url('./imgs/play.png') center center no-repeat;
        background-size: cover;
    }
}
</style>
