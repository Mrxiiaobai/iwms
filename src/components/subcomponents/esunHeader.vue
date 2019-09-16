<template>
  <header id="header" class="mui-bar mui-bar-nav">
    <a v-if="!menu"
      class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
      style="color: #343434;"
      @tap="backclick">
      <span></span>
    </a>
    <a
      v-if="menu"
      class="mui-action-menu mui-icon mui-pull-left"
      style="color: #343434;padding-top:0px">
      <label @click="clickNameLabelChild">
        <span class="mui-icon mui-icon-bars"></span>
      </label>
      <!-- <label
        class="mui-icon iconfont icon-circle"
        id="circle"
        :style="{color:onlineStatusIconColor, fontSize:'16px',marginLeft: '6REM',padding: 0}"
      >
        <span style="color:black;margin-left:5px;">{{onlineStatusDescribe}}</span>
      </label>-->
    </a>
    <span class="bigTitle">
      {{name}}
    </span>
		<!-- <span class="onlineCircle"></span> -->
		<span class="resetButton" v-show="showReset" @tap="reset"><button>重置</button></span>
   <!-- <a
      v-if="!center"
      class="mui-action-menu mui-icon mui-icon-right-nav mui-icon-contact mui-pull-right"
      style="color: #343434;"
      @tap="centerfn"
    ></a> -->
  </header>
</template>

<script>
import app from "../../assets/js/app";
import mui from "../../assets/js/mui.min";
mui.back = function () {
  return;
};
export default {
  data: function () {
    return {
      name: this.headername,
      back: this.goback,
      centerfn: this.usercenter,
      clickNameLabelChild: this.clickMenuFather,
      openOffCanvas: this.clickName,
      menu: this.ismenu,
      center: this.iscenter,
      onlineStatusIconColor: this.$store.state.onlineStatusIconColor,
      onlineStatusDescribe: this.$store.state.onlineStatusDescribe,
			reset:this.resetBtn
			// showReset:true
    };
  },
  props: {
    headername: String,
		resetBtn:Function,
    goback: {
      type: Function,
      required: false
    },
    usercenter: {
      type: Function,
      required: false
    },
    clickMenuFather: {
      type: Function,
      required: false
    },
    ismenu: Boolean,
    iscenter: Boolean
  },
  computed: {
    colorAndDescribeChange() {
      return this.$store.state.onlineStatusIconColor
    },
		showReset(){
			let showReset = true
			if(this.$route.path ==='/menu' || this.$route.path ==='/collection'){
				showReset = false
			}else{
				showReset = true
			}
			return showReset
		}
  },
  methods: {
    backclick: function () {
      this.goback()
    }
  },
  watch: {
    colorAndDescribeChange: function () {
      this.onlineStatusIconColor = this.$store.state.onlineStatusIconColor
      this.onlineStatusDescribe = this.$store.state.onlineStatusDescribe
    },
		// showReset:function(a){
		// 	let _this = this;
		// 	console.log(a)
		// 	if(this.$route.path ==='/menu'|| this.$route.path ==='/collection'){
		// 		_this.showReset = false;
		// 	}else{
		// 		_this.showReset = true;
		// 	}
		// }
  },
  created: function () {
    mui.back = function () {
      return;
    };

  },

  mounted: function () {
  }
};
</script>
<style>
	#header{
		position: relative;
	}
	.bigTitle{
		font-size:0.16rem;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:0.44rem;
		margin-right: 0.01rem;
	}
	.onlineCircle{
		display: inline-block;
		width:0.07rem;
		height:0.07rem;
		background:rgba(32,222,132,1);
		border:1px solid rgba(16,193,109,1);
		border-radius:50%;
	}
	.resetButton{
		display: inline-block;
		position: absolute;
		right: 0.15rem;
		bottom: 0.11rem;
	}
	.resetButton button{
		width: 0.46rem;
		height: 0.22rem;
		background:rgba(232,234,247,1);
		border:1px solid rgba(207,212,232,1);
		border-radius:1px;
		padding: 0;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(89,92,105,1);
	}
</style>
