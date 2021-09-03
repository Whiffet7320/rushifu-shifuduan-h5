<template>
	<view class="index">
		<u-toast ref="uToast" />
		<image class="pic1" src="/static/image/mcz9.png" mode=""></image>
		<view class="nav1">
			<view class="txt1">基本信息</view>
			<u-field v-model="mobile" :border-bottom='false' label="手机号" placeholder="请填写手机号">
			</u-field>
			<u-field v-model="code" :border-bottom='false' label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<view class="nav2">
			<u-field v-model="password" type='password' :border-bottom='false' label="设置密码"
				placeholder="请输入8~20位字符，包含字...">
			</u-field>
			<u-field v-model="password2" type='password' :border-bottom='false' label="确认密码" placeholder="请再次确认登录密码">
			</u-field>
		</view>
		<view class="nav3">
			<view class="tit3-1">+</view>
			<view class="tit3-2">添加备用手机号</view>
		</view>
		<view class="nav4">
			注册号码无法接通的情况下，用户将可能通过备用号码 联系您，为不影响您的服务质量，建议填写备用号码
		</view>
		<view @click="onSubmit" class="btn">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: '',
				password: '',
				password2: '',
			}
		},
		methods: {
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
						type: 0,
						phone: this.mobile
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
			async onSubmit() {
				const that = this;
				if (this.password.length < 8 || this.password.length > 20) {
					this.$refs.uToast.show({
						title: '请输入正确长度的密码',
						type: 'warning',
					})
				} else if (this.password !== this.password2) {
					this.$refs.uToast.show({
						title: '密码输入不一致',
						type: 'warning',
					})
				} else {
					const res = await this.$api.craftsmanRegister({
						phone: this.mobile,
						password: this.password,
						code: this.code
					})
					console.log(res)
					if (res.code == 200) {
						uni.setStorageSync('myUser', res.data.user)
						console.log('222222')
						uni.setStorage({
							key: 'token',
							data: res.data.token_info.access_token,
							success() {
								console.log('1111111')
								that.$refs.uToast
									.show({
										url:'/pages/wode/zhanghaodenglu/zhanghaodenglu',
										title: '注册成功',
										type: 'success',
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

	.pic1 {
		height: 262rpx;
		width: 750rpx;
	}

	.nav1 {
		transform: translateY(-64rpx);
		margin-left: 20rpx;
		width: 710rpx;
		height: 274rpx;
		background: #FFFFFF;
		border-radius: 16rpx;

		.txt1 {
			margin-bottom: 22rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
			margin-left: 38rpx;
			padding-top: 24rpx;
		}

		/deep/ .u-field {
			border-top: 2rpx solid #E6E6E6;
			;
			padding: 20rpx 20rpx;
			margin: 0 20rpx;
		}
	}

	.nav2 {
		transform: translateY(-44rpx);
		margin-left: 20rpx;
		width: 710rpx;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 16rpx;

		/deep/ .u-field {
			&:nth-child(1) {
				border-bottom: 2rpx solid #E6E6E6;
			}

			padding: 20rpx 20rpx;
			margin: 0 20rpx;
		}
	}

	.nav3 {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.tit3-1 {
			font-size: 30rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #4D8BFD;
		}

		.tit3-2 {
			margin-left: 16rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #4D8BFD;
		}
	}

	.nav4 {
		margin-top: 70rpx;
		margin-left: 40rpx;
		width: 672rpx;
		font-size: 28rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 38rpx;
		color: #999999;
	}

	.btn {
		margin-top: 82rpx;
		margin-left: 228rpx;
		width: 296rpx;
		height: 96rpx;
		background: #4D8BFD;
		border-radius: 16rpx;
		line-height: 96rpx;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		text-align: center;
		color: #FFFFFF;
	}
</style>
