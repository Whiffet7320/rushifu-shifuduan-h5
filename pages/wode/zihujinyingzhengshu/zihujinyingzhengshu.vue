<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view v-if="img1 == ''" class="nav1">您还没有上传证书！</view>
		<view v-else class="nav2">
			<image class="pic1" @click="chooseImg(1)" :src="img1" mode=""></image>
			<image class="pic1" @click="chooseImg(2)" :src="img2" mode=""></image>
		</view>
		<view class="btn" v-if="index != 3" @click="chooseImg(index,'index')">上传证书</view>
		<view class="btn" v-else @click="onSubmit">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img1: '',
				img2: '',
				index: 1,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData(){
				const res = await this.$api.seecraftsmanMyCraftsmanInfo()
				console.log(res)
				this.img1 = res.data.certs[0];
				this.img2 = res.data.certs[1];
				this.index = res.data.certs.length + 1;
			},
			async chooseImg(i, val = '') {
				var img = await this.$OSSUpload('img');
				console.log(img)
				if (i == 1) {
					this.img1 = img;
					if (val == 'index') {
						this.index = 2;
					}
				} else if (i == 2) {
					this.img2 = img;
					if (val == 'index') {
						this.index = 3;
					}
				}
			},
			async onSubmit() {
				const res = await this.$api.craftsmanMyCraftsmanInfo({
					certs: [this.img1, this.img2]
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
						back:true,
					})
				}

			},
		}

	}
</script>

<style lang="scss">
	page {
		height: calc(100vh - 88rpx);
		background: #F2F3F5;
		position: relative;
	}
</style>
<style scoped lang="scss">
	.nav1 {
		text-align: center;
		padding-top: 94rpx;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 42rpx;
		color: #999999;
	}

	.nav2 {
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pic1 {
			width: 710rpx;
			height: 510rpx;
			margin-bottom: 20rpx;
		}
	}

	.btn {
		position: absolute;
		bottom: 0rpx;
		width: 750rpx;
		height: 116rpx;
		background: #4988FD;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 116rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
