//index.js
const app = getApp()

Page({
  data: {

  },
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})