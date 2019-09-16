<template>
  <div class="container">
    <EsunHeader
      v-bind:iscenter="true"
      v-bind:ismenu="false"
      v-bind:headername="header"
      v-bind:goback="back"
    ></EsunHeader>
    <div class="mui-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">用户名:&nbsp;&nbsp;&nbsp;&nbsp;{{name}}</li>
        <li class="mui-table-view-cell">
          选择域:
          <select
            v-model.trim="domainNow"
            @change="selChg"
            style="width:80%;margin-bottom:0px;padding:0 0 0 0.15rem; "
          >
            <option v-for="(item ,key) in domains" v-bind:key="key" style="margin-left:10%">{{item}}</option>
          </select>
        </li>
      </ul>
      <ul class="mui-table-view" style="margin-top: 25px;">
        <li class="mui-table-view-cell">
          <a style="text-align: center;color: #FF3B30;" @click="loginOut">退出登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  name: "usercenter",
  data: function () {
    return {
      header: "用户中心",
      name: "",
      timesindex: 999,
      chk: false,
      domainNow: "",
      domains: [],
      upComponent: null
    };
  },
  methods: {
    back: function () {
      app.back(this);
    },
    loginOut: function () {
      this.$store.commit("clearAll");
      this.$router.push({
        path: "/",
        query: {
          timesindex: '0'
        }
      });
    },
    selChg() {
      localStorage.setItem('domainNow', this.domainNow)
    }
  },
  mounted: function () {
    this.name = app.userMsg().userid;
    this.domainNow = app.domainNow();
    this.domains = app.userMsg().domains.map(function (value, index) {
      return value;
    });
  },
  created() {
    app.init(this);
  }
};
</script>

<style scoped>
.tbody-main p {
  margin-left: 10%;
}

.mui-bar-nav ~ .mui-content {
  padding-top: 50px;
}
#icon {
  position: absolute;
  right: 15px;
}
</style>
