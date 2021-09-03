<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-field v-model="old_password" label-width='220' type='password' label="旧密码" placeholder="请填写旧密码">
		</u-field>
		<u-field v-model="new_password" label-width='220' type='password' label="新密码" placeholder="请填写新密码">
		</u-field>
		<u-field v-model="again_password" label-width='220' type='password' label="再次输入新密码" placeholder="请填写新密码">
		</u-field>
		<view @click="onSubmit" class="btn">确认并提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password: '',
				new_password: '',
				again_password: '',
			}
		},
		methods: {
			async onSubmit() {
				if (this.new_password !== this.again_password) {
					this.$refs.uToast.show({
						title: '两次输入的密码不一致',
						type: 'warning',
					})
				} else {
					const res = await this.$api.changePassword({
						old_password: this.old_password,
						new_password: this.new_password
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '修改成功',
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


<style scoped lang="scss">
	.index {}

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
</style>
