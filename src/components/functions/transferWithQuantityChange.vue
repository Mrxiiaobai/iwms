<template>
  <v-touch v-on:swiperight="back" class="wrapper">
    <div class="container" v-cloak>
      <EsunHeader
        v-bind:ismenu="false"
        v-bind:iscenter="false"
        v-bind:headername="header"
        v-bind:goback="back"
        v-bind:usercenter="gousercenter"
      ></EsunHeader>
      <div class="content">
        <div class="mui-content-padded" style="margin: 0px;">
          <div class="mui-input-group">
            <!-- <div class="mui-input-row">
              <label>用户ID:</label>
              <label style="padding: 11px 0px;">{{userId}}</label>
            </div>-->
            <div class="mui-input-row">
              <label>生效日期:</label>
              <input class="mui-version" style="width:150px;" type="date" v-model="effectiveDate">
              <span>V1.0.0</span>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row" id="siteLocationDiv">
              <label>
                <span style="color:red;">*</span>至地点库位:
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toSiteAndLocation"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>至地点/库位</label>
              <label style="padding: 11px 0px;">{{toSite}}{{toLocation}}</label>
            </div>
            <!-- <div class="mui-input-row inforLabel">
              <label>至库位:</label>
              <label style="padding: 11px 0px;">{{toSite}}</label>
            </div>-->
            <div class="mui-input-row inforLabel">
              <label>至货格</label>
              <label style="padding: 11px 0px;">{{toGrid}}</label>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row" id="barcodeDiv">
              <label>
                <span style="color:red;">*</span>条码:
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                :disabled="!inputDisabledFlag"
                :class="!inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>零件号</label>
              <label style="padding: 11px 0px;">{{compontentId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>数量</label>
              <label style="padding: 11px 0px;">{{quality}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>自地点/库位</label>
              <label style="padding: 11px 0px;">{{fromSite}}{{fromLocation}}</label>
            </div>
            <!-- <div class="mui-input-row inforLabel">
              <label>自库位:</label>
              <label style="padding: 11px 0px;">{{fromLocation}}</label>
            </div>-->
            <div class="mui-input-row inforLabel">
              <label>自货格</label>
              <label style="padding: 11px 0px;">{{fromGrid}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>自批次</label>
              <label style="padding: 11px 0px;">{{fromBatch}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>自参考</label>
              <label style="padding: 11px 0px;">{{fromReference}}</label>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row inforLabel">
              <label>单位</label>
              <label style="padding: 11px 0px;">{{unit}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>转换因子</label>
              <label style="padding: 11px 0px;">{{convertFactor}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>调整数量</label>
              <label style="padding: 11px 0px;">{{adjustQuantity}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row mui-radio">
              <label>数量</label>
              <input name="radio" type="radio">
            </div>
            <div class="mui-input-row mui-radio">
              <label>重量</label>
              <input name="radio" type="radio" checked>
            </div>
          </div>
        </div>
      </div>
      <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
      <EsunMask v-bind:show="mask"></EsunMask>
    </div>
  </v-touch>
</template>
<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  name: "transferWithQuantityChange",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      toSiteAndLocation: '',
      toSite: '',
      toLocation: '',
      toGrid: '',
      barcode: '',
      compontentId: '',
      quality: '',
      fromSite: '',
      fromLocation: '',
      fromGrid: '',
      fromBatch: '',
      fromReference: '',
      unit: '',
      convertFactor: '',
      adjustQuantity: '',
      mask: false,
      header: "变更数量的库存转移",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false
    };
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.effectiveDate = app.getDate()
  },
  methods: {
    reload: function () {
      this.toSiteAndLocation = ''
      this.toSite = ''
      this.toLocation = ''
      this.toGrid = ''
      this.barcode = ''
      this.compontentId = ''
      this.quality = ''
      this.fromSite = ''
      this.fromLocation = ''
      this.fromBatch = ''
      this.fromReference = ''
      this.unit = ''
      this.convertFactor = ''
      this.adjustQuantity = ''
      this.inputDisabledFlag = false
    },
    gousercenter: function () {
      this.inputChangeAjaxFlag = false
      app.center(this);
    },
    back: function () {
      this.inputChangeAjaxFlag = false
      app.back(this);
    },
    cancel: function () {

    },
    ok: function () {

    }
  },
  activated: function () {
    this.inputChangeAjaxFlag = true
  }
};
</script>

<style scoped>
.center {
  padding-top: 20px;
}
.mui-input-row .mui-input-clear ~ .mui-icon-clear {
  top: 0.2rem !important;
  color: lightblue !important;
  font-size: 35px;
}
.inforLabel {
  background-color: #f2f2f2;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
</style>

