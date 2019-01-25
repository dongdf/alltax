<template>
<div class="proImg">
  <img src="https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj_cpjs.jpg"/>
</div>
</template>

<script>
  export default {
    name: "cwrj-pro",
    mounted(){
      var shareJson={
        type:1,
        title:'财务管家',
        desc:'免费云端财务管理软件，帮助财会人员更轻松更高效的处理业务，可大幅提升工作效率和质量，欢迎体验试用。',
        link:'/#/cwrjhome',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj_logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'财务管家-相关视频学习及问题咨询',
        desc:'免费云端财务管理软件，帮助财会人员更轻松更高效的处理业务，可大幅提升工作效率和质量，欢迎体验试用。',
        link:'/#/cwrjhome',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/cwgj_logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);

    }
  }
</script>

<style lang="scss" scoped>
.proImg{
  img{
    display: block;
    width:100%;
  }
}
</style>
