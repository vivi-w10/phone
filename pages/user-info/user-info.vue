<template>
	<view>
		<view class="user-bg">
			<view class="user" style="text-align: center;color: #fff;">
				<view class="user-face"><image :src="user.avatar" mode="aspectFill"></image></view>
				<button v-if="!showName" class="user-name" open-type="getAuthorize" @getAuthorize="getAlPhoneNumber" @error="onAuthError" scope="phoneNumber">点击获取手机号</button>
				<text v-if="showName">{{ phoneNumber }}</text>
			</view>
		</view>
		<view class="info">绑定手机号：</view>
		<view class="info">{{ phoneNumber }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneNumber: '暂无授权',
			showName: false,
			user: {
				avatar: '../../static/user-face.png',
			}
		};
	},
	onLoad() {
		var that = this;
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
							that.user = {
								nickName: res.userInfo.nickName, //昵称
								avatar: res.userInfo.avatarUrl //头像
							};
						}
					});
				}
			}
		});
	},
	methods: {
		onAuthError(err) {
			console.log('err',err)
			uni.showToast({
				title: "需要您授权手机号码后领取哦~",
				icon: 'none',
				duration: 2000
			})
		},
		getAlPhoneNumber() {
			my.getPhoneNumber({
				scopes: "auth_user",
				success: res => {
					var resData = JSON.parse(res.response);
					console.log('res',resData)
					
				},
				fail: res => {
					uni.showToast({
						title: "需要您授权手机号码后领取哦~",
						icon: 'none',
						duration: 2000
					})
				}
			});
		},
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
.info {
	padding: 30upx;
	border-bottom: 1px solid #f3f3f3;
}
</style>
