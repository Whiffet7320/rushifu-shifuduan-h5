import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 师傅端
		dingdanliebiaopage:1,//订单列表
		dingdanliebiaopageSize:10,
		lishiDingdanliebiaopage:1,//历史订单列表
		lishiDingdanliebiaopageSize:10,
	},
	mutations: {
		dingdanliebiaopage(state, str) {
			state.dingdanliebiaopage = str;
		},
		lishiDingdanliebiaopage(state, str) {
			state.lishiDingdanliebiaopage = str;
		},
	},
	actions: {

	},
});
