let PlanDatabase=require("./PlanDatabase.js")
const Program=require("../plan/Program.js")
class ProgramDatabase extends PlanDatabase{
	load(aFileName,aCallBack){
		super.load(aFileName)
		this.db.find({},(err,doc)=>{
			//読み込んだデータをProguramクラスのインスタンスに
			var tPrograms=[]
			for(var tData of doc){
				let tProgram=new Program()
				tProgram.init(tData)
				tPrograms.push(tProgram)
			}
			this.plans=tPrograms
			//コールバック
			if(aCallBack!=null)
				aCallBack()
		})
	}
	//並び替え
	sortPrograms(){
		this.plans.sort((a,b)=>{
			if(a.time<b.time) return -1;
			if(a.time>b.time) return 1;
			return 0;
		})
	}
	//全予定取得
	getAllProgram(){
		return this.plans
	}
	//idで予定取得
	getById(aId){
		for(let tProgram of this.plans){
			if(tProgram.isThisId(aId))
				return tProgram
		}
		return null
	}
	//予告する予定を取得
	getNotice(){
		let tNotices=[]
		let tNow=new Date()
		for(let tProgram of this.plans){
			if(tProgram.isNearness(tNow))tNotices.push(tProgram)
		}
		return tNotices
	}
	//予定追加
	insert(aProgram,aCallback){
		if(this.getById(aProgram._id)!=null){
			aCallback({success:false,message:"同じ予定が登録済みだよ"})
			return;
		}
		let tProgram=new Program()
		tProgram.init(aProgram)
		this.plans.push(tProgram)
		this.sortPrograms()
		super.insert(aProgram,()=>{
			aCallback({success:true})
		})
	}
	//予定更新
	update(aId,aProgram,aCallback){
		if(aId!=aProgram._id&&this.getById(aProgram._id)!=null){
			aCallback({success:false,message:"他の予定と内容が被っちゃったよ"})
			return;
		}
		this.getById(aId).init(aProgram)
		this.sortPrograms()
		super.update(aId,aProgram,()=>{
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
module.exports=ProgramDatabase
