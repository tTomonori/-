let Plan=require("./Plan.js")
const AlarmCreater=require("../alarm/AlarmCreater.js")
class Event extends Plan{
	init(aEvent){
		this.name=(aEvent.name==null)?"新しいイベント":aEvent.name
		this.alarm=(aEvent.alarm==null)?[]:AlarmCreater.convert(aEvent.alarm)
		this.alarmOn=(aEvent.alarmOn==null)?true:aEvent.alarmOn
		this.remark=(aEvent.remark==null)?"":aEvent.remark
		this._id=this.name
	}
	//過ぎた予定
	isPast(aDate){
		for(let tAlarm of this.alarm){
			if(!tAlarm.isPast(new Date()))return false
		}
		return true
	}
	//id判定
	isThisId(aId){
		return (aId==this._id)
	}
}
module.exports=Event
