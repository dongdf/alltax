<template>
  <div id="auth">
    <div style="text-align: center; padding-top:20%;">授权中...<br>请允许,否则无法正常访问</div>
    <div style="text-align: center; color:#red;font-weight: bold; padding-top:20%;" v-show="shouquanShow">{{error}}</div>
  </div>
</template>

<script>

import {OPEN_AUTH_URL,REDIRECT_URL} from '@/constants'
import {isWeChat, storage} from '@/utils/tools'
import $http from '@/utils/http'

export default {
  data() {
    return {
      shouquanShow:false,
      error:''
      //
    }
  },
  methods: {
    //
  },
  mounted() {

    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var q = window.location.pathname.substr(1).match(reg_rewrite);
      if(r != null){
        return unescape(r[2]);
      }else if(q != null){
        return unescape(q[2]);
      }else{
        return '';
      }
    }
    function getUrlname(orgPage,name) {
      try{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var pids = '';
        var temp;
        if(orgPage.split('?')[1]){
          if(orgPage.split('?')[1].match(reg)){
            temp=orgPage.split('?')[1].match(reg);
          }else{
            temp=orgPage.split('?')[2].match(reg);
          }
          // var temp=orgPage.split('?')[1].match(reg);
          if(temp != null){
            pids =  unescape(temp[2]);
          }else{
            pids='';
          }
          return pids;
        }
      }catch(err){
        return '';
      }
    }
    const code = getQueryString('code')?getQueryString('code'):this.$route.query.code;
    const los = localStorage.getItem('WX_UID');
    if(!los){
      if(code){
        var orgPage = localStorage.getItem('llrouterUrl')?localStorage.getItem('llrouterUrl'):REDIRECT_URL;
        var pids,mobile;
        // alert(orgPage);
        if(orgPage.indexOf('fxopenid')>=0){
          pids = getUrlname(orgPage,'fxopenid');
        }
        if(orgPage.indexOf('mobile')>=0){
          mobile = getUrlname(orgPage,'mobile');
        }
        // alert('fxopenid' + pids);
        // alert('mobile' + mobile);
        this.$http.post('/authentication/weChatAut/userinfo', {code:code,popenId:pids,mobile:mobile}).then(res => {
          // console.log(res.data);
          if(res.data.code == 0){
            storage.set('USER_INFO', JSON.stringify(res.data.data))
            storage.set('WX_UID', res.data.data.openid)
            let page = localStorage.getItem('orgPage')?localStorage.getItem('orgPage'):'';
            let pageQuery = localStorage.getItem('boss')?localStorage.getItem('boss'):'';
            if(page){
              this.$router.push({name:page,query:{boss:pageQuery}});
            }else{
              window.location.replace(orgPage);
            }
          }else{
            this.shouquanShow = true;
            this.error = res.data;
          }
        },(e)=>{
          this.shouquanShow = true;
          this.error = '服务器开小差，请关闭后重新进入';
          // alert(JSON.stringify(e));
        })
      } else {
        window.location.replace(OPEN_AUTH_URL);
      }

    }else{
      this.$router.push({path:'/home'});
    }
  }
}
</script>

<style lang="scss">
#auth{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  padding-top: 80px;

  .tip{
    color: #fff;
    padding: 20px;
    max-width: 200px;
    text-align: center;
    margin: auto;
    background-color: rgba(0,0,0,.6);
    border-radius: 8px;
  }
}
</style>
