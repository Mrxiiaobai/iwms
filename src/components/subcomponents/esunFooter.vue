<template>
  <nav class="mui-bar mui-bar-tab bluecolor" ref="bottom">
    <!-- <a class="boze" @tap="ok">确定</a>
    <a class="boze" @tap="cancel"></a>
    <a class="boze" @tap="refresh">刷新</a>-->
    <a class="mui-tab-item" @tap="ok">
      <span class="mui-icon mui-icon-checkmarkempty"></span>
      <span class="mui-tab-label">确定</span>
    </a>
    <a class="mui-tab-item" @tap="cancel">
      <span class="mui-icon mui-icon-closeempty">
        <!-- <span class="mui-badge">9</span> -->
      </span>
      <span class="mui-tab-label">取消</span>
    </a>
    <a class="mui-tab-item" @tap="refresh">
      <span class="mui-icon mui-icon-refreshempty"></span>
      <span class="mui-tab-label">刷新</span>
    </a>
    <!-- <a class="k-tab-item" id="btnConfirm" >
					<span class="mui-icon mui-icon-checkmarkempty"></span><br />
					<span class="k-tab-label">确认</span>
				</a>
				<a class="k-tab-item" >
					<span class="mui-icon mui-icon-closeempty"></span><br />
					<span class="k-tab-label">取消</span>
				</a>
				<a class="k-tab-item" @tap='refresh'>
					<span class="mui-icon mui-icon-refreshempty"></span><br />
					<span class="k-tab-label">刷新</span>
    </a>-->
  </nav>
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
    refresh: function () {
      this.refreshBtn ? this.refreshBtn() : this.reload();
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
.bluecolor {
  background-color: #fff;
  /* color: #3B58D4 !important; */
}
.bluecolor span:first-of-type{
	color: #3B58D4 !important;
}
</style>

