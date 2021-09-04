<template>
	<view class="index">
		<view class="nav1">
			<!-- 横向 -->
			<scroll-view class="scroll-view" scroll-x @scroll="scroll" style="width: 100%;white-space:nowrap;">
				<image @click="toXiangqin(item.id)" v-for="(item,i) in 3" class="pic1" src="/static/image/mcz8.png"
					mode="">
				</image>
			</scroll-view>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="txt1">接单列表</view>
				<image @click="toLishijiedan" class="pic1" src="/static/image/wodedingdan.png" mode=""></image>
			</view>
			<view class="nav4">
				<view @click="changeBtn(1)" :class="{'txt4-1':true,'active':isActive}">报价</view>
				<view class="shu"></view>
				<view @click="changeBtn(2)" :class="{'txt4-1':true,'active':!isActive}">定价</view>
			</view>
			<view class="items">
				<!-- 				<view class="item" @click="toChakandingdan">
					<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
					<view class="item-right">
						<view class="tit1">送货到家并安装</view>
						<view class="tit2">直接过滤过期未报价将自动关闭订单</view>
						<view class="tit3">
							<view class="txt1">时间截止</view>
							<view class="txt1">2天23小时52分</view>
						</view>
					</view>
				</view> -->
				<template v-if="list.length != 0">
					<view class="item" v-for="item in list" @click="toChakandingdan(item)">
						<image class="pic1" :src="item.images[0]" mode=""></image>
						<view class="item-right">
							<view class="tit1">{{item.item.name}}</view>
							<view class="tit2-1">
								<image class="pic2-1" src="/static/image/zu19.png" mode=""></image>
								<view class="txt2-1">{{item.address.address}}-{{item.address.sub_address}}</view>
							</view>
							<view class="tit3-1">
								<!-- 报价 -->
								<view v-if="type == 1" class="txt3-1-1">{{item.quotes_count}}人已报价</view>
								<!-- 定价 -->
								<view v-else class="txt3-1-1 dingjia">￥<text class="big">{{item.item.price}}</text>
								</view>
								<view class="txt3-1-2">
									<view class="txt3-1-2-1">时间截止</view>
									<view class="txt3-1-2-2">{{item.timecha}}</view>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
				</template>
				<view v-else class="noDD">
					暂无订单~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanliebiaopage", "dingdanliebiaopageSize"]),
		},
		watch: {
			dingdanliebiaopage: function(page) {
				console.log('ddpage')
				this.$store.commit("dingdanliebiaopage", page);
				if (this.dingdanliebiaopage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				list: [],
				isActive: true,
				type: 1,
				clock: false,
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		async onShow() {
			this.list = [];
			this.getData()
			this.$store.commit("dingdanliebiaopage", 1);
		},
		onReachBottom() {
			this.$store.commit("dingdanliebiaopage", this.dingdanliebiaopage + 1);
		},
		methods: {
			async getData() {
				// 搜索后的商品列表
				this.status = 'loading';
				if (this.clock) {
					this.list = [];
					this.clock = false;
				}
				setTimeout(async () => {
					const res = await this.$api.craftsmanDemandQuotes({
						page: this.dingdanliebiaopage,
						limit: this.dingdanliebiaopageSize,
						type: this.type,
					})
					console.log(res)
					var myData = new Date().getTime()
					res.data.data.forEach(ele => {
						var timecha = this.DateDifference(myData, ele.expiration)
						ele.timecha = timecha; //时间差
					})
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.list)
						this.list = this.list.concat(res.data.data)
					}
				}, 200)
			},
			toLishijiedan(){
				uni.navigateTo({
					url:'/pages/dingdan/lishijiedan/lishijiedan'
				})
			},
			changeBtn(val) {
				if (val == 1) {
					this.type = 1;
					this.isActive = true;
					this.clock = true;
					this.getData()
					this.$store.commit("dingdanliebiaopage", 1);
				}
				if (val == 2) {
					this.type = 0;
					this.isActive = false;
					this.clock = true;
					this.getData() 
					this.$store.commit("dingdanliebiaopage", 1);
				}
			},
			toChakandingdan(item) {
				uni.navigateTo({
					url: `/pages/index/dingdanxinxi/dingdanxinxi?id=${item.id}`
				})
			},
			DateDifference(faultDate, completeTime) {
				var stime = faultDate;
				var etime = new Date(completeTime).getTime();
				var usedTime = etime - stime; //两个时间戳相差的毫秒数
				var days = Math.floor(usedTime / (24 * 3600 * 1000));
				//计算出小时数
				var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));
				var time = days + "天" + hours + "时" + minutes + "分";
				return time;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}
</style>
<style scoped lang="scss">
	.index {}

	/deep/ .u-load-more-wrap {
		height: 100rpx !important;
	}

	.noDD {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}

	.nav1 {
		margin-top: 20rpx;

		.pic1 {
			margin-left: 20rpx;
			width: 596rpx;
			height: 244rpx;
		}
	}

	.nav2 {
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 0 26rpx;

		.tit1 {
			padding-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI, Segoe UI-Bold;
				font-weight: 700;
				text-align: center;
				color: #000000;
			}

			.pic1 {
				width: 56rpx;
				height: 60rpx;
			}
		}

		.nav4 {
			margin-top: 8rpx;
			// margin: 26rpx 22rpx 0 22rpx;
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

		.items {
			margin-top: 10rpx;
			// padding: 0 18rpx 0 26rpx;
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
						margin-top: 0;
						padding-top: 0;
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
</style>
