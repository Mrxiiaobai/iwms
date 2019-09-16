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
              <label>
                <span style="color:red;">*</span>退料单
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="RecOrder"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                :disabled="inputDisabledFlag"
                placeholder="请输入"
                ref="RecOrder"
                @change="RecOrderChange"
              />
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
                v-model="target_grid"
                :disabled="!tarDisabledFlag"
                :class="!tarDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="target_grid"
                @change="GridChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="detail1" v-bind:res="[]"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row" id="barcodeDiv">
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
          <EsunShowDetail v-bind:res="detail2" v-bind:mres="mres"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>备注
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="rmks"
                placeholder="请输入"
                ref="rmks"
                @change="RmkChange"
              />
            </div>
          </div>
          <esunShowTable :res="saveRes" :th="['唯一码','数量']" :fields="['trej_serial','trej_qty']"></esunShowTable>
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
  name: "ReturnGround",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      RecOrder: "",
      target_grid: "",
      grid: "",
      site: "",
      loc: "",
      barcode: "",
      mask: false,
      header: "退料上架",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      tarDisabledFlag: false,
      BoxinputDisabledFlag: false,
      rmks: "",
      detail1: [
        {
          detail: [
            {
              name: "地点",
              content: ""
              // isshow: false
            },
            {
              name: "库位",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "货格",
              content: ""
              // isshow: false
            }
          ]
        }
      ],
      detail2: [
        {
          detail: [
            {
              name: "描述1",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "描述2",
              content: ""
              // isshow: false
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
      saveRes: [],
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
      lastBarcode: ""
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    this.effectiveDate = app.getDate();
  },
  mounted() {
    this.$refs.RecOrder.focus();
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
      this.RecOrder = "";
      this.target_grid = "";
      this.grid = "";
      this.site = "";
      this.loc = "";
      this.barcode = "";
      this.inputDisabledFlag = false;
      this.tarDisabledFlag = false;
      this.BoxinputDisabledFlag = false;
      this.rmks = "";
      app.refreshDetail(this.detail1);
      app.refreshDetail(this.detail2);
      app.refreshDetail(this.mres);
      this.saveRes = [];
      this.lastBarcode = "";
    },
    gousercenter: function() {
      this.inputChangeAjaxFlag = false;
      app.center(this);
    },
    back: function() {
      this.inputChangeAjaxFlag = false;
      app.back(this);
    },
    cancel: function() {
      console.log(this.saveRes);
    },
    ok: function() {
      let _this = this;
      console.log(_this.saveRes);
      // return
      _this.boxSave();
    },

    RecOrderChange: function() {
      // 退料单校验
      let _this = this;
      _this.RecOrder = _this.RecOrder.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwshwirejboxget",
          v_nbr: _this.RecOrder
        },
        "xwshwirejboxget",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.tarDisabledFlag = !_this.tarDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.target_grid.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.RecOrder = "";
          _this.$refs.RecOrder.focus();
        }
      );
    },
    GridChange: function() {
      // 至地点货格校验
      let _this = this;
      _this.target_grid = _this.target_grid.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwshwirejtarchk",
          target_site_grid: _this.target_grid
        },
        "xwshwirejtarchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.detail1 = [
            {
              detail: [
                {
                  name: "地点",
                  content: e.v_site
                  // isshow: false
                },
                {
                  name: "库位",
                  content: e.v_loc
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.v_grid
                  // isshow: false
                }
              ]
            }
          ];
          _this.site = e.v_site;
          _this.loc = e.v_loc;
          _this.grid = e.v_grid;
          _this.tarDisabledFlag = !_this.tarDisabledFlag;
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.target_grid = "";
          _this.$refs.target_grid.focus();
        }
      );
    },
    boxChange: function() {
      // 唯一码校验
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      if (_this.saveRes.length) {
        if (
          _this.saveRes.findIndex(
            it =>
              it.trej_serial.toLowerCase().trim() ===
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
          input_ProgramID: "xwshwirejnbrchek",
          v_serial: _this.barcode,
          v_nbr: _this.RecOrder,
          v_site: _this.site,
          v_loc: _this.loc,
          v_grid: _this.grid,
          effdate: _this.effectiveDate
        },
        "xwshwirejnbrchek",
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
                  content: e.v_qty + " " + e.v_um
                }
              ]
            }
          ];
          _this.detail2 = [
            {
              detail: [
                {
                  name: "描述1",
                  content: e.v_desc1
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: e.v_desc2
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "地点",
                  content: e.v_site_from
                }
              ]
            },
            {
              detail: [
                {
                  name: "库位",
                  content: e.v_loc_from
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
                  content: e.v_grid_from
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
                  content: e.v_vent_lot
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
          _this.lastBarcode = _this.barcode;
          _this.barcode = "";
          _this.saveRes.push(...e.output_trej_out);
          _this.$nextTick(() => {
            _this.$refs.rmks.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.barcode = "";
          _this.$refs.boxInput.focus();
        }
      );
    },
    RmkChange: function() {
      let _this = this;
      if (!_this.RecOrder || !_this.target_grid) {
        mui.alert("需要先校验退料单和至地点货格");
        return;
      }
      if (!_this.lastBarcode) {
        mui.alert("需要先校验唯一码");
        return;
      }
      if (_this.saveRes.length) {
        var lastIndex = _this.saveRes.findIndex(
          it =>
            it.trej_serial.toLowerCase().trim() ===
            _this.lastBarcode.toLowerCase().trim()
        );
        _this.saveRes[lastIndex].trej_rmk = _this.rmks;
      }
      _this.rmks = "";
      // _this.barcode = "";
      _this.lastBarcode = "";
      _this.$nextTick(() => {
        _this.$refs.boxInput.focus();
      });
    },
    boxSave: function() {
      let _this = this;
      if (_this.RecOrder === "") {
        mui.alert("领料单不能为空");
        return;
      }
      if (_this.effectiveDate === "") {
        mui.alert("生效日期不能为空");
        return;
      }
      if (!_this.saveRes.length) {
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
          input_ProgramID: "xwshwirejsave",
          v_nbr: _this.RecOrder,
          v_loc: _this.loc,
          v_site: _this.site,
          v_grid: _this.grid,
          effdate: _this.effectiveDate,
          table_input: [..._this.saveRes]
        },
        "xwshwirejsave",
        _this,
        function(e) {
          console.log(e);
          mui.toast("处理成功");
          _this.cleanAll();
          _this.$nextTick(() => {
            _this.$refs.RecOrder.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
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
.top-button-form:before {
  height: 0px;
}
.top-button-form:after {
  height: 0px;
}
.top-button-div:after {
  height: 0px;
}
</style>

