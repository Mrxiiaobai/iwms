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
    <div class="content"></div>
    <EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
    <EsunMask v-bind:show="mask"></EsunMask>
  </div>
</template>

<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
export default {
  data() {
    return {
      mask: false,
      colorNow: ""
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
      this.mask = false;
    },
    gousercenter: function () {
      app.center(this);
    },
    back: function () {
      app.back(this);
    },
    ok: function () {
      this.delBat();
    },
    cancel: function () { }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>