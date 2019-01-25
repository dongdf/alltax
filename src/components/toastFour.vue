<template>
    <div class="fadedfour" v-show="toastfour">
          <div class="smBox" v-show=true >
            <h5>确定通过？</h5>
            <p>
              <span class="lightBtn" @click="hideToast">取消</span>
              <span class="darkBtn" @click="hideToast">确定</span>    
            </p>
          </div>
    </div>
</template>
<script>
    
export default {
    name: "toastFour",

    data() {
        return {
          toastfour:false,
        }
    },
    props: {
        toastfour: {
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
        hideToast() {
            this.toastfour = false;
        },
        showToast(){
          this.toastfour = true;
        }
    },

    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.fadedfour{
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    z-index: 800;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.4);
    
    .smBox{
      width:80%;
      height:auto;
      background-color: #fff;
      border-radius: 10pt;
      padding:20pt;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width:30pt;
        height:30pt;
        margin-bottom: 10pt;
      }

      h5{
        line-height: 35pt;
        height:35pt;
        font-size: 13pt;
        font-weight: 500;
        color:#333333;
      }
      p{
        width:100%;
        line-height: 23pt;
        height:35pt;
        font-size: 9pt;
        font-weight: 500;
        color:#C9A063;
        display: flex;
        justify-content: space-around;
      }
      label{
        width:100%;
        line-height: 15pt;
        height:30pt;
        font-size: 9pt;
        font-weight: 500;
        color:#333333;
        display: flex;
        justify-content: space-around;
      }

      .lightBtn{
        display: block;
        width:60pt;
        height:25pt;
        line-height: 20pt;
        border-radius: 5pt;
        padding:3pt 10pt;
        text-align: center;
        color:#C9A063;
        background-color: #fff;
        border:1pt solid #C9A063;
        border-radius: 3pt;
      }
      .darkBtn{
        display: block;
        width:60pt;
        height:25pt;
        line-height: 20pt;
        border-radius: 5pt;
        padding:3pt 10pt;
        text-align: center;
        color:#fff;
        background-color: #C9A063;
        border:1pt solid #C9A063;
        border-radius: 3pt;
      }

      
    }
  }
</style>