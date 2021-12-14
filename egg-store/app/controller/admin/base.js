const Controller = require('egg').Controller;
class BaseController extends Controller {
  async success(redirectUrl,message) {
    await this.ctx.render('admin/public/success',{
      redirectUrl:redirectUrl,
      message:message||'操作成功!'
    });
  }

  async error(redirectUrl,message) {
    await this.ctx.render('admin/public/error',{
      redirectUrl:redirectUrl,
      message:message||'操作成功!'
    });
  }

  async verify() {
    var captcha=await this.service.tools.captcha();  //服务里面的方法

    this.ctx.response.type = 'image/svg+xml';   /*指定返回的类型*/

    this.ctx.body=captcha.data;      /*给页面返回一张图片*/
  }
  async delete(){
    let {id,model} = this.ctx.request.query
    await this.ctx.model[model].deleteOne({'_id':id})
    this.ctx.redirect(this.ctx.state.prevPage)
  }
  async changeStatus(){
    const {model,attr,id:_id} = this.ctx.request.query
    const result = await this.ctx.model[model].find({_id})
    const json = {}
    if(result.length>0){
      if(result[0][attr]==1){
        json ={
          [attr]:0
        }
      }else{
        json ={
          [attr]:1
        }
      }
      const updateResult = await this.ctx.model[model].updateOne({_id},json)
      if(updateResult){
        this.ctx.body = {'message':'更新成功',"success":true}
      }else{
        this.ctx.body = {'message':'更新失败',"success":false}
      }
    }else{
      this.ctx.body = {'message':'更新失败参数错误',"success":false}
    }
  }
}

module.exports = BaseController;
