<template>
<div>
<button @click="takephoto()">点击拍照</button>
</div>
</template>


<script>
import mui from "../../assets/js/mui.min";
export default {
  data: function() {
    return {
      ok: this.confirmBtn,
      cancel: this.cancelBtn,
      refreshBtn: this.reloadBtn
    };
  },
  inject: ["reload"],
  props: {
    confirmBtn: Function,
    cancelBtn: Function,
    reloadBtn: {
      type: Function,
      required: false
    }
  },
  methods: {
    takephoto: function() {
      var cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          outLine("成功：" + p);
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              createItem(entry);
            },
            function(e) {
              outLine("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {
          outLine("失败：" + e.message);
        },
        { filename: "_doc/camera/", index: 1 }
      );
    },
    selectPhoto: function() {}
  },
  created: function() {
    var that = this;
    mui.plusReady(function() {
      that.$refs.bottom.style.top = plus.display.resolutionHeight - 50 + "px";
    });
  }
};
</script>
