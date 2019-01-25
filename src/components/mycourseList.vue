<!-- 课程列表 -->
<template>
    <div>
        <ul v-if="courseListData.length > 0" class="hotCourse">
            <li class="clear" v-for="item in courseListData" @click="goToDetail(item)">
                <div class="ckboxs" @click="delItem(item,$event)"><img src="./imgs/cancel.png"/> </div>
                <img :src="item.head_url" class="ar-l">
                <div class="desc ar-l">
                    <div class="clear t1">
                        <span class="ar-l">{{item.curriculum_title}}</span>
                    </div>
                    <div class="t3">
                        <!--<div>特邀讲师：<span>{{item.expertName}}</span></div>-->
                        <!--<div>播放量：<span>{{item.playTotal}}</span></div>-->
                    </div>
                    <div class="clear t2">
                        <span class="ar-l" v-if="item.curriculum_price==0">免费</span>
                        <p v-else>
                          <!--<span class="ar-l" >¥{{item.curriculumPrice}}元</span>  -->
                          <!--<span class="ar-l">¥{{item.vipPrice}}元</span>-->
                        </p>
                        <span class="ar-r">立即学习</span>
                    </div>
                </div>
            </li>
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
      delItem(obj,e){

        e.stopPropagation();
        this.$messagebox.confirm('确定删除此记录?').then(action => {
          this.$http.post('curriculum/curriculumService/delMyMyPlayCurriculum',{"subData":obj.pid.toString()}).then(res=>{
            if(res.data.code == 1){
              var idx = this.courseListData.findIndex(function (item) {
                return item.id == obj.id
              })

              this.courseListData.splice(idx,1)
            }else{
              this.$toast(res.data.msg);
            }
          })



        });
      },
        goToDetail(item){

            this.$router.push({
              path:'/course-detail',
              query: {id:item.id}
            })

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
    padding: 0pt 0 3pt;
    li {
      .ckboxs{
        position: relative;
        top:-10px;
        left:20px;
        width:50px;
        height:30px;

        background: #FFF;
        border:2px solid #EFEFEF;
        border-radius: 10px;
        text-align: center;
        img{
          width:25px;
          position: relative;
          top:0px;
          margin:0;
          padding:0;
          height: 25px;
        }
      }
        padding: 8pt 0;
        background: #fff;
        margin-bottom: 8pt;
      position: relative;
        img {
          width: 260px;
          height: 180px;
          margin: 0 10pt 0 8pt;
          border-radius: 3pt;
        }
      .desc {
        width: 400px;
            .t1 .ar-l {
                color: #333;
                font-size: 30px;
                line-height: 60px;
            }
            .t1 .ar-r {
                color: #999;
                font-size: 24px;
                line-height: 60px;
            }
            .t3 {
                margin-bottom: 5pt;
            }
            .t3 div {
                color: #999;
                font-size: 20px;

                span {
                    color: #666;
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
