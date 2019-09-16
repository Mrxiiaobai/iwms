<template>
  <div class="container" v-cloak>
    <EsunHeader
      v-bind:ismenu="false"
      v-bind:iscenter="false"
      v-bind:headername="header"
      v-bind:goback="back"
      v-bind:usercenter="gousercenter"
    ></EsunHeader>
    <div class="content">
      <div class="mui-card" v-for="(item,index) in offlineData" :key="index">
        <div class="mui-card-header">{{item.datetime}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner" style="padding:0px;">
            <div class="mui-input-group">
              <div class="mui-input-row inforLabel">
                <label>用户:</label>
                <label style="padding: 11px 0px;">{{item.userId}}</label>
              </div>
              <div class="mui-input-row inforLabel">
                <label>功能:</label>
                <label style="padding: 11px 0px;">{{item.function}}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mui-card-footer" @click="showDetailedData(index)">点击查看详细数据</div>
      </div>
    </div>
    <!-- <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter> -->
    <EsunMask v-bind:show="mask"></EsunMask>
  </div>
</template>

<script>
import mui from '../../assets/js/mui.min'
import app from '../../assets/js/app'
export default {
  name: 'allContent',
  data() {
    return {
      mask: false,
      header: '离线数据明细',
      offlineData: []
    };
  },

  components: {},

  computed: {},

  beforeMount() { },

  mounted() {
    this.searchLocalData()
  },

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
    cancel: function () { },
    searchLocalData() {
      let _this = this
      _this.$indexDB.cat('offlineData', null, function (event, tempArray) {
        if (event.type === 'error') {
        } else if (event.type === 'complete') {
          tempArray = tempArray.reverse()
          _this.offlineData = tempArray
        }
      })
    },
    showDetailedData(index) {
      mui.alert(this.offlineData[index].data, '数据详情')
      //mui.alert('mui.alert(this.offlineData[index].data)mui.alert(this.offlineData[index].data)mui.alert(this.offlineData[index].data)mui.alert(this.offlineData[index].data)mui.alert(this.offlineData[index].data)', '数据详情')
    }
  },

  watch: {},
  created() {
    app.init(this);
    this.searchLocalData()
  },
}
</script>
<style scoped>
.contTitle {
  height: 35px;
  width: 100%;
  border-top: 1px solid black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.partTitle {
  font-size: 20px;
  font-weight: 500;
  height: 30px;
}
.mui-popup-title + .mui-popup-text {
  word-break: break-all !important;
}
</style>