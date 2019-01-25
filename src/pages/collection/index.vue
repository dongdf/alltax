<template><div>
    <div class="zixun"><img @click="wirteForm" src="./img/zixun.png" style="width:80px;" > </div>
    <div class="autoimg" v-show="!$route.query.pos">
        <img class="autowidth" @click="callCus" style="width:100%;" src="./img/p1.png"/>
        <img class="autowidth" style="width:100%;" src="./img/p2.png"/>
        <img class="autowidth" style="width:100%;" src="./img/p3.png"/>
        <img class="autowidth" style="width:100%;" src="./img/p4.png"/>
        <img class="autowidth" style="width:100%;" src="./img/p5.png"/>
        <img class="autowidth" style="width:100%;" src="./img/p6.png"/>
    </div>
    <div class="page-field" id="forms">
        <div class="page-title">企业信息</div>

       <div style="color:#c69d62;background: #FFF; background: #FFF; padding:10px; text-align: center">以下内容我们将采取严格的保密措施，请您放心填写</div>
      <!--<div class="page-title"> <div class="itemTitle"><img src="./img/i7.png">联系方式</div></div>-->
      <div class="page-part" style="margin-top:30px;">
        <div class="itemTitle"><img src="./img/i7.png">联系方式</div>

        <mt-field label="姓名" placeholder="请输入姓名" v-model="info.name" type="text"></mt-field>
        <mt-field label="电话" placeholder="请输入电话" v-model="info.phone" type="number"></mt-field>


      </div>
      <br>

        <div class="page-part">
            <div class="itemTitle"><img src="./img/i1.png"> 企业名称</div>
            <mt-field placeholder="请输入企业名称" v-model="info.companyName" type="text"></mt-field>
            <div class="itemTitle"><img src="./img/i2.png">经营范围</div>
            <mt-field  placeholder="请输入经营范围" v-model="info.busScope" type="textarea" rows="4"></mt-field>
            <div class="itemTitle"><img src="./img/i3.png">年缴纳企业所得税税额（<span>万元</span>）</div>
            <mt-field placeholder="请输入年缴纳企业所得税税额" type="number" v-model="info.companyCit"></mt-field>
            <div class="itemTitle"><img src="./img/i4.png">年缴纳增值税税额（<span>万元</span>）</div>
            <mt-field placeholder="请输入年缴纳增值税税额" v-model="info.vatForYear" type="number"></mt-field>
            <div class="itemTitle"><img src="./img/i3.png">年缴纳个人所得税税额（<span>万元</span>）</div>
            <mt-field placeholder="请输入年缴纳个人所得税税额" v-model="info.personCit" type="number"></mt-field>

            <div class="itemTitle"><img src="./img/i5.png">项目背景</div>
            <mt-field placeholder="请输入项目背景" v-model="info.projectBackground" type="textarea" rows="4"></mt-field>

            <div class="itemTitle"><img src="./img/i6.png">客户诉求</div>
            <mt-field placeholder="请输入" v-model="info.customerDemand" type="textarea" rows="4"></mt-field>

        </div>








    </div>
    <div class="btnw">
        <mt-button  @click.native="collectionSubmit" class="btns" size="large">提交资料</mt-button>
    </div>
</div>
</template>

<script>

  export default {
    name: 'index',
    data(){
      return{
        info:{
          name:'',
          phone:'',
          companyName:'',
          busScope:'',
          companyCit:'',
          personCit:'',
          vatForYear:'',
          projectBackground:'',
          customerDemand:''
        }

      }
    },
    mounted(){

      $(function () {
        var s = $('#forms').offset().top-500;
        $(window).scroll(function(){//开始监听滚动条
          var topp = $('html,body').scrollTop();
          if(topp > s){
           $('.zixun').hide()
          }else{
            $('.zixun').show()
          }
        })
      })
      this.$nextTick(()=>{
        if(this.$route.query.pos){
          var st = document.getElementById('forms').offsetTop;
          setTimeout(()=>{

            $('html,body').animate({"scrollTop":st},200);
          },200)

        }
      })



    },
    methods:{
      callCus(){
        location.href="tel:4008-600-366"
      },
      wirteForm(){
        var s = document.getElementById('forms').offsetTop;
        // jquery('body,html').scrollTop(s);
        $('html,body').animate({"scrollTop":s},200);
        // document.documentElement.scrollTop =s;
      },
      collectionSubmit(){
        // if(this.info.name && this.info.phone && this.info.companyName && this.info.busScope && this.info.companyCIT && this.info.personCIT && this.info.vatForYear && this.projectBackground && this.info.customerDemand){
          let reg = /^(((14[0-9]{1})|(13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          let phone = this.info.phone.trim();


        if (!this.info.name.trim()) {
          this.$toast("请填写姓名！");
          return false;
        }
        if (!phone) {
          this.$toast("请填写手机或固话");
          return false;
        }
        if (!this.info.companyName.trim()) {
          this.$toast("请填写企业名称");
          return false;
        }
        if (!this.info.customerDemand.trim()) {
          this.$toast("请填写客户诉求");
          return false;
        }

          this.$http.post('user/expertGroupService/insert',this.info).then(res => {
            if (res.data.code == 1){
              this.$messagebox.alert('提交成功，请等待', '提示').then(action => {
                this.$router.push({path:'/'});
              });
            }else{
              //
            }
          })
        // }else{
        //   this.$toast('请填写完整');
        // }
        // this.$http.baseURL = 'http://192.168.1.210:16801/'


      }
    }
  };
</script>
<style lang="scss" scoped>

    .zixun{
        z-index: 9999;
        position: fixed;
        right:12%;
        width:80px;
        height:80px;
        bottom:500px;
        img {width:100%;}
    }
    .autowidth { width:100%;}

    .itemTitle { padding:10px; margin-top:10px; }
    .page-title { padding:20px;text-align: center; background:#fff;       color: #333;

        font-weight:bold; font-size: 30px; border-bottom:1px solid #eee;}
    .mint-field {border-bottom:1px solid #EEE; padding:15px 0;}
    .btns { background: #C9A063; color:#FFF; padding:20px; overflow:visible; height: auto; font-size:35px;font-weight: bold; }
    .btnw {padding:15px; background:#F8F8F8;}

</style>
