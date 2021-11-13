<template>
	<view class="index">
		<view class="nav1">
			<view class="nav1-left">
				<image v-if='user' class="pic1" :src="user.avatar" mode=""></image>
				<image v-else class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
				<view v-if='user' class="tit1">
					<view class="tit1-1">
						<view class="txt1">{{user.nick_name}}</view>
						<view class="txt2">
							<image class="pic2" src="/static/image/zu18.png" mode=""></image>
							<view class="txt2-1">12枚</view>
						</view>
					</view>
					<view class="tit1-2">
						<image class="pic1" src="/static/image/huangguan.png" mode=""></image>
						<view class="txt1">暂无等级</view>
					</view>
				</view>
				<view class="tit2" @click="toLogin" v-else>请先登录</view>
			</view>
			<u-icon @click='toXiugaixinxi' name="arrow-right" color="#999999" size="28"></u-icon>
		</view>
		<view class="nav2">
			<view class="item">
				<image class="pic1" src="/static/image/duobianxin.png" mode=""></image>
				<view class="txt">
					<view class="txt1">服务质量分：<text class="yellow">4.9</text></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="heng"></view>
			<view class="item" @click="toJinengzhongxin">
				<image class="pic2" src="/static/image/weixiu.png" mode=""></image>
				<view class="txt">
					<view class="txt1">技能中心({{isRz}})</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="heng"></view>
			<view class="item" @click="toQianbao">
				<image class="pic1" src="/static/image/qianbao.png" mode=""></image>
				<view class="txt">
					<view class="txt1">钱包余额</view>
					<view class="txt2">3005.33元</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>
		<view class="nav3">
			<image @click="toZizhujinyingzhengshu" class="pic1" src="/static/image/zhengshu.png" mode=""></image>
			<view @click="toZizhujinyingzhengshu" class="txt3-1">自主经营证书</view>
			<image @click="toShifuguifanshouce" class="pic2" src="/static/image/shouce.png" mode=""></image>
			<view @click="toShifuguifanshouce" class="txt3-1">师傅规范手册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				isRz:'',
			}
		},
		onShow(){
			if(uni.getStorageSync('myUser')){
				this.user = uni.getStorageSync('myUser');
			}
			console.log(this.user,1111)
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.userInfo()
				// console.log(res)
				this.user = {
					...res.data
				}
				const res2 = await this.$api.userMessage()
				console.log(res2)
				this.isRz = !res2.data.identity_card ? '未认证' : res2.data.identity_card.status == 1 ? '认证通过' : '审核中' ;
				if(!res2.data.identity_card){
					uni.showModal({
					    title: '提示',
					    content: '您的账号未认证，立即认证',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url:'/pages/wode/jinengzhongxin/jinengzhongxin'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			toXiugaixinxi(){
				uni.navigateTo({
					url:'/pages/wode/xiugaixinxi/xiugaixinxi'
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/wode/zhanghaodenglu/zhanghaodenglu'
				})
			},
			toZizhujinyingzhengshu(){
				uni.navigateTo({
					url:'/pages/wode/zihujinyingzhengshu/zihujinyingzhengshu'
				})
			},
			toShifuguifanshouce(){
				uni.navigateTo({
					url:'/pages/wode/shifuguifanshouce/shifuguifanshouce'
				})
			},
			toQianbao(){
				uni.navigateTo({
					url:'/pages/wode/qianbao/qianbao'
				})
			},
			toJinengzhongxin(){
				uni.navigateTo({
					url:'/pages/wode/jinengzhongxin/jinengzhongxin'
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.nav1 {
		margin-top: 18rpx;
		width: 750rpx;
		height: 216rpx;
		background: #FFFFFF;
		padding: 0 44rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.nav1-left {
			display: flex;
			align-items: center;

			.pic1 {
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}

			.tit1 {
				margin-left: 48rpx;
				.tit1-1 {
					display: flex;
					align-items: center;

					.txt1 {
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #000000;
					}

					.txt2 {
						margin-left: 30rpx;
						display: flex;
						align-items: center;
						width: 108rpx;
						height: 36rpx;
						background: #4D8BFD;
						opacity: 1;
						border-radius: 26rpx;

						.pic2 {
							margin-left: 14rpx;
							width: 22rpx;
							height: 28rpx;
						}

						.txt2-1 {
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #FFFFFF;
							margin-left: 4rpx;
						}
					}
				}
				.tit1-2{
					margin-top: 32rpx;
					width: 186rpx;
					height: 44rpx;
					border: 2rpx solid #CCCCCC;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					.pic1{
						margin-left: 18rpx;
						width: 36rpx;
						height: 40rpx;
					}
					.txt1{
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #CCCCCC;
					}
				}
			}
			.tit2 {
				margin-left: 54rpx;
				width: 338rpx;
				height: 96rpx;
				background: #CCCCCC ;
				opacity: 1;
				border-radius: 48rpx;
				font-size: 40rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 54rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 96rpx;
			}
		}
	}
	.nav2 {
		margin: 20rpx 30rpx 34rpx 30rpx;
		width: 690rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
	
		.item {
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 32rpx 0 20rpx;
	
			.pic1 {
				width: 40rpx;
				height: 38rpx;
			}
			.pic2{
				width: 40rpx;
				height: 40rpx;
			}
	
			.txt {
				margin: 0 46rpx 0 28rpx;
				width: 552rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
					.yellow{
						color: #F29423;
					}
				}
	
				.txt2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #999999;
					opacity: 1;
				}
			}
		}
		.heng{
			width: 710rpx;
			border: 2rpx solid #F5F5F5;
		}
	}
	.nav3{
		margin-left: 30rpx;
		width: 690rpx;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		.pic1{
			margin-left: 56rpx;
			margin-right: 20rpx;		
			height: 42rpx;
			width: 40rpx;
		}
		.txt3-1{
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #000000;
		}
		.pic2{
			margin-left: 152rpx;
			width: 34rpx;
			height: 34rpx;
			margin-right: 18rpx;
		}
	}
</style>
