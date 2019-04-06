let AlarmTime=require("./AlarmTime.js")
let MyDate=require("../MyDate.js")
class AlarmParWeek extends AlarmTime{
	isPast(aDate){
		return false
	}
	getNextAlarmTime(aDate){
		let tTime=(aDate==null)?Date.now():aDate.getTime()
		let tAdvance=new MyDate(tTime)
		let tDate=new Date(this.time)
		tAdvance.nextDayOfWeek(tDate.getDay())
		tAdvance.setHours(tDate.getHours(),tDate.getMinutes(),0,0)
		if((tAdvance.getTime()-Date.now())<0){
			tAdvance.setDate(tAdvance.getDate()+7)
		}
		return tAdvance
	}
}
module.exports = AlarmParWeek;
