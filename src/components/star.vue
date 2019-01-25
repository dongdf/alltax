<template>
    <div class="star">
        <span :class="{light:level>0}"></span>
        <span :class="{light:level>1}"></span>
        <span :class="{light:level>2}"></span>
        <span :class="{light:level>3}"></span>
        <span :class="{light:level>4}"></span>
    </div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			level:{
				default:0
			}
		}
	}
</script>