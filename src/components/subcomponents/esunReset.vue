<template>
  <div class="popover-bg">
  	<div class="popover-inner">
  		<div class="popInner">
			<span class="closeSpan" @tap="cancel"><img :src="close" alt=""></span>
  			<div class="title"><img :src="warn">确认重置页面</div>
			<div class="btn-bg">
				<button @tap="cancel" type="button" class="cancelBtn">取消</button>
				<button @tap="confirm" type="button" class="confirmBtn">确认</button>
			</div>
  		</div>
  	</div>
	<div class="popover" v-show="showDomainsDiv"></div>
  </div>
</template>


<script>
import mui from "../../assets/js/mui.min"
import warn from "../../assets/img/jingao@2x.png"
import close from "../../assets/img/guanbi@2x.png"
export default {
  data: function () {
    return {
		warn:warn,
		close:close,
		showDomainsDiv:true,
		confirm: this.confirmBtn,
		cancel: this.cancelBtn,
		refreshBtn: this.reloadBtn
    }
  },
  inject: ['reload'],
  props: {
    confirmBtn: Function,
    cancelBtn: Function,
  },
  methods: {
	
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
.bluecolor {
  background-color: #fff;
  /* color: #3B58D4 !important; */
}
.bluecolor span:first-of-type{
	color: #3B58D4 !important;
}
	.popover{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		background:rgba(0,0,0,1);
		opacity:0.62;
	}
	.popover-bg .popover-inner {
		position: absolute;
		width: 3rem;
		height: 2.26rem;
		background:rgba(255,255,255,1);
		border:1px solid rgba(238, 236, 247, 1);
		box-shadow:0px 2px 18px 1px rgba(59,88,212,0.08);
		border-radius:1px;
		left: 0.38rem;
		top: 1.91rem;
		z-index: 101;
		opacity: 1;
		/* padding: 0.24rem 0 0 0.19rem; */
		/* padding-left: 0.19rem; */

	}
	.popover-bg .title {
		/* width: 1.5rem;
		height: 0.2rem; */
		padding-top: 0.90rem;
		padding-left: 0.97rem;
		position: relative;
		font-size: 0.16rem;
		font-family: PingFang SC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 25px;
		z-index: 1;

	}
	.title img{
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		/* top:-0.1rem; */
		left: 0.67rem;
		top:0.92rem;
	}
	.popover-bg .btn-bg {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0.12rem;
		left: 0;
	}
	.popover-bg .btn-bg button:first-of-type{
		background: #E8EAF7;
		color: #9699A7;
	}
	.popover-bg .btn-bg button {
		/* position: absolute; */
		/* margin-left:0.08rem; */
		width: 1.3rem;
		height: 0.47rem;
		background:rgba(59,88,212,1);
		color: #fff;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
	}
	.popInner{
		position: relative;
		width: inherit;
		height: inherit;
	}
	.closeSpan{
		position: absolute;
		display: block;
		width:0.16rem;
		height: 0.16rem;
		right: 0.12rem;
		top: 0.19rem;
		z-index: 2;
	}
	.closeSpan img{
		width:0.16rem;
		height: 0.16rem;
	}
</style>

