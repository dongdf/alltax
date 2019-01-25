<!-- 分类课程列表 -->
<template>
    <div class="chb">
      <div class="hbtips" v-show="$route.query.tips">您可以长按海报保存到手机,以便随时分享课程给您的好友。

        <br>附言:<span  id="text_element2" style="display: inline;" >强烈推荐财合税上线的重磅课程，一定让你受益匪浅！</span>
        <label  class="btnlan"  data-clipboard-target="#text_element2">点击复制</label></div>
       <div class="coursehb">
         <img :src="imgurl">
       </div>
    </div>
</template>

<script>

  import ClipboardJS from 'clipboard'
export default {

    data() {
        return {
          imgurl:'',
          code:'test1',
          sourceId:''

        }
    },
    components: {

    },
    computed: {
        //
    },

    methods: {
      productp(){
        this.$indicator.open({
          text: '加载中',
          spinnerType: 'fading-circle'
        });
        var newc = this.code+'_'+this.sourceId;
        this.$http.post('activity/posterService/getPosterByCode?code='+this.code+'&sourceId='+this.sourceId).then(res=>{
          this.imgurl = res.data.data;
          setTimeout(()=>{
            this.$indicator.close();
          },200)


        },err=>{
          this.$indicator.close();
        })
      }

    },

    mounted() {


      let that = this;
      var clipboard = new ClipboardJS('.btnlan');

      clipboard.on('success', function(e) {
        alert('复制成功')

        e.clearSelection();
      });

      clipboard.on('error', function(e) {
        alert('请手动复制')
      });;


      if(this.$route.query.id){
        this.sourceId = this.$route.query.id;
        this.code = this.$route.query.code?this.$route.query.code:'test1'
        this.productp();
      }




    }
}
</script>
<style lang="scss" scoped>
  .hbtips{
    color:#FFF;
    padding:15px;
    position: fixed;
    top:0;
    left:0;width:100%;
    background: #f44336;

    .btnlan{
      border-radius: 10px;
      padding:10px 15px 5px 15px;
      background: #FFF;
      color:#f44336;
    }
  }

  .coursehb{
    img{width:100%;}
  }
</style>
