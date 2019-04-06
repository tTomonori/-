class ScheduleTab extends Tab{
	static openTab(){
		//タブの順番設定
		CustomTab.closeTab()
		PastTab.closeTab()
		CustomTab.setTabOrder(2)
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
			let tProgram=new Program()
			tProgram.init({})
			tProgram._id=null
			ProgramDetails.edit(tProgram,(res)=>{
				if(res.update)this.recreateContent()
			})
		}
		this.contentHead.appendChild(tButton)
	}
	static recreateContent(){
		this.content.textContent=""
		getAllProgram((aAllProgram)=>{
			for(let i=0;i<aAllProgram.length;i++){
				let tProgram=aAllProgram[i]
				let tProgramBar=getComponent("programBar "+((i%2==0)?"usagiBlue":"usagiPink"))
				this.setProgramBar(tProgramBar,tProgram)
				this.content.appendChild(tProgramBar)
			}
		})
	}
	//予定バーに情報セット
	static setProgramBar(aBar,aProgram){
		let tDate=new MyDate(aProgram.time)
		aBar.querySelector(".month").textContent=tDate.getMonth()+1
		aBar.querySelector(".day").textContent=tDate.getDate()
		aBar.querySelector(".plan").textContent=aProgram.name
		aBar._id=aProgram._id
		aBar.onclick=()=>{
			getProgram(aBar._id,(aProgram)=>{
				ProgramDetails.edit(aProgram,(res)=>{
					if(res.update)this.recreateContent()
				})
			})
		}
	}
}
ScheduleTab.init("schedule")
