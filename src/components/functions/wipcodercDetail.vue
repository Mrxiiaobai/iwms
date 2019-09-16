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
    <!-- <div class="content">
      <EsunShoppingCar v-bind:res="res"></EsunShoppingCar>
    </div>-->
    <div class="content">
      <div class="mui-content-padded" style="margin: 0px;">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label style="width:50%!important;">
              <span style="color:red;">*</span>剩余数量
            </label>
            <input
              style="width:50%!important;"
              type="text"
              class="mui-input-clear disabledTrue"
              v-model="doneAllmun"
              disabled="true"
            >
            <!-- <span class="mui-icon mui-icon-clear"></span> -->
          </div>
        </div>
        <div class="mui-input-group" v-for="(item, index) in detail" :key="index">
          <div class="mui-input-row" v-show="item.tmpwipcodercsave_code == BoxId">
            <label style="width:35%!important;">{{item.tmpwipcodercsave_rsndesc}}</label>
            <label
              style="width:30%important;"
              v-show="item.tmpwipcodercsave_remark == ''"
              @click="alertShow(index)"
            >未备注</label>
            <label
              style="width:30%important;"
              v-show="item.tmpwipcodercsave_remark != ''"
              @click="alertShow(index)"
            >已备注</label>
            <input
              type="number"
              style="width:35%!important;"
              class="mui-input-clear"
              placeholder="请输入数量"
              ref="toBoxId"
              v-model="item.tmpwipcodercsave_qty"
              @click="nozere(index)"
              @blur="chkNum(index)"
            >
            <!-- <span class="mui-icon mui-icon-clear"></span> -->
          </div>
          <div
            class="mui-input-row"
            v-show="item.tmpwipcodercsave_code == BoxId &&item.ifshowremark ==true"
            style="margin: 10px 5px; border: 1px solid #ddd;"
          >
            <textarea
              id="textarea"
              rows="5"
              placeholder="点击此处输入备注"
              v-model="item.tmpwipcodercsave_remark"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
    <EsunMask v-bind:show="mask"></EsunMask>
  </div>
</template>

<script>
import mui from '../../assets/js/mui.min'
import app from '../../assets/js/app'
export default {
  name: 'wipcodercDetail',
  data() {
    return {
      BoxId: this.$route.query.BoxId,
      detail: this.$route.query.detail,
      codercrsn: this.$route.query.codercrsn,
      mask: false,
      header: '原因明细',
      colorNow: '',
      testNum: 0,
      userId: '',
      allmun: 0,
      Donenum: 0,
      doneAllmun: ''
    };
  },

  components: {},

  created() {
    app.init(this);

  },

  computed: {},

  beforeMount() { },

  mounted() {
    app.addBack(this.back)
  },
  destroyed() {
    app.removeBack(this.back)
  },
  methods: {
    reload: function () {
      this.mask = false
    },
    gousercenter: function () {
      app.center(this)
    },
    back: function () {
      var _this = this
      if (_this.Donenum != 0) {
        mui.confirm('您的数量分配未完成，是否确认返回？', '前台提示', ['确认', '取消'], function (e) {
          if (e.index == 0) {
            localStorage.setItem('wipcodercDetail', JSON.stringify(_this.detail))
            app.back(_this)
          } else {
            return
          }
        })
        return
      }
      localStorage.setItem('wipcodercDetail', JSON.stringify(_this.detail))
      app.back(_this)
    },
    nozere(num) {
      let _this = this
      if (Number(_this.detail[num].tmpwipcodercsave_qty) == 0) {
        _this.detail[num].tmpwipcodercsave_qty = ''
      }
    },

    alertShow(num) {
      let _this = this
      _this.detail[num].ifshowremark = !_this.detail[num].ifshowremark
    },
    chkNum(num) {
      let _this = this
      if (_this.detail[num].tmpwipcodercsave_qty == '') {
        _this.detail[num].tmpwipcodercsave_qty = 0
      }
      _this.Donenum = 0
      for (let i = 0; i < _this.detail.length; i++) {
        const element = _this.detail[i];
        if (element.tmpwipcodercsave_code == _this.BoxId) {
          console.log(_this.detail[i].tmpwipcodercsave_qty)
          _this.Donenum += Number(_this.detail[i].tmpwipcodercsave_qty)
        }
      }
      console.log(_this.Donenum)
      _this.Donenum = _this.allmun - _this.Donenum
      _this.doneAllmun = _this.Donenum + '/' + _this.allmun
      if (_this.Donenum < 0) {
        mui.alert('您输入的数量已超过总数,请修改!', '前台提示')
      }
    },
    ok: function () {
      this.back()
    },
    cancel: function () { },
  },

  watch: {},
  created() {
    var _this = this
    app.init(_this);
    _this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    console.log(_this.detail)
    console.log(_this.codercrsn)
    for (let i = 0; i < _this.detail.length; i++) {
      const element = _this.detail[i];
      if (element.tmpwipcodercsave_code == _this.BoxId) {
        _this.allmun = _this.detail[i].tmpwipcodercsave_sum_qty
      }
    }
    for (let i = 0; i < _this.detail.length; i++) {
      const element = _this.detail[i];
      if (element.tmpwipcodercsave_code == _this.BoxId) {
        console.log(_this.detail[i].tmpwipcodercsave_qty)
        _this.Donenum += Number(_this.detail[i].tmpwipcodercsave_qty)
      }
    }
    console.log(_this.Donenum)
    _this.Donenum = _this.allmun - _this.Donenum
    _this.doneAllmun = _this.Donenum + '/' + _this.allmun
  },
}
</script>
<style scoped>
</style>