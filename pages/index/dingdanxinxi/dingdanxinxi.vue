<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view v-if="obj.type == 0" class="nav1">
			<!-- 已取消 -->
			<template v-if="myStatus == -1">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">订单已被取消</view>
				</view>
			</template>
			<!-- 被选择 -->
			<template v-if="myStatus == 1">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">已接单</view>
				</view>
			</template>
			<!-- 未被选择 -->
			<view v-if="myStatus == 0" class="tit1">
				<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
				<view class="txt2">距结束：{{timecha}}</view>
			</view>
			<!-- 被选择 -->
			<template v-if="myOrderStatus">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">{{this.myStatusVal}}</view>
				</view>
			</template>
			<!-- 已完成 -->
			<template v-if="myOrderStatus == 2">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">已完成</view>
				</view>
			</template>
			<!-- 未被选择 -->
			<template v-if="myStatus == 0">
				<view class="tit2">价格:￥{{obj.item.price}}</view>
				<view class="tit4" v-if="lowest">
					最低报价金额：<text class="red">{{lowest.price}}元</text><text class="info">（{{time}}）</text>
				</view>
			</template>
			<!-- 被选择 -->
			<template v-else>
				<view class="tit4">
					订单编号：<text style="color: #000000;">rsf5643135456</text>
				</view>
				<view class="tit4">
					金额：<text class="red">{{lowest.price}}元</text>
				</view>
			</template>
			<!--  -->
			<view class="heng"></view>
			<view :class="{'tit3':true,'tit33':!lowest}">
				时间要求：<text class="black">{{timecha}}内</text>
			</view>
			<view :class="{'tit3':true,'tit33':lowest}" v-if="lowest">
				师傅要求：<text class="black">{{lowest.comment}}</text>
			</view>
		</view>
		<view v-else class="nav1">
			<!-- 已取消 -->
			<template v-if="myStatus == -1">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">订单已被取消</view>
				</view>
			</template>
			<!-- 被选择 -->
			<template v-if="myStatus == 1">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">已接单</view>
				</view>
			</template>
			<!-- 未被选择 -->
			<view v-if="myStatus == 0" class="tit1">
				<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
				<view class="txt2">距结束：{{timecha}}</view>
			</view>
			<!-- 被选择 -->
			<template v-if="myOrderStatus">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">{{this.myStatusVal}}</view>
				</view>
			</template>
			<!-- 已完成 -->
			<template v-if="myOrderStatus == 2">
				<view class="tit1">
					<view v-if='obj.item' class="txt1">{{obj.item.name}}</view>
					<view class="txt2">已完成</view>
				</view>
			</template>
			<!-- 未被选择 -->
			<template v-if="myStatus == 0">
				<view class="tit2">雇佣/仅限你报价</view>
				<view class="tit4" v-if="lowest">
					最低报价金额：<text class="red">{{lowest.price}}元</text><text class="info">（{{time}}）</text>
				</view>
			</template>
			<!-- 被选择 -->
			<template v-else>
				<view class="tit4">
					订单编号：<text style="color: #000000;">rsf5643135456</text>
				</view>
				<view class="tit4">
					金额：<text class="red">{{lowest.price}}元</text>
				</view>
			</template>
			<!--  -->
			<view class="heng"></view>
			<view :class="{'tit3':true,'tit33':!lowest}">
				时间要求：<text class="black">{{timecha}}内</text>
			</view>
			<view :class="{'tit3':true,'tit33':lowest}" v-if="lowest">
				师傅要求：<text class="black">{{lowest.comment}}</text>
			</view>
		</view>
		<!-- 未被选择 -->
		<template v-if="myStatus == 0 && obj.type != 0">
			<!-- 未报价 -->
			<view v-if="!lowest" @click="toTijiaobaojia" class="btn">提交报价</view>
			<!-- 已报价 -->
			<view v-else-if="lowest" class="btn act1">您已报价￥{{my_quote.price}},请耐心等待</view>
		</template>
		<!-- 定价 -->
		<template v-if="myStatus == 0 && obj.type == 0">
			<!-- 未报价 -->
			<view v-if="!lowest" @click="toTijiaobaojia" class="btn">立即抢单</view>
			<!-- 已报价 -->
			<view v-else-if="lowest" class="btn act1">您已报价￥{{my_quote.price}},请耐心等待</view>
		</template>
		<!-- 被选择 -->
		<view class="bxzTxt" v-if="myStatus == 1">
			<view class="txtt1">
				本次订单将由您服务！
			</view>
			<view class="txtt1">
				请尽快与客户协商具体上门服务事宜
			</view>
		</view>
		<!-- 客户信息 -->
		<view class="nav2">
			<view class="tit1">
				<view class="txt1">
					<image class="pic1" v-if='obj.user_info' :src="obj.user_info.avatar" mode=""></image>
					<view class="txt1-1">客户信息</view>
				</view>
				<view class="txt2">距离你约：11.73km</view>
			</view>
			<view class="tit2">客户姓名：<text class="black">{{obj.address.name}}</text></view>
			<view class="tit3">
				客户地址：<text class="black">{{obj.address.address}}{{obj.address.sub_address}}</text>
			</view>
			<view class="tit3">
				楼层信息：<text class="black">{{obj.address.detail_address}}</text>
			</view>
			<view class="tit3">
				备注：<text class="black">{{obj.intro}}</text>
			</view>
		</view>
		<!-- 已完成-已评价 -->
		<view class="nav4" v-if="myOrderStatus == 4">
			<view class="tit4-1">
				<view class="txt4-1">客户评价</view>
				<u-rate v-model="obj.order.comments[0].rate" active-color="#1677FF" size='24' disabled
					inactive-color="#b2b2b2" gutter="0"></u-rate>
			</view>
			<view class="tit4-2">
				{{obj.order.comments[0].content}}
			</view>
			<view class="tit4-3">
				<image @click="seeImg(index)" class="pic" v-for="(item,index) in obj.order.comments[0].images"
					:key='index' :src="item" mode=""></image>
			</view>
		</view>
		<!-- 服务中-完成订单 -->
		<view v-if="myOrderStatus == 3" @click='finishDingdan' class="nav3">完成订单</view>
		<!-- 被选择 -->
		<view v-if="myStatus == 1 || myOrderStatus == 1" @click="fwmShow = true" class="nav3">输入4位服务码</view>
		<!-- 弹出服务码验证 -->
		<u-popup v-model="fwmShow" width='650' height='336' border-radius='16' mode="center">
			<view class="fwmBox">
				<u-message-input @finish='checkFwm' mode="middleLine"></u-message-input>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myStatusVal: '',
				myOrderStatus: null,
				myStatus: null,
				fwmShow: false,
				id: null,
				lowest: null,
				obj: {},
				timecha: '',
				time: '',
			}
		},
		onShow() {
			this.getData()
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
			async getData() {
				const res = await this.$api.seecraftsmanDemandQuotes({
					id: this.id
				})
				console.log(res)
				if (res.data.demand_quote.order) {
					this.myOrderStatus = res.data.demand_quote.order.status;
				} else {
					this.myStatus = res.data.demand_quote.status;
				}
				if (res.data.demand_quote.order) {
					this.myStatusVal = res.data.demand_quote.order.status == -1 ? '已取消' : res.data.demand_quote.order
						.status == 0 ? "未支付" : res.data.demand_quote.order.status ==
						1 ? '已支付' : res.data.demand_quote.order.status == 3 ? '服务中' : res.data.demand_quote.order
						.status == 4 ? '已完成' : res.data.demand_quote.order.status ==
						5 ? '售后中' : '已完成'
					// this.current == 0 ? "" : this.current == 1 ? "1" : "2"
				}
				console.log(this.myOrderStatus, this.myStatus);
				if (res.data.lowest) {
					this.time = this.rTime(res.data.lowest.created_at)
					this.lowest = res.data.lowest;
				}
				if (res.data.my_quote) {
					this.my_quote = res.data.my_quote;
				}

				this.obj = res.data.demand_quote;
				if (this.obj.order && this.obj.order.comments) {
					if (!this.obj.order.comments[0].images[this.obj.order.comments[0].images.length - 1]) {
						this.obj.order.comments[0].images.pop()
					}
				}

				var myData = new Date().getTime()
				this.timecha = this.DateDifference(myData, this.obj.expiration)
			},
			async finishDingdan() {
				const res = await this.$api.ordersFinish(this.obj.order.id)
				console.log(res);
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '提交完成订单成功',
						type: 'success',
						back: true,
						callback: () => {
							this.getData()
						},
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			seeImg(i) {
				uni.previewImage({
					urls: this.obj.order.comments[0].images,
					current: i,
				});
			},
			async checkFwm(e) {
				console.log(e)
				const res = await this.$api.craftsmanStart({
					id: this.obj.id,
					code: e
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '验证成功',
						type: 'success',
						back: true
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			toTijiaobaojia() {
				uni.navigateTo({
					url: `/pages/index/dingdanxinxi/baojia?demand_quote_id=${this.obj.id}&type=${this.obj.type}`
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
			},
			rTime(date) {
				var json_date = new Date(date).toJSON();
				return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
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

	.nav1 {
		margin-top: 20rpx;
		margin-left: 22rpx;
		width: 704rpx;
		// height: 342rpx;
		background: #ffffff;
		border-radius: 6rpx;
		padding: 0 20rpx;

		.tit1 {
			padding-top: 14rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI, Segoe UI-Bold;
				font-weight: 700;
				text-align: left;
				color: #000000;
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI, Segoe UI-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
			}
		}

		.tit2 {
			margin-top: 28rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #ffa200;
		}

		.tit3 {
			margin-top: 22rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #999999;

			.black {
				color: #000000;
			}
		}

		.tit33 {
			padding-bottom: 28rpx;
		}

		.tit4 {
			margin-top: 22rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #999999;

			.red {
				color: #CC0000;
			}

			.info {
				color: #707070;
			}
		}

		.heng {
			margin-top: 16rpx;
			width: 704rpx;
			transform: translateX(-20rpx);
			border: 1rpx solid #e6e6e6;
		}

	}

	.btn {
		margin-top: 56rpx;
		margin-left: 80rpx;
		width: 586rpx;
		height: 96rpx;
		background: #4d8bfd;
		border-radius: 6rpx;
		font-size: 32rpx;
		font-family: Segoe UI, Segoe UI-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 96rpx;
	}

	.btn.act1 {
		background: #989898;
	}

	.bxzTxt {
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: bold;
		line-height: 42rpx;
		text-align: center;
		color: #4D8BFD;
		margin-top: 48rpx;
	}

	.nav2 {
		margin-top: 45rpx;
		margin-left: 22rpx;
		width: 704rpx;
		height: 316rpx;
		background: #ffffff;
		border-radius: 6rpx;
		padding: 0 20rpx;

		.tit1 {
			padding-top: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				display: flex;
				align-items: center;

				.pic1 {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
				}

				.txt1-1 {
					margin-left: 10rpx;
					font-size: 32rpx;
					font-family: Segoe UI, Segoe UI-Bold;
					font-weight: 700;
					color: #000000;
				}
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI, Segoe UI-Regular;
				font-weight: 400;
				color: #000000;
			}
		}

		.tit2 {
			margin-top: 29rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #999999;

			.black {
				color: #000000;
			}
		}

		.tit3 {
			margin-top: 20rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #999999;

			.black {
				color: #000000;
			}
		}

	}

	.nav3 {
		margin-left: 80rpx;
		margin-top: 114rpx;
		width: 586rpx;
		height: 96rpx;
		background: #4D8BFD;
		border-radius: 6rpx;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.nav4 {
		margin-top: 20rpx;
		margin-left: 22rpx;
		width: 704rpx;
		// height: 342rpx;
		background: #ffffff;
		border-radius: 6rpx;
		padding: 0 20rpx;

		.tit4-1 {
			padding-top: 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt4-1 {
				font-size: 32rpx;
			}
		}

		.tit4-2 {
			margin-top: 22rpx;
			font-size: 24rpx;
			padding-bottom: 24rpx;
		}

		.tit4-3 {
			padding-bottom: 20rpx;

			.pic {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
			}
		}
	}

	.fwmBox {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
