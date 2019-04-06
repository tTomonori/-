class Plan{
	isPast(aDate){}
	//次のアラームの時間
	getNextAlarmTime(aDate){
		if(!this.isActivateAlarm())return;//アラームがoff
		let tNextDate
		for(let tAlarm of this.alarm){
			let tNext=tAlarm.getNextAlarmTime(aDate)
			if(tNext==null)continue
			if(tNextDate==null){
				tNextDate=tNext
				continue
			}
			if(tNextDate.getTime()>tNext.getTime()){
				tNextDate=tNext
				continue
			}
		}
		if(tNextDate!=null)
		return tNextDate
	}
	//指定した時間何のアラームがあるか
	isInPeriod(aAfter,aBefore){
		if(!this.isActivateAlarm())return false;//アラームがoff
		for(let tAlarm of this.alarm){
			let tNext=tAlarm.getNextAlarmTime(aAfter)
			if(tNext==null)continue
			if(tNext.getTime()<aAfter.getTime())continue
			if(aBefore.getTime()<tNext.getTime())continue
			return true
		}
		return false
	}
	//アラームによる通知のON or OFF
	isActivateAlarm(){
		return this.alarmOn
	}
}
module.exports=Plan
