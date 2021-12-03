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
}

module.exports = BaseController;