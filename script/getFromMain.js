//全てのprogram取得
function getAllProgram(aCallback){
	gGetAllProgramCallback=aCallback
	renderer.send("getAllProgram",{returnEvent:"getAllProgram"})
}
var gGetAllProgramCallback
renderer.on("getAllProgram",(e,a)=>{
	let tPrograms=[]
	for(let tData of a){
		let tProgram=new Program()
		tProgram.init(tData)
		tPrograms.push(tProgram)
	}
	gGetAllProgramCallback(tPrograms)
})
//指定したidのprogram取得
function getProgram(aId,aCallback){
	gGetProgramCallback=aCallback
	renderer.send("getProgram",{returnEvent:"getProgram",id:aId})
}
var gGetProgramCallback
renderer.on("getProgram",(e,a)=>{
	let tProgram=new Program()
	tProgram.init(a)
	gGetProgramCallback(tProgram)
})
//全てのevent取得
function getAllEvent(aCallback){
	gGetAllEventCallback=aCallback
	renderer.send("getAllEvent",{returnEvent:"getAllEvent"})
}
var gGetAllEventCallback
renderer.on("getAllEvent",(e,a)=>{
	let tEvents=[]
	for(let tData of a){
		let tEvent=new Event()
		tEvent.init(tData)
		tEvents.push(tEvent)
	}
	gGetAllEventCallback(tEvents)
})
//指定したidのevent取得
function getEvent(aId,aCallback){
	gGetEventCallback=aCallback
	renderer.send("getEvent",{returnEvent:"getEvent",id:aId})
}
var gGetEventCallback
renderer.on("getEvent",(e,a)=>{
	let tEvent=new Event()
	tEvent.init(a)
	gGetEventCallback(tEvent)
})
//program追加
function insertProgram(aProgram,aCallback){
	gInsertProgramCallback=aCallback
	renderer.send("insertProgram",{returnEvent:"insertProgram",program:aProgram})
}
var gInsertProgramCallback
renderer.on("insertProgram",(e,a)=>{
	gInsertProgramCallback(a)
})
//program更新
function updateProgram(aId,aProgram,aCallback){
	gUpdateProgramCallback=aCallback
	renderer.send("updateProgram",{returnEvent:"updateProgram",id:aId,program:aProgram})
}
var gUpdateProgramCallback
renderer.on("updateProgram",(e,a)=>{
	gUpdateProgramCallback(a)
})
//program削除
function removeProgram(aId,aCallback){
	gRemoveProgramCallback=aCallback
	renderer.send("removeProgram",{returnEvent:"removeProgram",id:aId})
}
var gRemoveProgramCallback
renderer.on("removeProgram",(e,a)=>{
	gRemoveProgramCallback(a)
})
//event追加
function insertEvent(aEvent,aCallback){
	gInsertEventCallback=aCallback
	renderer.send("insertEvent",{returnEvent:"insertEvent",event:aEvent})
}
var gInsertEventCallback
renderer.on("insertEvent",(e,a)=>{
	gInsertEventCallback(a)
})
//event更新
function updateEvent(aId,aEvent,aCallback){
	gUpdateEventCallback=aCallback
	renderer.send("updateEvent",{returnEvent:"updateEvent",id:aId,event:aEvent})
}
var gUpdateEventCallback
renderer.on("updateEvent",(e,a)=>{
	gUpdateEventCallback(a)
})
//event削除
function removeEvent(aId,aCallback){
	gRemoveEventCallback=aCallback
	renderer.send("removeEvent",{returnEvent:"removeEvent",id:aId})
}
var gRemoveEventCallback
renderer.on("removeEvent",(e,a)=>{
	gRemoveEventCallback(a)
})
//予告する予定を取得
function getNotice(aCallback){
	gGetNoticeCallback=aCallback
	renderer.send("getNotice",{returnEvent:"getNotice"})
}
var gGetNoticeCallback
renderer.on("getNotice",(e,a)=>{
	let tPrograms=[]
	for(let tData of a){
		let tProgram=new Program()
		tProgram.init(tData)
		tPrograms.push(tProgram)
	}
	gGetNoticeCallback(tPrograms)
})
