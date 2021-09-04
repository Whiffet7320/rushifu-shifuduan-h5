<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<text class="red">*</text>
			请上传真是的身份证照片，并保持照片完整和清晰
		</view>
		<view class="nav2">
			<view class="img11" @click="chooseImg(1)">
				<template v-if="image_reverse == ''">
					<image class="pic1" src="/static/image/zu6.png" mode=""></image>
					<image class="pic2" src="/static/image/zu23.png" mode=""></image>
				</template>
				<view v-else>
					<image class="pic1" :src="image_reverse" mode=""></image>
				</view>
			</view>
			<view class="img11" @click="chooseImg(2)">
				<template v-if="image_front == ''">
					<image class="pic1" src="/static/image/zu33.png" mode=""></image>
					<image class="pic2" src="/static/image/zu23.png" mode=""></image>
				</template>
				<view v-else>
					<image class="pic1" :src="image_front" mode=""></image>
				</view>
			</view>
		</view>
		<view @click="toWode" class="btn">确认并提交</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				image_reverse: '',
				image_front: '',
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$api.getCraftsmanIdentityCard();
				console.log(res)
				this.image_reverse = res.data.image_reverse;
				this.image_front = res.data.image_front;
			},
			async toWode() {
				const res = await this.$api.craftsmanIdentityCard({
					image_front: this.image_front,
					image_reverse: this.image_reverse
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						url: '/pages/wode/wode',
						isTab: true,
					})
				} else if (res.code == 400) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
						url: '/pages/wode/wode',
						isTab: true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}

			},
			async chooseImg(i) {
				const that = this;
				var img = await this.$OSSUpload('img')
				console.log(img)
				if (i == 1) {
					this.image_reverse = img
				} else if (i == 2) {
					this.image_front = img
				}
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
	.index {
		height: 90vh;
		position: relative;
	}

	.nav1 {
		padding-top: 90rpx;
		font-size: 24rpx;
		font-family: Segoe UI, Segoe UI-Bold;
		font-weight: 700;
		margin-left: 48rpx;
		color: #707070;

		.red {
			color: #cc0000;
		}
	}

	.nav2 {
		margin-top: 62rpx;
		padding: 0 60rpx;
		display: flex;
		justify-content: space-between;

		.img11 {
			width: 304rpx;
			height: 196rpx;
			position: relative;

			.pic1 {
				width: 304rpx;
				height: 196rpx;
			}

			.pic2 {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				position: absolute;
				width: 104rpx;
				height: 104rpx;
				opacity: 1;
			}
		}
	}

	.btn {
		position: absolute;
		bottom: 76rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 296rpx;
		height: 96rpx;
		background: #4D8BFD;
		border-radius: 16rpx;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		text-align: center;
		line-height: 96rpx;
		color: #FFFFFF;
	}
</style>
