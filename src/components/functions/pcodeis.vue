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
              <input
                class="mui-version"
                type="date"
                :disabled="inputDisabledFlag"
                v-model="effectiveDate"
                :class="inputDisabledFlag==true?'disabledTrue':''"
              >
            </div>
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>至地点货格
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toBoxId"
                :disabled="inputDisabledFlag"
                placeholder="请扫描至地点货格"
                ref="toBoxId"
                @blur="chkToBox()"
                :class="inputDisabledFlag==true?'disabledTrue':''"
              >
              <!-- <span class="mui-icon mui-icon-clear"></span> -->
            </div>
          </div>
          <EsunShowDetail v-bind:mres="toBoxG" v-bind:res="toBoxGD"></EsunShowDetail>
          <!-- <div class="mui-input-group" v-show="tochk"> -->
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>唯一码:
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="fromBox"
                :disabled="!tochk"
                :class="!tochk==true?'disabledTrue':''"
                placeholder="请扫描唯一码"
                @blur="chkFromBox()"
                ref="fromBox"
              >
            </div>
          </div>
          <EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
        </div>
        <div class="showAll">
          <div class="mui-input-row inforLabel">
            <div style="width:100%">
              <label style="width:75%!important; padding-left:15px">箱号</label>
              <label style="width:25%">数量</label>
            </div>
          </div>
          <div class="mui-input-group">
            <transition-group name="list" tag="p">
              <div
                v-for="(iteam,index) in detailres"
                class="list-item mui-input-row"
                v-bind:key="iteam.BoxId"
                style="border-bottom: 1px solid #cccccc; color:black"
              >
                <div style="width:100%;" @click="alRemark(index)">
                  <label style="width:8%!important;font-weight:600">{{detailres.length-index}}</label>
                  <label style="width:67%!important;">{{iteam.BoxId}}</label>
                  <label style="width:25%;padding-left:0px">{{iteam.v_qty}}</label>
                </div>
                <div
                  class="mui-input-row"
                  v-show="iteam.ifshowremark ==false"
                  style="margin: 10px 5px; border: 1px solid #ddd;"
                >
                  <textarea
                    id="textarea"
                    rows="5"
                    placeholder="点击此处输入备注"
                    v-model="iteam.tmpwipcodeissave_remark"
                  ></textarea>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="popover-bg" v-show="showDomainsDiv">
          <div class="popover-inner" style="height:45%">
            <div class="title">请修改备注</div>
            <div class="mui-card" style="margin-top: 5%;box-shadow:none">
              <div class="mui-input-group" style="height:100px!important;">
                <textarea
                  style="height:100px!important;"
                  id="textarea"
                  rows="5"
                  v-model="tmpwipcodeissave_remark"
                  placeholder="点击此处输入备注"
                ></textarea>
              </div>
            </div>
            <div class="btn-bg">
              <button
                @click="canclealert()"
                type="button"
                class="mui-btn mui-btn-whilte mui-btn-outlined"
                style="color: white;background-color: #007AFF;border: 1px solid ;background:#343434;"
              >确认</button>
            </div>
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
  name: "pcodeis",
  data: function () {
    return {
      showDomainsDiv: false,//修改备注
      alRemarknum: 0,
      tmpwipcodeissave_remark: '',
      userId: '',
      v_site: '',
      remark: '',//备注
      v_loc: '',
      toGrid: '',
      domain: '',
      effectiveDate: '',
      toBoxId: '',
      quantityOfBox: 0,
      fromBoxId: '',
      targetSite: '',
      location: '',
      fromBox: '',
      fromBoxList: [],
      grid: '',
      compontentId: '',
      pickItemBatch: '',
      referenceId: '',
      batchProperty1: '',
      batchProperty2: '',
      quantity: 0,
      supplierCode: '',
      moulds: [],//moban
      supplierLot: '',
      mask: false,
      header: "外协出库",
      tochk: false,
      Stamp: "打印",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      inputFromBox: false,
      toBox: '',
      stampList: [],//打印表存储
      txlblget_code: '',
      toBoxGD: [],
      toBoxG: [{
        detail: [{
          name: '地点',
          content: ''
        }, {
          name: '库位',
          content: ''
        }]
      }, {
        detail: [{
          name: '货格',
          content: ''
        }]
      }],
      mres: [{
        detail: [{
          name: '零件',
          content: ''
        }]
      }],
      res: [
        {
          detail: [
            {
              name: "零件",
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
              name: "地点",
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
              name: "供应商",
              content: ""
            }, {
              name: "供批次",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "托盘",
              content: ""
            },
            {
              name: "箱数",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "条码类型",
              content: ""
            },
            {
              name: "状态",
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
        }
      ],
      toboxList: [{        xwbrbox02check02dtin_code: '',
        xwbrbox02check02dtin_part: '',
        xwbrbox02check02dtin_site: '',
        xwbrbox02check02dtin_loc: '',
        xwbrbox02check02dtin_grid: '',
        xwbrbox02check02dtin_lot: '',
        xwbrbox02check02dtin_ref: '',
        xwbrbox02check02dtin_vend: '',
        xwbrbox02check02dtin_vend_lot: '',
        xwbrbox02check02dtin_qty: ''
      }],
      toboxListSave: [
        //   {
        //   input_xwbrbox02savein_code: '',
        //   input_xwbrbox02savein_part: '',
        //   input_xwbrbox02savein_site: '',
        //   input_xwbrbox02savein_loc: '',
        //   input_xwbrbox02savein_grid: '',
        //   input_xwbrbox02savein_lot: '',
        //   input_xwbrbox02savein_ref: '',
        //   input_xwbrbox02savein_vend: '',
        //   input_xwbrbox02savein_vend_lot: '',
        //   input_xwbrbox02savein_qty: ''
        // }
      ],
      detailres: []//显示下方框框
    }
  },
  created() {
    let _this = this
    app.init(_this)
    _this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    _this.domain = localStorage.getItem('domain')
    _this.input_Session_ID = JSON.parse(localStorage.getItem('userMsg')).sessionid
    _this.effectiveDate = app.getDate()
    _this.$nextTick(() => {
      _this.$refs.toBoxId.focus()
    });
  },
  mounted() {
    app.addBack(this.back)
  },
  destroyed() {
    app.removeBack(this.back)
  },
  methods: {
    reload: function () {
      var _this = this
      mui.confirm('是否确认清除数据？', '前台提示', ['确认', '取消'], function (e) {
        if (e.index == 0) {
          _this.cleanAll()
        } else {
        }
      })
    },
    gousercenter: function () {
      this.inputChangeAjaxFlag = false
      app.center(this);
    },
    back: function () {
      localStorage.setItem('wipcodercDetail', '')
      this.inputChangeAjaxFlag = false
      app.back(this);
    },
    cancel: function () {

    },
    ok: function () {
      this.ajaxSave()
    },
    chkToBox() {
      var _this = this
      _this.toBoxId = _this.toBoxId.toLowerCase().trim()
      if (_this.toBoxId == '') {
        return;
      }
      _this.ajaxChkToBox()
    },
    canclealert() {
      let _this = this
      _this.showDomainsDiv = false
      _this.toboxListSave[_this.alRemarknum].tmpwipcodeissave_remark = _this.tmpwipcodeissave_remark
      _this.tmpwipcodeissave_remark = ''
      console.log(_this.toboxListSave)
    },
    alRemark(num) {
      let _this = this
      console.log(_this.toboxListSave.length - 1 - num)
      _this.alRemarknum = _this.toboxListSave.length - 1 - num
      _this.showDomainsDiv = true
      _this.tmpwipcodeissave_remark = _this.toboxListSave[_this.alRemarknum].tmpwipcodeissave_remark
    },
    chkFromBox() {
      var _this = this
      _this.fromBox = _this.fromBox.toLowerCase().trim()
      if (_this.fromBoxList.indexOf(_this.fromBox) != -1) {
        mui.alert('该条码已扫描', '前台提示', function () {
          _this.fromBox = ''
          _this.$refs.fromBox.focus()
        })
        return
      }
      if (_this.fromBox == '') {
        return;
      }
      _this.ajaxChkFromBox()
    },


    ajaxSave() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwwipcodeissave',
        tmpwipcodeissave_det: _this.toboxListSave,
        effdate: _this.effectiveDate
      },
        'xwwipcodeissave',
        _this,
        function (e) {
          console.log(e)
          mui.toast('保存成功')
          _this.cleanAll()

          // _this.stampList = e.xwbrbox02savedtout

        },
        function () {
          // mui.alert('扫描成功')
          var outLine = {}
          outLine.b_state = 0;
          outLine.barcode = _this.barcode
          outLine.boxindex = _this.boxindex++
          _this.res.unshift(outLine);
          _this.barcode = ''
        },
        function () {
          _this.toBoxId = ''
          _this.$refs.toBoxId.focus();
        })
    },
    cleanAll() {
      let _this = this
      localStorage.setItem('wipcodercDetail', '')
      _this.showDomainsDiv = false//修改备注
      _this.alRemarknum = 0
      _this.tmpwipcodeissave_remark = ''
      _this.remark = ''//备注
      _this.toBoxId = ''
      _this.v_site = ''
      _this.v_loc = ''
      _this.toBoxId = ''
      _this.quantityOfBox = 0
      _this.fromBoxId = ''
      _this.targetSite = ''
      _this.location = ''
      _this.fromBox = ''
      _this.fromBoxList = []
      _this.grid = ''
      _this.compontentId = ''
      _this.pickItemBatch = ''
      _this.referenceId = ''
      _this.batchProperty1 = ''
      _this.batchProperty2 = ''
      _this.quantity = 0
      _this.supplierCode = ''
      _this.moulds = []//moban
      _this.supplierLot = ''
      _this.mask = false
      _this.header = "外协入库"
      _this.tochk = false
      _this.Stamp = "打印"
      _this.inputChangeAjaxFlag = true
      _this.inputDisabledFlag = false
      _this.inputFromBox = false
      _this.toBox = ''
      _this.stampList = []//打印表存储
      _this.txlblget_code = ''
      _this.toBoxGD = []
      _this.toBoxG = [{
        detail: [{
          name: '地点',
          content: ''
        }, {
          name: '库位',
          content: ''
        }]
      }, {
        detail: [{
          name: '货格',
          content: ''
        }]
      }],
        _this.mres = [{
          detail: [{
            name: '零件',
            content: ''
          }]
        }]
      _this.res = [
        {
          detail: [
            {
              name: "零件",
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
              name: "地点",
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
              name: "供应商",
              content: ""
            }, {
              name: "供批次",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "托盘",
              content: ""
            },
            {
              name: "箱数",
              content: ""
            }
          ]
        },
        {
          detail: [
            {
              name: "条码类型",
              content: ""
            },
            {
              name: "状态",
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
        }
      ]
      _this.toboxList = [{        xwbrbox02check02dtin_code: '',
        xwbrbox02check02dtin_part: '',
        xwbrbox02check02dtin_site: '',
        xwbrbox02check02dtin_loc: '',
        xwbrbox02check02dtin_grid: '',
        xwbrbox02check02dtin_lot: '',
        xwbrbox02check02dtin_ref: '',
        xwbrbox02check02dtin_vend: '',
        xwbrbox02check02dtin_vend_lot: '',
        xwbrbox02check02dtin_qty: ''
      }]
      _this.toboxListSave = [
      ]
      _this.detailres = []//显示下方框框
      _this.$nextTick(() => {
        _this.$refs.toBoxId.focus()
      });
    },

    ajaxChkToBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwwipcodeisget',
        v_grid: _this.toBoxId
      },
        'xwwipcodeisget',
        _this,
        function (e) {
          console.log(e)
          _this.toBoxG = [
            {
              detail: [{
                name: '地点',
                content: e.v_site
              }, {
                name: '库位',
                content: e.v_loc
              }]
            }, {
              detail: [{
                name: '货格',
                content: _this.toBoxId
              }]
            }]
          _this.v_site = e.v_site
          _this.v_loc = e.v_loc
          _this.toGrid = _this.toBoxId
          _this.toBox = e.target_box
          _this.toBoxId = ''
          _this.tochk = true
          _this.inputDisabledFlag = true
          _this.$nextTick(() => {
            _this.$refs.fromBox.focus();
          });

        },
        function () {
          // mui.alert('扫描成功')
          var outLine = {}
          outLine.b_state = 0;
          outLine.barcode = _this.barcode
          outLine.boxindex = _this.boxindex++
          _this.res.unshift(outLine);
          _this.barcode = ''
        },
        function () {
          _this.toBoxId = ''
          _this.$refs.toBoxId.focus();
        })
    },
    barcodeInputChange() {
      let _this = this;
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrboxiqget",
          v_serial: _this.fromBox
        },
        "xwbrboxiqget",
        _this,
        function (e) {
          console.log(e);
          _this.mres = [
            {
              detail: [
                {
                  name: "零件",
                  content: e.v_part
                }
              ]
            },
          ]
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
                  name: "供应商",
                  content: e.v_vend
                }, {
                  name: "供批次",
                  content: e.v_vend_lot
                }
              ]
            },
            {
              detail: [
                {
                  name: "托盘",
                  content: e.v_pallet
                },
                {
                  name: "箱数",
                  content: e.v_count
                }
              ]
            },
            {
              detail: [
                {
                  name: "条码类型",
                  content: e.v_tmp_type
                },
                {
                  name: "状态",
                  content: e.v_status
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
            }
          ];
          _this.fromBoxList.push(_this.fromBox);
          for (let i = 0; i < _this.toboxListSave.length; i++) {
            const element = _this.toboxListSave[i];
            if (_this.toboxListSave[i].tmpwipcodeissave_code == _this.fromBox) {
              _this.toboxListSave[i].tmpwipcodeissave_ref = e.v_ref
            }
          }
          _this.fromBox = ''
          _this.$refs.fromBox.focus();
        },
        function () {
          mui.alert("离线功能暂未集成");
        },
        function () {
          _this.barcode = "";
          _this.$refs.barcode.focus();
        }
      );
    },
    ajaxChkFromBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwwipcodeischeck',
        v_tmp_code: _this.fromBox,
      },
        'xwwipcodeischeck',
        _this,
        function (e) {
          console.log(e)
          mui.toast('校验成功')
          _this.detailres.unshift({
            BoxId: _this.fromBox,
            v_part: e.v_part,
            v_lot: e.v_lot,
            v_qty: e.v_qty,
            v_site: e.v_site,
            v_loc: e.v_loc,
            v_grid: e.v_grid,
            ifDone: false
          })
          _this.toboxListSave.push({
            tmpwipcodeissave_code: _this.fromBox,
            tmpwipcodeissave_site_to: _this.v_site,
            tmpwipcodeissave_grid_to: _this.toGrid,
            tmpwipcodeissave_part: e.v_part,
            tmpwipcodeissave_lot: e.v_lot,
            tmpwipcodeissave_site: e.v_site,
            tmpwipcodeissave_loc: e.v_loc,
            tmpwipcodeissave_grid: e.v_grid,
            tmpwipcodeissave_ref: '',
            tmpwipcodeissave_qty: e.v_qty,
            tmpwipcodeissave_remark: '',
            ifshowremark: false
          })
          console.log(_this.toboxListSave)
          _this.barcodeInputChange()
        },
        function () {
          // mui.alert('扫描成功')
          var outLine = {}
          outLine.b_state = 0;
          outLine.barcode = _this.barcode
          outLine.boxindex = _this.boxindex++
          _this.res.unshift(outLine);
          _this.barcode = ''
        },
        function () {
          _this.fromBox = ''
          _this.$refs.fromBox.focus();
        })
    }
  },
  activated: function () {
    console.log('aa')
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
  background-color: #f4f5f9;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
.showAll {
  /* position: absolute; */
  /* width: 94%; */
  left: 0px;
  /* top: 440px; */
  height: 200px;
  margin: 1%;
  border: 1px solid #e2e2e2;
  overflow: auto;
  border-radius: 1px;
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
.colorCircle {
  color: red;
}
.colorCircleG {
  color: black;
}
.popover-bg {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(101, 112, 107, 0.2);
}

.popover-bg .popover-inner {
  width: 70%;
  position: absolute;
  left: 15%;
  top: 15%;
  bottom: 30%;
  z-index: 101;
  background-color: #ffffff;
  border-radius: 5%;
  opacity: 1;
}

.popover-bg .title {
  width: 100%;
  border-bottom: 2px solid #343434;
  text-align: center;
  padding-top: 5%;
  padding-bottom: 5%;
}

.popover-bg .btn-bg {
  width: 100%;
  padding-top: 5%;
  text-align: center;
}

.popover-bg .btn-bg button {
  width: 70%;
  height: 40px;
  margin: 0 6%;
}

.mui-checkbox input[type='checkbox']:checked:before,
.mui-radio input[type='radio']:checked:before {
  color: #343434;
}
.popover-inner .mui-input-group .mui-input-row:after {
  left: 0;
}
.colorFontG {
  margin: 10px;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  color: green;
}
.fontSize {
  width: 30%;
}
.fontIndexSize {
  width: 10%;
  color: black;
}
.colorListFont {
  margin-left: 10px;
  height: 30px;
  font-size: 13px;
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

