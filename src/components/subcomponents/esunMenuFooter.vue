<template>
  <nav class="mui-bar mui-bar-tab grayColor" ref="bottom">
    <a class="collectA" @tap="go('collection')">
		<div class="collectDv">
			<img :src="collect" alt="">
			<span v-bind:class="{chooseColor:$route.path==='/collection'?'chooseColor':''}">收藏菜单</span>
		</div>
	</a>
	<a class="allMenuA" @tap="go('menu')">
		<div class="allDv">
			<img :src="allMenuChoose" alt="">
			<span v-bind:class="{chooseColor:$route.path==='/menu'?'chooseColor':''}">全部菜单</span>
		</div>
	</a>
  </nav>
</template>


<script>
import mui from "../../assets/js/mui.min"
import collect from '../../assets/img/shoucan@2x(1).png'
import collectChoose from '../../assets/img/shoucan@2x.png'
import allMenuChoose from '../../assets/img/quanbu@2x.png'
import allMenu from '../../assets/img/quanbucaid@2x.png'
export default {
  data: function () {
    return {
      collect:collect,
	  collectChoose:collectChoose,
	  allMenu:allMenu,
	  allMenuChoose:allMenuChoose,
	  index:'',
	  n:''
	  // go:this.goBtn
    }
  },
  inject: ['reload'],
 props: {
   // goBtn: Function,
  },
  mounted(){
	  if(this.$route.path==='/menu'){
		  this.collect = collect
		  this.allMenuChoose = allMenuChoose

	  }else{
		  this.collect = collectChoose
		  this.allMenuChoose = allMenu
	  }
  },
  methods: {
    // refresh: function () {
    //   this.refreshBtn ? this.refreshBtn() : this.reload();
    // }
	go(e){
		if(e ==='collection'){
			if(this.$route.path==='/collection'){
				return;
			}
			this.index=4
			// 选中收藏
			this.collect = collect
			this.allMenuChoose = allMenuChoose
		}
		if(e ==='menu'){
			if(this.$route.path==='/menu'){
				return;
			}
			this.index=-1
			this.collect = collectChoose
			this.allMenuChoose = allMenu
		}
		this.$router.replace({
			path:`/${e}`,
			query:{
				timesindex: this.index
			}
		})
	}
  },
  created: function () {
    var that = this;
    mui.plusReady(function () {
      that.$refs.bottom.style.top = (plus.display.resolutionHeight - 50) + "px";
    })
  }
}
</script>
<style>
.grayColor{
	width: 100%;
	height: 0.49rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(238, 236, 247, 1);
	box-shadow:0px 2px 18px 1px rgba(59,88,212,0.08);
	display: flex;
	flex-direction: row;
	/* line-height: 0.49rem; */
	font-size:0.09rem;
	font-family:PingFang SC;
	font-weight:600;
}
.grayColor a{
	flex: 1;
}
.collectDv, .allDv{
	position: relative;
	width: 0.4rem;
	height: 0.49rem;
	margin-left: 50%;
	padding-top: 0.08rem;
	transform: translateX(-50%);
	text-align: center;
}
.collectDv span,.allDv span{
	display: block;
	position: absolute;
	top: 0.25rem;
	color:rgba(153,153,153,1);
	outline: none;
}

img{
	width: 0.18rem;
	height: 0.18rem;

} 
.chooseColor{
	color:#3B58D4 !important;
}
</style>

