
<template>
    <div>

            <Calendar  :markDate='arr' isHideOtherday=false></Calendar>


    </div>
</template>

<script>

import Calendar from 'vue-calendar-component';

export default {
    data() {
        return {
            // sign:false,
            // 多个标记示例
            //4月1 标记的className是mark1 根据class做出一些标记样式
            // arr: ['2018/6/2','2018/6/3']
        }
    },
    props:['sign','arr'],
    components: {
        Calendar
    },
    methods: {
        signToday(){
            this.sign=false
        },
        clickDay(data) {
            console.log(data); //选中某天
        },
        changeDate(data) {
            console.log(data); //左右点击切换月份
        },
        clickToday(data) {
            console.log(data); //跳到了本月
        }
    }
    // v-on:isToday="clickToday"
    // :markDate=arr // arr=['2018/4/1','2018/4/3'] 标记4月1日和4月3日 简单标记
    //:markDateMore=arr // 多种不同的标记
    //第一个标记和第二个标记不能同时使用
    // isHideOtherday=false  //超过今天也不允许点击
    // :agoDayHide='1514937600' //某个日期以前的不允许点击  时间戳10位
    // :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
}
</script>
<style lang="scss">
.calendarBox {
    padding: 5pt 10pt;
    width: 100%;

    border-radius: 2pt;
    overflow: hidden;
    background-color: #fff;

    h5{
        text-align: center;
        line-height: 25pt;
        font-weight: normal;
        font-size: 13pt;
    }
    p{
        text-align: center;
        font-size: 9pt;
        color:#999;
        margin-bottom: 6pt;
    }
    
    .wh_content_all {
        background-color: RGBA(208, 173, 121, 0.1);
        border:1px solid #D0AD79;
    }
    .wh_jiantou1{
        border-top:1pt solid #4AE194;
        border-left:1pt solid #4AE194;
    }
    .wh_jiantou2{
        border-top:1pt solid #4AE194;
        border-right:1pt solid #4AE194;
    }

    .wh_top_changge li{
        color:#666;
    }
    .wh_content_item{
        color:#333;
    }
    .wh_content_item li{
        width:18pt;
        height:18pt;
        line-height: 18pt;
    }

    .wh_content_item div .wh_isMark{
        border:0px solid #fff;
        background-color: #4AE194;
        color:#fff;
    }
    .btn{
        width: 95%;
        border-radius: 5pt;
        padding: 5pt 10pt;
        text-align: center;
        color: #fff;
        background-color: #C9A063;
        border: 1pt solid #C9A063;
        margin:10pt auto 0;
        border-radius: 3pt;
    }
}
</style>