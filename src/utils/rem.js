(function(designWidth) {
	// 设计稿的宽度 designWidth
	function computedFont() {
		// 当前视口的宽度
		let winW = document.documentElement.clientWidth || document.body.clientWidth;
		// 计算页面中的html的font-size
		document.documentElement.style.fontSize = winW / designWidth * 100 + 'px';
	}
	computedFont();
	// 监听页面resize事件，尺寸发生改变时重新计算html的字体大小
	window.addEventListener('resize', computedFont);
})(1180);
