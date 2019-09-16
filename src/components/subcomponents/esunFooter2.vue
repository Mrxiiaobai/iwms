<template>
  <div class="footer" ref="bottom">
			<div class="footerLeft">
				<span class="backStep"><button>上一步</button></span>
				<span class="scanSpan">已扫描</span>
				<div class="scanContent">
					<div class="scanDv">
						<span>0</span>
						<span>托盘</span>
					</div>
					<div class="scanDv">
						<span>0</span>
						<span>货格</span>
					</div>
					<div class="scanDv">
						<span>0</span>
						<span>货单</span>
					</div>
				</div>
			</div>
			<div class="footerRight">
				<button>确认</button>
			</div>
	</div>
</template>


<script>
import mui from "../../assets/js/mui.min"
export default {
  data: function () {
    return {
      ok: this.confirmBtn,
      cancel: this.cancelBtn,
      refreshBtn: this.reloadBtn
    }
  },
  inject: ['reload'],
  props: {
    confirmBtn: Function,
    cancelBtn: Function,
    reloadBtn: {
      type: Function,
      required: false
    }
  },
  methods: {
		
  },
  created: function () {
    
  }
}
</script>
<style>
	.footer{
		width: 95%;
		height: 0.45rem;
		position: absolute;
		background:rgba(51,51,51,1);
		box-shadow:0px 0px 11px 2px rgba(85,85,99,0.16);
		border-radius:1px;
		bottom: 0.16rem;
		left:2.5%;
		display: flex;
		flex-direction: row;
	}
	.footerLeft{
		position: relative;
		flex: 2;
	}
	.footerRight{
		flex: 1;
	}
	.footerRight button{
		width: 100%;
		height: 100%;
		background:rgba(59,88,212,1);
		border-radius:0px 1px 1px 0px;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		border: 0;
	}
	.backStep{
		display: block;
		width: 0.68rem;
		height: 0.25rem;
		position: absolute;
		left: 0.09rem;
		top: 0.1rem;
	}
	.backStep button{
		width: 0.68rem;
		height: 0.25rem;
		background:rgba(71,71,71,1);
		box-shadow:0px 0px 11px 2px rgba(85,85,99,0.16);
		border-radius:1px;
		font-size:0.11rem;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		border: 0;
	}
	.scanSpan{
		writing-mode: vertical-rl;
		font-size:0.09rem;
		font-family:PingFang SC;
		font-weight:500;
		line-height:0.12rem;
		color: #999;
		position: absolute;
		left: 0.88rem;
		top: 0.1rem;
	}
	.scanContent{
		position: absolute;
		left: 1.08rem;
	}
	.scanDv{
		display: inline-block;
		height: 0.45rem;
		margin-left: 0.17rem;
	}
	.scanDv:first-of-type{
		margin-left: 0.12rem;
	}
	.scanDv span{
		display: block;
		text-align: center;
		height: 0.225rem;
		font-family:PingFang SC;
		font-weight:500;
	}
	.scanDv span:first-of-type{
		font-size:0.16rem;
		line-height: 0.3rem;
		color:rgba(255,255,255,1);
		
	}
	.scanDv span:last-of-type{
		line-height: 0.2rem;
		font-size:0.09rem;
		color:#999;
	}
</style>

