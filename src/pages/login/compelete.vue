<template>
    
    <div>
        <div id="compelete">
            <!--<div class="progressBox">-->
                <!--<h5>40%</h5>-->
                <!--<div class="progress lv4">-->
                    <!--<span></span>-->
                <!--</div>-->
                <!--<p>完善信息可得100积分</p>-->
            <!--</div>-->
            <div class="choosepos">请选择您的职业</div>
            <div class="tags">

                <span v-for='item in tags' :class="info.position_name == item.name?'active':''" @click="tab(item)">{{item.name}}</span>
            </div>
            <div class="tabContent">

                <div class="form" >
                    <form action="">
                        <p>
                            <span>姓名：</span>
                            <input type="text" v-model="info.real_name" placeholder="请输入">
                        </p>
                        <p>
                            <span>性别：</span>
                           <span class="right sex"><a @click="ckSex(s)" :class="selectSex.value == s.value?'select':''" v-for="s in  sexList">{{s.name}}</a></span>
                        </p>
                        <p>
                            <span>年龄：</span>
                            <input type="text" v-model="info.age" placeholder="请输入">
                        </p>
                        <p>
                            <span>公司名称：</span>
                            <input type="text" v-model="info.company_name" placeholder="请输入公司名称">
                        </p>
                        <p>
                            <span>公司行业：</span>
                            <span class="right" @click="popPicker(1)">
                            {{filterItems1Select.classfyName?filterItems1Select.classfyName:'请选择'}} >
                        </span>
                        </p>
                        <p>
                            <span>注册资金：</span>
                            <span class="right" @click="popPicker(2)">
                            {{filterItems2Select.classfyName?filterItems2Select.classfyName:'请选择'}} >
                        </span>
                        </p>
                        <p>
                            <span>企业性质：</span>
                            <span class="right" @click="popPicker(3)">
                            {{filterItems3Select.classfyName?filterItems3Select.classfyName:'请选择'}} >
                        </span>
                        </p>
                        <p>
                            <span>企业规模：</span>
                            <span class="right" @click="popPicker(4)">
                            {{filterItems4Select.classfyName?filterItems4Select.classfyName:'请选择'}} >
                        </span>
                        </p>
                        <p>
                            <span>公司地址：</span>
                            <span @click="popArea()" class="right">
                            {{company_show?company_show:'请选择'}} >
                        </span>
                        </p>
                        <p>
                            <span></span>
                            <input type="text" v-model="info.company_address" placeholder="请输入详细地址" class="man">
                        </p>
                    </form>
                </div>
            </div>
            <!--{{info}}-->
            <div class="box">
                <button @click="sinfo">提交</button>
                <p><router-link :to="{path:'/'}">跳过，直接登录</router-link></p>
            </div>
        </div>
        <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>
        <div :is="item.component" v-for="item in itemComponentsArea" :pickerShow="item.areaShow" :pickerList="item.data"  @areaok="areaOk" @areacancle="areaCancle"></div>

    </div>
</template>

<script>
import Vue from 'vue'
import areas from '../../components//area/chsArea'
import pickeritem from '../../components//pickercustom/picker'

export default {
  compoents:{
    areas,pickeritem
  },

    data() {
        return {
          itemComponentsArea:[],
          info:{
            real_name:'',
            age:'',
            sex:1,
            position_name: '',//职位名称
            company_name: '',//公司名称',
            company_trade: '',//公司行业',
            company_money:'',
            company_property:'',
            company_scale:'',//规模
            company_province: '',
            company_city: '',
            company_country: '',
            company_address: '',
          },
          company_show:'',
          itemComponents:[],
            num: 0,
            tags:[
                {name:'企业主',
                active:true},
                {name:'会计师',
                active:false},
                {name:'税务师',
                active:false},
                {name:'财务',
                active:false},
                {name:'其他',
                active:false}
            ],

          filterItems1:[],
          filterItems1Select:{classfyName:''},
          filterItems2:[{classfyName:'0-100万',value:1},{classfyName:'100-500万',value:1},{classfyName:'500-1000万',value:1},{classfyName:'1000万以上',value:1}],
          filterItems2Select:{classfyName:''},
          filterItems3:[{classfyName:'央企',value:1},{classfyName:'国企',value:1},{classfyName:'民企',value:1}],
          filterItems3Select:{classfyName:''},
          filterItems4:[{classfyName:'0-50人',value:1},{classfyName:'50-100人',value:1},{classfyName:'100-500人',value:1},{classfyName:'500人以上',value:1}],
          filterItems4Select:{classfyName:''},
          sexList:[{name:'男',value:1},{name:'女',value:2}],
          selectSex:{},
          currentType:''

        }
    },
mounted(){
  document.getElementById('app').style.background="#FFF";
},
  destroyed(){
    document.getElementById('app').style.background="#F6F6F6";
  },
    methods: {
      ckSex(obj){
        this.selectSex = obj;
      },
      sinfo(){
        this.info.sex = this.selectSex.value;
        this.$http.post('user/userService/updateUserInfo',{
          subData:this.info
        }).then(res=>{
            if(res.data.code == 1){
              this.$router.push({path:'/'});
            }else{
                this.$toast(res.data.msg);
            }

        })
      },
      popPicker(type){
        this.currentType = type;
        this.itemComponents = [];
        if(type == 1){
            this.$http.get('ask/askService/getQuestionTrade').then(res=>{
              this.filterItems1 = res.data.data;
              this.itemComponents.push({
                component:pickeritem,
                data:this.filterItems1,
                isshow:true
              })

          })
        }
        if(type == 2){
          this.itemComponents.push({
            component:pickeritem,
            data:this.filterItems2,
            isshow:true
          })
        }
        if(type == 3){
          this.itemComponents.push({
            component:pickeritem,
            data:this.filterItems3,
            isshow:true
          })
        }
        if(type == 4){
          this.itemComponents.push({
            component:pickeritem,
            data:this.filterItems4,
            isshow:true
          })
        }

      },
      itemOk(obj){
        if(this.currentType == 1){
          this.filterItems1Select = obj.selectItem;
          this.info.company_trade = obj.selectItem.classfyName;
          // console.log(JSON.stringify(obj.selectItem));
        }
        if(this.currentType == 2){
          this.filterItems2Select = obj.selectItem;
          this.info.company_money = obj.selectItem.classfyName;
          // console.log(JSON.stringify(obj.selectItem));
        }
        if(this.currentType == 3){
          this.filterItems3Select = obj.selectItem;
          this.info.company_property = obj.selectItem.classfyName;
          // console.log(JSON.stringify(obj.selectItem));
        }
        if(this.currentType == 4){
          this.filterItems4Select = obj.selectItem;
          this.info.company_scale = obj.selectItem.classfyName;
          // console.log(JSON.stringify(obj.selectItem));
        }
        console.log(JSON.stringify(obj));
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];


      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
      popArea(){

        this.itemComponentsArea.push({
          component:areas,
          areaShow:true
        })

      },
      areaOk(areaObj){
        console.log(JSON.stringify(areaObj));
        this.itemComponentsArea = [];
        this.info.company_province =areaObj.province.code;
        this.info.company_city =areaObj.city.code;
        this.info.company_country =areaObj.county.code;
        this.company_show = areaObj.province.name+areaObj.city.name+areaObj.county.name;

      },
      areaCancle(){
        this.itemComponentsArea=[];
      },
        tab(obj) {
        this.info.position_name = obj.name;
        console.log(this.info.position_name);

        },

    }
}
</script>
<style lang="scss" scoped>
#app {
    background-color: #fff;
}

#compelete {
    height: 100%;
    background-color: #fff;
}
.choosepos {
    padding:25px;font-size: 25px; color:#666;
}
.progressBox {
    padding: 20pt 10pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -ms-align-items: center;

    h5 {
        width: 40%;
        text-align: right;
        color: #C9A063;
        font-weight: normal;
        font-size: 10pt;
        margin-bottom: 5pt;
    }
    .progress {
        margin: 0 auto;
        width: 80%;
        height: 8pt;
        border-radius: 5pt;
        background-color: #ddd;
        margin-bottom: 5pt;
        position: relative;
        span {
            display: inline-block;
            height: 8pt;
            width: 40%;
            background: #C9A063 repeat-x;
            background-size: auto 10px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 5pt;
        }
    }
    p {
        text-align: center;
        color: #999;
        font-size: 9pt;
        margin-bottom: 15pt;
    }
}




.progress span {}

.tags {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10pt;
}

.tags span {
    display: inline-block;
    padding: 5px 6pt;
    border-radius: 3pt;
    font-size: 9pt;
    margin: 0 2pt;
    background-color: #C9A063;
    color: #fff;
}

.form {
    padding: 0 15pt;
    .sex a{
        color: #b5935c;
        border:2px solid #b5935c;

        padding:5px 10px; margin-left:15px;
        border-radius: 5px;
        box-shadow: 0 0 2px #DDD;
    }
    .sex a.select{
    background: #b5935c;
    border:2px solid #b5935c;
        color:#FFF;
        padding:5px 10px; margin-left:15px;
        border-radius: 5px;
    }

}

.form p {
    padding: 15pt 3pt;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
    font-size: 10pt;
    height: 25pt;
    line-height: 25pt;
    border-bottom: 1px solid #ddd;
}

.form p span {
    display: inline-block;
    font-size: 11pt;
}

.form .right {
    display: inline-block;
    width: 70%;
    height: 25pt;
    background-color: #fff;
    appearance: none;
    text-align: right;
    color: #999;
    font-size: 10pt;
}

.form input {
    width: 70%;
    height: 25pt;
    font-size: 10pt;
    background-color: #fff;
    border: none;
    appearance: none;
    text-align: right;
}

.form input.man {
    width: 100%;
    text-align: left;
}

.box {
    margin-top: 30pt;
    padding: 0 10pt;
    button {
        border:none;
        width: 100%;
        height: 30pt;
        line-height: 30pt;
        background-color: #C9A063;
        color: #fff;
        font-size: 12pt;
        border-radius: 3pt;
        margin-bottom: 10pt;
    }

    input {
        width: 13pt;
        height: 13pt;
        background-color: #C9A063;
        color: #fff;
        vertical-align: middle;
    }

    p {
        text-align: center;
        font-size: 10pt;
        color: #C9A063;
    }
}
</style>