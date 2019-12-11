// miniprogram/pages/search/search.js
Page({
  data: {
    result: [],
    name: ''
  },
  loadGoods: function() {
    var goods = ['奶粉成人', '咖啡', '咖啡豆', '豆浆'];
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
  }
})