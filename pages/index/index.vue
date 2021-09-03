<template>
	<view class="index">
		<view class="nav1">
			<view class="txt1">温州</view>
			<u-icon name="chat" color="#231815" size="46"></u-icon>
		</view>
		<!-- 轮播 -->
		<view class="nav2">
			<u-swiper height='244' :list="bannerList"></u-swiper>
		</view>
		<view class="nav3">
			<image class="pic1" src="/static/image/shifukuaibao.png" mode=""></image>
			<view class="shu"></view>
			<view class="tit1">2020年度回顾</view>
			<u-icon name="arrow-right" color="#231815" size="22"></u-icon>
		</view>
		<view class="nav4">
			<view @click="changeBtn(1)" :class="{'txt4-1':true,'active':isActive}">报价</view>
			<view class="shu"></view>
			<view @click="changeBtn(2)" :class="{'txt4-1':true,'active':!isActive}">定价</view>
		</view>
		<view class="nav5">
			<!-- 未入驻 -->
			<!-- <template>
				<image class="pic5-1" src="/static/image/dingdanquesheng.png" mode=""></image>
				<view class="txt5-1">完成入驻后，平台将为您推送订单</view>
			</template> -->
			<!-- 报价 -->
			<template>
				<view class="items">
					<view class="item">
						<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
						<view class="item-right">
							<view class="tit1">送货到家并安装</view>
							<view class="tit2">直接过滤过期未报价将自动关闭订单</view>
							<view class="tit3">
								<view class="txt1">时间截止</view>
								<view class="txt1">2天23小时52分</view>
							</view>
						</view>
					</view>
					<view class="item" v-for="item in 6">
						<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
						<view class="item-right">
							<view class="tit1">送货到家并安装</view>
							<view class="tit2-1">
								<image class="pic2-1" src="/static/image/zu19.png" mode=""></image>
								<view class="txt2-1">晋安区-沙金</view>
							</view>
							<view class="tit3-1">
								<!-- 报价 -->
								<!-- <view class="txt3-1-1">12人已报价</view> -->
								<!-- 定价 -->
								<view class="txt3-1-1 dingjia">￥<text class="big">69</text></view>
								<view class="txt3-1-2">
									<view class="txt3-1-2-1">时间截止</view>
									<view class="txt3-1-2-2">2天23小时52分</view>
								</view>
							</view>
						</view>
					</view>

				</view>
			</template>
		</view>
		<view class="nav6">您已注册成功，现在可以申请入驻</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				bannerList: [],
				isActive: true,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.craftsmanHome()
				console.log(res)
				this.bannerList = res.data.banner
			},
			changeBtn(val) {
				if (val == 1) {
					this.isActive = true;
				}
				if (val == 2) {
					this.isActive = false;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}
</style>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 88rpx;
		background: #FFFFFF;
		padding: 0 22rpx;

		.txt1 {
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}
	}

	.nav2 {
		margin: 0 22rpx;
	}

	.nav3 {
		margin-top: 20rpx;
		margin-left: 22rpx;
		width: 710rpx;
		height: 80rpx;
		background: #F2F3F5;
		border-radius: 16rpx;
		display: flex;
		align-items: center;

		.pic1 {
			width: 112rpx;
			height: 36rpx;
			margin: 0 62rpx 0 32rpx;
		}

		.shu {
			height: 26rpx;
			border: 2rpx solid #707070;
		}

		.tit1 {
			margin-left: 36rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 38rpx;
			color: #000000;
			margin-right: 256rpx;
		}
	}

	.nav4 {
		margin: 26rpx 22rpx 0 22rpx;
		display: flex;
		align-items: center;

		.shu {
			margin: 0 22rpx;
			height: 32rpx;
			border: 2rpx solid #E6E6E6;
		}

		.txt4-1 {
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #999999;
		}

		.txt4-1.active {
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}
	}

	.nav5 {

		// 未入驻
		.pic5-1 {
			margin-top: 136rpx;
			margin-left: 212rpx;
			width: 326rpx;
			height: 230rpx;
		}

		.txt5-1 {
			margin-top: 24rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #666666;
		}

		// 报价
		.items {
			margin-top: 24rpx;
			padding: 0 18rpx 0 26rpx;
			margin-bottom: 88rpx;

			.item {
				&:nth-child(1) {
					border-top: 2rpx solid #EBEBEB;
				}

				height: 160rpx;
				border-bottom: 2rpx solid #EBEBEB;
				display: flex;
				align-items: center;

				.pic1 {
					width: 186rpx;
					height: 116rpx;
				}

				.item-right {
					margin-left: 20rpx;

					.tit1 {
						font-size: 32rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 42rpx;
						color: #000000;
					}

					.tit2 {
						margin-top: 10rpx;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #CC0000;
					}

					.tit3 {
						width: 498rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 10rpx;

						.txt1 {
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #707070;
						}
					}

					// 
					.tit2-1 {
						margin-top: 10rpx;
						display: flex;
						align-items: center;

						.pic2-1 {
							height: 28rpx;
							width: 22rpx;
						}

						.txt2-1 {
							margin-left: 20rpx;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #707070;
						}
					}

					.tit3-1 {
						width: 498rpx;
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.txt3-1-1 {
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #FF7700;
						}

						.txt3-1-1.dingjia {
							font-size: 20rpx;
							font-family: SimHei;
							font-weight: 400;
							line-height: 38rpx;
							color: #D7373F;

							.big {
								font-size: 28rpx;
							}
						}

						.txt3-1-2 {
							display: flex;
							align-items: center;

							.txt3-1-2-1 {
								font-size: 20rpx;
								font-family: Segoe UI;
								font-weight: 400;
								line-height: 28rpx;
								color: #707070;
							}

							.txt3-1-2-2 {
								margin-left: 24rpx;
								font-size: 20rpx;
								font-family: Segoe UI;
								font-weight: 400;
								line-height: 28rpx;
								color: #000000;
							}
						}
					}
				}
			}
		}

	}

	.nav6 {
		position: fixed;
		bottom: 100rpx;
		width: 750rpx;
		height: 88rpx;
		background: #4D8BFD;
		font-size: 28rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 88rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
