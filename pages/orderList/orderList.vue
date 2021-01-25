<template>
	<view>
		<view class="order-title">
			近期订单
		</view>
		<view class="order-list">
			<!-- 订单 -->
			<view class="order-box-main"  v-for="(item,id) in orderList" :key="id">
				<view class="order-box-top">
					<text>订单号：{{item.orderId}}</text>
					<text style="color: #F24544;">{{item.orderStatus}}</text>
				</view>
				<view class="order-box-content">
					<image :src="item.goodImg" mode="aspectFit" class="order-img"></image>
					<view class="order-info">
						<view class="goodname">{{item.productName}}</view>
						<view class="good-info">
							{{item.productImei}}
						</view>
					</view>
					<view class="order-good-price">
						<view class="">回收价</view>
						<view class="price">
							<text>¥</text>{{item.totalMoney}}
						</view>
					</view>
				</view>
				<view class="order-btn">
					<view class="order-del" @tap="orderDelete">删除订单</view>
					<view class="order-open" @click="open">查看详情</view>
				</view>
		
			</view>
			<!-- //订单为空 -->
			<view class="empty" v-if="orderList.length<=0">
				<image src="../../static/user4.png" mode="aspectFit" class="empty-img"></image>
				<view class="order-list-text">
					一个订单也没有，<text style="color: red;">逛逛</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[],
			}
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
		},
		methods: {
			orderDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.orderList = [];	
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			open(){
				uni.navigateTo({
					url:"../order/order"
				})
			},
			loadingOrder(token) {
				var _that = this;
				var timestamp = 1585060428065;
				var nonce = Math.floor(Math.random() * 1001) + timestamp;
				console.log(token);
				uni.request({
					url: _that.serverHostUrl + '/api/app/order/queryMyOrders?token=' + token + '&timestamp=' + timestamp + '&nonce=' + nonce + '&page=1'+ '&limit=20',
					method: 'GET',
					success: res => {
						console.log(res.data.page.list);
						if (res.statusCode == 200) {
							_that.orderList = res.data.page.list
						}
					},
					fail: function(res) {
						console.log('fail:' + JSON.stringify(res));
					}
				});
			}
		}
	}
</script>

<style>
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
	.order-box-content{
		display: flex;
		padding: 20upx 0;
		
		
	}
	.order-img{
		width: 160upx;
		height:160upx;
	}
	.order-info{
		margin:0 20upx;
		width: 360upx;
	}
	.goodname{
		margin: 10upx 0;
	}
	.good-info{
		color: #999;
		font-size: 30upx;
	}
	.order-good-price{
		font-size: 28upx;color: #999;
		margin: 10upx 0;
	}
	.price{
		color: red;
		font-weight: bold;
		font-size: 40upx;
		margin-top: 6upx;
	}
	.order-btn{
		display: flex;
		border-top: 1px solid #f3f3f3;
		justify-content:flex-end ;
		padding: 20upx 0 0;
	}
	.order-del{
		border-radius: 50px;
		padding: 0 40upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 16px;
		border: 1px solid #fed22b;
		background: #fff;
		color: #935009;
		margin-right:20upx;
	}
	.order-open{
		border-radius: 50px;
		padding: 0 40upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 16px;
		background: #fed22b;
		color: #935009;
	}
</style>
