var BaseController = require('./base.js')

module.exports = app => {
  class Controller extends BaseController {
    async index(){
      await this.ctx.render('admin/goodsType/index')
    }
  }
  return Controller
}
