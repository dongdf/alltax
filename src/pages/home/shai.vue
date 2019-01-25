<template>
<div class="sharecontent"><img :src="qqPath"/></div>
</template>

<script>
  export default {
    name: "share-znl",
    data(){
      return{
        qqPath:'',
        urlpic:''
      }
    },
    mounted(){
      if(this.$route.query.purl){
        this.urlpic = this.$route.query.purl;
        this.getmaer();
      }
    },
    methods:{
      getmaer(){
        this.$indicator.open({
          text: '海报生成中',
          spinnerType: 'fading-circle'
        });
        this.$http.post('authentication/weChatCallBack/megerWaterMarkToOSS?posterUrl='+encodeURI(this.urlpic)+"&x=485&y=740&wx=270&wy=814").then(res=>{
          this.qqPath = res.data.data;
          setTimeout(()=>{
            this.$indicator.close();
          },1800)
        },(er=>{
          this.$indicator.close();
          alert(JSON.stringify(er));
        }))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sharecontent{
    img{
      width:100%;
    }
  }

</style>
