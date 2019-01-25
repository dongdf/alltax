<template>
    <div id="agentinfodiv">
        <div id="expertinfo">
            
            <ul class="settingList">
                <li @click="goUser">
                    <div>
                        <img class="icon" src="./img/user_set.png">
                        <span class="left">个人信息</span>
                    </div>
                    <div> <img class="right1" src="./img/jiantou.png"></div>
                </li>
                <li @click="goAdvice">
                    <div>
                        <img class="icon" src="./img/advice.png">
                        <span class="left">投诉建议</span>
                    </div>
                    <div> <img class="right1" src="./img/jiantou.png"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import tabbar from '../../components/tabbar'
export default {
    data() {
        return {
            value: '请输入用户民'
        }
    },
    components: {
        tabbar
        // 
    },
    methods: {
        goUser() {
            this.$router.push({ path: 'user-info', query: this.$route.query })
        },
        goAdvice() {
            this.$router.push({ path: 'advice', query: this.$route.query })
        }
    }
}
</script>
<style lang="scss">
#agentinfodiv {

    .settingList {

        width: 100%;
        background-color: #fff;
        padding: 0 10pt;

        li {
            padding: 12pt 3pt;
            border-bottom: 1pt solid rgba(211, 211, 211, 0.3);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .icon{
                width:13pt;
                vertical-align: middle;
                margin-right: 7pt;
            }
            .left{
                vertical-align: middle;
                color:#666;
            }
            .right1 {
                
                height: 12pt;
                padding-right: 5%
            }
        }
        li:last-child{
             border-bottom: 0pt solid rgba(211, 211, 211, 0.3);
        }
    }
}
</style>