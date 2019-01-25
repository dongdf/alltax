<template>
    <div class="myScore">
        <div class="scoreTop">
            <img src="./img/score.png" alt="">
            <h5>100000</h5>
            <p>可用积分</p>
        </div>
        <ul class="tab clear">
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">积分收入</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">积分支出</li>
        </ul>
        <div class="tabContent">
            <div class="cards" v-show="active == 0">
                <ul class="movements">
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>+800</div>
                    </li>
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>+800</div>
                    </li>
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>+800</div>
                    </li>
                </ul>
            </div>
            <div class="cards" v-show="active == 1">
                <ul class="movements">
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>- 800</div>
                    </li>
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>- 800</div>
                    </li>
                    <li>
                        <div>
                            <h4>线下充值</h4>
                            <p>2018-03-04 13:33:44</p>
                        </div>
                        <div>- 800</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            members: [{
                    cardId: '22333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                },
                {
                    cardId: '33333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                }

            ],
            unUsed: [{
                    cardId: '33333',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                },
                {
                    cardId: '2d222',
                    password: '11223333',
                    time: '2018-04-23',
                    user: '134****3345'
                }

            ]
        }
    },
    methods: {
        tab(index) {
            this.active = index;
        }
    },

}
</script>
<style lang="scss">
.myScore {

    .scoreTop {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15pt 0;
        background-color: #fff;
        img {
            width: 50pt;
            height: 50pt;
            margin-bottom: 5pt;
        }
        h5 {
            line-height: 18pt;
            font-size: 12pt;
            color: #333;
        }
        p {
            line-height: 16pt;
            color: #666;
            font-size: 10pt;
        }
    }

    .tab {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        background-color: #fff;
        padding: 5pt 20pt 1pt;
        margin: 5pt 0 0;
        border-bottom: 1px solid #ddd;
        .kuan {
            width: 50pt;
            height: 25pt;
            line-height: 25pt;
            text-align: center;
        }
        .line {
            width: 1pt;
            height: 20pt;
            background-color: #ddd;
        }
        .kuan.active {
            color: #C9A063;
        }
    }


    .cards {
        background-color: #fff;
        margin-top: 5pt;
        .movements {
            width: 100%;
            padding: 0 10pt;
            li {
                flex-direction: row;
                justify-content: space-between;
                display: flex;
                -ms-align-items: center;
                align-items: center;
                color: #666;
                padding: 7pt 5pt;
                border-bottom: 1pt solid #ececec;
                h4 {
                    font-size: 10pt;
                }
                p {
                    font-size: 7pt
                }
            }
            li:last-child {
                border: 0px solid #ddd;
            }
        }
        table {
            width: 100%;
            padding: 0 10pt;
        }
        th {
            color: #333;
            font-weight: normal;
            font-size: 9pt;
            line-height: 25pt;
            border-bottom: 1px solid #ececec;
        }

        td {
            text-align: center;
            line-height: 25pt;
            color: #666;
            font-size: 10pt;
        }
    }
}
</style>