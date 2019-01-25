<template>
    <div id="invitationrecord">
    	<div class="lianjie">
    		<div class="lurl">
				<span>
					销售员：
				</span>
				<span>
					张林清
				</span>
				<div class="line"></div>
				<span>
					13716981234
				</span>
			</div>			
    	</div>
		<div id="expertinfo">
			<ul class="yonghu">
				<li class="clearfix">
					
					<span class="left">用户名</span>

					<span class="right1">
						邀请时间
					</span>
				
				</li>
				<li class="sxian">
					<img src="./img/xian.png">
				</li>


				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				<li class="clearfix">
					
					<div class="zhiwu">
							137****4064
					</div>
					<div class="shijian">
						2018-06-05
					</div>
				</li>
				
			</ul>
			
		</div>
		
    </div>  
</template>

<script>


export default {
    data() {
        return {
        	value:'请输入用户民',
        	
        }

    },
    components: {
   
    // 
  },
    methods: {
    	goNext(){
    		this.$router.push({path: 'compelete', query: this.$route.query})
    	},
    }
}
</script>

<style lang="scss">

#invitationrecord{
	.active {
        color: #333 !important;
        border-bottom: 4px solid #C9A063;
    }
    .hide{
    	display: none !important;
    }


.lianjie{
	height: 0%;
	background-color: #fff;
	padding: 5%;
	.lurl{
		display: flex;
	} 
	.line {
        width: 1pt;
        height: 12pt;
        background-color: #ddd;
        margin-left: 9pt;
        margin-right: 9pt;
    }
	.lbtn{
		.save-btn{
			display: block;
		    margin: 1rem 0;
		    background-color: #fff;
		    color: #C9A063;
		    text-align: center;
		    height: 25pt;
		    line-height: 25pt;
		    width: 28%;
		    border-radius: 3pt;
		    font-size: 12pt;
		    margin-left: 36%;
		    border:1pt solid #C9A063;
		}
	}
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
    line-height: 20pt;
}
#expertinfo{
	background-color: #fff;
	margin-top: 10pt;
	.tab {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        background-color: #fff;
        padding: 5pt 20pt 1pt;
        margin: 5pt 0 0;
        /* border-bottom: 1px solid #ddd; */
        .kuan {
            width: 50pt;
            height: 25pt;
            line-height: 25pt;
            text-align: center;
        }
        .line {
            width: 1pt;
            height: 20pt;
            background-color: #ddd;
        }
        .kuan.active {
            color: #C9A063;
        }
    }
    .yonghu{
		.zhiwu{
			/* margin-left: 10%; */
			padding-top: 3%;
			float: left;
		}
		.shijian{
			float: right;
	    	padding-top: 3%;
	    	margin-right: 5%;
		}
		.touxiang{
			    margin-left: 30pt;
			    float: left;
				img{
				height: 40pt;
			};
		}
	
	}
	.xiaoshouyuan{
		.zhiwu{
			margin-left: 10%;
			padding-top: 3%;
			float: left;
		}
		.shijian{
			float: right;
	    	padding-top: 3%;
	    	margin-right: 7%;
		}
		.touxiang{
			    margin-left: 30pt;
			    float: left;
				img{
				height: 40pt;
			};
		}
		.chakan{
			float: right;
	    	margin-top: 3%;
	    	margin-right: 6%;
	    	display: block;
	    	text-align: center;
		    color: #fff;
		    height: 21pt;
		    line-height: 21pt;
		    width: 22%;
		    background-color: #fff;
		    color: #C9A063;
		    border-radius: 3pt;
		    font-size: 12pt;
		    border:1pt solid #C9A063;
		}
	
	}
	
	.yonghu{
		/* padding-bottom: 20%; */
		.sxian{
				width: 100%;
				text-align: center;
				img{
					width: 90%;
				}
			}
		li{
			a{
				display: inline-block;
    			width: 100%;
    			line-height: 25pt;
			}
			.left{
				float: left;
				height: .5rem;
    			margin-right: .5rem;
    			/* padding-left: 20%; */
			}
			.right{
				float:right;
			    height: .5rem;
			    padding-right: 5%;
			    margin-top: 3%;
			}
			.right1{
				float:right;
			    height: .5rem;
			    padding-right: 10%
			}
		}
	}
	.xiaoshouyuan{
		padding-bottom: 20%;
		.sxian{
				width: 100%;
				text-align: center;
				img{
					width: 90%;
				}
			}
		li{
			a{
				display: inline-block;
    			width: 100%;
    			line-height: 25pt;
			}
			.left{
				float: left;
				height: .5rem;
    			margin-right: .5rem;
    			padding-left: 16%;
			}
			.right{
				float:right;
			    height: .5rem;
			    padding-right: 5%;
			    margin-top: 3%;
			}
			.right1{
				float:right;
			    height: .5rem;
			    padding-right: 40%
			}
		}
	}
}
}
</style>












