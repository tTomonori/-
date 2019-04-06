class CustomTab extends Tab{
	static openTab(){
		//タブの順番設定
		ScheduleTab.closeTab()
		PastTab.closeTab()
		ScheduleTab.setTabOrder(2)
		PastTab.setTabOrder(1)
		this.setTabOrder(3)
		this.recreateContentHead()
		this.recreateContent()
	}
	static recreateContentHead(){
		if(this.contentHead.innerHTML!="")return;
		let tButton=getComponent("buttonG")
		let tSize=getComputedStyle(this.contentHead).getPropertyValue("height")
		tButton.style.height=tSize
		tButton.style.width=tSize
		tButton.onclick=()=>{
			let tEvent=new Event()
			tEvent.init({})
			tEvent._id=null
			EventDetails.edit(tEvent,(res)=>{
				if(res.update)this.recreateContent()
			})
		}
		this.contentHead.appendChild(tButton)
	}
	static recreateContent(){
		this.content.textContent=""
		getAllEvent((aAllEvent)=>{
			for(let i=0;i<aAllEvent.length;i++){
				let tEvent=aAllEvent[i]
				let tEventBar=getComponent("eventBar "+((i%2==1)?"usagiBlue":"usagiPink"))
				this.setEventBar(tEventBar,tEvent)
				this.content.appendChild(tEventBar)
			}
		})
	}
	//イベントバーに情報セット
	static setEventBar(aBar,aEvent){
		aBar.querySelector(".plan").textContent=aEvent.name
		aBar._id=aEvent._id
		aBar.onclick=()=>{
			getEvent(aBar._id,(aEvent)=>{
				EventDetails.edit(aEvent,(res)=>{
					if(res.update)this.recreateContent()
				})
			})
		}
	}
}
CustomTab.init("custom")
