//index.js
const app = getApp()

Page({
  data: {

  },
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  coupon: function() {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  }
})