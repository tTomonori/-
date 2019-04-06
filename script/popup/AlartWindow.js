class AlartWindow extends PopupWindow{
	static confirm(aText,aCallback){
		let tWindow=getComponent("alartWindow")
		let tFilter
		tWindow.querySelector(".alartText").textContent=aText
		tWindow.querySelector(".buttonO").onclick=()=>{
			super.close(tFilter)
			aCallback(true)
		}
		tWindow.querySelector(".buttonX").onclick=()=>{
			super.close(tFilter)
			aCallback(false)
		}
		tFilter=super.open(tWindow)
	}
}
