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
                <span style="color:red;">*</span>采购订单
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
              <label style="display:block;width:28%">行</label>
              <label
                class="inforLabel disabledTrue"
                style="padding: 11px 0px;display:inline;width:72%;border-radius: 1px;padding-left: 10px;height: 33px"
              >{{showLine}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label style="display:block;width:28%">供应商</label>
              <label
                class="inforLabel disabledTrue"
                style="padding: 11px 0px;display:inline;width:72%;border-radius: 1px;padding-left: 10px;height: 33px"
              >{{showVend}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label style="display:block;width:28%">已扫描</label>
              <label
                class="inforLabel disabledTrue"
                style="padding: 11px 0px;display:inline;width:72%;border-radius: 1px;padding-left: 10px;height: 33px"
              >{{scanned}}</label>
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

          <!-- <esunShowTable :res="showRes" :th="['零件号','数量']" :fields="['code','qty']"></esunShowTable> -->
          <div align="center" style="margin:0 auto;width:100%;overflow:scroll;" class="detail">
            <span
              style="margin-left: 12px;display:block;width: 319px;height: 1px !important;background: #DDDDE5;color: #DDDDE5;position: absolute;top:31.2px;"
            ></span>
            <table border class="qgg-table" style="border: 1px solid #D5D9ED;">
              <thead>
                <tr>
                  <th style="color:#3B58D4;font-size: 11px;">零件号</th>
                  <th style="color:#3B58D4;font-size: 11px;">数量</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in showRes"
                  :key="item.tmppt_part"
                  @click="TrChick(item.tmppt_part, item.tmppt_ptdesc1, item.tmppt_ptdesc2, res)"
                >
                  <td>{{item.tmppt_part}}</td>
                  <td>{{item.tmppt_qty_all}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="popBox" ref="popBox">
          <div
            id="popover-inner"
            align="center"
            style="margin:0 auto;width:100%;overflow:scroll;"
            class="detail"
          >
            <div class="title">请选择行</div>
            <span
              style="margin-left: 12px;display:block;width: 92%;height: 1px !important;background: #DDDDE5;color: #DDDDE5;position: absolute;top:51.2px;"
            ></span>
            <table border class="qgg-table" style="border: 1px solid #D5D9ED;">
              <thead>
                <tr>
                  <th style="color:#3B58D4;font-size: 11px;">采购订单</th>
                  <th style="color:#3B58D4;font-size: 11px;">行</th>
                  <th style="color:#3B58D4;font-size: 11px;">零件</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in showLineTable"
                  :key="item.tmplndet_line"
                  @click="BackToMain(item.tmplndet_line)"
                >
                  <td>{{item.tmplndet_nbr}}</td>
                  <td>{{item.tmplndet_line}}</td>
                  <td>{{item.tmplndet_part}}</td>
                </tr>
              </tbody>
            </table>
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
  name: "purchaseOrderReturnSD",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      orderId: "",
      showLine: "",
      showVend: "",
      scanned: 0,
      barcode: "",
      mask: false,
      header: "采购退货（申达）",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      BoxDisabledFlag: false,
      v_count: 0,
      res: [],
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
      showRes: [],
      showLineTable: []
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
      this.showLineTable = [];
      this.showVend = "";
      this.showLine = "";
      this.scanned = 0;
    },
    gousercenter: function() {
      this.inputChangeAjaxFlag = false;
      app.center(this);
    },
    back: function() {
      this.inputChangeAjaxFlag = false;
      app.back(this);
    },
    BackToMain: function(line) {
      let _this = this;
      _this.$refs.popBox.style.display = "none";
      _this.mask = false;
      _this.showLine = line;
      _this.BarcodeChange1();
    },
    TrChick(part, desc1, desc2, res) {
      let _this = this;
      var newRes = res.filter(it => it.tbox_part.toLowerCase().trim() === part.toLowerCase().trim())
      console.log(newRes)
          _this.$router.push({
            name: "purchaseOrderReturnSDsub",
            query: {
              title_part: part,
              title_desc1: desc1,
              title_desc2: desc2,
              maintable: newRes,
              timesindex: "4",
              name: "采购退货已扫描清单"
            }
          });
    },
    cancel: function() {
      // this.$refs.popBox.style.display = "block";
      // this.mask = true;
    },
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
          input_ProgramID: "xwbrporv01nbrchk",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId
        },
        "xwbrporv01nbrchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          _this.showVend = e.v_vend;
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
          input_ProgramID: "xwbrporv01lnchk",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId,
          v_serial: _this.barcode,
          table_in: [..._this.res]
        },
        "xwbrporv01lnchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
          if (e.table_out.length > 1) {
            _this.showLineTable = e.table_out;
            _this.$refs.popBox.style.display = "block";
            _this.mask = true;
          } else {
            _this.showLine = e.table_out[0].tmplndet_line;
            _this.BarcodeChange1();
          }
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.barcode = "";
          _this.$refs.barcode.focus();
        }
      );
    },
    BarcodeChange1: function() {
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
          input_ProgramID: "xwbrporv01srchk",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId,
          v_line: Number(_this.showLine),
          v_vend: _this.showVend,
          v_serial: _this.barcode,
          table_in: [..._this.res]
        },
        "xwbrporv01srchk",
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
            }
          ];
          _this.detail2 = [
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
                  content: ""
                },
                {
                  name: "出库日期",
                  content: ""
                }
              ]
            }
          ];
          _this.scanned += 1;
          _this.res = e.table_out;
          _this.showRes = e.table_outPt;
          _this.barcode = "";
          _this.$nextTick(() => {
            _this.$refs.barcode.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.barcode = "";
          _this.showLine = "";
           _this.$nextTick(() => {
            _this.$refs.barcode.focus();
          });
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
          input_ProgramID: "xwbrporv01save",
          effdate: _this.effectiveDate,
          v_nbr: _this.orderId,
          table_in: [..._this.res]
        },
        "xwbrporv01save",
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
#popBox {
  display: none;
  /* background-color: rgba(101, 112, 107, 0.2); */
  z-index: 1010;
  width: 300px;
  height: 500px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
#popBox .title {
  width: 100%;
  /* border-bottom: 2px solid #343434; */
  text-align: center;
  padding-top: 5%;
  padding-bottom: 5%;
}
#popBox #popover-inner {
  width: 70%;
  position: absolute;
  /* left: 15%; */
  top: 15%;
  bottom: 30%;
  /* z-index: 101; */
  background-color: #ffffff;
  border-radius: 5%;
  opacity: 1;
}
.detail {
  height: auto;
  position: relative;
  /* border:1px solid #D5D9ED; */
}
.qgg-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #c6c6c6 !important;
  margin-bottom: 20px;
  white-space: nowrap;
}
.qgg-table th {
  border-collapse: collapse;
  border: none !important;
  /* border-bottom: 1px solid #c6c6c6 !important; */
  background-color: #f4f5f9 !important;
  padding: 5px 9px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.qgg-table td {
  border-collapse: collapse;
  border: none !important;
  /* border-bottom: 1px solid #c6c6c6 !important; */
  padding: 5px 9px;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  /* word-break: break-all; */
}
.qgg-table tr:nth-child(odd) {
  background-color: #fff !important;
}
.qgg-table tr:nth-child(even) {
  background-color: #f8f8f8 !important;
}
</style>

