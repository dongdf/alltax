<template>
    <div class="experts" v-show="experts.length>0">
        <h2>专家信息</h2>

            <div class="descs" v-for="e in experts">
                <div v-show="e.imId">
                  <router-link :to="{path:'/expert-detail',query:{id:e.id}}">
                    <img :src="e.expertHead" alt="">
                    <div class="t">
                      <span>{{e.expertName}}</span>
                    </div>
                    <div class="desc">{{e.expertIntroduction}} </div>
                    <div class="tags tagsitem" v-html="$options.filters.expertTags(e.tags)">

                    </div>
                    <div class="clearb"></div>
                  </router-link>
                </div>
              <div v-show="!e.imId">

                  <img :src="e.expertHead" alt="">
                  <div class="t">
                    <span>{{e.expertName}}</span>
                  </div>
                  <div class="desc">{{e.expertIntroduction}} </div>
                  <div class="tags tagsitem" v-html="$options.filters.expertTags(e.tags)">

                  </div>
                  <div class="clearb"></div>

              </div>

                <!--<router-link :to="{path:'/chat',query:{targetAccount:e.imId}}">-->
                    <div @click="gochat(e)" v-show="e.imId" class="zx">立即咨询</div>
                <!--</router-link>-->
            </div>


    </div>

</template>

<script>

  export default {
    name: "experts",
    props:['experts'],
    methods:{
      gochat(obj){
        this.$http.get('user/userService/getUserWeChatVo').then(res=>{
          // this.$http.get('way/serverport').then(res=>{
          this.mineInfo= res.data.data;
        if(!this.mineInfo.mobile){
          this.$messagebox.confirm('请先完善用户信息', '提示').then(ret=>{
            this.$router.push('/login');
        });
          return false;
        }

        if(this.mineInfo.imId ==obj.imId){
          this.$toast('不能自己和自己聊天')
        }else{
          this.$router.push({path:'/chat',query:{targetAccount:obj.imId}});

        }
      })
      },
      goToDetail(item) {
        this.$router.push({
          path: 'knowledge-detail',
          query: {id:item.id}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .clearb { display: block; clear: both;margin-bottom: 5px;}
    .tagsitem {background:red;}
    .experts{
        background-color: #fff;
        padding: 10px 24px;
        margin-bottom: 24px;
        h2{
            border-bottom:1px solid #DDD;padding:20px 0;
        }


    .descs{
        position: relative;
        padding: 24px 60px 64px 120px;
        display: block;
        clear:both;
        border-bottom: 1px solid #eee;
    }

    img{
        position: absolute;
        width: 90px;
        height: 90px;
        top: 24px;
        left: 0;
        border-radius: 90px;
    }

    .t{
        font-size:24px;
        color:#666;
        line-height:34px;
        margin-bottom: 12px;
    span{
        font-size:28px;
        color:#333;
        line-height:40px;
    }
    }
    .desc{
        font-size:24px;
        color:#666;
        line-height:34px;
        margin-bottom: 14px;
    }
    .tags {
        display: block;
        background: red;
    }
    .zx{
        position: absolute;
        top: 36px;
        right: 0;
        font-size:28px;
        color:#C9A063;
        line-height:40px;
    }
    }

</style>
