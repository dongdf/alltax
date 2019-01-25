<template>
    <div>
        <div class="ptitle" @click="hotFilter">{{fitem2Select.classfyName}}<span><img src="./img/down.png"> </span></div>
    <div id="order">

        <div class="haveorder" v-if="messageList.length>0">
            <ul v-if="fitem2Select.value == -1">
              <template v-for="s in messageList">
                <!--课程-->
                <li style="padding:5px 0;"  v-if="s.resourceType == 3">
                  <router-link :to="{path:'course-detail',query:{id:s.resourceId}}">
                    <div class="two">
                      <div class="sgoods">
                        <img :src="s.pic_url">
                      </div>
                      <div class="contents">
                        <span>{{s.title}}</span>
                        <!--<span class="price">￥5000元</span>-->
                      </div>
                      <div class="clear"></div>
                    </div>
                  </router-link>
                </li>
                <!--服务-->

                <li style="padding:5px 0;" v-if="s.resourceType == 4">
                  <router-link :to="{path:'service-detail',query:{id:s.resourceId}}">
                    <div class="two">
                      <div class="sgoods">
                        <img :src="s.pic_url" >
                      </div>
                      <div class="contents">
                        <span>{{s.title}}</span>
                        <!--<span class="price">￥5000元</span>-->
                      </div>
                      <div class="clear"></div>
                    </div>
                  </router-link>
                </li>

                <!--知识-->
                <li style="padding:5px 0;" v-if="s.resourceType == 2">
                  <router-link :to="{path:'knowledge-detail',query:{id:s.resourceId}}">
                    <div class="two">
                      <div class="sgoods" v-if="s.pic_url">
                        <img :src="s.pic_url" >
                      </div>
                      <div class="contents">
                        <span>{{s.title}}</span>
                        <!--<span class="price">￥5000元</span>-->
                      </div>
                      <div class="clear"></div>
                    </div>
                  </router-link>
                </li>

                <li style="padding:5px 0;" v-if="s.resourceType == 1">
                  <router-link :to="{path:'expert-detail',query:{id:s.resourceId}}">
                    <div class="two">
                      <div class="sgoods">
                        <img :src="s.pic_url" class="zj">
                      </div>
                      <div class="contents">
                        <span>{{s.title}}</span>
                        <!--<span class="price">￥5000元</span>-->
                      </div>
                      <div class="clear"></div>
                    </div>
                  </router-link>
                </li>


              </template>


            </ul>
            <ul v-if="fitem2Select.value == 1">
                <li style="padding:5px 0;" v-for="s in messageList">
                    <router-link :to="{path:'knowledge-detail',query:{id:s.id}}">
                    <div class="two">
                        <div class="sgoods" v-show="s.imgUrl">
                            <img :src="s.imgUrl">
                        </div>
                        <div class="contents">
                            <span>{{s.name}}</span>
                            <!--<span class="price">￥5000元</span>-->
                        </div>
                        <div class="clear"></div>
                    </div>
                    </router-link>
                </li>

            </ul>


            <ul v-if="fitem2Select.value == 2">
                <li style="padding:5px 0;" v-for="s in messageList">
                    <router-link :to="{path:'course-detail',query:{id:s.id}}">
                    <div class="two">
                        <div class="sgoods">
                            <img :src="s.imgUrl">
                        </div>
                        <div class="contents">
                            <span>{{s.name}}</span>
                            <!--<span class="price">￥5000元</span>-->
                        </div>
                        <div class="clear"></div>
                    </div>
                    </router-link>
                </li>
            </ul>


            <ul v-if="fitem2Select.value == 3">
                <li style="padding:5px 0;" v-for="s in messageList">
                    <router-link :to="{path:'service-detail',query:{id:s.id}}">
                    <div class="two">
                        <div class="sgoods">
                            <img :src="s.imgUrl" >
                        </div>
                        <div class="contents">
                            <span>{{s.name}}</span>
                            <!--<span class="price">￥5000元</span>-->
                        </div>
                        <div class="clear"></div>
                    </div>
                    </router-link>
                </li>
            </ul>
            <ul v-if="fitem2Select.value == 4">
                <li style="padding:5px 0;" v-for="s in messageList">
                    <router-link :to="{path:'expert-detail',query:{id:s.id}}">
                        <div class="two">
                            <div class="sgoods">
                                <img :src="s.imgUrl" class="zj">
                            </div>
                            <div class="contents">
                                <span>{{s.name}}</span>
                                <!--<span class="price">￥5000元</span>-->
                            </div>
                            <div class="clear"></div>
                        </div>
                    </router-link>
                </li>
            </ul>


        </div>

    </div>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>
        <noresult v-show="messageList.length == 0" :tipText="'没有记录'"></noresult>
        <div @click ="loadMoreitem" v-show="messageList.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
import pickeritem from '../../components//pickercustom/picker'
import noresult from '@/components/noresult'
export default {
    data() {
        return {
          messageList:[],
          loadshow:true,
          psize:15,
          pnumb:1,
          pickerSelect:{},
          itemComponents:[],
            value: '请输入用户民',
            order: [1, 1, 1],
            fitem2:[{classfyName:'全部',value:-1},{classfyName:'知识',value:1},{classfyName:'课程',value:2},{classfyName:'服务',value:3},{classfyName:'专家',value:4}],
            fitem2Select:{classfyName:'全部',value:-1}
        }
    },
    components: {
        tabbar,pickeritem,noresult
        //
    },
    mounted(){
      this.getallGz();

    },
    methods: {
      getallGz(){

        this.$http.post('user/userService/attention/listAll', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(res => {
          if (res.data.data.list.length == 0) {

            if (this.pnumb > 1) {
              this.$toast('没有了');
            }
            this.loadshow = false;
            return false;
          }
          if (this.messageList.length > 0) {
            let moreItem = res.data.data.list;
            for (var i in moreItem) {
              this.messageList.push(moreItem[i])
            }
            this.loadshow = true;

          } else {
            this.messageList = res.data.data.list;
            this.loadshow = true;
          }

        })

          },
      hotFilter(){
          this.itemComponents.push({
            component:pickeritem,
            data: this.fitem2,
            isshow:true
          })
      },
      itemOk(obj){
        console.log(JSON.stringify(obj));

        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
        this.messageList = [];
        this.fitem2Select = obj.selectItem;
        this.pnumb = 1;
        if(this.fitem2Select.value == 1){
          this.getkonowledg();//知识
        }
        if(this.fitem2Select.value == 2){
          this.getcourse();//课程
        }
        if(this.fitem2Select.value == 3){
          this.getservice();//服务
        }
        if(this.fitem2Select.value == 4){
          this.getexperts();//服务
        }
        if(this.fitem2Select.value == -1){
          this.getallGz();//全部
        }

      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
      showp(){

      },
      goNext() {
            this.$router.push({ path: 'compelete', query: this.$route.query })
      },
      loadMoreitem(){
        this.pnumb++;
        if(this.fitem2Select.value == 1){
          this.getkonowledg();//知识
        }
        if(this.fitem2Select.value == 2){
          this.getcourse();//课程
        }
        if(this.fitem2Select.value == 3){
          this.getservice();//服务
        }
        if(this.fitem2Select.value == 4){
          this.getexperts();//服务
        }
        if(this.fitem2Select.value == -1){
          this.getallGz();//全部
        }

      },
      getexperts(){
        this.$http.post('user/userService/userAttentionExpert', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.messageList.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data;
          this.loadshow = true;
        }


      })

      },
      getkonowledg(){//知识
        this.$http.post('user/userService/userAttentionKnowledge', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.messageList.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data;
          this.loadshow = true;
        }


      }
      )
      },
      getcourse(){//课程
        this.$http.post('user/userService/userAttentionCurriculum', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.messageList.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data;
          this.loadshow = true;
        }


      }
      )
      },
      getservice(){//服务
        this.$http.post('user/userService/userAttentionGood', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize

          }
        }).then(
          res => {
          if(res.data.data.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.messageList.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.messageList.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.messageList = res.data.data;
          this.loadshow = true;
        }


      }
      )
      },

    }
}
</script>
<style lang="scss">
    .ptitle {padding:20px;
        position: fixed; width:100%; border-bottom:1px solid #DDD; background:#FFF;font-size:30px; font-weight: bold;  text-align: center;
    span{
        width:35px;
        img{width:35px;
            position: relative;
            top:8px;
            left:8px;
        }
    }
    }
#order {

    padding: 10pt 0 0;


    .hide {
        display: none !important;
    }

    .noorder {

        height: 100%;
        padding-top: 20%;
        background-color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .noorder1 {
            padding-top: 10pt;
            width: 150pt;
        }
        .noorder2 {
            padding-top: 10%;
            width: 50pt;
        }
    }

    .haveorder {
        ul{
            padding-top:80px;
            .sxian {
                width: 100%;
                text-align: center;
                img {
                    width: 95%;
                }
            }

            li {
            	padding:0 6pt;
                background-color: #fff;
                margin-bottom: 10pt;
                .one {
                    padding-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    .right {
                        float: right;
                    }
                }
                .sxian {
                    width: 100%;
                    text-align: center;
                    img {
                        width: 95%;
                    }
                }
                .two {
                    margin-top: 5pt;
                    margin-left: 5pt;
                    margin-right: 5pt;
                    display: flex;
                    img {
                        width: 100%;
                    }
                    .price {
                        color: #FFAA40;
                        padding-top: 20%;
                    }
                    .contents {
                        display: flex;
                        flex-direction: column;
                        padding-left: 6pt;
                        padding-top: 3pt;

                        overflow: hidden;
                    }
                    .jieguo {
                        width: 20%;
                        img {
                            width: 80%
                        }
                    }
                    .sgoods {
                        width:220px;
                      img{
                        width:220px;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        height:150px;
                      }
                      .zj{
                        width:220px;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        height:220px;
                        margin-right:10px;
                      }

                    }
                }
                .three {
                    margin-left: 5pt;
                    margin-right: 5pt;
                    padding-bottom: 5pt;
                    .right {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
