const Koa=require('koa');
const router=require('koa-router')();
const app=new Koa();
app.use(async(ctx,next)=>{
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
	// ctx.response.type='text/html';
	// ctx.response.body='<h1>Hello World!</h1>';
});
//添加 url-router
router.get('/hello/:name',async(ctx,next)=>{
	var name=ctx.params.name;
	ctx.response.body=`<h1>Hello ${name} !</h1>`;
});
router.get('/',async(ctx,next)=>{
	ctx.response.body='<h1>Index</h1>';
});
app.use(router.routes());


app.listen(3000);
console.log('app start at 3000');