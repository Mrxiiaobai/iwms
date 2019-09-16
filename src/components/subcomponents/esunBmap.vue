<template>
  <baidu-map :center="center" :zoom="zoom" @ready="handler">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" showAddressBar="true" autoLocation="true" ></bm-geolocation>
  </baidu-map>
</template>
<script>
import BOX from "../../assets/img/BOX.png";
export default {
  data() {
    return {
      center: this.center,
      zoom: this.zoom,
      icon: BOX
    };
  },
  props: {
    center: String,
    zoom: 0,
    handler: Function
  },
  methods: {
    getNow: function() {
      document.getElementsByClassName("BMap_geolocationIcon")[0].click();
    }
  },
  created: function() {
    setTimeout(() => {
      this.getNow();
    }, 500);
  }
};
</script>