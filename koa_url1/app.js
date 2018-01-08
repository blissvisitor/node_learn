const Koa = require('koa');
//router过滤器
const router = require('koa-router')();
//bodyParser 参数解析
const bodyParser = require('koa-bodyparser');
//导入controller中间件
const controller=require('./controller');
const app = new Koa();
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
    // ctx.response.type='text/html';
    // ctx.response.body='<h1>Hello World!</h1>';
});
// //添加 url-router
// router.get('/hello/:name', async(ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello ${name} !</h1>`;
// });
// router.get('/', async(ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// });

// //登陆验证
// router.get('/', async(ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//         <form action="/signin" method="post">
//             <p>Name: <input name="name" value="koa"></p>
//             <p>Password: <input name="password" type="password"></p>
//             <p><input type="submit" value="Submit"></p>
//         </form>`;
// });
// //验证
// router.post('/signin', async(ctx, next)=> {
//     var name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`name:${name},password:${password}`);
//     if (name == 'koa' && password == '123') {
//         ctx.response.body = '<h1>登陆成功！</h1>';
//     } else {
//         ctx.response.body = `<h1>登陆失败！</h1><p><a href='/'>重试</a></p>`;
//     }
// });
// app.use(router.routes());

// // 先导入fs模块，然后用readdirSync列出文件
// // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
// var files=fs.readdirSync(__dirname+'/controllers');
// //过滤出js文件
// var js_files=files.filter((f)=>{
//     return f.endsWith('.js');
// });
// //处理每个js
// for(var f of js_files){
//     console.log(`process contorller : ${f}`);
//     //导入js文件
//     let mapping=require(_dirname+'/controllers/'+f);
//     for(var url in mapping){
//         if(url.endsWith('GET')){
//             //get请求
//             var path=url.substring(4);
//             router.get(path,mapping[url]);
//             console.log(`register URL mapping：GET ${path}`);
//         }else if(url.endsWith('POST')){
//             var path=url.substring(5);
//             router.post(path,mapping[url]);
//             console.log(`register URL mapping :POST ${path}`);
//         }else{
//             console.log('无效的url');
//         }
//     }
// }

app.use(controller());
app.listen(3000);
console.log('app start at 3000');