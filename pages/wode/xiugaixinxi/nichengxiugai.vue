<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="inp">
			<u-input v-model="userObj.nick_name" type="text" :border='false' />
		</view>
		<view class="txt">（最多只能6个字）</view>
		<view @click="onSubmit" class="btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userObj: null,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.userInfo()
				// console.log(res)
				this.userObj = {
					...res.data
				}
			},
			async onSubmit() {
				const res = await this.$api.setUserInfo(this.userObj);
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '修改成功',
						type: 'success',
						back: true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.inp {
		margin: 0 20rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.txt {
		margin-top: 24rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		line-height: 32rpx;
		color: #999999;
	}

	.btn {
		margin-top: 174rpx;
		margin-left: 126rpx;
		width: 500rpx;
		height: 72rpx;
		background: #7285FF;
		border-radius: 40rpx;
		font-size: 28rpx;
		text-align: center;
		font-family: Helvetica;
		line-height: 72rpx;
		color: #FFFFFF;
	}
</style>
