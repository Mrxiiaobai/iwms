<template>
  <v-touch v-on:swiperight="back" class="wrapper">
    <div class="container" v-cloak>
      <header class="mui-bar mui-bar-nav" style="background-color: #ffffff;">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @tap="back()"></a>
        <h1 class="mui-title" style="color: #0E76E1;">物品二维码扫描</h1>
        <span
          class="mui-icon mui-icon-spinner-cycle mui-spin mui-pull-right"
          id="turnTheLight"
          @click="turnLight()"
        ></span>
      </header>

      <div id="bcid">
        <!--盛放扫描控件的div-->
      </div>

      <div class="mui-bar mui-bar-footer" style="padding: 0px;">
        <div class="fbt" @tap="scanPicture()">从相册选择二维码</div>
        <div class="fbt mui-action-back" @tap="back()">取 消</div>
      </div>
    </div>
  </v-touch>
</template>
<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  name: "scan",
  data: function () {
    return {
      scan: null,
      flag: false,
      scannum: ""
    };
  },
  props: {
    scanStatus: Boolean,
    scanMode: 1 //两种模式，连续扫描与单笔扫描(1与0)
  },
  watch: {
    scanStatus: function () {
      this.scanStatus && this.init();
    }
  },
  methods: {
    turnLight: function () {
      var that = this;
      if (that.flag == false) {
        that.scan.setFlash(true);
        that.flag = true;
      } else {
        that.scan.setFlash(false);
        that.flag = false;
      }
    },
    back: function () {
      var that = this;
      that.scannum = -1;
      localStorage.setItem("scanindex", JSON.stringify(that.scannum));
      that.scan.close();
      app.back(that);
    },
    scanSuc: function (type, result, file) {
      var that = this;
      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其它" + type;
          break;
      }
      result = result.replace(/\n/g, "");
      if (this.scanMode === 1) {
        that.$emit(
          "scaned",
          result,
          this.scanMode,
          function () {
            setTimeout(() => {
              that.scan.start({
                conserve: false
              });
            }, 3000);
          },
          function () {
            that.scan.close();
          }
        );
      } else {
        this.$emit("scaned", result, this.scanMode);
        this.scan.close();
      }
    },
    onmarked: function (type, result, file) {
      var that = this;
      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其它" + type;
          break;
      }
      result = result.replace(/\n/g, "");
      that.scannum = result;
      localStorage.setItem("scannum", that.scannum);
      that.scan.close();
      app.back(that);
    },
    scanPicture: function () {
      var that = this;
      setTimeout(() => {
        plus.gallery.pick(
          function (path) {
            plus.barcode.scan(path, that.onmarked, function (error) {
              plus.nativeUI.alert("无法识别此图片");
            });
          },
          function (err) {
            console.log("Failed: " + err.message);
          }
        );
      }, 1000);
    },
    init: function () {
      if (!window.plus) return;
      let that = this;
      setTimeout(() => {
        that.scan = new plus.barcode.Barcode("bcid");
        that.scan.onmarked = that.onmarked;
        that.scan.start({
          conserve: false
        });
      }, 1000);
    }
  },
  created: function () {
    var that = this;
    app.init(this);
    this.scan = null;
    this.init();
  }
};
</script>

<style scoped>
#bcid {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000000;
}

.fbt {
  color: #0e76e1;
  width: 50%;
  background-color: #ffffff;
  float: left;
  line-height: 44px;
  text-align: center;
}
</style>

