<template>
    <div class="relgds" v-show="isRel">
        <div class="relcontent">
            <img src="./imgs/fang.png"/>
            <div class="infoc">
                <h3>商品名称商品名称</h3>
                <p>商品名称商品名称商</p>
            </div>
            <div class="actcontent">
                <span class="btn" @click="close">关闭</span>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "rel-chat",
    props:['isRel'],
    data(){
      return{

      }
    },
    methods:{
      close(){
        this.$parent.isRel = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
.relgoods {
    width:100%;
     height:100%;
}
    .relgds{
        position: fixed;
        width:100%;
        overflow: hidden;
        border-radius:10px;
        top:0;
        left:0;
        .relcontent{
            background:#FFF;
            margin:10px;
            padding:10px;
            position: relative;
            height:220px;

            border-bottom:1px solid #DDD;
            img{width:150px;
                float: left;}
            .infoc{
                float:left;
                width:500px;
                margin-left:20px;

            }
            .actcontent{
                clear: both;
                text-align: center;
                .btn {
                    padding:10px 35px;
                    -webkit-border-radius: 1000px;
                    border:2px solid #b5935c;
                    color:#b5935c;
                    -moz-border-radius: 1000px;
                    border-radius: 1000px;
                    font-size:16px;
                }
            }


        }
    }
</style>