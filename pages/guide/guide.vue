<template>
	<view>
		<view class="nav-title">{{title}}</view>
		<flow></flow>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'回收指南'
			}
		},
		methods: {
			
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
</style>
