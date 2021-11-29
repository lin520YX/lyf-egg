var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      console.log('this.ctx.csrf',this.ctx.csrf)
      await this.ctx.render('admin/login')
    }
    async doLogin(){
      console.log(this.ctx.request.body)
    }
  }
  return Controller
}
