class ProgramDetails extends PlanDetails{
	static edit(aProgram,aCallback){
		let tDetails=getComponent("programDetails")
		this.setDetails(tDetails,aProgram)
		//削除ボタン
		let tGarbageButton=tDetails.querySelector(".programDetails > .garbageButton")
		if(aProgram._id==null)tGarbageButton.style.display="none"
		else{
			tGarbageButton.onclick=()=>{
				AlartWindow.confirm("本当に消しちゃってもいい?",(a)=>{
					if(a){
						//予定削除
						removeProgram(aProgram._id,(a)=>{
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
			if(aProgram._id!=null){
				//予定内容更新
				updateProgram(aProgram._id,this.convertToProgram(tDetails),(res)=>{
					if(res.success){
						super.close(tFilter)
						if(aCallback!=null)aCallback({update:true})
						return
					}else{
						AlartWindow.confirm(res.message,()=>{})
					}
				})
			}else{
				//新しい予定
				insertProgram(this.convertToProgram(tDetails),(res)=>{
					if(res.success){
						super.close(tFilter)
						if(aCallback!=null)aCallback({update:true})
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
	static show(aProgram,aCallback){
		let tDetails=getComponent("programDetails")
		tDetails.querySelector(".programDetails > .garbageButton").style.display="none"//削除ボタン非表示
		this.setDetails(tDetails,aProgram)
		tDetails.querySelector(".programForm").style.pointerEvents="none"
		let tFilter
		//Oボタンクリック
		tDetails.querySelector(" .buttonO").onclick=()=>{
			super.close(tFilter)
			if(aCallback!=null)aCallback({update:false})
		}
		//Xボタンクリック
		tDetails.querySelector(" .buttonX").onclick=()=>{
			super.close(tFilter)
			if(aCallback!=null)aCallback({update:false})
		}
		tFilter=super.open(tDetails)
	}
	//dictionaryの情報を入力
	static setDetails(aDetails,aDictionary){
		aDetails.querySelector("[name=name]").value=aDictionary.name
		aDetails.querySelector("[name=period]").value=aDictionary.period
		aDetails.querySelector("[name=notice]").value=aDictionary.notice
		aDetails.querySelector("[name=retention]").checked=aDictionary.retention
		aDetails.querySelector("[name=alarmOn]").checked=aDictionary.alarmOn
		aDetails.querySelector("[name=remark]").value=aDictionary.remark
		//日付
		let tDate=new MyDate(aDictionary.time)
		aDetails.querySelector("[name=year]").value=tDate.getFullYear()
		aDetails.querySelector("[name=month]").value=tDate.getMonth()+1
		aDetails.querySelector("[name=date]").value=tDate.getDate()
		//アラーム
		super.setAlarmFeild(aDetails.querySelector(".alarmFeild"),aDictionary.alarm)
	}
	//入力された情報をprogramに変換
	static convertToProgram(aDetails){
		let tDictionary={}
		tDictionary.name=aDetails.querySelector("[name=name]").value
		tDictionary.period=aDetails.querySelector("[name=period]").value
		tDictionary.notice=aDetails.querySelector("[name=notice]").value
		tDictionary.retention=aDetails.querySelector("[name=retention]").checked
		tDictionary.alarmOn=aDetails.querySelector("[name=alarmOn]").checked
		tDictionary.remark=aDetails.querySelector("[name=remark]").value
		//日付
		let tDate=new MyDate()
		tDate.setYear(aDetails.querySelector("[name=year]").value)
		tDate.setMonth(aDetails.querySelector("[name=month]").value-1)
		tDate.setDate(aDetails.querySelector("[name=date]").value)
		tDate.setHours(0,0,0,0)
		tDictionary.time=tDate.getTime()
		//アラーム
		tDictionary.alarm=super.convertToAlarmDictionary(aDetails.querySelector(".alarmFeild"))
		//programに変換
		let tProgram=new Program()
		tProgram.init(tDictionary)
		return tProgram
	}
}
