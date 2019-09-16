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
              <label>
                <span style="color:red;">*</span>领用单号
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="pickingOrderId"
                @change="NbrChange"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="pickingOrderId"
              />
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
                @change="BoxChange"
                :disabled="!BoxDisabledFlag"
                :class="!BoxDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="Box"
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
          <EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
          <esunShowTable
            :res="ResForRec"
            :th="['唯一码','数量']"
            :fields="['tmpxwin_serial','tmpxwin_qty']"
          ></esunShowTable>
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
  name: "deliveryForOtherPicking",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      pickingOrderId: "",
      barcode: "",
      quantity: 0,
      mask: false,
      header: "其他领用出库",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      LineDisabledFlag: false,
      BoxDisabledFlag: false,
      NumDisabledFlag: false,
      ResForNumChk: [],
      ResForRec: [],
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
              name: "行",
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
      res: [
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
      ]
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;

    this.effectiveDate = app.getDate();
  },
  mounted() {
    this.$refs.pickingOrderId.focus();
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
      this.pickingOrderId = "";
      this.barcode = "";
      this.quantity = 0;
      this.inputDisabledFlag = false;
      this.BoxDisabledFlag = false;
      app.refreshDetail(this.res);
      app.refreshDetail(this.mres);
      this.ResForNumChk = [];
      this.ResForRec = [];
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
      //no.5，最终保存
      let _this = this;
      console.log(_this.ResForNumChk);
      // return
      if (!_this.pickingOrderId) {
        mui.alert("请先校验领用单号");
        return;
      }
      if (!_this.effectiveDate) {
        mui.alert("请先选择生效日期");
        return;
      }
      if (!_this.ResForNumChk.length) {
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
          input_ProgramID: "xwbruniss01save",
          v_nbr: _this.pickingOrderId,
          effdate: _this.effectiveDate,
          input_tmpxwbruniss_in: _this.ResForNumChk
          // input_tmpxwbruniss_inmstr: _this.ResForRec
        },
        "xwbruniss01save",
        _this,
        function(e) {
          console.log(e);
          mui.toast("保存成功");
          _this.cleanAll();
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.ResForRec = [];
          _this.ResForNumChk = [];
          app.refreshDetail(_this.res);
          app.refreshDetail(_this.mres);
          _this.BoxDisabledFlag = true;
          _this.NumDisabledFlag = false;
          _this.barcode = "";
          _this.quantity = 0;
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
          });
        }
      );
    },
    NbrChange: function() {
      //no.1，领用单号检验
      let _this = this;
      _this.pickingOrderId = _this.pickingOrderId.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbruniss01nbrchk",
          v_nbr: _this.pickingOrderId,
          effdate: _this.effectiveDate
        },
        "xwbruniss01nbrchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          // _this.LineDisabledFlag = !_this.LineDisabledFlag;
          if (_this.BoxDisabledFlag === false) {
            _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
          }
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.pickingOrderId = "";
          _this.$refs.pickingOrderId.focus();
        }
      );
    },
    // LineChange: function() {
    //   // no.2，领用单号+行校验
    //   let _this = this;
    //   app.offlineAjax(
    //     {
    //       input_userId: _this.userId,
    //       input_crop: "",
    //       input_domain: localStorage.getItem("domainNow"),
    //       input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
    //         .sessionid,
    //       input_ProgramID: "xwbruniss01linechk",
    //       v_nbr: _this.pickingOrderId,
    //       v_line: _this.line
    //     },
    //     "xwbruniss01linechk",
    //     _this,
    //     function(e) {
    //       console.log(e);
    //       mui.toast("校验成功");
    //       _this.detail = [
    //         {
    //           detail: [
    //             {
    //               name: "零件",
    //               content: e.v_part
    //               // isshow: false
    //             }
    //           ]
    //         }
    //       ];
    //       // _this.LineDisabledFlag = !_this.LineDisabledFlag;
    //       if (_this.BoxDisabledFlag === false) {
    //         _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
    //       }

    //       // if (_this.BoxDisabledFlag) {

    //       // }
    //       _this.$nextTick(() => {
    //         _this.$refs.Box.focus();
    //       });
    //     },
    //     function() {
    //       mui.alert("离线功能暂未集成");
    //     },
    //     function() {
    //       mui.alert("校验失败");
    //     }
    //   );
    // },
    BoxChange() {
      // no.2，唯一码校验
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      if (_this.ResForNumChk.length) {
        if (
          _this.ResForNumChk.findIndex(
            it =>
              it.tmpxwout_code.toLowerCase().trim() ===
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
          input_ProgramID: "xwbruniss01serchk",
          v_nbr: _this.pickingOrderId,
          v_serial: _this.barcode
        },
        "xwbruniss01serchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.quantity = e.v_qty;
          _this.mres = [
            {
              detail: [
                {
                  name: "唯一码",
                  content: e.v_serial1
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "行",
                  content: ""
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
          _this.res = [
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
                  content: e.v_vend_lot
                },
                {
                  name: "制造日期",
                  content: app.getProgressDate(e.v_mdate)
                }
              ]
            },
            {
              detail: [
                {
                  name: "生效日期",
                  content: app.getProgressDate(e.v_date)
                },
                {
                  name: "失效日期",
                  content: app.getProgressDate(e.v_ddate)
                }
              ]
            },
            {
              detail: [
                {
                  name: "小包装号",
                  content: e.v_pack
                },
                {
                  name: "出库日期",
                  content: app.getProgressDate(e.v_cdate)
                }
              ]
            }
          ];
          _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
          _this.NumDisabledFlag = !_this.NumDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.num.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.barcode = "";
          _this.$refs.Box.focus();
        }
      );
    },
    NumChange: function() {
      //no.3，数量校验
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbruniss01qtychk",
          v_nbr: _this.pickingOrderId,
          v_serial: _this.barcode,
          v_qty: Number(_this.quantity),
          input_tmpxwbruniss_in: _this.ResForNumChk
        },
        "xwbruniss01qtychk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功，可继续扫条码或者直接保存");
          _this.mres[1].detail[0].content = e.v_line;
          _this.ResForNumChk.push(...e.output_tmpxwbruniss_out);
          _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
          _this.NumDisabledFlag = !_this.NumDisabledFlag;
          _this.ResForRec.push({
            tmpxwin_serial: _this.barcode,
            tmpxwin_qty: _this.quantity
          });
          _this.barcode = "";
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
          });
          console.log(_this.ResForNumChk);
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.barcode = "";
          _this.quantity = 0;
          _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
          _this.NumDisabledFlag = !_this.NumDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
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
</style>

