<template>
  <div class='container' v-cloak>
    <button @click="selectManyPhoto()">点击选择照片</button>
  </div>
</template>

<script>
import mui from "../../assets/js/mui.min";
export default {
  data() {
    return {
      mask: false,
      colorNow: ""
      // lfs: null
    };
  },

  components: {},

  created() {
    app.init(this);
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    selectPhoto: function() {
      plus.gallery.pick(
        function(path) {
          mui.toast(path);
          //showImg( path );
          //createItem(path);
        },
        function(e) {
          outSet("取消选择图片");
        },
        { filter: "image" }
      );
    },
    selectManyPhoto: function() {
      var that = this;
      plus.gallery.pick(
        function(e) {
          //that.lfs = e.files;
          for (var i in e.files) {
            mui.toast(e.files[i]);
          }
        },
        function(e) {
          mui.toast("取消选择图片");
        },
        {
          filter: "image",
          multiple: true,
          maximum: 4,
          //selected: that.lfs,
          system: false,
          onmaxed: function() {
            plus.nativeUI.alert("最多只能选择4张图片");
          }
        }
      ); // 最多选择3张图片
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>