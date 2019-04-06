let PlanDatabase=require("./PlanDatabase.js")
const Event=require("../plan/Event.js")
class EventDatabase extends PlanDatabase{
	load(aFileName,aCallBack){
		super.load(aFileName)
		this.db.find({},(err,doc)=>{
			//読み込んだデータをEventクラスのインスタンスに
			var tEvents=[]
			for(var tData of doc){
				let tEvent=new Event()
				tEvent.init(tData)
				tEvents.push(tEvent)
			}
			this.plans=tEvents
			//コールバック
			if(aCallBack!=null)
				aCallBack()
		})
	}
	//並び替え
	sortEvents(){
	}
	//全予定取得
	getAllEvent(){
		return this.plans
	}
	//idでイベント取得
	getById(aId){
		for(let tEvent of this.plans){
			if(tEvent.isThisId(aId))
				return tEvent
		}
		return null
	}
	//イベント追加
	insert(aEvent,aCallback){
		if(this.getById(aEvent._id)!=null){
			aCallback({success:false,message:"同じ予定が登録済みだよ"})
			return;
		}
		let tEvent=new Event()
		tEvent.init(aEvent)
		this.plans.push(tEvent)
		this.sortEvents()
		super.insert(aEvent,()=>{
			aCallback({success:true})
		})
	}
	//イベント更新
	update(aId,aEvent,aCallback){
		if(aId!=aEvent._id&&this.getById(aEvent._id)!=null){
			aCallback({success:false,message:"他の予定と内容が被っちゃったよ"})
			return;
		}
		this.getById(aId).init(aEvent)
		this.sortEvents()
		super.update(aId,aEvent,()=>{
			aCallback({success:true})
		})
	}
	//次のアラームの時間
	getNextAlarmTime(){
		let tNext
		for(let tProgram of this.plans){
			let tNextAlarm=tProgram.getNextAlarmTime()
			if(tNextAlarm==null)continue
			if(tNext==null){
				tNext={time:tNextAlarm,plans:[tProgram]}
				continue
			}
			if(tNext.time.getTime()==tNextAlarm.getTime()){
				tNext.plans.push(tProgram)
				continue
			}
			if(tNext.time.getTime()>tNextAlarm.getTime()){
				tNext={time:tNextAlarm,plans:[tProgram]}
				continue
			}
		}
		return tNext
	}
}
module.exports=EventDatabase
