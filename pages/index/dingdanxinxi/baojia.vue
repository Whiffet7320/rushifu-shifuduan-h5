<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<template v-if="type != 0">
				<view class="tit1">请按照客户的订单服务信息给出您合理的报价</view>
				<u-field label-width="60" v-model="price" label="￥">
				</u-field>
				<view class="heng"></view>
			</template>
			<u-input v-model="value" type="textarea" border placeholder='如有特殊要求您可以留言给用户进行说明（0-50字内）' />
		</view>
		<view @click="onSubmit" class="btn">确认提交</view>
		<template v-if="type != 0">
			<view class="nav2">报价金额说明</view>
			<view class="nav3">
				报价金额一旦成交即不可再修改，请师傅根据实 际情况给出您认为的合理价格，如因虚假报价产 生的不良后果一切由师傅承担责任
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '',
				value: "",
				demand_quote_id: '',
				type: "",
			}
		},
		onLoad(option) {
			this.demand_quote_id = option.demand_quote_id;
			this.type = option.type;
		},
		methods: {
			async onSubmit() {
				const res = await this.$api.craftsmanQuote({
					demand_quote_id: this.demand_quote_id,
					price: this.price,
					comment: this.value
				})
				console.log(res)
				if (this.type == 0) {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success',
							// url:"/pages/dingdan/dingdan",
							// isTab:true,
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				} else {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success',
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				}

			},
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
		padding: 0 56rpx 30rpx 56rpx;
		width: 750rpx;
		// height: 440rpx;
		opacity: 1;
		background: #ffffff;

		.tit1 {
			margin-bottom: 34rpx;
			padding-top: 20rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}

		/deep/ .u-field {
			background: #f2f3f5;
		}

		.heng {
			width: 750rpx;
			margin-top: 44rpx;
			margin-bottom: 40rpx;
			transform: translateX(-56rpx);
			border: 1rpx solid #e6e6e6;
		}

		/deep/ .uni-textarea-wrapper {
			font-size: 24rpx;
		}
	}

	.btn {
		margin-top: 68rpx;
		margin-left: 80rpx;
		width: 586rpx;
		height: 96rpx;
		background: #4d8bfd;
		border-radius: 6rpx;
		font-size: 32rpx;
		font-family: Segoe UI, Segoe UI-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 96rpx;
		color: #ffffff;
	}

	.nav2 {
		margin-top: 142rpx;
		font-size: 32rpx;
		font-family: Segoe UI, Segoe UI-Bold;
		font-weight: 700;
		text-align: center;
		color: #000000;
	}

	.nav3 {
		margin-top: 20rpx;
		margin-left: 80rpx;
		width: 576rpx;
		font-size: 28rpx;
		font-family: Segoe UI, Segoe UI-Bold;
		font-weight: 700;
		text-align: center;
		color: #666666;
	}
</style>
