<template>
	<ul class="custom-la" v-show="cateShow">
            <li>
                <dl class="clear" v-for="item in typeList">
                    <dt>{{item.classfyName}}:</dt>
                    <dd v-for="dot in item.children" :id="dot.id">{{dot.classfyName}}</dd>
                </dl>
            </li>
            <li>
                <p><span class="btn" @click="showList">确定</span></p>
            </li>
        </ul>
</template>

<script>
	export default {
    data() {
        return {
          
        }
    },
    props:{
    	cateShow:{
    		default:false
    	},
    	typeList:{}
    },

    components: {
    },

    computed: {
        //
    },

    methods: {
        showList() {
            this.show = !this.show
        },
        showToast() {
            this.success = true;
        },
        goToCourse() {
            this.$router.push({ path: 'course', query: this.$route.query })
        },

        gotoDetail() {
            this.$router.push({ path: 'home', query: this.$route.query })
        }
    },
    mounted() {

    }
}





	
</script>
<style lang="scss" scoped>

	.custom-la {
        position: fixed;
        top: 90px;
        width: 100%;
        background-color: #f6f6f6;
        padding: 10pt;
        border-bottom: 1pt solid #ddd;
        p {
            text-align: center;
            .btn {
                margin: 10pt auto 5pt;
                font-size: 11pt;
                padding: 3pt 15pt;
                border: none;
                box-shadow: none;
                appearance: none;
            }
        }
        dt {
            margin-top: 5pt;
            font-size: 12pt;
            color: #C9A063;
        }
        dd {
            float: left;
            margin: 5pt 5pt 5pt 0;
            padding: 0 3pt;
            border: 2px solid #ddd;
            border-radius: 3px;
            background-color: #fff;
            font-size: 10pt;
        }
    }
</style>