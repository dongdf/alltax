<template>
    <div id="severice-detail">
      <div class="zixun_service" @click="gochats"><img src="./imgs/zixun.png" style="width:80px;" > </div>
        <div class="severiceInfo">
            <div class="topPic">
                <img :src="service.productPic">
            </div>

            <div class="hang clear" style="padding: 15px border-bottom:1px solid #EEE">
                <div class="ar-l">
                    <span><b style="font-size:16px">{{service.productName}}</b></span>
                </div>
                <div class="ar-r">
                    <!--<span class="small" style="color: #F60; font-size:17px;">¥ {{service.defaultPrice}} 元起</span>-->
                </div>
            </div>
            <div style="background: #FFF;padding:15px;">{{service.productHead}}</div>
            <div class="serviceTitle">
                产品介绍
            </div>
            <div class="content" id="procontent" v-html="service.productDescription">

            </div>
            <!--<div class="shai">-->
                <!--<h4>服务期限</h4>-->
                <!--<p>-->
                    <!--<span class="tags">1个月</span>-->
                    <!--<span class="tags">半年</span>-->
                    <!--<span class="tags">1年</span>-->
                <!--</p>-->
            <!--</div>-->
            <!--<div class="shai">-->
                <!--<h4>服务期限</h4>-->
                <!--<p>-->
                    <!--<span class="tags">1个月</span>-->
                    <!--<span class="tags">半年</span>-->
                    <!--<span class="tags">1年</span>-->
                <!--</p>-->
            <!--</div>-->
        </div>
      <div id="experts_list">
        <experts ref="exps" :relInfo="relInfo" :expertInfo="experts"></experts>
      </div>
            <recommends :konwlege="konwlege" :cuuiculu="cuuiculu" :goods="goods"></recommends>

        <footer>
            <ul class="foot">
                <!--<li>{{islike}}</li>-->
                <li class="ar-l">
                    <div  class="likeimg" v-show="islike" style="text-align: center" @click="cancelAttent">
                        <img  src="./imgs/heart.png" alt="">
                        <p>已关注</p>
                    </div>

                    <div class="likeimg" v-show="!islike" style="text-align: center"  @click="attent" >
                        <img  src="./imgs/heart1.png" alt="">
                        <p>关注</p>
                    </div>
                </li>
                <li class="ar-r">
                    <a href="tel:4006009696" style="color: #FFF;"><h5>电话咨询</h5></a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import tabbar from '../../components/tabbar'
import recommends from '@/components/recommends'
import comments from '@/components/comments'
import { time } from '@/filters/index'
import experts from '@/components/expertCard'


export default {
    data() {
        return {
            active: 0,
          konwlege:[],
          cuuiculu:[],
          goods:[],
          serviceId:'',
          islike:false,
          service:{},
          experts:[],
          relInfo:{
            name:'产品',
            title:'122'
          },
        }
    },

    components: {
        tabbar,
        recommends,
        comments,
      experts
        //
    },
    filters: {

    },

    computed: {
        //
    },

    methods: {
      gochats(){
        var x = document.getElementById('experts_list').offsetTop;
        if(this.experts.length>1){
          $('html,body').scrollTop(x);
        }else{
          this.$refs.exps.gochat(this.experts[0]);
        }

        // alert();


      },
      attent() {
        this.$http.post('goods/goodsService/attent/add', {
          "subData": { resourceId: this.serviceId }
        }).then(res => {
          if (res.data.code == 1) {
          this.islike = true;

        }
        console.log(res.data)
      })
      },

      cancelAttent() {
        this.$http.post('goods/goodsService/attent/delete', {
          "subData": { resourceId: this.serviceId }
        }).then(res => {

          this.islike = false;

      })
      },
      getkonwlege(){
        this.$http.post('goods/goodsService/relKnowledge',{
          "subData":{
            "resourceId":this.serviceId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res=>{
          this.konwlege = res.data.data.list;
        // alert(JSON.stringify(this.exprotDetail.extags))
      })
      },
      getcuuiculu(){
        this.$http.post('goods/goodsService/relCurriculum',{
          "subData":{
            "resourceId":this.serviceId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res=>{
          this.cuuiculu = res.data.data.list;
        // alert(JSON.stringify(this.exprotDetail.extags))
      })
      },
      getgoods(){
        this.$http.post('goods/goodsService/product/goods',{
          "subData":{
            "resourceId":this.serviceId
          }
        }).then(res=>{
          this.goods = res.data.data.list;
        // alert(JSON.stringify(this.exprotDetail.extags))
      })
      },
      getexperts(){//请求专家信息
        this.$http.post('goods/goodsService/relExpert', {
          // subData: this.expertId
          subData: {
            'resourceId':this.serviceId,
            'pageSize':5,
            'pageNum':1
          }
        }).then(res => {

          this.experts = res.data.data.list;

      })
      },
      getserverDetail(){
        this.$http.post('goods/goodsService/product/detail',{
          "subData":{
            "resourceId":this.serviceId
          }
        }).then(res=>{
          if(res.data.code !=1){
            this.$router.replace({path:'/noresource'});
          }
          this.service = res.data.data;
          this.relInfo.id = this.serviceId;
          this.relInfo.title = this.service.productName;
          if(this.service.like){
            this.islike = true;
          }


          var shareJson={
            type:1,
            title:this.service.productName,
            desc:'财合税专家咨询平台',
            link:'/#/service-detail?id='+this.serviceId,
            imgUrl:this.service.productPic?this.service.productPic:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
          }
          var shareJson2={
            type:1,
            title:this.service.productName,
            desc:'财合税专家咨询平台',
            link:'/#/service-detail?id='+this.serviceId,
            imgUrl:this.service.productPic?this.service.productPic:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
          }
          this.$parent.shareTimePage(shareJson2);
          this.$parent.shareAppPage(shareJson);




      })
      }

    },

    mounted() {
      this.serviceId = this.$route.query.id;
      this.getserverDetail()
      this.getcuuiculu()
      this.getkonwlege()
      this.getexperts()

    }
}
</script>
<style lang="scss">

#severice-detail{
  .zixun_service {
    position: fixed;
    top:200px;
    right:20px;
    z-index: 9999;
  }

    padding-bottom: 50pt;

    .foot{
        border-top:2px solid #ddd;
      position: fixed;
      background: #FFF;
      width:100%;
      bottom:0;
      left:0;
        .ar-l {
            line-height: 38pt;
            /* padding-left: 5pt; */
            text-align: center;
            width: 50%;
        }
        .ar-r {
            height: 38pt;
            width: 50%;
            text-align: center;
            background-color: #C9A063;
            color: #fff;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .likeimg{
            position: relative;
            top:5px;
        }
        .likeimg img {width:40px; display: inline-block}
        .likeimg p{font-size:12px;
            position: relative; top:-10px;  display: inline-block}
    }
}

.severiceInfo {
    .serviceTitle{
        padding:20px;
        text-align: center;
        color:#333;
        font-size:30px;
        font-weight: bold;
    }
    .topPic img {
        width: 100%;

    }
    .content {
        padding:15pt 10pt 5pt 10pt;
        line-height: 36px;

        font-size: 24px;
        border-bottom: 8pt solid #f6f6f6;
         background-color: #fff;
    }
    .hang{
        padding:5pt 10pt;
        background-color: #fff;
        .ar-l span{
            font-size: 12pt;
            color:#333;
        }
        .ar-r span{
            font-size: 11pt;
            color:#333;
        }
    }

    .shai {
        margin: 0pt 0 10pt;
        padding: 3pt 10pt;
        background-color: #fff;
        h4{
            line-height: 22pt;
        }
        p{
            padding:5pt 0;
        }
        .tags{
            color: #666;
        font-size: 24px;
        line-height: 34px;
        display: inline-block;
        margin: 0 21pt 0pt 0;
        padding: 8px 20px;
        background-color: #ececec;
        border-radius: 8px;
        }
    }



    /*.tags {
        background-color: #fff;
        padding: 0pt 14pt 10pt;
        display: flex;
        flex-direction: row;
    }*/
    .kuai {

    }
    .kuai.active {
        color: #fff;
        background-color: #C9A063;
    }
}
</style>
