let NeDatabase=require("./NeDatabase.js")
class PlanDatabase extends NeDatabase{
	remove(aId,aCallback){
		for(let i=0;i<this.plans.length;i++){
			let tPlan=this.plans[i]
			if(tPlan._id!=aId)continue
			this.plans.splice(i,1)
			super.remove(aId,()=>{
				if(aCallback!=null)aCallback({success:true})
			})
			return
		}
		if(aCallback!=null)
		aCallback({success:false,message:"存在しない予定を削除しようとしたよ"})
	}
	//指定した時間内にアラームが設定されていた予定を取得
	getAlarmInPeriod(aAfter,aBefore){
		let tPlans=[]
		for(let tPlan of this.plans){
			if(tPlan.isInPeriod(aAfter,aBefore))
			tPlans.push(tPlan)
		}
		return tPlans
	}
}
module.exports=PlanDatabase
