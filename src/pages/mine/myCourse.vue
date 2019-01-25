<template>
    <div id="course">
        <courseList :courseListData=courseListData></courseList>
        <div @click ="loadMoreitem" v-show="courseListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
    </div>
</template>
<script>
import courseList from '../../components/mycourseList'

export default {
    data() {
        return {
          courseListData:[],
          pnumb:1,
          psize:15,
          sonid:'',
          vtype:'',
          industryId:'',
          loadshow:true,
        }
    },

    components: {
        courseList
        // 
    },
   mounted(){
     this.getcourse()
   },

    computed: {
        // 
    },

    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getcourse();

      },
      getcourse(){
        this.$http.post('curriculum/curriculumService/findMyPlayCurriculum', {
          "subData": {
            "pageNum":this.pnumb,
            "pageSize": this.psize
          }
        }).then(
          res => {

          if(res.data.data.length == 0){
          this.$toast('没有了');
          this.loadshow = false;
          return false;
        }
        if(this.courseListData.length>0){
          let moreItem = res.data.data;
          for(var i in moreItem){
            this.courseListData.push(moreItem[i])
          }
          this.loadshow = true;

        }else{
          this.courseListData = res.data.data;
          this.loadshow = true;
        }


      }
      )
      },

    },


}
</script>
<style lang="scss">
</style>