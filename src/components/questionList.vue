<template>
    <div>
        <div v-if="questionList.length<=0||questionList==undefined||questionList==null" class="noAnswer">
            <img src="./imgs/nocontent.png" alt="">
            <p>暂无记录</p>
        </div>
        <div v-else>
            <ul class="questionList">
                <li class="clear" v-for="item in questionList" @click="goToDetail(item.ask_question_id)">
                    <img :src="item.user_head" class="ar-l">
                    <div class="desc ar-l">
                        <div class="clear t1">
                            <span class="ar-l">{{item.user_nick}}</span>
                            <span class="ar-r">{{item.created_time | time}}</span>
                        </div>
                        <p v-html="item.question_content"></p>
                        <div class=" t2">
                             <!--<span class="ar-r">悬赏 50元</span>-->
                            <span class="ar-r">
                              <a class="shang" style="color:#F14E43" v-show="item.charge_money"><img src="./imgs/jin.png"/>锦囊</a>
                              <a class="shang" v-show="item.tip_money>0"><img src="./imgs/wallet.png"/>已赏出{{item.tip_money}}元</a>
                              <span class="mar">回答{{item.answer_count}}</span>
                                <!--关注{{item.attention_count}}-->
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { time } from '@/filters/index'

export default {
    data() {
        return {

        }
    },
    filters: {
        time
    },
    props: {
        questionList:{}
    },

    components: {

    },

    computed: {
        //
    },

    methods: {
        goToDetail(itemId) {
            this.$router.push({
                path: '/question-detail',
                query:{
                    questionId: itemId
                }
            })
        }
    },

    mounted() {

    }
}
</script>
<style lang="scss">
.noAnswer{
    width:100%;
    text-align: center;
    padding-top: 20pt;
    img{
        width:40%;
    }
}

.questionList {
    background: #fff;
    padding: 5pt 10pt 0;
    li {
        padding: 5pt 0 3pt;
        display: flex;
        justify-content: space-between;
        img {
            width: 70px;
            height: 70px;
            margin: 0 22px 0 0px;
            border-radius: 60px;
        }
        .desc {
            width: 628px;
            border-bottom: 1px solid rgba(211, 211, 211, 0.5);
            padding-bottom: 8pt;
            .t1 .ar-l {
                color: #333;
                font-size: 26px;
                line-height: 60px;
            }
            .t1 .ar-r {
                color: #999;
                font-size: 24px;
                line-height: 60px;
            }
            p {
                color: #333;
                font-size: 26px;
                line-height: 40px;
                margin: 8pt 0 8pt;
                word-break:break-all;
            }
            .t2 .ar-l {
                color: #FFAA40;
                font-weight: bold;
            }
            .t2 span {
                color: #999;
                font-size: 24px;



            }
            .mar {


              padding:8px 12px;


              border-radius: 5px;
              display: inline-block;
              text-align: right;
              width:100px;
              color:#b5935c;
            }
          a.shang{
            color:rgb(201, 133, 0);
            margin-right:5px;
            font-size: 24px;
            img{
              /*opacity: .6;*/
              width:30px;
              height:30px;
              margin:0;
              position: relative;
              top:6px;
              margin-right:3px;

              border-radius: 0;
            }
          }

        }

        &:last-child .desc {
            border-bottom: none;

        }
    }
}
</style>
