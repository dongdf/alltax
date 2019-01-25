<template>
    <div class="faded">
        <div class="chooseBox">
            <h4> 请选择专家  <span class="cancel"></span></h4>
            <div class="tags">
                <span>行业</span>
                <span>专业</span>
                <span>区域</span>
            </div>
            <div class="expertInfo">
                 <div class="expert" @click="choose">
                    <div class="xuan">
                        <img v-show="true" src="./imgs/exxz.png" alt="">
                    </div>
                    <div class="main">
                        <div class="zhuan clear"><img src="./imgs/user.png" alt=""></div>
                    </div>
                    <h5>阮志咏</h5>
                    <p>税务专家</p>
                </div>

                <div class="expert" @click="choose">
                    <div class="xuan">
                        <img v-show="true" src="./imgs/exxz.png" alt="">
                    </div>
                    <div class="main">
                        <div class="zhuan clear"><img src="./imgs/user.png" alt=""></div>
                    </div>
                    <h5>阮志咏</h5>
                    <p>税务专家</p>
                </div>
                <div class="expert" @click="choose">
                    <div class="xuan">
                        <img v-show="true" src="./imgs/exxz.png" alt="">
                    </div>
                    <div class="main">
                        <div class="zhuan"><img src="./imgs/user.png" alt=""></div>
                    </div>
                    <h5>阮志咏</h5>
                    <p>税务专家</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    methods: {
        choose() {

        }
    }


}
</script>
<style lang="scss" scoped>
.chooseBox {
    width: 90%;
    padding: 0pt 10pt;
    background-color: #fff;
    border-radius: 5pt;
    h4 {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
        line-height: 30pt;
        font-size: 11pt;
        color: #666;
        text-align: center;
        position: relative;
    }
    .cancel {
        position: absolute;
        width: 15pt;
        height: 15pt;
        top: 10pt;
        right: 5pt;
        background-image: url(./imgs/cancel.png);
        background-size: 100% 100%;
    }

    .expertInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap:wrap;

        .expert {
            width: 180px;
            height: 250px;
            position: relative;

            .main {
            	padding: 19px 0 0 17px;
                width: 170px;
                height: 170px;
                background-image: url(./imgs/exbg.png);
                background-size: 100% 100%;
                .zhuan{
                	width: 135px;
                    height: 135px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                img {
                    width: 135px;
                    height: 135px;
                }
            }
            .xuan{
                width: 30px;
                height: 30px;
                position: absolute;
                top: 2pt;
                right: 22px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            h5 {
                text-align: center;
                font-size: 10pt;
                color: #666;
                line-height: 18pt;
            }
            p {
                text-align: center;
                font-size: 8pt;
                color: #999;
            }
        }
    }
}
</style>