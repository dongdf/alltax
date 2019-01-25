<template>
    <ul class="smExpertList">
        <li class="clear">
            <div class="left">
                <div class="user">
                    <img src="/imgs/user.jpg" class="ar-l">
                </div>
                <div class="mid">
                    <div class="clear t1">
                        <span class="ar-l">张俪</span>
                        <span class="">税务专家</span>
                    </div>
                    <p>“金税三期”的功能，“金税三期”中对于财务报表数据预警，增值税会计处理分录，增值税专用发票用量变动异常，2017年税务稽查重点</p>
                </div>
            </div>
            <div class="right">
                <span class="redBtn">咨询专家</span>
            </div>
        </li>
        <li class="clear">
            <div class="left">
                <div class="user">
                    <img src="/imgs/user.jpg" class="ar-l">
                </div>
                <div class="mid">
                    <div class="clear t1">
                        <span class="ar-l">张俪</span>
                        <span class="">税务专家</span>
                    </div>
                    <p>“金税三期”的功能，“金税三期”中对于财务报表数据预警，增值税会计处理分录，增值税专用发票用量变动异常，2017年税务稽查重点</p>
                </div>
            </div>
            <div class="right">
                <span class="redBtn">咨询专家</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    filters: {

    },
    props: {

    },

    components: {

    },

    computed: {
        // 
    },

    methods: {
        showToast() {
            this.success = true;
        },
        hideToast() {
            this.success = false;
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
<style lang="scss">
.smExpertList {

    background: #fff;
    padding: 5pt 10pt 0;

    li {
        padding: 10pt 0;
        display: flex;
        justify-content: space-between;
        -ms-align-items: center;
        align-items: center;
        border-bottom: 1pt solid rgba(211, 211, 211, 0.3);

        .left {
            width: 75%;
            color: #666;
            display: flex;
            justify-content: flex-start;
            -ms-align-items: flex-start;
            align-items: flex-start;
            .user {
                display: flex;
                flex-direction: row;
                -ms-align-items: flex-end;
                align-items: flex-end;

                img {
                    width: 100px;
                    height: 100px;
                    margin: 0 12pt 0 0px;
                    border-radius: 60px;
                    box-shadow: 1pt 0pt 1pt 1pt rgba(211,211,211,0.2);
                }
            }
        }
        .mid {
            span {
                color: #999;
                font-size: 9pt;
                line-height: 20pt;
            }
            .ar-l {
                font-size: 11pt;
                margin-right: 5pt;
                color: #333;
            }
            p {
                font-size: 10pt;
                margin-top: 2pt;
                font-size: 6pt;
                height: 24pt;
                line-height: 12pt;
                overflow: hidden;
                color: #999;
                span {
                    color: #b5935c;
                    margin: 0 1pt;
                }
            }
        }
        .right {
            width: 25%;
            display: flex;
            flex-direction: column;
            .ar-l {
                width: 100%;
                font-size: 12px;
                word-wrap: break-word;
                color: #b5935c;
                word-break: break-all;
            }
            .redBtn {
                display: block;
                text-align: center;
                padding: 2pt 9pt;
                border-radius: 3pt;
                border: 1pt solid #c9a063;
                color: #c9a063;
                font-size: 9pt;
                margin: 3pt auto;
            }
        }

        &:last-child .desc {
            border-bottom: none;
        }
    }
    li:last-child{
        border:0px solid #fff;
    }
}
</style>