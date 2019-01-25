<!-- 知识列表 -->
<template>
    <div>

    <div class="knowledge" style="">
        <div v-if="knowledgeListData.length>0">
          <div class="ktitle">相关知识</div>
            <div class="know-item clearfix" v-for="item in knowledgeListData" @click="goToDetail(item)">

                <img v-show="item.iconPath" :src="item.iconPath" alt="" />
                <dl>
                    <dt>{{item.title}}</dt>
                    <!--<dd class="t">特邀讲师：<span>{{item.expertId}}</span></dd>-->
                    <dd class="desc" v-html="$options.filters.cut(item.summary,50)">{{}}</dd>
                    <dd v-show="item.publish_time" class="timers"> <template  v-show="item.wh">{{item.wh}}&nbsp;&nbsp;</template>{{item.publish_time |time}}  </dd>
                </dl>
            </div>
        </div>

    </div>

    </div>
</template>
<script>
import {REDIRECT_URL} from '@/constants/'
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
        goToDetail(item) {
          // alert(item.id)
          //  window.location.href="/#/knowledge-detail?id="+item.id;
          //  location.reload();


            this.$router.push({
                path: 'knowledge-detail',
                query: {id:item.id}
            })
          // this.$parent.$parent.isRouterAlive = false
          // this.$nextTick(() => (this.$parent.$parent.isRouterAlive = true))
        }
    }
}
</script>
<style lang="scss" scoped>
  .ktitle{
    background: #FFF;
    padding:20px 30px;
   border-bottom: 1px solid #DDD;
    font-size:27px;
    color:#333;
  }
.knowledge {
    background-color: #f6f6f6;
  margin-bottom:20px;
    .know-item {
        background-color: #fff;
        border-bottom: 1px solid #EEE;
        padding: 24px;
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
