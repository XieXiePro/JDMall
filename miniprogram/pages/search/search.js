// miniprogram/pages/search/search.js
Page({
  data: {
    result: [],
    name: ''
  },
  loadGoods: function() {
    var goods = ['奶粉成人', '咖啡', '咖啡豆', '豆浆', '手机'];
    return goods;
  },
  searchGoods: function(e) {
    var name = e.detail.value;
    var goods = this.loadGoods();
    var result = new Array();
    if (name != '') {
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.indexOf(name) > -1) {
          result.push(good);
        }
      }
    }
    console.log(result);
    this.setData({
      result: result
    });
  },
  resetSearch: function() {
    var result = new Array();
    this.setData({
      result: result,
      name: ''
    });
  },
  searchHot: function(e) {
    console.log(e);
    var value = e.target.dataset.text; 
    var result = new Array();
    if (value != '') {
      result.push(value);
    }else{
      result.push("无此类数据");
    }
    console.log(result);
    this.setData({
      result: result
    });
  },
  shoppingCart: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})