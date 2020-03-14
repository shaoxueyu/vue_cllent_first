const debounce = function(func, wait) {
	let timer

	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(func, wait,...args)
	}
}

export default debounce
