<template>
    <div class="faded">

        <div class="sendComment">
        	<h4 class="title">
        		评论
        		<span class="cancel"></span>
        	</h4>

        	<div class="ren" v-if="status == 1">
        		<p><img src="/imgs/temp.jpg" alt=""></p>
        		<h5>阮志咏</h5>
        		<h6>税务专家</h6>
        	</div>
            <div class="block clearfix" v-if="status == 2">
                <img src="/imgs/temp.jpg" alt="">
                <h3>汇算清缴代办</h3>
                <h4>特邀讲师： <span>特邀讲</span></h4>
                <h4>播放量： <span>108</span></h4>
                <div class="money">
                    ¥5000元
                </div>
            </div>
            <div>
                <div class="star">
                	<span class="light"></span>
                	<span></span>
                	<span></span>
                	<span></span>
                	<span></span>
                </div>
            </div>
            <reply type=1></reply>
        </div>
    </div>
</template>
<script>
import reply from '@/components/reply'
export default {
    name: "toastOne",

    data() {
        return {
        	status:2

        }
    },
    props: {
        ping: {
            default: false,
            typeof: Boolean
        },
    },

    filters: {

    },

    components: {
        reply
    },

    computed: {
        // 
    },

    methods: {
        hideToast() {
            this.showToast = false;
        }
    },

    mounted() {

    }
}
</script>
<style lang="scss" scoped>

.sendComment {
    width: 92%;
    height: auto;
    background-color: #fff;
    border-radius: 10pt;
    padding: 10pt 5pt 10pt 10pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
    	color:#666;
    	font-weight: normal;
    	font-size: 12pt;
    	width:100%;
    	padding:0pt 0 5pt;
    	text-align: center;
    	position: relative;
    	border-bottom:1px solid #eee;
    	span{
    		position: absolute;
    		right:10pt;
    		top:0pt;
    		width:15pt;
    		height:15pt;
    		background-image: url(/imgs/cancel.png);
    		background-size: 100% 100%;
    	}
    }
}
.ren{
	width:100%;
	padding:15pt 0 5pt;
	display: flex;
	flex-direction: column;
	justify-content: center;
	-ms-align-items: center;
	align-items: center;
	p{
		width:60pt;
		height:60pt;
		border-radius: 50%;
		overflow: hidden;
		border:4pt solid #eee;
		img{
			width:60pt;
			height:60pt;
		}
	}
	h5{
		font-weight: normal;
		margin:5pt 0;
	}
	h6{
		font-weight: normal;
		font-size: 9pt;
		color:#999;
		line-height: 10pt;
	}
}

.block {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 26px 0 22px;
    img {
        float: left;
        width: 200px;
        height: 200px;
        top: 26px;
        left: 0;
        border-radius: 8px;
    }
    h3 {
        padding-left: 220px;
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        margin-bottom: 20px;
    }
    h4 {
        padding-left: 220px;
        font-size: 24px;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
        margin-bottom: 14px;

        span {
            font-size: 24px;
            color: rgba(51, 51, 51, 1);
        }
    }
    .desc {
        padding-left: 220px;
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
        line-height: 34px;
        text-align: justify;
    }
    .money {
        padding: 12px 0 0 220px;
        font-size: 28px;
        color: rgba(255, 170, 64, 1);
        line-height: 34px;
    }
    .learn {
        position: absolute;
        right: 0;
        bottom: 22px;
        background: rgba(201, 160, 99, 1);
        border-radius: 8px;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        padding: 12px 20px;
    }
}

.star {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    margin:10pt 0;

    span{
        display: inline-block;
        width: 50px;
        height: 50px;
        background-image: url(/imgs/star1.png);
        background-repeat: no-repeat;
        background-size: 30px 30px;
        margin-right: 3px;
    }
    span.light {
        background-image: url(/imgs/star.png);
        background-size: auto 30px;
    }
}









.smBox {
    width: 80%;
    height: auto;
    background-color: #fff;
    border-radius: 10pt;
    padding: 20pt;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 30pt;
        height: 30pt;
        margin-bottom: 10pt;
    }

    h5 {
        line-height: 23pt;
        height: 23pt;
        font-size: 11pt;
        font-weight: 500;
        color: #333;
    }
    p {
        line-height: 23pt;
        height: 35pt;
        font-size: 9pt;
        font-weight: 500;
        color: #C9A063;
    }
    .lightBtn {
        width: 95%;
        border-radius: 5pt;
        padding: 3pt 10pt;
        text-align: center;
        color: #fff;
        background-color: #C9A063;
        border: 1pt solid #C9A063;
        margin-top: 10pt;
        margin-bottom: 5pt;
        border-radius: 3pt;
    }
}
</style>