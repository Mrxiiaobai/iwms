<template>
  <div class="mui-content-padded" style="margin: 5px;">
    <div class="mui-input-group">
      <div class="redGreen">
        <div class="redGreenT" v-for="item in res.mtitle">
          <div class="titieFontSizeT">
            <div class="colorFont">{{item.name}}</div>
          </div>
          <div class="FontSizeT">
            <div class="colorFont">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="mui-input-row redGreen">
        <div class="titieFontSize1">
          <div class="colorFont">箱号</div>
        </div>
        <div class="FontSize1">
          <div class="colorFont">数量</div>
        </div>
      </div>
      <div class="mui-input-row redGreen" v-for="item in res.content">
        <div class="titieFontSize1">
          <div class="colorFont">{{item.content}}</div>
        </div>
        <div class="FontSize1">
          <div class="colorFont">1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from '../../assets/js/mui.min'
export default {

  data: function () {
    return {
      name: this.headername,
      colorNow: this.colorNow,
      mres: this.res
      // res: {
      //   title: [{
      //     name: '供应商',
      //     content: '111'
      //   }, {
      //     name: '供应商',
      //     content: '111'
      //   }, {
      //     name: '供应商',
      //     content: '1111'
      //   },
      //   ],
      //   content: [
      //     {
      //       name: '箱号',
      //       content: '1111'
      //     }
      //   ]
      // }
    };
  },
  props: {
    res: {},
  },

  components: {},

  created() {

    console.log('abc')
    console.log(this.mres.mtitle)

  },

  computed: {},

  beforeMount() { },

  mounted() { },

  methods: {

    cancel: function () { },
  },

  watch: {},

  activated() {//缓存被激活时逻辑编写处}

  }
}
</script>
<style scoped>
.redGreen {
  justify-content: flex-start;
  flex-wrap: wrap;
  display: flex;
}
.redGreenT {
  width: 50%;
  justify-content: flex-start;
  flex-wrap: wrap;
  display: flex;
}
.freeRoom {
  width: 35%;
}
.circleSize {
  width: 15%;
}
.colorCircle {
  margin: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: red;
}
.FontSize {
  width: 30%;
}
.FontSize1 {
  width: 20%;
}
.FontSizeT {
  width: 60%;
}
.titieFontSize {
  width: 20%;
}
.titieFontSize1 {
  width: 70%;
}
.titieFontSizeT {
  width: 40%;
}

.fontIndexSize {
  width: 10%;
  color: black;
}
.colorFont {
  margin: 10px;
  height: 10px;
  font-size: 15px;
  font-weight: 500;
}
.colorFonts {
  margin: 10px;
  height: 30px;
  font-size: 15px;
  font-weight: 500;
}
.showAll {
  position: absolute;
  width: 94%;
  left: 0px;
  top: 300px;
  height: 200px;
  margin: 3%;
  border: 1px solid #e2e2e2;
  overflow: auto;
}
.list-item {
}
.freeListRoom {
  width: 2%;
}
.colorListFont {
  margin: 10px;
  height: 30px;
  font-size: 15px;
  font-weight: 500;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>