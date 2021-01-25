<template>
	<view>
		<view class="good-title">{{ goodTitle }}</view>
		<view style="height: 110upx;"></view>
		<view class="sku-page">
			<echone-sku
				:show="popupShow"
				mode="forbidden"
				:theme-color="themeColor"
				:combinations="combinations" 
				:productInfor="productInfor"
				:specifications="specifications"
				:default-select-index="selectedIndex"
				:combinations-props="combinationsProps"
				:specifications-props="specificationsProps"  
				:propsHelp="propsHelp" 
				@close="handleClose"
				@confirm="handleConfirm"
			></echone-sku>
		</view>
	</view>
</template>

<script>
import echoneSku from '@/components/echone-sku/echone-sku';

var _this;
export default {
	components: {
		echoneSku
	},
	data() {
		return {
			goodTitle: '',
			themeColor: '#feea49',
			popupShow: false,
			combinationsProps: {
				id: 'skuId',
				value: 'skuValue',
				price: 'skuPrice'
			},
			specificationsProps: {
				id: 'id',
				list: 'skuList',
				name: 'skuName'
			},
			combinations: [
				{
					skuId: '1',
					skuValue: '6+256G,全网通',
					skuPrice: 80.0
				},
			],
			specifications: [],
			selectedIndex: -1,
			propsHelp: [],
			productInfor: []
		};
	},
	onLoad(option) {
		var productId = option.productId;
		this.initData(productId);
	},
	methods: {
		selectSku() {
			this.popupShow = true;
		},
		initData(productId) {
			var _that=this;
			var timestamp =  1585060428065;
			var nonce = Math.floor(Math.random()*1001) + timestamp;
			uni.request({
				url: _that.serverHostUrl + '/api/app/product/queryProductDetail?timestamp='+timestamp+'&nonce='+nonce+'&productId='+ productId,
				success: (res) => {
					if(res.statusCode == 200 ){
						//console.log(res);
						var data = res.data.appProduct;
						_that.goodTitle = data.productName;
						_that.combinations = data.paramsList;
						_that.specifications = [];
						_that.productInfor = {
							title: _that.goodTitle,
							productId: productId
						};
						for(var i=0;i<data.paramsList.length;i++){
							_that.specifications.push({
								skuName: data.paramsList[i].paramTitle,
								id: data.paramsList[i].paramId,
								skuList: data.paramsList[i].paramsOptionsList
							});
							
							if(data.paramsList[i].explaintext == undefined || data.paramsList[i].explaintext == null || data.paramsList[i].explaintext==""){
								_that.propsHelp.push({
									isShow: false,
									title: data.paramsList[i].skuName,
									img:data.paramsList[i].explainImg,
									txt:data.paramsList[i].explaintext
								})
							}else{
								_that.propsHelp.push({
									isShow: true,
									title: data.paramsList[i].skuName,
									img:data.paramsList[i].explainImg,
									txt:data.paramsList[i].explaintext
								})
							}
							
						}
						
					}else{
						console.log("数据调取失败！")
					}
				},
				fail: function(res) {
					console.log("fail:" + JSON.stringify(res));
				},
			});
		}
	}
};
</script>

<style>
.good-title {
	line-height: 100upx;
	text-align: center;
	font-size: 36upx;
	font-weight: bold;
	color: #444444;
	border-bottom: 1px solid #f3f3f3;
}
</style>
