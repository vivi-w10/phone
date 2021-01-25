<template>
	<view>
		<view class="navbar-position">
			<view class="navbar">
				<image src="../../static/logo.png" mode="aspectFit" class="navbar-logo"></image>
				<view class="navbar-search" @click="Homesearch">
					<uni-icons type="search" size="20" color="#000000"></uni-icons>
					<input class="navber-search-txt" type="text" placeholder="搜索您想要回收的产品型号" />
				
				</view>
			</view>
		</view>
		<view style="height: 110upx;"></view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons'
	export default {
		components:{uniIcons},
		data() {
			return {	
			};
		},
		methods:{
			Homesearch(){
				uni.navigateTo({
					url:'../../pages/search/search'
				})
			},
			
		}
	}
</script>

<style>
.navbar-position{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
}
.navbar{
	height: 110upx;
	border-bottom: 2px solid #f3f3f3;
	padding: 0 20upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	background: #fff;
	box-sizing: border-box;
	
}
.navbar-logo{
	width: 200upx;
	flex-shrink: 0;
}
.navbar-search{
	background: #f3f3f3;
	border-radius: 16upx;
	width: 440upx;
	padding: 8upx 20upx;
	margin-left: 20upx;
	justify-content: center;
	display: flex;
	align-items: center;
}
.navber-search-txt{
	color: #999;
	font-size: 24upx;
	margin-left: 10upx;
	background-color: #f3f3f3;
}
</style>
