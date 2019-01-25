<template>
<div class="nors">
  <p><img src="./imgs/no.png"/></p>
  <h3>该资源已下架或删除</h3>
  <div class="actbtn"><button @click="goback()">返回</button></div>
</div>
</template>

<script>
  export default {
    name: "no-resource",
  methods:{
    goback(){
      window.history.back(-1);

    }
  }
  }
</script>

<style lang="scss" scoped>
.nors{
  h3{
    color:#666;
  }
  text-align: center;
  p{
    padding:100px 0 0 0;
    img{
      width:200px;
      opacity: .2;
    }
  }
  .actbtn{
    padding:30px;
    button{

      background: #b5935c;
      border:none;
      padding:15px 0;
      color:#FFF;
      width:50%;
      border-radius: 10px;
    }
  }
}
</style>
