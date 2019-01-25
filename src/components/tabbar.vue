<template>
    <div id="tabbar-footer">
        <ul>
            <li v-for="(item, index) in tablist" @click="goToJump(index)">
                <img :src="item.icon">
                <span>{{item._name}}</span>
            </li>
        </ul>
        <button class="icon" @click="goToAsk">
            <img :src="url">
        </button>
    </div>
</template>
<script>
export default {
    name: "tabbar",

    data() {
        return {
            url: require('./imgs/icon5_h.png'),
            tablist: [{
                    _name: '首页',
                    icon: require('./imgs/icon1_h.png')
                },
                {
                    _name: '学院',
                    icon: require('./imgs/icon2_h.png')
                },
                {
                    _name: '服务',
                    icon: require('./imgs/icon3_h.png')
                },
                {
                    _name: '我的',
                    icon: require('./imgs/icon4_h.png')
                }
            ]
        }
    },

    props: {
        //中间图标
        icon: {
            default: 1,
            typeof: Number
        },
        active: {
            default: 0,
            typeof: Number
        }
    },

    methods: {

        goToJump(index) {
            if (index == 0) {
                this.$router.push({ path: '/', query: this.$route.query })
            } else if (index == 1) {
                this.$router.push({ path: '/school', query: this.$route.query })
            } else if (index == 2) {
                this.$router.push({ path: '/areaExperts', query: this.$route.query })
            } else if (index == 3) {
                this.$router.push({ path: '/mine', query: this.$route.query })
            }
        },

        goToAsk(icon) {
            this.$router.push({ path: '/question', query: this.$route.query })
        }
    },

    mounted() {
        //下方图标高亮
        if (this.active == 0) {
            this.tablist[0].icon = require('./imgs/icon1.png');
        }
        if (this.active == 1) {
            this.tablist[1].icon = require('./imgs/icon2.png');
        }
        if (this.active == 2) {
            this.tablist[2].icon = require('./imgs/icon3.png');
        }
        if (this.active == 3) {
            this.tablist[3].icon = require('./imgs/icon4.png');
        }
        if (this.active == 4) {
            this.url = require('./imgs/icon5.png');
        }

    }
}
</script>
<style lang="scss">
#tabbar-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 98px;
    background-color: #fff;
    border-top: 1px solid #eee;

    .icon {
        position: absolute;
        top: -30px;
        left: 50%;
        margin-left: -53px;
        width: 106px;
        height: 106px;
        border: 0;
        border-radius: 53px;
        overflow: hidden;
        img{
          width:100%;
          height:100%;
        }
    }

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 98px;
        li {
            width: 22%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                display: block;
                height: 15pt;
                margin: 3pt 0 2pt;
            }

            span {
                display: block;
                font-size: 10pt;
                color: #B8B8B8;
            }

            &:nth-child(2) {
                margin-right: 10%;
            }
            &:nth-child(3) {
                margin-left: 10%;
            }
        }
    }
}
</style>
