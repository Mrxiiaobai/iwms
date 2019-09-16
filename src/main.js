// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./global"
import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import router from './router/index'
import "./assets/fonts/mui.ttf"
import "./assets/css/mui.min.css"
import './assets/css/iconfont.css'
import "./assets/css/app.css"
import App from './App'
import VueTouch from 'vue-touch'
import sql from "../src/assets/js/sql"
import axios from 'axios'
import VueAxios from 'vue-axios'
import DrawerLayout from 'vue-drawer-layout'
Vue.use(DrawerLayout)

Vue.use(VueAxios, axios)
Vue.use(
  sql.initDB({
    name: 'testDBV2',
    version: 1
  },
    [{
      name: 'offlineData',
      primIndex: 'datetime',
      indexs: [{
        name: 'userId',
        unique: false
      },
      {
        name: 'function',
        unique: false
      },
      {
        name: 'data',
        unique: false
      }
      ]
    }],
    function (event) {
      if (event.type === 'error') {
        mui.toast('读取本地缓存失败')
      }
    }
  )
)
Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(DrawerLayout)
Vue.use(Vuex)

Vue.prototype.stopEject = (e) => {
	e.target.readOnly = true;
			setTimeout(()=>{
				e.target.readOnly = false;
			},200)
	// let inputs = document.getElementsByTagName('input');
	// for(var i=0;i<inputs.length;i++){
	// 	inputs[i].addEventListener('focus',function(e){
	// 		e.target.readOnly = true;
	// 		console.log(e);
	// 		setTimeout(()=>{
	// 			e.target.readOnly = false;
	// 		},200)
	// 	})
	// }
}

const store = new Vuex.Store({
  state: {
    aliveComponent: [],
    onlineStatusDescribe: '',
    onlineStatusIconColor: ''
  },
  mutations: {
    addAlive: function (state, component) {
      state.aliveComponent.push(component)
    },
    delAlive: function (state) {
      state.aliveComponent.pop()
    },
    clearAll: function (state) {
      state.aliveComponent.splice(0)
    },
    setOnlineStatusDescribe(state, data) {
      state.onlineStatusDescribe = data
    },
    setOnlineStatusIconColor(state, data) {
      state.onlineStatusIconColor = data
    }
  },
  actions: {
    commitOnlineStatusDescribe: ({
      commit
    }, data) => commit('setOnlineStatusDescribe', data),
    commitOnlineStatusIconColor: ({
      commit
    }, data) => commit('setOnlineStatusIconColor', data)
  }
})

Vue.config.productionTip = false
// 页面必须以keepAlive的状态加载进来，才能使用缓存，所以菜单界面keepalive=ture,
// router.beforeEach((to, from, next) => {
//   //login到menu，menu每次刷新
//   if (to.path === "/login" && from.path === '/usercenter') {
//     // alert('a')
//     router.options.routes[1].meta.keepAlive = false
//   } else {
//     //menu到page，page每次刷新且缓存
//     if (from.path === "/menu") {
//       from.meta.keepAlive = true;
//       to.meta.keepAlive = true;
//     }
//   }
//   next();
// })
// router.beforeEach((to, from, next) => {
//   //login到menu，menu每次刷新
//   if (to.path === "/") {
//     // alert('a')
//     console.log('bbbbbbbbbbb')
//     console.log(router.options.routes)
//     router.options.routes[1].meta.keepAlive = false
//     router.options.routes[0].meta.keepAlive = false
//     router.options.routes[2].meta.keepAlive = false
//   } else if (from.path === "/") {
//     to.meta.keepAlive = false;
//   }
//   else if (from.path === "/usercenter" && to.path != "/login") {
//     to.meta.keepAlive = true;
//     from.meta.keepAlive = false;
//   }
//   else if (from.path === "/menu") {
//     //menu到page，page每次刷新且缓存
//     from.meta.keepAlive = true;
//     to.meta.keepAlive = true;
//   } else {
//     // alert('a')
//     from.meta.keepAlive = true;
//   }

//   next();
// })

const requireComponent = require.context(
  './components/subcomponents/',
  false,
  /.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
