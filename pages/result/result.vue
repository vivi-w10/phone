<template>
	<view >
		<view class="good-title">
			{{resultData.title}}
		</view>
		<view style="height: 110upx;"></view>
		<view class="price">
			评估报价
			<view class="price-info">{{resultData.totalPrice}}<text>元</text></view>
		</view>
		<view class="good-props">
			<view class="good-props-list" v-for="item in resultData.desData">
				<text>【{{item.name}}】：</text>
				<text>{{item.PropsValue}}</text>
			</view>
		</view>
		<view class="remind">
			注意：{{remind}}
		</view>
		<button type="default" class="sell"  open-type="getAuthorize" @getAuthorize="getPhoneNumber" @error="onAuthError" scope='phoneNumber'>立即换钱</button>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				Title:'',
				remind:'请注意您选择的机器描述与实际情况一致，否则可能导致议价或退回。',
				resultData:[],
			}
		},
		onLoad(option) {
			this.resultData = JSON.parse(decodeURIComponent(option.resultData));
			console.log(this.resultData);
		},
		methods: {
			getPhoneNumber() {
				var resultData = encodeURIComponent(JSON.stringify(this.resultData));
				uni.navigateTo({
					url:"../buy/buy?resultData=" + resultData
				})
			    //   this.onGetAuthorize()
			    //     .then(res => {
			    //       // console.log(res)
			    //       var resData = JSON.parse(res.response);
			    //       // console.log(resData);
			    //       // 重新赋值方便后台获取
			    //       var params = {
			    //         phoneNumber: resData.response,
			    //         sign: resData.sign
			    //       };
			    //       console.log(params);
					  // var resultData = encodeURIComponent(JSON.stringify(this.resultData));
					  // params = encodeURIComponent(JSON.stringify(params));
					  // uni.navigateTo({
					  // 	url:"../buy/buy?resultData=" + resultData + '&phoneNum=' +  params
					  // })
			    //     })
			    //     .catch(err => {
			    //       console.log(err);
			    //     });
			    },
			    onGetAuthorize() {
			      return new Promise((resolve, reject) => {
			        my.getPhoneNumber({
			          scopes: "auth_user",
			          success: res => {
			            resolve(res);
			          },
			          fail: res => {
			            reject(res);
			          }
			        });
			      });
			    },
			    onAuthError() {
			      console.log("123321");
			    }
		}
	}
</script>

<style>
	
	.price{
		background: url(../../static/bg.png) no-repeat;
		text-align: center;
		padding: 100upx 0;
		background-size: 100%;
		height: 220upx;
		color: #ab5631;
		font-size: 36upx;
		font-weight: bold;
		position: relative;
	}
	.price-info{
		color: #fff;
		font-size: 60upx;
		font-weight: bold;
		margin: 30upx 0;
	}
	.good-props{
		background: rgba(205,185,124,0.2);
		border-radius:12px;
		padding: 30upx;
		margin: 30upx auto;
		width: 600upx;
		color: #856a4d;
		display: block;
		position: relative;
		left: 0;
		top: -90upx;
		right: 0;
		z-index: 1;
	}
	.good-props-list{
		line-height: 80upx;
	}
	.remind{
		margin: 30upx;
		padding: 30upx;
		font-size: 28upx;
		color: #999;
		line-height: 70upx;
	}
	.sell{
		background-color: #fed22b;
		height:80upx;
		line-height: 80upx;
		width: 500upx;
		margin: 0 auto 60upx;
		border-radius: 4px;
		text-align: center;
		color: #865610;
	}
	
	
</style>
