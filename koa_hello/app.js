const Koa=require('koa');
const app=new Koa();
app.use(async(ctx,next)=>{
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
	// ctx.response.type='text/html';
	// ctx.response.body='<h1>Hello World!</h1>';
});
app.use(async(ctx,next)=>{
	var startTime=new Date().getTime();
	await next();
	const ms=new Date().getTime()-startTime;
	console.log(`返回结果耗费时间：${ms}ms`);

	// ctx.response.type='text/html';
	// ctx.response.body='<h1>Hello World!</h1>';
});
app.use(async(ctx,next)=>{
	await next();
	ctx.response.type='text/html';
	ctx.response.body='<h1>Hello World!</h1>';
});


app.listen(3000);
console.log('app start at 3000');