import Vue from 'vue';
import CryptoJS from 'crypto-js';

let timeout = null;
// let timer;
let flag;

const utils = {
	// 全局正则
	reg: {
		phoneReg: /^(1[3-9])\d{9}$/, // 手机号正则

		// passwordReg: /^(?=.*)(\w).{6,18}$/, // 密码正则6-18位大小写字母或者数字以及一些特殊字符,此校验有问题
		passwordReg: /^\w{6,18}$/, // 密码正则6-18位大小写字母或者数字以及一些特殊字符,此校验有问题

		phoneCodeReg: /^\d{6}$/, // 手机验证码必须为6位数字
		verifyCodeReg: /^\d{4}$/ // 图片4位数字验证码
	},
	/**
   * 节流原理：在一定时间内，只能触发一次
   *
   * @param {Function} func 要执行的回调函数
   * @param {Number} wait 延时的时间
   * @param {Boolean} immediate 是否立即执行
   * @return null
   */
	throttle(func, wait = 500, immediate = true) {
		if (immediate) {
			if (!flag) {
				flag = true;
				// 如果是立即执行，则在wait毫秒内开始时执行
				typeof func === 'function' && func();
				setTimeout(() => {
					flag = false;
				}, wait);
			}
		} else {
			if (!flag) {
				flag = true;
				// 如果是非立即执行，则在wait毫秒内的结束处执行
				setTimeout(() => {
					flag = false;
					typeof func === 'function' && func();
				}, wait);
			}
		}
	},
	/**
   * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
   *
   * @param {Function} func 要执行的回调函数
   * @param {Number} wait 延时的时间
   * @param {Boolean} immediate 是否立即执行
   * @return null
   */
	debounce(func, wait = 500, immediate = false) {
		// 清除定时器
		if (timeout !== null) clearTimeout(timeout);
		// 立即执行，此类情况一般用不到
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function() {
				timeout = null;
			}, wait);
			if (callNow) typeof func === 'function' && func();
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			timeout = setTimeout(function() {
				typeof func === 'function' && func();
			}, wait);
		}
	},
	//判断字符串是否为空
	isEmpty(str) {
		if (str === '' || str === undefined || str === null) {
			return true;
		} else {
			return false;
		}
	},
	getUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
		});
	},
	/**
   * 加密
   * @param word
   * @returns {*}
   */
	aesMinEncrypt(word) {
		var _word = CryptoJS.enc.Utf8.parse(word),
			_key = CryptoJS.enc.Utf8.parse('_aes_secret_key_'),
			_iv = CryptoJS.enc.Utf8.parse('_aes_secret_iv__');
		var encrypted = CryptoJS.AES.encrypt(_word, _key, {
			iv: _iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	},
	/**
   * 解密
   * @param word
   * @returns {*}
   */
	aesDecrypt(word) {
		var _key = CryptoJS.enc.Utf8.parse('_aes_secret_key_'),
			_iv = CryptoJS.enc.Utf8.parse('_aes_secret_iv__');
		var decrypted = CryptoJS.AES.decrypt(word, _key, {
			iv: _iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	},

	/**
   *  js 乘法函数 用来得到精确的乘法结果
   */
	accMul(arg1, arg2) {
		let m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split('.')[1].length;
		} catch (e) {}
		try {
			m += s2.split('.')[1].length;
		} catch (e) {}
		return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
	}
};

export default utils;