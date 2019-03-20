window.onscroll = () => {

	let scrolled = window.pageYOffset;
	let filterBox = document.getElementById("filter-box");
	
	if(scrolled >= 150) {
		filterBox.style.position = "absolute";
		filterBox.style.top = scrolled - 60+ "px";
	} else {
		filterBox.style.position = "";
	}

}