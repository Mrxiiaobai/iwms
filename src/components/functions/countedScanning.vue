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
                <span style="color:red;">*</span>盘点类型
              </label>
              <select
                :disabled="SelectDisableFlag"
                :class="SelectDisableFlag==true?'disabledTrue':''"
                class="mui-btn mui-btn-block"
                style="width:72%;border:1px solid #d5d9ed !important;padding: 0px"
                v-model="chosenType"
                @change="TypeChange"
              >
                <option value="true">初盘</option>
                <option value="false">重盘</option>
              </select>
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>盘点日期
              </label>
              <input type="date" v-model="countedDate" />
            </div>
          </div>

          <div class="mui-input-group">
            <div class="mui-input-row" id="siteLocationDiv">
              <label>
                <span style="color:red;">*</span>至地点货格
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="toSiteAndLocation"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="siteInput"
                @change="siteAndNumChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:mres="showdetail1" v-bind:res="[]"></EsunShowDetail>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label :style="{display: 'inline',width: '28%'}">
                <span style="color:red;">*</span>需扫描
              </label>
              <input
                :style="{display: 'inline',width: '21%',float: 'left'}"
                type="number"
                v-model="neededToDeal"
                :disabled="inputDeelDisabledFlag"
                :class="inputDeelDisabledFlag==true?'disabledTrue':''"
                ref="numToDeel"
                placeholder="请输入(数字)"
                @change="neededToDealChange"
              />
            </div>
          </div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label style="display:block;width:28%">已扫描</label>
              <label
                class="inforLabel disabledTrue"
                style="padding: 11px 0px;display:inline;width:72%;border-radius: 1px;padding-left: 10px"
              >{{dealed}}</label>
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
                :disabled="!BoxinputDisabledFlag"
                :class="!BoxinputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
                ref="boxInput"
                @change="boxChange"
              />
            </div>
          </div>
          <EsunShowDetail v-bind:res="showdetail2" v-bind:mres="mres"></EsunShowDetail>
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
  name: "countedScanning",
  data: function() {
    return {
      userId: "",
      domain: "",
      effectiveDate: "",
      countedType: "",
      countedDate: "",
      siteLocationBarcode: "",
      toSiteAndLocation: "",
      countedSite: "",
      countedLocation: "",
      countedGrid: "",
      quantityOfBoxNeedCount: 0,
      quantityOfBoxCounted: 0,
      neededToDeal: 0,
      dealed: 0,
      barcode: "",
      compontentId: "",
      site: "",
      location: "",
      grid: "",
      batchId: "",
      reference: "",
      countedQuantity: 0,
      mask: false,
      header: "盘点扫描",
      inputChangeAjaxFlag: true,
      inputDeelDisabledFlag: false,
      inputDisabledFlag: false,
      BoxDisabledFlag: false,
      SelectDisableFlag: false,
      chosenType: "",
      showdetail1: [
        {
          detail: [
            {
              name: "至地点",
              content: ""
              // isshow: false
            },
            {
              name: "至库位",
              content: ""
              // isshow: false
            }
          ]
        },
        {
          detail: [
            {
              name: "至货格",
              content: ""
            }
          ]
        }
      ],
      showdetail2: [
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
      ]
    };
  },
  created() {
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    this.countedDate = app.getDate();
  },
  mounted() {
    app.addBack(this.back);
  },
  destroyed() {
    app.removeBack(this.back);
  },
  methods: {
    reload: function() {
      // this.neededToDeal = 0;
      this.toSiteAndLocation = "";
      this.countedType = "";
      this.siteLocationBarcode = "";
      this.countedSite = "";
      this.countedLocation = "";
      this.countedGrid = "";
      this.quantityOfBoxNeedCount = 0;
      this.quantityOfBoxCounted = 0;
      this.barcode = "";
      this.compontentId = "";
      this.site = "";
      this.location = "";
      this.grid = "";
      this.batchId = "";
      this.reference = "";
      this.countedQuantity = 0;
      this.inputDisabledFlag = false;
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
      console.log(this.chosenType === "true");
    },
    TypeChange: function() {
      let _this = this;
      _this.SelectDisableFlag = !_this.SelectDisableFlag;
    },
    siteAndNumChange: function() {
      // 寄存库存转移至库位校验
      let _this = this;
      if (_this.chosenType === "") {
        mui.alert("必须先选择盘点类型");
        return;
      }
      if (!_this.toSiteAndLocation || !_this.neededToDeal) {
        mui.alert("至地点货格和需扫描数量必须都输入");
        return;
      }
      _this.toSiteAndLocation = _this.toSiteAndLocation.toLowerCase().trim();
      app.offlineAjax(
        {
          input_userId: _this.userId,
          input_crop: "",
          input_domain: localStorage.getItem("domainNow"),
          input_Session_ID: JSON.parse(localStorage.getItem("userMsg"))
            .sessionid,
          input_ProgramID: "xwbrcount01scchk",
          cc_initial: _this.chosenType === "true",
          cnt_date: _this.effectiveDate,
          source_site_loc: _this.toSiteAndLocation,
          total_box: _this.neededToDeal
        },
        "xwbrcount01scchk",
        _this,
        function(e) {
          console.log(e);
          mui.toast("校验成功");
        },
        function() {
          mui.alert("离线功能暂未集成");
        },
        function() {}
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

