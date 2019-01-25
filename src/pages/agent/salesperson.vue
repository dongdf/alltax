<template>
    <div id="salesperson">
		<div id="expertinfo">
			<ul class="xiaoshouyuan">
				<li class="clearfix1">
					
					<span class="left">用户名</span>
					<span class="left1">姓名</span>
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
					<div class="name">
							张三
					</div>
					<div class="chakan">
						拒绝
					</div>
					<div class="chakan">
						通过
					</div>
					<div class="shijian">
						2018-06-05
					</div>
					
				</li>
			</ul>
		</div>
		<toastFour :toastfour=false></toastFour>
		<toastFive :toastfive=true></toastFive>
    </div>
	

    
</template>

<script>


import toastFour from '@/components/toastFour'
import toastFive from '@/components/toastFive'

export default {
    data() {
        return {
        	value:'请输入用户民',
        	active:0
        }

    },
    components: {
   
    toastFour,
    toastFive
    // 
  },
    methods: {
    	goNext(){
    		this.$router.push({path: 'compelete', query: this.$route.query})
    	},
    	tab(index) {
            this.active = index;
        }

    }
}
</script>

<style lang="scss">

#salesperson{
.lianjie{
	height: 0%;
	background-color: #fff;
	padding-top: 5%;
	.lurl{
		    text-align: center;
	}
	.lbtn{
		
		.save-btn{
			display: block;
		    margin: 1rem 0;
		    background-color: #fff;
		    color: #C9A063;
		    text-align: center;
		    height: 20pt;
		    line-height: 20pt;
		    width: 15%;
		    border-radius: 3pt;
		    font-size: 10pt;
		    margin-left: 36%;
		    border:1pt solid #C9A063;
		}
	}
}

.clearfix {
    content: "";
    display: block;
    clear: both;
    padding-left: 5%;
    line-height: 20pt;
    padding-bottom: 3%;
}
.clearfix1 {
    content: "";
    display: block;
    clear: both;
    padding-left: 5%;
    line-height: 20pt;
    padding-bottom: 3%;
}
#expertinfo{
	background-color: #fff;
	padding-top: 10pt;
	.xiaoshouyuan{
		.zhiwu{
			padding-top: 3%;
			float: left;
		}
		.name{
			padding-top: 3%;
			float: left;
			margin-left: 3%;
		}
		.shijian{
			float: left;
	    	padding-top: 3%;
	    	margin-left: 5%;
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
	    	margin-right: 3%;
	    	display: block;
	    	text-align: center;
		    color: #fff;
		    height: 20pt;
		    line-height: 20pt;
		    width: 15%;
		    background-color: #fff;
		    color: #C9A063;
		    border-radius: 3pt;
		    font-size: 10pt;
		    border:1pt solid #C9A063;
		}
	
	}
	
	
	.xiaoshouyuan{
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
			}
			.left1{
				float: left;
				height: .5rem;
    			margin-right: .5rem;
    			margin-left: .7rem; 
			}
			.right{
				float:right;
			    height: .5rem;
			    padding-right: 5%;
			    margin-top: 3%;
			}
			.right1{
				float:left;
			    height: .5rem;
			   /*  margin-left: 3% */
			}
		}
	}
}
}
</style>












