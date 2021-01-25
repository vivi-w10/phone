<template>
	<view>
		<view class="nav-title">{{title}}</view>
		<view class="question-box">
			<uni-collapse :accordion="true">
				<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation" :num="item.num">
					<text class="content">{{ item.content }}</text>
				</uni-collapse-item>
				
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			
			const listData = [{
					data: []
				},	
			]
			return {
				title:'常见问题',
				list: listData,
				accordion: [{
						id: 0,
						num:'1',
						title: '邮寄机器的快递费用如何计算？',
						content: '一般情况下快递费用均由平台承担（不包括保价费用），用户只需要寄送到付的快递（手机类产品运费平台承担上限20元内，笔记本上限40元，超出上线部分将会在打款时扣除相应金额）。',
						animation: true
					},
					{
						id: 1,
						num:'2',
						title: '什么时候可以收到钱？',
						content: '内容内容内容',
						animation: true
					},
					{
						id: 2,
						num:'3',
						title: '发货地址怎么写？',
						content: '内容内容内容',
						animation: true
					}
				],
				extraIcon: {
					color: '#4cd964',
					size: '26',
					type: 'image'
				},
				id: 2
			}
		},
		methods: {
			change(e) {}
		}
	}
</script>

<style>
	.nav-title{
		text-align: center;
		line-height: 100upx;
		color: #444444;
		border-bottom: 1px solid #f3f3f3;
	}
	.question-box{
		padding: 30upx;
	}

	

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	.content {
		padding: 15px;
		font-size: 14px;
		line-height: 20px;
		background-color: #f9f9f9;
		color: #666;
	}
</style>

