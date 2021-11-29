module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('admin/login')
    }
  }
  return Controller
}
