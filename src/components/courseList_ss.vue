<!-- 课程列表 -->
<template>
    <div>
        <ul v-if="courseListData.length > 0" class="hotCourse">
            <li  v-for="item in courseListData" @click="goToDetail(item)" style="position: relative">
              <div class="videoc">


                  <div class="pics"><img :src="item.coverUrl">
                    <div class="biaos">
                      <span class="zb" v-if="nowtime<(item.publishTime+item.durationMill*60*1000)">直播</span>
                      <span class="xl" v-if="item.isSerial">系列</span>
                      <span v-if="startime<item.updated_at && lasttime>item.updated_at" class="newxs">
                      上新
                    </span>

                    </div>


                    <!--<span class="zb" v-if="nowtime<(item.publishTime+item.durationMill*60*1000)">直播</span>-->


                  </div>

                  <div class="desc">
                      <div class="t1" v-html="$options.filters.cut(item.curriculumTitle,25)">
                          <!--{{item.curriculumTitle | }}-->
                      </div>
                      <div class="t3">
                          <!--<div>特邀讲师：<span>{{item.expertName}}</span></div>-->
                          <div class="fl" v-show="item.isLive == 0 || nowtime>(item.publishTime+item.durationMill*60*1000) ">{{item.playTotal}}次观看</div>
                        <div class="fl" v-if="nowtime<(item.publishTime+item.durationMill*60*1000)">
                          <!--直播时间:{{item.publishTime | timeNumb('MM-dd hh:mm')}}-->
                        </div>

                          <div class="fr courseshortinfo" v-show="item.isSerial == 1">
                            <div >

                              <p >
                                <span class="ar-l" style="color:#999;" v-show="item.childNum>0"  >共{{item.childNum}}节</span>

                              </p>

                            </div>

                          </div>



                        <div class="fr courseshortinfo" v-show="item.isSerial == 0">
                          <div v-show="item.isLive == 0">
                            <span class="ar-l" v-if="item.curriculumPrice==0">免费</span>
                            <p v-else>
                              <span class="ar-l"   >¥{{item.vipPrice.toFixed(2)}}</span>
                              <!--<span class="ar-l">¥{{item.vipPrice}}元</span>-->
                            </p>
                            <!--<span class="ar-r">立即学习</span>-->
                          </div>
                          <div v-show="item.isLive == 1 && nowtime>(item.publishTime+item.durationMill*60*1000)">
                            <span class="ar-l" v-if="item.curriculumPrice==0">免费</span>
                            <p v-else>
                              <span class="ar-l"    >¥{{item.vipPrice.toFixed(2)}}</span>
                              <!--<span class="ar-l">¥{{item.vipPrice}}元</span>-->
                            </p>
                            <!--<span class="ar-r">立即学习</span>-->
                          </div>
                        </div>



                        <div class="cl"></div>
                      </div>
                      <!--<div class="clear t2">-->
                        <!--<div v-show="item.isLive == 0">-->
                          <!--<span class="ar-l" v-if="item.curriculumPrice==0">免费</span>-->
                          <!--<p v-else>-->
                            <!--<span class="ar-l" >¥{{item.curriculumPrice}}元</span>-->
                            <!--<span class="ar-l">¥{{item.vipPrice}}元</span>-->
                          <!--</p>-->
                          <!--<span class="ar-r">立即学习</span>-->
                        <!--</div>-->
                        <!--<div v-show="item.isLive == 1 && nowtime>(item.publishTime+item.durationMill*60*1000)">-->
                          <!--<span class="ar-l" v-if="item.curriculumPrice==0">免费</span>-->
                          <!--<p v-else>-->
                            <!--<span class="ar-l" >¥{{item.curriculumPrice}}元</span>-->
                            <!--<span class="ar-l">¥{{item.vipPrice}}元</span>-->
                          <!--</p>-->
                          <!--<span class="ar-r">立即学习</span>-->
                        <!--</div>-->

                      <!--</div>-->
                  </div>
              </div>

              <div class="cl"></div>
            </li>
          <div class="cl"></div>
        </ul>
        <div v-else class="noAnswer">
            <img src="./imgs/nocontent.png" alt="">
            <p>暂无内容</p>
        </div>
  </div>
</template>
<script>
export default {

    data() {
        return {
          nowtime:new Date().getTime(),
          startime:new Date(new Date().toLocaleDateString()).getTime(),
          lasttime:new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1,
        }
    },
    props:{
        courseListData:{}
    },
    components: {

    },

    computed: {

    },

    methods: {
        goToDetail(item){
          if(item.isLive){
            var cinfo = item.publishTime+item.durationMill*60*1000;
            if(cinfo>this.nowtime){
              this.$router.push({
                path:'/scourse-detail',
                query: {id:item.id}
              })
            }else{
              this.$router.push({
                path:'/scourse-detail',
                query: {id:item.id}
              })
            }

          }else{
            this.$router.push({
              path:'/scourse-detail',
              query: {id:item.id}
            })

          }

        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.noAnswer{
    width:100%;
    text-align: center;
    padding-top: 20pt;
    img{
        width:40%;
    }
}

.hotCourse {

     padding:0 10px;
  padding-top:30px;
    li {

      .videoc{


        text-align: center;

        height:300px;
        .pics{
          text-align: center;
          margin:0 auto;
          width:100%;
          position: relative;
          .zb{

            font-size:20px;
            background:#F60;
            color:#FFF;
            padding:0px 10px;

            border-radius: 200px;
          }
          .xl{


            font-size:20px;
            background:#006aff;
            color:#FFF;
            padding:0px 10px;

            border-radius: 200px;
          }
          .biaos{
            position: absolute;
            bottom:15px;
            left:10px;
          }
          .newxs{
            font-size:20px;
            background:red;
            color:#FFF;
            padding:0px 10px;

            border-radius: 200px;
          }

          img {
            width: 100%;
            height: 185px;

            border-radius: 3pt;
          }
        }
      }
      width:50%;
      float:left;
      padding:0 20px;

        margin-bottom: 8pt;

        .desc {
            text-align: left;
          .t1{
            height: 75px;
            overflow : hidden;

            font-size:25px;
            margin-bottom:5px;
          }
            .t1 .ar-l {
                color: #333;
                font-size: 30px;
                line-height: 40px;
                padding-bottom:15px;
            }
            .t1 .ar-r {
                color: #999;
                font-size: 24px;
                line-height: 60px;
            }
            .t3 {

               span{
                 font-size:20px;
                 color:#F60;
               }


            }
            .t3 div {
                color: #999;
                font-size: 20px;

                span {
                  color:#F60;
                    font-size: 20px;
                }
            }
            .t2 .ar-l {
                color: #FFAA40;
                font-size: 28px;
            }
            .t2 .ar-r {
                display: inline-block;
                background: #C9A063;
                color: #fff;
                width: 52pt;
                height: 20pt;
                line-height: 20pt;
                font-size: 24px;
                text-align: center;
                border-radius: 3pt;
            }
            .mar {
                margin-right: 22px;
            }
        }
    }
}
</style>
