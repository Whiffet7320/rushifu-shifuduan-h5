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
		<input type="file" name="companyLogo" id="file0" class="displayN" multiple="multiple"
			@change="companyLogo($event)" ref="fileInputList" />
	</view>
</template>

<script>
	import {
		Base64
	} from 'js-base64/base64.js';
	import OSS from 'ali-oss';
	import crypto from 'crypto-js';
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
			toNichengxiugai() {
				uni.navigateTo({
					url: '/pages/wode/xiugaixinxi/nichengxiugai'
				})
			},
			toShoujihaoxiugai() {
				uni.navigateTo({
					url: `/pages/wode/xiugaixinxi/genhuanshoujihao?phone=${this.userObj.phone}`
				})
			},
			toMimaxiugai() {
				uni.navigateTo({
					url: '/pages/wode/xiugaixinxi/mimaxiugai'
				})
			},
			async changeAvatar() {
				const that = this;
				const date = new Date();
				date.setHours(date.getHours() + 1);
				uni.chooseImage({
					count: 1,
					success: async function(res) {
						const policyText = {
							expiration: date.toISOString(), // 设置policy过期时间。
							conditions: [
								// 限制上传大小。
								["content-length-range", 0, 1024 * 1024 * 1024],
							],
						};
						let tiemr = new Date();
						let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr
							.getDate();
						const policy = Base64.encode(JSON.stringify(policyText));
						const res1 = await that.$api.uploadToken();
						console.log(res1)
						const signature = crypto.enc.Base64.stringify(crypto.HmacSHA1(
							policy, res1.data.accessKeySecret));
						var imageSrc = res.tempFilePaths[0];
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf(
							'.'));
						let nameStr = address + tiemr.getTime() + str;
						uni.uploadFile({
							url: `https://${res1.data.bucket}.${res1.data.url}`, //输入你的bucketname.endpoint
							filePath: imageSrc,
							name: 'file',
							formData: {
								key: nameStr,
								policy: policy, // 输入你获取的的policy
								OSSAccessKeyId: res1.data.accessKeyId, // 输入你的AccessKeyId
								signature: signature, // 输入你获取的的signature
								'x-oss-security-token': res1.data.stsToken
							},
							success: res => {
								if (res.statusCode == '204') {
									console.log(`https://${res1.data.bucket}.${res1.data.url}/${nameStr}`);
									that.userObj.avatar = `https://${res1.data.bucket}.${res1.data.url}/${nameStr}`
									that.$api.setUserInfo(that.userObj).then((res)=>{
										console.log(res)
									})
								} else {
									console.log(res);
								}
							}
						})
					}
				});

				// const img = await this.$OSSUpload('img','','true')
				// console.log(img)
				// this.userObj.avatar = img
				// const res = await this.$api.setUserInfo(this.userObj)
				// console.log(res)
			},
			
			companyLogo(event) {
				var file = event.target.files[0];
				this.imgFile = file;
				this.uploading(true);
				this.$refs.fileInputList.value = "";
			},
			//将文件转为blob类型
			readFileAsBuffer(file) {
				const reader = new FileReader();
				return new Promise(resolve => {
					reader.readAsDataURL(file);
					reader.onload = function() {
						const base64File = reader.result.replace(
							/^data:\w+\/\w+;base64,/,
							""
						);
						resolve(new window.OSS.Buffer(base64File, "base64"));
					};
				});
			},
			async uploading(flag) {
				// console.log(document.getElementById("file0").value);
				if (flag) {
					var file_re = await this.readFileAsBuffer(this.imgFile);
					const res = await this.$api.uploadToken();
					let myData = res.data;
					console.log(myData);
					let client = new window.OSS.Wrapper({
						region: myData.region, //oss地址
						accessKeyId: myData.accessKeyId, //ak
						accessKeySecret: myData.accessKeySecret, //secret
						stsToken: myData.stsToken,
						bucket: myData.bucket //oss名字
					});
					var imgtype = this.imgFile.type.substr(6, 4);
					var store = `${new Date().getTime()}.${imgtype}`;
					client.put(store, file_re).then(() => {
						//这个结果就是url
						console.log(store);
						// var oss_imgurl = client.signatureUrl(store);
						var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
						this.$set(this.ruleForm, "image", oss_imgurl);
						console.log(oss_imgurl);
					});
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

	.displayN {
		display: none;
	}

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
