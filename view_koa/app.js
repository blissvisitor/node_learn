
const Koa = require('koa');
//router过滤器
const router = require('koa-router')();
//bodyParser 参数解析
const bodyParser = require('koa-bodyparser');
const controller=require('./controller');
const templating=require('./templating');
const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
   var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
//判断是否为生产环境，是缓存，不是则不缓存
const isProduction = process.env.NODE_ENV === 'production';
//静态文件中间件
if (!isProduction) {
    let staticFiles = require('./static-file');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
//Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
//添加router
app.use(controller());

app.listen(3000);
console.log('app start at 3000');
