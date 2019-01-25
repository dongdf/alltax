<template>
    <div>
        <ul class="comments" ><!-- v-if="commentsList.length > 0" -->
            <li class="clear" v-for="item in commentList">
                <img :src="item.userHeadUrl" class="ar-l">
                <div class="desc ar-l">
                    <div class="clear t1">
                        <span class="ar-l">{{item.userName}}</span>
                        <span class="ar-r">{{item.createdAt | time}}</span>
                    </div>
                    <p>{{item.content?item.content:'该用户没有进行评论'}}</p>
                    <div class="clear t2" v-show='star'>
                        <div class="ar-r">
                            评分：
                          <div class="stars">
                            <span :class="{light:item.score>0}"></span>
                            <span :class="{light:item.score>1}"></span>
                            <span :class="{light:item.score>2}"></span>
                            <span :class="{light:item.score>3}"></span>
                            <span :class="{light:item.score>4}"></span>
                          </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!-- <div v-else class="no_num">暂无数据</div> -->
    </div>
</template>
<script>

import { time } from '@/filters/index'
import star from './star'

export default {

    name: 'comments',

    data() {
        return {

        }
    },
    props: {
        commentList: {},
        star: {
            default: false
        }
    },
    filters: {
        time
    },
    components: {
      star
    },
    computed: {
        //
    },
    methods: {
        hua(item){
            return parseFloat(item)
        }

    }
}
</script>

<style lang="scss" scoped>
.comments {
    background: #fff;
    padding: 0pt 0 5pt;

    li:last-child {
        .desc {
            border: none;
        }
    }
    li {
        padding-top: 5pt;
        img {
            width: 60px;
            height: 60px;
            margin: 0 22px 0 40px;
            border-radius: 60px;
        }

        .desc {
            width: 590px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 16px;
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
                color: #666;
                font-size: 26px;
                line-height: 40px;
                margin: 5pt 0;
            }
            .t2 {
                .ar-r {
                    color: #999;
                    font-size: 8pt;
                    line-height: 30px;
                    text-align: right;
                  .stars {
                    display: inline-block;
                    vertical-align: middle;
                    height: 35px;
                    span {
                      display: inline-block;
                      width: 30px;
                      height: 30px;
                      background-image: url(./imgs/star1.png);
                      background-repeat: no-repeat;
                      background-size:28px;
                      margin-right:0px;
                    }
                    span.light {
                      background-image: url(./imgs/star.png);
                      background-size:28px;
                    }
                  }
                }
            }
            .mar {
                margin-right: 22px;
            }
        }
    }

}
</style>
