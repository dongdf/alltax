<template>
    <div id="firstbroker">


		<div class="lianjie1" >
			<div class="yaoqing">
	    		<div class="lurl">

					<div>
						<img style="width:50%; margin-top:50px;" :src="shareImg">
					</div>
					<div style="color:#666">
						用户邀请码,长按保存并分享
					</div>
				</div>
				<div class="lbtn" v-show="mineInfo.agentLevel == 1">
					<div class="save-btn" @click="yqShow = true">
						点击邀请销售人员
					</div>
				</div>
			</div>
			<!--<div class="yaoqing">-->
				<!--<div class="lurl">-->
					<!--<span>-->
						<!--销售员邀请码-->
					<!--</span>-->
					<!--<span>-->
						<!--<img src="./img/erweima.png">-->
					<!--</span>-->
				<!--</div>-->
				<!--<div class="lbtn">-->
					<!--<div class="save-btn">-->
						<!--分享-->
					<!--</div>-->
				<!--</div>-->
			<!--</div>-->
    	</div>

		<div id="expertinfo">
			<ul class="tab clear">
	            <li class="kuan" :class="{active:active==0}" @click="tab(0)">我邀请的用户({{numb1}}/<span style="color:red">{{numb1Cancle}}</span>)</li>
	            <li class="line" v-show="mineInfo.agentLevel == 1"></li>
	            <li class="kuan"  v-show="mineInfo.agentLevel == 1" :class="{active:active==1}" @click="tab(1)">我的销售员({{numb2}}/{{xiaxianNumb}}/<span style="color:red;">{{numb2Cancle}}</span>)</li>
	        </ul>
			<ul class="yonghu" v-if="active==0">


				<li class="clearfix headers">

					<span class="left1">用户</span>

					<span class="left2">
						邀请时间
					</span>
          <span class="left3">
						状态
					</span>

				</li>



				<li class="clearfix" v-for="s in messageList" v-if="s">

					<div class="zhiwu">
							<img :src="s.headUrl" style="border-radius: 1000px"/>
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
			<ul class="xiaoshouyuan" v-if="active==1">



				<li class="clearfix headers">

					<span class="fl1">姓名</span>

					<span class="fl2">
						手机号
					</span>
					<span class="fl3">
						状态
					</span>
					<span class="fl4">
						操作
					</span>

				</li>

				<li class="clearfix" v-for="s in messageList" v-if="s">

					<span class="fl1">{{s.name}}</span>

					<span class="fl2">
						{{s.mobile?s.mobile:'暂无'}}
					</span>
					<span class="fl3">
						<i v-show="s.state == 0">待处理</i>
						<i v-show="s.state == 1">已通过</i>
						<i v-show="s.state == 2">已拒绝</i>
						<i v-show="s.state == 3">停用</i>
					</span>
					<span  @click="showSheet(s)" v-show="s.state == 0 && s.mobile " class="fl4">
						 <span>管理</span>
            <!--<span v-show="s.state == 1" style="text-decoration: none;" >下线({{s.downLineCnt?s.downLineCnt:0}})</span>-->
					</span>
          <span  v-show="s.state == 1"  style="color:#b5935c; text-decoration:underline"  class="fl4">

            <span  style="text-decoration: none;" @click="seconedLine(s)" >下线({{s.downLineCnt?s.downLineCnt:0}}/<b style="color:red;">{{s.cancelAtten}}</b>)</span>
					</span>

				</li>




			</ul>
			<noresult v-show="messageList.length == 0" :tipText="'没有记录'"></noresult>
			<div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
		</div>
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
        <!--<toastTwo :toasttwo=false></toastTwo>-->
        <!--<toastSix :toastsix=true></toastSix>-->
		<mt-actionsheet
				:actions="actions"
				v-model="sheetVisible">
		</mt-actionsheet>
		<mt-popup v-model="yqShow" position="bottom"  class="yqoccc" :modal="true">
			<div class="yqo">
				<h3>
					邀请销售人员<span><img @click="yqShow = false" src="./img/cancel.png"></span>
				</h3>
				<div class="yaonrs">
					<p>请将下面的链接发送给您的销售人员</p>
					<div  id="text_element" >http://{{curl}}</div>
					<button  class="btn" data-clipboard-target="#text_element">复制链接</button>
				</div>
			</div>
		</mt-popup>
    </div>



</template>

<script>

import toastTwo from '@/components/toastTwo'
import toastSix from '@/components/toastSix'
import ClipboardJS from 'clipboard'
import noresult from '@/components/noresult'

export default {
    data() {
        return {
          actions:[
            {
            name: '通过',
            method : this.accept
			},
			{
				  name: '拒绝',
				  method : this.isAccept
			}],
          sheetVisible:false,
        	value:'请输入用户民',
        	active:0,
          messageList:[],
          numb1:0,
          numb2:0,
          pnumb:1,
          psize:15,
          erweima:1,
          loadshow:true,
        	toasttwo:false,
          selectObj:{},
          yqShow:false,
		  curl:'',
          shareImg:'',
          mineInfo:{},
          xiaxianNumb:0,
          numb1Cancle:0,
          numb2Cancle:0

        }


    },
    components: {
    	//tabbar,
     	toastTwo,
	    noresult,
     	toastSix
    //
  },
  mounted(){
    this.getma();
    this.curl = document.domain+'/#/invitation?boss='+localStorage.getItem('WX_UID');
    if(this.active == 1){
      this.getIscourse();
	}else{
      this.getcourse();
	}
    this.getIscoursenumb();
    let that = this;
    var clipboard = new ClipboardJS('.btn');

    clipboard.on('success', function(e) {
     alert('复制成功')

      e.clearSelection();
    });

    clipboard.on('error', function(e) {
      alert('请手动复制')
    });;
    this.getmineInfo();

  },
    methods: {
      seconedLine(obj){
        this.$router.push({path:'second-broker',query:{id:obj.userId,name:obj.name}})
      },
      getmineInfo(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
      })
      },
      copyLink(){
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById('text_element').innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        this.$toast({
		  message:'复制成功',
		  position:'bottom'
		})
      },
      accept(){//通过
		this.$http.post('user/userService/agent/checkEmployee',{
          subData:{
            id:this.selectObj.id,
            state:1
          }
		}).then(res=>{
		  this.$toast('操作成功');
		  let that = this;
      var idx = this.messageList.findIndex(function (x) {
        return x.id == that.selectObj.id
      })
      this.messageList[idx].state = 1;

		})
	  },
      isAccept(){//拒绝
        this.$http.post('user/userService/agent/checkEmployee',{
          subData:{
            id:this.selectObj.id,
            state:2
          }
        }).then(res=>{
          this.$toast('操作成功');
          let that = this;
          var idx = this.messageList.findIndex(function (x) {
            return x.id == that.selectObj.id
          })
          this.messageList[idx].state = 2;
        })
      },
      showSheet(obj){
		this.selectObj = obj;
        this.sheetVisible = true;
	  },
    	goNext(){
    		this.$router.push({path: 'compelete', query: this.$route.query})
    	},
      loadMoreitem(){
        this.pnumb++;
        if(this.active == 1){
          this.getIscourse();
        }else{
          this.getcourse();
        }
      },
      getcourse(){//邀请人
        this.$http.post('user/userService/agent/findMyUser', {
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
          this.numb1Cancle = res.data.data.cancelAtten;
          this.messageList = res.data.data.pageInfo.list;
          this.loadshow = true;
        }
      })
      },
	  getma(){
        this.$http.get('/authentication/weChatQr/queryUserQrBySession?hasHeadpic=true').then(res=>{
			//console.log(JSON.stringify(res))
         this.shareImg = res.data.data;
        // console.log(this.shareImg);
		})
	  },
      getIscourse(){//查询员工申请
        this.$http.post('user/userService/agent/findMyEmployee', {
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

          this.messageList = res.data.data.pageInfo.list;
          this.loadshow = true;
        }
      }
      )
      },
      getIscoursenumb(){//查询员工申请
        this.$http.post('user/userService/agent/findMyEmployee', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
            this.xiaxianNumb = res.data.data.downLineTotal
            this.numb2Cancle = res.data.data.downLineCancelTotal
            this.numb2 = res.data.data.pageInfo.total;
          }
        )
      },
      tab(index) {
        this.active = index;
        this.pnumb = 1;
        this.messageList = []
        if(this.active == 1){
          this.getIscourse();
        }else{
          this.getcourse();

        }
      }
    },


}
</script>

<style lang="scss">

	.yqoccc{
		width:100%;
		height: 100%;
		background: none!important;
	}
	.yqo {
		position: fixed;
		bottom: 0;
		left:0;
		width:100%;
		background: #FFF;
		h3{
			text-align: center;
			position: relative;
			padding:20px 0;
			border-bottom: 2px solid #DDD;
			span{
				position: absolute;
				left:20px;
				top:15px;
				img{
					width:50px;
				}
			}
		}
		#text_element{
			font-size:35px;
		}
		.yaonrs{
			text-align: center;
			padding:20px 10%;
			height:400px;
			p{
				text-align: center;
				color:#666;
				padding:30px 0;
				display: block;

			}
			input{padding:10px; font-size:12px; width:100%; font-size:35px; border:1px solid #DDD;}
			button{background: #b5935c; color:#FFF;

				border-radius: 10px; border:none; padding:15px 50px; margin-top:30px;}
			#text_element{
				border:2px solid #DDD;
				background:#F8F8F8;
				padding:10px 30px;
				font-size:25px;
			}
		}
	}

#firstbroker{
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
.lianjie1{
	height: 0%;
	background-color: #fff;

	span{
		img{
			width: 100pt;
			padding-top: 10%;
		}
	}
	.yaoqing{
		text-align: center;
	}
	.lbtn{

		.save-btn{
			display: block;
		    margin: .5rem 0;
		    background-color:#C9A063;
		    color: #FFF;
			box-shadow: 0 0 3px #CCC;
		    text-align: center;
		    height: 25pt;
		    line-height: 25pt;
		    width: 45%;
		    border-radius: 3pt;
		    font-size: 12pt;
		        margin-left: 26%;

		         border:1pt solid #C9A063;
		}
	}
}
/* .save-btn{
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
} */
.clearfix {
    content: "";
    display: block;
    clear: both;

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
        border-bottom:0;
        /* border-bottom: 1px solid #ddd; */
        .kuan {

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
		li.headers{
			background: #eee;
			padding:15px 0 25px 0;
		}
		.zhiwu{

			padding-top: 3%;
			padding-left:30px;
			float: left;
      width:300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
			img{
				width:50px;
				float:left;
			}
			span{
				position: relative;
				top:-5px;
				margin-left:10px;
				font-size:25px;
			}
		}
		.shijian{
			  width:250px;
      float:left;
      overflow: hidden;
      padding-top:20px;
      text-align: right;

		}
      .shijian2{
        width:200px;
        float:left;
        overflow: hidden;
        padding-top:20px;
        padding-right:20px;
        text-align: right;

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

			padding-top: 3%;
			float: left;
			padding-left:30px;
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
			.left1{
				float: left;
        width:300px;
				height: .5rem;
        padding-left:30px;


			}
      .left2{
        float: left;
        width:250px;
        height: .5rem;

        text-align: right;
        padding-left:30px;

      }
      .left3{
        float: left;
        text-align: right;
        width:200px;
        height: .5rem;
        padding-right:30px;

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
			    padding-right: 7%
			}
		}
	}
	.xiaoshouyuan{

		.sxian{
				width: 100%;
				text-align: center;
				img{
					width: 90%;
				}
			}
		li{
			padding:10px 0;
			a{
				display: inline-block;
    			width: 100%;
    			line-height: 25pt;
			}
			.fl1{
				display: block;
				float: left;
        height:45px;
				width:200px;
				padding-left:30px;
        overflow: hidden;
        text-overflow: ellipsis;

			}
			.fl2{
				display: block;
				float: left;
				width:250px
			}
			.fl3{
				display: block;
				float: left;
        overflow: hidden;
				width:120px;
				i{
					  font-style: normal;
				}

			}
			.fl4{
				display: block;
				float: left;
				width:180px;

				text-decoration: underline;

			}
		}
		.headers{
			padding:15px 0;

			background: #eee;
			a{
				display: inline-block;
				width: 100%;
				line-height: 25pt;
			}
			.fl1{
				display: block;
				float: left;
				width:200px;
				padding-left:30px;

			}
			.fl2{
				display: block;
				float: left;
				width:250px
			}
			.fl3{
				display: block;
				float: left;
				width:120px

			}
			.fl4{
				display: block;
				float: left;
				width:180px;
				color:#333;
				text-decoration: none;

			}
		}
	}
}
}
</style>












