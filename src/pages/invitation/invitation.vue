<template><div>
    <div class="page-field">
        <div class="page-title">销售人员申请</div>


        <div class="page-part">
            <div class="itemTitle">姓名</div>
            <mt-field placeholder="请输入姓名" v-model="info.name" type="text"></mt-field>
            <div class="itemTitle">手机</div>
            <mt-field placeholder="请输入手机" type="number" v-model="info.phone"></mt-field>

            <div style="position: relative"><mt-field placeholder="请输入验证码" type="number" v-model="info.phoneCode">

            </mt-field>
                <div class="cds" v-show="!issendsss" @click="getphoneCode">获取验证码</div>
                <div class="cds" style="color: #999;" v-show="issendsss">{{messageShow}}</div>
            </div>



        </div>

        <area/>

    </div>
    <div class="btnw">
        <mt-button  @click.native="collectionSubmit" class="btns" size="large">加入</mt-button>
    </div>
</div>
</template>

<script>

  export default {
    name: 'invitation',
    data(){
      return{
        info:{
          name:'',
          phone:'',
          phoneCode:'',
        },areaShow:false,
        selectArea:{
          province:null,
          city:null,
          county:null,

        },
        sec:120,
        messageShow:'',
        issendsss:false,
        time:null,
        btype:''

      }
    },
    components:{},
    mounted(){
      const WX_UID = localStorage.getItem('WX_UID')?localStorage.getItem('WX_UID'):'';
      let boss = this.$route.query.boss;
      localStorage.setItem('orgPage','invitation');
      if(boss){
        localStorage.setItem('boss',boss);
      }

      if(!WX_UID){
        this.$router.push({path:'/auth'});
      }
      if(WX_UID){
        var type = localStorage.getItem('boss')?localStorage.getItem('boss'):'';
        this.btype = type;
        if(!type){
          this.$toast('参数错误,请重新打开');
          return false;
        }
      }

    },
    methods:{
      getphoneCode(){
        var phone = this.info.phone.trim();

        if(!this.$options.filters.isphone(phone)){
          this.$toast("请填写正确的手机号码！");
          return false;
        }
        if(this.issendsss){
          return false;
        }
        this.issendsss = true;

        this.$http.post('user/userService/sendSMS', {
          "subData": { "mobile": this.info.phone }
        }).then(res => {
          //console.log(res.data)
          if(res.data.code == 1){

          this.issendsss = true;
          this.messageShow = this.sec+"S";
          this.sec--
          this.timer = setInterval(()=>{
            this.messageShow = this.sec+"S";
          this.sec--;
          if(this.sec == 1){
            clearInterval(this.timer);
            this.issendsss = false;
            this.sec=120;
          }

        },1000)

        }else{
          this.issendsss = false;
          this.$toast(res.data.msg);
        }

      })




      },
      collectionSubmit(){
        // if(this.info.name && this.info.phone && this.info.companyName && this.info.busScope && this.info.companyCIT && this.info.personCIT && this.info.vatForYear && this.projectBackground && this.info.customerDemand){

        let phone = this.info.phone.trim();


        if (!this.info.name.trim()) {
          this.$toast("请填写姓名！");
          return false;
        }
        if(!this.$options.filters.isphone(phone)){
          this.$toast("请填写正确的手机号码！");
          return false;
        }
        if(!this.info.phoneCode.trim()){
          this.$toast("请填写验证码！");
          return false;
        }

        this.$http.post('user/userService/applyEmplyee',{
          subData:{
            agent_name:this.info.name,   //专家姓名
            agent_moblie:this.info.phone,      //专家电话
            agent_company:'',      //专家公司
            agent_province:'',     //专家省份
            agent_city:'',    //专家城市
            agent_country:'',
            popenId:this.btype,
            code:this.info.phoneCode
          }
        }).then(res => {
          if (res.data.code == 1){
          this.$toast('提交成功，即将前往首页');

          this.clearStore();
          setTimeout(()=>{
            this.$router.push('/home');
        },1000)
        }else{
          this.$toast(res.data.msg);
          //
        }


      })
    },
      clearStore(){
        localStorage.removeItem('orgPage');
        localStorage.removeItem('boss')
      }
    }
  };
</script>
<style lang="scss" scoped>
.cds {
    position: absolute;
top:20px; right:20px;
}
    .itemTitle { padding:10px; margin-top:10px; }
    .page-title { padding:20px;text-align: center; background:#fff;       color: #333;

        font-weight:bold; font-size: 30px; border-bottom:1px solid #eee;}
    .mint-field {border-bottom:1px solid #EEE; padding:15px 0;}
    .btns { background: #C9A063; color:#FFF; padding:20px; overflow:visible; height: auto; font-size:35px;font-weight: bold; }
    .btnw {padding:15px; background:#F8F8F8;}

</style>
