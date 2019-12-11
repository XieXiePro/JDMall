//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var goods = wx.getStorageInfoSync('goods');
    console.log(goods);
    if (goods) {
      goods = this.loadGoods();
      console.log(goods);
      wx.setStorageSync('goods', goods);
    }
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  loadGoods: function() {
    var goods = new Array();
    var good = new Object();
    good.id = "0";
    good.count = "1";
    good.pic = "../../assets/images/jd_bg.png";
    good.name = "蒙牛纯甄酸牛奶原味200ml";
    good.price = '5.5';
    good.type = 'mlik.supermarket';
    goods[0] = good;
    var good1 = new Object();
    good1.id = "1";
    good1.count = "1";
    good1.pic = "../../assets/images/jd_bg.png";
    good1.name = "娃哈哈AD钙奶";
    good1.price = '5.5';
    good1.type = 'mlik';
    goods[1] = good1;
    var good2 = new Object();
    good2.id = "2";
    good2.count = "1";
    good2.pic = "../../assets/images/jd_bg.png";
    good2.name = "伊利安慕希200ml";
    good2.price = '5.0';
    good2.type = 'mlik';
    goods[2] = good2;
    var good3 = new Object();
    good3.id = "3";
    good3.count = "1";
    good3.pic = "../../assets/images/jd_bg.png";
    good3.name = "手机1个";
    good3.price = '2000';
    good3.type = 'supermarket';
    goods[3] = good3;
    var good4 = new Object();
    good4.id = "4";
    good4.pic = "../../assets/images/jd_bg.png";
    good4.name = "美立方老北京汽水";
    good4.price = '4';
    good4.count = "1";
    good4.type = 'supermarket';
    goods[4] = good4;

    return goods;
  },
  globalData: {
    userInfo: null
  }
})