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
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>生效日期
              </label>
              <input class="mui-version" type="date" v-model="effectiveDate" />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>加工单ID</label>
              <label
                class="inforLabel"
                style="float:right;padding: 11px 0px;width:72%;border-radius: 1px;height: 31px;padding-left: 10px"
              >{{workID}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>加工单</label>
              <label
                class="inforLabel"
                style="float:right;padding: 11px 0px;width: 72%;border-radius: 1px;height: 31px;padding-left: 10px"
              >{{workOrder}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>托盘号
              </label>
              <input
                type="text"
                v-model="pallet"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                ref="pallet"
                placeholder="请输入"
                @blur="PalletChange"
              />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>已扫托盘数</label>
              <label
                class="inforLabel"
                style="float:right;padding: 11px 0px;width:72%;border-radius: 1px;padding-left: 10px"
              >{{scanned}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>至地点货格
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toSiteAndLocation"
                :disabled="!siteDisabledFlag"
                :class="siteDisabledFlag==false?'disabledTrue':''"
                placeholder="请输入"
                ref="siteInput"
                @change="siteChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="showdetail1" v-bind:res="[]"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>已扫描箱数</label>
              <label
                class="inforLabel disabledTrue"
                style="float:right;padding: 11px 0px;width:72%;border-radius: 1px;padding-left: 10px"
              >{{scannedBox}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>唯一码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                :disabled="!BoxinputDisabledFlag"
                :class="BoxinputDisabledFlag==false?'disabledTrue':''"
                placeholder="请输入"
                ref="boxInput"
                @change="boxChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="showdetail2" v-bind:mres="mres"></EsunShowDetail>
          <esunShowTable :res="res" :th="['唯一码','数量']" :fields="['code','qty']"></esunShowTable>
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
  name: "crtInStore",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      workID: "",
      workOrder: "",
      pallet: "",
      scanned: 0,
      scannedBox: 0,
      v_count2: 0,
      v_first_part: "",
      v_par_loc: "",
      toSiteAndLocation: "",
      barcode: "",
      mask: false,
      header: "加工单入库",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      siteDisabledFlag: false,
      BoxinputDisabledFlag: false,
      res: [],
      showdetail1: [
        {
          detail: [
            {
              name: "至地点",
              content: ""
              // isshow: false
            },
            {
              name: "至库位",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "至货格",
              content: ""
            }
          ]
        }
      ],
      showdetail2: [
        {
          detail: [
            {
              name: "描述1",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "描述2",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "地点",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "库位",
              content: ""
            },
            {
              name: "批/序",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "货格",
              content: ""
            },
            {
              name: "参考",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "批属1",
              content: ""
            },
            {
              name: "批属2",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "供批次",
              content: ""
            },
            {
              name: "制造日期",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "生效日期",
              content: ""
            },
            {
              name: "失效日期",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "小包装号",
              content: ""
            },
            {
              name: "出库日期",
              content: ""
            }
          ]
        }
      ],
      trgsite: "",
      trgloc: "",
      trggrid: "",
      mres: [
        {
          detail: [
            {
              name: "唯一码",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "零件",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "数量",
              content: ""
            }
          ]
        }
      ],
      ctrl: "",
      v_grd_chk: false
    };
  },
  // inject: ["reload"],
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;

    this.effectiveDate = app.getDate();
  },
  mounted() {
    this.GetCtrl();
    this.$refs.pallet.focus();
    // this.reload();
    app.addBack(this.back);
  },
  destroyed() {
    console.log("destroy");
    app.removeBack(this.back);
  },
  methods: {
    reload: function() {
      var _this = this;
      mui.confirm("是否确认清除数据？", "前台提示", ["确认", "取消"], function(
        e
      ) {
        if (e.index == 0) {
          _this.cleanAll();
        } else {
        }
      });
    },
    cleanAll() {
      this.workID = "";
      this.workOrder = "";
      this.pallet = "";
      this.scanned = 0;
      this.scannedBox = 0;
      this.v_count2 = 0;
      this.v_first_part = "";
      this.v_par_loc = "";
      this.toSiteAndLocation = "";
      this.barcode = "";
      this.inputDisabledFlag = false;
      this.siteDisabledFlag = false;
      this.BoxinputDisabledFlag = false;
      this.res = [];
      app.refreshDetail(this.showdetail1);
      app.refreshDetail(this.showdetail2);
      app.refreshDetail(this.mres);
      this.trgsite = "";
      this.trgloc = "";
      this.trggrid = "";
      this.ctrl = "";
      this.v_grd_chk = false;
      this.GetCtrl();
      this.$nextTick(() => {
        this.$refs.pallet.focus();
      });
    },
    gousercenter: function() {
      this.inputChangeAjaxFlag = false;
      app.center(this);
    },
    back: function() {
      this.inputChangeAjaxFlag = false;
      app.back(this);
    },
    cancel: function() {},
    ok: function() {
      let _this = this;
      _this.boxSave();
    },
    GetCtrl: function() {
      // 获取控制文件
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbarcpm021get"
        },
        "xwbarcpm021get",
        _this,
        function(e) {
          console.log(e);
          _this.ctrl = e.v_bkfl_chk_grid;
          console.log(_this.ctrl);
          mui.toast("获取控制文件成功,是否允许变更入库货格:" + _this.ctrl);
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {}
      );
    },
    PalletChange: function() {
      // 托盘校验
      let _this = this;
      _this.pallet = _this.pallet.toLowerCase().trim();
      if (_this.pallet) {
        _this.PalletChange1();
      } else {
        if (_this.ctrl) {
          mui.toast("未输入托盘，由于控制文件，支持输入至地点货格");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.siteDisabledFlag = !_this.siteDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.siteInput.focus();
          });
        } else if (_this.ctrl === false) {
          mui.toast("未输入托盘，由于控制文件，不支持输入至地点货格");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        } else {
          // _this.GetCtrl();
          _this.$refs.pallet.focus();
        }
      }
    },
    PalletChange1: function() {
      // 托盘校验
      let _this = this;
      _this.pallet = _this.pallet.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrworct01palchk",
          v_effdate: _this.effectiveDate,
          v_pallet: _this.pallet
        },
        "xwbrworct01palchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.scanned += 1;
          _this.v_count2 = e.v_count2;
          _this.v_first_part = e.v_first_part;
          _this.v_par_loc = e.v_par_loc;
          _this.v_grd_chk = e.v_grd_chk;
          // _this.toSiteAndLocation = e.target_site_grid.toLowerCase().trim();
          if (_this.v_grd_chk) {
            // _this.siteChange();
            // mui.toast("至地点货格可修改");
            if (_this.ctrl) {
              mui.toast("至地点货格可修改");
              _this.inputDisabledFlag = !_this.inputDisabledFlag;
              _this.siteDisabledFlag = !_this.siteDisabledFlag;
              _this.$nextTick(() => {
                _this.$refs.siteInput.focus();
              });
            } else {
              mui.toast("至地点货格不可修改");
              _this.inputDisabledFlag = !_this.inputDisabledFlag;
              _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
              _this.$nextTick(() => {
                _this.$refs.boxInput.focus();
              });
            }
          } else {
            mui.toast("至地点货格不可修改");
            _this.inputDisabledFlag = !_this.inputDisabledFlag;
            _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
            _this.$nextTick(() => {
              _this.$refs.boxInput.focus();
            });
          }
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.pallet = "";
          _this.$refs.pallet.focus();
        }
      );
    },
    siteChange: function() {
      // 地点货格校验
      let _this = this;
      _this.toSiteAndLocation = _this.toSiteAndLocation.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrworct01grdchk",
          target_site_grid: _this.toSiteAndLocation
        },
        "xwbrworct01grdchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("至地点货格校验成功");
          _this.showdetail1 = [
            {
              detail: [
                {
                  name: "至地点",
                  content: e.v_site
                  // isshow: false
                },
                {
                  name: "至库位",
                  content: e.v_loc
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "至货格",
                  content: e.v_grid
                }
              ]
            }
          ];
          _this.trgsite = e.v_site;
          _this.trgloc = e.v_loc;
          _this.trggrid = e.v_grid;
          _this.siteDisabledFlag = !_this.siteDisabledFlag;
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.toSiteAndLocation = "";
          _this.$refs.siteInput.focus();
        }
      );
    },
    boxChange: function() {
      // 条码校验
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      if (_this.res.length) {
        if (
          _this.res.findIndex(
            it =>
              it.code.toLowerCase().trim() ===
              _this.barcode.toLowerCase().trim()
          ) > -1
        ) {
          mui.alert("已经扫过此唯一码，不能重复扫描");
          return;
        }
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrworct01srchk",
          v_pallet: _this.pallet,
          v_serial: _this.barcode,
          v_first_part: _this.v_first_part,
          v_par_loc: _this.v_par_loc,
          table_in: _this.res,
          v_count2: _this.v_count2,
          v_count: _this.scannedBox,
          v_lastwolot: _this.workID,
          v_trgsite: _this.trgsite,
          v_trgloc: _this.trgloc,
          v_trggrid: _this.trggrid,
          v_grd_chk: _this.v_grd_chk
        },
        "xwbrworct01srchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.mres = [
            {
              detail: [
                {
                  name: "唯一码",
                  content: _this.barcode
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "零件",
                  content: e.v_part
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "数量",
                  content: e.v_qty
                }
              ]
            }
          ];
          _this.showdetail2 = [
            {
              detail: [
                {
                  name: "描述1",
                  content: ""
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: ""
                }
              ]
            },
            {
              detail: [
                {
                  name: "地点",
                  content: e.v_site
                }
              ]
            },
            {
              detail: [
                {
                  name: "库位",
                  content: e.v_loc
                },
                {
                  name: "批/序",
                  content: e.v_lot
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.v_grid
                },
                {
                  name: "参考",
                  content: e.v_ref
                }
              ]
            },
            {
              detail: [
                {
                  name: "批属1",
                  content: e.v_lot_att1
                },
                {
                  name: "批属2",
                  content: e.v_lot_att2
                }
              ]
            },
            {
              detail: [
                {
                  name: "供批次",
                  content: ""
                },
                {
                  name: "制造日期",
                  content: ""
                }
              ]
            },
            {
              detail: [
                {
                  name: "生效日期",
                  content: ""
                },
                {
                  name: "失效日期",
                  content: ""
                }
              ]
            },
            {
              detail: [
                {
                  name: "小包装号",
                  content: ""
                },
                {
                  name: "出库日期",
                  content: ""
                }
              ]
            }
          ];
          _this.workID = e.v_wolot;
          _this.workOrder = e.v_wolot;
          _this.res = e.table_out;
          _this.scannedBox = e.v_count1;
          _this.v_first_part = e.v_first_part1;
          _this.v_par_loc = e.v_par_loc1;
          _this.barcode = "";
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.barcode = "";
          _this.$refs.boxInput.focus();
        }
      );
    },
    boxSave: function() {
      let _this = this;
      if (_this.effectiveDate === "") {
        mui.alert("生效日期不能为空");
        return;
      }
      if (!_this.res.length) {
        mui.alert("前台数组为空");
        return;
      }
      if (_this.workOrder === "") {
        mui.alert("加工单不能为空");
        return;
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrworct01save",
          table_in: [..._this.res],
          v_wolot: _this.workOrder,
          v_effdate: _this.effectiveDate,
          v_pallet: _this.pallet
        },
        "xwbrworct01save",
        _this,
        function(e) {
          console.log(e);
          mui.toast("入库成功");
          _this.workID = "";
          _this.workOrder = "";
          _this.pallet = "";
          _this.scanned = 0;
          _this.scannedBox = 0;
          _this.v_count2 = 0;
          _this.v_first_part = "";
          _this.v_par_loc = "";
          _this.toSiteAndLocation = "";
          _this.barcode = "";
          _this.inputDisabledFlag = false;
          _this.siteDisabledFlag = false;
          _this.BoxinputDisabledFlag = false;
          _this.res = [];
          app.refreshDetail(_this.showdetail1);
          app.refreshDetail(_this.showdetail2);
          app.refreshDetail(_this.mres);
          _this.trgsite = "";
          _this.trgloc = "";
          _this.trggrid = "";
          _this.ctrl = "";
          _this.v_grd_chk = false;
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {}
      );
    }
  },
  activated: function() {
    this.inputChangeAjaxFlag = true;
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
  background-color: #edeff7;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
</style>

