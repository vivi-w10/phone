<template>
	<view>
		<view class="user-bg">
			<view class="user" style="text-align: center;color: #fff;">
				<view class="user-face"><image :src="user.avatar" mode="aspectFill"></image></view>
				<button v-if="!showName" class="user-name" open-type="getAuthorize" scope="userInfo" @getAuthorize="onGetAuthorize" @error="onAuthError">点击登录</button>
				<text v-if="showName">{{ user.nickName }}</text>
			</view>
		</view>
		<view class="user-content">
			<navigator class="user-box" :url="item.url" v-for="(item, index) in userInfo">
				<image :src="item.icon" mode="aspectFit" class="user-box-icon"></image>
				<view class="user-box-item">{{ item.title }}</view>
			</navigator>
		</view>

		<view class="order-box">
			<view class="order-title">近期订单</view>
			<view class="order-list">
				<!-- 订单 -->
				<view class="order-box-main" v-for="(item, id) in orderList" :key="id">
					<view class="order-box-top">
						<text>订单号：{{ item.orderId }}</text>
						<text style="color: #F24544;">{{ item.orderStatus }}</text>
					</view>
					<view class="order-box-content">
						<image :src="item.productImg" mode="aspectFit" class="order-img"></image>
						<view class="order-info">
							<view class="goodname">{{ item.productName }}</view>
							<view class="good-info">{{ item.productImei }}</view>
						</view>
						<view class="order-good-price">
							<view class="">回收价</view>
							<view class="price">
								<text>¥</text>
								{{ item.totalMoney }}
							</view>
						</view>
					</view>
					<view class="order-btn">
						<view class="order-del" @tap="orderDelete">删除订单</view>
						<view class="order-open" @click="goto('../order/order')">查看详情</view>
					</view>
				</view>
				<!-- //订单为空 -->
				<view class="empty" v-if="orderList.length <= 0">
					<image src="../../static/user4.png" mode="aspectFit" class="empty-img"></image>
					<view class="order-list-text">
						一个订单也没有，
						<text style="color: red;" @click="goto('../index/index')">逛逛</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '../../components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			type: 'center',
			showName: false,
			user: {
				avatar: '../../static/user-face.png',
				nickName: '用户名'
			},
			userInfo: [
				{
					icon: '../../static/user3.png',
					title: '全部订单',
					url: '/pages/orderList/orderList'
				},
				{
					icon: '../../static/user1.png',
					title: '个人资料',
					url: '/pages/user-info/user-info'
				}
			],
			orderList: []
		};
	},
	onLoad(options) {
		var that = this;
		uni.getStorage({
		    key: 'token',
		    success: function (res) {
		        console.log(res.data);
				if(res.data){
					that.loadingOrder(res.data);
				}
		    }
		});
		// 查看是否授权
		uni.getSetting({
			success(res) {
				console.log(res);
				if (res.authSetting.userInfo) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					uni.getUserInfo({
						success: function(res) {
							console.log(res);
							// console.log(res.userInfo)
							that.showName = true;
							that.user = {
								nickName: res.userInfo.nickName, //昵称
								avatar: res.userInfo.avatarUrl //头像
							};
						}
					});
				} else {
					uni.showModal({
						title: '登录提示',
						content: '您还未登录，请登录！',
						success: function(res) {
							if (res.confirm) {
								//that.onGetAuthorize()  
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		});

		// uni.checkSession({
		// 	//检测当前用户的session_key是否过期
		// 	success: function() {
		// 		//session_key 未过期，并且在本生命周期一直有效
		// 		console.log('授权未过期');
		// 		return;
		// 	},
		// 	fail: function() {
		// 		//session_key 已经失效，需要重新执行登录流程
		// 		console.log('授权过期');

		// 	}
		// });
	},
	methods: {
		orderDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.orderList = [];
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		loadingOrder(token) {
			var _that = this;
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			console.log(token);
			uni.request({
				url: _that.serverHostUrl + '/api/app/order/queryMyOrdersRecently?token=' + token + '&timestamp=' + timestamp + '&nonce=' + nonce,
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						_that.orderList = res.data.recentlyOrderList
					}
				},
				fail: function(res) {
					console.log('fail:' + JSON.stringify(res));
				}
			});
		},
		goto(path) {
			uni.navigateTo({
				url: path
			});
		},
		onGetAuthorize() {
			var _that = this;
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			uni.login({
				provider: 'alipay',
				success: function(loginRes) {
					console.log(loginRes); // 获取用户信息
					console.log(loginRes.authCode);
					console.log(nonce);
					var authcode = loginRes.authCode;
					uni.request({
						url: _that.serverHostUrl + '/api/app/alipay/auth?authcode=' + authcode + '&timestamp=' + timestamp + '&nonce=' + nonce,
						method: 'GET',
						success: res => {
							console.log(res);
							if (res.data.code == 0) {
								_that.serverToken = res.data.token;
								uni.setStorage({
									key: 'token',
									data: res.data.token
								});
								_that.loadingOrder(res.data.token);
							} else {
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									success: function(res) {
										if (res.confirm) {
										} else if (res.cancel) {
										}
									}
								});
							}
						},
						fail: function(res) {
							console.log('fail:' + JSON.stringify(res));
						}
					});
					uni.getUserInfo({
						provider: 'alipay',
						success: function(infoRes) {
							console.log('用户信息');
							console.log(infoRes);
							_that.user = {
								nickName: infoRes.userInfo.nickName, //昵称
								avatar: infoRes.userInfo.avatarUrl //头像
							};
							_that.showName = true;
						}
					});
				}
			});
		},
		onAuthError() {}
	}
};
</script>

<style>
.user-bg {
	height: 300upx;
	background: linear-gradient(#ff3b3a, #ff641f);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.user-face {
	width: 120upx;
	height: 120upx;
	overflow: hidden;
	border-radius: 50%;
	margin: 20upx auto;
	text-align: center;
	box-shadow: 0px 5px 10px #a32323;
}

.user-name {
	color: #fff;
	font-size: 15px;
	height: 30px;
	line-height: 30px;
	background-color: #007aff;
	border: none;
	padding: 0 16px;
}

.user-content {
	display: flex;
	justify-content: center;
	margin-top: 0upx;
	box-shadow: 0px 0px 10px #eee;
	padding: 30upx 0;
}

.user-box {
	width: 50%;
	text-align: center;
	border-right: 1px solid #eee;
}

.user-box-icon {
	width: 60upx;
	height: 60upx;
}

.user-box-item {
	font-size: 28upx;
}

.order-box {
	margin: 50upx 0upx;
}

.order-title {
	padding-left: 30upx;
	border-left: 6px solid #fed22b;
	margin-top: 30px;
	color: #444444;
}

.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 60upx 30upx;
}

.empty-img {
	width: 160upx;
	height: 160upx;
}

.order-list-text {
	font-size: 28upx;
	margin: 30upx;
}

.order-box-main {
	border-top: 6px solid #f3f3f3;
	margin-top: 40upx;
	padding: 30upx 30upx 0 30upx;
}

.order-box-top {
	border-bottom: 1px solid #f3f3f3;
	padding-bottom: 30upx;
	display: flex;
	justify-content: space-between;
}
.order-box-content {
	display: flex;
	padding: 20upx 0;
}
.order-img {
	width: 160upx;
	height: 160upx;
}
.order-info {
	margin: 0 20upx;
	width: 360upx;
}
.goodname {
	margin: 10upx 0;
}
.good-info {
	color: #999;
	font-size: 30upx;
}
.order-good-price {
	font-size: 28upx;
	color: #999;
	margin: 10upx 0;
}
.price {
	color: red;
	font-weight: bold;
	font-size: 40upx;
	margin-top: 6upx;
}
.order-btn {
	display: flex;
	border-top: 1px solid #f3f3f3;
	justify-content: flex-end;
	padding: 20upx 0 0;
}
.order-del {
	border-radius: 50px;
	padding: 0 40upx;
	height: 70upx;
	line-height: 70upx;
	font-size: 16px;
	border: 1px solid #fed22b;
	background: #fff;
	color: #935009;
	margin-right: 20upx;
}
.order-open {
	border-radius: 50px;
	padding: 0 40upx;
	height: 70upx;
	line-height: 70upx;
	font-size: 16px;
	background: #fed22b;
	color: #935009;
}
</style>
