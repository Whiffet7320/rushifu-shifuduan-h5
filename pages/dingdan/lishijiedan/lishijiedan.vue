<template>
	<view class="index">
		<u-tabs-swiper bg-color="#ffffff" font-size="25" gutter="40" inactive-color="#000000" bar-height="6"
			bar-width="40" active-color="#4988FD" ref="uTabs" :list="list" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
			<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 90vh;">
					<view class="items">
						<!-- {{item.name}} -->
						<!-- 全部接单 -->
						<template v-if="swiperCurrent == 0">
							<view @click="toChakanxiangqin(item.id)" class="item" v-for="item in dataList">
								<view class="item-top">
									<image class="pic1" :src="item.images[0]" mode=""></image>
									<view class="item-right">
										<view class="tit1">{{item.item_name}}</view>
										<view class="tit2-1">
											<image class="pic2-1" src="/static/image/zu19.png" mode=""></image>
											<view class="txt2-1">{{item.address.address}}</view>
										</view>
										<view class="tit3-1">
											<!-- 报价 -->
											<!-- <view class="txt3-1-1">12人已报价</view> -->
											<!-- 报价799 -->
											<view class="txt3-1-1">报价￥{{item.pivot.price}}</view>
											<!-- 定价 -->
											<!-- <view class="txt3-1-1 dingjia">￥<text class="big">69</text></view> -->
											<view class="txt3-1-2">
												<view class="txt3-1-2-2">{{item.myStatus}}</view>
											</view>
										</view>
									</view>
								</view>

							</view>

						</template>
						<!-- 评价记录 -->
						<template v-if="swiperCurrent == 1">
							<view @click="toChakanxiangqin(item.id)" class="item item2" v-for="item in dataList">
								<view class="item-top">
									<image class="pic1" :src="item.images[0]" mode=""></image>
									<view class="item-right">
										<view class="tit1">{{item.item_name}}</view>
										<view class="tit2-1">
											<image class="pic2-1" src="/static/image/zu19.png" mode=""></image>
											<view class="txt2-1">{{item.address.address}}</view>
										</view>
										<view class="tit3-1">
											<!-- 报价 -->
											<!-- <view class="txt3-1-1">12人已报价</view> -->
											<!-- 报价799 -->
											<!-- <view class="txt3-1-1">报价￥799</view> -->
											<!-- 定价 -->
											<view class="txt3-1-1 dingjia">￥<text class="big">{{item.pivot.price}}</text></view>
											<view class="txt3-1-2">
												<view class="txt3-1-2-2">完成时间：{{item.updated_at}}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view class="item-b-tit1">
										<view class="b-txt1">客户评价</view>
										<view class="b-txt2">
											<text class="starTxt">{{item.order.comments[0].rate}}.0</text>
											<u-rate v-model="item.order.comments[0].rate" active-color="#1677FF" size='24' disabled
												inactive-color="#b2b2b2" gutter="0"></u-rate>
										</view>
									</view>
									<view class="item-b-tit2">
										{{item.order.comments[0].content}}
									</view>
								</view>

							</view>
						</template>
						<!-- 退款/仲裁 -->
						<template v-if="swiperCurrent == 2">
							<view @click="toChakanxiangqin(item.id)" class="item" v-for="item in dataList">
								<view class="item-top">
									<image class="pic1" :src="item.images[0]" mode=""></image>
									<view class="item-right">
										<view class="tit1">{{item.item_name}}</view>
										<view class="tit2-1">
											<image class="pic2-1" src="/static/image/zu19.png" mode=""></image>
											<view class="txt2-1">{{item.address.address}}</view>
										</view>
										<view class="tit3-1">
											<!-- 报价 -->
											<!-- <view class="txt3-1-1">12人已报价</view> -->
											<!-- 报价799 -->
											<view class="txt3-1-1">报价￥{{item.pivot.price}}</view>
											<!-- 定价 -->
											<!-- <view class="txt3-1-1 dingjia">￥<text class="big">69</text></view> -->
											<view class="txt3-1-2">
												<view class="txt3-1-2-2">售后中</view>
											</view>
										</view>
									</view>
								</view>

							</view>
						</template>
						<!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->

					</view>
				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["lishiDingdanliebiaopage", "lishiDingdanliebiaopageSize"]),
		},
		watch: {
			lishiDingdanliebiaopage: function(page) {
				console.log('ddpage')
				this.$store.commit("lishiDingdanliebiaopage", page);
				if (this.lishiDingdanliebiaopage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				dataList: [],
				starNum: 4,
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '全部接单'
				}, {
					name: '评价记录'
				}, {
					name: '退款/仲裁'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				}
			}
		},
		onShow() {
			this.tabsChange(this.current)
			this.$store.commit("lishiDingdanliebiaopage", 1);
		},
		mounted() {
			this.getCurrentSwiperHeight('.items')
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.craftsmanMyDemandQuotes({
						page: this.lishiDingdanliebiaopage,
						limit: this.lishiDingdanliebiaopageSize,
						type: this.current == 0 ? "" : this.current == 1 ? "1" : "2",
					})
					console.log(res)
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.dataList = this.dataList.concat(res.data.data)
					}
					this.dataList.forEach(ele=>{
						if(ele.order){
							ele.myStatus = ele.order.status == -1 ? '已取消' : ele.order.status == 0 ? "未支付" : ele.order.status == 1 ? '已支付' : ele.order.status == 3 ? '服务中' : ele.order.status == 4 ? '已完成' : ele.order.status == 5 ? '售后中' : '已完成'  
							// this.current == 0 ? "" : this.current == 1 ? "1" : "2"
						}else{
							ele.myStatus = ele.status == -1 ? '已取消' : ele.status == 0 ? '未选择' : '已选择'
						}
					})
					console.log(this.dataList)
				}, 200)
			},
			toChakanxiangqin(id){
				uni.navigateTo({
					url:`/pages/index/dingdanxinxi/dingdanxinxi?id=${id}`
				})
			},
			lower() {
				this.$store.commit("lishiDingdanliebiaopage", this.lishiDingdanliebiaopage + 1);
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				this.dataList = [];
				this.$store.commit("lishiDingdanliebiaopage", 1);
				this.getData();
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items')
				}, 500)
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					// console.log(res, 'res', this.swiperCurrentIndex)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.items {
		margin-top: 24rpx;
		margin: 20rpx;
		margin-bottom: 88rpx;

		.item.item2 {
			margin-bottom: 20rpx;
		}

		.item {
			padding: 0 20rpx;
			background: #FFFFFF;

			&:nth-child(1) {
				border-top: 0rpx solid #EBEBEB;
			}

			border-top: 2rpx solid #EBEBEB;

			.item-top {
				height: 160rpx;
				// border-bottom: 2rpx solid #EBEBEB;
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

			.item-bottom {
				height: 126rpx;
				border-top: 2rpx solid #EBEBEB;

				.item-b-tit1 {
					margin-top: 14rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.b-txt1 {
						font-size: 32rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 42rpx;
						color: #000000;
					}

					.b-txt2 {
						.starTxt {
							font-size: 24rpx;
							font-family: SimHei;
							font-weight: 400;
							line-height: 32rpx;
							color: #000000;
							margin-right: 10rpx;
						}
					}
				}

				.item-b-tit2 {
					margin-top: 22rpx;
					font-size: 24rpx;
					font-family: SimHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}

		}
	}
</style>
