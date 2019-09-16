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
                <span style="color:red;">*</span>配料单
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="burdeningBillId"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>调入货格
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="gridTransferTo"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>箱号:</label>
              <label style="padding: 11px 0px;">{{boxId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>数量</label>
              <label style="padding: 11px 0px;">{{quantity}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>地点:</label>
              <label style="padding: 11px 0px;">{{site}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>库位:</label>
              <label style="padding: 11px 0px;">{{location}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批序号:</label>
              <label style="padding: 11px 0px;">{{batchId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>参考:</label>
              <label style="padding: 11px 0px;">{{refrence}}</label>
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
  name: "transferWithBurdeningBill",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      burdeningBillId: '',
      gridTransferTo: '',
      boxId: '',
      quantity: 0,
      site: '',
      location: '',
      batchId: '',
      reference: '',
      mask: false,
      header: "配料单转移",
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
      this.burdeningBillId = ''
      this.gridTransferTo = ''
      this.boxId = ''
      this.quantity = 0
      this.receviceGrid = ''
      this.site = ''
      this.location = ''
      this.batchId = ''
      this.reference = ''
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

