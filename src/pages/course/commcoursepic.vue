<!-- 分类课程列表 -->
<template>
  <div class="hbpage">
    <div class="commhb">
      <div class="commhb_content">
        <img :src="cururl">
      </div>
    </div>
    <div class="commhb_bottom">
      <ul>
        <li v-for="s in hbcatlist" :class="selecthb.id == s.id?'acthb':''" @click="changehb(s)"><label class="curlabel"><img src="./imgs/dhicons.png"> </label><img :src="s.p_url"></li>
      </ul>
    </div>
  </div>

</template>

<script>


export default {
    data() {
        return {
          courseId:'',
          imgurl:'',
          code:'test1',
          sourceId:'',
          cururl:'',
          selecthb:{},
          hbcatlist:[]

        }
    },
    components: {

    },
    computed: {
        //
    },

    methods: {
      changehb(obj){
        this.selecthb = obj
        this.getsinglImage();

      },
      gethbCat(){
        this.$http.post('activity/posterService/getPosterList?type=1').then(res=>{
          this.hbcatlist = res.data.data;
          this.selecthb = this.hbcatlist[0]
          this.getsinglImage();

        })
      },
      getsinglImage(){
        this.$indicator.open()
        this.$http.post('activity/posterService/getPosterById?id='+this.selecthb.id+'&sourceId='+this.courseId).then(res=>{
          // this.hbcatlist = res.data.data;
          // this.selecthb = this.hbcatlist[0]
          this.cururl =res.data.data;
          setTimeout(()=>{
            this.$indicator.close()
          },500)

        })
      },
      productp(){
        this.$indicator.open({
          text: '海报生成中',
          spinnerType: 'fading-circle'
        });
        this.$http.post('activity/posterService/getPosterByCode?code='+this.code+'&sourceId='+this.sourceId).then(res=>{
          this.imgurl = res.data.data;
          setTimeout(()=>{
            this.$indicator.close();
          },200)


        })
      }

    },

    mounted() {
      if(this.$route.query.id){
        this.courseId = this.$route.query.id;
        this.gethbCat();
      }



    }
}
</script>
<style lang="scss" scoped>
.hbpage{
  position: absolute;width:100%; height: 100%;
  background: #666;
}
  .coursehb{
    img{width:100%;}
  }
  .commhb{
    background: #666;
    padding-bottom: 150px;
    .commhb_content{
      width:90%;

      margin:0 auto;
      margin-top:5%;
      img{
        width:100%;
      }
    }
  }
  .commhb_bottom{
    position: fixed;
    text-align: center;
    bottom: 0;
    left:0;
    overflow: hidden;
    width:100%;
    height:150px;
    padding:15px 0;
    background: #333;
    li{
      position: relative;
      background-color: #fff;
      height:120px;
      margin-left:15px; overflow: hidden;
      width:100px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      display: inline-block;
      .curlabel{
        display: none;
        width:50px;
        height:50px;
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-30px;
        margin-top:-25px;
        background:#4caf50;
        border-radius: 10000px;
        box-shadow: 0 0 4px #666;
         text-align: center;
        img{width:80%;
          position: relative; top:5px;}
      }
      img{width:100%; opacity: .6}
    }
    .acthb{
      .curlabel{
        display: block;

      }
      img{width:100%; opacity: 1}

    }
  }
</style>
