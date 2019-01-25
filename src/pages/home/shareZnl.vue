<template>
  <div>

    <div class="sharecontent"><img :src="qqPath"/></div>
    <div class="voice" v-if="mp3path">
      <div class="voicec" @click="playVoice">
        <!--<div class="playSoundBtn"><img  src="./imgs/misc.png"/></div>-->
        <div class="playSoundPic"><img :class="playSound?'playSounding':''" src="../knowledge/imgs/misc.png"/></div>
      </div>
    </div>

    <div id="audioContent2" ></div>


  </div>

</template>

<script>
  export default {
    name: "share-znl",
    data(){
      return{
        playSound:false,
        audioPlay:null,
        qqPath:'',
        mp3path:'',
        urlpic:'',
        mineInfo:'',
        fxtitle:''
      }
    },
    mounted(){
      if(this.$route.query.pic){
        this.urlpic = this.$route.query.pic;
        this.getmaer();
      }
      if(this.$route.query.fxtitle){
        this.fxtitle = this.$route.query.fxtitle
      }
      if(this.$route.query.mp3path){
        this.mp3path = this.$route.query.mp3path;
        this.playVoice();
      }
    },
    methods:{
      playVoice(){
        this.playSound = !this.playSound;

        var container = document.getElementById('audioContent2');
        var x = document.createElement("AUDIO");
        x.setAttribute("id", "my-audio2");
        x.setAttribute("controls", "controls");
        x.setAttribute("controlsList", "nodownload");
        x.style.width = '100%';
        if(!this.audioPlay){
          container.appendChild(x);
          this.audioPlay = document.getElementById('my-audio2');
          this.audioPlay.src = this.mp3path;


        }
        // console.log(this.audioPlay.paused)

        if(this.audioPlay.paused){
          this.audioPlay.play();
        }else{
          this.audioPlay.pause();
        }




      },
      getmaer(){
        this.getmineInfo().then(mInfo=>{

          this.$indicator.open({
            text: '海报生成中',
            spinnerType: 'fading-circle'
          });
          var ids;
          if(this.$route.query.fxopenid){
            ids = this.$route.query.fxopenid
          }else{
            ids = mInfo.imId;
          }
          this.$http.post('authentication/weChatCallBack/megerPosterToOSSByOpenid?posterUrl='+encodeURI(this.urlpic)+"&x=543&y=1173"+"&openid="+ids).then(res=>{
            this.qqPath = res.data.data;


            var fxtitles  = this.fxtitle;
            if(this.mp3path){
              fxtitles = '【附语音】'+fxtitles;
            }


            var shareJson={
              type:1,
              title:fxtitles?fxtitles:'税法正能量',
              desc:'每天来点正能量，坚持就会不一样！GET一个知识点，进步不止一点点！',
              link:'/#/znl?pic='+this.urlpic+"&fxopenid="+ids+'&fxtitle='+this.fxtitle+'&mp3path='+this.mp3path,
              imgUrl:this.qqPath
            }
            var shareJson2={
              type:1,
              title:fxtitles?fxtitles:'税法正能量',
              desc:'每天来点正能量，坚持就会不一样！GET一个知识点，进步不止一点点！',
              link:'/#/znl?pic='+this.urlpic+"&fxopenid="+ids+'&fxtitle='+this.fxtitle+'&mp3path='+this.mp3path,
              imgUrl:this.qqPath
            }
            this.$parent.shareTimePage(shareJson2);
            this.$parent.shareAppPage(shareJson);


            setTimeout(()=>{
              this.$indicator.close();
            },1800)

          },(er=>{
            this.$indicator.close();
            alert(JSON.stringify(er));
          }))

        })

      },
      getmineInfo(){
        return new Promise((resolve,reject)=>{
          this.$http.get('user/userService/getUserWeChatVo').then(res=>{
            // this.$http.get('way/serverport').then(res=>{
            this.mineInfo= res.data.data;
            resolve(res.data.data);
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .voice{
    position: fixed;
    width:80px;
    height:80px;
    background:rgb(158, 115, 73);

    right:30px; top:30px;
    overflow: hidden;
    z-index: 999;
    -webkit-border-radius: 1000px;
    -moz-border-radius: 1000px;
    border-radius: 1000px;
    .voicec{
      position: relative;
      width:80px;
      height:80px;
      .playSoundBtn{
        width:50px;
        height:50px;
        position: absolute;
        z-index: 99;
        left:15px;

        top:15px;
        background:#FFF;
        -webkit-border-radius: 1000px;
        -moz-border-radius: 1000px;
        border-radius: 1000px;

        .playSounding{
          animation:mymove22 5s infinite linear;
          @keyframes mymove22
          {
            0%{  transform: rotate(0deg);}

            100%{ transform: rotate(360deg);}
          }
        }

        img{
          position:relative;
          top:6px;
          width:80%;
          height:80%;


        }

      }
      .playSoundPic{
        position: absolute;
        z-index: 8;
        width:71px;
        height:71px;
        text-align:center;
        left:4px;
        top:4px;
        z-index:5;
        .playSounding{
          animation:mymove22 5s infinite linear;
          @keyframes mymove22
          {
            0%{  transform: rotate(0deg);}

            100%{ transform: rotate(360deg);}
          }
        }
        img{
          width:80%;
          height:80%;
          position: relative;
          top:5px;
          left:-2px;

        }
      }
    }
  }



  .sharecontent{
    img{
      width:100%;
    }
  }

</style>
