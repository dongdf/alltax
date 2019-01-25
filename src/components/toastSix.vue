<template>
    <div class="fadedsix" v-show="toastsix">
        <div class="smBox" v-show=true>
            <h5>确定转让该用户？</h5>
            <div class="contentdiv">请选择用户归属</div>
            <div class="selectdiv">
                <select>
                    <option>15176503123</option>
                </select>
            </div>
            <div class="inputdiv">
                <img src="/imgs/search.png">
                <input type="text" name="">
            </div>
            <!-- <div class="shifou">
               <div class="zhike">
                  是否含直客：
               </div>
               <div class="zhike1">
                 <div class="shifoudiv">
                    <div id="check_css3">
                      <span><input type="checkbox"class="input_check" id="shi"><label for="shi"></label></span>
                    </div>
                    &nbsp;是
                </div>
                <div class="shifoudiv">
                  <div id="check_css3">
                    <span><input type="checkbox"class="input_check" id="fou"><label for="fou"></label></span>
                  </div>
                  &nbsp;否
                </div>
              </div>
            </div>
            -->
            <p>
                <span class="lightBtn" @click="hideToast">取消</span>
                <span class="darkBtn" @click="hideToast">确定</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "toastSix",

    data() {
        return {
            toastsix: false
        }
    },
    props: {
        toastsix: {
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
            this.toastsix = false;
        },
    },

    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.fadedsix {
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    #check_css3 {
        margin: 0 !important;
        float: left;
        padding-top: 0pt !important;
    }
    #check_css3 span {
        position: relative;
    }
    #check_css3 .input_check {
        position: absolute;
        visibility: hidden;
    }
    #check_css3 .input_check+label {
        display: inline-block;
        width: 12pt!important;
        ;
        height: 12pt!important;
        ;
        border-radius: 50%;
        border: 1px solid #ffd900;
    }

    #check_css3 .input_check:checked+label:after {
        content: "";
        position: absolute;
        bottom: 8pt!important;
        ;
        width: 5pt!important;
        ;
        height: 3pt!important;
        ;
        border: 2px solid #e92333;
        border-top-color: transparent;
        border-right-color: transparent;
        -ms-transform: rotate(-60deg);
        -moz-transform: rotate(-60deg);
        -webkit-transform: rotate(-60deg);
        transform: rotate(-45deg);
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
            width: 20pt;
            height: 20pt;
            position: absolute;
            z-index: 10;
            padding-top: 1%;
            padding-left: 1%;
            /* margin-bottom: 10pt; */
        }
        .shifou {
            display: flex;
            width: 100%;
            margin-bottom: 8%;
            .zhike {
                width: 30%;
                display: flex;
                font-size: 9pt !important;
                margin-left: 1%;
            }
            .zhike1 {
                width: 50%;
                display: flex;
                font-size: 9pt !important;
                margin-left: 1%;
            }
            .shifoudiv {
                display: flex;
                padding-left: 20%;
                font-size: 9pt !important;
            }
        }
        h5 {
            line-height: 35pt;
            height: 35pt;
            font-size: 13pt;
            font-weight: 500;
            color: #333333;
        }
        p {
            width: 100%;
            line-height: 23pt;
            height: 35pt;
            font-size: 9pt;
            font-weight: 500;
            color: #C9A063;
            display: flex;
            justify-content: space-around;
        }
        .contentdiv {
            width: 100%;
            line-height: 15pt;
            height: 25pt;
            font-size: 9pt;
            font-weight: 500;
            color: #333333;
            text-align: left;
            padding-left: 1%;
            /* display: flex;
        justify-content: space-around; */
        }
        .selectdiv {
            width: 100%;
            padding-bottom: 6%;
            select {
                width: 100%;
                border-radius: 3pt;
                border-color: #ddd;
                height: 25pt;
            }
        }
        .inputdiv {
            width: 100%;
            padding-bottom: 6%;
            input {
                width: 100%;
                border-radius: 3pt;
                padding-left: 12%;
                border: 1pt solid #ddd;
                height: 25pt;
            }
        }
        .lightBtn {
            display: block;
            width: 60pt;
            height: 25pt;
            line-height: 20pt;
            border-radius: 5pt;
            padding: 3pt 10pt;
            text-align: center;
            color: #C9A063;
            background-color: #fff;
            border: 1pt solid #C9A063;
            border-radius: 3pt;
        }
        .darkBtn {
            display: block;
            width: 60pt;
            height: 25pt;
            line-height: 20pt;
            border-radius: 5pt;
            padding: 3pt 10pt;
            text-align: center;
            color: #fff;
            background-color: #C9A063;
            border: 1pt solid #C9A063;
            border-radius: 3pt;
        }
    }
}
</style>