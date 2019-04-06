class Tab{
	//初期化(DOM取得)
	static init(aTabName){
		this.tab=document.getElementById(aTabName+"Tab")
		this.client=document.querySelector("#"+aTabName+"Tab .tabClient")
		this.contentHead=document.querySelector("#"+aTabName+"Tab .contentHead")
		this.content=document.querySelector("#"+aTabName+"Tab .content")
	}
	//タブの表示順更新
	static setTabOrder(aOrder){
		this.tab.style.zIndex=aOrder
		this.tab.style.marginTop=(-5*(3-aOrder))+"px"
		this.tab.style.marginLeft=(5*(3-aOrder))+"px"
	}
	//タブがクリックされた
	static clicked(){
		if(this.tab.style.zIndex!=3){
			this.openTab()
		}
	}
	//タブを開く
	static openTab(){

	}
	//タブを閉じる
	static closeTab(){
		this.content.textContent=""
	}
	//ヘッダを作り直す
	static recreateContentHead(){

	}
	//タブの中身を作り直す
	static recreateContent(){

	}
}
