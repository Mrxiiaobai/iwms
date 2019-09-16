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
          <div style="margin-left: 20px;">V1.0.0</div>
          <div class="mui-input-group">
            <!-- <div class="mui-input-row">
              <label>用户ID:</label>
              <label style="padding: 11px 0px;">{{userId}}</label>
            </div>-->
          </div>
          <div style="height:25px;"></div>
          <div class="mui-input-group">
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>原托盘
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="originalSalver"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
            </div>
            <div class="mui-input-row">
              <label>
                <span style="color:red;">*</span>新托盘
              </label>
              <input
                type="text"
                class="mui-input-clear"
                v-model="newSalver"
                :disabled="inputDisabledFlag"
                :class="inputDisabledFlag==true?'disabledTrue':''"
                placeholder="请输入"
              >
              <span class="mui-icon mui-icon-clear"></span>
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
  name: "replacingSalver",
  data: function () {
    return {
      userId: "",
      domain: '',
      originalSalver: '',
      newSalver: '',
      mask: false,
      header: "托盘替换",
      inputChangeAjaxFlag: true,
      inputDisabledFlag: false
    };
  },
  created() {
    app.init(this)
    this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
    this.effectiveDate = app.getDate()
  },
  methods: {
    reload: function () {
      this.originalSalver = ''
      this.newSalver = ''
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
</style>

