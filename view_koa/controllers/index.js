//首页
var fn_home=async (ctx,next)=>{
	ctx.render('index.html',{
		title:'Welcome'
	})
};
//登陆
var fn_login=async (ctx,next)=>{
	var email=ctx.request.body.email||'',
		password=ctx.request.body.password||'';
	if(email=='admin@example.com'&&password=='123456'){
		//登陆成功
		ctx.render('signin-ok.html',{
			title:'Sign in OK',
			name:'Mr Code'
		})
	}else{
		//登陆失败
		ctx.render('signin-failed.html',{
			title:'Sign In Failed'
		})
	}
};
module.exports={
	'GET /':fn_home,
	'POST /signin':fn_login
}