<template>
    <div class="myCash">
        <div class="cash">
            <div class="zhan">提现金额：</div>
            <div class="you">
                <input type="text">
            </div>
        </div>
        <div class="cash sm">
            <div class="zhan"></div>
            <div class="you">
                可提现金额：¥103345.55 元
                <span class="ar-r">全部提现</span>
            </div>
        </div>
        <div class="cash">
            <div class="zhan">提现账户：</div>
            <div class="you">
                <input type="text">
            </div>
        </div>
        <div>
            <span class="btn">确定</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    methods: {
        tab(index) {
            this.active = index;
        }
    },

}
</script>
<style lang="scss">
.myCash {
    background-color: #fff;
    padding-bottom: 20pt;
    .cash {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 10pt 10pt;
        .zhan {
            width: 20%;
            font-size: 10pt;
        }
        .you {
            width: 75%;
            input {
                width: 100%;
                background-color: #f2f2f2;
                height: 28pt;
                border-radius: 2pt;
                appearance: none;
                box-shadow: none;
                border: 1pt solid #ddd;
                font-size: 10pt;
                text-indent: 5pt;
            }
        }
       
    }
     .btn{
        display: block;
        width: 80%;
        height: 28pt;
        line-height: 28pt;
        background-color: #C9A063;
        text-align: center;
        border-radius: 3pt;
        color: #fff;
        font-size: 11pt;
        margin:15pt auto 10pt;
    }
    .cash.sm {
        padding: 3pt 10pt;
        .you {
            font-size: 9pt;
        }
        .ar-r {
            font-size: 9pt;
            color: #C9A063;
        }
    }
}
</style>