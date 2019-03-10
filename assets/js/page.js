(function(global) {
'use strict';
	const containerEl = document.getElementById('container');
	containerEl.style.minHeight = `${window.innerHeight}px`;

	global.scrollTop = ()=>{
		window.scrollTo(0,0);
	}
})(window);

