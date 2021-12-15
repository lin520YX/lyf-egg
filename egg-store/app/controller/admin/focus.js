module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('/admin/focus/index')
    }
    async multi(){}
    async doSingleUpload(){}
    async doMultiUpload(){}
  }
  return Controller
}
