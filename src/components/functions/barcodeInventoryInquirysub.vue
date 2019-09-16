<template>
  <div class="container" v-cloak>
    <EsunHeader
      v-bind:color="colorNow"
      v-bind:ismenu="false"
      v-bind:iscenter="false"
      v-bind:headername="header"
      v-bind:goback="back"
      v-bind:usercenter="gousercenter"
    ></EsunHeader>
    <div class="content">
      <div class="mui-input-group">
        <div class="mui-input-row inforLabel">
          <label>零件号</label>
          <label class="showlabel disabledTrue">{{part}}</label>
        </div>
        <div class="mui-input-row inforLabel">
          <label>货格</label>
          <label class="showlabel disabledTrue">{{grid}}</label>
        </div>
        <div class="mui-input-row inforLabel">
          <label>批序号</label>
          <label class="showlabel disabledTrue">{{lot}}</label>
        </div>
      </div>
      <div align="center" style="margin:0 auto;width:98%;overflow:scroll;" class="detail">
        <span
          style="margin-left: 12px;display:block;width: 319px;height: 1px !important;background: #DDDDE5;color: #DDDDE5;position: absolute;top:31.2px;"
        ></span>
        <table border class="qgg-table" style="border: 1px solid #D5D9ED;">
          <thead>
            <tr>
              <th style="color:#3B58D4;font-size: 11px;">箱号</th>
              <th style="color:#3B58D4;font-size: 11px;">数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in res">
              <td>{{item.temlddboxdet_code}}</td>
              <td>{{item.temlddboxdet_sum}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
    <EsunMask v-bind:show="mask"></EsunMask>
  </div>
</template>

<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  name: "barcodeInventoryInquirysub",
  data() {
    return {
      part: this.$route.query.title_part,
      grid: this.$route.query.title_grid,
      lot: this.$route.query.title_lot,
      res: this.$route.query.maintable,
      mask: false,
      header: "库存明细",
      colorNow: "",
      testNum: 0,
      userId: ""
    };
  },

  components: {},

  created() {
    app.init(this);
  },
  mounted() {
    app.addBack(this.back);
  },
  destroyed() {
    app.removeBack(this.back);
  },
  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    reload: function() {
      this.mask = false;
    },
    gousercenter: function() {
      app.center(this);
    },
    back: function() {
      app.back(this);
    },
    ok: function() {},
    cancel: function() {},
    saveInLocal: function() {}
    // addDB(vue, data) {
    //   let datetime = app.getTime()
    //   vue.$indexDB.add(
    //     'offlineData',
    //     [{
    //       datetime: datetime,
    //       userId: vue.userId,
    //       function: '采购收货',
    //       data: data
    //     }
    //     ],
    //     function (evnet) {
    //       if (event.type === 'error') {
    //         mui.toast('缓存失败')
    //       } else if (event.type === 'complete') {
    //         mui.toast('扫描成功')
    //       }
    //     }
    //   )
    // }
  },

  watch: {},
  created() {
    console.log(this.res);
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem("userMsg")).userid;
    console.log(this.res);
  }
};
</script>
<style scoped>
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
}
.qgg-table th {
  border-collapse: collapse;
  border: none !important;
  /* border-bottom: 1px solid #c6c6c6 !important; */
  background-color: #edeff7 !important;
  padding: 5px 9px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.qgg-table td {
  border-collapse: collapse;
  border: none !important;
  /* border-bottom: 1px solid #c6c6c6 !important; */
  padding: 5px 9px;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  word-break: break-all;
}
.qgg-table tr:nth-child(odd) {
  background-color: #fff !important;
}
.qgg-table tr:nth-child(even) {
  background-color: #f8f8f8 !important;
}
.showlabel {
  padding: 10px 10px;
  display: inline-block;
  width: 72%;
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 31px;
}
</style>