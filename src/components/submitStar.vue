<template>
    <mt-popup v-model="pickerShow" position="bottom" class="starPop" :modal="true">
        <div class="subStar">
            <h3>评价<span><img @click="close()" src="./imgs/cancel.png"/></span></h3>
            <div class="star">
                <span @click="star(1)" :class="level >= 1?'light':''" ></span>
                <span @click="star(2)" :class="level >= 2?'light':''" ></span>
                <span @click="star(3)" :class="level >= 3?'light':''" ></span>
                <span @click="star(4)" :class="level >= 4?'light':''" ></span>
                <span @click="star(5)" :class="level >= 5?'light':''" ></span>
            </div>
            <div class="starText">
                <textarea style="outline: none; border:None;" placeholder="请输入评价内容" v-model="content" rows="5"></textarea>
            </div>
            <div class="starbtn">
                <button @click="subcontent">提交</button>
            </div>
        </div>
    </mt-popup>
</template>

<script>
  export default {
    name: "submit-star",
    props:['pickerShow','pickerList'],
    data(){
      return{
        level:5,
        content:'',
        ispj:true
      }
    },
    methods:{
      subcontent(){
        if(!this.ispj){
          return false;
        }
        this.ispj = false;
        this.$http.post('order/orderService/criticism/add',{
          subData:{
            score:this.level,
            content:this.content,
            orderId:this.pickerList.rel.id
          }
        }).then(res=>{
          if(res.data.code == 1){
                this.$toast({
                  message:'提交成功',
                  position:'bottom'
                });
              this.ispj = true;

              this.$emit('updatecomm',this.pickerList.rel.id);
          }

        })
      },
      star(idx){
        this.level = idx;
      },
      close(){
        this.$emit('itemcancle');
      }
    }
  }
</script>

<style lang="scss" scoped>
    .starPop{width:100%;height:100%; background:none;}
    .subStar{
        background:#FFF;
        padding-bottom: 80px;
        position: fixed;
        width:100%;
        bottom:0;
        h3{
            padding:25px; border-bottom: 1px solid #DDD;
            text-align: center;
            span{
                position: absolute;
                left:15px;
                top:25px;
                img{width:45px;}
            }
        }
        .star {
            display: block;
            vertical-align: middle;
            height: 100px;
            text-align: center;
            padding:40px 0;
            span {
                display: inline-block;
                width: 45px;
                height: 45px;
                background-image: url('./imgs/star1.png');
                background-repeat: no-repeat;
                background-size:100%;
                margin-right: 3px;
            }
            span.light {
                background-image: url('./imgs/star.png');
                background-size:100%;
            }
        }
        .starText{
            margin:20px 50px;
            border:1px solid #CCC;
            padding:10px;
            background: #F5F5F5;
            border-radius: 10px;

            textarea{
                border:1px solid #DDD;
                width:100%;
                background: #F5F5F5;

                border-radius: 10px;
                outline: none;

            }
        }
        .starbtn{
            padding:0 50px;
            button{
                width:100%;padding:15px;
                background: #b5935c;
                color:#FFF;
                border:none;
                font-weight: bold;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }

        }

    }

</style>