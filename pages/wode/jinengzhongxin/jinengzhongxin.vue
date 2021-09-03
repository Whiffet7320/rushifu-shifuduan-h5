<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="top">
			<view @click="toWode" class="arrow-left">
				<u-icon name="arrow-left" color="#ffffff" size="32"></u-icon>
			</view>
			<view class="tit1">技能中心</view>
			<view class="tit2">请选择您的技能和服务商品</view>
		</view>
		<view class="nav2">
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
						:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
						@tap.stop="swichMenu(index)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</scroll-view>
				<scroll-view scroll-y class="right-box">
					<view v-for="(item,index) in tabbar" :key="index">
						<template v-if="current==index">
							<view v-for="(item1,index1) in item.children" :key="item1.id">
								<view class="page-view">
									<view class="class-item">
										<view class="item-title">
											<text>{{item1.name}}</text>
											<u-checkbox-group>
												<u-checkbox label-size='24rpx'
													@change="checked=>checkboxChange(checked, index,index1)"
													v-model="item1.checked" name="全选">全选
												</u-checkbox>
											</u-checkbox-group>
										</view>
										<view class="item-container">
											<view class="thumb-box" v-for="(item2, index2) in item1.skills"
												:key="item2.id">
												<view @click="chooseMyRad(index,index1,index2)"
													:class="{'item-menu-name':true,'active':item2.check}">{{item2.name}}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</template>
					</view>
				</scroll-view>

			</view>
		</view>
		<view class="footer">
			<view class="txt1">累计已选{{num}}项</view>
			<view @click="toYixuanjineng" :class="{'txt2':true,'active':num != 0}">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				num: 0,
				// 
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				tabbar: [],
			}
		},
		watch: {
			tabbar: {
				handler() {
					this.num = 0;
					this.tabbar.forEach(ele => {
						ele.children.forEach(item => {
							item.skills.forEach(item1 => {
								item1.skill_name = item.name
								if (item1.check == true) {
									this.num++
								}
							})
						})
					})
				},
				deep: true,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				var onShowCheckArr = [];
				const res = await this.$api.craftsmanSkills();
				// console.log(res);
				this.tabbar = res.data;
				const res2 = await this.$api.seecraftsmanMyCraftsmanInfo()
				console.log(res2)
				res2.data.skills.forEach(checkEle => {
					this.tabbar.forEach(ele => {
						ele.children.forEach(item => {
							item.skills.forEach(item1=>{
								if(item1.id == checkEle.id){
									this.$set(item1,'check',true)
								}
							})
						})
					})
				})
				console.log(onShowCheckArr)
			},
			toWode() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			async toYixuanjineng() {
				var check = []; //选中的所有技能
				this.tabbar.forEach(ele => {
					ele.children.forEach(item => {
						var arr = item.skills.filter(item1 => {
							return item1.check;
						})
						arr.forEach(arrEle => {
							check.push(arrEle)
						})
					})
				})
				console.log(check);
				// check.forEach(checkEle => {
				// 	this.tabbar.forEach(ele => {
				// 		var arr2 = ele.children.filter(item => {
				// 			return item.id == checkEle.skill_category_id
				// 		})
				// 		arr2.forEach(arrEle => {
				// 			check.push(arrEle)
				// 		})
				// 	})
				// })


				if (this.num == 0) {
					this.$refs.uToast.show({
						title: '请先选择您的技能',
						type: 'warning',
					})
				} else {
					const res = await this.$api.craftsmanMyCraftsmanInfo({
						skills: check
					})
					console.log(res)
					this.$u.route('/pages/wode/jinengzhongxin/yixuanjineng', {
						checkArr: JSON.stringify(check),
					});
				}
			},
			chooseMyRad(i, i1, i2) {
				// console.log(i, i1, i2)
				this.$set(this.tabbar[i].children[i1].skills[i2], 'check', !this.tabbar[i].children[i1].skills[i2].check)
				console.log(this.tabbar[i].children[i1].skills[i2].check)
			},
			checkboxChange(e, i, i1) {
				// console.log(e.value);
				if (e.value) {
					this.tabbar[i].children[i1].skills.forEach(ele => {
						this.$set(ele, 'check', true);
					})
				} else {
					this.tabbar[i].children[i1].skills.forEach(ele => {
						this.$set(ele, 'check', false);
					})
				}
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.top {
		width: 750rpx;
		height: 260rpx;
		opacity: 1;
		background: linear-gradient(90deg, #4d53fd, #4d8bfd);

		.arrow-left {
			padding-top: 78rpx;
			margin-left: 22rpx;
		}

		.tit1 {
			margin-top: 20rpx;
			margin-left: 32rpx;
			font-size: 48rpx;
			font-family: Segoe UI, Segoe UI-Bold;
			font-weight: 700;
			color: #ffffff
		}

		.tit2 {
			margin-top: 2rpx;
			margin-left: 32rpx;
			font-size: 24rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #ffffff;
		}
	}

	.nav2 {
		.u-wrap {
			height: calc(100vh);
			display: flex;
			flex-direction: column;
		}

		.u-search-box {
			padding: 18rpx 30rpx;
		}

		.u-menu-wrap {
			flex: 1;
			display: flex;
			overflow: hidden;
		}

		.u-search-inner {
			background-color: rgb(234, 234, 234);
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 16rpx;
		}

		.u-search-text {
			font-size: 26rpx;
			margin-left: 10rpx;
		}

		.u-tab-view {
			width: 200rpx;
			height: 100%;
		}

		.u-tab-item {
			height: 110rpx;
			background: #f6f6f6;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #444;
			font-weight: 400;
			line-height: 1;
			font-family: Segoe UI;
		}

		.u-tab-item-active {
			position: relative;
			color: #4D8BFD;
			// font-size: 32rpx;
			font-weight: 600;
			font-family: Segoe UI;
			// background: #fff;
		}

		.u-tab-item-active::before {
			content: "";
			position: absolute;
			height: 32rpx;
			left: 0;
			top: 39rpx;
		}

		.u-tab-view {
			height: 100%;
		}

		.right-box {
			// background-color: rgb(250, 250, 250);
			width: 546rpx;
			// height: 928rpx;
			height: calc(100vh - 392rpx);
			margin-right: 24rpx;
			border-radius: 16rpx;
			// margin-bottom: 136rpx;
			background-color: #fff;
		}

		.page-view {
			// padding: 16rpx;
		}

		.class-item {
			background-color: #fff;
			padding: 0 30rpx;
			border-radius: 8rpx;
		}

		.item-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 26rpx;
			font-size: 26rpx;
			font-weight: bold;
			margin-bottom: 42rpx;
			margin-left: 14rpx;
		}

		.item-title2 {
			padding-top: 26rpx;
			font-size: 26rpx;
			font-weight: bold;
			margin-bottom: 42rpx;
			color: #666666;
		}

		.item-menu-name {
			background: #e9f2fd;
			border-radius: 16rpx;
			padding: 14rpx 26rpx;
			text-align: center;
			width: 90%;
			font-weight: normal;
			font-size: 20rpx;
			color: #707070;
		}

		.item-menu-name.active {
			background: #4d8bfd;
			color: #FFFFFF;
		}

		.u-tab-view.menu-scroll-view {
			height: calc(100vh - 392rpx);
			background: #f6f6f6;
		}

		.uni-scroll-view {
			height: calc(100vh - 392rpx);
		}

		.item-container {
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
		}

		.thumb-box {
			width: 33.333333%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			// margin-top: 20rpx;
			margin-bottom: 42rpx;
		}

		.thumb-box2 {
			width: 100%;
			display: flex;
			margin-bottom: 22rpx;

			.item-menu-image2 {
				width: 184rpx;
				height: 184rpx;
			}

			.box-right {
				display: flex;
				flex-direction: column;
				margin-left: 12rpx;
				justify-content: space-between;

				.txt1 {
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
				}

				.txt2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #666666;
				}

				.txt3 {
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #4D8BFD;
				}
			}
		}

		.item-menu-image {
			width: 120rpx;
			height: 120rpx;
		}
	}

	.footer {
		padding: 0 60rpx;
		border-top: 2rpx solid #e6e6e6;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 136rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.txt1 {
			font-size: 28rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #000000;
		}

		.txt2 {
			width: 252rpx;
			height: 80rpx;
			background: #b1cbfd;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}

		.txt2.active {
			background: #4d8bfd;
		}
	}
</style>
