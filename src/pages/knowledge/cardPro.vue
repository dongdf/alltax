<template>
<div class="cardspro">
  <!--{{cardurl}}-->
   <img :src="cardurl">

</div>
</template>

<script>

  export default {
    name: "knowledge-card",

    data(){
      return{
        cardurl:''
      }
    },
    mounted(){
      if(this.$route.query.cardurl){
        this.cardurl = this.$route.query.cardurl;
      }

        // alert(this.cardurl)
    }
  }
</script>

<style lang="scss" scoped>
  .cardspro{
    img{width:100%;}
  }

</style>
