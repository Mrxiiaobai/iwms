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
      <EsunShoppingCar v-bind:res="res"></EsunShoppingCar>
    </div>
    <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
    <EsunMask v-bind:show="mask"></EsunMask>
  </div>
</template>

<script>
import mui from '../../assets/js/mui.min'
import app from '../../assets/js/app'
export default {
  name: 'purchaseOrderReceiptrCar',
  data() {
    return {
      resAll: this.$route.query.allPA,
      res: this.$route.query.allP,
      mask: false,
      header: '采购收货明细',
      colorNow: '',
      testNum: 0,
      userId: ''
    };
  },

  components: {},

  created() {
    app.init(this);
  },

  computed: {},

  beforeMount() { },

  mounted() { },

  methods: {
    reload: function () {
      this.mask = false
    },
    gousercenter: function () {
      app.center(this)
    },
    back: function () {
      app.back(this)
    },
    ok: function () {
      let _this = this
      app.offlineAjax({
        input_userId: _this.userId,
        input_crop: '',
        input_domain: localStorage.getItem('domainNow'),
        input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
        input_ProgramID: 'xwbrposave',
        brposavein: [{
          brposaveindt_effdate: _this.toSite,
          brposaveindt_serial: _this.toLocation,
          brposaveindt_vend: _this.toGrid,
          brposaveindt_vendlot: _this.effectiveDate,
          brposaveindt_nbr: _this.toSiteAndLocation,
          brposaveindt_count: ''
        }],
      },
        'xwbrposave',
        _this,
        function (e) {
          console.log(e.brtranboxchkoutdt)
          let xwbrtranboxchkResult = e.brtranboxchkoutdt[0]
          _this.itemId = xwbrtranboxchkResult.brtranboxchkoutoutdt_part
          _this.fromSite = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_site
          _this.fromLocation = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_loc
          _this.fromGrid = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_grid
          _this.fromBatch = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_lot
          _this.fromReference = xwbrtranboxchkResult.brtranboxchkoutoutdt_from_ref
          return;
        },
        function () {
          _this.quality++
          let tempJSONObj = {
            allres: _this.resAll,
          }
          _this.addDB(_this, JSON.stringify(tempJSONObj))
          mui.toast('本地保存成功')
        })
    },
    cancel: function () { },
    saveInLocal: function () {

    },
    addDB(vue, data) {
      let datetime = app.getTime()
      vue.$indexDB.add(
        'offlineData',
        [{
          datetime: datetime,
          userId: vue.userId,
          function: '采购收货',
          data: data
        }
        ],
        function (evnet) {
          if (event.type === 'error') {
            mui.toast('缓存失败')
          } else if (event.type === 'complete') {
            mui.toast('扫描成功')
          }
        }
      )
    }
  },

  watch: {},
  created() {
    console.log('a')
    console.log(this.res)
    app.init(this);
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    console.log(this.resAll)
    console.log(this.res)
  },
}
</script>
<style scoped>
</style>