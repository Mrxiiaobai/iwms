<template>
  <div id="app">
    <!-- v-if创建销毁的缓存页面是无法刷新的 -->
    <!-- <transition :name="transition">
      <keep-alive :include="$store.state.aliveComponent.toString()">
        <router-view></router-view>
      </keep-alive>
    </transition>-->
    <!-- <transition :name="transition">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transition" v-if="!needReload">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>-->
    <!-- 非缓存组件刷新 -->
    <!-- <router-view v-if="needReload&&!$route.meta.keepAlive"></router-view> -->

    <transition :name="transition">
      <keep-alive :include="$store.state.aliveComponent.toString()">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>



<script>
export default {
  name: "App",
  data: function () {
    return {
      needReload: false,
      transition: 'slide-left'
    };
  },
  watch: {
    $route(to, from) {
      console.log('gg')

      var inTime = to.query.timesindex || 2;
      var outTime = from.query.timesindex || 2;
      console.log(to.query.timesindex)
      console.log(inTime)
      console.log(from.query.timesindex)
      console.log(outTime)
      if (from.name == 'login') {
        var outTime = -1;
      }
      if (inTime > outTime) {
        this.transition = "slide-left";
      } else {
        this.transition = "slide-right";
      }
    }
  },
  provide: function () {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload: function () {
      this.needReload = true;
      this.$nextTick().then(() => {
        this.needReload = false;
      });
    }
  },
  created: function () {
    // this.$router.push({
    //   path: "/",
    //   query: {
    //     timesindex: '0'
    //   }
    // });
  }
};
</script>



 <style scoped>
/*!
 * =====================================================
 * App (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */

/* .slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave {
  left: 0;
  right: 0;
  transform: translateX(50%);
  opacity: 0;
} */

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-50%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  /* transform: translate3d(100%, 0, 0); */
}
.slide-left-enter {
  opacity: 0;
  /* transform: translate3d(100%, 0, 0); */
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-50%, 0, 0);
}

/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
} */
</style>
<style >
/* body {
  font-size: 15px;
} */
input,
select,
textarea {
  font-size: 14px;
}

.mui-input-row label {
	position: absolute;
  font-size: 0.14rem;
  color: #333333;
  width: 28%;
	height: 0.46rem;
	line-height: 0.46rem;
	padding: 0 0 0 0.14rem;
	z-index: 3;
  /* margin-right: 32px; */
}
input[type='color'],
input[type='date'],
input[type='datetime-local'],
input[type='datetime'],
input[type='email'],
input[type='month'],
input[type='number'],
input[type='password'],
input[type='search'],
input[type='tel'],
input[type='text'],
input[type='time'],
input[type='url'],
input[type='week'],
select,
textarea {
  height: 31px;
}

.mui-input-group .mui-input-row {
  height: 0.46rem;
	line-height: 0.46rem;
	padding-right: 0.01rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(238, 236, 247, 1);
	box-shadow:0px 0px 5px 0px rgba(59,88,212,0.08);
	margin-bottom: 0.13rem;
}

*:before {
  height: 0px !important;
}
*:after {
  height: 0px !important;
}
.mui-input-group .mui-input-row:after {
  height: 0px !important;
}

.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  font-size: 0.14rem;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(51,51,51,1);
  float: right !important;
  height: 0.46rem;
  line-height: 0.46rem;
  width: 100% !important;
  margin-bottom: 0;
	/* text-align: center; */
  padding-left: 1.16rem;
  /* background: #8fbec536; */
  /* background: #fff; */
	
}

.mui-input-row label ~ input,.mui-input-row label ~ textarea {
	outline: none;
	border: none;
}

/* 添加输入框输入框变色 */
.mui-input-row label ~ input:focus,
.mui-input-row label ~ select:focus,
.mui-input-row label ~ textarea:focus {
  border:1px solid rgba(59,88,212,1);
  /* box-shadow: 0px 0px 2px #3b58d4; */
	height: 0.44rem;
  border-image: -webkit-linear-gradient(#3b58d4, #3753cb) 1;
  border-image: -moz-linear-gradient(#3b58d4, #3753cb) 1;
  border-image: -o-linear-gradient(#3b58d4, #3753cb) 1;
  border-image: linear-gradient(#3b58d4, #3753cb) 1;
  color: #333333;
}
.mui-input-row label ~ input:focus::placeholder,
.mui-input-row label ~ select:focus::placeholder,
.mui-input-row label ~ textarea:focus::placeholder{
  color: #3B58D4;
}
.mui-table-view-cell {
  padding: 11px 0px;
}
.mui-switch.mui-active {
  border-color: #e7f1f3;
  background-color: #7585c7;
}
  .disabledTrue {
  	background:rgba(245,246,252,1) !important;
  	border:1px solid rgba(207,212,232,1) !important;
  	box-shadow:0px 0px 5px 0px rgba(59,88,212,0.08) !important;
  }
/* 新增扫描图标样式 */
.mui-icon img {
  position: absolute;
  right: 0.11rem;
  width: 0.26rem;
  height: 0.26rem;
  top: 0.1rem;
}
.inforLabel {
  height: 31px;
}
.showdetail>.inforLabel:first-of-type{
	margin-top: 0.05rem;
}
.barcodeUi .mui-input-row{
	position: relative;
	z-index: 1;
	margin-bottom: 0.05rem;
}
.wholeDv{
	position: relative;
	/* padding: 0.1rem 0 0.1rem 0.13rem; */
	background:rgba(255,255,255,1);
	border:1px solid rgba(238, 236, 247, 1);
	box-shadow:0px 2px 18px 1px rgba(59,88,212,0.08);
	z-index: 1;
	margin-bottom:0.1rem;
	padding-bottom: 0.1rem;
}
.wholeDv .mui-input-row label ~ input:focus{
	outline: none;
	border:none;
	box-shadow: none;
}
.wholeDv .mui-input-row{
	outline: none !important;
	border:none !important;
	box-shadow: none !important;
}
.marginDv{
	margin-bottom: 0.13rem;
}
.smallCircle{
		display: inline-block;
		width: 0.15rem;
		height: 0.15rem;
		background:rgba(255,255,255,1);
		border:1px solid rgba(238, 236, 247, 1);
		border-radius: 50%;
		position: absolute;
		z-index: 3;
	}
	.smallCircle:first-of-type{
		left: -0.09rem;
		top:0.42rem;
	}
	.smallCircle:last-of-type{
		right: -0.09rem;
		top:0.42rem;
	}
	.drawer-wrap{
		width: 2.42rem !important;
	}
	.content{
		margin-bottom: 0.1rem;
	}
</style>