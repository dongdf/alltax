<template>
    <div  class="faded" >
        <div class="infoBox">
            <h5>试看结束，请购买相关课程</h5>
            <div @click="tipsbuy()" class="lightBtn">
                立即购买
            </div>
            <p @click="closetips()">暂不购买，返回>></p>
        </div>
    </div>
</template>
<script>
export default {
    name: "toastOne",

    data() {
        return {
          isshow:false

        }
    },

    props: {
        showToast: {
            default: false,
            typeof: Boolean
        },
    },

    filters: {

    },

    components: {

    },

    computed: {
        // 
    },

    methods: {
      tipsbuy(){
        this.$emit('buy');
      },
      closetips() {
        this.$emit('closebuy')
        }
    },

    mounted() {


    },

}
</script>
<style lang="scss" scoped>
.infoBox {
    width: 80%;
    text-align: center;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: auto;
    background:#FFF;
    padding: 100px 0;
}

.smBox {
    width: 80%;
    height: auto;
    background-color: #fff;
    border-radius: 10pt;
    padding: 20pt;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 30pt;
        height: 30pt;
        margin-bottom: 10pt;
    }

    h5 {
        line-height: 23pt;
        height: 23pt;
        font-size: 11pt;
        font-weight: 500;
        color: #333;
        padding:50px 0;
    }
    p {
        line-height: 23pt;
        height: 35pt;
        font-size: 9pt;
        font-weight: 500;
        color: #C9A063;
    }
    .lightBtn {
        width: 95%;
        border-radius: 5pt;
        padding: 3pt 10pt;
        text-align: center;
        color: #fff;
        background-color: #C9A063;
        border: 1pt solid #C9A063;
        margin-top: 10pt;
        margin-bottom: 5pt;
        border-radius: 3pt;
    }
}
</style>