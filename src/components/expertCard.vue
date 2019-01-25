<template>
    <div class="expertCard" v-show="expertInfo.length>0">
        <h5>专家信息</h5>
        <div class="clear desc" v-for="z in expertInfo">
            <router-link v-show="z.imId" :to="{path:'/expert-detail',query:{id:z.id}}">
            <img :src="z.expertHead" class="ar-l">
            </router-link>
            <img  v-show="!z.imId" :src="z.expertHead" class="ar-l">
            <div class="ar-l note">
                <div class="clear title">
                    <div class="ar-l">
                        <span>{{z.expertName}}</span>
                        <span>{{z.expert_name}}</span>
                    </div>

                    <div class="ar-r" v-show="z.imId" @click="gochat(z)" >立即咨询</div>

                </div>
                <p>{{z.expertIntroduction}}</p>
            </div>
            <div class="clear sign" v-html="$options.filters.expertTags2(z.tags)">
                <!--<span >著名纳税筹划专家</span>-->
                <!--<span class="ar-l">大型集团CFO</span>-->
                <!--<span class="ar-l">特级专讲师</span>-->
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:['expertInfo','relInfo'],
    methods: {
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
          this.$toast('不能和自己聊天')
        }else{
          this.$router.push({path:'/chat',query:{targetAccount:obj.imId,rel:JSON.stringify(this.relInfo)}});

        }
      })


      }
        // goToExpert(expertId) {
        //     this.$router.push({
        //         path: 'expert-detail',
        //         query: {
        //             expertId: expertId
        //         }
        //     })
        // }
    }
}
</script>
<style lang="scss" scoped>
.expertCard {
    background: #fff;
    margin-bottom: 10px;
    h5 {
        color: #333;
        font-weight: normal;
        height: 78px;
        line-height: 78px;
        border-bottom: 1px solid #ddd;
        padding-left: 27px;
    }
    .desc {
        padding: 0 26px 22px;
        img {
            width: 108px;
            height: 108px;
            margin: 42px 26px 0 0;
        }
        .note {
            width: 564px;
            .title {
                .ar-l {
                    margin: 44px 0 20px;
                    span {
                        color: #333;
                        font-size: 24px;
                        line-height: 34px;
                        &:first-child {
                            font-size: 32px;
                            margin-right: 10px;
                        }
                    }
                }
                .ar-r {
                    width: 150px;
                    height: 48px;
                    background: #A38A64;
                    border-radius: 4px;
                    color: #fff;
                    text-align: center;
                    line-height: 48px;
                    margin-top: 19px;
                }
            }
            p {
                font-size: 24px;
                color: #333;
                line-height: 30px;
            }
        }
        .sign {
            padding-top: 36px;
            span {
                color: #A38A64;
                font-size: 20px;
                height: 36px;
                line-height: 32px;
                border: 2px solid #A38A64;
                border-radius: 17px;
                padding: 0 20px;
                margin-right: 34px;
            }
        }
    }
}
</style>
