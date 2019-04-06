class PopupWindow{
	static open(aTag){
		let tFilter=document.createElement("div")
		tFilter.classList.add("filter")
		tFilter.appendChild(aTag)
		PopupWindow.filterContainer.appendChild(tFilter)
		return tFilter
	}
	static close(aTag){
		aTag.remove()
	}
}
PopupWindow.filterContainer=document.getElementById("popUpFilter")
