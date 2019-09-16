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
            <div class="mui-input-row inforLabel">
              <label class="leftTable">零件号</label>
              <label class="showlabel">{{cust_part_show}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label class="leftTable">零件描述1</label>
              <label class="showlabel">{{v_lot1}}</label>
            </div>
            <div class="mui-input-row inforLabel">
              <label class="leftTable">零件描述2</label>
              <label class="showlabel">{{v_lot2}}</label>
            </div>
          </div>
          <esunShowTable
            :res="ResForRec"
            :th="['唯一码','批/序','数量']"
            :fields="['tmpxwin_serial','tmpxwin_xu','tmpxwin_qty']"
          ></esunShowTable>
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
  name: "salesList",
  data: function () {
    return {
      userId: "",
      domain: '',
      mask: false,
      header: "销售发货",
      ResForRec: [],
      v_lot1: '',
      v_lot2: '',
      cust_part_show: '',
      v_asn: '',
      temp1: '',
      temp2: '',
      v_shipto: '',
      temp4: '',

    }
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.effectiveDate = app.getDate()
  },
  mounted() {
		app.addBack(this.back);
    this.ResForRec = [];
    this.cust_part_show = this.$route.query.cust_part_show;
    this.v_asn = this.$route.query.v_asn;
    this.temp1 = this.$route.query.temp1;
    this.temp2 = this.$route.query.temp2;
    this.v_shipto = this.$route.query.v_shipto;
    this.temp4 = this.$route.query.temp4;
		this.temp5 = this.$route.query.temp5;

    this.temp2.forEach(item => {
      if (this.$route.query.cust_part_show == item.output_xwbrship02aboxsaveout_part) {
        this.ResForRec.push({
          tmpxwin_serial: item.output_xwbrship02aboxsaveout_serialcode,
          tmpxwin_xu: item.output_xwbrship02aboxsaveout_lot,
          tmpxwin_qty: item.output_xwbrship02aboxsaveout_qty
        })
      }
    })

    this.temp4.forEach(item => {
      if (this.$route.query.cust_part_show == item.cust_part_show) {
        this.cust_part_show = item.cust_part_show;
        this.v_lot1 = item.v_ptdesc1;
        this.v_lot2 = item.v_ptdesc2;
      }
    })


  },
	destroyed(){
		app.removeBack(this.back);
	},
  methods: {
    reload: function () {
      return;
      // let _this = this;
      // mui.confirm('是否确认清除数据', '前台提示', ['取消', '确认'], function(e) {
      // 	if (e.index == 1) {
      // 		_this.reset();
      // 	} else {
      // 		return;
      // 	}
      // }, 'div')
    },
    gousercenter: function () {
      this.inputChangeAjaxFlag = false
      app.center(this);
    },
    back: function () {
      this.inputChangeAjaxFlag = false
      // this.reset();
      app.back(this);
    },
    cancel: function () {

    },
    ok: function () {
    },
    // reset:function(){
    // 	let _this=this;
    // 	_this.temp1=[];
    // 	_this.temp2=[];
    // 	_this.v_shipto="";
    // 	_this.v_asn="";
    // 	_this.cust_part_show="";
    // },
      },
  activated: function () {

    this.inputChangeAjaxFlag = true;
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

.mui-input-row label {
  line-height: 1;
}

.inforLabel {
  background-color: #f2f2f2;
}

.inforLabel:nth-of-type(2) {
  background-color: #f9f9f9;
}

.leftTable {
  background-color: #fff;
  /* margin-right: 5px; */
}

.mui-input-group .mui-input-row:after {
  bottom: auto;
}
</style>
