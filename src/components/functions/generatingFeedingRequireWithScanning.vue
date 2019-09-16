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
          <div style="margin-left: 20px;">V1.0.0</div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row" id="siteLocationDiv">
              <label>
                <span style="color:red;">*</span>至地点库位
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
              <label style="padding: 11px 0px;">{{toSite}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>至货格:</label>
              <label style="padding: 11px 0px;">{{toSite}}</label>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row" id="barcodeDiv" style="background-color:#f2f2f2;">
              <label>
                <span style="color:red;">*</span>补料单
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="feedingOrder"
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
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>箱数:</label>
              <label style="padding: 11px 0px;">{{quanlityOfBox}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>补料量:</label>
              <label style="padding: 11px 0px;">{{qualityOfFeeding}}</label>
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
  name: "generatingFeedingRequireWithScanning",
  data: function () {
    return {
      userId: "",
      domain: '',
      toSiteAndLocation: '',
      toSite: '',
      toLocation: '',
      toGrid: '',
      feedingOrder: '',
      itemId: '',
      quanlityOfBox: 0,
      qualityOfFeeding: 0,
      mask: false,
      header: "扫描生成补料需求",
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
      this.feedingOrder = ''
      this.itemId = ''
      this.quanlityOfBox = 0
      this.qualityOfFeeding = 0
      this.inputDisabledFlag = false
      document.getElementById('siteLocationDiv').style.backgroundColor = 'white'
      document.getElementById('barcodeDiv').style.backgroundColor = '#f2f2f2'
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

    },
    siteInputChange() {
      let _this = this
      if (this.inputChangeAjaxFlag === false) { }
      else {
        app.offlineAjax({}, 'apiName', _this, function () {
          mui.toast('校验成功')
          _this.inputDisabledFlag = true
          document.getElementById('siteLocationDiv').style.backgroundColor = '#f2f2f2'
          document.getElementById('barcodeDiv').style.backgroundColor = 'white'
        }, function () {
          _this.inputDisabledFlag = true
          document.getElementById('siteLocationDiv').style.backgroundColor = '#f2f2f2'
          document.getElementById('barcodeDiv').style.backgroundColor = 'white'
        })
      }
    },
    barcodeInputChange() {
      let _this = this
      if (this.inputChangeAjaxFlag === false) { }
      else {
        app.offlineAjax({}, 'apiName', _this, function () {
          mui.toast('校验成功')
          _this.inputDisabledFlag = true
        }, function () {
          mui.toast('扫描成功')
          _this.inputDisabledFlag = true
        })
      }
    },
    addDB(vue, data) {
      let datetime = app.getTime()
      vue.$indexDB.add(
        'offlineData',
        [{
          datetime: datetime,
          userId: _this.userId,
          function: '库存转移',
          data: data
        }
        ],
        function (evnet) {
          if (event.type === 'error') {
            mui.toast('缓存失败')
          } else if (event.type === 'complete') {
            mui.toast('扫描成功')
          }
        }
      )
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

