<template>

  <mt-popup v-model="showcc" :modal="true" position="right" class="cityContent" >
    <div class="citycon">
      <h3><span @click="close"><img src="./imgs/cancel.png"/></span>地区选择</h3>
      <ul class="cityitem">
        <li v-for="a in cityList" v-show="a.code != 999999" @click="cityCheck(a)">{{a.name}}</li>
      </ul>
    </div>

  </mt-popup>
</template>

<script>
  export default {
    name: "citys",
    props:['showcc'],
    data(){
      return{
        cityList:[]
      }
    },
    mounted(){
      this.getcitys();

    },
    methods:{
      close(){
        this.$parent.cityShow = false;
        this.$parent.comms = [];
      },
      getcitys(){
        this.$http.post('user/userService/expert/expertAreas').then(res=>{
          this.cityList = res.data.data;

        })

      },
      cityCheck(obj){
        this.$emit('cityCheck',obj);
      }
    }
  }
</script>

<style  lang="scss" scoped>
  .cityContent {
    width:100%; height:100%;
    background: none!important;
  .citycon{
    position: fixed;
    top:0;
    left:20%;
    width:80%;
    height:100%;
    overflow: auto;
    background: #FFF;
  h3{
    position: relative;
    text-align: center;
    height:80px;
    line-height: 80px;
    border-bottom: 1px solid #EEE;
    margin:0 15px;
  span{
    width:45px;
    height:45px;
    position: absolute;
  img{width:100%;}
  top:15px; left:5px;
  }
  }
  .cityitem{
    position: absolute;
    top:90px;
    bottom:10px;
    overflow: auto;
    width:100%;
    padding:0 20px;
  li{
    border-bottom: 1px solid #EEE;
    padding:15px 0;
  }
  }
  }
  }
</style>
