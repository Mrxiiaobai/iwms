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
              <label>生效日期:</label>
              <input
                class="mui-version"
                type="date"
                v-model="effectiveDate"
                :disabled="inputDisableCycle1"
                :class="inputDisableCycle1==true?'disabledTrue':''"
              >
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>发货日期:</label>
              <input
                class="mui-version"
                type="date"
                v-model="shipdate"
                :disabled="inputDisableCycle1"
                :class="inputDisableCycle1==true?'disabledTrue':''"
              >
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>ASN
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="v_asn"
                placeholder="请输入"
                :disabled="inputDisableCycle1"
                :class="inputDisableCycle1==true?'disabledTrue':''"
                ref="asnID"
                @blur="chkToAsn"
                @focus="stopEject"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
          </div>
          <EsunShowDetail v-bind:res="res2" v-bind:mres="mres2"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>唯一码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                :disabled="inputDisableCycle2"
                :class="inputDisableCycle2==true?'disabledTrue':''"
                placeholder="请输入"
                ref="Box"
                @change="chkType"
                @focus="stopEject"
              >

              <span class="mui-icon mui-icon-clear"></span>
            </div>
          </div>
          <EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>客户明示卡
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="cust_part_show"
                :disabled="inputDisableCycle3"
                :class="inputDisableCycle3==true?'disabledTrue':''"
                placeholder="请输入"
                ref="v_cpschkyn"
                @blur="chkUpdate"
                @focus="stopEject"
              >

              <!-- <input type="text" class="mui-input-clear" v-model="barcode" :disabled="inputDisableCycle3" :class="inputDisableCycle3==true?'disabledTrue':''"
              @change="chkType">-->
              <span class="mui-icon mui-icon-clear"></span>
            </div>
          </div>
          <EsunShowDetail v-bind:res="res2" v-bind:mres="mres3"></EsunShowDetail>
          <div align="center" style="margin:0 auto;width:98%;overflow:scroll;" class="detail">
						<span style="margin-left: 12px;display:block;width: 319px;height: 1px !important;background: #DDDDE5;color: #DDDDE5;position: absolute;top:31.2px;"></span>
            <table border class="qgg-table">
              <thead>
                <tr>
                  <th v-for="(item, index) in th" :key="index" style="color:#3B58D4;font-size: 11px;width:50%;border:none">{{item}}</th>
                </tr>
              </thead>
              <tbody is="transition-group" name="demo">
                <!-- <transition-group> -->
                <tr v-for="(item, index) in trRes" :key="index" @tap="go(index)">
                  <td>{{item.tmpxwin_serial}}</td>
                  <td>{{item.tmpxwin_qty}}</td>
                </tr>

                <!-- </transition-group> -->
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
  name: "salesIssue",
  data: function () {
    return {
      status: false,
      userId: "",
      th: ["零件号", "数量"],
      trRes: [],
      domain: '',
      //生效日期
      effectiveDate: '',
      // 发货日期
      shipdate: '',
      //ASNid 721654
      v_asn: '',
      //条码 SATG1907100000001
      barcode: '',
      // 传值条码
      v_shipto: '',
      tp: false,
      //数量
      v_tempqty: '',
      //已扫描箱数
      v_count: 0,
      // workProcedure: '',
      v_ii: '',
      v_iicount: '',
      v_part: '',
      v_cpschkyn: '',
      temp1: [],
      // temp_cust空表
      temp2: [],
      temp3: [],
      temp31: [],
      // 传值表
      temp4: [],
      temp5: [],
      mask: false,
      header: "销售发货",
      inputChangeAjaxFlag: true,
      // inputDisabledFlag: false,
      inputDisableCycle1: false,
      inputDisableCycle2: true,
      inputDisableCycle3: true,
      v_ptdesc1: '',
      v_ptdesc2: '',
      cust_part_show: '',
      out_part: '',
      mres2: [{
        detail: [{
          name: '已扫描',
          content: '',
          // isshow: false
        }]
      },

      ],
      mres3: [{
        detail: [{
          name: '客户零件',
          content: '',
          // isshow: false
        }]
      },],
      mres: [{
        detail: [{
          name: '零件',
          content: '',
        }]
      },
      {
        detail: [{
          name: '数量',
          content: '',
        }]
      },
      ],
      res: [{
        detail: [{
          name: '描述1',
          content: '',
          // isshow: false
        }]
      },
      {
        detail: [{
          name: '描述2',
          content: '',
          // isshow: false
        }]
      },
      {
        detail: [{
          name: '批次',
          content: '',
          // isshow: false
        }]
      },
      {
        detail: [{
          name: '地点',
          content: '',
          // isshow: false
        },
        {
          name: '库位',
          content: '',
          // isshow: false
        }
        ]
      },

      {
        detail: [{
          name: '货格',
          content: '',
          // isshow: false
        },

        {
          name: '参考号',
          content: '',
          // isshow: false
        }
        ]
      },

      {
        detail: [{
          name: '批属1',
          content: '',
          // isshow: false
        },

        {
          name: '批属2',
          content: '',
          // isshow: false
        }
        ]
      },



      {
        detail: [{
          name: '供批次',
          content: '',
          // isshow: false
        },
        {
          name: '制造日期',
          content: '',
          // isshow: false
        }
        ]
      },
      {
        detail: [{
          name: '生效日期',
          content: '',
          // isshow: false
        },
        {
          name: '失效日期',
          content: '',
          // isshow: false
        }
        ]
      },
      ],
      res2: [],

    };
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.effectiveDate = app.getDate()
    this.shipdate = app.getDate()
  },
  mounted() {
	  app.addBack(this.back);
    this.$refs.asnID.focus();
    this.stopEject();
  },
	destroyed(){
		app.removeBack(this.back);
	},
  methods: {
    reload: function () {
      let _this = this;
      mui.confirm('是否确认清除数据', '前台提示', ['取消', '确认'], function (e) {
        if (e.index == 1) {
          _this.reset();
        } else {
          return;
        }
      }, 'div')
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
    go: function (index) {
      this.$router.push({
        path: '/salesList',
        query: {
          v_asn: this.v_asn,
          v_shipto: this.v_shipto,
          cust_part_show: this.trRes[index].tmpxwin_serial,
          temp1: this.temp1,
          temp2: this.temp2,
          temp4: this.temp4,
          temp5: this.temp5,
          timesindex: 4
        }
      })
    },
    // 点击确认
    ok: function () {
      this.ajaxSaveId();
    },
    ajaxCheckAsn: function () {
      let _this = this;
      _this.v_asn = _this.v_asn.toLowerCase().trim();
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrship02asnchk',
        effdate: _this.effectiveDate,
        shipdate: _this.shipdate,
        v_asn: _this.v_asn
      },
        'xwbrship02asnchk',
        _this,
        function (e) {
          for (var i = 0; i < e.input_xwbrship02srchkin.length; i++) {
            _this.temp1.push(e.input_xwbrship02srchkin[i]);
          }
          _this.v_shipto = e.v_shipto;
          _this.inputDisableCycle1 = true;
          _this.inputDisableCycle2 = false;
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
          })
        },
        function (e) {
          // 离线操作
        },
        function (e) {
          _this.v_asn = "";
          _this.inputDisableCycle2 = true;
          _this.$nextTick(() => {
            _this.$refs.asnID.focus();
          })
        }
      )
    },
    // 条码校验
    ajaxCheckCode: function () {
      let _this = this;
      if (_this.tp) {
        _this.temp1 = _this.temp5;
      }
      console.log(_this.temp1);
			
			if (_this.temp31.indexOf(_this.barcode, 0) !== -1) {
			  mui.alert('已存在唯一码');
			  _this.$nextTick(() => {
			    _this.barcode = "";
			    _this.$refs.Box.focus();
			  })
				return;
			};
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrship02srchk',
        v_shipto: _this.v_shipto,
        //加工单id
        temp1: _this.temp1,
        temp2: _this.temp2,
        //条码
        v_serial: _this.barcode,
      },
        'xwbrship02srchk',
        _this,
        function (e) {
					_this.temp31.push(_this.barcode);
          _this.inputDisableCycle2 = true;
          _this.mres[0].detail[0].content = e.v_part;
          _this.mres[1].detail[0].content = e.v_qty;
          _this.v_part = e.v_part;
          _this.v_count = _this.v_count + 1;
          _this.v_tempqty = e.v_qty;
          _this.v_ii = e.v_ii;
          _this.v_iicount = e.v_ii;
          _this.v_ptdesc1 = e.v_ptdesc1;
          _this.v_ptdesc2 = e.v_ptdesc2;
          _this.v_cpschkyn = e.v_cpschkyn;
          _this.out_part = e.v_part;
          _this.status = true;
          _this.res = [{
            detail: [{
              name: '描述1',
              content: e.v_ptdesc1,
              // isshow: false
            }]
          },
          {
            detail: [{
              name: '描述2',
              content: e.v_ptdesc2,
              // isshow: false
            }]
          },
          {
            detail: [{
              name: '批次',
              content: e.v_lot,
              // isshow: false
            }]
          },
          {
            detail: [{
              name: '地点',
              content: e.v_ptsite,
              // isshow: false
            },
            {
              name: '库位',
              content: e.v_ptloc,
              // isshow: false
            }
            ]
          },

          {
            detail: [{
              name: '货格',
              content: e.v_ptgrid,
              // isshow: false
            },

            {
              name: '参考号',
              content: e.v_ref,
              // isshow: false
            }
            ]
          },

          {
            detail: [{
              name: '批属1',
              content: e.v_lot_att1,
              // isshow: false
            },

            {
              name: '批属2',
              content: e.v_lot_att2,
              // isshow: false
            }
            ]
          },
          {
            detail: [{
              name: '供批次',
              content: e.v_vend_lot,
              // isshow: false
            },
            {
              name: '制造日期',
              content: app.getProgressDate(e.v_date_mfc),
              // isshow: false
            }
            ]
          },
          {
            detail: [{
              name: '生效日期',
              content: app.getProgressDate(e.v_effdate),
              // isshow: false
            },
            {
              name: '失效日期',
              content: app.getProgressDate(e.v_date_disa),
              // isshow: false
            }
            ]
          },
          ];
          if (e.v_cpschkyn) {
            _this.inputDisableCycle3 = false;
            _this.$nextTick(() => {
              _this.$refs.v_cpschkyn.focus();
            })
          } else {
            if (_this.temp4.length <= 0) {
              _this.temp4.push({
                cust_part_show: e.v_part,
                v_ptdesc1: _this.v_ptdesc1,
                v_ptdesc2: _this.v_ptdesc2
              });
            }
            if (_this.temp4.findIndex(function (ele, index) {
              return ele.cust_part_show == e.v_part
            }) != -1) {

            } else {
              _this.temp4.push({
                cust_part_show: e.v_part,
                v_ptdesc1: _this.v_ptdesc1,
                v_ptdesc2: _this.v_ptdesc2
              });
            };
            _this.autoUpdate();
            _this.inputDisableCycle2 = false;
            _this.barcode = "";
            _this.$nextTick(() => {
              _this.$refs.Box.focus();
            })
          }
        },
        function (e) {
          // 离线操作
        },
        function (e) {
          _this.barcode = "";
          _this.inputDisableCycle2 = false;
          _this.$nextTick(() => {
            _this.$refs.Box.focus();
          })
        });
    },
    // 明示卡校验
    ajaxUpdateDetail: function () {
      let _this = this;
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrship02cpschk',
        //传出
        v_shipto: _this.v_shipto,
        //得到的表
        temp1: _this.temp1,
        //条码
        v_serial: _this.barcode,
        //客户明示卡
        cust_part_show: _this.cust_part_show,
        //空表
        temp2: _this.temp3,
        v_ii: _this.v_ii
      },
        'xwbrship02cpschk',
        _this,
        function (e) {
          // temp4存储点击后的显示的数据
          if (_this.temp4.length <= 0) {
            _this.temp4.push({
              cust_part_show: e.output_xwbrship02cpschkout[0].output_xwbrship02cpschkout_part,
              v_ptdesc1: _this.v_ptdesc1,
              v_ptdesc2: _this.v_ptdesc2
            });
          }

          if (_this.temp4.findIndex(function (ele, index) {
            return ele.cust_part_show == e.output_xwbrship02cpschkout[0].output_xwbrship02cpschkout_part
          }) != -1) {

          } else {
            _this.temp4.push({
              cust_part_show: e.output_xwbrship02cpschkout[0].output_xwbrship02cpschkout_part,
              v_ptdesc1: _this.v_ptdesc1,
              v_ptdesc2: _this.v_ptdesc2
            });
          }
          _this.temp3.push(e.output_xwbrship02cpschkout[e.output_xwbrship02cpschkout.length - 1]);
          _this.mres3[0].detail[0].content = e.output_xwbrship02cpschkout[0].output_xwbrship02cpschkout_cust_part;
          if (_this.v_iicount > 1) {
            mui.toast("需再次校验");
            _this.v_iicount--;
            _this.inputDisableCycle3 = false;
            return;
          }
          _this.inputDisableCycle3 = true;
          _this.status = true;
          _this.autoUpdate();
        },
        function (e) {
          // 离线操作
        },
        function (e) {
          _this.inputDisableCycle3 = false;
          _this.cust_part_show = "";
          _this.$nextTick(() => {
            _this.$refs.v_cpschkyn.focus();
          })
        }
      )


    },
    // aboxsave校验
    ajaxboxSave: function () {
      let _this = this;
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrship02aboxsave',
        v_shipto: _this.v_shipto,
        temp1: _this.temp1,
        v_serial: _this.barcode,
        temp2: _this.temp2,
        cust_part_show: _this.cust_part_show
      },
        'xwbrship02aboxsave',
        _this,
        function (e) {
          _this.tp = true;
          _this.temp5 = [];
          for (var i = 0; i < e.input_xwbrship02srchkin.length; i++) {
            _this.temp5.push(e.input_xwbrship02srchkin[i]);
          }
          console.log(_this.temp5);
          _this.temp2.push(e.output_xwbrship02aboxsaveout[e.output_xwbrship02aboxsaveout.length - 1]);
        },
        function (e) {
          // 离线操作
        },
        function (e) {

        });
    },
    // 保存
    ajaxSaveId: function () {
      let _this = this;
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrship02save',
        v_asn: _this.v_asn,
        v_shipto: _this.v_shipto,
        temp1: _this.temp5,
        temp2: _this.temp2,
      },
        'xwbrship02save',
        _this,
        function (e) {
          mui.alert('发货成功');
          _this.reset();
        },
        function (e) { },
        function (e) {

        }
      )
    },
    //asn校验
    chkToAsn: function () {
      var _this = this;
      if (_this.v_asn == '') {
        return;
      }
      _this.ajaxCheckAsn();
    },
    //条码校验
    chkType: function () {
      var _this = this;
      if (_this.barcode == '') {
        return;
      }
      _this.barcode = _this.barcode.toLowerCase().trim();
      _this.ajaxCheckCode();
    },
    //更新零件
    chkUpdate: function () {
      let _this = this;
      if (_this.cust_part_show == '') {
        return;
      }
      _this.ajaxUpdateDetail();
    },
    // 自动更新显示
    autoUpdate: function () {
      let _this = this;
      let status = _this.status;
      if (!status) {
        return;
      }
      _this.status = false;
      _this.ajaxboxSave();
      _this.inputDisableCycle2 = false;
      _this.mres2[0].detail[0].content = _this.v_count;
      if (_this.cust_part_show) {
        if (_this.trRes.length <= 0) {
          _this.trRes.push({
            tmpxwin_serial: _this.out_part,
            tmpxwin_qty: _this.v_tempqty,
          });
          return;
        }
        if (_this.trRes.findIndex(function (ele, index) {
          return ele.tmpxwin_serial == _this.out_part;
        }) != -1) {
          _this.trRes[_this.trRes.findIndex(function (ele, index) {
            return ele.tmpxwin_serial == _this.out_part;
          })].tmpxwin_qty += _this.v_tempqty
        } else {
          _this.trRes.push({
            tmpxwin_serial: _this.out_part,
            tmpxwin_qty: _this.v_tempqty,
          });
        }
      } else {
        if (_this.trRes.length <= 0) {
          _this.trRes.push({
            tmpxwin_serial: _this.v_part,
            tmpxwin_qty: _this.v_tempqty,
          });
          return;
        }
        if (_this.trRes.findIndex(function (ele, index) {
          return ele.tmpxwin_serial == _this.out_part;
        }) != -1) {
          _this.trRes[_this.trRes.findIndex(function (ele, index) {
            return ele.tmpxwin_serial == _this.out_part;
          })].tmpxwin_qty += _this.v_tempqty
        } else {
          _this.trRes.push({
            tmpxwin_serial: _this.out_part,
            tmpxwin_qty: _this.v_tempqty,
          });
        }

      }
      _this.cust_part_show = "";
      _this.$nextTick(function () {
        _this.barcode = "";
        _this.$refs.Box.focus();
      })
    },
    reset: function () {
      let _this = this;
      _this.status = false;
      _this.v_count = 0;
      _this.cust_part_show = '';
      _this.v_ii = "";
      _this.v_asn = '';
      _this.barcode = '';
      _this.v_tempqty = '';
      _this.trRes = [];
      _this.temp1 = [],
        _this.v_iicount = '';
      _this.temp2 = [],
        _this.temp3 = [],
        _this.temp31 = [],
        _this.temp4 = [],
        _this.temp5 = [],
        _this.v_ptdesc1 = '';
      _this.v_ptdesc2 = '';
      _this.v_part = "";
      _this.out_part = "";
      _this.tp = false;
      // _this.inputDisabledFlag = false;
      _this.inputDisableCycle1 = false;
      _this.inputDisableCycle2 = true;
      _this.inputDisableCycle3 = true;
      _this.mres2[0].detail[0].content = "";
      _this.mres3[0].detail[0].content = "";
      _this.mres[0].detail[0].content = "";
      _this.mres[1].detail[0].content = "";
      _this.res[0].detail[0].content = "";
      _this.res[1].detail[0].content = "";
      _this.res[2].detail[0].content = "";
      _this.res[3].detail[0].content = "";
      _this.res[4].detail[0].content = "";
      _this.res[5].detail[0].content = "";
      _this.res[6].detail[0].content = "";
      _this.res[7].detail[0].content = "";
      _this.res[3].detail[1].content = "";
      _this.res[4].detail[1].content = "";
      _this.res[5].detail[1].content = "";
      _this.res[6].detail[1].content = "";
      _this.res[7].detail[1].content = "";
      _this.$nextTick(function () {
        _this.$refs.asnID.focus();
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

.disabledTrue {
  background: #eeeeee;
}

.mui-input-row .mui-input-clear ~ .mui-icon-clear {
  top: 0.2rem !important;
  color: lightblue !important;
  font-size: 35px;
}

.mui-input-group .mui-input-row {
  line-height: 36px;
}

.inforLabel {
  background-color: #f2f2f2;
}

.mui-input-group .mui-input-row:after {
  bottom: auto;
}

.detail .mui-input-row {
  font-size: 15px;
  height: auto;
  padding: 0 0 0 0;
  background-color: #f2f2f2;
}

.detail .mui-input-row label {
  padding: 6px 6px;
}
.qgg-table td{
	border:none;
}
.twowidth {
  width: 22%;
}

.threewidth {
  width: 28%;
}

.morewidth {
  width: 78%;
}
.detail{
	position: relative;
}
.detail .mui-input-group {
  border-radius: 8px;
  overflow: hidden;
}

.detail .mui-input-row label {
  padding: 6px 0px 6px 2px;
  word-break: break-all;
}

.detail .mui-input-group .mui-input-row:after {
  left: 0px;
}

.detail .darkGrey {
  background-color: #f9f9f9;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s;
}

.list-enter,
	.list-leave-to

	/* .list-leave-active for below version 2.1.8 */
		 {
  opacity: 0;
}

.demo-enter,
.demo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.demo-enter-active,
.demo-leave-active {
  transition: all 0.5s ease;
}

.demo-move {
  transition: all 0.5s ease;
}
</style>
