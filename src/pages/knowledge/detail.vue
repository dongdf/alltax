<template>
  <div class="know-detail">
	  <div v-show="!aloading">
		  <img src="./imgs/sending.jpg" style="width:100%;"/>
	  </div>
  	<div v-show="aloading" class="article">
  		<h1>{{article.title}}
		<p style="text-align: center;font-weight: normal; color:#666;">{{article.publish_time | timeNumb('yyyy-MM-dd')}}</p>
        <div class="voice" v-if="article.mp3_path">
          <div class="voicec" @click="playVoice">
            <!--<div class="playSoundBtn"><img  src="./imgs/misc.png"/></div>-->
            <div class="playSoundPic"><img :class="playSound?'playSounding':''" src="./imgs/misc.png"/></div>
          </div>
        </div>
		</h1>
			<div class="detail">
        <div class="falv" v-show="article.wh">
          <p style="color: red">
            文号：{{article.wh}}
          </p>
          <p>
            发文时间：{{article.publish_time | timeNumb('yyyy-MM-dd')}}
          </p>
          <p style="color: red">
            效力：{{article.yxbz == 1?'有效':'无效'}}
          </p>
          <p style="color: red" v-show="article.yxbz == 2">
            失效时间：{{article.sx_time | timeNumb('yyyy-MM-dd')}}
          </p>
        </div>
				<!--<div v-html="article.summary" class="sub" style="padding:5px 0;">-->

					<!--<div class="date">{{article.publishTime | time}}</div>-->
				<!--</div>-->
				<!--<div style="font-size:12px; background: #F7F7F7;border:1px solid #EEE; margin:0px; padding:10px;"></div>-->
				<div class="txt" id="procontent" >
          <div id="zhe" v-show="!article.content"><span><router-link :to="{path:'/knowledgeCard',query:{ctype:2}}">购买查看全部知识</router-link></span></div>
          <div v-html="article.content?article.content:article.summary" id="zhishi">
            知识正文
          </div>

				</div>
        <div class="bq_items" v-show="article.sz">标签:{{article.sz}} {{article.industry}}</div>
				<div class="lbtn" >
					<!--<div class="save-btn" v-if="article.charge">-->
						<!--查看全部(￥50元)-->
					<!--</div>-->
					<!--<div class="save-btn" v-else>-->
						<!--查看详情-->
					<!--</div>-->
					<div class="guanzhu">
						<div v-show="!islike" class="ht" @click="actlike()">
							<div class="cimg"><img src="./imgs/heart1.png"/></div>
							<p>关注</p>
						</div>
						<div v-show="islike" class="ht"  @click="actunlike()">
              <div class="cimg"><img src="./imgs/heart.png"/></div>
							<p>已关注</p>
						</div>
            <div class="haibao" v-show="article.iconPath" @click="gohaibao()">
              <div class="cimg"><img src="./imgs/pro_hb.png"/></div>
              <p>海报</p></div>
					</div>
				</div>

        <div class="guanzhuma" v-show="!isshowma"><img src="./imgs/guanzhuma.png"/> </div>

			</div>
  	</div>
    <relknowlege :knowledgeListData=knowledgeListData></relknowlege>
		<experts :expertInfo="experts" :relInfo="relInfo"></experts>
	  <recommends :konwlege="konwlege" :cuuiculu="cuuiculu" :goods="goods"></recommends>

<div id="audioContent2"></div>
  </div>
</template>

<script>
  import recommends from '@/components/recommends'
  import experts from '@/components/expertCard'
  import relknowlege from '@/components/relknowledgeList'
export default {
  data() {
    return {
      playSound:false,
      audioPlay:null,
      isshowma:1,
      islike:false,
      article:{},
      konwlege:[],
      cuuiculu:[],
      goods:[],
      relInfo:{
        name:'知识',
        title:'122'
      },
      experts:[{}],
	  aloading:false,
      islike:false,
      knowledgeListData:[]

    }
  },

  components: {
    recommends,experts,relknowlege
    //
  },

  computed: {
    //
  },

  methods: {
    playVoice(){
      this.playSound = !this.playSound;

      var container = document.getElementById('audioContent2');
      var x = document.createElement("AUDIO");
      x.setAttribute("id", "my-audio2");
      x.setAttribute("controls", "controls");
      x.setAttribute("controlsList", "nodownload");
      x.style.width = '100%';
      if(!this.audioPlay){
        container.appendChild(x);
        this.audioPlay = document.getElementById('my-audio2');
        this.audioPlay.src = this.article.mp3_path;


      }
      // console.log(this.audioPlay.paused)

      if(this.audioPlay.paused){
        this.audioPlay.play();
      }else{
        this.audioPlay.pause();
      }




    },
    getisguanzhu(){


    },
    gohaibao(){
      this.$router.push({path:'/znl',query:{pic:this.article.iconPath,fxtitle:this.article.title,mp3path:this.article.mp3_path}});
    },
    actlike(){
      this.$http.post('knowledge/knowledgeService/attention',{
        "subData":{
          "knowledgeId":this.$route.query.id
        }
      }).then(res=>{
        if(res.data.code == 1){
        this.islike = true;
        // this.exprotDetail.attentionNum++
      }

    })
    },
    actunlike(){//取消关注
      this.$http.post('knowledge/knowledgeService/attention/cancel',{
        "subData":{
          "knowledgeId":this.$route.query.id
        }
      }).then(res=>{
        if(res.data.code == 1){
        this.islike = false;
        // this.exprotDetail.attentionNum--
      }
    })
    },
    //
    getkonwlege(){
      this.$http.post('knowledge/knowledgeService/relKnowledges',{
        "subData":{
          "resourceId":this.$route.query.id,
          "pageSize":5,
          "pageNum":1
        }
      }).then(res=>{
        if(res.data.code == 1){
          this.knowledgeListData = res.data.data.list;
        }

      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    getcuuiculu(){
      this.$http.post('knowledge/knowledgeService/relCurriculum',{
        "subData":{
          "resourceId":this.$route.query.id,
          "pageSize":5,
          "pageNum":1
        }
      }).then(res=>{
        if(res.data.code == 1){
          this.cuuiculu = res.data.data.list;
        }

      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
    getgoods(){
      this.$http.post('knowledge/knowledgeService/relGoods',{
        "subData":{
          "resourceId":this.$route.query.id,
          "pageSize":5,
          "pageNum":1
        }
      }).then(res=>{
        if(res.data.code == 1){
          this.goods = res.data.data.list;
        }

      // alert(JSON.stringify(this.exprotDetail.extags))
    })
    },
	getexperts(){
      this.$http.post('knowledge/knowledgeService/relExpert',{
        "subData":{
          "resourceId":this.$route.query.id,
          "pageSize":5,
          "pageNum":1
        }
      }).then(res=>{
        if(res.data.code == 1){
          this.experts = res.data.data.list;
        }

      // alert(JSON.stringify(this.exprotDetail.extags))
    })
	},

	addhis(){
      this.$http.post('knowledge/knowledgeService/relExpert',{
        "subData":{
          "knowledgeId":this.$route.query.id,
          "pageSize":5,
          "pageNum":1
        }
      }).then(res=>{
        this.experts = res.data.data.list;
      // alert(JSON.stringify(this.exprotDetail.extags))
    })

	}

  },

  mounted() {
    this.getisguanzhu();
  	this.$http.post('knowledge/knowledgeService/detail',{
  		"subData":{
  			"knowledgeId": this.$route.query.id
  		}
  		}).then(res => {
      if(res.data.code !=1){
        this.$router.replace({path:'/noresource'});
      }
  		console.log(res.data)
  		this.article=res.data.data;
  		this.relInfo.title=this.article.title;
      this.relInfo.id=this.$route.query.id;
  		this.aloading = true;
		if(this.article.like){
  		  this.islike = true;
		}else{
  		  this.islike = false;
		}

		  var fxtitle  = this.article.title;
		  if(this.article.mp3_path){
        fxtitle = '【附语音】'+fxtitle;
      }

      var shareJson={
        type:1,
        title:fxtitle,
        desc:'财合税专家咨询平台',
        link:'/#/knowledge-detail?id='+this.$route.query.id,
        imgUrl:this.article.iconPath?this.article.iconPath:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:fxtitle,
        desc:'财合税专家咨询平台',
        link:'/#/knowledge-detail?id='+this.$route.query.id,
        imgUrl:this.article.iconPath?this.article.iconPath:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);

      if(this.article.type == 128 && this.article.mp3_path){
        this.playVoice();
      }
            //this.classType =res.data
          // if(res.code == 0){
          //   storage.set('USER_INFO', JSON.stringify(res.data))
          //   storage.set('WX_UID', res.data.openid)
          //   window.location.replace('/')
          // }
        })

	this.getgoods();
  	this.getkonwlege();
  	this.getcuuiculu();
  	this.getgoods();
  	this.getexperts();
  	// this.addhis();

      //
  }
}
</script>
<style lang="scss" scoped>
  .guanzhuma{
    margin-top: 30px;
    img{
      width:100%;
    }
    padding:20px 0;
  }
  .falv{
    border-bottom: 1px solid #EEE;
    padding:0 0 15px 0;
    margin-bottom: 20px;

  }
  .bq_items{
    font-size:20px;
    color:#999;
  }
	.guanzhu {text-align: center;padding-top:50px;
		.ht {text-align: center;
      display: inline-block;


			p{font-size:20px;}
		}
    div{
      display: inline-block;
      margin:0 20px;
      .cimg{
        height:50px;
        img{width:45px; display: inline-block; margin: 0 auto;}
      }
      p{
        font-size:20px;
      }

    }
    .haibao{
      img{
        width:45px;
      }
    }

	}
.know-detail{
	background-color: #f6f6f6;

	h1{
		font-size:34px;
		color:#030303;
		line-height:48px;
		text-align: center;
		padding: 32px 0 30px;
		background-color: #fff;
	}

	h2{
		font-size:28px;
		color:#333;
		line-height:40px;
		padding: 26px 0;
		border-bottom: 1px solid #ddd;
	}

	.article{
		background-color: #fff;
		padding: 0 24px 60px;
		margin-bottom: 24px;

    .voice{
      position: fixed;
      width:80px;
      height:80px;
      background:rgb(158, 115, 73);

      right:20px; top:90px;
      overflow: hidden;
      z-index: 999;
      -webkit-border-radius: 1000px;
      -moz-border-radius: 1000px;
      border-radius: 1000px;
      .voicec{
        position: relative;
        width:80px;
        height:80px;
        .playSoundBtn{
          width:50px;
          height:50px;
          position: absolute;
          z-index: 99;
          left:15px;

          top:15px;
          background:#FFF;
          -webkit-border-radius: 1000px;
          -moz-border-radius: 1000px;
          border-radius: 1000px;

          .playSounding{
            animation:mymove22 5s infinite linear;
            @keyframes mymove22
            {
              0%{  transform: rotate(0deg);}

              100%{ transform: rotate(360deg);}
            }
          }

          img{
            position:relative;
            top:6px;
            width:80%;
            height:80%;


          }

        }
        .playSoundPic{
          position: absolute;
          z-index: 8;
          width:71px;
          height:71px;
          text-align:center;
          left:4px;
          top:4px;
          z-index:5;
          .playSounding{
            animation:mymove22 5s infinite linear;
            @keyframes mymove22
            {
              0%{  transform: rotate(0deg);}

              100%{ transform: rotate(360deg);}
            }
          }
          img{
            width:80%;
            height:80%;
            position: relative;
            top:5px;
            left:-2px;

          }
        }
      }
    }
	}

	.detail{
    /*moz-user-select: -moz-none;*/
    /*-moz-user-select: none;*/
    /*-o-user-select: none;*/
    /*-khtml-user-select: none;*/
    /*-webkit-user-select: none;*/
    /*-ms-user-select: none;*/
    /*user-select: none;*/
		border-top: 1px solid #ddd;
		padding-top: 34px;

		.sub{
			color: #999;
			font-size:22px;
			line-height:32px;
			position: relative;
			margin-bottom: 24px;

			.date{
				font-size:22px;
				line-height:32px;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
    #procontent{
      background:url("./imgs/shuiyin.png") repeat;
      background-size: 200px 200px;
      /*-webkit-mask-image: -webkit-linear-gradient(top, rgba(0,0,0,1), rgba(0,0,0,0));*/
      margin:0;
      padding:20px;
      position: relative;
      #zhe{
        background: -webkit-linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,1));
        position: absolute;
        height:100%;
        left:0;
        width:100%;
        top:0;
        span{border:2px solid #a38a64; display: inline-block; width:300px; color:#b5935c;border-radius: 10px;padding: 10px 5px;
          position: absolute; text-align: center;
          font-size:25px;
          left:50%;margin-left:-150px;
        bottom: -20px;
          a{
            color: #b5935c;
          }
        }
      }
      #zhishi{


        span{
          background: none;
        }
        p{
          span{background: none;}
        }
      }
    }

		.txt{

			font-size:26px;
			color:#333;
			line-height:45px;
			text-align: justify;
			display: inline-block;
		    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 1)), to(rgba(255, 255, 255, 1)));
		    -webkit-background-clip: text;
		    /*-webkit-text-fill-color: transparent;*/
		}
		.lbtn{

			.save-btn{
				display: block;
			    /* margin: 1rem 0; */
			    background-color: #fff;
			    color: #C9A063;
			    text-align: center;
			    height: 25pt;
			    line-height: 25pt;
			    width: 50%;
			    border-radius: 3pt;
			    font-size: 12pt;
			    margin-left: 24%;
			    margin-top:15pt;
			    border:1pt solid #C9A063;
			}
		}
	}

	.experts{
		background-color: #fff;
		padding: 0 24px;
		padding-bottom: 25px;
		margin-bottom: 24px;

		.descs{
			position: relative;
			padding: 24px 160px 24px 120px;
		}

		img{
			position: absolute;
			width: 90px;
			height: 90px;
			top: 24px;
			left: 0;
			border-radius: 90px;
		}

		.t{
			font-size:24px;
			color:#666;
			line-height:34px;
			margin-bottom: 12px;
			span{
				font-size:28px;
				color:#333;
				line-height:40px;
			}
		}
		.desc{
			font-size:24px;
			color:#666;
			line-height:34px;
			margin-bottom: 14px;
		}
		.tags span{
			display: inline-block;
			background:#DCBD60;
			font-size:22px;
			color:#fff;
			line-height:32px;
			padding: 2px 22px;
			margin-right: 30px;
			border-radius: 36px;
		}
		.zx{
			position: absolute;
			top: 36px;
			right: 0;
			font-size:28px;
			color:#C9A063;
			line-height:40px;
		}
	}

	.btm{
		padding: 0 24px;
		background-color: #fff;
	}

	.block{
		position: relative;
		overflow: hidden;
		padding: 26px 0 22px;

		img{
			float: left;
			width: 226px;
			height: 226px;
			top: 26px;
			left: 0;
			border-radius: 8px;
		}
		h3{
			padding-left: 250px;
			font-size:28px;
			color:rgba(51,51,51,1);
			line-height:40px;
			margin-bottom: 20px;
		}
		h4{
			padding-left: 250px;
			font-size:24px;
			color:rgba(102,102,102,1);
			line-height:34px;
			margin-bottom: 14px;

			span{
				font-size:24px;
				color:rgba(51,51,51,1);
			}
		}
		.desc{
			padding-left: 250px;
			font-size:24px;
			color:rgba(153,153,153,1);
			line-height:34px;
			text-align: justify;
		}
		.money{
			padding: 12px 0 0 250px;
			font-size:28px;
			color:rgba(255,170,64,1);
			line-height:34px;
		}
		.learn{
			position: absolute;
			right: 0;
			bottom: 22px;
			background:rgba(201,160,99,1);
			border-radius:8px;
			font-size:26px;
			color:rgba(255,255,255,1);
			line-height:36px;
			padding: 12px 20px;
		}
	}

	.list{
		margin: 0 -11px;
	}

	.recs{
		float: left;
		width: 50%;
		padding: 0 11px 20px;

		img{
			display: block;
			width: 100%;
			height: 220px;
			border-radius: 8px;
		}

		p{
			padding: 20px 0;
		}

		.t{
			float: left;
			font-size:26px;
			line-height:36px;
			color:rgba(47,47,47,1);
		}
		.m{
			float: right;
			margin-top: 4px;
			font-size:26px;
			color:rgba(255,170,64,1);
			line-height:32px;
		}
	}

	.question{
		width: 320px;
		padding: 10px 0;
		text-align: center;
		font-size:28px;
		color:rgba(51,51,51,1);
		line-height:40px;
		border-radius:8px;
		border:1px solid rgba(151,151,151,1);
		margin: 20px auto 80px;
	}
}
</style>
