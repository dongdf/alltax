<template>
<div>
  <div class="blockimg"><img src="./activeimg/01.jpg"/> </div>
  <div class="blockimg"><img src="./activeimg/02.jpg"/> </div>

  <div class="panzi">

   <img @load="imageLoaded()" v-for="(s,index) in jplist" :src="s.trophy_img" style="display: none;" :id="['diy' + (index+1)]"  />
    <!--<img  src="./gimg/1.png" id="diy1"   /></div>-->
    <!--<img src="./gimg/2.png" id="diy2" style="display:none;" />-->
    <!--<img src="./gimg/3.png" id="diy3" style="display:none;" />-->
    <!--<img src="./gimg/4.png" id="diy4" style="display:none;" />-->
    <!--<img src="./gimg/5.png" id="diy5" style="display:none;" />-->
    <!--<img src="./gimg/6.png" id="diy6" style="display:none;" />-->
    <!--<img src="./gimg/7.png" id="diy7" style="display:none;" />-->
    <!--<img src="./gimg/7.png" id="diy8" style="display:none;" />-->
    <div class="banner" >
      <div class="turnplate" >
        <canvas class="item" id="wheelcanvas"  width="422" height="422" ></canvas>
        <img class="pointer" @click="pointerClick" src="./gimg/jt.png"/>
      </div>
    </div>
    <a href="#" class="more"></a>

  </div>
  <!--<div class="blockimg"><img  @click="choutips" src="./activeimg/03.jpg"/> </div>-->
  <div class="blockinfo">当前抽奖次数：{{mineJiang.enableNum}}   <label @click="mylucky()">我的中奖纪录</label></div>
  <div class="blockinfo_list" v-show="items.length>6">
    <h3><img src="./gimg/zj_title.png"></h3>


    <div class="bdr10">
        <ul>
          <li>
            <label class="fl"><span class="name">用户</span></label>
            <label class="fr">获得奖励</label>
            <div class="cl"></div>
          </li>
        </ul>
        <ul class="scrollcontainer"  >
          <!--<li class="swiper-slide" v-for="s in items">-->
            <!--<label class="fl"><span class="name">{{s.name}}</span>抽中了</label>-->
            <!--<label class="fr">获得奖励</label>-->
            <!--<div class="cl"></div>-->
          <!--</li>-->

          <vue-seamless-scroll :data="items"  :class-option="classOption" class="warp">
            <li class="item" v-for="s in items"  v-if="s.trophy_type!=1">
              <label class="fl"><span class="name">{{s.mobile}}</span>抽中了</label>
              <label class="fr">{{s.trophy_name}}</label>
              <div class="cl"></div>
            </li>
          </vue-seamless-scroll>



        </ul>
    </div>
  </div>
  <div class="blockimg"><img src="./activeimg/05.jpg"/> </div>

  <!--<div @click="pplogin">完善用户信息>>>>>>>></div>-->

   <!---->
   <!---->
  <mt-popup v-model="loginshow" modal="false" class="loginpps">
    <div class="login_content" >
      <h3>完善信息<span @click="closepplogin">关闭</span></h3>
      <div :bs="item.bs" @closeLogin="closeLogin" :is="item.component" v-for="item in lList"></div>
    </div>

  </mt-popup>
  <div class="zjpop" v-show="zhongjiangshow">
    <div class="zpimg">
      <div class="jlj_s" v-show="zhongjiangItem.trophy_type == 4"><img :src="zhongjiangItem.trophy_lottery_img"/><div class="prices">￥{{zhongjiangItem.amount}}</div></div>
      <div v-show="zhongjiangItem.trophy_type != 4"><img :src="zhongjiangItem.trophy_lottery_img"/></div>
      <span @click="zhongjiangshow=false" class="zpclose">知道啦</span></div>

  </div>
</div>
</template>

<script>
  import loginppwin from '@/pages/login/'

  export default {
    name: "shuang11",
    data(){
      return{
        animate:false,
        items:[

        ],
        jplist:[],
        isAble:{},
        otherList:[],
        zhongjiangItem:{},
        zhongjiangshow:false,
        mineJiang:{},
        lList:[],
        mine:{},
        loadedImages:1,
        loginshow:false,
        turnplate:{
          restaraunts:["碧根果一袋", "年货红包", "水果拼盘300元月卡", "2元现金红包", "夏威夷果一袋", "3元现金红包", "松子一袋 ", "5元现金红包"],				//大转盘奖品名称
          colors:["#FFFFFF","#efd691", "#FFFFFF", "#efd691", "#FFFFFF","#efd691", "#FFFFFF", "#efd691" ],					//大转盘奖品区块对应背景颜色
          outsideRadius:192,			//大转盘外圆的半径
          textRadius:155,				//大转盘奖品位置距离圆心的距离
          insideRadius:68,			//大转盘内圆的半径
          startAngle:0,				//开始角度
          bRotate:false				//false:停止;ture:旋转
        }
      }
    },
    computed: {
      classOption: function () {
        return {
          step: 0.3,
          limitMoveNum: 5
        }
      }
    },
    components:{loginppwin},
    mounted(){

      this.getJiang()
      // this.pplogin()
      this.getmineInfo()
      // this.initzp();

      var that = this;
      // that.drawRouletteWheel();

      this.getjps().then(res=>{
        this.turnplate.restaraunts = [];
        this.jplist = res;
        for(var i in res){
          this.turnplate.restaraunts.push(res[i].trophy_name)
        }
      })

      this.getotherList();









      this.getotherList2();


     this.scroll();



    },
    methods:{
      getotherList2(){
        this.$http.get('activity/trophyService/recordPage?pageNum=1&pageSize=100&status=1').then(res=>{
          this.items = res.data.data.list;

        })
      },
      mylucky(){
        this.$router.push({path:'/zjlist'});
      },
      scroll(){
        // npm


      },
      getotherList(){
        this.$http.get('activity/trophyService/recordList?status=1').then(res=>{
          this.otherList = res.data.data;
        })
      },
      imageLoaded(){
        this.loadedImages++;
        console.log(this.loadedImages);
        if (this.loadedImages == 8) {
          //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
          this.$nextTick(function () {
            // this.drawRouletteWheel(this.turnplate);
            this.$nextTick(()=>{
              setTimeout(()=>{
                this.drawRouletteWheel();
              },100)

            })

          });
        }

      },
      getjps(){
        return new Promise((resolve,reject)=>{
          this.$http.get('activity/trophyService/enableList').then(res=>{
            this.isAble = res.data;
            resolve(res.data.data);
          })
        })
      },
      drawRouletteWheel(){
        var that = this;
        var canvas = document.getElementById("wheelcanvas");
        if (canvas.getContext) {
          //根据奖品个数计算圆周角度
          var arc = Math.PI / (that.turnplate.restaraunts.length/2);
          var ctx = canvas.getContext("2d");
          //在给定矩形内清空一个矩形
          ctx.clearRect(0,0,422,422);
          //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
          ctx.strokeStyle = "#FFBE04";
          //font 属性设置或返回画布上文本内容的当前字体属性
          ctx.font = 'bold 18px Microsoft YaHei';
          for(var i = 0; i < that.turnplate.restaraunts.length; i++) {
            var angle = that.turnplate.startAngle + i * arc;
            ctx.fillStyle = that.turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(211, 211, that.turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(211, 211, that.turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();

            //改变画布文字颜色
            var b = i+2;
            if(b%2){
              ctx.fillStyle = "#E5302F";
            }else{
              ctx.fillStyle = "#E5302F";
            };

            //----绘制奖品开始----


            var text = that.turnplate.restaraunts[i];
            // alert(text);
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * that.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * that.turnplate.textRadius);

            //rotate方法旋转当前的绘图
            //  alert(angle)
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            if(text.indexOf("盘")>0){//判断字符进行换行
              var texts = text.split("盘");
              for(var j = 0; j<texts.length; j++){
                ctx.font = j == 0?'bold 20px Microsoft YaHei':'bold 18px Microsoft YaHei';
                if(j == 0){
                  ctx.fillText(texts[j]+"盘", -ctx.measureText(texts[j]+"盘").width / 2, j * line_height);
                }else{
                  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //调整行间距
                }
              }
            }else if(text.indexOf("盘") == -1 && text.length>8){//奖品名称长度超过一定范围
              text = text.substring(0,8)+"||"+text.substring(8);
              var texts = text.split("||");
              for(var j = 0; j<texts.length; j++){
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
              }
            }else{

              //在画布上绘制填色的文本。文本的默认颜色是黑色

              //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
              ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            }

            //添加对应图标

            if(text.indexOf(that.turnplate.restaraunts[0])>=0){
              var img1= document.getElementById("diy1");
              img1.onload=function(){
                ctx.drawImage(img1,-30,10);
              };

              ctx.drawImage(img1,-30,10);
            };
            if(text.indexOf(that.turnplate.restaraunts[1])>=0){
              var img2= document.getElementById("diy2");
              img2.onload=function(){
                ctx.drawImage(img2,-30,10);
              };
              ctx.drawImage(img2,-30,10);
            };
            if(text.indexOf(that.turnplate.restaraunts[2])>=0){
              var img3= document.getElementById("diy3");
              img3.onload=function(){
                ctx.drawImage(img3,-30,10);
              };
              ctx.drawImage(img3,-30,10);
            };
            if(text.indexOf(that.turnplate.restaraunts[3])>=0){
              var img4= document.getElementById("diy4");
              img4.onload=function(){
                ctx.drawImage(img4,-25,10);
              };
              ctx.drawImage(img4,-25,10);
            };
            if(text.indexOf(that.turnplate.restaraunts[4])>=0){
              var img5= document.getElementById("diy5");
              img5.onload=function(){
                ctx.drawImage(img5,-20,10);
              };
              ctx.drawImage(img5,-20,10);
            };

            if(text.indexOf(that.turnplate.restaraunts[5])>=0){
              var img6= document.getElementById("diy6");
              img6.onload=function(){
                ctx.drawImage(img6,-20,10);
              };
              ctx.drawImage(img6,-20,10);
            };

            if(text.indexOf(that.turnplate.restaraunts[6])>=0){
              var img7= document.getElementById("diy7");
              img7.onload=function(){
                ctx.drawImage(img7,-30,10);
              };
              ctx.drawImage(img7,-30,10);
            };

            if(text.indexOf(that.turnplate.restaraunts[7])>=0){
              var img8= document.getElementById("diy8");
              img8.onload=function(){
                // ctx.rotate(1/8*Math.PI);
                ctx.drawImage(img8,-30,10);

              };


              // ctx.rotate(50 * Math.PI / 180);
              // ctx.translate(290,150);
              ctx.drawImage(img8,-30,10);

            };





            //把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
            //----绘制奖品结束----
          }
        }
      },
      chouj(){
        return new Promise((resolve,reject)=>{
          this.$http.get('activity/trophyService/luckDraw').then(res=>{
            resolve(res.data.data)

          })
        })

      },
      pointerClick(){
        var that = this;
        function rnd(n, m){
          var random = Math.floor(Math.random()*(m-n+1)+n);
          return random;

        }


        if(that.turnplate.bRotate)return;
        if(!that.mine.subscribe){
          that.$toast('请先长按上方二维码关注才可以参加抽奖')

        }else if(!that.mine.mobile){
          that.$messagebox.alert('请先完善用户信息').then(action => {
            that.pplogin();
            // return;
          });
        }else if(that.isAble.code !=1){
          this.$messagebox.alert(that.isAble.msg);

        } else if(that.mineJiang.enableNum == 0){
          this.$messagebox.alert('您的抽奖次数已用完');
          // return;
        }else{
          that.turnplate.bRotate = !that.turnplate.bRotate;
          var item = 6;
          this.zhongjiangIdx = 6;
          // that.rotateFn(item, that.turnplate.restaraunts[item-1]);
          // return false;
          this.chouj().then(res=>{

            var item = res;  //rnd(1,that.turnplate.restaraunts.length);
            var idx = that.jplist.findIndex(function (objs) {
              return objs.trophy_order  == res.trophy_order
            })

            item = idx+1;
            this.zhongjiangItem = res;

            that.rotateFn(item, that.turnplate.restaraunts[item-1]);

            console.log(item);
            that.getJiang();

          })
          //获取随机数(奖品个数范围内)

        }




      },
      rotateFn(item, txt){
        this.rotateIng(item)
       return;
        var that= this;
        var angles = item * (360 / that.turnplate.restaraunts.length) - (360 / (that.turnplate.restaraunts.length*2));
        if(angles<270){
          angles = 270 - angles;
        }else{
          angles = 360 - angles + 270;
        }
        // console.log($('#wheelcanvas'));
        var obj = document.getElementById('wheelcanvas');
        obj.stopRotate();
        obj.rotate({
          angle:0,
          animateTo:angles+1800,
          duration:8000,
          callback:function (){	//回调
            alert('恭喜中奖了');
            that.turnplate.bRotate =false;
          }
        });
      },
      rotateIng(item){
        // 0 1800+30
        var that = this;
        var angles = item * (360 / that.turnplate.restaraunts.length) - (360 / (that.turnplate.restaraunts.length*2));
        if(angles<270){
          angles = 270 - angles;
        }else{
          angles = 360 - angles + 270;
        }
        // console.log(angles);

        var toRoate = angles+1800;

        // var cursetp = 0;
        // var step = 0
        //
        // var ele = document.getElementById('wheelcanvas');
        // animate2(ele,toRoate);
        //
        // function animate2(ele,target) {
        //   clearInterval(ele.timer); //清楚历史定时器
        //   ele.timer = setInterval(function () {
        //     //获取步长 确定移动方向(正负值) 步长应该是越来越小的，缓动的算法。
        //
        //
        //    var step = (target-angles)/10;
        //    var r= "rotate("+step+"deg)";
        //     console.log(r);
        //     ele.style.transform = r;
        //     // console.log(cursetp);
        //
        //     //检测缓动动画有没有停止
        //     if(cursetp>=angles){
        //
        //       clearInterval(ele.timer);
        //     }
        //   },100);
        // }
        var i =5;
        var a = 0;
        var b=toRoate;

        var obj = document.getElementById('wheelcanvas');
        // obj.style.transform = "rotate(0deg)";
        routesc();
        function routesc() {
          var r = "rotate("+a+"deg)";
          obj.style.transform = r;
          if(parseInt(toRoate)==parseInt(a)){
            // console.log('done'+a);
            // alert('您中奖啦')
            // console.log(that.turnplate.restaraunts)
            // that.zhongjiangItem = that.jplist[that.zhongjiangIdx-1];
            that.zhongjiangshow = true;
            clearTimeout();
            // console.log(a);
            that.turnplate.bRotate = false;
            return false;
          }else{

            // a = a + (b - a) / 100;
            a = a + b*0.05;
            b = b*0.95;


            setTimeout(()=>{
              routesc()
            },0)
          }



        }


      },
      choutips(){
        this.$messagebox.alert('2018-11-16 9:00 开始抽奖,祝您好运','提示')
      },
      getmineInfo(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mine= res.data.data;
          var t = this.mine.nick_name +'邀请您参与财合税双十一狂欢节，平台好礼天天送，更有“终身VIP会员”大奖等您来。'

          var shareJson={
            type:1,
            title:t,
            desc:'财合税专家咨询平台',
            link:'/#/shuang11',
            imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/activity_11.jpg'
          }
          var shareJson2={
            type:1,
            title:t,
            desc:'财合税专家咨询平台',
            link:'/#/shuang11',
            imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/activity_11.jpg'
          }
          this.$parent.shareTimePage(shareJson2);
          this.$parent.shareAppPage(shareJson);
        })
      },
      closeLogin(){
        this.getmineInfo();
        this.closepplogin();
      },
      pplogin(){
        this.loginshow =true
        this.lList.push({
          component:loginppwin,
          bs:true
        })
      },
      closepplogin(){

        this.loginshow = false
        setTimeout(()=>{
          this.lList = [];
        },200)

      },
      getJiang(){
        this.$http.get('activity/shareActivityService/queryLotteryNum').then(res=>{
          this.mineJiang = res.data.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .jlj_s{
    position: relative;
    .prices{
      position: absolute;
      top:53%;
      color:#FFFF00;
      font-size:55px;
      width:100%;
      text-align: center;
    }
  }
  .scrollcontainer{
    overflow: hidden;
    height:350px

  }

  .zjpop{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:999;
    background: rgba(0,0,0,.5);
    .zpimg{
      position: relative;
      width:75%;
      top:20%;
      margin:0 auto;
      img{
        width:100%;
      }
      .zpclose{
        width:200px;
        border-radius: 1000px;
        background: #F10000;
        color:#FFF;
        display: block;
        text-align: center;
        position: absolute;
        left:50%;
        margin-left:-100px;
        padding:15px 0;
        bottom:-80px;

      }
    }
  }
  #wheelcanvas{
    /*width:422px;*/
    /*height:522px;*/

  }
  .panzi{
    background: #ff6155; padding-bottom: 30px;
  }

  /* 大转盘样式 */
  .banner{display:block;width:95%;margin-left:auto;margin-right:auto;margin-bottom: 20px;}
  .banner .turnplate{display:block;width:100%; background:url("./gimg/cj_bg.png") no-repeat center; background-size:100%;position:relative;}
  .banner .turnplate canvas.item{width:100%;}
  .banner .turnplate img.pointer{position:absolute; top:50%; left:50%; margin-left:-150px;margin-top:-180px;width:300px; height:320px;}
  .more{display: block;width: 100%;position: fixed;top: 0;left: 0;height: 150px;}
  .cloud{position: fixed;left: 0;top: 70%;width: 150px;}
  .cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
  .cloud3{position: fixed;left: 0;top: 30%;width: 100px;}
  @media screen and (max-width: 320px) {
    .cloud{position: fixed;left: 0;top: 70%;width: 150px;}
    .cloud2{position: fixed;right: 0;top: 30%;width: 50px;}
    .cloud3{position: fixed;left: 0;top: 23%;width: 100px;}
  }
  @media screen and (min-width: 321px) and (max-width: 375px) {
    .cloud{position: fixed;left: 0;top: 72%;width: 150px;}
    .cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
    .cloud3{position: fixed;left: 0;top: 25%;width: 100px;}
  }
  @media screen and (min-width: 376px) {
    .cloud{position: fixed;left: 0;top: 68%;width: 150px;}
    .cloud2{position: fixed;right: 0;top: 32%;width: 50px;}
    .cloud3{position: fixed;left: 0;top: 25%;width: 100px;}
  }
  @media screen and (max-height: 480px) {
    .cloud{position: fixed;left: 0;top: 81%;width: 150px;}
    .cloud2{position: fixed;right: 0;top: 35%;width: 50px;}
    .cloud3{position: fixed;left: 0;top: 27%;width: 100px;}
  }

  #mark{width: 100%;height: 100%;background: rgba(0,0,0,0.5);position: fixed;top: 0;left: 0;display: none;}
  .red-img{position: fixed;top: 10%;left: 5%;width: 90%;}



.blockimg{
  img{
    width:100%;
    display: block;

  }

}
.blockinfo{
  background: #ff6155;
  color:#FFF;
  text-align: center;
  font-size:40px; font-weight: bold;
  padding:20px 0;
  label{
    font-size:40px;
    border-left:3px solid #F8F8F8;
    padding-left:20px;
    color: #F8F8F8;
    text-decoration: underline;
  }
}
.blockinfo_list{


  background: #ff6155;
  padding-bottom:50px;
  .bdr10{
    border-radius: 10px;
    overflow: hidden;
    margin:0 20px;
    padding:10px 20px;
    background:#ea373a;
  }
  h3{
    text-align: center;
    img{width:300px; margin:30px 0 20px 0;}
  }
  ul.header{

  }
  ul{




    li{
      color:#FFF;
      padding:15px 0;
      font-size:16px;
      .name {
        white-space: nowrap;
        width:300px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        line-height: 30px;
      }

    }
  }
}
  .loginpps{
    background: #FFF;

    width:100%;
    height:100%;
    .login_content{
      h3{
        padding:20px;
        position: relative;
        text-align: center;
        span{
          position: absolute;
          top:20px;
          left:20px;
        }
      }
    }
  }
</style>
