<template>
    <div class="faded" v-show="start">
        <!--  <div class="buyBox">
            <h4><span @click="hideToast"></span>订单金额</h4>
            <dl>
                <dt>¥ 1303 元</dt>
                <dd>
                    <span>优惠券：</span>
                    <span v-if="quan" class="quan">三张可用</span>
                    <span v-else>暂无可用</span>
                </dd>
            </dl>
            <ul>
                <li class="zhai">
                    <h5>请选择支付方式</h5></li>
                <li><img src="/imgs/wechat.png" alt="">
                    <div class="right">微信</div>
                </li>

                <li v-if="!sim">
                    <img src="/imgs/vip.png" alt="">
                    <div class="right">
                        <p class="heng">
                            <span>会员储值余额支付</span>
                            <label for="">会员价¥40元</label>
                        </p>
                        <p class="ar-r">
                            <label for="">余额不足</label>
                            <span>去充值</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div> -->
        <div class="step" v-show="activation==0">
            <h4><span @click="hideToast"></span>激活实体卡</h4>
            <div class="colum">
                <input type="text" v-model="cardId">
            </div>
            <div class="colum">
                <input type="text" v-model="password">
            </div>
            <div class="colum">
                <div class="lightBtn">立即激活</div>
            </div>
        </div>
        <div class="step" v-show="activation==1">
            <h4 class="noBorder"><span @click="hideToast"></span></h4>
            <p>恭喜您，实体卡激活成功，您目前会员等级</p>
            <p><span>VIP 1</span></p>
            <div class="lightBtn">我知道了</div>
        </div>
        <div class="step" v-show="activation==2">
            <h4 class="noBorder"><span @click="hideToast"></span></h4>
            <p>很遗憾，实体卡激活失败，您输入的卡号密码有误</p>
            <p>请确认后重新输入或联系客服</p>
            <div class="lightBtn">重新输入</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "pay",
    data() {
        return {
            cardId: '请输入卡号',
            password: '请输入密码',
            activation: 1
        }
    },
    props: {
        start: {
            default: false
        },
        sim: {
            default: false
        },
        quan: {
            default: false
        }
    },

    components: {

        // 
    },

    computed: {
        // 
    },

    methods: {
        hideToast() {
            this.payStart = false;
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.step {
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    h4 {
        text-align: center;
        color: #666;
        height: 30pt;
        line-height: 30pt;
        border-bottom: 1px solid #ddd;
        span {
            position: absolute;
            top: 8pt;
            left: 5pt;
            display: block;
            width: 15pt;
            height: 15pt;
            background-image: url(/imgs/cancel.png);
            background-size: 100% 100%;
            align-self: flex-start;
        }
    }
    .noBorder{
        border:0px solid #fff;
    }
    .colum {
        padding: 5pt 10pt;
        input {
            appearance: none;
            width: 100%;
            height: 25pt;
            border: 1pt solid #ddd;
            border-width: 0px 0px 1pt 0px;
            color: #666;
            font-size: 8pt;
        }
    }
    p {
        text-align: center;
        line-height: 20pt;
        color:#666;
        span{
            font-size: 13pt;
            font-weight: bold;
            color:#333;
        }
    }



    .darkBtn {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        background-color: #C9A063;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
        margin: 15pt auto 10pt;
        font-weight: bold;
    }

    .lightBtn {
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
        margin: 15pt auto 10pt;
        border: 1pt solid #C9A063;
        background-color: #fff;
        color: #C9A063;
        font-weight: bold;
    }


    dt {
        color: #DCBD60;
        font-size: 16pt;
        padding: 5pt 0;
        text-align: center;
    }
    dd {
        color: #666;
        padding: 5pt 15pt 5pt 10pt;
        display: flex;
        justify-content: space-between;
        -ms-align-items: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        .quan {
            display: inline-block;
            width: 50pt;
            height: 16pt;
            font-size: 6pt;
            line-height: 16pt;
            text-align: center;
            background-image: url(/imgs/quan.png);
            background-size: 100% 100%;
        }
    }
    ul {
        h5 {
            width: 100%;
            text-align: center;
            padding: 5pt 0pt;
            font-weight: normal;
        }
        .zhai {
            padding: 3pt 0;
        }
        li {
            padding: 5pt 10pt;
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
                width: 20pt;
                height: 20pt;
                margin-right: 5pt;
            }
            .right {
                width: 90%;
                height: 30pt;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .ar-r {
                    label {
                        font-size: 7pt;
                    }
                    span {
                        font-size: 7pt;
                        display: inline-block;
                        padding: 2pt 4pt;
                        background-color: #C9A063;
                        color: #fff;
                    }
                }
            }
            .heng {
                display: flex;
                flex-direction: column;
                label {
                    font-size: 3pt;
                    color: #DCBD60;
                }
            }
            li:last-child {
                .right {
                    border: none;
                }
            }
        }
    }
}
</style>