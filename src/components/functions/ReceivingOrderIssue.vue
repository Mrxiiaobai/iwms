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
              <button
                style="width: auto;padding: 8px 15px"
                type="button"
                class="mui-btn"
                @click="Close"
              >关闭领料单</button>
            </div>
          </div>
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
                <span style="color:red;">*</span>领料单
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="RecOrder"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="RecOrder"
                @change="RecOrderChange"
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
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>数量
              </label>
              <input
                type="number"
                v-model="quantity"
                ref="num"
                @blur="NumChange"
                :disabled="!NumDisabledFlag"
                :class="!NumDisabledFlag==true?'disabledTrue':''"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="details" v-bind:mres="mres"></EsunShowDetail>
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
  name: "ReceivingOrderIssue",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      RecOrder: "",
      site: "",
      loc: "",
      grid: "",
      barcode: "",
      mask: false,
      header: "领料单发料",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      NumDisabledFlag: false,
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
      details: [
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
      quantity: 0,
      objectForNumChk: {},
      lastbox: ""
    };
  },
  activated() {
    // mui.alert("a");
  },
  created() {
    let _this = this;
    app.init(this);

    _this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    _this.effectiveDate = app.getDate();
  },
  mounted() {
    this.$refs.RecOrder.focus();
    // console.log('first render')
    app.addBack(this.back);
  },
  updated() {
    // console.log('update')
  },
  destroyed() {
    console.log("destory");
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
      this.barcode = "";
      this.site = "";
      this.loc = "";
      this.grid = "";
      this.inputDisabledFlag = false;
      this.BoxinputDisabledFlag = false;
      this.res = [];
      app.refreshDetail(this.details);
      app.refreshDetail(this.showdetail1);
      app.refreshDetail(this.mres);
      this.quantity = 0;
      this.NumDisabledFlag = false;
      this.objectForNumChk = {};
      this.lastbox = "";
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
      console.log(this.res);
    },
    ok: function() {
      let _this = this;
      _this.boxSave();
    },
    Close: function() {
      // 领料单关闭
      let _this = this;
      _this.RecOrder = _this.RecOrder.toLowerCase().trim();
      if (!_this.RecOrder) {
        mui.alert("领料单不能为空");
        return;
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwpicklistclose",
          v_nbr: _this.RecOrder
        },
        "xwpicklistclose",
        _this,
        function(e) {
          console.log(e);
          mui.toast("操作成功");
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.RecOrder = "";
          _this.$nextTick(() => {
            _this.$refs.RecOrder.focus();
          });
        }
      );
    },
    RecOrderChange: function() {
      // 领料单校验
      let _this = this;
      _this.RecOrder = _this.RecOrder.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwpickinglistchk01",
          v_nbr: _this.RecOrder
        },
        "xwpickinglistchk01",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
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
          _this.site = e.v_site;
          _this.loc = e.v_loc;
          _this.grid = e.v_grid;
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
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
          input_ProgramID: "xwpickinglistchk02",
          v_serial: _this.barcode,
          v_nbr: _this.RecOrder,
          v_loc: _this.loc,
          v_site: _this.site,
          v_grid: _this.grid,
          effdate: _this.effectiveDate,
          table_in: _this.res
        },
        "xwpickinglistchk02",
        _this,
        function(e) {
          console.log(e);
          _this.mres = [
            {
              detail: [
                {
                  name: "唯一码",
                  content: e.output_tmppicking_out[0].tpick_code
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "零件",
                  content: e.output_tmppicking_out[0].tpick_part
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "数量",
                  content:
                    e.output_tmppicking_out[0].tpick_qty +
                    " " +
                    e.output_tmppicking_out[0].tpick_um
                }
              ]
            }
          ];
          _this.details = [
            {
              detail: [
                {
                  name: "描述1",
                  content: e.output_tmppicking_out[0].tpick_desc1
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: e.output_tmppicking_out[0].tpick_desc2
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "地点",
                  content: e.output_tmppicking_out[0].tpick_site_from
                }
              ]
            },
            {
              detail: [
                {
                  name: "库位",
                  content: e.output_tmppicking_out[0].tpick_loc_from
                },
                {
                  name: "批/序",
                  content: e.output_tmppicking_out[0].tpick_lot
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.output_tmppicking_out[0].tpick_grid_from
                },
                {
                  name: "参考",
                  content: e.output_tmppicking_out[0].tpick_vend
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
          _this.quantity = e.output_tmppicking_out[0].tpick_qty;
          _this.res = e.output_tmppicklist_out;
          if (e.v_mod) {
            mui.toast("可修改数量");
            _this.lastbox = e.output_tmppicking_out[0].tpick_code;
            var index = _this.res.findIndex(
              it =>
                it.code.toLowerCase().trim() ===
                _this.lastbox.toLowerCase().trim()
            );
            _this.objectForNumChk = {
              part: _this.res[index].part,
              from_site: _this.res[index].from_site,
              from_loc: _this.res[index].from_loc,
              from_grid: _this.res[index].from_grid,
              from_lot: _this.res[index].from_lot,
              from_ref: _this.res[index].from_ref,
              loc_to: _this.res[index].loc_to
            };
            _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
            _this.NumDisabledFlag = !_this.NumDisabledFlag;
            _this.$nextTick(() => {
              _this.$refs.num.focus();
            });
          } else {
            mui.toast("校验成功");
            _this.barcode = "";

            _this.$nextTick(() => {
              _this.$refs.boxInput.focus();
            });
          }
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.barcode = "";
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        }
      );
    },
    NumChange: function() {
      //数量校验
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwpickinglistchk03",
          v_code: _this.barcode,
          v_part: _this.objectForNumChk.part,
          v_qty: Number(_this.quantity),
          v_from_site: _this.objectForNumChk.from_site,
          v_from_loc: _this.objectForNumChk.from_loc,
          v_from_grid: _this.objectForNumChk.from_grid,
          v_from_lot: _this.objectForNumChk.from_lot,
          v_from_ref: _this.objectForNumChk.from_ref,
          v_loc_to: _this.objectForNumChk.loc_to,
          effdate: _this.effectiveDate
        },
        "xwpickinglistchk03",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功，可继续扫条码或者直接保存");
          var index = _this.res.findIndex(
            it =>
              it.code.toLowerCase().trim() ===
              _this.lastbox.toLowerCase().trim()
          );
          _this.res[index].qty = _this.quantity;
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
          _this.NumDisabledFlag = !_this.NumDisabledFlag;
          _this.quantity = 0;
          _this.barcode = "";
          _this.lastbox = "";
          _this.objectForNumChk = {};
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          var index = _this.res.findIndex(
            it =>
              it.code.toLowerCase().trim() ===
              _this.lastbox.toLowerCase().trim()
          );
          _this.res.splice(index, 1);
          _this.barcode = "";
          _this.quantity = 0;
          _this.lastbox = "";
          _this.objectForNumChk = {};
          _this.BoxinputDisabledFlag = !_this.BoxinputDisabledFlag;
          _this.NumDisabledFlag = !_this.NumDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.boxInput.focus();
          });
        }
      );
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
          input_ProgramID: "xwpickinglistsave",
          v_nbr: _this.RecOrder,
          effdate: _this.effectiveDate,
          v_loc: _this.loc,
          v_site: _this.site,
          v_grid: _this.grid,
          input_list: [..._this.res]
        },
        "xwpickinglistsave",
        _this,
        function(e) {
          console.log(e);
          mui.toast("发料成功");
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

