<template>
	<view>
		<view class="history">
			<view class="history-box">
				<image src="../../static/icon1.png" mode="aspectFit" class="history-img"></image>
				<view class="history-text">
					选择机型
				</view>
			</view>
			<view class="history-box">
				<image src="../../static/icon2.png" mode="aspectFit" class="history-img"></image>
				<view class="history-text">
					免费估价
				</view>
			</view>
			<view class="history-box">
				<image src="../../static/icon3.png" mode="aspectFit" class="history-img"></image>
				<view class="history-text">
					下单发货
				</view>
			</view>
			<view class="history-box">
				<image src="../../static/icon4.png" mode="aspectFit" class="history-img"></image>
				<view class="history-text">
					验货打款
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.history-box{
		text-align: center;
		width:23% ;
	}
	.history-img{
		width: 60upx;
		height: 60upx;
	}
	.history-text{
		font-size: 28upx;
		color: #333;
		margin: 10upx 0;
	}
	.history{
		padding: 30upx;	
		display: flex;
		width: 100%;
	}
	
</style>
