<template>
	<div id="teammanage" >
		<div class="lianjie">

			<p>
				累计收益
			</p>
			<h3 >
				￥{{tmoney}}
			</h3>

			<!--<div class="lbtn">-->
			<!--<div class="save-btn">-->
			<!--分享-->
			<!--</div>-->
			<!--</div>-->
		</div>
		<div id="expertinfo">

			<ul>
				<li class="clearfix headtitle">

					<div class="left gxr">
						<span>购买人</span>
					</div>
					<div class="left gxz">贡献</div>


				</li>
				<li class="clearfix" v-for="s in messageList">

					<div class="left gxr">
						<img :src="s.headImg"><span>{{s.nickname}}</span>
					</div>
					<div class="left gxz">￥{{s.amount}}</div>

					<div class="relitem">
						<span class="fl">购买了 {{s.serviceName}}</span>
						<span class="fr">{{s.createTime | timeNumb('yyyy-MM-dd hh:mm')}}</span>
					</div>

				</li>








			</ul>
			<result v-show="messageList.length ==0" :tipText="'暂无记录'" ></result>
			<div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
		</div>

		<!--<footer>-->
		<!--<ul class="foot">-->
		<!--<li class="ar-l">-->
		<!--</li>-->
		<!--<li class="ar-r">-->
		<!--<h5>删除</h5>-->
		<!--</li>-->
		<!--<li class="ar-m">-->
		<!--<div id="check_css3" style="margin:0">-->
		<!--<span><input type="checkbox"class="input_check" id="check1"><label for="check1"></label></span>-->
		<!--</div>-->
		<!--<p>全选</p>-->
		<!--</li>-->
		<!--</ul>-->
		<!--</footer>-->
	</div>



</template>

<script>
  import result from '@/components/noresult'

  export default {
    name:'teammanage',
    data() {
      return {
        value:'请输入用户民',
        messageList:[],
        loadshow:true,
        psize:15,
        pnumb:1,
        tmoney:0

      }
    },
    components: {
      result

      //
    },
    mounted(){
      this.getcourse();
    },
    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getcourse();

      },
      getcourse(){
        this.$http.get('order/orderBonus/queryListByHeader?pageNum='+this.pnumb+'&pageSize='+this.psize, {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.page.list.length == 0){

          if(this.pnumb>1){
            this.$toast('没有了');
          }

          this.loadshow = false;
          return false;
        }
        this.tmoney =res.data.data.grandTotal;

        if(this.messageList.length>0){

          let moreItem = res.data.data.page.list;


          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data.page.list;
          this.loadshow = true;
        }


      })
      },
      goNext(){
        this.$router.push({path: 'compelete', query: this.$route.query})
      }

    }
  }
</script>

<style lang="scss">

	#teammanage{
		.foot {
			position: fixed;
			bottom: 0px;
			left: 0px;
			width: 100%;
			height: 38pt;
			background-color: #fff;
			z-index: 100;
			.ar-l {
				line-height: 38pt;
				padding-left: 5pt;
				span {
					color: #C9A063;
					font-size: 30px;
				}
			}

			.ar-m {
				float: none;
				width: 140pt;
				height: 38pt;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-left: -13%;
				img {
					display: block;
					width: 16pt;
					height: 14pt;
				}
				p {
					font-size: 15px;
					margin-left: 5pt;
					margin-top: 2pt;
				}
			}

			.ar-r {
				height: 38pt;
				width: 50%;
				text-align: center;
				background-color: #C9A063;
				color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				p {
					font-size: 10pt;

				}
			}
		}


		#check_css3 {margin: 20px auto;    float: left;padding-top: 5pt;}
		#check_css3 span {position: relative;}
		#check_css3 .input_check {position: absolute;visibility: hidden;}
		#check_css3 .input_check+label {display: inline-block;width: 15pt;
			height: 15pt;
			border-radius: 50%;border: 1px solid #ffd900;

		}

		#check_css3 .input_check:checked+label:after {content: "";position: absolute;left: 3pt;bottom: 9pt;width: 8pt;height: 4pt; border: 2px solid #e92333;border-top-color: transparent;border-right-color: transparent; -ms-transform: rotate(-60deg); -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); transform: rotate(-45deg);

		}




		.lianjie{

			background-color:#FFF;
			color:#666;

			text-align: center;
			position: fixed;
			top:0;
			left:0;
			z-index: 99;
			width:100%;height:300px;
			border-bottom: 1px solid #DDD;
			p{
				padding-top: 100px;
			}
			h3{font-size:50px; color: #b5935c;}

		}
		.save-btn{
			display: block;
			margin: 1rem 0;
			background-color: #C9A063;
			color: #fff;
			text-align: center;
			height: 33pt;
			line-height: 33pt;
			width: 75%;
			border-radius: 20px;
			font-size: 17pt;
			margin-left: 12%;
		}
		.clearfix {
			content: "";
			display: block;
			clear: both;
			padding-left: 5%;
			padding-top: 3%;
			line-height: 20pt;
		}
		#expertinfo{

			position: relative;
			top:320px;
			.zhiwu{
				margin-left: 15pt;
				float: left;
			}
			.shijian{
				float: right;
				padding-top: 5pt;
				margin-right: 10pt;
			}
			.touxiang{
				margin-left: 30pt;
				float: left;
				img{
					height: 40pt;
				};

			}

			ul{

				.sxian{
					width: 100%;
					text-align: center;
					img{
						width: 90%;
					}
				}

				li{
					font-size:14px;
					padding:0px;
					border-top:1px solid #eee;
					border-bottom:1px solid #eee;
					display: block;
					clear: both;
					background-color: #fff;
					margin-bottom: 20px;


					.left{
						float:left;
						padding:20px 30px;
					}
					.right{

					}
					.gxr{width:450px;

						img{width:60px; float:left; margin-right:20px;}
						span{
							float:left;
						}
					}
					.gxz{width:300px; text-align: right;
						font-weight: bold; font-size:30px; color:#a38a64}
					.gxsj{width:200px}
					.relitem{

						padding:0px 15px 30px 0px;
						height:80px;
						margin:0 20px;
						color:#666;
						display: block;
						clear: both;
						img{float:left; width:100px;}
						.fl{float:left;
							color:#a38a64;}
						.fr{float:right;}
						span{
							color:#666;
						}
					}
				}
				.clearfix{display: block; clear: both;}
				.headtitle {
					color:#666;
					margin:0;
					border-bottom: 1px solid #DDD;
					.gxr{width:450px; color:#666;

						img{width:60px; float:left; margin-right:20px;}
						span{
							float:left;
						}
					}
					.gxz{width:300px;color:#666; font-weight: normal; text-align: right;
					}

				}
			}
		}
	}
</style>












