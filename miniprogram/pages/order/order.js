// miniprogram/pages/order/order.js
Page({
  data: {

  },
  myCoupon: function() {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  myShop: function() {
    wx.switchTab({
      url: '../superMarket/superMarket',
    })
  }
})