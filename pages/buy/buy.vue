<template>
	<view>
		<view class="good-title">{{ Title }}</view>
		<view style="height: 110upx;"></view>
		<view class="form-box">
			<form @submit="formSubmit" @reset="formReset">
				<view class="form-item">
					<view class="title">联系电话</view>
					<input class="uni-input" name="telNumber" v-model="order.phone" placeholder="请输入……" />
					<text class="getYzm" @click="getYzm">获取验证码</text>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">验证码</view>
					<input class="uni-input" v-model="order.validateMsg" name="nickname" placeholder="请输入验证码" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">收款方式</view>
					<radio-group name="gender" @change="getmoneyType">
						<label>
							<radio value="1" checked class="radio" style="transform:scale(0.7)" />
							<text>支付宝</text>
						</label>
						<label>
							<radio value="2" class="radio" style="transform:scale(0.7)" />
							<text>银行卡</text>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="title">收款账号</view>
					<input class="uni-input" v-model="order.account" name="nickname" placeholder="请输入……" />
				</view>
				<!-- <view class="form-item">
					<view class="title">联系电话</view>
					<input class="uni-input"  v-model="order.phone" name="nickname" placeholder="请输入……" />
				</view> -->
				<view class="form-item">
					<view class="title">收款人</view>
					<input class="uni-input" v-model="order.userName" name="nickname" placeholder="请输入……" />
				</view>
				<view class="form-item">
					<view class="title">序列号</view>
					<input class="uni-input" v-model="order.productImei" name="nickname" placeholder="请输入……" />
				</view>
			</form>
			<view class="serialnumber">
				<uni-icons type="help" size="20" color="#ba871c"></uni-icons>
				<text type="primary" @click="toggle('center')">查看序列号</text>

				<!-- <uni-popup id="popup" ref="popup" :type="type" :animation="true" @change="change">
					<view class="popup-content">
						<view class="serialnumber-info">
							{{serialnumber}}
						</view>
					</view>
				</uni-popup> -->
			</view>
			<view class="Servicetreaty">
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />
						我已阅读并同意
						<text style="color: #18B566;">《服务条款》</text>
					</label>
				</checkbox-group>
			</view>
			<view class="sumbit" @click="sumbit">立即下单</view>
		</view>
		<view class="remind">注意：{{ remind }}</view>
	</view>
</template>

<script>
import uniPopup from '../../components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			Title: '',
			token: '',
			order: {
			  "account": "收款账号",
			  "additionMsg": "备注",
			  "date": "2020-04-04",
			  "email": "ssss@dd.com",
			  "getmoneyType": "1",
			  "nonce": "32323420980708",
			  "paramOptionIds": "116,117",
			  "phone": "15325224223",
			  "productFrom": "机器来源",
			  "productId": "5069c5d4-79b8-4622-9804-d9d263d2cb30",
			  "productImei": "序列号/IMEI",
			  "repairStore": "回收网点",
			  "serviceType": "1",
			  "time": "18:04:32",
			  "timestamp": 1585449626690,
			  "totalMoney": 505.5,
			  "userName": "收款人",
			  "validateMsg": "346343"
			}
		};
	},
	onLoad(option) {
		var _that = this;
		var resultData = JSON.parse(decodeURIComponent(option.resultData));
		this.order.productId = resultData.productId;
		this.Title = resultData.title;
		this.order.totalMoney = resultData.totalPrice;
		uni.getStorage({
			key: 'token',
			success: function(res) {
				console.log(res.data);
				_that.token = res.data;
			}
		});
	},
	methods: {
		sumbit() {
			console.log(this.order);
			var _that = this;
			// if (!/^1[3456789]\d{9}$/.test(_that.order.phone)) {
			// 	uni.showToast({
			// 	    title: '请输入正确的手机号码'
			// 	});
			// 	return;
			// }
			// if (_that.order.validateMsg == "") {
			// 	uni.showToast({
			// 	    title: '请输入验证码'
			// 	});
			// 	return;
			// }
			// if (_that.order.account == "") {
			// 	uni.showToast({
			// 	    title: '请输入收款账号'
			// 	});
			// 	return;
			// }
			// if (_that.order.userName == "") {
			// 	uni.showToast({
			// 	    title: '请输入收款人'
			// 	});
			// 	return;
			// }
			// if (_that.order.productImei == "") {
			// 	uni.showToast({
			// 	    title: '请输入序列号'
			// 	});
			// 	return;
			// }
			console.log(_that.token);
			var nonce = Math.floor(Math.random() * 1001) + _that.order.timestamp;
			_that.order.nonce = nonce;
			var params = JSON.stringify(_that.order);
			console.log(params);
			uni.request({
				url: _that.serverHostUrl + '/api/app/order/addOrder',
				method: 'POST',
				header: {
					"content-type": "application/json;charset=utf-8",
					"token": _that.token
				},
				dataType: 'json',
				data: {
					appOrder:params,
				},
				success: res => {
					console.log('提交结果！');
					console.log(res);
					if (res.statusCode == 200) {
						uni.showToast({
							title: '订单已提交'
						});
					} else {
					}
				},
				fail: function(res) {
					uni.showToast({
						title: '订单提交失败'
					});
				}
			});
		},
		getYzm() {
			var _that = this;
			if (!/^1[3456789]\d{9}$/.test(_that.order.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码'
				});
				return;
			}
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			//手机验证码
			uni.request({
				url: _that.serverHostUrl + '/api/app/order/sendMessage?timestamp=' + timestamp + '&nonce=' + nonce + '&phone=' + _that.telNumber,

				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						if (res.data.code == 500) {
							uni.showToast({
								title: res.data.msg
							});
						} else {
						}
					} else {
					}
				},
				fail: function(res) {
					console.log('fail:' + JSON.stringify(res));
				}
			});
		},
		getmoneyType(e) {
			this.order.getmoneyType = e.detail.value;
		},
		uploadData() {
			//
		},
		toggle(type) {
			// this.type = type
			// this.$refs.popup.open()
			uni.showModal({
				title: '如何查看序列号/IMEI',
				content: '手机在拨号界面输入*#06#，即可查看imei,平板在设置-关于本机，即可查看序列号/IMEI，新机可从包装盒查看（部分双卡手机会有两个IMEI，通常以第一个为准）',
				success: function(res) {
					if (res.confirm) {
						//console.log('用户点击确定');
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		change(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
		}
	}
};
</script>

<style>
.form-box {
	margin: 30upx;
}
.form-item {
	margin: 20upx 0;
	position: relative;
}
.getYzm {
	position: absolute;
	right: 50rpx;
	top: 106rpx;
	color: #f0ad4e;
}
.title {
	color: #444444;
	padding: 20upx;
}
.uni-input {
	background: #f3f3f3;
	padding: 26upx;
	border-radius: 6px;
	font-size: 28upx;
	width: 90%;
}
.radio {
	margin: 0 30upx;
}
.serialnumber {
	color: #ba871c;
	text-align: right;
	line-height: 70upx;
	font-size: 28upx;
}
.sumbit {
	line-height: 80upx;
	margin: 40upx 30upx;
	background: #fed22b;
	color: #9b6d0b;
	text-align: center;
	border-radius: 6px;
}
.remind {
	margin: 30upx;
	padding: 30upx;
	font-size: 28upx;
	color: #999;
	line-height: 60upx;
}
.serialnumber-info {
	background: #fff;
	border-radius: 6px;
	padding: 40upx;
	width: 500upx;
	text-align: center;
	color: #444;
	font-size: 36upx;
}
</style>
