<template>
    <div id="agentinfodiv">
        <div id="expertinfo">
            <ul class="actionList">
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">会员头像</span>
                    <!--<img  class="right" src="./img/jiantou.png">-->
                    <i ><img   :src="mineInfo.headimg_url"></i>
                    </a>
                </li>
                <li>
                    <a @click="edit(1)">
                    <span class="left">会员昵称</span>

                    <!--<img  class="right" src="./img/jiantou.png">-->
                    <span class="right1">
                        {{mineInfo.nick_name}}
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">会员手机号</span>
                    <span class="right1">
                        <a v-show="mineInfo.mobile">{{mineInfo.mobile}}</a><router-link  v-show="!mineInfo.mobile" :to="{path:'/login'}">点击完善信息</router-link>
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">公司名称</span>
                    <span class="right1">
                        {{mineInfo.company_name}}
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">所在地区</span>
                    <span class="right1">
                        {{ownArea.name1}}{{ownArea.name2}}{{ownArea.name3}}
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">注册资本</span>
                    <span class="right1">
                       {{mineInfo.company_money}}
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">员工人数</span>
                    <span class="right1">
                       {{mineInfo.company_scale}}
                    </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <span class="left">地址</span>
                    <span class="right1">
                       {{mineInfo.company_address}}
                    </span>
                    </a>
                </li>
                <!--<li>-->
                    <!--<a href="javascript:void(0);">-->
                    <!--<span class="left">网址</span>-->
                    <!--<span class="right1">-->
                       <!---->
                    <!--</span>-->
                    <!--</a>-->
                <!--</li>-->
            </ul>
        </div>
        <!--<div class="darkBtn">-->
            <!--提交-->
        <!--</div>-->
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import mabao from '@/components/area/area.json'
export default {
    data() {
        return {
            value: '请输入用户民',
          mineInfo:{},
          ownArea:{}
        }
    },
    components: {
        tabbar
        //
    },
   mounted(){
      this.getmineInfo();

      this.ownArea = {
        name1:'',
        name2:'市辖区',
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
      edit(type){
        if(type == 1){

        }
      },
        goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
        }

    }
}
</script>
<style lang="scss">

#agentinfodiv{

    .actionList {
        width:100%;
        background-color: #fff;
        padding: 0 10pt;
        li {
            padding: 5pt 3pt;
            border-bottom: 1pt solid rgba(211, 211, 211, 0.3);
            a {
                display: inline-block;

                width: 100%;
                line-height: 30pt;
                i{
                    margin:0;  border-radius: 1000px; display: inline-block; margin-right:15px; float: right; width:1rem; height:1rem; overflow: hidden;
                    img{width:100%;height:100%;}
                }
                a{color:#b5935c;}
            }
            .left {
                float: left;
                height: .5rem;
                margin-right: .5rem;
            }
            .right {
                float: right;
                height: .5rem;
                padding-right: 5%;
                margin-top: 3%;
            }
            .right1 {
                float: right;
                height: 1rem;
                padding-right: 5%
            }
        }
    }
}
</style>
