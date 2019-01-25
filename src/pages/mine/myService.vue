<template>
    <div id="order">
       
        <div class="haveorder" v-if="order.length>0">
            <ul style="padding-top:0;">
                <li>
                    <div class="one">
                        <span>2018-06-05 12:00:00</span>
                        <span class="right">合计1722.00元</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two">
                        <div class="sgoods">
                            <img src="./img/goods.png">
                        </div>
                        <div class="content">
                            <span>汇算清缴代办</span>
                            <span class="price">￥5000元</span>
                        </div>
                        <div class="clear"></div>
                        <div class="jieguo">
                            <img src="./img/yijiesuan.png">
                        </div>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>张三志</span>
                        <span class="right">136****1234</span>
                    </div>
                </li>
                <li>
                    <div class="one">
                        <span>2018-06-05 12:00:00</span>
                        <span class="right">合计1722.00元</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two">
                        <div class="sgoods">
                            <img src="./img/goods.png">
                        </div>
                        <div class="content">
                            <span>汇算清缴代办</span>
                            <span class="price">￥5000元</span>
                        </div>
                        <div class="clear"></div>
                        <div class="jieguo">
                            <img src="./img/yijiesuan.png">
                        </div>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>张三志</span>
                        <span class="right">136****1234</span>
                    </div>
                </li>
                <li>
                    <div class="one">
                        <span>2018-06-05 12:00:00</span>
                        <span class="right">合计1722.00元</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two">
                        <div class="sgoods">
                            <img src="./img/goods.png">
                        </div>
                        <div class="content">
                            <span>汇算清缴代办</span>
                            <span class="price">￥5000元</span>
                        </div>
                        <div class="clear"></div>
                        <div class="jieguo">
                            <img src="./img/yijiesuan.png">
                        </div>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>张三志</span>
                        <span class="right">136****1234</span>
                    </div>
                </li>
                <li>
                    <div class="one">
                        <span>2018-06-05 12:00:00</span>
                        <span class="right">合计1722.00元</span>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="two">
                        <div class="sgoods">
                            <img src="./img/goods.png">
                        </div>
                        <div class="content">
                            <span>汇算清缴代办</span>
                            <span class="price">￥5000元</span>
                        </div>
                        <div class="clear"></div>
                        <div class="jieguo">
                            <img src="./img/yijiesuan.png">
                        </div>
                    </div>
                    <div class="sxian">
                        <img src="./img/xian.png">
                    </div>
                    <div class="three">
                        <span>张三志</span>
                        <span class="right">136****1234</span>
                    </div>
                </li>
            </ul>
        </div>
         <div class="noorder" v-else>
            <img class="noorder1" src="./img/noorder.png">
            <img class="noorder2" src="./img/noorder1.png">
        </div>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
export default {
    data() {
        return {
            value: '请输入用户民',
            order: [1, 1, 1]
        }
    },
    components: {
        tabbar
        // 
    },
    methods: {
        goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
        }

    }
}
</script>
<style lang="scss">
#order {

    padding: 10pt 0 0;

    .hide {
        display: none !important;
    }

    .noorder {

        height: 100%;
        padding-top: 20%;
        background-color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .noorder1 {
            padding-top: 10pt;
            width: 150pt;
        }
        .noorder2 {
            padding-top: 10%;
            width: 50pt;
        }
    }

    .haveorder {
        ul{
            .sxian {
                width: 100%;
                text-align: center;
                img {
                    width: 95%;
                }
            }

            li {
            	padding:0 6pt;
                background-color: #fff;
                margin-bottom: 10pt;
                .one {
                    padding-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    .right {
                        float: right;
                    }
                }
                .sxian {
                    width: 100%;
                    text-align: center;
                    img {
                        width: 95%;
                    }
                }
                .two {
                    margin-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    display: flex;
                    img {
                        width: 100%;
                    }
                    .price {
                        color: #FFAA40;
                        padding-top: 20%;
                    }
                    .content {
                        display: flex;
                        flex-direction: column;
                        padding-left: 6pt;
                        padding-top: 3pt;
                        width: 40%;
                    }
                    .jieguo {
                        width: 20%;
                        img {
                            width: 80%
                        }
                    }
                    .sgoods {
                        width: 35%;
                    }
                }
                .three {
                    margin-left: 5pt;
                    margin-right: 5pt;
                    padding-bottom: 5pt;
                    .right {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>