export default {
    baseUrl: 'http://192.168.50.96:8001',
	uploadToken:'/api/upload/token',//上传测试
	craftsmanRegister:'/api/craftsman/register',//注册
	sms:'/api/sms',//发送短信
	craftsmanLogin:'/api/craftsman/login',//登录
	craftsmanLoginCode:'/api/craftsman/login-code',//验证码登录
	craftsmanSkills:'/api/craftsman/skills',//技能列表
	craftsmanForgetPwd:'/api/craftsman/forget-pwd',//修改密码
	craftsmanMyCraftsmanInfo:'/api/craftsman/my/craftsman-info',//修改师傅信息
	seecraftsmanMyCraftsmanInfo:'/api/craftsman/my/craftsman-info',//师傅信息
	craftsmanIdentityCard:'/api/craftsman/identity-card',//上传身份证信息
	getCraftsmanIdentityCard:'/api/craftsman/identity-card',//获取身份证信息
	userInfo:'/api/user-info',//用户信息
	setUserInfo:'/api/user-info',//修改用户信息
	craftsmanDemandQuotes:'/api/craftsman/demand-quotes',//可报价的需求单列表
	cities:'/api/cities',//城市列表
	craftsmanHome:'/api/craftsman/home',//师傅首页
	changePhone:'/api/change-phone',//修改手机号
	changePassword:'/api/change-password',//通过旧密码修改密码
	userMessage:'/api/user',//账户信息
	seecraftsmanDemandQuotes:'/api/craftsman/demand-quotes',//可报价的需求详情
	craftsmanQuote:'/api/craftsman/quote',//报价
}