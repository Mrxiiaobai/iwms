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
              <label>生效日期</label>
              <input class="mui-version" type="date" v-model="effectiveDate" />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label :style="{display: 'inline',width: '28%'}">
                <span style="color:red;">*</span>需扫描
              </label>
              <input
                :style="{display: 'inline',width: '21%',float: 'left'}"
                type="number"
                v-model="neededToDeal"
                :disabled="inputDeelDisabledFlag"
                :class="inputDeelDisabledFlag==true?'disabledTrue':''"
                ref="numToDeel"
                placeholder="请输入(数字)"
                @change="neededToDealChange"
              />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label style="display:inline;width:28%">已扫描</label>
              <label
                class="inforLabel disabledTrue"
                style="padding: 11px 0px;display:inline;width:72%;border-radius: 1px;padding-left: 10px"
              >{{dealed}}</label>
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
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="siteInput"
                @change="siteChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="showdetail1" v-bind:res="[]"></EsunShowDetail>

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
                :class="!BoxinputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="boxInput"
                @change="boxChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="showdetail2" v-bind:mres="mres"></EsunShowDetail>
          <esunShowTable :res="showdetail3" :th="['唯一码','数量']" :fields="['box','qty']"></esunShowTable>
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
  name: "consignmentInventoryTransfer1",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      neededToDeal: 0,
      dealed: 0,
      toSiteAndLocation: "",
      toSite: "",
      toLocation: "",
      toGrid: "",
      barcode: "",
      mask: false,
      header: "寄存库存转移",
      inputChangeAjaxFlag: true,
      inputDeelDisabledFlag: false,
      inputDisabledFlag: false,
      BoxinputDisabledFlag: false,
      barcode_grid: false,
      cnt_yn: false,
      //   isSpec:false,
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
      showdetail3: [],
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
      ]
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;

    this.effectiveDate = app.getDate();
    // this.$nextTick(() => {
    //   this.$refs.numToDeel.focus();
    // });
  },
  mounted() {
    this.$refs.numToDeel.focus();
    app.addBack(this.back);
  },
  destroyed() {
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
      this.neededToDeal = 0;
      this.dealed = 0;
      this.toSiteAndLocation = "";
      this.toSite = "";
      this.toLocation = "";
      this.toGrid = "";
      this.barcode = "";
      this.inputDeelDisabledFlag = false;
      this.inputDisabledFlag = false;
      this.BoxinputDisabledFlag = false;
      this.barcode_grid = false;
      this.cnt_yn = false;
      //   this.isSpec = false,
      this.res = [];
      app.refreshDetail(this.showdetail1);
      app.refreshDetail(this.showdetail2);
      app.refreshDetail(this.mres);
      this.showdetail3 = [];
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
    neededToDealChange: function() {
      let _this = this;
      _this.inputDeelDisabledFlag = !_this.inputDeelDisabledFlag;
      _this.neededToDeal = Number(_this.neededToDeal);
    },
    siteChange: function() {
      // 寄存库存转移至库位校验
      let _this = this;
      _this.toSiteAndLocation = _this.toSiteAndLocation.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbtranconchk01",
          target_site_grid: _this.toSiteAndLocation,
          effdate: _this.effectiveDate
        },
        "xwbtranconchk01",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.showdetail1 = [
            {
              detail: [
                {
                  name: "至地点",
                  content: e.v_site_to
                  // isshow: false
                },
                {
                  name: "至库位",
                  content: e.v_loc_to
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "至货格",
                  content: e.v_grid_to
                }
              ]
            }
          ];
          _this.toSite = e.v_site_to;
          _this.toLocation = e.v_loc_to;
          _this.toGrid = e.v_grid_to;
          _this.barcode_grid = e.barcode_grid;
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
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
              it.ttrcon_code.toLowerCase().trim() ===
              _this.barcode.toLowerCase().trim()
          ) > -1
        ) {
          mui.alert("已经扫过此唯一码，不能重复扫描");
          _this.barcode = "";
          _this.$refs.boxInput.focus();
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
          input_ProgramID: "xwbtranconchk02",
          v_serial: _this.barcode,
          v_site_to: _this.toSite,
          v_loc_to: _this.toLocation,
          v_grid_to: _this.toGrid
        },
        "xwbtranconchk02",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.mres = [
            {
              detail: [
                {
                  name: "唯一码",
                  content: e.tempxwbtranconchk02out[0].ttrcon_code
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "零件",
                  content: e.tempxwbtranconchk02out[0].ttrcon_prhpart
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "数量",
                  content:
                    e.v_allqty + " " + e.tempxwbtranconchk02out[0].ttrcon_um
                }
              ]
            }
          ];
          _this.showdetail2 = [
            {
              detail: [
                {
                  name: "描述1",
                  content: e.tempxwbtranconchk02out[0].ttrcon_desc1
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: e.tempxwbtranconchk02out[0].ttrcon_desc2
                }
              ]
            },
            {
              detail: [
                {
                  name: "地点",
                  content: e.tempxwbtranconchk02out[0].ttrcon_loc_from
                }
              ]
            },
            {
              detail: [
                {
                  name: "库位",
                  content: e.tempxwbtranconchk02out[0].ttrcon_site_from
                },
                {
                  name: "批/序",
                  content: e.tempxwbtranconchk02out[0].ttrcon_lot_to
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.tempxwbtranconchk02out[0].ttrcon_grid_from
                },
                {
                  name: "参考",
                  content: e.tempxwbtranconchk02out[0].ttrcon_ref_from
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
                  content: e.v_vend_lot
                },
                {
                  name: "制造日期",
                  content: app.getProgressDate(e.create_date)
                }
              ]
            },
            {
              detail: [
                {
                  name: "生效日期",
                  content: app.getProgressDate(e.eff_date)
                },
                {
                  name: "失效日期",
                  content: app.getProgressDate(e.expire_date)
                }
              ]
            },
            {
              detail: [
                {
                  name: "小包装号",
                  content: e.v_box
                },
                {
                  name: "出库日期",
                  content: app.getProgressDate(e.deposit_date)
                }
              ]
            }
          ];
          _this.cnt_yn = e.cnt_yn;
          _this.res.push(...e.tempxwbtranconchk02out);
          e.tempxwbtranconchk02out.forEach(it =>
            _this.showdetail3.push({
              box: it.ttrcon_code,
              qty: it.ttrcon_prhqty
            })
          );
          // _this.showdetail3.push({
          //   box: e.tempxwbtranconchk02out[0].ttrcon_code,
          //   qty: e.v_allqty
          // });
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
      if (_this.effdate === "") {
        mui.alert("生效日期不能为空");
        return;
      }
      if (
        _this.neededToDeal !== 0 &&
        _this.dealed + _this.res.length > _this.neededToDeal
      ) {
        mui.alert("处理数将超过需要处理数，不能再进行操作");
        return;
      }
      if (!_this.res.length) {
        mui.alert("前台数组为空");
        return;
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbtranconsave",
          v_site_to: _this.toSite,
          v_loc_to: _this.toLocation,
          v_grid_to: _this.toGrid,
          cnt_yn: _this.cnt_yn,
          effdate: _this.effectiveDate,
          v_box_req: 0,
          barcode_grid: _this.barcode_grid,
          input_tmpxwbruniss_in: [..._this.res]
        },
        "xwbtranconsave",
        _this,
        function(e) {
          console.log(e);
          mui.toast("寄存库存转移成功");
          _this.dealed += _this.res.length;
          _this.toSiteAndLocation = "";
          _this.toSite = "";
          _this.toLocation = "";
          _this.toGrid = "";
          _this.barcode = "";
          _this.inputDisabledFlag = false;
          _this.BoxinputDisabledFlag = false;
          _this.barcode_grid = false;
          _this.cnt_yn = false;
          //   _this.isSpec = false,
          _this.res = [];
          app.refreshDetail(_this.showdetail1);
          app.refreshDetail(_this.showdetail2);
          app.refreshDetail(_this.mres);
          _this.showdetail3 = [];
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.barcode = "";
          _this.BoxinputDisabledFlag = true;
          app.refreshDetail(_this.showdetail2);
          app.refreshDetail(_this.mres);
          _this.showdetail3 = [];
          _this.res = [];
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        }
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
  background-color: #f2f2f2;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
/* *:before {
  
  height: 0px;
}
*:after {
  height: 0px;
}
.mui-input-group .mui-input-row:after {
  height: 0px;
} */
.qgg-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #c6c6c6 !important;
  margin-bottom: 20px;
}
.qgg-table th {
  border-collapse: collapse;
  border-right: 1px solid #c6c6c6 !important;
  border-bottom: 1px solid #c6c6c6 !important;
  background-color: #ddeeff !important;
  padding: 5px 9px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.qgg-table td {
  border-collapse: collapse;
  border-right: 1px solid #c6c6c6 !important;
  border-bottom: 1px solid #c6c6c6 !important;
  padding: 5px 9px;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  word-break: break-all;
}
.qgg-table tr:nth-child(odd) {
  background-color: #fff !important;
}
.qgg-table tr:nth-child(even) {
  background-color: #f8f8f8 !important;
}
</style>

