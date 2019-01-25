<template>
    <div>
        <div class="small" v-if="type==0">
            <div class="replyBox">
                <textarea name="" id="sm" rows="2" v-model="placeholder"></textarea>
                <span class="send">
                    <img src="" alt="">
                </span>
            </div>
        </div>
        
        <div class="" v-if="type==1">
            <div class="tx">
                <textarea name="" id="tx" v-model="sayText1" class="large" placeholder="请输入内容"></textarea>
                <p><span class="btn" @click="submitDis">确定</span></p>
            </div>
        </div>

        <div class="pics" v-if='type==2'>
            <div class="tx">
                <textarea name="" id="tl" v-model="sayText" placeholder="请输入提问内容（0/500）"></textarea>
                <p v-show="pics">
                    <span><img src="/imgs/upload.png" alt=""></span>
                </p>
                <span class="btn" @click="submitDis">确定</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "pay",
    data() {
        return {
            placeholder: '请输入提问内容（0/500）',
          sayText:'',
          sayText1:''
        }
    },
    props:['type','pics','relId'],

    components: {

        // 
    },

    computed: {
        // 
    },

    methods: {
      submitDis(){
        if(!this.sayText1.trim()){
          this.$toast('请输入内容');
          return false;
        }
        this.$http.post('curriculum/curriculumService/chat/add',{
          "subData":{
            'videoId':this.relId,
            'content':this.sayText1

          }
        }).then(res=>{
          if(res.data.code == 1){
            this.$toast('发表成功');
            this.sayText1 = '';
            this.$parent.tab(1);

        }

      })

      },
        sendType(i){

            if(i==1){
                let content = document.getElementById("tx").value;
                let inputContent = {
                    
                }
                alert(data);
                 //this.$emit('ievent',data,'lalala');
            }

        },
        hideToast() {
            this.payStart = false;
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>

.small{
    .replyBox{
        position:fixed;
        height:62pt;
        padding:2pt;
        width:100%;
        bottom:0px;
        left:0px;
        display:flex;
        flex-direction: row;
        background-color: #eee;
        
        textarea{
            width:90%;
            height:100%;
            background-color: #fff;
            border:1px solid #ddd;
            border-radius: 2pt;
             color: #666;
        font-size: 9pt;
        padding:2pt;
        }
        
        .send{
            display: block;
            height:100%;
            width:10%;
            background: url(/imgs/send_h.png);
            background-size: 100% 100%;
            margin-left:3pt;
        }
    }
}
.tx{
    background: #fff;
    padding: 10pt 14pt;
    text-align: center;
    #tx {
        display: block;
        width: 100%;
        padding: 3pt 2%;
        height: 80pt;
        background: #f6f6f6;
        border: 2px solid #c9c9c9;
        border-radius: 4pt;
        appearance: none;
        color: #666;
        font-size: 9pt;
    }
    #tl{
         display: block;
        width: 100%;
        padding: 3pt 2%;
        height: 120pt;
        background: #f6f6f6;
        border: 2px solid #c9c9c9;
        border-radius: 4pt;
        appearance: none;
        color: #666;
        font-size: 9pt;
    }
    
    img {
        width: 20pt;
        height: 20pt;
        margin: 5pt;
    }
    .btn {
        display: inline-block;
        width: 8rem;
        height: 0.93333rem;
        line-height: 0.93333rem;
        background: #b5935c;
        margin: 10pt auto;
        text-align: center;
        border-radius: 0.10667rem;
        font-size: 11pt;
        color: #fff;
    }
}
</style>