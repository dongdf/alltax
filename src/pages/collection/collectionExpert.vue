<template><div>
    <!--<div class="zixun"><img @click="wirteForm" src="./img/zixun.png" style="width:80px;" > </div>-->
    <!--<div class="autoimg" v-show="!$route.query.pos">-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p1.png"/>-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p2.png"/>-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p3.png"/>-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p4.png"/>-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p5.png"/>-->
        <!--<img class="autowidth" style="width:100%;" src="./img/p6.png"/>-->
    <!--</div>-->
    <div class="page-field" id="forms">
        <div class="page-title">财合税（北京）信息技术有限公司师资库</div>

       <div style="color:#c69d62;background: #FFF; background: #FFF; padding:10px; text-align: center">以下内容我们将采取严格的保密措施，请您放心填写</div>
      <!--<div class="page-title"> <div class="itemTitle"><img src="./img/i7.png">联系方式</div></div>-->
      <div class="page-part" style="margin-top:10px;">
        <div class="itemTitle">
          <!--<img src="./img/i7.png">-->
          <b>基本信息</b></div>

          <mt-field label="姓名" placeholder="请输入姓名" v-model="info.name" type="text"></mt-field>
          <mt-field label="性别" placeholder="请输入性别" v-model="info.sex" type="text"></mt-field>
          <mt-field label="民族" placeholder="请输入民族" v-model="info.nation" type="text"></mt-field>
          <mt-field label="电话" placeholder="请输入电话" v-model="info.phone" type="text"></mt-field>
          <mt-field label="邮箱" placeholder="请输入邮箱" v-model="info.email" type="text"></mt-field>


      </div>


      <div class="page-part" >
        <div class="itemTitle">
          <!--<img src="./img/i7.png">-->
          <b>现任职单位及职称</b></div>

        <mt-field   placeholder="请输入现任职单位及职称" v-model="info.companyName" rows="4" type="textarea"></mt-field>

        <div class="itemTitle"><b>个人简介</b></div>
        <mt-field  placeholder="请输入个人简介" v-model="info.profile" type="textarea" rows="4"></mt-field>
        <div class="itemTitle"><b>上传形象照</b></div>
        <div class="upbgs"><csupload ref="csupload" :max="1"></csupload></div>

      </div>


      <br>
      <div class="page-part">
        <div class="itemTitle"><b>可授课方向</b></div>
        <div class="uprds"><b @click="selobj(item)" v-for="item in fxitems" :class="item.ckd?'ckd':''"><i ></i>{{item.name}}</b></div>
        <div class="itemTitle"><b>课程选题</b></div>
        <mt-field  placeholder="请输入课程选题" v-model="info.topicSelection" type="textarea" rows="4"></mt-field>


      </div>











    </div>
    <div class="btnw">
        <mt-button  @click.native="collectionSubmit" class="btns" size="large">提交资料</mt-button>
    </div>
</div>
</template>

<script>
  import csupload from '@/components/csupload'
  export default {
    name: 'index',
    data(){
      return{
        fxitems:[
          {name:'财税',id:1,ckd:false},
          {name:'法律',id:2,ckd:false},
          {name:'其它',id:3,ckd:false}
        ],
        itemSelect:{},
        info:{
          name:'',
          phone:'',
          companyName:'',
          nation:'',
          sex:'',
          email:'',
          profile:'',
          pic_url:'',
          direction:'',
          topicSelection:''
        }

      }
    },
    components:{csupload},
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
      selobj(obj){
        var idx = this.fxitems.findIndex(function (item) {
          return item.id === obj.id;
        })

        for(var i in this.fxitems){
          this.fxitems[i].ckd = false;
        }
        this.fxitems[idx].ckd = true;
        this.itemSelect = obj;
      },
      wirteForm(){
        var s = document.getElementById('forms').offsetTop;
        // jquery('body,html').scrollTop(s);
        $('html,body').animate({"scrollTop":s},200);
        // document.documentElement.scrollTop =s;
      },
      collectionSubmit(){

        if(this.$refs.csupload.tempImgs.length>0 && this.$refs.csupload.tempImgs[0].url){
          this.info.pic_url=this.$refs.csupload.tempImgs[0].url;
        }
        // alert(JSON.stringify(this.$refs.csupload.tempImgs));
        this.info.direction = this.itemSelect.name;

        if (!this.info.name.trim()) {
          this.$toast("请填写姓名！");
          return false;
        }
        if (!this.info.sex.trim()) {
          this.$toast("请填写性别！");
          return false;
        }
        if (!this.info.nation.trim()) {
          this.$toast("请填写民族！");
          return false;
        }
        if (!this.$options.filters.isphone(this.info.phone)) {
          this.$toast("请填写正确的手机号码！");
          return false;
        }

        if (!this.info.email.trim()) {
          this.$toast("请填写邮箱！");
          return false;
        }
        if (!this.info.companyName.trim()) {
          this.$toast("请填写现任职单位及职称！");
          return false;
        }
        if (!this.info.profile.trim()) {
          this.$toast("请填写个人简介！");
          return false;
        }
        if (!this.info.pic_url.trim()) {
          this.$toast("请上传形象照！");
          return false;
        }
        if(!this.info.direction){
          this.$toast("请选择授课方向");
          return false;
        }
        if (!this.info.topicSelection.trim()) {
          this.$toast("请填写课程选题！");
          return false;
        }



          this.$http.post('user/lecturerGroupInfoService/insert',this.info).then(res => {
            if (res.data.code == 1){
              this.$messagebox.alert('提交成功，请等待', '提示').then(action => {
                this.$router.push({path:'/'});
              });
            }else{
              this.$messagebox.alert(res.data.msg)
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
  .upbgs{
    padding:20px;
    background: #FFF;
  }
  .uprds{
    background: #FFF;
    padding:20px;
    b{
      font-weight: normal;
      display: inline-block;
      margin-right:50px;
      i{
        width:40px;
        height:40px;
        display: inline-block;
        background: #CCC;
        position: relative;
        top:8px;
        border-radius: 100px;
        margin-right:5px;
      }
      i.ckd{
        width:40px;
        height:40px;
        display: inline-block;
        background: #b5935c;
        position: relative;
        top:8px;
        border-radius: 100px;
        margin-right:5px;
      }
    }
    b.ckd{
      font-weight: bold;
      color:#b5935c;
      i{
        width:40px;
        height:40px;
        display: inline-block;
        background: #b5935c;
        position: relative;
        top:8px;
        border-radius: 100px;
        margin-right:5px;
      }
    }
  }

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
