module.exports = (options,app)=>{
  return async function(ctx,next){
    const sourceip = ctx.request.ip;
    console.log(sourceip)
    const match = options.ip.some(item=>{
      if(item==sourceip){
        return true
      }
    })

    if(!match){
      ctx.status = 403
      ctx.message = 'Go away, robot.'
    }else{
      await next()
    }
  }
}