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
                <span style="color:red;">*</span>至地点库位
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toSiteAndLocation"
                @change="siteInputChange"
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
                <span style="color:red;">*</span>条码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                @change="barcodeInputChange"
                :disabled="!inputDisabledFlag"
                :class="!inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row inforLabel">
              <label>零件编号:</label>
              <label style="padding: 11px 0px;">{{itemId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>数量</label>
              <label style="padding: 11px 0px;">{{quality}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>自地点/库位</label>
              <label style="padding: 11px 0px;">{{fromSite}}{{fromLocation}}</label>
            </div>
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
  name: "inventoryTransfer",
  data: function () {
    return {
      userId: "",
      domain: '',
      toSiteAndLocation: '',
      toSite: '',
      effectiveDate: '',
      toLocation: '',
      toGrid: '',
      barcode: '',
      itemId: '',
      quality: 0,
      fromSite: '',
      fromLocation: '',
      fromGrid: '',
      fromBatch: '',
      fromReference: '',
      mask: false,
      header: "库存转移",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      res: {
        toSiteAndLocation: '',
        barcode: []
      }
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
      this.itemId = ''
      this.quality = 0
      this.fromSite = ''
      this.fromLocation = ''
      this.fromGrid = ''
      this.fromBatch = ''
      this.fromReference = ''
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
      if (global.context.onlineStatus === 2) {
        this.addDB(this, JSON.stringify(res))
      }
    },
    siteInputChange() {
      let _this = this
      if (this.inputChangeAjaxFlag === false) { }
      else {
        app.offlineAjax({
          input_userId: _this.userId,
          input_crop: '',
          input_domain: localStorage.getItem('domainNow'),
          input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
          input_ProgramID: 'xwbrtrantochk',
          v_target_site_grid: _this.toSiteAndLocation,
          v_effdate: _this.effectiveDate
        }, 'xwbrtrantochk', _this, function (e) {
          mui.toast('校验成功')
          console.log(e.xwbrtrantochkoutdt)
          _this.toSite = e.xwbrtrantochkoutdt[0].xwbrtrantochkoutdt_site_to
          _this.toLocation = e.xwbrtrantochkoutdt[0].xwbrtrantochkoutdt_loc_to
          _this.toGrid = e.xwbrtrantochkoutdt[0].xwbrtrantochkoutdt_grid_to
          _this.inputDisabledFlag = true
          document.getElementById('siteLocationDiv').style.backgroundColor = '#f2f2f2'
          document.getElementById('barcodeDiv').style.backgroundColor = 'white'
          _this.res.toSiteAndLocation = _this.toSiteAndLocation
        }, function () {
          _this.inputDisabledFlag = true
          document.getElementById('siteLocationDiv').style.backgroundColor = '#f2f2f2'
          document.getElementById('barcodeDiv').style.backgroundColor = 'white'
          _this.res.toSiteAndLocation = _this.toSiteAndLocation
        }, function () {
          _this.toSiteAndLocation = ''
        })
      }
    },
    barcodeInputChange() {
      let _this = this
      if (this.inputChangeAjaxFlag === false) { }
      else {
        app.offlineAjax({
          input_userId: _this.userId,
          input_crop: '',
          input_domain: localStorage.getItem('domainNow'),
          input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
          input_ProgramID: 'xwbrtranboxchk',
          input_brtranboxchkin: [{
            brtranboxchkin_site_to: _this.toSite,
            brtranboxchkin_loc_to: _this.toLocation,
            brtranboxchkin_grid_to: _this.toGrid,
            brtranboxchkin_effdate: _this.effectiveDate,
            brtranboxchkin_target_site_grid: _this.toSiteAndLocation,
          }],
          v_serial: _this.barcode
        }, 'xwbrtranboxchk', _this, function (e) {
          console.log(e.brtranboxchkoutdt)
          let xwbrtranboxchkResult = e.brtranboxchkoutdt[0]
          _this.itemId = xwbrtranboxchkResult.brtranboxchkoutoutdt_part
          _this.fromSite = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_site
          _this.fromLocation = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_loc
          _this.fromGrid = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_grid
          _this.fromBatch = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_lot
          _this.fromReference = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_ref
          return;
          app.offlineAjax({
            input_userId: _this.userId,
            input_crop: '',
            input_domain: localStorage.getItem('domainNow'),
            input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
            input_ProgramID: 'xwbrtransave',
            input_brtransavetemptoin: [{
              brtranboxchkin_site_to: _this.brtranboxchkoutoutdt_from_site,
              brtranboxchkin_loc_to: _this.brtranboxchkoutoutdt_from_loc,
              brtranboxchkin_grid_to: _this.brtranboxchkoutoutdt_from_grid,
              brtranboxchkin_effdate: _this.effectiveDate,
              brtranboxchkin_target_site_grid: _this.toSiteAndLocation
            }],
            input_brtransavetempfromin: [xwbrtranboxchkResult[0]]
          }, 'xwbrtransave', _this, function (e) {
            _this.quality++
            _this.res.barcode.push(_this.barcode)
            _this.barcode = ''
            mui.toast('校验成功')
          }, function () {
            _this.res.barcode.push(_this.barcode)
            _this.barcode = ''
            mui.toast('扫描成功')
          }, function () {
            _this.barcode = ''
          })
        }, function () {
          _this.quality++
          _this.res.barcode.push(_this.barcode)
          _this.barcode = ''
          mui.toast('扫描成功')
        }, function () { })
      }
    },
    addDB(vue, data) {
      let datetime = app.getTime()
      vue.$indexDB.add(
        'offlineData',
        [{
          datetime: datetime,
          userId: vue.userId,
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

