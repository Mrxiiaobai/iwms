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
                <span style="color:red;">*</span>唯一码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                ref="barcode"
                @focus="ClickIn"
                @change="barcodeInputChange"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="res" v-bind:res="[]"></EsunShowDetail>
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
  name: "barcodeInformationInquiry",
  data: function() {
    return {
      userId: "",
      barcode: "",
      mask: false,
      header: "条码信息查询",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
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
            },
            {
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
              name: "库存状态",
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
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
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
      this.inputDisabledFlag = false;
      app.refreshDetail(this.res);
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
    },
    barcodeInputChange() {
      let _this = this;
      _this.barcode = _this.barcode.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrboxiqget",
          v_serial: _this.barcode
        },
        "xwbrboxiqget",
        _this,
        function(e) {
          console.log(e);
          _this.res = [
            {
              detail: [
                {
                  name: "零件",
                  content: e.v_part
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
                },
                {
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
                  name: "库存状态",
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
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {
          _this.barcode = "";
          _this.$refs.barcode.focus();
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

