var url=require('url');

module.exports = options => {
    return async function adminauth(ctx, next) {
        ctx.state.csrf=ctx.csrf; 
        ctx.state.prevPage =ctx.request.headers['referer'];   //上一页的地址
        // Referer是HTTP请求Header的一部分，当浏览器向Web服务器发送请求的时候，请求头信息一般需要包含Referer。该Referer会告诉服务器我是从哪个页面链接过来的，服务器基此可以获得一些信息用于处理。
        var pathname=url.parse(ctx.request.url).pathname;
        // console.log(pathname)

        if(ctx.session.userinfo){ 
            ctx.state.userinfo=ctx.session.userinfo;
            await next();
        }else{
            if(pathname=='/admin/login' || pathname=='/admin/doLogin' || pathname=='/admin/verify'){
                await next();
            }else{
                ctx.redirect('/admin/login');
            }
        }        
     
    };
  };
