<template>
  <div class="allSearch" >
    <div class="searchBox" @click="showsearchbox" >
      <div class="searchIcons"><img src="../pages/course/imgs/searchIcons.png"><span>搜索</span></div>

      <div class="cl"></div>
    </div>
    <div class="ppsearch" v-show="searchShow">
      <div class="ppsearchBox">
        <div class="searchBox">
          <div class="searchIcons"><img src="../pages/course/imgs/searchIcons.png"></div>
          <div class="searchTextBox"><input v-model="kwords" @keyup.enter="enterSearch()" ref="msearchinputbox" placeholder="请输入关键字"/></div>
          <div class="cl"></div>
        </div>
        <span class="canclebtn" @click="enterSearch()">搜索</span>
      </div>
      <div class="ppsearch_rel">
        <div v-show="hisList.length>0" class="hotKey">
          <h3>搜索记录</h3>
          <p>
            <a @click="hotSearch(k)" v-for="k in hisList"><span>{{k.keywords}}</span></a>
          <div class="cl"></div>
          </p>
        </div>

        <div class="jiqiren">
         <img @click="golijing()" src="../pages/course/imgs/search_tips.png"/>
        </div>
        <div class="closeSearch" @click="searchShow = false"><img src="./imgs/closeSearch.png"/></div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: "msearch",
    props:['ktype','classid'],
    data(){
      return{
        hisList:[],
        searchShow:false,
        kwords:''
      }
    },
    mounted(){
      this.getSearchhis();

    },
    methods:{
      golijing(){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
          if(!this.mineInfo.mobile){
            this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
              this.$router.push('/login');
            });
            return false;
          }
          if(this.mineInfo.imId =='obytr1bx52j2wielziducml8jyno'){
            this.$toast('不能和自己聊天')
          }else{
            this.$router.push({path:'/chat',query:{targetAccount:'obytr1bx52j2wielziducml8jyno'}});

          }
        })

      },
      showsearchbox(){
        // this.$searchinputbox.focus();
        this.$refs.msearchinputbox.focus()
        this.searchShow = true;
      },
      getSearchhis(){
        this.$http.get('knowledge/statuteService/searchHistoryList').then(res=>{
          this.hisList = res.data.data;
        })
      },
      enterSearch(){
        if(!this.kwords){
          this.$toast('请输入关键词');
          return false;
        }
        this.$router.push({path:'/search',query:{kw:this.kwords,ktype:this.ktype,classid:this.classid}})
      },
      hotSearch(obj){
        this.$router.push({path:'/search',query:{kw:obj.keywords,ktype:this.ktype,classid:this.classid}})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .allSearch{
    position: relative;
    background:#FFF;
    margin-bottom:15px;
    padding:20px;
    .searchBox{

      width:120px;
      padding:15px;
      overflow: hidden;
      border-radius: 10px;
      span {
        position: relative;
        top:-5px;
      }
      .searchIcons{
        width:135px;
        height:35px;
        float:left;
        img{
          width:36px;
          height:35px;
          opacity: .4;
        }
      }
      .searchTextBox{
        float:left;
        width:500px;
        span{color:#CCC; display: block;
          position: relative; top:-3px;  padding-left:10px;}
        input{
          background: #F6F6F6;
          border:none;
          width:100%;
          position: relative;
          top:2px;
          margin-left:10px;

        }
      }

    }
    .ppsearch{
      position: fixed;
      width:100%;
      height:100%;
      left:0;
      top:0;
      background: rgba(0,0,0,.5);
      z-index: 99;
      .ppsearchBox{
        position: relative;
        .canclebtn{
          position:absolute;
          top:30px;
          right:25px;
        }
        background: #FFF;
        padding:20px;
        .searchBox{
          background: #F6F6F6;
          width:620px;
          padding:15px;
          overflow: hidden;
          border-radius: 10px;
          .searchIcons{
            width:35px;
            height:35px;
            float:left;
            img{
              width:100%;
              height:100%;
              opacity: .4;
            }
          }
          .searchTextBox{
            float:left;
            width:500px;
            input{
              background: #F6F6F6;
              border:none;
              width:100%;
              margin-left:10px;

            }
          }

        }
      }
      .ppsearch_rel{
        background:#FFF;
        padding:20px;
        position: relative;
        .closeSearch{
          width:80px;
          height:80px;
          bottom:-150px;

          position: absolute;
          margin-left:-40px;
          left:50%;
          img{
            width:100%;
            height:100%;
          }
        }
        .hotKey{
          p{
            a{
              display: block;float:left;
              margin:15px 20px 0 0px;
              span{
                white-space: nowrap;
                border:1px solid #EEE;
                padding:5px 10px;
              }
            }
          }
        }
        .jiqiren{
          margin:25px 10px 0 10px;
          border-top:1px solid #EEE;
          padding:20px 0;
          text-align: center;
          img{
            width:100%;
          }
          p{
            color:#ff6600;
            font-weight: bold;
            font-size: 30px;
          }
        }
      }
    }

  }

</style>
