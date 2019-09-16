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
                <span style="color:red;">*</span>退货单号
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="orderId"
                ref="orderId"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                :disabled="inputDisabledFlag"
                placeholder="请输入"
                @change="OrdChange"
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
                ref="barcode"
                :disabled="!BoxDisabledFlag"
                placeholder="请输入"
                :class="!BoxDisabledFlag==true?'disabledTrue':''"
                @change="BarcodeChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="detail2" v-bind:mres="mres"></EsunShowDetail>
          <esunShowTable :res="showRes" :th="['唯一码','数量']" :fields="['code','qty']"></esunShowTable>
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
  name: "purchaseOrderReturn",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      orderId: "",
      barcode: "",
      mask: false,
      header: "采购退货",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      BoxDisabledFlag: false,
      v_count: 0,
      res: [],
      mres: [
        {
          detail: [
            {
              name: "退货地点",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "退货库位",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "退货货格",
              content: ""
              // isshow: false
            }
          ]
        },
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
              // isshow: false
            }
          ]
        }
      ],
      detail2: [
        {
          detail: [
            {
              name: "供应商",
              content: ""
              // isshow: false
            }
          ]
        },
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
      showRes: []
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    this.effectiveDate = app.getDate();
  },
  mounted() {
    this.$refs.orderId.focus();
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
      this.orderId = "";
      this.barcode = "";
      this.inputDisabledFlag = false;
      this.BoxDisabledFlag = false;
      this.v_count = 0;
      this.res = [];
      this.showRes = [];
      app.refreshDetail(this.detail2);
      app.refreshDetail(this.mres);
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
      console.log(_this.res);
      // return;
      _this.boxSave();
    },
    OrdChange: function() {
      // 退货单校验
      let _this = this;
      _this.orderId = _this.orderId.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwjpkmt02nbrchk",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId
        },
        "xwjpkmt02nbrchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.BoxDisabledFlag = !_this.BoxDisabledFlag;
          _this.$nextTick(() => {
            _this.$refs.barcode.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.orderId = "";
          _this.$refs.orderId.focus();
        }
      );
    },
    BarcodeChange: function() {
      // 唯一码校验
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwjpkmt02srchk",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId,
          v_serial: _this.barcode,
          v_count: _this.v_count,
          table_in: [..._this.res]
        },
        "xwjpkmt02srchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.mres = [
            {
              detail: [
                {
                  name: "退货地点",
                  content: e.v_site_from
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "退货库位",
                  content: e.v_loc_from
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "退货货格",
                  content: e.v_grid_from
                  // isshow: false
                }
              ]
            },
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
                  // isshow: false
                }
              ]
            }
          ];
          _this.detail2 = [
            {
              detail: [
                {
                  name: "供应商",
                  content: e.v_vend
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述1",
                  content: e.v_ptdesc1
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: e.v_ptdesc2
                  // isshow: false
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
                  content: e.v_gird
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
                  content: app.getProgressDate(e.v_date_mfc)
                }
              ]
            },
            {
              detail: [
                {
                  name: "生效日期",
                  content: app.getProgressDate(e.v_effdate)
                },
                {
                  name: "失效日期",
                  content: app.getProgressDate(e.v_date_disa)
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
                  content: app.getProgressDate(e.v_date02)
                }
              ]
            }
          ];
          _this.v_count = e.v_count1;
          _this.res = e.table_out;
          _this.showRes.push({
            code: e.v_boxnbr,
            qty: e.v_qty
          });
          _this.barcode = "";
          _this.$nextTick(() => {
            _this.$refs.barcode.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("校验失败");
          _this.barcode = "";
          _this.$refs.barcode.focus();
        }
      );
    },
    boxSave: function() {
      let _this = this;
      if (!_this.effectiveDate) {
        mui.alert("请先选择生效日期");
        return;
      }
      if (!_this.orderId) {
        mui.alert("退货单号为空");
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
          input_ProgramID: "xwjpkmt02srsave",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId,
          table_in: [..._this.res]
        },
        "xwjpkmt02srsave",
        _this,
        function(e) {
          console.log(e);
          mui.toast("处理成功");
          _this.cleanAll();
          _this.$nextTick(() => {
            _this.$refs.orderId.focus();
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
</style>

