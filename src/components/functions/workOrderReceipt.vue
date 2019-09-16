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
              <label class="mui-icon iconfont icon-circle" id="circle" style="color:green;">
                &nbsp;
                <span style="color:black;">{{connectStatusDiscribe}}</span>
              </label>
            </div>-->
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
                <span style="color:red;">*</span>加工单ID
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="workOrderID"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                :disabled="inputDisabledFlag"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>托盘号：
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="salverId"
                :disabled="!inputDisabledFlag"
                :class="!inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>托盘总箱数</label>
              <label style="padding: 11px 0px;">{{quantityOfBoxOnSalver}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>已扫描箱数</label>
              <label style="padding: 11px 0px;" class="disabledTrue">{{quantityOfBoxScanned}}</label>
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
            <div class="mui-input-row" id="siteLocationDiv">
              <label>零件号:</label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="itemId"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                :disabled="inputDisabledFlag"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>零件编码:</label>
              <label style="padding: 11px 0px;">{{compontentId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>地点:</label>
              <label style="padding: 11px 0px;">{{site}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>货格:</label>
              <label style="padding: 11px 0px;">{{grid}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批次:</label>
              <label style="padding: 11px 0px;">{{batch}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>参考号:</label>
              <label style="padding: 11px 0px;">{{referenceId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批次属性1:</label>
              <label style="padding: 11px 0px;">{{batchProperty1}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批次属性2:</label>
              <label style="padding: 11px 0px;">{{batchProperty2}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>数量</label>
              <label style="padding: 11px 0px;">{{quantity}}</label>
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
  name: "workOrderReceipt",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      workOrderID: '',
      salverId: '',
      quantityOfBoxOnSalver: 0,
      quantityOfBoxScanned: 0,
      barcode: '',
      itemId: '',
      compontentId: '',
      site: '',
      grid: '',
      batch: '',
      referenceId: '',
      batchProperty1: '',
      batchProperty2: '',
      quantity: 0,
      mask: false,
      header: "加工单入库",
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
      this.workOrderID = ''
      this.salverId = ''
      this.quantityOfBoxOnSalver = 0
      this.quantityOfBoxScanned = 0
      this.barcode = ''
      this.itemId = ''
      this.compontentId = ''
      this.site = ''
      this.grid = ''
      this.batch = ''
      this.referenceId = ''
      this.batchProperty1 = ''
      this.batchProperty2 = ''
      this.quantity = 0
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

