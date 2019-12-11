//index.js
const app = getApp()

Page({
  data: {

  },

  onLoad: function() {

  },
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})