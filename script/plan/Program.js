let Plan=require("./Plan.js")
const AlarmCreater=require("../alarm/AlarmCreater.js")
class Program extends Plan{
	init(aPlan){
		this.name=(aPlan.name==null)?"新しい予定":aPlan.name
		this.time=(aPlan.time==null)?Date.now():Number(aPlan.time)
		this.period=(aPlan.period==null)?0:aPlan.period
		this.notice=(aPlan.notice==null)?0:aPlan.notice
		this.alarm=(aPlan.alarm==null)?[]:AlarmCreater.convert(aPlan.alarm)
		this.retention=(aPlan.retention==null)?false:aPlan.retention
		this.alarmOn=(aPlan.alarmOn==null)?true:aPlan.alarmOn
		this.remark=(aPlan.remark==null)?"":aPlan.remark
		this._id=this.time+this.name+this.period
	}
	//通知すべき予定
	isNearness(aDate){
		return aDate.getTime()>this.time-(this.notice*86400000)
	}
	//過ぎた予定
	isPast(aDate){
		return aDate.getTime()<this.time+(this.period*86400000)
	}
	//id判定
	isThisId(aId){
		return (aId==this._id)
	}
	//予定日までの日数
	getDaysLeft(){
		let tToday=new MyDate()
		tToday.setHours(0,0,0,0)
		let tProgramDate=new MyDate(this.time)
		tProgramDate.setHours(0,0,0,0)
		return Math.round((tProgramDate.getTime()-tToday.getTime())/86400000)
	}
}
module.exports=Program
