<template>
    <div id="secondbroker">
    <div class="sec_total">
      <h3>{{$route.query.name}}（邀请的用户）</h3>
      <p><b>{{numb1}}/<span style="color: red;">{{numb1Cancle}}</span></b>人</p>
    </div>
		<div id="expertinfo">
			<ul class="yonghu">
				<li class="clheader" >

					<span class="left1">用户名</span>

					<span class="left2">
						邀请时间
					</span>
          <span class="left3">
						状态
					</span>

				</li>

				<li class="clearfix" v-for="s in messageList">

					<div class="zhiwu">
            <img :src="s.headUrl" style="border-radius: 1000px;">
            <span>{{s.name}}</span>
					</div>
					<div class="shijian">
						{{s.createTime | timeNumb('MM-dd hh:mm')}}
					</div>
          <div class="shijian2">
            <span v-show="s.subscribe == 1">已关注</span>
            <span v-show="s.subscribe == 0" style="color:red;">已取关</span>
          </div>
				</li>
			</ul>
		</div>
      <noresult :tipText="'暂无记录'" v-show="messageList.length == 0"></noresult>
      <div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
		<!--<footer>-->
            <!--<ul class="foot">-->
                <!--<li class="ar-l">-->
                <!--</li>-->
                <!--<li class="ar-z">-->
                    <!--<h5>转让</h5>-->
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
        <!--<toastThree :toastthree=true></toastThree>-->
    </div>



</template>

<script>

  import noresult from '@/components/noresult'
import toastThree from '@/components/toastThree'
export default {
    data() {
        return {
          loadshow:true,
          question_list:[{}],
        	value:'请输入用户民',
          psize:15,
          pnumb:1,
          messageList:[],
          numb1:0,
          numb1Cancle:0

        }

    },
    components: {

    toastThree,
      noresult
    //
  },
  mounted(){
      this.getlist();
  },
    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getlist()
      },
    	goNext(){
    		this.$router.push({path: 'compelete', query: this.$route.query})
    	},
      getlist(){

          this.$http.post('user/userService/agent/findUserByPid?pUserId='+this.$route.query.id, {
            "subData": {
              "pageNum":this.pnumb,
              "pageSize": this.psize

            }
          }).then(
            res => {
              if(res.data.data.pageInfo.list.length == 0){
                if(this.pnumb>1){
                  this.$toast('没有了');
                }
                this.loadshow = false;
                return false;
              }
              if(this.messageList.length>0){
                let moreItem = res.data.data.pageInfo.list;
                for(var i in moreItem){
                  this.messageList.push(moreItem[i])
                }
                this.loadshow = true;

              }else{
                this.numb1 = res.data.data.pageInfo.total;
                this.messageList = res.data.data.pageInfo.list;
                this.numb1Cancle = res.data.data.cancelAtten;
                this.loadshow = true;
              }
            })
      }

    }
}
</script>

<style lang="scss">

#secondbroker{
  .sec_total {
    background: #FFF;
    text-align: center;
    padding:20pt;
    h3{
      font-size:30px;
      color:#666;
    }
    p{
      color:#b5935c;
      font-size:35px;
      b{
        font-size:35px;
      }
    }
  }
	.active {
        color: #333 !important;
        border-bottom: 4px solid #C9A063;
    }
    .hide{
    	display: none !important;
    }
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
    	width: 95pt;
        height: 38pt;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
		margin-left: -5%;
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
        width: 33%;
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
    .ar-z {
        height: 38pt;
        width: 33%;
        text-align: center;
        background-color: #231916;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        float: right;
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

#expertinfo{

	background-color: #fff;

    .yonghu{
      .clearfix {
        content: "";
        margin-bottom:12px;
        display: block;
       border-bottom: 1px solid #eee;
        clear: both;
        padding:0 30px;
        line-height: 30pt;
        .left2 {
          width:400px; float: left;

        }
        .right1 {
          width:250px; float: left;

        }

      }

		.zhiwu{
      width: 320px;
			float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      img{width:50px;position: relative;
        top:15px;}
		}
		.shijian{
      width:220px;
			float: left;

		}
      .shijian2{
        width:150px;
        float: left;
        text-align: center;

      }
		.touxiang{

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
    .clheader {
      background: #F5F5F5;
      height:60px;
      padding-top: 10px;

    }

		.sxian{
				width: 100%;
				text-align: center;
				img{
					width: 90%;
				}


			}
		li{
      padding:0 15px;
			a{
				display: inline-block;
    			width: 100%;
    			line-height: 25pt;
			}
			.left1{
				float: left;
				height: .8rem;
    		width:350px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

			}
			.left2{
				float:left;
			    height: .8rem;

			    width:250px;
			}
			.left3{
        float:left;
        height: .8rem;

        width:120px;

			}
		}
	}

}
}
</style>












