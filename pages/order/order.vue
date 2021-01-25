<template>
	<view>
		<view class="good-title">
			{{Title}}
		</view>
		<view style="height: 110upx;"></view>
		<view class="good-img">
			<image :src="goodImg" mode="aspectFit"></image>
			
		</view>
		<view class="order-title">
			{{ordertitle}}
		</view>
		<view class="order-box">
			<view class="order-list-list" v-for="item in orderList">
				<text>【{{item.name}}】：</text>
				<text>{{item.orderValue}}</text>
			</view>
		</view>
		<view class="order-title">
			{{phoneInfo}}
		</view>
		<view class="order-box">
			<view class="order-list-list" v-for="item in phoneList">
				<text>【{{item.name}}】：</text>
				<text>{{item.phoneValue}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Title:'三星Galaxy Note8',
				goodImg:'../../static/img7.png',
				ordertitle:'订单信息',
				phoneInfo:'机器信息',
				orderList:[{
					name:'订单编号',
					orderValue:'202013546987745'
				},{
					name:'机器型号',
					orderValue:'苹果 11'
				},{
					name:'下单时间',
					orderValue:'2020-11-12  12:20'
				},{
					name:'系统股价',
					orderValue:'¥1146.00'
				},{
					name:'活动加价',
					orderValue:'¥00.00'
				},{
					name:'收款方式',
					orderValue:'支付宝'
				},{
					name:'收款账户',
					orderValue:'*海涛'
				}
				],
				phoneList:[{
					name:'内存',
					phoneValue:'6+128G'
				},{
					name:'网络制式',
					phoneValue:'全网通'
				},{
					name:'颜色',
					phoneValue:'黑色'
				},{
					name:'购买渠道',
					phoneValue:'大陆国行'
				},{
					name:'保修情况',
					phoneValue:'保修一个月以上'
				},{
					name:'机身外观',
					phoneValue:'外壳有划痕/变形'
				},{
					name:'维修情况',
					phoneValue:'无维修情况'
				}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

	.good-img{
		width: 400upx;
		height: 400upx;
		text-align: center;
		margin: 20upx auto;
		display: flex;
		justify-content: center;
		
	}
	.order-title {
		padding-left: 30upx;
		border-left: 6px solid #fed22b;
		margin-top: 30px;
		color: #444444;
	}
	.order-box{
		margin: 30upx;
	}
	.order-list-list{
		line-height: 70upx;
		color: #999;
		
	}
</style>
