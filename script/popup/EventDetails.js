class EventDetails extends PlanDetails{
	static edit(aEvent,aCallback){
		let tDetails=getComponent("eventDetails")
		this.setDetails(tDetails,aEvent)
		//削除ボタン
		let tGarbageButton=tDetails.querySelector(".eventDetails > .garbageButton")
		if(aEvent._id==null)tGarbageButton.style.display="none"
		else{
			tGarbageButton.onclick=()=>{
				AlartWindow.confirm("本当に消しちゃってもいい?",(a)=>{
					if(a){
						//予定削除
						removeEvent(aEvent._id,(a)=>{
							if(!a.success)AlartWindow.confirm(a.message)
							super.close(tFilter)
							if(aCallback!=null)aCallback({update:true})
						})
					}
				})
			}
		}

		let tFilter
		//Oボタンクリック
		tDetails.querySelector(" .buttonO").onclick=()=>{
			if(aEvent._id!=null){
				//予定内容更新
				updateEvent(aEvent._id,this.convertToEvent(tDetails),(res)=>{
					if(res.success){
						super.close(tFilter)
						aCallback({update:true})
						return
					}else{
						AlartWindow.confirm(res.message,()=>{})
					}
				})
			}else{
				//新しい予定
				insertEvent(this.convertToEvent(tDetails),(res)=>{
					if(res.success){
						super.close(tFilter)
						aCallback({update:true})
						return
					}else{
						AlartWindow.confirm(res.message,()=>{})
					}
				})
			}
		}
		//Xボタンクリック
		tDetails.querySelector(" .buttonX").onclick=()=>{
			super.close(tFilter)
		}
		tFilter=super.open(tDetails)
	}
	//dictionaryの情報を入力
	static setDetails(aDetails,aDictionary){
		aDetails.querySelector("[name=name]").value=aDictionary.name
		aDetails.querySelector("[name=alarmOn]").checked=aDictionary.alarmOn
		aDetails.querySelector("[name=remark]").value=aDictionary.remark
		//アラーム
		super.setAlarmFeild(aDetails.querySelector(".alarmFeild"),aDictionary.alarm)
	}
	//入力された情報をEventに変換
	static convertToEvent(aDetails){
		let tDictionary={}
		tDictionary.name=aDetails.querySelector("[name=name]").value
		tDictionary.alarmOn=aDetails.querySelector("[name=alarmOn]").checked
		tDictionary.remark=aDetails.querySelector("[name=remark]").value
		//アラーム
		tDictionary.alarm=super.convertToAlarmDictionary(aDetails.querySelector(".alarmFeild"))
		//Eventに変換
		let tEvent=new Event()
		tEvent.init(tDictionary)
		return tEvent
	}
}
