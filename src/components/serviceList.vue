 <template>
   <div>
      <ul v-if="question_list.length > 0" class="hotService">

      <li class="clear" style="padding:5px 0" v-for="item in question_list">
       <router-link :to="{path:'/service-detail',query:{id:item.id}}">


        <img style="" :src="item.productPic" class="ar-l">
        <div class="desc" style="">
          <div class="clear t1" style="overflow: hidden; height:20px; text-overflow:ellipsis;
white-space: nowrap;">
           {{item.productName}}

          </div>
            <div class="clear t1" style="color: #F60; text-align: left">

                <!--¥{{item.defaultPrice}}元起-->
            </div>

        </div>
       </router-link>
      </li>
    </ul>

    <div v-else class="no_num" style="padding:50px; color:#666; text-align:center ">暂无数据</div>


   </div>
 </template>
 <script>
 import avatar from '@/components/imgs/chang.png'
 export default {
  data() {
    return {
      avatar: avatar

    }
  },
props:['question_list'],
  filters:{

  },

  components: {
    //
  },

  computed: {
    //
  },

  methods: {
    // gotoDetail(){
    //   this.$router.push({path: 'service-detail', query: {id:}this.$route.query})
    // }
  },

  mounted() {}


}
 </script>
 <style lang="scss" scoped>
   .hotService{
      padding:5px 3pt 5pt;
      background:#fff;
      overflow:hidden;
      display:flex;
      flex-wrap:wrap;
      justify-content:flex-start;

      li{
       align-content: flex-start;
       width:46%;
       margin:5pt 2% 0;

        img{
          width:100%;
          height:90pt;
          border-radius:5pt;
        }

        .desc{
          width:100%;
            display: block;
            clear: both;
            padding-top:20px;

          .t1 .ar-l{
            width:70%;
            overflow:hidden;
            height:20pt;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
                        color:#333;
            font-size:24px;
            line-height:50px;
          }
          .t1 .ar-r{
            color:#999;
            font-size:25px;
            line-height:50px;
            font-weight:bold;
            color:#FFAA40;
          }
          .t3{
            margin-bottom:5pt;
          }
          .t3 div{
            color:#999;
            font-size:20px;

            span{
              color:#666;
              font-size:20px;
            }
          }
          .t2 .ar-l{
            color:#FFAA40;
            font-size:28px;
          }
          .t2 .ar-r{
            display:inline-block;
            background:#C9A063;
            color:#fff;
            width:52pt;
            height:20pt;
            line-height:20pt;
            font-size:24px;
            text-align:center;
            border-radius:3pt;
          }
          .mar{
            margin-right:22px;
          }
        }
      }

    }



 </style>


