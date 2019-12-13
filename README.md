# 仿京东商城小程序项目

&emsp;&emsp;最近学习使用小程序开发开发了一款仿京东商城小程序效果如下：

![仿京东商城](https://upload-images.jianshu.io/upload_images/2783386-110651950cab335a.gif?imageMogr2/auto-orient/strip)


&emsp;&emsp;仿京东商城小程序基本实现首页搜索、商品分类列表、购物车等功能，项目结构如下：

![项目结构](https://upload-images.jianshu.io/upload_images/2783386-fe75a628092aa568.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;购物车功能示例，在pages下创建shoppingCart.wxml文件：

```
<!--miniprogram/pages/shoppingCart/shoppingCart.wxml-->
<view class="content">
  <view class="info">
    <view class="items">
      <checkbox-group bindchange="checkboxChange">
        <block wx:for="{{orders}}">
          <view class="item">
            <view class="icon">
              <checkbox value="{{item.id}}" checked="{{selected}}"></checkbox>
            </view>
            <view class="pic">
              <image src="{{item.pic}}" style="width:70px;height:70px;"></image>
            </view>
            <view class="odrer">
              <view class="title">{{item.name}}</view>
              <view class="priceInfo">
                <view>￥</view>
                <view class="price">{{item.price}}</view>
                <view class="minus" id="{{item.id}}" bindtap="minusGoods">-</view>
                <view class="count">{{item.count}}</view>
                <view class="add" id="{{item.id}}" bindtap="addGoods">+</view>
              </view>
            </view>
          </view>
          <view class="line"></view>
        </block>
      </checkbox-group>
      <checkbox-group bindchange="checkAll">
        <view class="all">
          <view>
            <checkbox checked="{{selectedAll}}" />
          </view>
          <view class="selectAll">
            全选
          </view>
          <view>
            合计：
          </view>
          <view class="total">
            {{totalPrice}}
          </view>
          <view>
            元
          </view>
          <view class="opr" bindtap="order">选好了</view>
        </view>
      </checkbox-group>
    </view>
  </view>
</view>
```

&emsp;&emsp;样式shoppingCart.wxss:

```
/* miniprogram/pages/shoppingCart/shoppingCart.wxss */

.content {
  font-family: "Microsoft YaHei";
  height: 200px;
  background-color: #f9f9f9;
}

.backgroud {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.hr {
  height: 12px;
  background-color: #f9f9f9;
}

.address {
  height: 25px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}

.desc {
  line-height: 42px;
  padding-left: 10px;
  font-size: 15px;
  color: #f00;
}

.detail {
  position: absolute;
  right: 10px;
  line-height: 42px;
}

.info {
  background-color: #fff;
}

.sscs {
  text-align: center;
}

.line {
  border: 1px solid #ccc;
  opacity: 0.2;
}

.receive {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.time {
  display: flex;
  flex-direction: row;
}

.left {
  width: 50%;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
}

.right {
  width: 50%;
  text-align: left;
  font-size: 15px;
  color: #5dafed;
  font-weight: bold;
  margin-right: 20px;
}

.freight {
  font-size: 13px;
  margin-right: 20px;
}

.detail2 {
  position: absolute;
  right: 10px;
  line-height: 60px;
}

.items {
  padding-bottom: 120rpx;
}

.item {
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
}

.item_name {
  margin: 10px;
  padding: 10px;
  width: 400rpx;
}

.item_img {
  margin: 10px;
  padding: 10px;
}

.order {
  height: 87px;
}

.title {
  font-size: 15px;
}

.priceInfo {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  width: 400rpx;
}

.pic {
  margin: 10px;
}

.price {
  width: 80%;
  font-size: 15px;
  color: #f00;
  text-align: left;
}

.minus, .add {
  border: 1px solid #ccc;
  width: 30px;
  color: #f00;
  text-align: center;
}

.count {
  margin-left: 10px;
  margin-right: 10px;
  width: 50%;
  text-align: center;
}

.all {
  padding-left: 10px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
  border-top: 1px solid #f5f5f5;
  background: #fff;
}

.selectAll {
  width: 20%;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}

.total {
  width: 20%;
  font-size: 15px;
  color: #f00;
  font-weight: bold;
}

.opr {
  position: absolute;
  right: 0px;
  width: 92px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  background-color: #ff3000;
  height: 60px;
  text-align: center;
  line-height: 60px;
}

/*隐藏滚动条*/

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
```

&emsp;&emsp;购物车实现的功能主要有选择商品，加减商品数量、全选、反选、结算等，实现逻辑如下：

```
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
        if (count >= 2) {
          order.count = count - 1;
        }else{
          wx.showToast({
            title: '宝贝不能再减少了哦',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
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
```


### 完整代码见GitHab：[仿京东商城小程序](https://github.com/XieXiePro/JDMall)
