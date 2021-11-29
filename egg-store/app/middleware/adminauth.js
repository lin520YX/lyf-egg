var url=require('url');

module.exports = options => {
    return async function adminauth(ctx, next) {
        ctx.state.csrf=ctx.csrf; 
        var pathname=url.parse(ctx.request.url).pathname;
        // console.log(pathname)

        if(ctx.session.userinfo){ 
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
