<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1">当前手机号</view>
			<view class="tit2">
				<view class="txt1">+86</view>
				<view class="txt2">{{nowPhone}}</view>
			</view>
		</view>
		<view class="nav2 nav1">
			<view class="tit1">当前手机号</view>
			<view class="tit2">
				<view class="txt1">+86</view>
				<u-input :clearable='false' placeholder='输入新的手机号码' v-model="phone" type="text" height="60" />
			</view>
			<u-field v-model="code" :border-bottom='false' placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<view @click="onSubmit" class="btn">确认并提交</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				code:'',
				codeText: '',
				phone:'',
				nowPhone:"",
			}
		},
		onLoad(option) {
			this.nowPhone = option.phone
		},
		methods:{
			async onSubmit(){
				const res = await this.$api.changePhone({
					phone:this.phone,
					code:this.code
				})
				console.log(res)
				if(res.code == 200){
					this.$refs.uToast.show({
						title: '修改成功',
						type: 'success',
						back:true
					})
				}else{
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
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
						type: 3,
						phone: this.phone
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
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}
	.nav1{
		font-size: 32rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 42rpx;
		color: #000000;
		padding: 8rpx 48rpx;
		.tit2{
			display: flex;
			align-content: center;
			.txt2{
				margin-left: 30rpx;
			}
		}
	}
	.nav2{
		.txt1{
			line-height: 60rpx;
			margin-right: 20rpx;
		}
		margin-top: 48rpx;
	}
	.btn {
		margin-top: 76rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		width: 296rpx;
		height: 80rpx;
		background: #4D8BFD;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-family: Segoe UI;
		font-weight: 400;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
	}
	/deep/ .u-input{
		border-bottom: 2rpx solid #CCCCCC;
	}
	/deep/ .u-field{
		border-bottom: 2rpx solid #CCCCCC;
		height: 80rpx;
	}
	/deep/ .u-label{
		flex: 0 0 30rpx !important;
	}
	/deep/ .input-placeholder {
		color: rgb(192, 196, 204) !important;
	}
	
</style>
