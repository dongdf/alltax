<!-- 知识列表 -->
<template>
    <div>
    <div class="knowledge">

        <div v-if="knowledgeListData.length>0">

            <div class="know-item clearfix" v-for="item in knowledgeListData" @click="goToDetail(item)">
              <div class="ckboxs" @click="delItem(item,$event)"><img src="./imgs/cancel.png"/> </div>
                <img v-show="item.iconPath" :src="item.iconPath" alt="" />
                <dl>
                    <dt>{{item.title}}</dt>
                    <!--<dd class="t">特邀讲师：<span>{{item.expertId}}</span></dd>-->
                    <dd class="desc" v-html="$options.filters.cut(item.summary,50)">{{}}</dd>
                    <dd v-show="item.publish_time" class="timers"> <template  v-show="item.wh">{{item.wh}}&nbsp;&nbsp;</template>{{item.publish_time | timeNumb('yyyy-MM-dd')}}  </dd>
                </dl>
            </div>
        </div>

    </div>
        <div style="padding:20px; text-align:center; color:#666;" v-if="knowledgeListData.length == 0">
            <div style=" display: block"><img style="width:50%;" src="./imgs/nocontent.png"></div>
            暂无数据
        </div>
    </div>
</template>
<script>

import { cut } from '@/filters/index'

export default {

    data() {
        return {

        }
    },
    filters: {
        cut
    },
    props:['knowledgeListData'],
    components: {},
    computed: {

    },
    methods: {
      delItem(obj,e){

        e.stopPropagation();
        this.$messagebox.confirm('确定删除此记录?').then(action => {
            this.$http.post('knowledge/knowledgeService/delMyRead',{"subData":obj.pid.toString()}).then(res=>{
              if(res.data.code == 1){
                var idx = this.knowledgeListData.findIndex(function (item) {
                  return item.id == obj.id
                })
                this.knowledgeListData.splice(idx,1)
              }else {
                this.$toast(res.data.msg);
              }
            })



        });
      },
        goToDetail(item) {
          if(this.$route.query.id == 128){
            this.$router.push({
              path: 'knowledge-detail',
              query: {id:item.id,hb:1}
            })

          }else{
            this.$router.push({
              path: 'knowledge-detail',
              query: {id:item.id}
            })

          }

        }
    }
}
</script>
<style lang="scss" scoped>
.knowledge {
    background-color: #f6f6f6;
    .know-item {
        background-color: #fff;
        margin-bottom: 8pt;
        padding: 24px;
      .ckboxs{
        position: relative;
        top:-10px;
        left:0px;
        width:50px;
        height:30px;

        background: #FFF;
        border:2px solid #EFEFEF;
        border-radius: 10px;
        text-align: center;
        img{
          width:25px;
          margin:0 auto;
          position: relative;
          left:10px;
          padding:0;
          height: 25px;
        }
      }
      position: relative;
    }

    img {
        float: left;
        width: 80pt;
        height: 60pt;
        border-radius: 3pt;
        margin-right: 24px;
    }

    dt {
        font-size: 30px;
        color: #333;

        line-height: 40px;
        padding-top: 4px;
    }

    .t {
        font-size: 24px;
        color: #555;
        line-height: 34px;
        margin: 20px 0 14px;

        span {
            color: #333;
            font-size: 24px;
        }
    }
    .desc {
        font-size: 24px;
        color: #666;
        line-height: 34px;
    }
  .timers {
    color:#999;
    font-size:25px; padding-top:15px;
  }
}
</style>
