(function (win) {
  var WeakUpApp = win.WeakUpApp = function (appUrl, downLoadUrl) {
    if (!(this instanceof WeakUpApp)) return new WeakUpApp(appUrl, downLoadUrl);
    this.appUrl = appUrl || 'weixin://';
    //this.downloadUrl = downLoadUrl || 'http://www.affbs.cn/html/app/discovery/android/share.html';
    this.downloadUrl = downLoadUrl || 'http://www.affbs.cn/html/app/xiazai.html';
    this.init();
  };
  WeakUpApp.prototype = {
    init: function () {
      this.openApp();
    },
    openApp: function () {
      var ua = navigator.userAgent.toLocaleLowerCase(),
        deviceVersion = 0,
        version = null,
        openAppType = "";
      var href = window.location.href + "?appinstall=0&type=MainActivity&tip=1";
      // 如果是在微信、QQ内部点击打开
      if ((/(micromessenger|weibo|nettype|mobile mqq)/g).test(ua)) {
        this.openApp = null;
        return;
      }
      if (href.indexOf("type") == -1) {
        this.openApp = null;
        return;
      }

      // 判断终端设备类型
      // openAppType == 'newType' 表示为 IOS>=9.0 和 android chrome浏览器
      // openAppType == 'pc' 表示为 PC 端
      if (version = navigator.userAgent.match(/iPhone OS\s*(\d+)/)) { // IOS设备的浏览器
        deviceVersion = version[1] || 0;
        openAppType = deviceVersion - 9 >= 0 ? 'newType' : '';
      } else if (version = navigator.userAgent.match(/Android\s*(\d+)/)) { // Android设备的浏览器
        if (/chrome\/*(\d+)/g.test(ua) || /huawei/g.test(ua) || /OS/g.text(ua)) {
          openAppType = 'newType';
        }
        if (/mqq/g.test(ua)) { //QQ
          openAppType = ""
        }
      } else {
        openAppType = "pc";
      }

      if (openAppType == "pc") {
        this.openApp = function () {
          alert("请您在移动端的浏览器查看该页面!");
        };
      } else if (openAppType == "newType") {
        this.openApp = function () {
          var history = window.history;
          /* ifr = document.createElement('iframe');
           ifr.src = this.downloadUrl;
           ifr.style.cssText = 'z-index:9999;border:none;width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;display:none;background-color:#fff';*/
          var box = document.createElement('div');
          box.className = "download";
          box.style.width = "100%";
          box.style.position = "fixed";
          box.style.left = "0";
          box.style.top = "0";
          box.style.bottom = "0";
          box.style.background = "#fff";
          box.style.zIndex = "9999";
          var img = document.createElement("img");
          img.src = "http://www.affbs.cn/html/app/share/img/topbg.jpg";
          img.className = "head-img"
          box.appendChild(img);
          var a = document.createElement("a");
          a.className = "download_href"
          a.innerHTML = "下载亚洲财经商学院";
          box.appendChild(a);
          //document.getElementsByTagName("main")[0].style.display="none"
          document.body.appendChild(box);

          var downloadbox = document.getElementById("download");
          if (downloadbox) {
            downloadbox.style.display = "none";
          }

          if (!navigator.userAgent.match(/iPhone OS\s*(\d+)/)) {

            // document.body.appendChild(ifr);
            a.setAttribute('href', 'http://v4oss.affta.cn/affbs001/androidApp/BusinessSchool_v3125c46.apk');
          } else {
            a.setAttribute('href', 'https://itunes.apple.com/cn/app/ya-cai-shang-xue-yuan/id1104200038?mt=8');
          }



          /**修复移动端webkit内核popstate的自动触发问题**/
          var bool = false;
          setTimeout(function () {
            bool = true;
          }, 800);
          window.addEventListener("popstate", function () {
            if (bool) {
              // ifr.style.display = 'none';
              box.style.display = "none"
            }
          }, false);
          /**********************************************/
          this.openApp = function () {
            location.href = this.appUrl;
            // history.pushState({}, "APP下载链接页", "");
            //ifr.style.display = 'block';
            box.style.display = "block";
          };
          this.openApp();
        };
      } else {
        window.location.href = "http://www.affbs.cn/html/app/xiazai2.html";
        // ios<9 或 android 设备，使用计算时差的方案
        // 注意: 部分Android 机型不支持唤醒
        // 使用iframe跳转scheme, 是因为在Android部分机型上，location.href = scheme会直接跳转到一个错误页
        var checkOpen = function (cb) {
          var _clickTime = +(new Date()),
            _count = 0,
            intHandle = 0;
          // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
          intHandle = setInterval(function () {
            _count++;
            var elsTime = +(new Date()) - _clickTime;
            if (_count >= 100 || elsTime > 3000) {
              clearInterval(intHandle);
              //计算结束，根据不同，做不同的跳转处理，0表示已经跳转APP成功了
              if (elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(0);
              } else {
                cb(1);
              }
            }
          }, 20);
        };
        var _this = this;
        this.openApp = function () {
          var ifr = document.createElement('iframe');
          ifr.src = this.appUrl;
          ifr.style.display = 'none';
          checkOpen(function (opened) {
            if (opened === 1) {
              window.location.href = "http://www.affbs.cn/html/app/xiazai2.html";
            }
          });
          document.body.appendChild(ifr);
          setTimeout(function () {
            document.body.removeChild(ifr);
          }, 2000);
        };
      }
      this.openApp();
    }
  };
})(window);

// 根据location的serach中的参数，获取scheme值
var shareUrl = window.location.href + "?appinstall=0&type=MainActivity&tip=1",
  queryArray = shareUrl.indexOf('?') > -1 ? shareUrl.split('?')[1].split('&') : null,
  scheme,
  type,
  cid,
  uid,
  jrid;
if (queryArray) {
  for (var i = 0, length = queryArray.length; i < length; i++) {
    var key = queryArray[i].split('=')[0];
    if (key == 'type') {
      type = queryArray[i].split('=')[1];
    } else if (key == 'cid') {
      cid = queryArray[i];
    } else if (key == 'uid') {
      uid = queryArray[i];
    } else if (key == "jrid") {
      jrid = queryArray[i];
    }
  }
  if (type && cid) {

    if (uid && jrid) {
      //alert(uid)
      scheme = 'shangxueyuan://' + type + '/?' + cid + '/?' + uid + '/?' + jrid;
    } else {
      scheme = 'shangxueyuan://' + type + '/?' + cid;
    }

  }
} else {
  type = "MainActivity";
  scheme = 'shangxueyuan://' + type;
}
type = "MainActivity";
scheme = 'shangxueyuan://' + type;
// 执行WeakUpApp函数
//WeakUpApp(scheme);