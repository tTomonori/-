function showNotice(aNoticeList){
	let tListTag=document.getElementById("noticeList")
	for(let tNotice of aNoticeList){
		let tBarSize=(tNotice.getDaysLeft()>1)?3:tNotice.getDaysLeft()+1
		if(tBarSize<1)continue
		let tBar=getComponent("noticeBar bar"+tBarSize)
		if(tBarSize!=1){
			let tDate=new MyDate(tNotice.time)
			tBar.querySelector(".notice").textContent=tNotice.getDaysLeft()
			tBar.querySelector(".month").textContent=tDate.getMonth()+1
			tBar.querySelector(".day").textContent=tDate.getDate()
		}
		tBar.querySelector(".plan").textContent=tNotice.name
		tBar.onclick=()=>{
			ProgramDetails.show(tNotice)
		}
		tListTag.appendChild(tBar)
	}
}
