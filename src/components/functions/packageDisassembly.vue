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
              <label>自箱号:</label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="fromBoxId"
                :disabled="inputDisabledFlag"
                placeholder="请输入"
                ref="fromBoxId"
                @blur="chkFromBox()"
                :class="inputDisabledFlag==true?'disabledTrue':''"
              >
              <!-- <span class="mui-icon mui-icon-clear"></span> -->
            </div>
          </div>
          <EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
          <div class="mui-input-group">
            <!-- <div class="mui-input-group" v-show="tochk"> -->
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
              <label>拆分箱数:</label>
              <input
                type="number"
                class="mui-input-clear"
                v-model="boxmun"
                placeholder="请输入拆分箱数"
                ref="boxmun"
              >
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>每箱数量:</label>
              <input
                type="number"
                class="mui-input-clear"
                v-model="boxQuantity"
                placeholder="请输入每箱数量"
                ref="boxQuantity"
              >
            </div>
          </div>
          <div class="mui-input-group">
            <!-- <div class="mui-input-group" v-show="tochk"> -->
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <span>是否打印：{{Stamp}}</span>
                <div class="mui-switch" @click="selectifStamp()" :class="ifStamp?'mui-active':''">
                  <div class="mui-switch-handle"></div>
                </div>
              </li>
            </ul>
            <!-- <div class="mui-input-row" v-show="ifStamp"> -->
            <div class="mui-input-row">
              <label>模板:</label>
              <select
                class="mui-btn mui-btn-block"
                style="width:63%"
                v-for="(item, index) in moulds"
                :key="index"
                v-model="txlblget_code"
              >
                <option :value="item.txlblget_code">{{item.txlblget_code}}</option>
              </select>
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
  name: "packageDisassembly",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      fromBoxId: '',
      targetSite: '',
      grid: '',
      compontentId: '',
      pickItemBatch: '',
      referenceId: '',
      batchProperty1: '',
      batchProperty2: '',
      quantity: 0,
      toBoxId: '',
      newQuanlity: 0,
      labelDemo: '',
      weatherPrint: false,
      mask: false,
      header: "拆包",
      ifMoreBox: false,
      MoreBox: "拆一箱",
      ifStamp: true,
      Stamp: "打印",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
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
      }, {
        detail: [{
          name: '数量',
          content: ''
        }]
      }],
      res: [
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
          }]
        }, {
          detail: [{
            name: '库位',
            content: ''
          }, {
            name: '批/序',
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
      ],
      toBoxId: '',//至箱号
      tochk: false,//是否显示下半部分
      boxmun: '',//拆分数量
      boxQuantity: '',//每箱数量
      moulds: [],//moban
      sourcebox: '',//保存箱号
      stampList: [],//打印表存储
      txlblget_code: ''
    };
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.domain = localStorage.getItem('domain')
    this.input_Session_ID = JSON.parse(localStorage.getItem('userMsg')).sessionid
    this.effectiveDate = app.getDate()
    this.$nextTick(() => {
      this.$refs.fromBoxId.focus();
    });
  },
  methods: {
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
      this.$nextTick(() => {
        _this.$refs.fromBoxId.focus();
      });

    },
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
      var _this = this
      if (_this.tochk == false) {
        mui.alert('请扫描自箱号')
        return;
      }
      if (_this.boxmun == '') {
        mui.alert('请输入拆分箱数')
        return;
      }
      if (_this.boxQuantity == '') {
        mui.alert('请输入每箱数量')
        return;
      }
      _this.ajaxSave()
    },
    switchChange() {
      this.weatherPrint = !this.weatherPrint
    },
    chkFromBox() {
      var _this = this
      if (_this.fromBoxId == '') {
        return;
      }
      _this.ajaxChkFromBox()
    },
    chkToBox() {
      var _this = this
      if (_this.toBoxId == '') {
        return;
      }
      _this.ajaxChkToBox()
    },
    selectMoreBox() {
      var _this = this;
      if (_this.ifMoreBox == false) {
        _this.MoreBox = '拆多箱'
        _this.ifMoreBox = true
      } else {
        _this.MoreBox = '拆一箱'
        _this.ifMoreBox = false
      }
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
        input_ProgramID: 'xwbrbox01save',
        target_box: '',
        source_box: _this.sourcebox,
        v_new_qty: _this.boxQuantity,
        vcount: _this.boxmun,
      },
        'xwbrbox01save',
        _this,
        function (e) {
          console.log(e)
          mui.toast('保存成功')
          _this.stampList = e.xwgettwobarcodein_mstrout
          mui.alert(e.errormessage + '')
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
          _this.fromBoxId = ''
          _this.$refs.fromBoxId.focus();
        })
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

          mui.toast('打印成功')
          _this.cleanAll()
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
          _this.cleanAll()
        })
    },
    ajaxGetBoard() {
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
          _this.moulds = e.output_txlblget_mstr
          for (let i = 0; i < e.output_txlblget_mstr.length; i++) {
            if (e.output_txlblget_mstr[i].txlblget_log == true) {
              _this.txlblget_code = e.output_txlblget_mstr[i].txlblget_code
            }
          }
          _this.$nextTick(() => {
            _this.$refs.boxmun.focus()
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
        })
    },
    ajaxChkToBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrbox01check',
        source_box: _this.fromBoxId
      },
        'xwbrbox01check',
        _this,
        function (e) {
          console.log(e)
          mui.alert('校验成功')
          _this.sourcebox = e.source1_box
          mui.alert(_this.sourcebox)
          _this.mres = [
            {
              detail: [{
                name: '箱号',
                content: e.target1_box
              }]
            }, {
              detail: [{
                name: '零件',
                content: e.prhpart
              }]
            }, {
              detail: [{
                name: '数量',
                content: e.prhqty + ' ' + e.prhum
              }]
            }
          ]
          _this.res =
            [

              {
                detail: [{
                  name: '描述1',
                  content: e.prhdesc1,
                  // isshow: false
                }]
              }, {
                detail: [{
                  name: '描述2',
                  content: e.prhdesc2
                }]
              },
              {
                detail: [{
                  name: '地点',
                  content: e.prhsite
                }]
              }, {
                detail: [{
                  name: '库位',
                  content: e.prhloc
                }, {
                  name: '批次',
                  content: e.prhlot
                }]
              }, {
                detail: [{
                  name: '货格',
                  content: e.prhgrid
                }, {
                  name: '参考',
                  content: e.prhref
                }]
              },
              {
                detail: [{
                  name: '批属1',
                  content: e.v_lot_att1
                }, {
                  name: '批属2',
                  content: e.v_lot_att2
                }]
              },
              {
                detail: [{
                  name: '供批次',
                  content: e.prhvendlot
                }, {
                  name: '制造日期',
                  content: app.getProgressDate(e.v_mdate)
                }]
              }, {
                detail: [{
                  name: '生效日期',
                  content: app.getProgressDate(e.v_date)
                }, {
                  name: '失效日期',
                  content: app.getProgressDate(e.v_ddate)
                }]
              }, {
                detail: [{
                  name: '小包装号',
                  content: e.v_pack
                }, {
                  name: '出库日期',
                  content: app.getProgressDate(e.v_cdate)
                }]
              },
            ]
          _this.fromBoxId = ''
          _this.ajaxGetBoard()
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
        })

    },
    ajaxChkFromBox() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrbox01check',
        source_box: _this.fromBoxId
      },
        'xwbrbox01check',
        _this,
        function (e) {
          console.log(e)
          _this.sourcebox = e.source1_box
          // mui.alert('校验成功')
          _this.mres = [
            {
              detail: [{
                name: '箱号',
                content: e.source1_box
              }]
            }, {
              detail: [{
                name: '零件',
                content: e.prhpart
              }]
            }, {
              detail: [{
                name: '数量',
                content: e.prhqty + ' ' + e.prhum
              }]
            }
          ]
          _this.res =
            [

              {
                detail: [{
                  name: '描述1',
                  content: e.prhdesc1,
                  // isshow: false
                }]
              }, {
                detail: [{
                  name: '描述2',
                  content: e.prhdesc2
                }]
              },
              {
                detail: [{
                  name: '地点',
                  content: e.prhsite
                }]
              }, {
                detail: [{
                  name: '库位',
                  content: e.prhloc
                }, {
                  name: '批次',
                  content: e.prhlot
                }]
              }, {
                detail: [{
                  name: '货格',
                  content: e.prhgrid
                }, {
                  name: '参考',
                  content: e.prhref
                }]
              },
              {
                detail: [{
                  name: '批属1',
                  content: e.v_lot_att1
                }, {
                  name: '批属2',
                  content: e.v_lot_att2
                }]
              },
              {
                detail: [{
                  name: '供批次',
                  content: e.prhvendlot
                }, {
                  name: '制造日期',
                  content: app.getProgressDate(e.v_mdate)
                }]
              }, {
                detail: [{
                  name: '生效日期',
                  content: app.getProgressDate(e.v_date)
                }, {
                  name: '失效日期',
                  content: app.getProgressDate(e.v_ddate)
                }]
              }, {
                detail: [{
                  name: '小包装号',
                  content: e.v_pack
                }, {
                  name: '出库日期',
                  content: app.getProgressDate(e.v_cdate)
                }]
              },
            ]
          _this.fromBoxId = ''
          _this.tochk = true
          _this.inputDisabledFlag = true
          _this.ajaxGetBoard()
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
        })

    }
  },
  mounted() {
    app.addBack(this.back)
  },
  destroyed() {
    app.removeBack(this.back)
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
  background-color: #f2f2f2;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
</style>

