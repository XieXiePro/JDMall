// miniprogram/pages/coupon/coupon.js
Page({
  data: {
    currentTab: 0,
    coupons: []
  },
  onLoad: function(options) {
    var coupons = this.loadCoupons(0);
    this.setData({
      coupons: coupons
    });
  },
  switchNav: function(e) {
    var page = this;
    var index = e.target.dataset.current;
    if (this.data.currentTab == index) {
      return false;
    } else {
      page.setData({
        currentTab: index
      });
    }
    var coupons = this.loadCoupons(index);
    page.setData({
      coupons: coupons
    });
  },
  loadCoupons: function(flag) {
    var coupons = new Array();
    var coupon = new Object();
    coupon.id = "1";
    coupon.price = "200";
    coupon.condition = "满200可用";
    coupon.way = "全平台";
    coupon.date = "2019.3.22-2019.12.22";
    coupon.type = "0";
    coupons.push(coupon);

    var coupon2 = new Object();
    coupon2.id = "2";
    coupon2.price = "200";
    coupon2.condition = "满200可用";
    coupon2.way = "全平台";
    coupon2.date = "2019.3.22-2019.12.22";
    coupon2.type = "0";
    coupons.push(coupon2);

    var coupon3 = new Object();
    coupon3.id = "3";
    coupon3.price = "200";
    coupon3.condition = "满200可用";
    coupon3.way = "全平台";
    coupon3.date = "2019.3.22-2019.12.22";
    coupon3.type = "1";
    coupons.push(coupon3);

    var coupon4 = new Object();
    coupon4.id = "4";
    coupon4.price = "200";
    coupon4.condition = "满200可用";
    coupon4.way = "全平台";
    coupon4.date = "2019.3.22-2019.12.22";
    coupon4.type = "2";
    coupons.push(coupon4);

    var coupon5 = new Object();
    coupon5.id = "5";
    coupon5.price = "200";
    coupon5.condition = "满200可用";
    coupon5.way = "全平台";
    coupon5.date = "2019.3.22-2019.12.22";
    coupon5.type = "2";
    coupons.push(coupon5);

    var result = new Array();
    for (var i = 0; i < coupons.length; i++) {
      if (flag == coupons[i].type) {
        result.push(coupons[i]);
      }
    }
    return result;
  }
})