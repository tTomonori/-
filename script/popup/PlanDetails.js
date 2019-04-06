class PlanDetails extends PopupWindow{
	//アラーム欄設定
	static setAlarmFeild(aFeild,aAlarms){
		for(let tAlarm of aAlarms){
			let tBar=getComponent("alarmBar")
			this.setAlarmBar(tBar,tAlarm)
			aFeild.insertBefore(tBar,aFeild.lastElementChild)
		}
		//アラーム追加ボタン
		aFeild.querySelector("[name=newAlarmButton]").onclick=()=>{
			let tBar=getComponent("alarmBar")
			this.setAlarmBar(tBar,AlarmCreater.convert([{par:"parDate"}])[0])
			aFeild.insertBefore(tBar,aFeild.lastElementChild)
		}
	}
	//アラーム設定
	static setAlarmBar(aBar,aAlarm){
		let tOptions=aBar.querySelectorAll(".alarmOption")
		//optionの表示非表示設定
		for(let tOption of tOptions){
			if(!tOption.classList.contains(aAlarm.par+"Option"))tOption.style.display="none"
			else tOption.style.display="inline"
		}
		//削除ボタン
		let tGarbageButton=aBar.querySelector(".garbageButton")
		tGarbageButton.onclick=()=>{
			aBar.remove()
		}
		//アラームタイプ変更時
		let tTypeSelector=aBar.querySelector("[name=alarmType]")
		tTypeSelector.value=aAlarm.par
		tTypeSelector.onchange=()=>{
			this.setAlarmBar(aBar,AlarmCreater.convert([{par:tTypeSelector.value}])[0])
		}
		//情報表示
		let tOption=aBar.querySelector("."+aAlarm.par+"Option")
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			case "parWeek":
			tOption.querySelector("[name=dayOfWeek]").selectedIndex=tDate.getDay()
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			case "onTime":
			tOption.querySelector("[name=year]").value=tDate.getFullYear()
			tOption.querySelector("[name=month]").value=tDate.getMonth()+1
			tOption.querySelector("[name=date]").value=tDate.getDate()
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			default:throw new Error("PopupWindow : 「"+aAlarm.par+"」ってなに?");
		}
	}
	//アラーム欄をdictionaryの配列に
	static convertToAlarmDictionary(aFeild){
		let tList=[]
		for(let tBar of aFeild.querySelectorAll(".alarmBar")){
			let tDic={}
			tDic.par=tBar.querySelector("[name=alarmType]").value
			let tOption=tBar.querySelector("."+tDic.par+"Option")
			let tDate=new MyDate()
			switch (tDic.par) {
				case "parDate":
				tDate.setHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				break;
				case "parWeek":
				tDate.setHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				tDate.nextDayOfWeek(tOption.querySelector("[name=dayOfWeek]").selectedIndex)
				break;
				case "onTime":
				tDate.nextHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				tDate.setMonth(tOption.querySelector("[name=month]").value-1)
				tDate.setDate(tOption.querySelector("[name=date]").value)
				tDate.setYear(tOption.querySelector("[name=year]").value)
				break;
				default:throw new Error("PopupWindow : 「"+tDic.par+"」ってなに?");
			}
			tDic.time=tDate.getTime()
			tList.push(tDic)
		}
		return tList
	}
}
