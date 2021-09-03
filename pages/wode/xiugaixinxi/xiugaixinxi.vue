<template>
	<view class="index">
		<view class="nav1">
			<view class="item1">
				<view class="txt1">头像</view>
				<view class="txt2" @click="changeAvatar">
					<image v-if="userObj.avatar" class="pic1" :src="userObj.avatar" mode=""></image>
					<image v-else class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
					<u-icon name="arrow-right" color="#000000" size="28"></u-icon>
				</view>
			</view>
			<view class="item1" @click="toNichengxiugai">
				<view class="txt1-2 txt1">
					<view class="txt1-2-1">昵称</view>
					<view class="txt1-2-2">{{userObj.nick_name}}</view>
				</view>
				<view class="txt2">
					<u-icon name="arrow-right" color="#000000" size="28"></u-icon>
				</view>
			</view>
			<view class="item1" @click="toShoujihaoxiugai">
				<view class="txt1-2 txt1">
					<view class="txt1-2-1">手机号</view>
					<view class="txt1-2-2">{{userObj.phone}}</view>
				</view>
				<view class="txt2">
					<u-icon name="arrow-right" color="#000000" size="28"></u-icon>
				</view>
			</view>
			<view class="item1" @click="toMimaxiugai">
				<view class="txt1-2 txt1">
					<view class="txt1-2-1">密码</view>
					<view class="txt1-2-2">******************</view>
				</view>
				<view class="txt2">
					<u-icon name="arrow-right" color="#000000" size="28"></u-icon>
				</view>
			</view>
		</view>
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
				const res2 = await this.$api.userMessage()
				// console.log(res2)
				this.userObj = {
					...res.data,
					...res2.data
				}
			},
			toNichengxiugai(){
				uni.navigateTo({
					url:'/pages/wode/xiugaixinxi/nichengxiugai'
				})
			},
			toShoujihaoxiugai(){
				uni.navigateTo({
					url:`/pages/wode/xiugaixinxi/genhuanshoujihao?phone=${this.userObj.phone}`
				})
			},
			toMimaxiugai(){
				uni.navigateTo({
					url:'/pages/wode/xiugaixinxi/mimaxiugai'
				})
			},
			async changeAvatar(){
				const img = await this.$OSSUpload('img')
				console.log(img)
				this.userObj.avatar = img
				const res = await this.$api.setUserInfo(this.userObj)
				console.log(res)
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

	.nav1 {
		margin-top: 14rpx;
		height: calc(100vh - 14rpx);
		background: #FFFFFF;
		padding: 0 20rpx;

		.item1 {
			height: 106rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #E6E6E6;

			.txt1 {
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}

			.txt1-2 {
				display: flex;
				align-items: center;

				.txt1-2-1 {
					width: 138rpx;
				}

				.txt1-2-2 {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 38rpx;
					color: #9A9A9A;
				}
			}

			.txt2 {
				display: flex;
				align-items: center;

				.pic1 {
					width: 86rpx;
					height: 86rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
