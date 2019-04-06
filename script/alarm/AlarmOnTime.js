let AlarmTime=require("./AlarmTime.js")
let MyDate=require("../MyDate.js")
class AlarmOnTime extends AlarmTime{
	isPast(aDate){
		return aDate.getTime()<this.time
	}
	getNextAlarmTime(aDate){
		if(aDate==null)aDate=new MyDate()
		if(aDate.getTime()>this.time)return null;
		return new Date(this.time)
	}
}
module.exports = AlarmOnTime;
