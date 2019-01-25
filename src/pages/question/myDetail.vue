
<template>
  <div id="question">
	  
    <ul class="box4 ">
        <li class="clear">
          <img src="../knowledge/imgs/temp.jpg" class="ar-l">
          <div class="desc ar-l">
            <div class="clear t1">
              <span class="ar-l">张俪</span>
              <span class="ar-r">30分钟前</span>
            </div>
            <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
            <div class="clear t2">
              <span class="ar-l">悬赏 50元</span>
              <span class="ar-r"><span class="mar">回答5</span>关注10</span>
            </div>  
          </div>
        </li>
    </ul>

   <!--  <div class="di">
      <div class="wo" @click="goAnswer">
        我来回答
      </div>
    </div> -->

    <div class="replys">
      <!-- <div class="noAnswer">
        <img src="./imgs/icon1.png" alt=""/>
      </div> -->
      <div class="answers">
        
        <ul class="box5 ">
            <li class="clear">
              <img src="../knowledge/imgs/temp.jpg" class="ar-l">
            
              <div class="desc ar-l">
                
                <div class="clear t1">
                  <span class="ar-l">张俪</span>
                  <span class="ar-r">30分钟前</span>
                </div>

                <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
                
                <div class="clear t2">
                  <span class="mar niu">追问</span>
                  <span class="mar niu">设为最佳</span>
                  <span class="mar niu">设为悬赏</span>
                </div> 

                <div class="clear t3">
                  <div class="clear">
                    <span class="ar-l">张俪</span>
                    <span class="ar-r">30分钟前</span>
                  </div>
                  <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
                </div>
               
               
              </div>
            </li>

            <li class="clear">
              <img src="../knowledge/imgs/temp.jpg" class="ar-l">
            
              <div class="desc ar-l">
                
                <div class="clear t1">
                  <span class="ar-l">张俪</span>
                  <span class="ar-r">30分钟前</span>
                </div>

                <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
                
                <div class="clear t2">
                  <span class="mar niu">追问</span>
                  <span class="mar niu">设为最佳</span>
                  <span class="mar niu">设为悬赏</span>
                </div> 

                <div class="clear t3">
                  <div class="clear">
                    <span class="ar-l">张俪</span>
                    <span class="ar-r">30分钟前</span>
                  </div>
                  <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
                </div>
                <div class="clear t3">
                  <div class="clear">
                    <span class="ar-l">张俪</span>
                    <span class="ar-r">30分钟前</span>
                  </div>
                  <p>委托外研发成功后，委托外部生产产品，这样的 公司能不能申请高新技术企业？</p>
                </div>
               
               
              </div>
            </li>
        </ul>
        
      </div>
    </div>
     <div class="faded" v-show="success">

          <div class="smBox" v-show=true >
            <h5>确定设为最佳？</h5>
            <p>
              <span class="lightBtn" @click="hideToast">取消</span>
              <span class="darkBtn" @click="hideToast">确定</span>    
            </p>
          </div>
    </div>
  </div>
</template>

<script>
  import tabbar from '../../components/tabbar'
  import {time} from '@/filters/index'

  export default {

    data() {
      return {
        success:true
        
      }
    },
    components: {
      //
    },

    computed: {
      //
    },

    methods: {
      hideToast(){
        this.success=false
      },
      goToCourse(){
        this.$router.push({path: 'course', query: this.$route.query})
      },

      goAnswer(){
        this.$router.push({path: 'answer-question', query: this.$route.query})
      }

    },

    mounted() {
      $http.get('/ask/askQuestion/getHotList').then(res => {
        if (res.code == 0) {
          this.question_list = res.data
        }else{
          // 
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.faded{
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    z-index: 800;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.4);
    
    .smBox{
      width:80%;
      height:auto;
      background-color: #fff;
      border-radius: 10pt;
      padding:20pt;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width:30pt;
        height:30pt;
        margin-bottom: 10pt;
      }

      h5{
        line-height: 35pt;
        height:35pt;
        font-size: 13pt;
        font-weight: 500;
        color:#333;
      }
      p{
        width:100%;
        line-height: 23pt;
        height:35pt;
        font-size: 9pt;
        font-weight: 500;
        color:#C9A063;
        display: flex;
        justify-content: space-around;
      }

      .lightBtn{
        display: block;
        width:60pt;
        height:25pt;
        line-height: 20pt;
        border-radius: 5pt;
        padding:3pt 10pt;
        text-align: center;
        color:#C9A063;
        background-color: #fff;
        border:1pt solid #C9A063;
        border-radius: 3pt;
      }
      .darkBtn{
        display: block;
        width:60pt;
        height:25pt;
        line-height: 20pt;
        border-radius: 5pt;
        padding:3pt 10pt;
        text-align: center;
        color:#fff;
        background-color: #C9A063;
        border:1pt solid #C9A063;
        border-radius: 3pt;
      }

      
    }
  }
  #question{
    background:#f6f6f6;
    padding-bottom: 120px;

    .header{
      width:750px;
      height:90x;
      background:#fff;
      padding-left:80px;
      li{
        height:90px;
        line-height:90px;
        font-size:34px;
        color:#999;
        text-align:center;

        &.ar-l{
          width:212px;
        }
        &.ar-l:first-child{
          margin-right:70px;
        }
        &.ar-r{
          width:110px;
          border-left:1px solid #eee;
          img{
            width:40px;
            margin-top:24px;
          }
        }
      }
    }
    .box1{
      height:138px;
      padding-top:34px;
      div{
        width:600px;
        height:70px;
        line-height:70px;
        background:rgba(181,147,92,1);
        font-size:34px;
        color:#fff;
        margin:0 auto;
        text-align:center;
        border-radius:8px;
      }
    }
    .box2{
      margin-bottom:10px;
      padding:32px 0 24px 48px;
      background:#fff;
      li{
        text-align:center;
        margin-right:30px;
        &:last-child{
          margin-right:0;
        }
      }
      img{
        width:100px;
        height:100px;
        border-radius:50px;
      }
      div{
        color:#2F2F2F;
        font-size:28px;
        margin-top:10px;
      }
    }
    .box3{
      padding-left:24px;
      border-bottom:2px solid #ddd;
      background:#fff;
      li{
        width:212px;
        line-height:90px;
        height:90px;
        text-align:center;
        margin-right:33px;
        color:#2F2F2F;
        font-size:30px;
        &:last-child{
          margin-right:0;
        }
      }
    }
    .active{
      color:#C9A063 !important;
      border-bottom:4px solid #C9A063;
    }

    .box4{
      background:#fff;
      padding:34px 0 42px;
      li{
        padding-top:28px;
        img{
          width:60px;
          height:60px;
          margin:0 22px 0 40px;
          border-radius: 60px;
        }

        .desc{
          width:590px;
          padding-bottom:16px;
          .t1 .ar-l{
            color:#333;
            font-size:30px;
            line-height:60px;
          }
          .t1 .ar-r{
            color:#999;
            font-size:24px;
            line-height:60px;
          }
          p{
            color:#333;
            font-size:28px;
            line-height:40px;
            margin:24px 0 38px;
          }
          .t2 span{
            color:#666;
            font-size:24px;
          }
          .mar{
            margin-right:22px;
          }
        }
      }

    }
    .replys{
      border-top:10pt solid #f6f6f6;
    }
     .box5{
      background:#fff;
      padding:10px 0 10px;
      li{
        padding-top:28px;
        img{
          width:60px;
          height:60px;
          margin:0 22px 0 40px;
          border-radius: 60px;
        }

        .desc{
          width:590px;
          padding-bottom:16px;
          border-bottom:1px solid #ddd;
          .t1 .ar-l{
            color:#333;
            font-size:30px;
            line-height:60px;
          }
          .t1 .ar-r{
            color:#999;
            font-size:24px;
            line-height:60px;
          }
          p{
            color:#333;
            font-size:28px;
            line-height:40px;
            margin:20px 0 10px;
          }
          .t2{
            margin-bottom:5pt;
            text-align: right;
          }
          .t2 span{
            padding:0pt 3pt;
            border-radius: 2pt;
            color:#C9A063;
            font-size:22px;
            display:inline-block;
            border:1pt solid #C9A063;
          }
          .t3{
            background:#f8f8f8;
            padding:10px 30px 5px;
            .ar-r{
              font-size:24px;
              color:#999;
            }
            p{
              padding-bottom:20px;
              border-bottom:1px solid #ddd;
            }
          }
          .t3:last-child{
            p{
              border:0 solid #fff;
            }
          }
          .mar{
            margin-right:22px;
          }
        }
      }
      li:last-child{
        .desc{
          border:0px solid #fff;
        }
      }
    }
    .di{
      background: #fff;
      padding-bottom:50px;
    }
    .wo{
      width: 8rem;
      height: 0.93333rem;
      line-height: 0.93333rem;
      background: #b5935c;
      margin: 0 auto;
      text-align: center;
      border-radius: 0.10667rem;
      font-size:34px;
      color:#fff;
    }
    
    .no_num{
      text-align:center;
      color:#999;
      line-height:120px;
    }
  }
</style>