module.exports = (options,app)=>{
  return async function(ctx,next){
    ctx.state.csrf=ctx.csrf;
    await next()
  }
}