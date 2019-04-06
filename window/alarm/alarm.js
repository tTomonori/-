renderer.on("sendArgument",(e,a)=>{
	gWindowNum=a.windowNum
	document.querySelector(".plan").textContent=a.alarm.name
	document.querySelector(".remark").textContent=a.alarm.remark
	let tDate=new Date(a.time)
	document.querySelector(".hour").textContent=tDate.getHours()
	document.querySelector(".minute").textContent=tDate.getMinutes()
})
