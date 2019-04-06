let AlarmTime=require("./AlarmTime.js")
let MyDate=require("../MyDate.js")
class AlarmParDate extends AlarmTime{
	isPast(aDate){
		return false
	}
	getNextAlarmTime(aDate){
		let tTime=(aDate==null)?Date.now():aDate.getTime()
		let tAdvance=new MyDate(tTime)
		let tDate=new Date(this.time)
		tAdvance.nextHours(tDate.getHours(),tDate.getMinutes())
		return tAdvance
	}
}
module.exports = AlarmParDate;
