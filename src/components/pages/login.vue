<template>
  <div class="blue">
    <div class="mwhite">
		<div class="hiLogo">Hi</div>
		<img :src="banner" alt="">
		<p>欢迎登录ESUN信息管理系统</p>
	</div>
    <div class="myF">
      <!-- <div class="esun">{{local}}</div> -->
      <div class="input-Vfield">
		<img :src="user" alt="">
        <input
          id="UserId"
          type="text"
          placeholder="请输入用户名"
          v-model.trim="username"
        >
      </div>
      <div
        class="input-Vfield success input-Vfield-icon"
        style="margin-left: 0px;"
        @keyup.enter="clickLoginButton"
      >
		<img :src="pass" alt="">
        <input id="passWord" type="password" v-model.trim="password" placeholder="请输入密码">
        <span></span>
        <i class="ion-android-done"></i>
      </div>
    </div>
    <!-- 进度条弹窗 -->
    <div class="popover-bg" v-if="showProgress">
      <div class="popover-inner" style="height:15%">
        <div class="title">正在更新</div>
        <div id="progress" style="width: 80%;margin:10% 0 0 10%;background: #EBEBEB;">
          <p class="mui-progressbar mui-progressbar-in">
            <span id="progressbar"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="mlogin">
      <button
        type="button"
        @click="clickLoginButton"
        id="loginBtn"
        :disabled="disabled"
      >{{loginStatus}}</button>
    </div>
	<div class="mver">©️上海奕盛软件有限公司</div>
    <div class="mve">版本号 {{version}}</div>
  </div>
</template>
<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
import banner from "../../assets/img/zhuye@3x.png"
import user from "../../assets/img/yonghumin@3x.png"
import pass from "../../assets/img/mima@3x.png"

mui.plusReady(function () {
  plus.screen.lockOrientation("portrait-primary");
  //   解决软键盘弹出遮挡input
  window.addEventListener("resize", function () {
    if (document.activeElement.tagName == "INPUT") {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  });
});
export default {
  name: "login",
  data: function () {
    return {
      detail: {
        sessionid: "",
        userid: "",
        corp: "",
        domain: "",
        domains: []
      },
	  showProgress:false,
	  banner:banner,
	  user:user,
	  pass:pass,
      timeId: '',
      timesindex: -2,
      title: "",
      subtitle: "",
      version: "",
      username: "",
      password: "",
      loginStatus: "登录",
      dataProgress: "20%",
      local: '',
      mask: false,
      disabled: false,
      // url: 'http://www.bpmap.cn:9111/WSPlatLogin.asmx',
      // url: 'http://192.9.200.150:9011/WSPlatLogin.asmx',
      seesionID: ''
    };
  },
  methods: {
    clickLoginButton() {
      var _this = this
      // this.$router.push({
      //   path: "/menu",
      //   query: {
      //     timesindex: '1'
      //   }
      // });
      if (this.username === "" || this.password === "") {
        mui.toast('请输入账号和密码。');
      } else {
        this.ajaxLogin();
      }
    },
    ajaxLogin() {
      this.disabled = true
      let _this = this;
      console.log(global.context.url)
      this.axios
        .post(global.context.url + "/clearUserStatID", {
          userid: _this.username,
          corp: "",
          seesionID: _this.seesionID,
          killMe: false
        })
        .then(function () {
          _this.loginStatus = '校验账号密码'
          return _this.axios.post(global.context.url + "/logon", {
            userid: _this.username,
            corp: "",
            userPassword: _this.password,
            seesionID: _this.seesionID,
            userLang: ""
          });
        })
        .then(e => {
          let data = JSON.parse(e.data.d);
          if (data.canLogon == "false") {
            mui.alert(data.errormessage, '提示');
            return;
          }
          _this.detail.userid = _this.userId
          _this.detail.sessionid = _this.seesionID
          // localStorage.setItem("userId", _this.userId);
          _this.loginStatus = '获取域'
          return _this.axios.post(
            global.context.url + "/GetDtBrUserDomain",
            {
              userid: _this.username,
              corp: "",
              seesionID: _this.seesionID
            }
          );
        })
        .then(e => {
          let data = JSON.parse(e.data.d);
          if (data.canpass == "false") {
            mui.alert(data.errormessage, '提示');
            return;
          }
          if (!data.rtdtbrdomain.length) {
            mui.alert("用户未分配域", "提示");
            return;
          }
          let domainArray = [];
          for (let i = 0, j = data.rtdtbrdomain.length; i < j; i++) {
            domainArray.push(
              data.rtdtbrdomain[i].DTusrdomref_domain.toUpperCase()
            );
          }
          _this.detail.domains = domainArray
          localStorage.setItem("domainArray", domainArray);
          _this.loginStatus = '获取权限菜单'
          return _this.axios.post(
            global.context.url + "/GetDtSearchMenuweb",
            {
              userid: _this.username,
              corp: "",
              seesionID: _this.seesionID,
              searchMenu: "",
              language: "ch",
              domain: domainArray[0]
            }
          );
        })
        .then(e => {
          let data = JSON.parse(e.data.d);
          if (data.canpass == "false") {
            mui.alert(
              data.errormessage ? data.errormessage : "未知错误",
              "提示"
            );
            return;
          }
          let menuArray = [];
          for (let i = 0; i < data.rtdtsearchdet.length; i++) {
            if (data.rtdtsearchdet[i].searchNbr == "91") {
              menuArray.push(
                data.rtdtsearchdet[i]
              );
            }
          }
          localStorage.setItem("menuArray", JSON.stringify(menuArray));
        })
        .then(function () {
          _this.detail.userid = _this.username
          //localStorage.setItem('userId', _this.username)

          _this.pushMenuRouter();
        })
        .catch(function (xhr, type, errorThrown) {
          _this.disabled = false
          _this.loginStatus = '登陆'
          if (xhr.status === 0) {
            mui.alert("网络异常(错误码" + xhr.status + ")", "前台提示");
            return;
          }
          if (xhr.status >= 500) {
            MessageBox.alert(
              "服务器异常(错误码" + xhr.status + ")",
              "前台提示"
            );
            return;
          }
          mui.alert("客户端异常(错误码" + xhr.status + ")", "前台提示");
        });
    },
    pushMenuRouter() {
      //this.$router.push("/menu");
      var _this = this
      localStorage.setItem("userName", JSON.stringify(_this.username));
      app.storeUserInfo(JSON.stringify(_this.detail));
      this.$router.push({
        path: "/menu",
        query: {
          timesindex: '1'
        }
      });
    },
    downloadAPK() {
      let downloadTask = plus.downloader.createDownload(
        global.context.downloadUrl,
        {},
        function (downloaded, status) {
          if (status == 200) {
            plus.runtime.install(downloaded.filename);
          } else {
            mui.alert("下载失败.", "提示");
          }
        }
      );
      downloadTask.addEventListener(
        "statechanged",
        function () {
          var downloadpercent = parseInt((downloadTask.downloadedSize / downloadTask.totalSize) * 100) + "%";
          document.getElementById('progressbar').style.left = downloadpercent;
          if (downloadpercent === "100%") {
            this.showProgress = false;
            mui.toast("下载成功.");
          }
        }, true);
      downloadTask.start();
    },
    ajaxAutoUpdate() {
      console.log('1')
      let _this = this;
      this.axios
        .post(global.context.url + "/autoUpdate", {})
        .then(e => {
          console.log(e.data.d)
          let data = JSON.parse(e.data.d);
          if (data.canpass == "false") {
            mui.alert("服务器APK文件已删除,请联系管理员。", "前台提示");
            return;
          }
          console.log(_this.version)
          console.log(data.mark.toUpperCase())
          if (
            data.state.toLowerCase() == "yes" &&
            data.mark.toUpperCase() != _this.version
          ) {
            console.log('3')
            var btnArray = ['否', '是'];
            mui.confirm('存在新版本，是否更新', '前台提示', btnArray, function (e) {
              if (e.index == 1) {
                _this.showProgress = true;
                _this.downloadAPK();
                return;
              } else {
              }
            });
            console.log('4')
          } else {
          }
        })
        .catch(function () { });
    }
  },
  activated() {
    // this.showDomainsDiv = false
  },
  created() {
    var _this = this
    _this.version = global.context.version
    _this.local = global.context.subTitle
    console.log(localStorage.getItem("userName"))
    _this.username = JSON.parse(localStorage.getItem("userName") ? localStorage.getItem("userName") : '')
    _this.seesionID = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
    setTimeout(() => {
      _this.ajaxAutoUpdate()
    }, 200);
  },

  computed: {

  }
};
</script>


<style scoped>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.input-Vfield img {
	position: absolute;
	left: 0.13rem;
	top:0.13rem;
	width: 0.18rem;
	height: 0.18rem;
}
.input-Vfield {
	position: relative;
	width: 100%;
	height: 0.45rem;
}
.input-Vfield span{
	display: block;
	position: absolute;
	left: 0.13rem;
	width: 3.19rem;
	height: 1px;
	background: #EEECF7;
}
.input-Vfield input{
	
	background-color: transparent;
	border: none;
	border-radius: 0;
	padding: 0;
	margin-bottom: 0px;
	box-shadow: none;
	outline: none;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	position: absolute;
	width: 2.98rem;
	height: 0.45rem;
	left: 0.35rem;
	caret-color:#3B58D4;
}
.input-Vfield input:nth-of-type(1){
	/* border-bottom: 1px solid #EEECF7; */
}
.input-Vfield input::placeholder{
	padding-left: 0.05rem;
	font-size:0.12rem;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(198,203,224,1);
}
.blue {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #FFFFFF;
}

.mwhite {
	position: relative;
	width:100%;
	height: 1.41rem;
	margin-top: 0.32rem;
}
.mwhite img{
	position: absolute;
	width: 1.85rem;
	height: 1.41rem;
	right: 0;
}
.mwhite p{
	position: absolute;
	width:1.68rem;
	height:0.13rem;
	font-size:0.13rem;
	font-family:PingFangSC-Ultralight, sans-serif;
	font-weight:600;
	color:rgba(51,51,51,1);
	line-height:0.13rem;
	top: 1.2rem;
	left: 0.3rem;
}
.hiLogo{
	position: absolute;
	width: 0.38rem;
	height: 0.38rem;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 22px 5px rgba(58,92,214,0.1);
	border-radius:50%;
	left: 0.25rem;
	top: 0.66rem;
	text-align: center;
	font-size:0.24rem;
	font-family:PingFang SC;
	font-weight:600;
	color:rgba(59,88,212,1);
	line-height:0.38rem;
}
.myF {
	position: relative;
	margin-top: 0.19rem;
	margin-left: 0.16rem;
	width:3.45rem;
	height:0.91rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(238, 236, 247, 1);
	box-shadow:0 2px 18px 1px rgba(59,88,212,0.08);
}

.mlogin {
	margin-top: 0.28rem;
	margin-left: 0.15rem;
	  width: 3.45rem;
	  height: 0.45rem;
	  background: #3B58D4;
	  border-radius:1px;
}
.mlogin button{
	width: 3.45rem;
	height: 0.45rem;
	background: #3B58D4;
	text-align: center;
	color: #fff;
	font-size:0.16rem;
	font-family:PingFang SC;
	font-weight:600;
	color:rgba(255,255,255,1);
}

.mver {
	  position: absolute;
	  bottom: 0.38rem;
	  width: 100%;
	  text-align: center;
	  font-size: 0.9rem;
	font-size:0.11rem;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(198,203,224,1);
	height: 0.11rem;
}
.mve {
  position: absolute;
  bottom: 0.21rem;
  width: 100%;
    text-align: center;
    font-size: 0.9rem;
  font-size:0.11rem;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(198,203,224,1);
  height: 0.11rem;
}

.popover-bg {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(101, 112, 107, 0.2);
}

.popover-bg .popover-inner {
  width: 2.19rem;
  height: 0.88rem;
  position: absolute;
  left: 0.78rem;
  top: 2.54rem;
  z-index: 101;
  border: 1px solid #EEECF7;
  background-color: #ffffff;
  border-radius: 1;
  opacity: 1;
}

.popover-bg .title {
  text-align: center;
  padding-top: 0.24rem;
  font-size: 0.12rem;
}
</style>


