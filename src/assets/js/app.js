import mui from "./mui.min"
const app = {}
//该方法用于存储用户信息
app.storeUserInfo = function (str) {
  if (typeof str !== 'string') throw 'str is not a string!'
  localStorage.setItem('userMsg', str)
}
app.chgDoma = function (domainNow) {
  if (typeof domainNow !== 'string') throw 'str is not a string!'
  localStorage.setItem("domainNow", domainNow);
}
app.deelData = function (data1, data2) {
  if (typeof data1 !== 'string' || typeof data2 !== 'string') throw "请输入字符串"
  return data1.toLowerCase().trim() === data2.toLowerCase().trim() ? true : false
}
app.center = function (vue) {
  vue.$router.push({
    path: '/usercenter',
    query: {
      timesindex: '999'
    }
  })
}
app.back = function (vue) {
  vue.$store.commit('delAlive')
  vue.$router.go(-1)
}
app.fail = function (a, b, c, fn) {
  mui.alert('异常:(状态码' + a.status + ')', '前台提示', function () {
    fn && fn();
  })
}
app.userMsg = function () {
  return JSON.parse(localStorage.getItem("userMsg"));
}
app.domainNow = function () {
  return localStorage.getItem('domainNow') || app.log("当前域为空");
}
app.getDate = function () {
  var curTime = '';
  var vdate = new Date();
  var years = vdate.getFullYear().toString();
  var months = vdate.getMonth() + 1;
  var datev = vdate.getDate();
  curTime += years + '-' + (months < 10 ? '0' + months : months) + '-' + (datev < 10 ? '0' + datev : datev);
  return curTime;
}
app.getProgressDate = function (str) {
  if (str === "01/01/001") {
    str = ""
  }
  return str ? "20" + str.split("/")[2] + "/" + str.split("/")[0] + "/" + str.split("/")[1] : ""
}
app.refreshDetail = function (res) {
  res.forEach(it => it.detail.forEach(item => item.content = ""))
}
app.isOnline = function () {
  let status = (!!window.plus ? plus.networkinfo.getCurrentType() : 4);
  if (status === 0 || status === 1) {
    return false
  }
  return true
}
app.getDBData = function (vue, tableName) {
  let result = []
  console.log(tableName)
  vue.$indexDB.cat(tableName, null, function (event, tempArray) {
    if (event.type === 'error') {
      mui.toast('读取本地缓存出错')
    } else if (event.type === 'complete') {
      console.log(tempArray)
      result = tempArray
    }
    return result
  })
}
app.getTime = function () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds();
  return currentdate;
}
app.changeToOnlineStatus = function (vue) {
  console.log('切换到在线')
  vue.$store.dispatch('commitOnlineStatusDescribe', '在线')
  vue.$store.dispatch('commitOnlineStatusIconColor', 'green')
}
app.changeToOfflineStatus = function (vue) {
  console.log('切换到离线')
  vue.$store.dispatch('commitOnlineStatusDescribe', '离线')
  vue.$store.dispatch('commitOnlineStatusIconColor', 'red')
}
app.offlineAjax = function (data, apiName, vue, onlineFunction, offlineFunction, failFunction) {
  if (global.context.onlineStatus === 2) {
    offlineFunction()
  } else {
    vue.mask = true
    mui.ajax({
      type: "post",
      url: global.context.webUrl + '/' + apiName,
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      dataType: 'json',
      contentType: 'application/json,charset=UTF-8',
      setTimeout: global.context.ajaxTimesOut,
      success: function (e) {
        // console.log(e)
        let result = JSON.parse(e.d)
        console.log(result)
        vue.mask = false
        if (result.isoffline === 'True') {
          mui.alert('异地登陆', '前台提示', function () {
            vue.$destroy();
            vue.$router.push("/")
          })
          return;
        }
        if (result.canpass === 'null') {
          global.context.sendRequestTimes++
          if (global.context.sendRequestTimes < 3) {
            app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
          } else if (global.context.sendRequestTimes === 3) {
            global.context.onlineStatus = 1
            global.context.webUrl = global.context.webUrlB
            if (global.context.backStageAjaxStatus === 0) {
              global.context.backStageAjaxStatus = 'A'
              app.connectServicer(vue)
            } else {
              app.connectServicer(vue)
            }
            app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
          } else if (global.context.sendRequestTimes < 6) {
            app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
          } else {
            global.context.onlineStatus = 2
            global.context.sendRequestTimes = 0
            app.changeToOfflineStatus(vue)
            offlineFunction(e)
            if (global.context.backStageAjaxStatus === 0) {
              global.context.backStageAjaxStatus = 'A'
            } else { }
          }
        } else {
          if (result.canpass === 'False') {
            mui.alert(result.errormessage ? result.errormessage : '系统异常，请稍后重试', '后端报错')
            failFunction()
            return;
          }
          global.context.sendRequestTimes = 0
          onlineFunction(result)
        }
      },
      error: function () {
        vue.mask = false
        //   global.context.sendRequestTimes++
        //   if (global.context.sendRequestTimes < 3) {
        //     app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
        //   } else if (global.context.sendRequestTimes === 3) {
        //     global.context.onlineStatus = 1
        //     global.context.webUrl = global.context.webUrlB
        //     if (global.context.backStageAjaxStatus === 0) {
        //       global.context.backStageAjaxStatus = 'A'
        //       app.connectServicer(vue)
        //     } else {
        //       app.connectServicer(vue)
        //     }
        //     app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
        //   } else if (global.context.sendRequestTimes < 6) {
        //     app.offlineAjax(data, apiName, vue, onlineFunction, offlineFunction)
        //   } else {
        //     global.context.onlineStatus = 2
        //     global.context.sendRequestTimes = 0
        //     offlineFunction()
        //     app.changeToOfflineStatus(vue)
        //     if (global.context.backStageAjaxStatus === 0) {
        //       global.context.backStageAjaxStatus = 'A'
        //     } else { }
        //   }
      }
    })
  }

}
app.connectServicer = function (vue) {
  if (global.context.onlineStatus === 1) {
    mui.ajax({
      type: "post",
      url: global.context.webUrlA + '/HelloWorld',
      data: {},
      beforeSend: function (xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      dataType: 'json',
      contentType: 'application/json,charset=UTF-8',
      setTimeout: global.context.ajaxTimesOut,
      success: function (e) {
        let result = JSON.parse(e.d)
        if (result.isoffline === 'True') {
          mui.alert('异地登陆', '前台提示', function () {
            vue.$destroy();
            vue.$router.push("/")
          })
          return;
        }
        if (result.canpass === 'null') {
          setTimeout(() => {
            app.connectServicer()
          }, global.context.cycleTime);
        } else {
          console.log('回到在线')
          app.changeToOnlineStatus(vue)
          global.context.onlineStatus = 0
          global.context.backStageAjaxStatus = 0
          global.context.webUrl = global.context.webUrlA
        }

      },
      error: function () {
        setTimeout(() => {
          app.connectServicer(vue)
        }, global.context.cycleTime);
      }
    })
  } else {
    if (global.context.backStageAjaxStatus === 'A') {
      mui.ajax({
        type: "post",
        url: global.context.webUrlA + '/HelloWorld',
        data: {},
        beforeSend: function (xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        setTimeout: global.context.ajaxTimesOut,
        success: function (e) {
          let result = JSON.parse(e.d)
          if (result.isoffline === 'True') {
            mui.alert('异地登陆', '前台提示', function () {
              vue.$destroy();
              vue.$router.push("/")
            })
            return;
          }
          if (result.canpass === 'null') {
            global.context.backStageAjaxStatus = 'B'
            setTimeout(() => {
              app.connectServicer(vue)
            }, global.context.cycleTime);
          } else {
            console.log('回到在线')
            app.changeToOnlineStatus(vue)
            global.context.backStageAjaxStatus = 0
            global.context.onlineStatus = 0
            global.context.webUrl = global.context.webUrlA
          }
        },
        error: function () {
          global.context.backStageAjaxStatus = 'B'
          setTimeout(() => {
            app.connectServicer(vue)
          }, global.context.cycleTime);
        }
      })
    } else {
      mui.ajax({
        type: "post",
        url: global.context.webUrlB + '/HelloWorld',
        data: {},
        beforeSend: function (xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        setTimeout: global.context.ajaxTimesOut,
        success: function (e) {
          let result = JSON.parse(e.d)
          if (result.isoffline === 'True') {
            mui.alert('异地登陆', '前台提示', function () {
              vue.$destroy();
              vue.$router.push("/")
            })
            return;
          }
          if (result.canpass === 'null') {
            global.context.backStageAjaxStatus = 'A'
            setTimeout(() => {
              app.connectServicer(vue)
            }, global.context.cycleTime);
          } else {
            console.log('回到在线')
            app.changeToOnlineStatus(vue)
            global.context.backStageAjaxStatus = 0
            global.context.onlineStatus = 1
            global.context.webUrl = global.context.webUrlB
            app.connectServicer(vue)
          }
        },
        error: function () {
          global.context.backStageAjaxStatus = 'A'
          setTimeout(() => {
            app.connectServicer(vue)
          }, global.context.cycleTime);
        }
      })
    }
  }
}
/*}
  dataUpload:传递的数据
  api:调用的api的名字
  suc:成功的方法
  err:失败的方法
  vue:当前vue实例
  fnInFalse：canpass为false的回掉
  fnInOnline:isoffline为true的回掉
*/
app.ajax = function (dataExt, api, suc, err, vue, fnInFalse, fnInOnline) {
  if (!app.isOnline()) {
    mui.alert('请连接到网络', '前台提示')
    return

  }
  var dataBase = {
    userid: app.userMsg().userid,
    corp: app.userMsg().corp,
    domain: app.domainNow(),
    seesionID: app.userMsg().sessionid,
  };
  let data = JSON.stringify(dataBase).replace(/}$/, "") + JSON.stringify(dataExt).replace(/^{/, ",")
  mui.ajax({
    type: "post",
    url: global.context.webUrl + '/' + api,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    data: data,
    dataType: 'json',
    contentType: 'application/json,charset=UTF-8',
    success: function (e) {
      var rtdt = JSON.parse(e.d);
      app.log(rtdt)
      if (rtdt.isoffline === 'true') {
        mui.alert('异地登陆', '前台提示', function () {
          fnInOnline && fnInOnline()
          vue.$destroy();
          vue.$router.push("/")
        })
        return;
      }
      if (rtdt.canpass == 'false') {
        mui.alert(rtdt.errormessage || '系统异常，请稍后重试.', "后台提示", function () {
          fnInFalse && fnInFalse();
        });
        return;
      }
      suc && suc(rtdt)
    },
    error: function (xhr, type, errorThrown) {
      app.fail(xhr, type, errorThrown, err)
    }
  });
}
app.init = function (vue) {
  vue.header ? '' : vue.header = vue.$router.history.current.query.name;
  mui.back = function () {
    return
  }
  vue.$store.commit('addAlive', vue.$options.name)
}
app.addBack = function (fun) {
  mui.plusReady(function () {
    plus.key.addEventListener('backbutton', fun, false);
    // plus.key.addEventListener('menubutton', __menu, false);
  })
}
app.removeBack = function (fun) {
  mui.plusReady(function () {
    plus.key.removeEventListener('backbutton', fun, false);
    // plus.key.addEventListener('menubutton', __menu, false);
  })
}
app.log = function (str) {
  global.context.environment === "test" ? console.log(str) : "";
}
export default app
