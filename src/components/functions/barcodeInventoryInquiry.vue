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
            <!-- <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <span>查询条件：{{SelectBySer}}</span>
                <div class="mui-switch" @click="selectifSer" :class="ifSer?'mui-active':''">
                  <div class="mui-switch-handle"></div>
                </div>
              </li>
            </ul>-->
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>查询条件:
              </label>
              <select
                class="mui-btn mui-btn-block"
                style="width:72%"
                v-model="SelectBySer"
                @change="ConditionChange"
              >
                <option value="按唯一码">按唯一码</option>
                <option value="按零件号">按零件号</option>
              </select>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row" v-show="ifSer">
              <label>
                <span style="color:red;">*</span>唯一码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                ref="barcode"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                @focus="ClickIn"
                @change="BarcodeChange"
              />
            </div>

            <div v-show="!ifSer" class="mui-input-row">
              <label>
                <span style="color:red;">*</span>零件号
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="part"
                ref="part"
                :disabled="inputDisabledFlag1"
                :class="inputDisabledFlag1==true?'disabledTrue':''"
                placeholder="请输入"
                @change="OtherChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="showdetail" v-bind:res="[]"></EsunShowDetail>
          <div align="center" style="margin:0 auto;width:100%;overflow:scroll;" class="detail">
            <span
              style="margin-left: 12px;display:block;width: 319px;height: 1px !important;background: #DDDDE5;color: #DDDDE5;position: absolute;top:31.2px;"
            ></span>
            <table border class="qgg-table" style="border: 1px solid #D5D9ED;">
              <thead>
                <tr>
                  <th style="color:#3B58D4;font-size: 11px;">货格</th>
                  <th style="color:#3B58D4;font-size: 11px;">批/序</th>
                  <th style="color:#3B58D4;font-size: 11px;">参考号</th>
                  <th style="color:#3B58D4;font-size: 11px;">合计数量</th>
                  <th style="color:#3B58D4;font-size: 11px;">地点</th>
                  <th style="color:#3B58D4;font-size: 11px;">库位</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in res"
                  @click="TrChick(item.temlddboxsu_site,item.temlddboxsu_grid,item.temlddboxsu_lot,item.temlddboxsu_ref)"
                >
                  <td>{{item.temlddboxsu_grid}}</td>
                  <td>{{item.temlddboxsu_lot}}</td>
                  <td>{{item.temlddboxsu_ref}}</td>
                  <td>{{item.temlddboxsu_sum}}</td>
                  <td>{{item.temlddboxsu_site}}</td>
                  <td>{{item.temlddboxsu_loc}}</td>
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
  name: "barcodeInventoryInquiry",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      barcode: "",
      part: "",
      showPart: "",
      compontentDescribe1: "",
      compontentDescribe2: "",
      UM: "",
      grid: "",
      site: "",
      lot: "",
      batch: "",
      mask: false,
      header: "条码库存查询",
      SelectBySer: "按唯一码",
      ifSer: true,
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      inputDisabledFlag1: false,
      res: [],
      showdetail: [
        {
          detail: [
            {
              name: "零件号",
              content: ""
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
            }
          ]
        },
        {
          detail: [
            {
              name: "单位",
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
    cleanAll() {
      this.barcode = "";
      this.part = "";
      this.compontentDescribe1 = "";
      this.compontentDescribe2 = "";
      this.UM = "";
      this.grid = "";
      this.lot = "";
      this.batch = "";
      this.inputDisabledFlag = false;
      this.res = [];
      app.refreshDetail(this.showdetail);
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
    ok: function() {},
    ClickIn() {
      let _this = this;
      _this.barcode = "";
      _this.part = "";
    },
    selectifSer() {
      var _this = this;
      if (_this.ifSer == false) {
        _this.SelectBySer = "按唯一码";
        _this.ifSer = true;
      } else {
        _this.SelectBySer = "按零件号";
        _this.ifSer = false;
      }
    },
    ConditionChange() {
      var _this = this;
      if (_this.ifSer == false) {
        _this.SelectBySer = "按唯一码";
        _this.ifSer = true;
      } else {
        _this.SelectBySer = "按零件号";
        _this.ifSer = false;
      }
    },
    BarcodeChange() {
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrlddiqget01",
          v_serial: _this.barcode,
          v_part: ""
        },
        "xwbrlddiqget01",
        _this,
        function(e) {
          console.log(e);
          _this.grid = e.vv_grid;
          _this.site = e.vv_site;
          _this.lot = e.vv_lot;
          _this.showPart = e.vv_part;
          _this.showdetail = [
            {
              detail: [
                {
                  name: "零件号",
                  content: e.vv_part
                }
              ]
            },
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
                  name: "单位",
                  content: e.v_um
                }
              ]
            }
          ];
          // _this.inputDisabledFlag = !_this.inputDisabledFlag;
          _this.getSumTable();
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.barcode = "";
          _this.$refs.barcode.focus();
        }
      );
    },
    OtherChange() {
      let _this = this;
      _this.part = _this.part.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrlddiqget01",
          v_serial: "",
          v_part: _this.part
        },
        "xwbrlddiqget01",
        _this,
        function(e) {
          console.log(e);
          _this.grid = e.vv_grid;
          _this.site = e.vv_site;
          _this.lot = e.vv_lot;
          _this.showPart = e.vv_part;
          _this.showdetail = [
            {
              detail: [
                {
                  name: "零件号",
                  content: e.vv_part
                }
              ]
            },
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
                  name: "单位",
                  content: e.v_um
                }
              ]
            }
          ];
          // _this.inputDisabledFlag1 = !_this.inputDisabledFlag1;
          _this.getSumTable();
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
          _this.part = "";
          _this.$refs.part.focus();
        }
      );
    },
    getSumTable() {
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrlddiqget02",
          v_part: _this.showPart,
          v_grid: _this.grid,
          v_site: _this.site,
          v_lot: _this.lot
        },
        "xwbrlddiqget02",
        _this,
        function(e) {
          console.log(e);
          // mui.toast("校验成功");
          if (e.xwbrlddiqbox_out.length === 0) {
            mui.toast("无汇总记录");
          } else {
            _this.res = e.xwbrlddiqbox_out;
          }
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
        }
      );
    },
    TrChick(site, grid, lot, ref) {
      let _this = this;
      console.log(ref);
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrlddiqget03",
          v_part: _this.showPart,
          v_grid: grid,
          v_site: site,
          v_lot: lot,
          v_ref: ref
        },
        "xwbrlddiqget03",
        _this,
        function(e) {
          console.log(e);
          // mui.toast("校验成功");
          _this.$router.push({
            name: "barcodeInventoryInquirysub",
            query: {
              title_part: _this.showPart,
              title_grid: grid,
              title_lot: lot,
              maintable: e.xwbrlddiqbox3_out,
              timesindex: "4",
              name: "条码库存明细"
            }
          });
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          // mui.alert("校验失败");
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
  /* border-bottom: none !important; */
  background-color: #f4f5f9 !important;
  padding: 5px 9px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.qgg-table td {
  border-collapse: collapse;
  border: none !important;
  /* border-bottom: none !important; */
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
/* 查询条件样式补充 */
.mui-input-row .mui-btn {
  padding: 0 7px;
  border: 1px solid #d5d9ed !important;
  color: #666 !important;
}
</style>

