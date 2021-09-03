<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1">
				<view class="txt1">{{addressObj.inputLeft}}</view>
				<view class="shu"></view>
				<u-input @input='searchAddress' v-model="value" type="text" :border="false" />
			</view>
			<view class="tit2">当前定位</view>
			<view class="tit3">
				<view class="tit3-1">
					<image class="pic1" src="/static/image/lujin67.png" mode=""></image>
					<view class="txt3-1">{{addressObj.bottom}}</view>
				</view>
				<view @click="getAddress" class="tit3-2">重新定位</view>
			</view>
		</view>
		<view class="nav2">
			<view class="items">
				<view @click="chooseAddress(item)" v-for="item in addressList" class="item">
					<view class="txt1">{{item.name}}</view>
					<view class="txt2">{{item.address}}</view>
				</view>
			</view>
		</view>
		<view @click="onSubmit" class="btn">确认并提交</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getAddress()
			setTimeout(()=>{
				this.getData()
			},300)
			
		},
		onLoad(option) {
			this.checkArr = JSON.parse(option.checkArr)
		},
		data() {
			return {
				value: '',
				addressObj: '',
				addressList: [],
				province:'',
				city: '',
				area_id:'',
				checkArr:[],
				longitude:'',
				latitude:'',
			}
		},
		methods: {
			async getData() {
				console.log(this.province,'11111')
				const res = await this.$api.cities()
				const myAddress = res.data.filter(ele=>{
					return ele.name == this.province
				})
				const myCity = myAddress[0].children.filter(ele=>{
					return ele.name == this.city
				})
				this.area_id = myCity[0].id;
			},
			getAddress() {
				this.value = '';
				const that = this;
				uni.getLocation({
					success(res) {
						// console.log(res, 'res')
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						let params = {
							key: '52ad0cb98f8b948f42ab9293c027877e',
							// location: `${120.63768},${28.00708}`
							location: `${res.longitude},${res.latitude}`
						}
						uni.request({
							url: 'https://restapi.amap.com/v3/geocode/regeo',
							data: params,
							success(ress) {
								// console.log(ress.data.regeocode.addressComponent)
								that.addressObj = ress.data.regeocode.addressComponent;
								that.province = that.addressObj.province;
								that.city = that.addressObj.city;
								if (that.addressObj.city.length == 0) {
									that.addressObj.inputLeft =
										`${that.addressObj.province}-${that.addressObj.district}`
								} else {
									that.addressObj.inputLeft =
										`${that.addressObj.city}-${that.addressObj.district}`
								}

								if (that.addressObj.building.name.length != 0) {
									that.addressObj.bottom = that.addressObj.building.name;
								} else if (that.addressObj.neighborhood.name.length != 0) {
									that.addressObj.bottom = that.addressObj.neighborhood.name;
								} else {
									that.addressObj.bottom =
										`${that.addressObj.streetNumber.street}${that.addressObj.streetNumber.number}`;
								}

							}
						})
					}
				})
			},
			
			
			searchAddress(e) {
				let params = {
					key: '52ad0cb98f8b948f42ab9293c027877e',
					keywords: e
				}
				uni.request({
					url: 'https://restapi.amap.com/v3/place/text',
					data: params,
					success: res => {
						setTimeout(() => {
							this.addressList = res.data.pois;
						}, 200)
					}
				})
			},
			chooseAddress(item) {
				console.log(item)
				this.value = item.name;
				this.searchAddress(this.value)
				this.addressObj.inputLeft = `${item.cityname}-${item.adname}`
			},
			async onSubmit(){
				const res = await this.$api.craftsmanMyCraftsmanInfo({
					skills:this.checkArr,
					area_id:this.area_id,
					longitude:this.longitude,
					latitude:this.latitude,
					address:`${this.addressObj.inputLeft} ${this.value}`
				})
				console.log(res)
				if(res.code == 200){
					this.$refs.uToast.show({
						title: '添加成功',
						type: 'success',
						url: '/pages/wode/jinengzhongxin/shenfenyanzheng'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		width: 750rpx;
		height: 396rpx;
		background: #292c33;
		padding-top: 30rpx;

		.tit1 {
			padding: 0 38rpx;
			margin-left: 20rpx;
			width: 710rpx;
			height: 88rpx;
			background: #ffffff;
			border: 2rpx solid #707070;
			border-radius: 46rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 28rpx;
				font-family: Segoe UI, Segoe UI-Regular;
				font-weight: 400;
				color: #000000;
			}

			.shu {
				margin: 0 22rpx;
				width: 2rpx;
				height: 38rpx;
				border: 2rpx solid #e6e6e6;
			}
		}

		.tit2 {
			margin-top: 26rpx;
			font-size: 28rpx;
			font-family: Segoe UI, Segoe UI-Regular;
			font-weight: 400;
			color: #ffffff;
			padding: 0 58rpx;
		}

		.tit3 {
			margin-top: 14rpx;
			padding: 0 54rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tit3-1 {
				display: flex;
				align-items: center;

				.pic1 {
					width: 34rpx;
					height: 40rpx;
				}

				.txt3-1 {
					margin-left: 26rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #FFFFFF;
				}
			}

			.tit3-2 {
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #4D8BFD;
			}
		}

	}

	.nav2 {
		position: absolute;
		left: 20rpx;
		top: 260rpx;
		width: 710rpx;
		height: 64vh;
		background: #FFFFFF;
		border-radius: 16rpx;

		.items {
			height: 100%;
			overflow-y: scroll;

			.item {
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 38rpx;
				border-bottom: 2rpx solid #F5F5F5;

				.txt1 {
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
				}

				.txt2 {
					margin-top: 14rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
				}
			}
		}
	}
	.btn{
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 296rpx;
		height: 80rpx;
		background: #4D8BFD;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-family: Segoe UI;
		font-weight: 400;
		color: #FFFFFF;
	}

</style>
