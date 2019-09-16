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
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>转移单
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="transferOrder"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>地点库位:</label>
              <label style="padding: 11px 0px;">{{siteAndLocation}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>调入货格:</label>
              <label style="padding: 11px 0px;">{{receviceGrid}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>在途货格:</label>
              <label style="padding: 11px 0px;">{{gridOnTheWay}}</label>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>条码
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
              <label>客户明示卡</label>
              <label style="padding: 11px 0px;">{{customerExpressCard}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>客户件号:</label>
              <label style="padding: 11px 0px;">{{customerItemId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>箱数:</label>
              <label style="padding: 11px 0px;">{{boxQuantity}}</label>
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
  name: "transferWithTransferOrder",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      transferOrder: '',
      siteAndLocation: '',
      receviceGrid: '',
      gridOnTheWay: '',
      barcode: '',
      customerExpressCard: '',
      customerItemId: '',
      boxQuantity: 0,
      mask: false,
      header: "转移单转移",
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
      this.transferOrder = ''
      this.siteAndLocation = ''
      this.receviceGrid = ''
      this.gridOnTheWay = ''
      this.barcode = ''
      this.customerExpressCard = ''
      this.customerItemId = ''
      this.boxQuantity = 0
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

