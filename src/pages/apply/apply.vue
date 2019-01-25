<template><div>
    <div class="page-field">
        <div class="page-title" v-show="btype == 1">专家申请信息填写</div>
        <div class="page-title" v-show="btype == 2">经纪人申请信息填写</div>


        <div class="page-part">
            <div class="itemTitle">姓名</div>
            <mt-field placeholder="请输入姓名" v-model="info.name" type="text"></mt-field>
            <div class="itemTitle">手机</div>
            <mt-field placeholder="请输入手机" type="number" v-model="info.phone"></mt-field>
            <div class="itemTitle">公司</div>
            <mt-field  placeholder="请输入公司名称" v-model="info.company_name" type="text" rows="4"></mt-field>
            <div class="itemTitle">请选择地区</div>
            <div  style="background: #FFF; padding:15px 5px; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"  @click="popArea()">
                <span v-show="!areaselectname" style="color:#CCC;">点击选择 ></span>
                <span v-show="areaselectname">{{areaselectname}}</span>
            </div>

<areas :pickerShow="areaShow" @areaok="areaOk" @areacancle="areaCancle"></areas>

        </div>

        <area/>

    </div>
    <div class="btnw">
        <mt-button  @click.native="collectionSubmit" class="btns" size="large">提交申请</mt-button>
    </div>
</div>
</template>

<script>
    import areas from '../../components//area/chsArea'
  export default {
    name: 'apply',
    data(){
      return{
        info:{
          name:'',
          phone:'',
          company_name:'',
          desc:'',
          area:{}


        },areaShow:false,
        areaselectname:'',
        btype:'', //1 为专家  2  经纪人
        selectArea:{
          province:'',
          city:{},
          county:''
        }

      }
    },
components:{areas},
    mounted(){

      const WX_UID = localStorage.getItem('WX_UID')?localStorage.getItem('WX_UID'):'';
      let boss = this.$route.query.boss;
      localStorage.setItem('orgPage','apply');
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
      popArea(){
        this.areaShow = true;
      },
      areaOk(areaObj){
        // console.log(JSON.stringify(areaObj));
        this.areaselectname = areaObj.province.name+'>'+areaObj.city.name+'>'+areaObj.county.name;
        this.selectArea = areaObj
        this.info.area = areaObj;
        this.areaShow = false;
      },
      areaCancle(){
        this.areaShow = false;
      },
      collectionSubmit(){
        // if(this.info.name && this.info.phone && this.info.companyName && this.info.busScope && this.info.companyCIT && this.info.personCIT && this.info.vatForYear && this.projectBackground && this.info.customerDemand){

        let phone = this.info.phone.trim();
        if (!this.info.name.trim()) {
          this.$toast("请填写姓名！");
          return false;
        }
        if (!this.$options.filters.isphone(phone)) {
          this.$toast("请填写正确的手机号码！");
          return false;
        }
        if (!this.info.company_name.trim()) {
          this.$toast("请填写公司名称");
          return false;
        }
        if(!this.selectArea.city.code){
          this.$toast("请选择省市");
          return false;
        }
        if(this.btype == 1){//专家提交

          this.$http.post('user/userService/applyExpert',{
            subData:{
                expert_name:this.info.name,   //专家姓名
                expert_mobile:this.info.phone,      //专家电话
                expert_company:this.info.company_name,      //专家公司
                province:this.selectArea.province.code,     //专家省份
                city:this.selectArea.city.code,    //专家城市
                country:this.selectArea.county.code
            }
          }).then(res => {
            if (res.data.code == 1){
            this.$messagebox('提交成功,请耐心等待审核');
          //   this.$toast('提交成功，即将前往首页');
          //
          //   setTimeout(()=>{
          //     this.$router.push('/home');
          // },1000)
          }else{
            this.$toast(res.data.msg);
          //   setTimeout(()=>{
          //     this.$router.push('/home');
          // },1000)
            //
          }
        })


        }else if(this.btype == 2){

          this.$http.post('user/userService/applyAgent',{
            subData:{
              agent_name:this.info.name,   //专家姓名
              agent_moblie:this.info.phone,      //专家电话
              agent_company:this.info.company_name,      //专家公司
              agent_province:this.selectArea.province.code,     //专家省份
              agent_city:this.selectArea.city.code,    //专家城市
              agent_country:this.selectArea.county.code
            }
          }).then(res => {
            if (res.data.code == 1){
            this.$messagebox('提交成功,请耐心等待审核');
          //   this.clearStore();
          //   setTimeout(()=>{
          //     this.$router.push('/home');
          // },1000)
          }else{
            this.$toast(res.data.msg);
          //   setTimeout(()=>{
          //     this.$router.push('/home');
          // },1000)
            //
          }
        })

        }else{
          this.$toast('参数错误，请重新进入页面')
        }




        // }else{
        //   this.$toast('请填写完整');
        // }
        // this.$http.baseURL = 'http://192.168.1.210:16801/'


      },
      clearStore(){
        localStorage.removeItem('orgPage');
        localStorage.removeItem('boss')
      }
    }
  };
</script>
<style lang="scss" scoped>

    .itemTitle { padding:10px; margin-top:10px; }
    .page-title { padding:20px;text-align: center; background:#fff;       color: #333;

        font-weight:bold; font-size: 30px; border-bottom:1px solid #eee;}
    .mint-field {border-bottom:1px solid #EEE; padding:15px 0;}
    .btns { background: #C9A063; color:#FFF; padding:20px; overflow:visible; height: auto; font-size:35px;font-weight: bold; }
    .btnw {padding:15px; background:#F8F8F8;}

</style>
