<template>
	<view class="index">
		<u-toast ref="uToast" />
		<image class="pic1" src="/static/image/mcz8.png" mode=""></image>
		<view class="nav1">
			<view v-if="!isWangjimima" class="tit1">账号登录</view>
			<view v-else class="tit1">找回密码</view>
			<u-input :clearable='false' placeholder='输入注册手机号码' v-model="username" type="text" height="112" />
			<u-input v-if='!isYzm && !isWangjimima' :clearable='false' placeholder='输入您的账号密码' v-model="password"
				type="password" height="112" />
			<u-field v-if='isYzm || isWangjimima' v-model="code" :border-bottom='false' placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<u-verification-code v-if='isYzm || isWangjimima' ref="uCode" @change="codeChange"></u-verification-code>
			<u-input v-if='isWangjimima' :clearable='false' placeholder='输入您的新密码' v-model="newPassword" type="password"
				height="112" />
			<view v-if="!isWangjimima" @click="login" class="tit2">登录</view>
			<view v-else @click="xiugai" class="tit2">修改密码</view>
			<view class="tit3">
				<view class="txt3-1">找回账号</view>
				<view v-if="!isWangjimima" @click="isWangjimima = true" class="txt3-1">忘记密码？</view>
				<view v-else @click="isWangjimima = false" class="txt3-1">返回登录</view>
			</view>
			<view v-if='!isYzm' @click="yzmLogin" class="tit4">
				<image class="pic4-1" src="/static/image/shouji.png" mode=""></image>
				<view class="txt4-1">验证码登录</view>
			</view>
			<view v-else @click="zhLogin" class="tit4">
				<image class="pic4-2" src="/static/image/wode.png" mode=""></image>
				<view class="txt4-1">账号登录</view>
			</view>
			<view class="tit5">
				<view class="txt5-1">没有账号？</view>
				<view @click="toZhuce" class="txt5-2">注册账号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				codeText: '',
				username: '',
				password: '',
				newPassword: '',
				isYzm: false,
				isWangjimima: false,
			}
		},
		methods: {
			async login() {
				const that = this;
				if (!this.isYzm) {
					const res = await this.$api.craftsmanLogin({
						phone: this.username,
						password: this.password
					})
					console.log(res)
					if (res.code == 200) {
						uni.setStorageSync('myUser', res.data.user)
						uni.setStorage({
							key: 'token',
							data: res.data.token_info.access_token,
							success() {
								that.$refs.uToast
									.show({
										title: '登录成功',
										type: 'success',
										isTab: true,
										url: '/pages/wode/wode'
									})
							}
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				} else {
					const res = await this.$api.craftsmanLoginCode({
						phone: this.username,
						code: this.code
					})
					console.log(res)
					if (res.code == 200) {
						uni.setStorageSync('myUser', res.data.user)
						uni.setStorage({
							key: 'token',
							data: res.data.token_info.access_token,
							success() {
								that.$refs.uToast
									.show({
										title: '登录成功',
										type: 'success',
										isTab: true,
										url: '/pages/wode/wode'
									})
							}
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				}

			},
			async xiugai() {
				const res = await this.$api.craftsmanForgetPwd({
					phone: this.username,
					password: this.newPassword,
					code: this.code
				})
				if (res.code == 200) {
					this.$refs.uToast
						.show({
							title: '密码修改成功',
							type: 'success',
							url: '/pages/wode/zhanghaodenglu/zhanghaodenglu'
						})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			wangjimima() {
				this.isWangjimima = true;
			},
			yzmLogin() {
				this.isYzm = true;
			},
			zhLogin() {
				this.isYzm = false;
			},
			codeChange(text) {
				this.codeText = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$api.sms({
						type: this.isWangjimima ? 1 : 2,
						phone: this.username
					})
					if (res.code == 200) {
						this.code = res.data.code;
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			toZhuce() {
				uni.navigateTo({
					url: '/pages/wode/zhanghaodenglu/zhuce'
				})
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

	.pic1 {
		height: 340rpx;
		width: 750rpx;
	}

	.nav1 {
		margin-bottom: 12rpx;
		position: absolute;
		top: 250rpx;
		width: 750rpx;
		height: 1084rpx;
		background: #FFFFFF;
		border-radius: 84rpx;

		/deep/ .u-field {
			padding: 0;
			display: flex;
			margin-left: 80rpx;
			width: 584rpx;
			height: 112rpx;
			border-bottom: 2rpx solid #E6E6E6;
		}

		/deep/ .u-flex-1 {
			margin: 0 !important;
		}

		/deep/ .u-label {
			justify-content: flex-start;
			flex: 0 0 1rpx !important;
		}

		/deep/ .input-placeholder {
			color: rgb(192, 196, 204) !important;
		}

		// /deep/ .u-button-wrap{
		// 	transform: translateX(-30px);
		// }

		.tit1 {
			text-align: center;
			margin-top: 38rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}

		.tit2 {
			margin-top: 64rpx;
			width: 586rpx;
			height: 96rpx;
			background: #4D8BFD;
			border-radius: 6rpx;
			margin-left: 78rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 96rpx;
			text-align: center;
			color: #FFFFFF;
		}

		.tit3 {
			margin-top: 56rpx;
			width: 584rpx;
			margin-left: 86rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.txt3-1 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
		}

		.tit4 {
			margin: 104rpx 0 0 240rpx;
			width: 264rpx;
			height: 88rpx;
			background: #F5F8FF;
			border-radius: 16rpx;
			display: flex;
			align-items: center;

			.pic4-1 {
				margin-left: 30rpx;
				height: 50rpx;
				width: 34rpx;
			}

			.pic4-2 {
				margin-left: 30rpx;
				height: 50rpx;
				width: 52rpx;
			}

			.txt4-1 {
				margin-left: 18rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
		}

		.tit5 {
			margin-top: 36rpx;
			margin-left: 244rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;

			.txt5-1 {
				color: #000000;
			}

			.txt5-2 {
				color: #4D8BFD;
			}
		}
	}

	/deep/ .u-input {
		margin-left: 80rpx;
		width: 584rpx;
		height: 112rpx;
		border-bottom: 2rpx solid #E6E6E6;
	}
</style>
