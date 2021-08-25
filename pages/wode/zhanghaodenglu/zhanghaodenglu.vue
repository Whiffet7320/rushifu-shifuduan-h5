<template>
	<view class="index">
		<image class="pic1" src="/static/image/mcz8.png" mode=""></image>
		<view class="nav1">
			<view class="tit1">账号登录</view>
			<u-input :clearable='false' placeholder='输入注册手机号码' v-model="username" type="text" height="112" />
			<u-input :clearable='false' placeholder='输入您的账号密码' v-model="password" type="password" height="112" />
			<view class="tit2">登录</view>
			<view class="tit3">
				<view class="txt3-1">找回账号</view>
				<view class="txt3-1">忘记密码？</view>
			</view>
			<view class="tit4">
				<image class="pic4-1" src="/static/image/shouji.png" mode=""></image>
				<view class="txt4-1">验证码登录</view>
			</view>
			<view class="tit5">
				<view class="txt5-1">没有账号？</view>
				<view class="txt5-2">注册账号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				password:'',
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}
</style>

<style scoped lang="scss">
	.index{
		position: relative;
	}
	.pic1{
		height: 340rpx;
		width: 750rpx;
	}
	.nav1{
		margin-bottom: 12rpx;
		position: absolute;
		top: 250rpx;
		width: 750rpx;
		height: 1084rpx;
		background: #FFFFFF;
		border-radius: 84rpx;
		.tit1{
			text-align: center;
			margin-top: 38rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}
		.tit2{
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
		.tit3{
			margin-top: 56rpx;
			width: 584rpx;
			margin-left: 86rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.txt3-1{
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
		}
		.tit4{
			margin: 104rpx 0 0 240rpx ;
			width: 264rpx;
			height: 88rpx;
			background: #F5F8FF;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			.pic4-1{
				margin-left: 30rpx;
				height: 50rpx;
				width: 34rpx;
			}
			.txt4-1{
				margin-left: 18rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
		}
		.tit5{
			margin-top: 36rpx;
			margin-left: 244rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			.txt5-1{
				color: #000000;
			}
			.txt5-2{
				color: #4D8BFD;
			}
		}
	}
	/deep/ .u-input{
		margin-left: 80rpx;
		width: 584rpx;
		height: 112rpx;
		border-bottom: 2rpx solid #E6E6E6;
	}
</style>
