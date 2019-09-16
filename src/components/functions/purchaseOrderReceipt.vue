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
            <!-- <div class="mui-input-row">
              <label>用户ID:</label>
              <label style="padding: 11px 0px;">{{userId}}</label>
            </div>-->
            <div class="mui-input-row">
              <label>生效日期:</label>
              <input class="mui-version" style="width:150px;" type="date" v-model="effectiveDate">
              <span>V1.0.0</span>
            </div>
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row" id="barcodeDiv">
              <label>
                <span style="color:red;">*</span>条码
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="barcode"
                @change="barcodeDivChange"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <!-- <div class="mui-input-row inforLabel">
              <label>地点:</label>
              <label style="padding: 11px 0px;">{{site}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>货格:</label>
              <label style="padding: 11px 0px;">{{grid}}</label>
            </div>-->
            <div class="mui-input-row inforLabel">
              <label>已扫描箱数</label>
              <label style="padding: 11px 0px;" class="disabledTrue">{{quantityOfBoxScanned}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>供应商:</label>
              <label style="padding: 11px 0px;">{{supplier}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>订单号码:</label>
              <label style="padding: 11px 0px;">{{orderId}}</label>
            </div>
            <!-- <div class="mui-input-row inforLabel">
              <label>行:</label>
              <label style="padding: 11px 0px;">{{line}}</label>
            </div>-->
            <div class="mui-input-row inforLabel">
              <label>零件号:</label>
              <label style="padding: 11px 0px;">{{itemId}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批次:</label>
              <label style="padding: 11px 0px;">{{batch}}</label>
            </div>
            <!-- <div class="mui-input-row inforLabel">
              <label>参考号:</label>
              <label style="padding: 11px 0px;">{{referenceId}}</label>
            </div>-->
            <!-- <div class="mui-input-row inforLabel">
              <label>批次属性1:</label>
              <label style="padding: 11px 0px;">{{batchProperty1}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label>批次属性2:</label>
              <label style="padding: 11px 0px;">{{batchProperty2}}</label>
            </div>-->
            <div class="mui-input-row inforLabel">
              <label>数量</label>
              <label style="padding: 11px 0px;">{{quantity}}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="showAll">
        <div class="mui-input-group">
          <transition-group name="list" tag="p">
            <div
              v-for="(iteam,index) in res"
              class="list-item mui-input-row redGreen"
              v-bind:key="iteam.barcode"
            >
              <div class="freeListRoom"></div>
              <div class="fontIndexSize">
                <div class="colorListFont">{{iteam.boxindex}}</div>
              </div>
              <div class="circleSize">
                <div :class="[iteam.b_state==0?'colorCircle':'colorCircleG']"></div>
              </div>
              <div class="fontSize">
                <div class="colorListFont">{{iteam.barcode}}</div>
              </div>
            </div>
          </transition-group>
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
  name: "purchaseOrderReceipt",
  data: function () {
    return {
      userId: "",
      domain: '',
      effectiveDate: '',
      site: '',
      grid: '',
      quantityOfBoxScanned: 0,
      barcode: '',
      supplier: '',
      orderId: '',
      line: '',
      itemId: '',
      batch: '',
      referenceId: '',
      batchProperty1: '',
      batchProperty2: '',
      quantity: 0,
      mask: false,
      header: "采购收货",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false,
      res: [],
      boxindex: 1
    };
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.domain = localStorage.getItem('domain')
    this.input_Session_ID = JSON.parse(localStorage.getItem('userMsg')).sessionid
    this.effectiveDate = app.getDate()
  },
  methods: {
    reload: function () {
      this.site = ''
      this.grid = ''
      this.quantityOfBoxScanned = 0
      this.barcode = ''
      this.supplier = ''
      this.orderId = ''
      this.line = ''
      this.itemId = ''
      this.batch = ''
      this.referenceId = ''
      this.batchProperty1 = ''
      this.batchProperty2 = ''
      this.quantity = 0
      this.inputDisabledFlag = false
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
      var that = this
      let allInCar = {
        mtitle: [],
        content: []
      };
      for (var i = 0; i < that.res.length; i++) {
        if (that.res[i].supplier != '') {
          allInCar.mtitle.push({
            name: '供应商',
            content: that.res[i].brpocheckoutdt_vend
          })
          allInCar.mtitle.push({
            name: '批次号',
            content: that.res[i].tout_vendlot
          })
          allInCar.mtitle.push({
            name: '订单号',
            content: that.res[i].tout_nbr
          })
          break;
        }
      }
      for (var i = 0; i < that.res.length; i++) {
        if (that.res[i].barcode != '') {
          allInCar.content.push({
            name: '箱号',
            content: that.res[i].barcode
          })
        }
      }
      localStorage.setItem("isUpDate", 'N');
      that.$router.push({
        name: "purchaseOrderReceiptrCar",
        query: {
          allPA: that.res,
          allP: allInCar,
          timesindex: '4',
          name: "采购收货明细",
        }
      });
    },
    barcodeDivChange() {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrpocheck',
        input_brpocheckin: [
          {
            brpocheckindt_effdate: _this.effectiveDate,
            brpocheckindt_serial: _this.barcode,
            brpocheckindt_vend: '',
            brpocheckindt_vendlot: '',
            brpocheckindt_nbr: '',
            brpocheckindt_count: 0,
          }
        ]
      },
        'xwbrpocheck',
        _this,
        function (e) {
          console.log(e)
          // mui.alert('校验成功')
          _this.supplier = e.brpocheckoutdt[0].brpocheckoutdt_vend
          _this.batch = e.brpocheckoutdt[0].tout_vendlot
          _this.orderId = e.brpocheckoutdt[0].tout_nbr
          _this.quantity = e.brpocheckoutdt[0].tout_count
          e.brpocheckoutdt[0].tin_effdate = _this.effectiveDate
          e.brpocheckoutdt[0].b_state = 1;
          e.brpocheckoutdt[0].barcode = _this.barcode
          e.brpocheckoutdt[0].boxindex = _this.boxindex++
          _this.res.unshift(e.brpocheckoutdt[0]);
          _this.barcode = ''
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
          _this.barcode = ''
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
  background-color: #f2f2f2;
}
.mui-input-group .mui-input-row:after {
  bottom: auto;
}
.redGreen {
  justify-content: flex-start;
  flex-wrap: nowrap;
  display: flex;
}
.freeRoom {
  width: 35%;
}
.circleSize {
  width: 15%;
}
.colorCircle {
  margin: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: red;
}
.colorCircleG {
  margin: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: Green;
}
.fontSize {
  width: 30%;
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
.showAll {
  position: absolute;
  width: 94%;
  left: 0px;
  top: 435px;
  height: 200px;
  margin: 3%;
  border: 1px solid #e2e2e2;
  overflow: auto;
}

.freeListRoom {
  width: 2%;
}
.colorListFont {
  margin: 10px;
  height: 30px;
  font-size: 20px;
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

