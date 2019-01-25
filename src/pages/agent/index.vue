<template>
    <div id="agentinfodiv">
		<div id="expertinfo">
			<ul>
				<li class="clearfix">
					<a href="javascript:void(0);">
					<span class="left">头像</span>

					<!--<img  class="right" src="./img/jiantou.png">-->
						<i><img  class="right1" style="border-radius: 10000px" :src="mineInfo.headimg_url"></i>
					</a>
				</li>
				<li class="sxian">
					<img src="./img/xian.png">
				</li>
				<li class="clearfix">
					<a href="javascript:void(0);">
					<span class="left">昵称</span>

					<!--<img  class="right" src="./img/jiantou.png">-->
					<span class="right1">
						 {{mineInfo.nick_name}}
					</span>
					</a>
				</li>
				<li class="sxian">
					<img src="./img/xian.png">
				</li>
				<li class="clearfix">
					<a href="javascript:void(0);">
						<span class="left">姓名</span>

						<!--<img  class="right" src="./img/jiantou.png">-->
						<span class="right1">
						{{mineInfo.real_name}}
					</span>
					</a>
				</li>
				<li class="sxian">
					<img src="./img/xian.png">
				</li>
				<li class="clearfix">
					<a href="javascript:void(0);">
					<span class="left">手机号</span>
					<span class="right1">
						<a v-show="mineInfo.mobile">{{mineInfo.mobile}}</a><router-link  v-show="!mineInfo.mobile" :to="{path:'/login'}">点击完善信息</router-link>
					</span>
					</a>
				</li>
				<li class="sxian">
					<img src="./img/xian.png">
				</li>
				<li class="clearfix">
					<a href="javascript:void(0);">
						<span class="left">公司名称</span>
						<span class="right1">
						 {{mineInfo.company_name}}
					</span>
					</a>
				</li>
				<!--<li class="sxian">-->
					<!--<img src="./img/xian.png">-->
				<!--</li>-->
				<!--<li class="clearfix">-->
					<!--<a href="javascript:void(0);">-->
					<!--<span class="left">擅长行业</span>-->
					<!--<span class="right1">-->
						<!--税务 金融-->
					<!--</span>-->
					<!--</a>-->
				<!--</li>-->
				<!--<li class="sxian">-->
					<!--<img src="./img/xian.png">-->
				<!--</li>-->
				<!--<li class="clearfix">-->
					<!--<a href="javascript:void(0);">-->
					<!--<span class="left">擅长类型</span>-->
					<!--<span class="right1">-->
						<!---->
					<!--</span>-->
					<!--</a>-->
				<!--</li>-->
				<li class="sxian">
					<img src="./img/xian.png">
				</li>
				<li class="clearfix">
					<a href="javascript:void(0);">
					<span class="left">所在地区</span>
					<span class="right1">
						{{ownArea.name1}}{{ownArea.name2}}{{ownArea.name3}}
					</span>
					</a>
				</li>

			</ul>
		</div>

			<!-- <div class="save-btn">
				提交
			</div> -->


    </div>



</template>

<script>
  import mabao from '@/components/area/area.json'
export default {
    data() {
        return {
        	value:'请输入用户民',
          mineInfo:{},
          ownArea:{}
        }
    },
    components: {

    //
  },
  mounted(){
      this.getmineInfo();
    this.ownArea = {
      name1:'',
      name2:'',
      name3:''
    }
  },
    methods: {
      getmineInfo(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
        this.convertArea();
      })
      },
      convertArea(){
        let that = this;
        // console.log(that.mineInfo.company_province.substring(0,2))
        if(!that.mineInfo.company_province){
          this.ownArea.name1 = '';
          this.ownArea.name2 = '';
          this.ownArea.name3 = '';
        }
        if(that.mineInfo.company_province ===999999){
          this.ownArea.name1 = '全国';
          this.ownArea.name2 = '';
          this.ownArea.name3 = '';
        }else{
          let t1 = mabao.find(function (x) {
            return x.code == that.mineInfo.company_province.substring(0,2)
          })
          this.ownArea.name1 = t1.name;
          let t2 = t1.children.find(function (x) {
            return x.code == that.mineInfo.company_city.substring(0,4)
          })
          this.ownArea.name2 = t2.name;
          let t3 = t2.children.find(function (x) {
            return x.code == that.mineInfo.company_country
          })
          this.ownArea.name3 = t3.name;

        }

      },
    	goNext(){
    		this.$router.push({path: 'compelete', query: this.$route.query})
    	}

    }
}
</script>

<style lang="scss" scoped>
#agentinfodiv{
.save-btn{
	display: block;
    margin: 1rem 0;
    background-color: #C9A063;
    color: #fff;
    text-align: center;
    height: 33pt;
    line-height: 33pt;
    width: 75%;
    border-radius: 3pt;
    font-size: 17pt;
        margin-left: 12%;
}
.clearfix {
    content: "";
    display: block;
    clear: both;
    padding-left: 5%;
    padding-top: 3%;
}
#expertinfo{
	background-color: #fff;
	ul{
		padding-top: 3%;
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
				i{
					margin:0;  border-radius: 1000px; display: inline-block; margin-right:15px; float: right; width:1rem; height:1rem; overflow: hidden;
					img{width:100%;height:100%;}
				}
				a{color:#b5935c;}
			}
			.left{
				float: left;
				height: .5rem;
    margin-right: .5rem;
			}
			.right{
				float:right;
			    height: .5rem;
			    padding-right: 5%;
			    margin-top: 3%;
			}
			.right1{
				float:right;
			    height: 1rem;
			    padding-right: 5%
			}
		}
	}
}
}
</style>












