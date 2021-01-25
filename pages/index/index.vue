<template>
	<view style="width: 100%; overflow: hidden;">
		<navbar></navbar>
		<!-- banner开始 -->
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index" class="banner">
					<view class="swiper-item"><image :src="item.banner" mode="aspectFit" class="banner-info"></image></view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- banner结束 -->
		<!-- 回收品类 start -->
		<view class="recycl-list">
			<text class="recycl-list-title">{{ recyclTitle }}</text>
			<text class="more" @click="more">更多品类</text>
		</view>
		<view class="recovery">
			<view class="recovery-box recovery-left" @click="gotoPage(0)">
				<view class="recovery-list">
					<image src="../../static/img1.png" mode="aspectFit" class="brand-img"></image>
					<view class="text">{{goodsType[0].typeName}}</view>
				</view>
				<view class="brand">
					<view class="brand-logo" v-for="(item,index) in logoPhone" :key="index" v-if="index < 4">
						<image :src="item" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="recovery-right">
				<view class="recovery-box-right" @click="gotoPage(1)">
					<image src="../../static/imf2.png" mode="aspectFit" class="brand-img2"></image>
					<view class="text1">{{goodsType[1].typeName}}</view>
				</view>
				<view class="recovery-box-right" @click="gotoPage(2)">
					<image src="../../static/img3.png" mode="aspectFit" class="brand-img2"></image>
					<view class="text1">{{goodsType[2].typeName}}</view>
				</view>
			</view>
		</view>

		<!-- 回收品类 end -->

		<view class="recycl-list">
			<text class="recycl-list-title">{{ HotTitle }}</text>
			<text class="more" @click="more">更多机型</text>
		</view>
		<view class="hot">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
				<view class="scroll-view-item_H" v-for="(item, index) in hotList" @click="open(item.productId)">
					<view class="hot-list">
						<image :src="item.img" mode="aspectFit" class="list-img"></image>
						<view class="hot-list-title">{{ item.title }}</view>
						<view class="hot-list-text">
							最高回收价
							<text class="price">￥{{ item.price }}</text>
						</view>
						<button type="default" class="btn-content">立即回收</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 回收流程 -->
		<view class="recycl-list">
			<text class="recycl-list-title">{{ historyTitle }}</text>
			<text class="more" @click="message">常见问题</text>
		</view>

		<flow></flow>

		<!-- footer-box -->
		<view class="footer-box">
			<navigator class="info" url="../guide/guide">
				<uni-icons type="help" size="26" color="#999"></uni-icons>
				<text class="info-text">回收指南</text>
			</navigator>
			<navigator class="info" url="../question/question">
				<uni-icons type="chat" size="24" color="#999"></uni-icons>
				<text class="info-text">常见问题</text>
			</navigator>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	components: { uniSwiperDot },
	data() {
		return {
			info: [
				{
					banner: '../../static/banner.png'
				},
				{
					banner: '../../static/banner.png'
				},
				{
					banner: '../../static/banner.png'
				}
			],
			goodsType:[],
			logoPhone:[],
			hotList: [],
			current: 0,
			mode: 'default',
			recyclTitle: '回收品类',
			HotTitle: '热门机型',
			historyTitle: '回收流程',
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	onLoad() {
		this.loadingData();
	},
	methods: {
		loadingData(){
			var _that=this;
			var timestamp =  1585060428065;
			var nonce = Math.floor(Math.random()*1001) + timestamp;
			
			//产品列表
			uni.request({
				url: _that.serverHostUrl + '/api/app/product/queryProductList?timestamp='+timestamp+'&nonce='+nonce,
				success: (res) => {
					//console.log(res);
					if(res.statusCode == 200 ){
						var data = res.data.page.list;
						_that.hotList = [];
						for(var i=0;i<data.length;i++){
							_that.hotList.push({
								productId: data[i].productId,
								img: data[i].productImg,
								title: data[i].productName,
								price: data[i].maxMoney
							})
						}
					}else{
						console.log("数据调取失败！")
					}
					
				},
				fail: function(res) {
					console.log("fail:" + JSON.stringify(res));
				}
			});
			
			//分类
			uni.request({
				url: _that.serverHostUrl + '/api/app/producttype/queryProductFirstTypeList?timestamp=' + timestamp + '&nonce=' + nonce,
				success: res => {
					if (res.statusCode == 200) {
						//console.log(res.data);
						_that.goodsType = res.data.typeList;
						
						//初始加载手机logo
						_that.onClickItem(_that.goodsType[0].typeId);
						
					} else {
						console.log('数据调取失败！');
					}
				}
			});
		},
		onClickItem(typeId) {
			var _that = this;
			//点击获取二级分类
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			
			uni.request({
				url: _that.serverHostUrl + '/api/app/producttype/getSecondListByFirTypeid?timestamp=' + timestamp + '&nonce=' + nonce + '&firstTypeId=' + typeId,
				success: res => {
					//console.log(res.data.typeList);
					if (res.statusCode == 200) {
						var data = res.data.typeList;
						_that.logoPhone = [];
						for (var i = 0; i < data.length; i++) {
							_that.logoPhone.push(data[i].typeLogo);
						}
					} else {
						console.log('数据调取失败！');
					}
				},
				fail: function(res) {
					console.log('fail:' + JSON.stringify(res));
				}
			});
		},
		
		//分类页面跳转
		gotoPage(current){
			//console.log(current);
			uni.reLaunch({
				url: '/pages/list/list?current='+current,
			});
		},
		change(e) {
			this.current = e.detail.current;
		},
		more() {
			uni.switchTab({
				url: '/pages/list/list'
			});
		},

		scroll: function(e) {
			//console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		goTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		},
		message() {
			uni.navigateTo({
				url: '../question/question'
			});
		},
		open(productId) {
			uni.navigateTo({
				url: '../goodContent/goodContent?productId=' + productId
			});
		}
	}
};
</script>

<style>
.banner {
	text-align: center;
	width: 750upx;
}
.banner-info {
	width: 710upx;
	height: 340upx;
}
.recycl-list {
	margin: 40upx 30upx;
	display: flex;
	justify-content: space-between;
}
.recycl-list-title {
	font-weight: bold;
	color: #444444;
}
.more {
	color: #fac2a1;
}
.recovery {
	background: #f3f3f3;
	padding: 30upx 30upx 16upx;
	display: flex;
}
.recovery-box {
	background: #fff;
	border-radius: 10upx;
	padding: 30upx 30upx;
}
.recovery-box-right {
	background: #fff;
	border-radius: 10upx;
	padding: 30upx 30upx;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	height: 65upx;
	margin-bottom: 14upx;
	justify-content: left;
	flex-wrap: nowrap;
	align-items: center;
}
.recovery-left {
	width: 50%;
	height: 200upx;
	overflow: hidden;
}
.recovery-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 20upx;
}
.text {
	font-size: 40upx;
	color: #444444;
	margin-left: 40upx;
}
.text1 {
	font-size: 30upx;
	color: #444444;
	margin-left: 40upx;
	flex-wrap: nowrap;
}
.brand {
	flex-direction: row;
	display: flex;
	justify-content: center;
}
.brand-img {
	display: flex;
	width: 60upx;
	height: 80upx;
	margin-left: 40upx;
}
.brand-img2 {
	display: flex;
	width: 80upx;
	margin-left: 0upx;
}
.brand-logo {
	display: flex;
	width: 50upx;
	height: 50upx;
	margin: 30upx 20upx 0upx;
}
.recovery-right {
	display: flex;
	flex-direction: column;
	margin-left: 20upx;
}
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}
.scroll-view-item_H {
	display: inline-block;
	width: 46%;
	text-align: center;
	font-size: 36rpx;
	height: 430upx;
	margin-right: 50upx;
}
.hot {
	background-color: #f3f3f3;
	padding: 30upx;
}
.hot-list {
	border-radius: 10px;
	background: linear-gradient(135deg, #fff, #fff0f7);
	padding: 20upx;
	box-shadow: 0px 2px 10px #ccc;
}
.list-img {
	width: 160upx;
	height: 160upx;
}
.hot-list-title {
	font-size: 36upx;
	font-weight: bold;
	margin: 10upx 0;
}
.hot-list-text {
	font-size: 30upx;
	color: #666;
}
.price {
	color: red;
}
.btn-content {
	margin: 20upx 0;
	border: 0;
	border-radius: 30px;
	background: linear-gradient(#ffae7f, #ff7245);
	color: #fffaeb;
	font-weight: bold;
	height: 60upx;
	line-height: 60upx;
	box-shadow: 0px 5px 10px #ffa289;
}

.footer-box {
	background: #f3f3f3;
	padding: 30upx;
	display: flex;
	align-items: center;
	height: 50upx;
	justify-content: center;
}
.info {
	margin: 0 30upx;
	display: flex;
	align-items: center;
	color: #999;
	font-size: 28upx;
}
.info-text {
	padding: 0 20upx;
}
</style>
