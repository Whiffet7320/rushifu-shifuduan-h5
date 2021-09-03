<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1"></view>
			<view class="tit2">已选技能3项技能</view>
		</view>
		<view class="nav2">
			<u-table>
				<u-tr v-for="(item,index) in tabArr" :key='index' class="u-tr">
					<u-td class="u-td">{{item.left}}</u-td>
					<u-td class="u-td">{{item.right}}</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="footer">
			<view @click="toWode" class="btn">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkArr: null,
				tabArr: [],
				tabRight: [],
				tabLeft:[],
			}
		},
		onLoad(option) {
			var arr = [];
			var right = '';
			var myI = -1;
			this.checkArr = JSON.parse(option.checkArr)
			this.checkArr.forEach(ele => {
				if (!arr.includes(ele.skill_category_id)) {
					arr.push(ele.skill_category_id)
				}
			})
			arr.forEach(ele => {
				this.checkArr.forEach(ele1 => {
					if (ele == ele1.skill_category_id) {
						if (!this.tabLeft.includes(ele1.skill_name)) {
							this.tabLeft.push(ele1.skill_name)
							this.tabRight.push(ele1.name)
							myI ++
						}else{
							this.$set(this.tabRight,myI,`${this.tabRight[myI]},${ele1.name}`)
						}
					}
				})
			})
			this.tabLeft.forEach(ele=>{
				this.tabArr.push({
					left:ele
				})
			})
			this.tabRight.forEach((ele,i)=>{
				this.$set(this.tabArr[i],'right',ele)
			})
			console.log(this.tabArr)
		},
		methods: {
			toWode() {
				// this.$refs.uToast.show({
				// 	title: '添加成功',
				// 	type: 'success',
				// 	url: '/pages/wode/jinengzhongxin/shenfenyanzheng'
				// })
				this.$u.route('/pages/index/suozaidizhi/suozaidizhi', {
					checkArr: JSON.stringify(this.checkArr),
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		padding: 24rpx 24rpx 30rpx 24rpx;
		display: flex;
		align-items: center;

		.tit1 {
			width: 4rpx;
			height: 32rpx;
			opacity: 1;
			background: #4d8bfd;
			border-radius: 2rpx;
		}

		.tit2 {
			margin-left: 14rpx;
			opacity: 1;
			font-size: 28rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			text-align: center;
			color: #000000;
		}
	}

	.nav2 {
		padding: 0 24rpx;

		/deep/ .u-td {
			height: auto !important;
			font-size: 24rpx !important;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #000000 !important;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 136rpx;
		background: #ffffff;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;

		.btn {
			margin-right: 50rpx;
			width: 252rpx;
			height: 80rpx;
			background: #4d8bfd;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
</style>
