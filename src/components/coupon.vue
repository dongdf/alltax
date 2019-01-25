<template>
    <mt-popup v-model="selectQquan" position="bottom" class="mint-popup-5" :modal="true">
        <div class="quancontent">
            <h3>请选择<span @click="close" class="close"><img src="./imgs/cancel.png"></span></h3>
            <div>
                <ul class="couponList">
                    <li :class='{out:outDate}' >
                        <div class="left">
                            <h4>9<span>折</span></h4>
                        </div>
                        <div class="right">
                            <div>
                                <p class="lg">折扣券</p>
                                <p>剩2天</p>
                                <p>2018-02-30 到期</p>
                            </div>
                            <div class="use" >
                                <span @click="checkQuan(1233)" v-if="!outDate">去使用</span>
                                <span v-else>已过期</span>
                            </div>
                        </div>
                    </li>
                    <li :class='{out:outDate1}'>
                        <div class="left">
                            <h4>9<span>折</span></h4>
                        </div>
                        <div class="right">
                            <div>
                                <p class="lg">折扣券</p>
                                <p>剩2天</p>
                                <p>2018-02-30 到期</p>
                            </div>
                            <div class="use">
                                <span v-if="!outDate">去使用</span>
                                <span v-else>已过期</span>
                            </div>
                        </div>
                    </li>
                    <li :class='{out:outDate1}'>
                        <div class="left">
                            <h4>6.8<span>折</span></h4>
                        </div>
                        <div class="right">
                            <div>
                                <p class="lg">折扣券</p>
                                <p>剩2天</p>
                                <p>2018-02-30 到期</p>
                            </div>
                            <div class="use">
                                <span v-if="!outDate">去使用</span>
                                <span v-else>已过期</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </mt-popup>

</template>
<script>
export default {
    props:['selectQquan'],
    data() {
        return {
            outDate: false,
            outDate1:true

        }
    },
    methods: {
      close(){
        this.$emit('close')
      },
      checkQuan(obj){
        this.$emit('ckquan',obj)
      }
    }

}
</script>
<style lang="scss" scoped>
    .mint-popup-5{
        width: 100%;
        background:#FFF!important;
        height:100%;
    }
    .quancontent h3{
        border-bottom:1px solid #EEE;
        padding:25px;
        text-align: center;
    }
    .quancontent h3 span.close{
        position: absolute;top:20px; left:10px; width:40px; display: inline-block;
    }
    .quancontent h3 span.close img{
        width:100%;
    }
.couponList {
	padding:5pt 10pt;
    li {
    	width:100%;
        margin: 10pt 0;
        border-radius: 3pt;
        overflow: hidden;
        display: flex;
        .left {
        	width:25%;
            background-color: #231916;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            -ms-align-items: center;
            align-items: center;
            color:#C9A063;
            h4{
                font-size: 25pt;
            }
            span{
                font-size: 7pt;
                margin-left: 5px;
            }

        }
        .right {
        	width:75%;
            padding:8pt 8pt 8pt 5pt;
            background-color: #c69d62;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            p{
                font-size: 6pt;
                color:#fff;
            }
            .lg{
                font-size: 11pt;
            }
            .use{
                display: flex;
                flex-direction: column;
                -ms-align-items: center;
                align-items: center;
                justify-content: center;
                span{
                    display: inline-block;
                    padding:1pt 3pt;
                    border:1pt solid #fff;
                    font-size: 14px;
                    border-radius: 2pt;
                    color:#fff;
                }
            }
        }
    }

    li.out {
        .left {
            background-color: #b8b8b8;
            color:#666;
        }
        .right {
            background-color: #cecece;
            color:#666;
            p{
                color:#666;
            }
            .use span{
               color:#666; 
               border:1pt solid #666;
            }
        }
    }
}
</style>