<template>
	<view class="sku-box">
		<view class="container">
			<view class="percent-box">
				<view class="box">
					<progress :percent="percentData" :stroke-width="strokeWidth" border-radius="60" :activeColor="activeColor"
					 :backgroundColor="backgroundColor" />
				</view>
			</view>
			<view class="perocent-position">
				<text>当前进度</text>
				<text>{{step}}/</text>
				<text>{{count}}</text>
			</view>
		</view>
		<scroll-view class="sku-list" scroll-y="true">
			<view class="sku-item container" v-for="(sku,sIndex) in data" :key="sku[speId]">
				<view>
					<view class="sku-name">{{sku[speName]}}</view>
					<view class="sku-content">

						<view class="sku-content-item" v-for="(item,index) in sku[speList]" :key="index" :style="{
										borderColor:  index===sku.sidx?'#ffd223':'#f3f3f3' ,
										color: index===sku.sidx?'#333333':'#333333' ,
										backgroundColor: index===sku.sidx?'#ffe88b':'#f3f3f3' }"
						 @click="selectSku(sIndex,index)">{{item.optionTitle}}
							<view class="help-position" v-if="propsHelp[index].isShow" @click.stop="toggle(index)">
								<uni-icons type="help" color="#f8b431" size="18"  ></uni-icons>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="confirm-btn" v-if="step===specifications.length" @click="result()">立即评估</view>
		<uni-popup id="popup" ref="popup" :type="type" :animation="true" @change="change">
			<view class="popup-content">
				<view class="help-content">
					<view class="help-content-close">	
						<uni-icons type="close" size="20" color="#000" @click="close"></uni-icons>
					</view>
				
					<view class="help-content-title">{{propsHelpText.title}}</view>
					<view class="help-content-img">
						<image :src="propsHelpText.img" mode="widthFix" ></image>
					</view>
					<view class="text">
						{{propsHelpText.txt}}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		filters: {
			toFixed2: function(value) {
				if (!value) return '0.00'
				return Number(value).toFixed(2)
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			themeColor: {
				type: String,
				default: '#feea49'
			},
			combinations: {
				type: Array,
				default () {
					return []
				}
			},
			specifications: {
				type: Array,
				default () {
					return []
				}
			},
			defaultSelectIndex: {
				type: Number,
				default: 0
			},
			combinationsProps: {
				type: Object,
				default () {
					return {
						id: 'id',
						value: 'value',
						image: 'image',
						price: 'price',
						stock: 'stock'
					}
				}
			},
			specificationsProps: {
				type: Object,
				default () {
					return {
						id: 'id',
						list: 'list',
						name: 'name'
					}
				}
			},
			propsHelp: {
				type: Array,
				default () {
					return []
				}
			},
			productInfor: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				id: '',
				title:'',
				buyCount: 1,
				selectedIndex: 0,
				borderWidth: uni.upx2px(2),
				mySpecifications: [],
				selectSkuInfo: {},
				data: [],
				value: 0,
				step: 0,
				count: 0,
				activeColor: "#feea49",
				backgroundColor: "#EBEBEB",
				strokeWidth: 14,
				percentData: 0,
				type: 'center',
				seen:'',
				propsHelpText:{}
			}
		},
		watch: {
			specifications(val) {
				this.initSkuData();
				this.count = this.specifications.length;
			}
		},
		computed: {
			speId() {
				return this.specificationsProps.id
			},
			speList() {
				return this.specificationsProps.list
			},
			speName() {
				return this.specificationsProps.name
			},
			cbValue() {
				return this.combinationsProps.value
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbStock() {
				return this.combinationsProps.stock
			}
		},
		created() {
			if (this.specifications.length) {
				this.initSkuData()
				this.count = this.specifications.length
			}
		},
		methods: {
			initSkuData() {
				if (this.defaultSelectIndex > -1) {
					this.selectedIndex = this.defaultSelectIndex
					this.selectSkuInfo = this.combinations[this.selectedIndex]
				}
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.data.push(this.mySpecifications[0])
				this.data.forEach((item, idx) => {
					//当前规格组合值
					if (this.defaultSelectIndex > -1) {
						const selects = this.combinations[this.selectedIndex][this.cbValue].split(',')
						//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
						const sIndex = item[this.speList].indexOf(selects[idx])
						this.$set(item, 'sidx', sIndex)
					} else {
						this.$set(item, 'sidx', -1)
					}
				})
				this.id = this.productInfor.productId;
				this.title = this.productInfor.title;
			},
			selectSku(sIndex, index) {
				this.data[sIndex].sidx = index
				if (this.step <= this.mySpecifications.length - 1) {
					this.step = sIndex + 1
				}
				this.percentData = (this.step / this.count) * 100
				const key = sIndex + 1
				if (key < this.mySpecifications.length) {
					if (this.value == sIndex) {
						++this.value
						this.data.push(this.mySpecifications[key])
						this.$set(this.data[key], 'sidx', -1)
					}
				}
				
			},
			result() {
				var desData = [];
				var totalPrice = 0;
				for(var i=0;i<this.data.length;i++){
					var sidx = this.data[i].sidx;
					desData.push({
						name: this.data[i].skuName,
						PropsValue: this.data[i].skuList[sidx].optionTitle
					})
					totalPrice = totalPrice + this.data[i].skuList[sidx].price
				}
				
				var resultData = {
					productId: this.id,
					title: this.title,
					totalPrice: totalPrice,
					desData: desData
				};
				console.log(resultData);
				resultData = encodeURIComponent(JSON.stringify(resultData));
				uni.navigateTo({
					url: "../../pages/result/result?resultData=" + resultData
				})
			},
			toggle(index) {
				console.log(this.propsHelp[index].img);
				if(this.propsHelp[index].img != null){
					this.propsHelpText = {
						title: this.propsHelp[index].title,
						img:this.propsHelp[index].img,
						txt:this.propsHelp[index].txt
					};
					this.$refs.popup.open();
				}
			},
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			close() {
				this.$refs.popup.close()
			},
		}
	}
</script>

<style>
	.box {
		width: 100%;
		position: relative;
		border-radius: 30px;
		overflow: hidden;
	}

	.flex-center {
		display: flex;
		align-items: center;
	}

	.flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fs-24 {
		font-size: 24upx;
	}

	.fs-26 {
		font-size: 26upx;
	}

	.fs-38 {
		font-size: 38upx;
	}

	.container {
		width: 750upx;
		margin: 0 auto;
		position: relative;

	}

	.percent-box {
		margin: 30upx;

	}

	.perocent-position {
		position: absolute;
		top: 0px;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 12px;
	}

	.sku-box {
		background-color: white;
		padding-bottom: 20upx;
		font-size: 28upx;
		color: #333333;
	}

	.sku-header {
		display: flex;
		padding: 40upx 0 20upx;
	}

	.sku-goods-info {
		margin-left: 20upx;
	}

	.sku-item {
		padding: 30upx 0;
	}

	.sku-name {
		font-size: 36upx;
		border-left: 6px solid #feea49;
		padding-left: 20px;
		font-weight: bold;
		color: #444444;
	}

	.sku-content {
		border-bottom: 2upx solid $page-bg-color-grey;
		padding: 20upx 0;
		flex-wrap: wrap;
		margin: 0 30upx;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.sku-content-item {
		padding: 16upx 0upx;
		border-radius: 6upx;
		border: 5upx solid transparent;
		margin: 20upx;
		width: 42%;
		background: #f3f3f3;
		position: relative;
	}

	.confirm-btn {
		background-color: #fed22b;
		height: 80upx;
		line-height: 80upx;
		width: 500upx;
		margin: 0 auto;
		border-radius: 4px;
		text-align: center;
		color: #865610;
	}

	.help-position {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.help-content{
		background: #fff;
		width: 75%;
		margin: 0 auto;
		position: relative;
	}
	.help-content-img{
		width: 90%;
		margin: 30upx 30upx 0 30upx;
	}
	.help-content-title{
		background: #fcce54;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		color: #444444;
		font-size: 32upx;	
	}
	.text{
		padding: 30upx;
	}
	.help-content-close{
		position: absolute;
		right: 20upx;
		top: 20upx;
	}
</style>
