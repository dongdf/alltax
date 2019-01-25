<template>
	<div>
		<knowledgeList :knowledgeListData="knowledgeListData"></knowledgeList>
		<div @click ="loadMoreitem" v-show="knowledgeListData.length>0 && loadshow" class="loadMore"><button>加载更多...</button></div>
	</div>
</template>
<script>
	import knowledgeList from '../../components/myknowledgeList'

	export default {
    data() {
        return {
          pnumb:1,
		  psize:10,
          knowledgeListData:[],
          loadshow:true
		}
    },

    components: {
        knowledgeList
        //
    },

    computed: {
        //
    },

    methods: {
      loadMoreitem(){
        this.pnumb++;
        this.getmine();
	  },
      getmine() {

        this.$http.post('knowledge/knowledgeService/myRead',{
          "subData":{
            "pageNum":this.pnumb,
			"pageSize":this.psize
          }
        }).then(res=>{

          if(res.data.data.list.length == 0){
          if(this.pnumb>1){
            this.$toast('没有了');
          }
          this.loadshow = false;
          return false;
        }
        if(this.knowledgeListData.length>0){
          let moreItem = res.data.data.list;
          for(var i in moreItem){
            this.knowledgeListData.push(moreItem[i])
          }

        }else{
          this.knowledgeListData = res.data.data.list;
        }

      })

      }

    },

    mounted() {
      this.getmine();

    }
}
</script>
<style>
	.loadMore {text-align: center; background:#EEE; padding:20px;}
</style>

