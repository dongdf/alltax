<template>
    <div class="btm">
        <div class="cls"></div>
        <div v-show="konwlege.length>0">
        <h2>相关知识</h2>
        <div v-for="c in konwlege" style="border-bottom: 1px solid #EEE;" class="block clearfix">
            <router-link v-show="!c.iconPath" :to="{path:'/knowledge-detail',query:{id:c.id}}">

            <h3 style="padding-left:0">{{c.title}}</h3>
            <!--<h4>特邀讲师： <span>特邀讲</span></h4>-->
            <div style="padding-left:0" class="desc" v-html="$options.filters.cut(c.summary,70)">

            </div>
            </router-link>

          <router-link v-show="c.iconPath" :to="{path:'/knowledge-detail',query:{id:c.id}}">
            <img :src="c.iconPath" v-show="c.iconPath" alt="">
            <h3>{{c.title}}</h3>
            <!--<h4>特邀讲师： <span>特邀讲</span></h4>-->
            <div class="desc" v-html="$options.filters.cut(c.summary,70)">

            </div>
          </router-link>


        </div>
        </div>
        <div class="cls"></div>
        <div v-show="cuuiculu.length>0">
        <h2>相关课程</h2>
        <div v-for="c in cuuiculu" class="block clearfix">
            <router-link :to="{path:'/course-detail',query:{id:c.id}}">
            <img :src="c.coverUrl" alt="">
            <h3>{{c.curriculumTitle}}</h3>
            <h4>特邀讲师： <span>{{c.expertName}}</span></h4>
            <h4>播放量： <span>{{c.playTotal}}</span></h4>
            <div class="money">
                ¥{{c.curriculumPrice}}元
            </div>
            <div class="learn">立即学习</div>
            </router-link>
        </div>
        </div>
        <div class="cls"></div>
        <div v-show="goods.length>0">
        <h2>相关产品</h2>
        <div  class="block">
            <div class="list clearfix">
                <div v-for="c in goods" class="recs">
                    <router-link :to="{path:'/service-detail',query:{id:c.id}}">
                    <img :src="c.productPic" alt="">
                    <p class="clearfix">
                        <span class="t">{{c.productName}}</span>
                      <!--<span class="m">¥{{c.defaultPrice}}元</span>-->
                    </p>
                    </router-link>
                </div>

            </div>
        </div>
        </div>
    </div>
</template>
<script>

    export default {
    data() {
        return {
          nopadding:{paddingLeft:0}

        }
    },
    props:['konwlege','cuuiculu','goods'],
    filters: {

    },

    components: {

    },

    computed: {
        //
    },

    methods: {
      showToast(){
        this.success=true;
      },
      hideToast(){
        this.success=false;
      },
        tab(index) {
            this.active = index;
        },
        playClick() {
            this.isPlay = !this.isPlay
        }
    },

    mounted() {

    }
}

</script>
<style lang="scss" scoped>
    .cls{display: block; clear: both;}
.btm {
    background-color: #fff;
    padding: 0 10pt 0;
    h2 {
        font-size: 11pt;
        color: #333;
        height: 30pt;
        line-height: 30pt;
        padding: 5pt 0;
        border-bottom: 1px solid #ddd;
        margin-bottom: 5pt;
    }
}

.block {
    position: relative;
    overflow: hidden;
    padding: 26px 0 22px;

    img {
        float: left;
        width: 226px;
        height: 226px;
        top: 26px;
        left: 0;
        border-radius: 8px;
    }
    h3 {
        padding-left: 250px;
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        margin-bottom: 20px;
    }
    h4 {
        padding-left: 250px;
        font-size: 24px;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
        margin-bottom: 14px;

        span {
            font-size: 24px;
            color: rgba(51, 51, 51, 1);
        }
    }
    .desc {
        padding-left: 250px;
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
        line-height: 34px;
        text-align: justify;
    }
    .money {
        padding: 12px 0 0 250px;
        font-size: 28px;
        color: rgba(255, 170, 64, 1);
        line-height: 34px;
    }
    .learn {
        position: absolute;
        right: 0;
        bottom: 22px;
        background: rgba(201, 160, 99, 1);
        border-radius: 8px;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        padding: 12px 20px;
    }
}

.list {
    margin: 0 -11px;
}

.recs {
    float: left;
    width: 50%;
    padding: 0 11px 20px;

    img {
        display: block;
        width: 100%;
        height: 220px;
        border-radius: 8px;
    }

    p {
        padding: 20px 0;
    }

    .t {
        float: left;
        font-size: 26px;
        line-height: 36px;
        color: rgba(47, 47, 47, 1);
    }
    .m {
        float: right;
        margin-top: 4px;
        font-size: 26px;
        color: rgba(255, 170, 64, 1);
        line-height: 32px;
    }
}
</style>
