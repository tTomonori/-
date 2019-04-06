const AlarmParDate=require("./AlarmParDate.js")
const AlarmParWeek=require("./AlarmParWeek.js")
const AlarmOnTime=require("./AlarmOnTime.js")
class AlarmCreater{
	static convert(aAlarms){
		let tAlarmTimes=[]
		for(let tData of aAlarms){
			let tAlarm
			switch (tData.par) {
				case "parDate":tAlarm=new AlarmParDate();break;
				case "parWeek":tAlarm=new AlarmParWeek();break;
				case "onTime":tAlarm=new AlarmOnTime();break;
				default:throw new Error("AlarmCreater : 「"+tData.par+"」ってなに?");
			}
			tAlarm.init(tData)
			tAlarmTimes.push(tAlarm)
		}
		return tAlarmTimes
	}
}
module.exports=AlarmCreater
