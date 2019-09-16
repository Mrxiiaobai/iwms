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
                <span style="color:red;">*</span>唯一码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toBoxId"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请扫描"
                ref="toBoxId"
                @change="chkToBox"
              />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>至货格
              </label>
              <input
                type="text"
                v-model="target_site_grid"
                ref="target_site_grid"
                :disabled="!checkDisableFlag"
                :class="!checkDisableFlag==true?'disabledTrue':''"
                @change="targetChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="showres2" v-bind:mres="showres"></EsunShowDetail>
          <EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
          <esunShowTable :res="showTable" :th="['唯一码','数量']" :fields="['code','qty']"></esunShowTable>
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
  name: "consignmentPurchaseOrderReceipt",
  data: function() {
    return {
      target_site_grid: "",
      v_nbr: "",
      v_vend: "",
      save_in: [],
      save_mstr: [],
      userId: "",
      domain: "",
      effectiveDate: "",
      toSiteAndLocation: "",
      toSite: "",
      toLocation: "",
      toBoxId: "",
      toGrid: "",
      quantityOfBox: 0,
      fromBoxId: "",
      targetSite: "",
      location: "",
      fromBox: "",
      grid: "",
      compontentId: "",
      pickItemBatch: "",
      referenceId: "",
      batchProperty1: "",
      batchProperty2: "",
      quantity: 0,
      supplierCode: "",
      supplierLot: "",
      mask: false,
      header: "寄存采购收货",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      checkDisableFlag: false,
      toBox: "",
      stampList: [], //打印表存储
      BoxinputDisabledFlag: false,
      txlblget_code: "",
      showres: [
        {
          detail: [
            {
              name: "地点",
              content: ""
            },
            {
              name: "库位",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "货格",
              content: ""
            }
          ]
        }
      ],
      showres2: [],
      mres: [
        {
          detail: [
            {
              name: "零件",
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
              name: "批/序",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "参考",
              content: ""
            },
            {
              name: "数量",
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
      showTable: []
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    this.domain = localStorage.getItem("domain");
    this.input_Session_ID = JSON.parse(
      localStorage.getItem("userMsg")
    ).sessionid;
    this.effectiveDate = app.getDate();
    this.$nextTick(() => {
      this.$refs.toBoxId.focus();
    });
  },
  mounted() {
    this.$refs.toBoxId.focus();
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
      var _this = this;
      _this.target_site_grid = "";
      _this.v_nbr = "";
      _this.v_vend = "";
      _this.save_in = [];
      _this.save_mstr = [];
      _this.toSiteAndLocation = "";
      _this.toSite = "";
      _this.toLocation = "";
      _this.toBoxId = "";
      _this.toGrid = "";
      _this.quantityOfBox = 0;
      _this.fromBoxId = "";
      _this.targetSite = "";
      _this.location = "";
      _this.fromBox = "";
      _this.grid = "";
      _this.compontentId = "";
      _this.pickItemBatch = "";
      _this.referenceId = "";
      _this.batchProperty1 = "";
      _this.batchProperty2 = "";
      _this.quantity = 0;
      _this.supplierCode = "";
      _this.supplierLot = "";
      _this.mask = false;
      _this.inputChangeAjaxFlag = true;
      _this.inputDisabledFlag = false;
      _this.checkDisableFlag = false;
      _this.toBox = "";
      _this.stampList = []; //打印表存
      _this.BoxinputDisabledFlag = false;
      _this.txlblget_code = "";
      _this.showTable = [];
      _this.showres2 = [];
      _this.inputDisabledFlag = false;
      _this.showres = [
        {
          detail: [
            {
              name: "地点",
              content: ""
            },
            {
              name: "库位",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "货格",
              content: ""
            }
          ]
        }
      ];
      _this.mres = [
        {
          detail: [
            {
              name: "零件",
              content: ""
            }
          ]
        }
      ];
      _this.res = [
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
              name: "批/序",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "参考",
              content: ""
            },
            {
              name: "数量",
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
      ];
      _this.fromBoxList = [];
      _this.tochk = false;

      _this.stampList = [];
      _this.detailres = [];
      _this.barcode = "";
      this.$nextTick(() => {
        _this.$refs.toBoxId.focus();
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
    cancel: function() {
      // console.log(this.save_in)
      // console.log(this.save_mstr)
    },
    ok: function() {
      this.ajaxSave();
    },
    ajaxSave() {
      let _this = this;
      if (!_this.effectiveDate) {
        mui.alert("请先选择生效日期");
        return;
      }
      if (!_this.v_nbr) {
        mui.alert("唯一码为空");
        return;
      }
      if (!_this.save_in.length) {
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
          input_ProgramID: "xwbrporcsave",
          v_nbr: _this.v_nbr,
          effdate: _this.effectiveDate,
          tmpprona1_inout: _this.save_in,
          tmpprona1_outout: _this.save_mstr
        },
        "xwbrporcsave",
        _this,
        function(e) {
          console.log(e);
          mui.toast("处理成功");
          _this.save_in = [];
          _this.save_mstr = [];
          _this.showTable = [];
          _this.v_nbr = "";
          _this.v_vend = "";
          _this.toBoxId = "";
          _this.target_site_grid = "";
          _this.toSite = "";
          _this.toGrid = "";
          _this.toLocation = "";
          app.refreshDetail(_this.showres);
          app.refreshDetail(_this.res);
          _this.cleanAll();
        },
        function() {
          mui.alert("离线功能尚未集成");
        },
        function() {}
      );
    },
    chkToBox() {
      var _this = this;
      _this.toBoxId = _this.toBoxId.toLowerCase().trim();
      if (_this.toBoxId == "") {
        mui.alert("请扫描唯一码");
        return;
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrportarchk",
          v_serial: _this.toBoxId
        },
        "xwbrportarchk",
        _this,
        function(e) {
          if (e.v_insp == "需检验") {
            _this.showres = [
              {
                detail: [
                  {
                    name: "地点",
                    content: e.v_site
                  },
                  {
                    name: "库位",
                    content: e.v_loc
                  }
                ]
              },
              {
                detail: [
                  {
                    name: "货格",
                    content: e.v_grid
                  }
                ]
              }
            ];
            _this.ajaxChkbrpornbr();
          } else {
            mui.toast("请输入至货格");
            _this.checkDisableFlag = !_this.checkDisableFlag;
            _this.$nextTick(() => {
              _this.$refs.target_site_grid.focus();
            });
          }
        },
        function() {
          mui.alert("离线功能尚未集成");
        },
        function() {
          _this.toBoxId = "";
          _this.$refs.toBoxId.focus();
        }
      );
    },
    targetChange: function() {
      let _this = this;
      _this.target_site_grid = _this.target_site_grid.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrprogridget",
          target_site_grid: _this.target_site_grid
        },
        "xwbrprogridget",
        _this,
        function(e) {
          _this.showres = [
            {
              detail: [
                {
                  name: "地点",
                  content: e.v_site
                },
                {
                  name: "库位",
                  content: e.v_loc
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.v_grid
                }
              ]
            }
          ];
          _this.ajaxChkbrpornbr();
        },
        function() {
          mui.alert("离线功能尚未集成");
        },
        function() {
          _this.target_site_grid = "";
          _this.$refs.target_site_grid.focus();
        }
      );
    },
    ajaxChkbrpornbr() {
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrpornbrchk",
          v_serial: _this.toBoxId,
          target_site_grid: _this.target_site_grid,
          v_nbr: _this.v_nbr,
          v_vend: _this.v_vend,
          tmpprona1_in: _this.save_in
        },
        "xwbrpornbrchk",
        _this,
        function(e) {
          if (e.errormessage != "") {
            mui.alert(e.errormessage, "后端提示");
          }
          _this.mres = [
            {
              detail: [
                {
                  name: "零件",
                  content: e.v_part
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
                  name: "批次",
                  content: e.v_lot
                }
              ]
            },
            {
              detail: [
                {
                  name: "参考",
                  content: e.v_ref
                },
                {
                  name: "数量",
                  content: e.v_qty + " " + e.v_um
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
                  content: e.v_vendlot
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
          _this.showTable = [];
          e.table_out.forEach(it => {
            if (it.tpronout_code) {
              _this.showTable.push({
                code: it.tpronout_code,
                qty: it.tpronout_qty
              });
            }
          });
          _this.save_in = e.table_out;
          _this.save_mstr.push(...e.t_asn2_mstr);
          _this.v_nbr = e.vv_nbr;
          _this.v_vend = e.vv_vend;
          _this.toBoxId = "";
          _this.target_site_grid = "";
          if (_this.checkDisableFlag) {
            _this.checkDisableFlag = !_this.checkDisableFlag;
          }
          _this.$nextTick(() => {
            _this.$refs.toBoxId.focus();
          });
        },
        function() {
          mui.alert("离线功能尚未集成");
        },
        function() {
          _this.toBoxId = "";
          _this.$nextTick(() => {
            _this.$refs.toBoxId.focus();
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
.borderR {
  border-radius: 7px;
  overflow: hidden;
}
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
.showAll {
  position: absolute;
  width: 94%;
  left: 0px;
  top: 480px;
  height: 200px;
  margin: 3%;
  border: 1px solid #e2e2e2;
  overflow: auto;
}
.freeListRoom {
  width: 2%;
}
.fontIndexSize {
  width: 10%;
  color: black;
}
.colorFont {
  margin: 10px;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  color: red;
}
.colorFontG {
  margin: 10px;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  color: green;
}
.circleSize {
  width: 15%;
}
.fontSize {
  width: 30%;
}
.fontIndexSize {
  width: 10%;
  color: black;
}
.colorListFont {
  margin: 10px;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>

