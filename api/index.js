import axios from 'axios';
import Vue from 'vue'
// import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myGet = axios.create({
	baseURL: urls.baseUrl,
	method: 'get',
	// timeout: 1000,
})
let myDelete = axios.create({
	baseURL: urls.baseUrl,
	method: 'delete',
	// timeout: 1000,
})
let myPut = axios.create({
	baseURL: urls.baseUrl,
	method: 'put',
	// timeout: 1000,
})
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

myPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept':'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept':'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token': sessionStorage.token,
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPut.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept':'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.showModal({
			    title: '提示',
			    content: '您还未登录账号，前往登录',
			    success: function (res) {
			        if (res.confirm) {
			            uni.navigateTo({
			            	url: '/pages/wode/zhanghaodenglu/zhanghaodenglu'
			            })
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myGet.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.showModal({
			    title: '提示',
			    content: '您还未登录账号，前往登录',
			    success: function (res) {
			        if (res.confirm) {
			            uni.navigateTo({
			            	url: '/pages/wode/zhanghaodenglu/zhanghaodenglu'
			            })
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myPut.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.showModal({
			    title: '提示',
			    content: '您还未登录账号，前往登录',
			    success: function (res) {
			        if (res.confirm) {
			            uni.navigateTo({
			            	url: '/pages/wode/zhanghaodenglu/zhanghaodenglu'
			            })
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})

export default {
	craftsmanRegister(obj) {
		return myPost({
			url: urls.craftsmanRegister,
			data: {
				...obj
			},
		})
	},
	sms(obj) {
		return myGet({
			url: urls.sms,
			params: {
				...obj
			},
		})
	},
	craftsmanLogin(obj) {
		return myPost({
			url: urls.craftsmanLogin,
			data: {
				...obj
			},
		})
	},
	craftsmanLoginCode(obj) {
		return myPost({
			url: urls.craftsmanLoginCode,
			data: {
				...obj
			},
		})
	},
	craftsmanSkills(obj) {
		return myGet({
			url: urls.craftsmanSkills,
			params: {
				...obj
			},
		})
	},
	craftsmanForgetPwd(obj) {
		return myPost({
			url: urls.craftsmanForgetPwd,
			data: {
				...obj
			},
		})
	},
	craftsmanMyCraftsmanInfo(obj) {
		return myPut({
			url: urls.craftsmanMyCraftsmanInfo,
			data: {
				...obj
			},
		})
	},
	seecraftsmanMyCraftsmanInfo() {
		return myGet({
			url: urls.seecraftsmanMyCraftsmanInfo,
		})
	},
	craftsmanIdentityCard(obj) {
		return myPost({
			url: urls.craftsmanIdentityCard,
			data: {
				...obj
			},
		})
	},
	uploadToken() {
		return myGet({
			url: urls.uploadToken,
		})
	},
	getCraftsmanIdentityCard() {
		return myGet({
			url: urls.getCraftsmanIdentityCard,
		})
	},
	userInfo() {
		return myGet({
			url: urls.userInfo,
		})
	},
	setUserInfo(obj) {
		return myPut({
			url: urls.setUserInfo,
			data: {
				...obj
			},
		})
	},
	craftsmanDemandQuotes(obj) {
		return myGet({
			url: urls.craftsmanDemandQuotes,
			params:{
				...obj
			}
		})
	},
	cities() {
		return myGet({
			url: urls.cities,
		})
	},
	craftsmanHome() {
		return myGet({
			url: urls.craftsmanHome,
		})
	},
	changePhone(obj) {
		return myPut({
			url: urls.changePhone,
			data: {
				...obj
			},
		})
	},
	changePassword(obj) {
		return myPut({
			url: urls.changePassword,
			data: {
				...obj
			},
		})
	},
	userMessage() {
		return myGet({
			url: urls.userMessage,
		})
	},
	seecraftsmanDemandQuotes(obj) {
		return myGet({
			url: `${urls.seecraftsmanDemandQuotes}/${obj.id}`,
		})
	},
	craftsmanQuote(obj) {
		return myPost({
			url: urls.craftsmanQuote,
			data: {
				...obj
			},
		})
	},
	craftsmanStart(obj) {
		return myPut({
			url: `${urls.craftsmanStart}/${obj.id}/start`,
			data: {
				code:obj.code,
			},
		})
	},
	ordersFinish(id) {
		return myPut({
			url: `${urls.ordersFinish}/${id}/finish`,
		})
	},
	craftsmanMyDemandQuotes(obj) {
		return myGet({
			url: urls.craftsmanMyDemandQuotes,
			params:{
				...obj
			}
		})
	},
}
