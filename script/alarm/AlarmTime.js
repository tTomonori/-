class AlarmTime{
	init(aAlarm){
		this.time=(aAlarm.time==null)?Date.now():aAlarm.time
		this.par=(aAlarm.par==null)?"parDate":aAlarm.par
	}
	isPast(aDate){}
	getNextAlarmTime(aDate){}
}
module.exports = AlarmTime;
