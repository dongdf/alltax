<template>
    <div class="focus">
        <ul class="tab clear">
            <li class="kuan" :class="{active:active==0}" @click="tab(0)">课程</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==1}" @click="tab(1)">案例</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==2}" @click="tab(2)">问题</li>
            <li class="line"></li>
            <li class="kuan" :class="{active:active==3}" @click="tab(3)">专家</li>
        </ul>

        <div class="tabContent">
            
            <div class="cards" v-show="active == 0">
     <courseList></courseList>
            </div>
            <div class="cards" v-show="active == 1">
            	<knowledgeList></knowledgeList>
            </div>
            <div class="cards" v-show="active == 2">
                <quetionList></quetionList>
            </div>
            <div class="cards" v-show="active == 3">
                <smExpertList></smExpertList>
            </div>
        </div>
    </div>
</template>
<script>


import courseList from '../../components/courseList'
import knowledgeList from '../../components/knowledgeList'
import quetionList from '@/components/questionList'
import smExpertList from '@/components/smExpertList'

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
    components:{
        courseList,
        knowledgeList,
        quetionList,
        smExpertList
    },

    methods: {
        tab(index) {
            this.active = index;
        }
    },

}
</script>

<style lang="scss" >

.focus {

    .tab {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        padding: 0pt 10pt 0pt 10pt;
        margin: 5pt 0 0 0;
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

        .kuan.active{
        	color:#C9A063;
        }
    }

    .cards {
        background-color: #fff;
        margin-top: 5pt;
        table{
        	width:100%;
        	padding:0 10pt;
        }
        th{
        	color:#333;
        	font-weight: normal;
        	font-size: 9pt;
        	line-height: 25pt;
        	border-bottom: 1px solid #ececec;
        }

        td{
        	text-align: center;
        	line-height: 25pt;
        	color:#666;
        	font-size: 10pt;
        }
    }
}
</style>