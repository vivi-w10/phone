<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" 
					v-for="(item,index) in categoryList" 
					@click="categoryClickMain(item,index)" 
					:key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';border-left:3px solid'+activeBorder:''">
						<view class="brand">
							<image :src="item[brandSrc]" mode="aspectFit" class="brand-img"/>
							<!-- <image src="../../static/img5.png" mode="aspectFit" class="brand-img"></image> -->
						</view>
						<view>{{item[label]}}</view>
						
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<image :src="item[imgSrc]" />
						<view>{{item[label]}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#F24544'
			},
			activeBorder: {
				type: String,
				default: '#F24544'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			brandSrc: {
				type: String,
				default: 'brandSrc'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			}
		},
		
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
		height: 100%;
		
	}

	.nav-left-item {
		height: 140upx;
		font-size: 14px;
		display: flex;
		align-items: center;
		padding: 0 30upx;
	}
	.brand{
		width:80upx ;
		height: 50px;
		align-items: center;
		display: flex;
		text-align: left;
	}
	.brand-img{
	width: 100%;
	height: 50upx;
}
	.nav-right {
		width: 70%;
		height: 100%;
}

	.nav-right-item {
		width: 28%;
		height: 100px;
		float: left;
		text-align: center;
		padding: 5px;
		font-size: 13px;
	}

	.nav-right-item image {
		width: 50px;
		height: 50px;
	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
