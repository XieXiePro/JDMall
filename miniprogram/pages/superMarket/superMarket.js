// miniprogram/pages/superMarket/superMarket.js
Page({
  data: {
    currentTab: 0,
    flag: 0
  },
  switchNav: function(e) {
    console.log(e);
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  }
})