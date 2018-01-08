const path=require('path');
const mime=require('mime');
const fs=require('fs');
//url ：类似'/static'
//dir:类似 __dirname+'/static'
function staticFiles(url,dir){
	return async(ctx,next)=>{
		let rpath=ctx.request.path;
		//判断是否以指定的url开头
		if(rpath.startsWith(url)){
			//获取文件完整路径
			let fp=path.join(dir,rpath.substring(url.length));
			//判断文件是否存在
			if(await fs.exists(fp)){
				//查找文件的mime:
				ctx.response.type=mime.lookup(rpath);
				//读取文件内容并返回
				ctx.response.body=await fs.readFile(fp);
			}else{
				//文件不存在
				ctx.response.status=404;
			}

		}else{
			//不是指定前缀的url
			await next();
		}
	}
};
module.exports=staticFiles;