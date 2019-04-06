const NeDB=require("nedb")
class NeDatabase{
	//データベース読み込み
	load(aFileName){
		this.db=new NeDB({
			filename:aFileName,
			autoload:true
		})
	}
	//データ追加
	insert(aData,aCallback){
		this.db.insert(aData,(err,doc)=>{
			if(aCallback!=undefined)
			aCallback(doc);
		})
	}
	//データ更新
	update(aId,aData,aCallback){
		this.db.remove({_id:aId},{},(err,doc)=>{
			this.db.insert(aData,(err,doc)=>{
				if(aCallback!=undefined)
				aCallback();
			})
		})
	}
	//データ削除
	remove(aId,aCallback){
		this.db.remove({_id:aId},{},(err,doc)=>{
			if(aCallback!=undefined)
			aCallback()
		})
	}
}
module.exports=NeDatabase
