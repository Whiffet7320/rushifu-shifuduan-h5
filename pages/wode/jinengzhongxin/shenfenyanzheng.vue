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
	import {
		Base64
	} from 'js-base64/base64.js';
	import OSS from 'ali-oss';
	import crypto from 'crypto-js';
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
				const date = new Date();
				date.setHours(date.getHours() + 1);
				uni.chooseImage({
					count: 1,
					success: async function(res) {
						const policyText = {
							expiration: date.toISOString(), // 设置policy过期时间。
							conditions: [
								// 限制上传大小。
								["content-length-range", 0, 1024 * 1024 * 1024],
							],
						};
						let tiemr = new Date();
						let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr
							.getDate();
						const policy = Base64.encode(JSON.stringify(policyText));
						const res1 = await that.$api.uploadToken();
						console.log(res1)
						const signature = crypto.enc.Base64.stringify(crypto.HmacSHA1(
							policy, res1.data.accessKeySecret));
						var imageSrc = res.tempFilePaths[0];
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf(
							'.'));
						let nameStr = address + tiemr.getTime() + str;
						uni.uploadFile({
							url: `https://${res1.data.bucket}.${res1.data.url}`, //输入你的bucketname.endpoint
							filePath: imageSrc,
							name: 'file',
							formData: {
								key: nameStr,
								policy: policy, // 输入你获取的的policy
								OSSAccessKeyId: res1.data.accessKeyId, // 输入你的AccessKeyId
								signature: signature, // 输入你获取的的signature
								'x-oss-security-token': res1.data.stsToken
							},
							success: res => {
								if (res.statusCode == '204') {
									console.log(`https://${res1.data.bucket}.${res1.data.url}/${nameStr}`);
									if (i == 1) {
										that.image_reverse = `https://${res1.data.bucket}.${res1.data.url}/${nameStr}`
									} else if (i == 2) {
										that.image_front = `https://${res1.data.bucket}.${res1.data.url}/${nameStr}`
									}
								} else {
									console.log(res);
								}
							}
						})
					}
				});
			},
			
			// async chooseImg(i) {
			// 	const that = this;
			// 	var img = await this.$OSSUpload('img')
			// 	console.log(img)
			// 	if (i == 1) {
			// 		this.image_reverse = img
			// 	} else if (i == 2) {
			// 		this.image_front = img
			// 	}
			// },

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
