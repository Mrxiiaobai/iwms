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
          <div class="mui-input-group" v-show="tochk">
            <!-- 保留逻辑 勿删 -->
            <!-- <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <span>是否拆多箱：{{MoreBox}}</span>
                <div class="mui-switch" @click="selectMoreBox()" :class="ifMoreBox?'mui-active':''">
                  <div class="mui-switch-handle"></div>
                </div>
              </li>
            </ul>-->
            <!-- <div class="mui-input-row" v-show="!ifMoreBox">
              <label>至箱号:</label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toBoxId"
                :disabled="inputDisabledFlag"
                placeholder="请输入至箱号"
                ref="toBoxId"
                @blur="chkToBox()"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>-->
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>唯一码:
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="fromBox"
                :disabled="inputFromBox"
                :class="inputFromBox==true?'disabledTrue':''"
                placeholder="请扫描唯一码"
                @blur="chkFromBox()"
                ref="fromBox"
              >
            </div>
          </div>
        </div>
        <div class="showAll" v-show="tochk">
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
                v-bind:key="iteam.input_xwbrbox02saveinmstr_box"
                style="border-bottom: 1px solid #cccccc;"
              >
                <!-- <div class="freeListRoom"></div>
                <div class="fontIndexSize">
                  <div class="colorListFont">{{iteam.input_xwbrbox02saveinmstr_box}}</div>
                </div>-->
                <div style="width:100%;color: black;">
                  <label style="width:8%!important;font-weight:600">{{detailres.length-index}}</label>
                  <label style="width:67%!important;">{{iteam.input_xwbrbox02saveinmstr_box}}</label>
                  <label style="width:25%;padding-left:11px">{{iteam.xwbrbox02check02dtin_qty}}</label>
                </div>
              </div>
            </transition-group>
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
  name: "wipcoderc",
  data: function () {
    return {
      userId: '',
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
      ifStamp: true,
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
          name: '箱号',
          content: ''
        }]
      }, {
        detail: [{
          name: '零件',
          content: ''
        }]
      }],
      res: [

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
      detailres: []
    }
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.domain = localStorage.getItem('domain')
    this.input_Session_ID = JSON.parse(localStorage.getItem('userMsg')).sessionid
    this.effectiveDate = app.getDate()
    this.$nextTick(() => {
      this.$refs.toBoxId.focus()
    });
  },
  mounted() {
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
    selectifStamp() {
      var _this = this;
      if (_this.ifStamp == false) {
        _this.Stamp = '打印'
        _this.ifStamp = true
      } else {
        _this.Stamp = '不打印'
        _this.ifStamp = false
      }
    },

    ajaxSave() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrbox02save',
        target_box: _this.toBox,
        source_box: 'a',
        input_xwbrbox02savein: _this.toboxListSave,
        input_xwbrbox02saveinmstr: _this.detailres
      },
        'xwbrbox02save',
        _this,
        function (e) {
          console.log(e)
          mui.toast('保存成功')
          _this.stampList = e.xwbrbox02savedtout

          _this.ajaxprint()
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
      var _this = this
      _this.inputDisabledFlag = false
      _this.mres = [
        {
          detail: [
            {
              name: '箱号',
              content: ''
            }]
        }, {
          detail: [{
            name: '零件',
            content: ''
          }]
        }]
      _this.res = [
        {
          detail: [{
            name: '描述1',
            content: '',
            // isshow: false
          }]
        }, {
          detail: [{
            name: '描述2',
            content: ''
          }]
        },
        {
          detail: [{
            name: '地点',
            content: ''
          }, {
            name: '数量',
            content: ''
          }]
        }, {
          detail: [{
            name: '库位',
            content: ''
          }, {
            name: '批次',
            content: ''
          }]
        }, {
          detail: [{
            name: '货格',
            content: ''
          }, {
            name: '参考',
            content: ''
          }]
        },
        {
          detail: [{
            name: '批属1',
            content: ''
          }, {
            name: '批属2',
            content: ''
          }]
        },
        {
          detail: [{
            name: '供批次',
            content: ''
          }, {
            name: '制造日期',
            content: ''
          }]
        }, {
          detail: [{
            name: '生效日期',
            content: ''
          }, {
            name: '失效日期',
            content: ''
          }]
        }, {
          detail: [{
            name: '小包装号',
            content: ''
          }, {
            name: '出库日期',
            content: ''
          }]
        },
      ]
      _this.fromBoxList = []
      _this.tochk = false
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
      ]
      _this.stampList = []
      _this.detailres = []
      _this.barcode = ''
      _this.$refs.toBoxId.focus();
    },
    ajaxprint() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrboxprint',
        v_print: _this.ifStamp,
        v_model: _this.txlblget_code,
        xwgettwobarcodein_mstrin: _this.stampList,
      },
        'xwbrboxprint',
        _this,
        function (e) {
          console.log(e)
          if (_this.ifStamp) {
            mui.toast('打印成功')
          }
          _this.cleanAll()
        },
        function () {
          // mui.alert('扫描成功')
          var outLine = {}
          outLine.b_state = 0;
          outLine.barcode = _this.barcode
          outLine.boxindex = _this.boxindex++
          _this.res.unshift(outLine);

        },
        function () {
          _this.fromBoxId = ''
          _this.cleanAll()
        })
    },
    ajaxChkToBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwwipcodercget',
        v_grid: _this.toBoxId
      },
        'xwwipcodercget',
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
    ajaxChkFromBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrbox02sboxchk',
        target_box: _this.toBox,
        source_box: _this.fromBox,
        input_xwbrbox02check02dtin: _this.toboxList
      },
        'xwbrbox02sboxchk',
        _this,
        function (e) {
          console.log(e)
          mui.toast('校验成功')
          var tbox = {
            'input_xwbrbox02saveinmstr_box': e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_code,
            'xwbrbox02check02dtin_qty': e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_qty
          }
          _this.detailres.unshift(tbox)
          var toboxListSavedetail = {
            input_xwbrbox02savein_code: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_code,
            input_xwbrbox02savein_part: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_part,
            input_xwbrbox02savein_site: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_site,
            input_xwbrbox02savein_loc: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_loc,
            input_xwbrbox02savein_grid: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_grid,
            input_xwbrbox02savein_lot: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_lot,
            input_xwbrbox02savein_ref: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_ref,
            input_xwbrbox02savein_vend: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_vend,
            input_xwbrbox02savein_vend_lot: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_vend_lot,
            input_xwbrbox02savein_qty: e.xwbrbox02check02dtin[0].xwbrbox02check02dtin_qty,
          }
          _this.toboxListSave.push(toboxListSavedetail)
          console.log(_this.detailres)
          _this.fromBoxList.push(_this.fromBox)
          _this.fromBox = ''
          _this.$refs.fromBox.focus()
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
    this.inputChangeAjaxFlag = true
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
  background-color: #e7f1f3;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
.showAll {
  /* position: absolute; */
  width: 94%;
  left: 0px;
  /* top: 440px; */
  height: 200px;
  margin: 3%;
  border: 1px solid #e2e2e2;
  overflow: auto;
  border-radius: 7px;
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

