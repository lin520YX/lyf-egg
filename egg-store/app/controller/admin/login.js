var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      await this.ctx.render('admin/login')
    }
  }
  return Controller
}
