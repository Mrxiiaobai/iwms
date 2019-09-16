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
              <label>已扫描数量</label>
              <label
                class="inforLabel disabledTrue"
                style="width: 72%;border-radius: 5px;margin-left: 1.12rem"
              >{{ScanedNum}}</label>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>退料科室
              </label>
              <select
                :disabled="DepDisableFlag"
                :class="DepDisableFlag==true?'disabledTrue':''"
                class="mui-btn mui-btn-block"
                style="width:72%;border:1px solid #d5d9ed !important;padding-left: 1.16rem;"
                v-model="chosenDep"
                @change="DepChange"
              >
                <option
                  v-for="(item, index) in deps"
                  :key="index"
                  :value="item.temrexdeptget_dept"
                >{{item.temrexdeptget_desc}}</option>
              </select>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>退料原因
              </label>
              <select
                :disabled="resDisableFlag"
                class="mui-btn mui-btn-block"
                style="width:72%;border:1px solid #d5d9ed !important;padding-left: 1.16rem;"
                v-model="chosenType"
                @change="ResChange"
              >
                <option
                  v-for="(item, index) in types"
                  :key="index"
                  :value="item.tempresonxget_code"
                >{{item.tempresonxget_desc}}</option>
              </select>
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
                placeholder="请输入"
                ref="barcode"
                @change="BarcodeChange"
                :disabled="inputDisableFlag"
                :class="inputDisableFlag==true?'disabledTrue':''"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="showdetail" v-bind:mres="mres"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>退料数量
              </label>
              <input
                type="number"
                class="mui-input-clear"
                v-model="ReturnNum"
                placeholder="请输入"
                ref="ReturnNum"
                @blur="NumChange"
                :disabled="!numDisableFlag"
                :class="!numDisableFlag==true?'disabledTrue':''"
              />
              >
            </div>
          </div>
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
                @blur="RmkChange"
                :disabled="!rmkDisableFlag"
                :class="!rmkDisableFlag==true?'disabledTrue':''"
              />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row mui-checkbox mui-right">
              <label>打印</label>
              <input style="left: 24%" name="checkbox" v-model="print" type="checkbox" />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>打印机</label>
              <select
                class="mui-btn mui-btn-block"
                style="width:72%;border:1px solid #d5d9ed !important;padding-left: 1.16rem;"
                v-model="chosenPrinter"
                @change="PrinterChange"
              >
                <option v-for="(item, index) in printers" :key="index" :value="item.txlblget_code">{{item.txlblget_code}}</option>
              </select>
            </div>
          </div>
          <!-- <div align="center" style="margin:0 auto;width:100%;overflow:scroll;">
            <table border class="qgg-table">
              <thead>
                <tr>
                  <th>箱号</th>
                  <th>数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in saveRes">
                  <td>{{item.tmpxcjpkd_xcyl_seq}}</td>
                  <td>{{item.tmpxcjpkd_qty_ord}}</td>
                </tr>
              </tbody>
            </table>
          </div>-->
          <esunShowTable
            :res="saveRes"
            :th="['唯一码','数量']"
            :fields="['tmpxcjpkd_xcyl_seq','tmpxcjpkd_qty_ord']"
          ></esunShowTable>
        </div>

       

      </div>
      <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="OpenReset"></EsunFooter>
      <EsunMask v-bind:show="mask"></EsunMask>
      <EsunReset v-bind:confirmBtn="ConfirmReset" v-bind:cancelBtn="CloseReset" v-show="showReset"></EsunReset>
       <div class="popover-bg" v-show="showDomainsDiv">
					<div class="popover-inner">
						<div class="popInner">
							<div class="title">请选择科室</div>
							<span class="hr"></span>
							<div class="card">
								<div class="mui-input-group inputGroup">
									<div v-for="(item,index) in deps" class="mui-input-row mui-radio" v-bind:key="index">
										<label>{{item.temrexdeptget_desc}}</label>
										<input name="radio" :value="item.temrexdeptget_dept" v-model="chosenDep" type="radio" @change="NewDepChange">
									</div>
								</div>
							</div>
						</div>
					</div>
        <div class="popover" v-show="showDomainsDiv"></div>
				</div>

    </div>
  </v-touch>
</template>
<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  name: "ReturnListMT",
  data: function() {
    return {
      userId: "",
      domain: "",
      ScanedNum: 0,
      barcode: "",
      deps: [],
      chosenDep: "",
      ReturnNum: 0,
      types: [],
      chosenType: "",
      printers: [],
      chosenPrinter: "",
      print: true,
      mask: false,
      header: "退料单维护",
      inputChangeAjaxFlag: true,
      inputDisableFlag: false,
      numDisableFlag: false,
      rmkDisableFlag: false,
      resDisableFlag: false,
      DepDisableFlag: false,
      rmks: "",
      tempRes: [],
      saveRes: [],
      showdetail: [
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
      v_type: "",
      finalNbr: "",
      finalTable: [],
      showDomainsDiv: false,
      showReset: false
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;

    this.effectiveDate = app.getDate();
    this.$nextTick(() => {
      this.$refs.barcode.focus();
    });
    this.getDeps();
    this.getReasons();
    this.GetBoard();
  },
  mounted() {
    this.$refs.barcode.focus();
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
    OpenReset() {
      var _this = this;
      _this.showReset = true;
    },
    ConfirmReset() {
      var _this = this;
      _this.cleanAll();
_this.showReset = false;
    },
    CloseReset() {
        var _this = this;
      _this.showReset = false;
    },
    cleanAll() {
      this.ScanedNum = 0;
      this.barcode = "";
      // this.deps = [];
      this.chosenDep = "";
      this.ReturnNum = 0;
      // this.types = [];
      this.chosenType = "";
      // this.printers = [];
      this.chosenPrinter = "";
      this.resDisableFlag = false;
      this.DepDisableFlag = false;
      this.inputDisableFlag = false;
      this.numDisableFlag = false;
      this.rmkDisableFlag = false;
      this.print = true;
      this.rmks = "";
      this.tempRes = [];
      this.saveRes = [];
      app.refreshDetail(this.showdetail);
      app.refreshDetail(this.mres);
      this.v_type = "";
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
      // console.log(this.saveRes);
      console.log(this.print);
      this.showDomainsDiv = !this.showDomainsDiv
      // return;
      // this.finalNbr = "YL190904001";
      //       this.PrintPhase1();
    },
    ok: function() {
      let _this = this;
      if (!_this.chosenType || !_this.chosenDep) {
        mui.alert("请先选择退料科室和退料原因");
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
          input_ProgramID: "xwxcjpksave01",
          v_type: _this.v_type,
          v_code: _this.chosenType,
          v_sec: _this.chosenDep,
          input_temp: _this.saveRes
        },
        "xwxcjpksave01",
        _this,
        function(e) {
          console.log(e);
          mui.toast("处理成功");
          _this.ScanedNum += _this.saveRes.length;
          _this.chosenDep = "";
          _this.chosenType = "";
          // _this.chosenPrinter = "";
          _this.resDisableFlag = false;
          _this.DepDisableFlag = false;
          _this.inputDisableFlag = false;
          _this.numDisableFlag = false;
          _this.rmkDisableFlag = false;
          _this.tempRes = [];
          _this.saveRes = [];
          _this.barcode = "";
          _this.ReturnNum = 0;
          _this.rmks = "";
          app.refreshDetail(_this.showdetail);
          app.refreshDetail(_this.mres);
          _this.$nextTick(() => {
            _this.$refs.barcode.focus();
          });
          _this.v_type = "";
          if (_this.print) {
            _this.finalNbr = e.wirenbr;
            _this.PrintPhase1();
          }
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
        }
      );
    },
    PrintPhase1: function() {
      let _this = this;
      if (_this.chosenPrinter === "") {
        mui.alert("未选择打印模板，请先选择打印模板");
        _this.finalNbr = "";
        return;
      }
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwrejecprint",
          v_nbr: _this.finalNbr,
        },
        "xwrejecprint",
        _this,
        function(e) {
          console.log(e);
          _this.finalTable = e.output_xwgettwobarnbr_mstr;
          _this.PrintPhase2();
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
        }
      );
    },
     PrintPhase2: function() {
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrnbrprint",
          v_print: _this.print,
          v_model: _this.chosenPrinter,
          input_temp: _this.finalTable
        },
        "xwbrnbrprint",
        _this,
        function(e) {
          console.log(e);
          mui.toast("打印成功");
       
       _this.finalNbr = "";
       _this.finalTable = [];
       _this.chosenPrinter = "";
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
        }
      );
    },
    ResChange: function() {
      let _this = this;
      console.log(_this.chosenType);
      var index = _this.types.findIndex(
        it =>
          it.tempresonxget_code.toLowerCase().trim() ===
          _this.chosenType.toLowerCase().trim()
      );
      _this.v_type = _this.types[index].tempresonxget_type;
      _this.resDisableFlag = !_this.resDisableFlag;
    },
    DepChange: function() {
      let _this = this;
      console.log(_this.chosenDep);
      _this.DepDisableFlag = !_this.DepDisableFlag;
    },
    NewDepChange: function() {
      console.log(this.chosenDep)
    },
      PrinterChange: function() {
      let _this = this;
      console.log(_this.chosenPrinter);
    },
    BarcodeChange: function() {
      let _this = this;
      if (!_this.chosenType || !_this.chosenDep) {
        mui.alert("退料科室和退料原因都必选");
        _this.barcode = "";
        _this.$refs.barcode.focus();
        return;
      }
      _this.barcode = _this.barcode.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwrexcodeget",
          v_serial: _this.barcode
        },
        "xwrexcodeget",
        _this,
        function(e) {
          console.log(e);
          _this.mres = [
            {
              detail: [
                {
                  name: "唯一码",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_seq
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "零件",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_part
                  // isshow: false
                }
              ]
            },
            {
              detail: [
                {
                  name: "数量",
                  content:
                    e.output_tempboxdeget_mstr[0].tempboxdeget_qtyper +
                    " " +
                    e.output_tempboxdeget_mstr[0].tempboxdeget_um
                }
              ]
            }
          ];
          _this.showdetail = [
            {
              detail: [
                {
                  name: "描述1",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_desc1
                }
              ]
            },
            {
              detail: [
                {
                  name: "描述2",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_desc2
                }
              ]
            },
            {
              detail: [
                {
                  name: "地点",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_site
                }
              ]
            },
            {
              detail: [
                {
                  name: "库位",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_loc
                },
                {
                  name: "批/序",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_lot
                }
              ]
            },
            {
              detail: [
                {
                  name: "货格",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_grid
                },
                {
                  name: "参考",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_ref
                }
              ]
            },
            {
              detail: [
                {
                  name: "批属1",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_lot1
                },
                {
                  name: "批属2",
                  content: e.output_tempboxdeget_mstr[0].tempboxdeget_lot2
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
                  content: app.getProgressDate(
                    e.output_tempboxdeget_mstr[0].tempboxdeget_crtdate
                  )
                }
              ]
            },
            {
              detail: [
                {
                  name: "生效日期",
                  content: app.getProgressDate(
                    e.output_tempboxdeget_mstr[0].tempboxdeget_effdate
                  )
                },
                {
                  name: "失效日期",
                  content: app.getProgressDate(
                    e.output_tempboxdeget_mstr[0].tempboxdeget_expdate
                  )
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
                  content: app.getProgressDate(
                    e.output_tempboxdeget_mstr[0].tempboxdeget_outdate
                  )
                }
              ]
            }
          ];
          _this.ReturnNum = e.output_tempboxdeget_mstr[0].tempboxdeget_qtyper;
          _this.tempRes.push(...e.output_tempboxdeget_mstr);
          _this.inputDisableFlag = !_this.inputDisableFlag;
          _this.numDisableFlag = !_this.numDisableFlag;
          _this.$nextTick(() => {
            _this.$refs.ReturnNum.focus();
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
          _this.barcode = "";
          _this.$refs.barcode.focus();
        }
      );
    },
    NumChange: function() {
      let _this = this;
      if (_this.ReturnNum === 0) {
        mui.alert("退料数量不能为0");
        return;
      }
      var tempBox = _this.tempRes[0].tempboxdeget_seq.toLowerCase().trim();
      if (
        _this.saveRes.some(
          it => it.tmpxcjpkd_xcyl_seq.toLowerCase().trim() === tempBox
        )
      ) {
        var index = _this.saveRes.findIndex(
          it => it.tmpxcjpkd_xcyl_seq.toLowerCase().trim() === tempBox
        );
        _this.saveRes[index].tmpxcjpkd_qty_ord = _this.ReturnNum;
      } else {
        _this.saveRes.push({
          tmpxcjpkd_part: _this.tempRes[0].tempboxdeget_part,
          tmpxcjpkd_um: _this.tempRes[0].tempboxdeget_um,
          tmpxcjpkd_order: _this.tempRes[0].tempboxdeget_order,
          tmpxcjpkd_line: _this.tempRes[0].tempboxdeget_line,
          tmpxcjpkd_xcyl_seq: _this.tempRes[0].tempboxdeget_seq,
          tmpxcjpkd_site: _this.tempRes[0].tempboxdeget_site,
          tmpxcjpkd_loc: _this.tempRes[0].tempboxdeget_loc,
          tmpxcjpkd_grid: _this.tempRes[0].tempboxdeget_grid,
          tmpxcjpkd_lot: _this.tempRes[0].tempboxdeget_lot,
          tmpxcjpkd_ref: _this.tempRes[0].tempboxdeget_ref,
          tmpxcjpkd_qty: _this.tempRes[0].tempboxdeget_qtyper,
          tmpxcjpkd_qty_ord: _this.ReturnNum,
          tmpxcjpkd_box: _this.tempRes[0].tempboxdeget_box,
          tmpxcjpkd_send_time: app.getDate(),
          tmpxcjpkd_status: "",
          tmpxcjpkd_part_sct: _this.tempRes[0].tempboxdeget_part_sct,
          tmpxcjpkd_rmks: ""
        });
      }
      _this.tempRes = [];
      _this.numDisableFlag = !_this.numDisableFlag;
      _this.rmkDisableFlag = !_this.rmkDisableFlag;
      _this.$nextTick(() => {
        _this.$refs.rmks.focus();
      });
    },
    RmkChange: function() {
      let _this = this;
      if (!_this.chosenType || !_this.chosenDep) {
        mui.alert("退料科室和退料原因都必选");
        return;
      }
      if (!_this.barcode) {
        mui.alert("请先扫描唯一码");
        return;
      }
      if (_this.ReturnNum === 0) {
        mui.alert("退料数量不能为0");
        return;
      }
      var tempBox = _this.mres[0].detail[0].content.toLowerCase().trim();
      if (
        _this.saveRes.some(
          it => it.tmpxcjpkd_xcyl_seq.toLowerCase().trim() === tempBox
        )
      ) {
        var index = _this.saveRes.findIndex(
          it => it.tmpxcjpkd_xcyl_seq.toLowerCase().trim() === tempBox
        );
        _this.saveRes[index].tmpxcjpkd_rmks = _this.rmks;
      }
      _this.barcode = "";
      _this.ReturnNum = 0;
      _this.rmks = "";
      mui.toast("备注已记录");
      _this.rmkDisableFlag = !_this.rmkDisableFlag;
      if (_this.inputDisableFlag) {
        _this.inputDisableFlag = !_this.inputDisableFlag;
      }
      _this.$nextTick(() => {
        _this.$refs.barcode.focus();
      });
    },
    getDeps: function() {
      // 科室下拉框
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwrexdeptget"
        },
        "xwrexdeptget",
        _this,
        function(e) {
          console.log(e);
          _this.deps = e.output_temrexdeptget_mstr;
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          //   mui.alert("操作失败");
        }
      );
    },
    getReasons: function() {
      // 原因代码下拉框
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwresonxget",
          v_type: ""
        },
        "xwresonxget",
        _this,
        function(e) {
          console.log(e);
          _this.types = e.output_tempresonxget_mstr;
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {}
      );
    },
     GetBoard() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrxlblget',
      },
        'xwbrxlblget',
        _this,
        function (e) {
          console.log(e)
          // mui.alert('校验成功')
          _this.printers = e.output_txlblget_mstr;
          for (let i = 0; i < e.output_txlblget_mstr.length; i++) {
            if (e.output_txlblget_mstr[i].txlblget_log == true) {
              _this.chosenPrinter = e.output_txlblget_mstr[i].txlblget_code
            }
          }
        },
        function () {
         mui.alert("离线功能暂未集成");
        },
        function () {
         
        })
    },
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
.top-button-form:before {
  height: 0px;
}
.top-button-form:after {
  height: 0px;
}
.top-button-div:after {
  height: 0px;
}
/* .popover-bg {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		background-color: rgba(101, 112, 107, 0.2);
	} */

	.popover-bg .popover-inner {
		position: absolute;
		width: 3rem;
		height: 2.58rem;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(238, 236, 247, 1);
		box-shadow: 0px 2px 18px 1px rgba(59, 88, 212, 0.08);
		border-radius: 1px;
		left: 0.38rem;
		top: 1.91rem;
		z-index: 101;
		padding: 0.24rem 0 0 0.19rem;

	}

	.hr {
		width: 2.65rem;
		height: 1px;
		display: block;
		background: rgba(238, 236, 247, 1);
		margin-top: 0.2rem;
		margin-bottom: 0.15rem;
	}
	.inputGroup{
		width: 2.65rem;
		height: 0.47rem;
		line-height: 0.47rem;
		flex: 1;

	}
	.inputGroup label{
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before {
		width:0.2rem;
		height:0.2rem;
		border-radius:50%;
		position: absolute;
		right: -0.15rem;
	}
	.card{
		position: relative;
		width: 2.65rem;
		height: 1rem;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}
	.popover-bg .title {
		/* width:63px;
	height:16px; */
		font-size: 0.16rem;
		font-family: PingFang SC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 25px;
	}

	.popover-bg .btn-bg {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0.12rem;
		left: 0;
	}

	.popover-bg .btn-bg button {
		/* position: absolute; */
		/* margin-left:0.08rem; */
		width: 2.77rem;
		height: 0.47rem;
		background:rgba(59,88,212,1);
		color: #fff;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
	}

	.mui-checkbox input[type='checkbox']:checked:before,
	.mui-radio input[type='radio']:checked:before {
		color: #343434;
	}

	.popover-inner .mui-input-group .mui-input-row:after {
		left: 0;
	}
  .popover {
    position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		background:rgba(0,0,0,1);
		opacity:0.62;
  }
</style>

