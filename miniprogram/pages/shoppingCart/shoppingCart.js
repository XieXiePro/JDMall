// miniprogram/pages/shoppingCart/shoppingCart.js
Page({

  data: {
    orders: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0
  },
  onLoad: function(options) {
    this.loadOrders();
  },
  loadOrders: function() {
    //加载购物车商品订单信息
    var orders = wx.getStorageSync('goods');
    this.setData({
      orders: orders
    });
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      totalPrice += order.price * order.count;
    }
    this.setData({
      totalPrice: totalPrice
    });
  },
  checkboxChange: function(e) {
    console.log(e);
    var ids = e.detail.value;
    if (ids.length == 0) {
      this.setData({
        selectedAll: false
      });
    } else {
      this.setData({
        selectedAll: true
      });
    }
    var orders = wx.getStorageSync('goods');
    this.setData({
      orders: orders
    });
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      totalPrice += order.price * order.count;
    }
    this.setData({
      totalPrice: totalPrice
    });
  },
  checkAll: function(e) {
    //全选复选框
    var selected = this.data.selected;
    var result = selected == true ? false : true;
    this.setData({
      selected: result
    });
    if (result == false) {
      this.setData({
        totalPrice: 0
      });
      this.setData({
        selectedAll: false
      });
    } else {
      this.loadOrders();
      this.setData({
        selectedAll: true
      })
    }
  },
  minusGoods: function(e) {
    //减少商品
    var goods = wx.getStorageSync('goods');
    var id = e.currentTarget.id;
    console.log(id)
    var good = {}
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }
    console.log(good);
    var orders = wx.getStorageSync('goods');
    var addOrders = new Array();
    var add = true;
    this.setData({
      orders: orders
    });
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        order.count = count + 1;
        if (count >= 2) {
          order.count = count - 1;
        }
      }
      addOrders[i] = order;
    }
    wx.setStorageSync('goods', addOrders);
    this.loadOrders();
  },
  addGoods: function(e) {
    //添加商品
    var goods = wx.getStorageSync('goods');
    var id = e.currentTarget.id;
    var good = {}
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }
    console.log(good);
    var orders = wx.getStorageSync('goods');
    var addOrders = new Array();
    var add = true;
    this.setData({
      orders: orders
    });
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        order.count = count + 1;
        add = false;
      }
      addOrders[i] = order;
    }
    var len = orders.length;
    if (add) {
      good.count = 1;
      addOrders[len] = good;
    }
    wx.setStorageSync('goods', addOrders);
    this.loadOrders();
  },
  order: function() {
    wx.switchTab({
      url: '../order/order',
    })
  }
})