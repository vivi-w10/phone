<template>
	<view class="content">
		<navbar></navbar>
		<view class="tab-box">
			<zzxTabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></zzxTabs>
		</view>
		<view>
			<view>
				<view class="list-content">
					<category
						:categoryList="categoryList"
						:subCategoryList="subCategoryList"
						@categoryMainClick="categoryMainClick"
						@categorySubClick="categorySubClick"
					></category>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import zzxTabs from '@/components/zzx-tabs/zzx-tabs.vue';
import category from '@/components/qiyue-category/qiyue-category.vue';
export default {
	components: {
		zzxTabs,
		category
	},
	data() {
		return {
			items:[],
			current: 0,
			categoryList: [],
			subCategoryList: []
		};
	},
	onLoad(option) {
		var _that = this;
		//console.log(option);
		var current = option.current;
		if(current == undefined ){
			_that.current = 0;
			current = 0;
		}else{
			_that.current = current;
		}
		this.loadingData();
	},
	methods: {
		loadingData() {
			var _that = this;
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			//一级分类
			uni.request({
				url: _that.serverHostUrl + '/api/app/producttype/queryProductFirstTypeList?timestamp=' + timestamp + '&nonce=' + nonce,
				success: res => {
					if (res.statusCode == 200) {
						_that.items = res.data.typeList;
						console.log(_that.items[_that.current]);
						//初始加载二级分类
						_that.onClickItem(_that.current);
					} else {
						console.log('数据调取失败！');
					}
				}
			});
		},

		categoryMainClick(category) {
			//点击加载产品
			this.loadingGoods(category.typeCode);
		},
		categorySubClick(category) {
			//console.log(category);
			//进入详情页
			var productId = category.productId;
			uni.navigateTo({
				url: '../goodContent/goodContent?productId=' + productId
			});
		},

		onClickItem(e) {
			var _that = this;
			//点击获取二级分类
			this.current = e;
			
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			var typeId = _that.items[e].typeId;
			uni.request({
				url: _that.serverHostUrl + '/api/app/producttype/getSecondListByFirTypeid?timestamp=' + timestamp + '&nonce=' + nonce + '&firstTypeId=' + typeId,
				success: res => {
					//console.log(res.data.typeList);
					if (res.statusCode == 200) {
						var data = res.data.typeList;
						_that.categoryList = [{
							brandSrc: "../../static/img4.png",
							name: "全部",
							typeCode: ''
						}];
						for (var i = 0; i < data.length; i++) {
							_that.categoryList.push({
								brandSrc: data[i].typeLogo,
								name: data[i].typeName,
								typeCode: data[i].typeCode
							});
						}
						_that.loadingGoods(_that.categoryList[e].typeCode);
						// _that.categoryList[e].subCategoryList;
					} else {
						console.log('数据调取失败！');
					}
				},
				fail: function(res) {
					console.log('fail:' + JSON.stringify(res));
				}
			});
		},
		loadingGoods(e) {
			//获取产品
			var _that = this;
			var timestamp = 1585060428065;
			var nonce = Math.floor(Math.random() * 1001) + timestamp;
			var typeCode = e;
			uni.request({
				url: _that.serverHostUrl + '/api/app/product/queryProductList?timestamp=' + timestamp + '&nonce=' + nonce + '&typeCode=' + typeCode,
				success: res => {
					if (res.statusCode == 200) {
						var data = res.data.page.list;
						_that.subCategoryList = [];
						for(var i=0;i<data.length;i++){
							_that.subCategoryList.push({
								"name":data[i].productName,
								"logo":data[i].productImg,
								"productId": data[i].productId
							})
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
		setMydot() {
			this.$refs.mytabs.setDot(0);
		},
		removeMydot() {
			this.$refs.mytabs.removeDot(0);
		}
	}
};
</script>
<style>
.list-content {
	margin-top: 90upx;
}
</style>
