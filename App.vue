<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	image{
		width: 100%;
		height:100%;
	}
	.good-title{
		line-height: 100upx;
		text-align: center;
		font-size: 36upx;
		font-weight: bold;
		color: #444444;
		position: fixed;
		z-index: 9;
		background: #fff;
		width: 100%;
		border-bottom: 1px solid #f3f3f3;
	}
</style>
